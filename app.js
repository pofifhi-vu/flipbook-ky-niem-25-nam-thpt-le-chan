// ═══════════════════════════════════════════════════════
//  APP.JS — Kỷ Yếu THPT Lê Chân "Hành Trình Vàng"
//  Core: StPageFlip + lightbox + TOC + keyboard nav
// ═══════════════════════════════════════════════════════

const bookEl = document.querySelector('#book');
const mountEl = document.querySelector('#book-mount');
const prevBtn = document.querySelector('#prev-page');
const nextBtn = document.querySelector('#next-page');
const lightbox = document.querySelector('#lightbox');
const tocDialog = document.querySelector('#toc-dialog');
const progressBar = document.querySelector('#progress-bar');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ─── CHECK CUSTOM PAGES FROM LOCALSTORAGE ───
let pagesData = typeof BOOK_PAGES !== 'undefined' ? BOOK_PAGES : [];
try {
  const saved = localStorage.getItem('thpt_lechan_flipbook_custom');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const serialized = JSON.stringify(parsed);
      const hasOldStock = serialized.includes('study-01.jpg') || serialized.includes('anniversary-01.jpg') || serialized.includes('journey-01.jpg') || serialized.includes('spring-01.jpg');
      const hasOldPage18 = serialized.includes('lc-tet2026-1212.jpg') && !serialized.includes('lc-tet2026-1389.jpg');
      const hasOldBanner = serialized.includes('fb-photo-103726.jpg');
      if (hasOldStock || hasOldPage18 || hasOldBanner) {
        localStorage.removeItem('thpt_lechan_flipbook_custom');
      } else {
        pagesData = parsed;
      }
    }
  }
} catch (e) {
  console.warn('LocalStorage error:', e);
}

// ─── RENDER PAGES INTO DOM ───
bookEl.innerHTML = pagesData.map((pg, i) => `
  <article class="page ${pg.className}" data-idx="${i}" aria-label="Trang ${i + 1}: ${pg.title}">
    <div class="page-content">
      ${pg.body}
      ${pg.cover ? '' : `<footer class="folio"><b>${String(i + 1).padStart(2, '0')}</b></footer>`}
    </div>
  </article>`).join('');

let flip = null;
let flipping = false;

// ─── HASH ROUTING ───
function readHash() {
  const m = /^#p=(\d{1,2})$/.exec(location.hash);
  const p = m ? Number(m[1]) - 1 : 0;
  return p >= 0 && p < pagesData.length ? p : 0;
}

// ─── SYNC UI ───
function sync() {
  if (!flip) return;
  const cur = flip.getCurrentPageIndex();
  const portrait = flip.getOrientation() === 'portrait';
  const single = portrait || cur === 0 || cur === pagesData.length - 1;
  const last = single ? cur : Math.min(cur + 1, pagesData.length - 1);

  // Page counter
  const el = document.querySelector('#page-number');
  if (el) {
    el.innerHTML = `${String(cur + 1).padStart(2, '0')}${last > cur ? ` – ${String(last + 1).padStart(2, '0')}` : ''} <span class="of">/ ${pagesData.length}</span>`;
  }

  // Progress bar
  if (progressBar) {
    progressBar.style.width = `${Math.round(((last + 1) / pagesData.length) * 100)}%`;
  }

  // Buttons
  if (prevBtn) prevBtn.disabled = cur === 0;
  if (nextBtn) nextBtn.disabled = last === pagesData.length - 1;

  // Hash
  history.replaceState(null, '', `#p=${cur + 1}`);

  // Highlight active page in TOC
  const tocEntries = document.querySelectorAll('#toc-list .toc-entry');
  if (tocEntries.length) {
    tocEntries.forEach(btn => {
      const p = Number(btn.dataset.go);
      btn.classList.toggle('active', p >= cur && p <= last);
    });
  }

  // Aria + preload
  bookEl.querySelectorAll('.page').forEach(page => {
    const idx = Number(page.dataset.idx);
    const vis = idx >= cur && idx <= last;
    page.setAttribute('aria-hidden', String(!vis));
    page.inert = !vis;
    if (idx >= cur - 1 && idx <= last + 2) {
      page.querySelectorAll('img').forEach(i => { i.loading = 'eager'; });
    }
  });
}

// ─── FLIP HELPERS ───
function doFlip(action) {
  if (!flip) return;
  const s = flip.getSettings();
  s.disableFlipByClick = false;
  try { action(); } finally { s.disableFlipByClick = true; }
}

function jumpTo(page) {
  if (!flip || flipping || page < 0 || page >= pagesData.length) return;
  if (reducedMotion.matches) {
    flip.turnToPage(page);
    sync();
  } else {
    doFlip(() => flip.flip(page, 'bottom'));
  }
}

function turn(dir) {
  if (!flip || flipping) return;
  if (dir > 0 && nextBtn?.disabled) return;
  if (dir < 0 && prevBtn?.disabled) return;
  if (reducedMotion.matches) {
    dir > 0 ? flip.turnToNextPage() : flip.turnToPrevPage();
    sync();
  } else {
    doFlip(() => dir > 0 ? flip.flipNext('bottom') : flip.flipPrev('bottom'));
  }
}

// ─── INIT PAGEFLIP ───
try {
  flip = new St.PageFlip(bookEl, {
    width: 440, height: 590, size: 'stretch',
    minWidth: 240, maxWidth: 660, minHeight: 320, maxHeight: 900,
    showCover: true, usePortrait: true, autoSize: false,
    drawShadow: true, maxShadowOpacity: 0.22,
    flippingTime: reducedMotion.matches ? 1 : 700,
    mobileScrollSupport: true, swipeDistance: 30,
    showPageCorners: true, disableFlipByClick: true,
    clickEventForward: true, useMouseEvents: true,
    startPage: readHash()
  });
  flip.on('flip', sync);
  flip.on('changeOrientation', () => requestAnimationFrame(sync));
  flip.on('changeState', e => { flipping = e.data === 'flipping' || e.data === 'user_fold'; });
  flip.loadFromHTML(bookEl.querySelectorAll('.page'));
  bookEl.classList.add('ready');
  const note = document.querySelector('#loading-note');
  if (note) note.hidden = true;
  sync();
} catch (err) {
  const note = document.querySelector('#loading-note');
  if (note) note.hidden = true;
  const errEl = document.querySelector('#reader-error');
  if (errEl) {
    errEl.textContent = 'Không thể mở sách. Hãy tải lại trang.';
    errEl.hidden = false;
  }
  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) nextBtn.disabled = true;
  console.error('PageFlip init error:', err);
}

// ─── NAV EVENTS ───
prevBtn?.addEventListener('click', () => turn(-1));
nextBtn?.addEventListener('click', () => turn(1));
window.addEventListener('hashchange', () => jumpTo(readHash()));
window.addEventListener('resize', () => { if (flip) requestAnimationFrame(sync); });

// Mouse wheel
let wDelta = 0, wLast = 0, wDone = false;
document.querySelector('.reader')?.addEventListener('wheel', e => {
  if (!flip || lightbox?.open || tocDialog?.open || e.ctrlKey || e.metaKey || !e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  e.preventDefault();
  const now = performance.now();
  if (now - wLast > 200) { wDelta = 0; wDone = false; }
  wLast = now;
  if (flipping || wDone) { wDone = true; return; }
  if (Math.sign(wDelta) !== Math.sign(e.deltaY)) wDelta = 0;
  wDelta += e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1);
  if (Math.abs(wDelta) < 45) return;
  wDone = true;
  turn(Math.sign(wDelta));
}, { passive: false });

// Keyboard
document.addEventListener('keydown', e => {
  if (document.querySelector('dialog[open]')) {
    if (e.key === 'Escape') return; // let dialog handle it
    return;
  }
  if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.altKey || e.ctrlKey || e.metaKey) return;
  switch (e.key) {
    case 'ArrowRight': case 'PageDown': case ' ':
      e.preventDefault(); turn(1); break;
    case 'ArrowLeft': case 'PageUp':
      e.preventDefault(); turn(-1); break;
    case 'Home':
      e.preventDefault(); jumpTo(0); break;
    case 'End':
      e.preventDefault(); jumpTo(pagesData.length - 1); break;
    case 'f': case 'F':
      toggleFS(); break;
    case 't': case 'T':
      tocDialog?.showModal(); break;
  }
});

// ─── LIGHTBOX ───
let ptrStart = null, ignoreUntil = 0;
bookEl.addEventListener('pointerdown', e => { ptrStart = { x: e.clientX, y: e.clientY }; }, true);
bookEl.addEventListener('pointerup', e => {
  if (ptrStart && Math.hypot(e.clientX - ptrStart.x, e.clientY - ptrStart.y) > 12) ignoreUntil = Date.now() + 400;
  ptrStart = null;
}, true);

bookEl.addEventListener('click', e => {
  const t = e.target.closest('[data-src]');
  if (!t || flipping || Date.now() < ignoreUntil) return;
  const lbImg = document.querySelector('#lb-img');
  if (lbImg && lightbox) {
    lbImg.src = t.dataset.src;
    lbImg.alt = t.dataset.alt || '';
    document.querySelector('#lb-caption').textContent = t.dataset.alt || '';
    lightbox.showModal();
  }
});

// Close dialogs
document.querySelectorAll('dialog').forEach(d => {
  const btn = d.querySelector('[data-close]');
  btn?.addEventListener('click', () => d.close());
  d.addEventListener('click', e => { if (e.target === d) d.close(); });
});
lightbox?.addEventListener('close', () => {
  const i = document.querySelector('#lb-img');
  if (i) i.removeAttribute('src');
});

// ─── TABLE OF CONTENTS ───
const tocList = document.querySelector('#toc-list');
const btnToc = document.querySelector('#btn-toc');
if (tocList) {
  tocList.innerHTML = pagesData.map((pg, i) => `
    <button class="toc-entry" type="button" data-go="${i}">
      <span class="toc-entry-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="toc-entry-name">${pg.title}</span>
    </button>
  `).join('');
  tocList.querySelectorAll('.toc-entry').forEach(btn => {
    btn.addEventListener('click', () => {
      tocDialog?.close();
      jumpTo(Number(btn.dataset.go));
    });
  });
}
btnToc?.addEventListener('click', () => tocDialog?.showModal());

// ─── FULLSCREEN & FOCUS MODE ───
let fsTimer = null;
function resetFSTimer() {
  document.body.classList.remove('focus-dimmed');
  if (fsTimer) clearTimeout(fsTimer);
  if (document.fullscreenElement) {
    fsTimer = setTimeout(() => {
      if (document.fullscreenElement && !document.querySelector('dialog[open]')) {
        document.body.classList.add('focus-dimmed');
      }
    }, 3500);
  }
}
document.addEventListener('mousemove', resetFSTimer);
document.addEventListener('touchstart', resetFSTimer, { passive: true });
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    document.body.classList.remove('focus-dimmed');
    if (fsTimer) clearTimeout(fsTimer);
  } else {
    resetFSTimer();
  }
});

function toggleFS() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}
document.querySelector('#btn-fullscreen')?.addEventListener('click', toggleFS);

// ─── PRINT ───
const printRoot = document.querySelector('#print-root');
function buildPrint() {
  if (!printRoot) return;
  printRoot.innerHTML = pagesData.map((pg, i) => `
    <article class="page ${pg.className}">
      <div class="page-content">${pg.body}${pg.cover ? '' : `<footer class="folio"><b>${i + 1}</b></footer>`}</div>
    </article>`).join('');
  printRoot.querySelectorAll('img').forEach(i => { i.loading = 'eager'; });
}
window.addEventListener('beforeprint', () => { if (printRoot && !printRoot.children.length) buildPrint(); });
window.addEventListener('afterprint', () => { printRoot?.replaceChildren(); });
