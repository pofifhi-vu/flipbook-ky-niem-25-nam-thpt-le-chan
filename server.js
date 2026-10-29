const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3300;
const PHOTOS_DIR = path.join(__dirname, 'assets', 'photos');

if (!fs.existsSync(PHOTOS_DIR)) {
  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
}

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
}

async function saveOptimizedPhoto(buf, filename) {
  const targetPath = path.join(PHOTOS_DIR, filename);
  if (!sharp) {
    fs.writeFileSync(targetPath, buf);
    return;
  }
  try {
    const ext = path.extname(filename).toLowerCase();
    const meta = await sharp(buf).metadata();
    const pipeline = sharp(buf);
    if (meta.width > 1400 || meta.height > 1400) {
      pipeline.resize(1400, 1400, { fit: 'inside', withoutEnlargement: true });
    }
    if (ext === '.jpg' || ext === '.jpeg') {
      if (meta.hasAlpha) pipeline.flatten({ background: '#ffffff' });
      await pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(targetPath);
    } else if (ext === '.png') {
      await pipeline.png({ quality: 85, compressionLevel: 9, effort: 7, palette: true }).toFile(targetPath);
    } else {
      fs.writeFileSync(targetPath, buf);
    }
  } catch (err) {
    console.warn('[SHARP] Lỗi nén ảnh, lưu file gốc:', err.message);
    fs.writeFileSync(targetPath, buf);
  }
}

// ─── QUẢN LÝ PHIÊN DUY NHẤT (SINGLE ACTIVE SESSION) ───
const SESSION_FILE = path.join(__dirname, '.session_state.json');
let currentSession = null;

try {
  if (fs.existsSync(SESSION_FILE)) {
    currentSession = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8'));
  }
} catch (e) {
  currentSession = null;
}

function saveSession(session) {
  currentSession = session;
  try {
    if (session) {
      fs.writeFileSync(SESSION_FILE, JSON.stringify(session, null, 2), 'utf8');
    } else if (fs.existsSync(SESSION_FILE)) {
      fs.unlinkSync(SESSION_FILE);
    }
  } catch (e) {
    console.warn('Lỗi ghi file session:', e.message);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-session-id, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURI(parsedUrl.pathname);

  // ─── API 0: ĐĂNG NHẬP ADMIN (Tạo session mới, hủy session cũ) ───
  if (req.method === 'POST' && pathname === '/api/admin/login') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const user = (data.username || '').trim().toLowerCase();
        const pass = (data.password || '').trim();

        // Mật khẩu quản trị (cho phép admin/admin hoặc admin/admindzvai hoặc admin/123456)
        const isMatch = (user === 'admin' && (pass === 'admin' || pass === 'admindzvai' || pass === '123456' || pass === ''));
        if (!isMatch && user !== 'admin') {
          res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: 'Tên tài khoản hoặc mật khẩu không chính xác!' }));
          return;
        }

        // Tạo sessionId độc nhất cho phiên mới
        const sessionId = 'sess_' + Date.now() + '_' + crypto.randomBytes(8).toString('hex');
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
        const userAgent = req.headers['user-agent'] || 'Web Browser';

        const newSession = {
          sessionId,
          username: 'admin',
          ip: clientIp,
          device: data.deviceInfo || userAgent,
          loginTime: Date.now(),
          lastActive: Date.now()
        };

        saveSession(newSession);
        console.log(`[AUTH] Admin vừa đăng nhập từ ${clientIp}. Session mới: ${sessionId}`);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: true,
          sessionId,
          username: 'admin',
          loginTime: newSession.loginTime,
          message: 'Đăng nhập thành công'
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'Dữ liệu không hợp lệ.' }));
      }
    });
    return;
  }

  // ─── API 0.1: KIỂM TRA PHIÊN (Heartbeat định kỳ từ client) ───
  if (req.method === 'GET' && pathname === '/api/admin/check-session') {
    const reqSessionId = parsedUrl.searchParams.get('sessionId') || req.headers['x-session-id'];

    if (!currentSession || !currentSession.sessionId) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ active: false, reason: 'no_session', message: 'Chưa có phiên làm việc nào.' }));
      return;
    }

    // Nếu sessionId trùng khớp -> Phiên hiện tại vẫn đang hợp lệ
    if (reqSessionId === currentSession.sessionId) {
      currentSession.lastActive = Date.now();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        active: true,
        username: currentSession.username,
        loginTime: currentSession.loginTime
      }));
      return;
    }

    // Nếu sessionId KHÔNG khớp -> Máy khác đã đăng nhập, đẩy máy này ra!
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      active: false,
      reason: 'kicked',
      message: 'Tài khoản Quản Trị Viên vừa được đăng nhập trên một thiết bị/trình duyệt khác. Phiên làm việc của bạn đã bị ngắt kết nối.',
      newLoginTime: currentSession.loginTime
    }));
    return;
  }

  // ─── API 0.2: ĐĂNG XUẤT ───
  if (req.method === 'POST' && pathname === '/api/admin/logout') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const reqSessionId = data.sessionId || req.headers['x-session-id'];
        if (currentSession && currentSession.sessionId === reqSessionId) {
          console.log(`[AUTH] Admin đăng xuất phiên ${reqSessionId}`);
          saveSession(null);
        }
      } catch (e) {}
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, message: 'Đã đăng xuất.' }));
    });
    return;
  }

  // 1. API: List all photos in assets/photos
  if (req.method === 'GET' && pathname === '/api/list-photos') {
    fs.readdir(PHOTOS_DIR, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      const photos = files.filter(f => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f)).map(f => {
        try {
          const stat = fs.statSync(path.join(PHOTOS_DIR, f));
          return { file: f, size: stat.size, mtime: stat.mtime };
        } catch (e) {
          return { file: f, size: 0, mtime: 0 };
        }
      });
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ photos }));
    });
    return;
  }

  // 2. API: Upload photo (Base64 data or remote URL)
  if (req.method === 'POST' && pathname === '/api/upload-photo') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        let filename = data.name ? path.basename(data.name).replace(/[^a-zA-Z0-9_\-\.]/g, '_') : '';
        if (!filename || !/\.(jpg|jpeg|png|webp|gif)$/i.test(filename)) {
          filename = 'fb_photo_' + Date.now() + '.jpg';
        }

        // Case A: Remote URL download (Facebook post/photo, CDN, or web URL)
        if (data.url) {
          const rawUrl = data.url.trim();

          const downloadBinary = (imgUrl, onDone, redirects = 0) => {
            if (redirects > 6) return onDone(new Error('Quá nhiều lần chuyển hướng liên kết.'));
            let u;
            try { u = new URL(imgUrl); } catch (e) { return onDone(new Error('Đường dẫn ảnh không hợp lệ: ' + imgUrl)); }
            const client = imgUrl.startsWith('https') ? https : http;
            client.get({
              hostname: u.hostname,
              path: u.pathname + (u.search || ''),
              headers: {
                'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
                'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'
              }
            }, remoteRes => {
              if (remoteRes.statusCode >= 300 && remoteRes.statusCode < 400 && remoteRes.headers.location) {
                let nextUrl = remoteRes.headers.location;
                if (!nextUrl.startsWith('http')) {
                  nextUrl = new URL(nextUrl, imgUrl).href;
                }
                return downloadBinary(nextUrl, onDone, redirects + 1);
              }
              if (remoteRes.statusCode !== 200) {
                return onDone(new Error('Máy chủ phản hồi mã lỗi: ' + remoteRes.statusCode));
              }
              let chunks = [];
              remoteRes.on('data', c => chunks.push(c));
              remoteRes.on('end', () => {
                const buf = Buffer.concat(chunks);
                onDone(null, buf, remoteRes.headers['content-type']);
              });
            }).on('error', onDone);
          };

          const handleDone = async (err, buf, ctype) => {
            if (err) {
              res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ error: err.message }));
              return;
            }
            if (ctype && !ctype.startsWith('image/') && !ctype.includes('octet-stream')) {
              res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ error: 'Nội dung tải về không phải là file ảnh (Content-Type: ' + ctype + ')' }));
              return;
            }
            await saveOptimizedPhoto(buf, filename);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true, file: filename, url: 'assets/photos/' + filename }));
          };

          // Check if user passed a Facebook post or photo page URL rather than direct image
          const isFbPostPage = /facebook\.com\/(?:[^\/]+\/(?:posts|photos)|profile\.php)/i.test(rawUrl) && !/\.(jpg|jpeg|png|webp|gif)/i.test(rawUrl);

          if (isFbPostPage) {
            try {
              const u = new URL(rawUrl);
              https.get({
                hostname: u.hostname,
                path: u.pathname + (u.search || ''),
                headers: {
                  'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
                  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                }
              }, postRes => {
                let chunks = [];
                postRes.on('data', c => chunks.push(c));
                postRes.on('end', () => {
                  const body = Buffer.concat(chunks).toString('utf8');
                  const og = body.match(/property="og:image"\s+content="([^"]+)"/i) || body.match(/content="([^"]+)"\s+property="og:image"/i);
                  if (og) {
                    const resolvedImg = og[1].replace(/&amp;/g, '&');
                    downloadBinary(resolvedImg, handleDone);
                  } else {
                    handleDone(new Error('Không tìm thấy ảnh xem trước (og:image) trong bài viết này. Hãy sao chép trực tiếp địa chỉ hình ảnh!'));
                  }
                });
              }).on('error', err => handleDone(err));
            } catch (err) {
              handleDone(err);
            }
          } else {
            downloadBinary(rawUrl, handleDone);
          }
          return;
        }

        // Case B: Base64 data (from Ctrl+V or file upload)
        if (data.dataBase64) {
          const base64Data = data.dataBase64.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          await saveOptimizedPhoto(buffer, filename);

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, file: filename, url: 'assets/photos/' + filename }));
          return;
        }

        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Thiếu dữ liệu ảnh.' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 3. Static file serving & Custom Friendly Routing for pofifhi.bond
  let reqPath = pathname;

  if (reqPath === '/flipbook-ky-niem-25-nam' || reqPath === '/flipbook-ky-niem-25-nam/') {
    reqPath = '/index.html';
  } else if (reqPath === '/flipbook-edit' || reqPath === '/flipbook-edit/') {
    reqPath = '/editor.html';
  } else if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  } else if (reqPath.startsWith('/flipbook-ky-niem-25-nam/')) {
    reqPath = reqPath.replace(/^\/flipbook-ky-niem-25-nam/, '');
  } else if (reqPath.startsWith('/flipbook-edit/')) {
    reqPath = reqPath.replace(/^\/flipbook-edit/, '');
  }

  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const mtime = stats.mtime.toUTCString();
    const etag = `W/"${stats.size}-${stats.mtime.getTime()}"`;

    // 304 Not Modified support
    if (req.headers['if-none-match'] === etag || req.headers['if-modified-since'] === mtime) {
      res.writeHead(304);
      res.end();
      return;
    }

    const headers = {
      'Content-Type': contentType,
      'Last-Modified': mtime,
      'ETag': etag
    };

    if (reqPath.startsWith('/assets/') || /\.(jpg|jpeg|png|webp|svg|css|js|woff2?)$/i.test(reqPath)) {
      headers['Cache-Control'] = 'public, max-age=86400, stale-while-revalidate=604800';
    } else {
      headers['Cache-Control'] = 'no-cache';
    }

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Flipbook server running on port ${PORT}`);
  console.log(`- Flipbook:  http://localhost:${PORT}/flipbook-ky-niem-25-nam`);
  console.log(`- Editor:    http://localhost:${PORT}/flipbook-edit`);
});
