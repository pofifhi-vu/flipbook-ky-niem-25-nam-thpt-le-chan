// ═══════════════════════════════════════════════════════
//  KỶ YẾU 25 NĂM THPT LÊ CHÂN HẢI PHÒNG (2001–2026)
//  "Hành Trình Vàng — Một Phần Tư Thế Kỷ Dưới Mái Trường"
//  Bản chuẩn nội dung lịch sử & kỷ niệm 25 năm
// ═══════════════════════════════════════════════════════

const img = (file, alt, cls = '') => `
  <div class="pg-photo ${cls}" data-src="assets/photos/${file}" data-alt="${alt}">
    <img src="assets/photos/${file}" alt="${alt}" loading="lazy" decoding="async" draggable="false">
    <span class="zoom-hint" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    </span>
  </div>`;

const label = (num, text) => `<div class="pg-label"><span class="pg-label-num">${num}</span><span class="pg-label-text">${text}</span></div>`;

const duo = (items) => `<div class="pg-duo">${items.map(([f, a]) => img(f, a)).join('')}</div>`;
const quad = (items) => `<div class="pg-quad">${items.map(([f, a]) => img(f, a)).join('')}</div>`;
const trio = (items) => `<div class="pg-trio">${items.map(([f, a]) => img(f, a)).join('')}</div>`;
const mosaic = (items) => `<div class="pg-mosaic">${items.map(([f, a]) => img(f, a)).join('')}</div>`;

const BOOK_PAGES = [

  // ── 01 ── BÌA TRƯỚC ──
  {
    title: 'Hành Trình Vàng',
    className: 'pg-cover',
    cover: true,
    body: `
      <div class="cover-badge">KỶ YẾU 25 NĂM</div>
      <div class="cover-center">
        <div class="cover-line"></div>
        <h2 class="cover-heading">Hành Trình<br><span>Vàng</span></h2>
        <p class="cover-sub">Một phần tư thế kỷ dưới mái trường Lê Chân</p>
        <div class="cover-line"></div>
      </div>
      <div class="cover-footer">
        <span>TRƯỜNG THPT LÊ CHÂN · HẢI PHÒNG</span>
        <span class="cover-year">2001 — 2026</span>
      </div>
      ${img('campus-02.jpg', 'Toàn cảnh khuôn viên Trường THPT Lê Chân Hải Phòng', 'cover-bg')}
    `
  },

  // ── 02 ── THƯ NGỎ ──
  {
    title: 'Thư ngỏ từ mái trường',
    className: 'pg-prose',
    body: `<div class="prose-wrap">
      ${label('01', 'Thư ngỏ')}
      <h2>Lá thư gửi từ <em>mái trường.</em></h2>
      <div class="divider"></div>
      <p class="drop-cap">Hai mươi lăm năm — một phần tư thế kỷ là khoảng thời gian đủ để một thế hệ học trò trưởng thành, cũng là hành trình kiên trì dựng xây để mái trường THPT Lê Chân khẳng định vị thế vững chắc trong lòng Đảng bộ, chính quyền và nhân dân thành phố Cảng.</p>
      <p>Cuốn kỷ yếu này lưu giữ những ký ức không thể nào quên: từ những ngày đầu gian khó dựng lớp, từng bước chuyển mình vươn lên thành trường công lập, đến diện mạo khang trang, hiện đại hôm nay. Đó là lời tri ân sâu sắc nhất gửi tới quý thầy cô giáo, các thế hệ cựu học sinh và phụ huynh đã đồng hành cùng Lê Chân suốt 25 năm qua.</p>
      ${img('lc-25nam-01.jpg', 'Toàn cảnh Hội nghị khởi động chuỗi hoạt động kỷ niệm 25 năm thành lập trường THPT Lê Chân', 'prose-img')}
      <p class="sign-off">Hội đồng Sư phạm Trường THPT Lê Chân</p>
    </div>`
  },

  // ── 03 ── NỮ TƯỚNG LÊ CHÂN ──
  {
    title: 'Nữ tướng Lê Chân — Cội nguồn tự hào',
    className: 'pg-split',
    body: `<div class="prose-wrap">
      ${label('02', 'Cội nguồn tự hào')}
      <h2>Nữ tướng Lê Chân — <em>Khí phách ngàn thu.</em></h2>
      ${img('campus-01.jpg', 'Cổng trường THPT Lê Chân rạng rỡ dưới bóng cờ hoa', 'photo-grow')}
      <p>Trường vinh dự mang tên Nữ tướng Lê Chân — Thánh Chân Công chúa thời Hai Bà Trưng, người có công khai hoang lập ấp trang An Biên xưa, đặt nền móng dựng xây nên thành phố Hải Phòng anh hùng hôm nay.</p>
      <div class="divider"></div>
      <p class="note-serif">Tinh thần quả cảm, kiên trung và đức độ của Nữ tướng là ngọn đuốc soi đường cho bao thế hệ học sinh Lê Chân rèn đức, luyện tài.</p>
    </div>`
  },

  // ── 04 ── CỘT MỐC LỊCH SỬ ──
  {
    title: 'Ba dấu mốc chuyển mình',
    className: 'pg-milestones',
    body: `<div class="prose-wrap">
      ${label('03', 'Dấu ấn thời gian')}
      <h2>Ba dấu mốc <em>chuyển mình.</em></h2>
      <div class="ms-list">
        <div class="ms-item">
          <div class="ms-year">2001</div>
          <div class="ms-desc">
            <strong>Khởi nguồn gieo chữ</strong>
            <p>Ngày 12/07/2001, UBND TP. Hải Phòng ra QĐ số 1484/QĐ-UBND thành lập Trường THPT bán công Lê Chân. Thầy Hiệu trưởng Đoàn Đắc Lân cùng 10 thầy cô giáo đầu tiên đón 500 học sinh khóa 1.</p>
          </div>
        </div>
        <div class="ms-item">
          <div class="ms-year">2008</div>
          <div class="ms-desc">
            <strong>Chuyển sang công lập</strong>
            <p>Ngày 30/10/2008, QĐ số 1848/QĐ-UBND chuyển đổi trường sang loại hình công lập mang tên THPT Lê Chân, mở ra thời kỳ phát triển vượt bậc về quy mô và chất lượng đào tạo.</p>
          </div>
        </div>
        <div class="ms-item">
          <div class="ms-year">2026</div>
          <div class="ms-desc">
            <strong>25 năm Tự hào</strong>
            <p>Kỷ niệm một phần tư thế kỷ — vị thế vững chắc trong top trường chất lượng cao của thành phố với khuôn viên khang trang hơn 20.000 m² tại phường Vĩnh Niệm.</p>
          </div>
        </div>
      </div>
      ${duo([
        ['lc-25nam-04.jpg', 'Hội nghị khởi động chuỗi hoạt động kỷ niệm 25 năm thành lập trường THPT Lê Chân'],
        ['lc-25nam-07.jpg', 'Các đại biểu và thế hệ giáo chức tề tựu trong ngày hội lớn']
      ])}
    </div>`
  },

  // ── 05 ── NGÔI TRƯỜNG HÔM NAY ──
  {
    title: 'Ngôi trường hôm nay',
    className: 'pg-hero',
    body: `
      ${img('campus-02.jpg', 'Toàn cảnh khuôn viên trường THPT Lê Chân khang trang và hiện đại', 'hero-img')}
      <div class="hero-overlay">
        ${label('04', 'Khuôn viên')}
        <h2>Ngôi trường hôm nay — <em>Xanh và hiện đại.</em></h2>
        <p>Tọa lạc trên diện tích hơn 20.000 m² tại phường Vĩnh Niệm, quận Lê Chân — ngôi trường rợp mát bóng cây với các dãy nhà cao tầng khang trang, phòng học thông minh, sân chơi thể thao đáp ứng trọn vẹn chương trình giáo dục phổ thông mới.</p>
      </div>
    `
  },

  // ── 06 ── THÀNH TÍCH VÀNG ──
  {
    title: 'Bảng vàng thành tích',
    className: 'pg-grid',
    body: `<div class="prose-wrap">
      ${label('05', 'Thành tích vàng')}
      <h2>Tự hào <em>dẫn đầu chất lượng.</em></h2>
      <p>Suốt 25 năm nỗ lực không ngừng, THPT Lê Chân đã khẳng định vị thế vững chắc trong hệ thống giáo dục thành phố Hải Phòng bằng những kết quả đáng tự hào.</p>
      ${quad([
        ['lc-thanh-tich-2025.jpg', 'Lễ tuyên dương và khen thưởng học sinh giỏi, giáo viên xuất sắc'],
        ['lc-real-upu-hb218520241842_2052024838.jpg', 'Học sinh Lê Chân đạt giải cao các kỳ thi học sinh giỏi và viết thư quốc tế UPU'],
        ['lc-25nam-10.jpg', 'Tuyên dương cán bộ giáo viên dạy giỏi cấp cụm và thành phố'],
        ['lc-real-thpt-le-chan26_115202319.jpg', 'Học sinh say mê nghiên cứu và tỷ lệ đỗ đại học, cao đẳng luôn duy trì ở mức cao']
      ])}
      <p class="caption">100% tốt nghiệp THPT · >90% đỗ Đại học, Cao đẳng · Top 9 trong 66 trường THPT TP. Hải Phòng · Hơn 25 năm liên tục giữ vững danh hiệu Trường Tiên tiến.</p>
    </div>`
  },

  // ── 07 ── SÂN TRƯỜNG & CHÀO CỜ ──
  {
    title: 'Khoảng sân rực rỡ nắng mai',
    className: 'pg-hero',
    body: `
      ${img('fb-photo-571601.jpg', 'Toàn cảnh học sinh THPT Lê Chân tập trung trang nghiêm dưới sân trường cờ hoa rực rỡ', 'hero-img')}
      <div class="hero-overlay">
        ${label('06', 'Mái trường')}
        <h2>Khoảng sân <em>rực rỡ nắng mai.</em></h2>
        <p>Mỗi sáng thứ Hai, tiếng trống trường vang lên rộn rã. Bài Quốc ca cất lên hào hùng dưới bóng cờ đỏ sao vàng. Đó là hình ảnh thiêng liêng nhất, gắn bó sâu sắc với tuổi học trò dưới mái trường mang tên Nữ tướng Lê Chân.</p>
      </div>
    `
  },

  // ── 08 ── TIẾT HỌC MỖI NGÀY ──
  {
    title: 'Trong từng tiết học say mê',
    className: 'pg-split',
    body: `<div class="prose-wrap">
      ${label('07', 'Dạy và học')}
      <h2>Trong từng <em>tiết học say mê.</em></h2>
      ${img('lc-real-thpt-le-chan26_115202319.jpg', 'Thầy cô tận tâm hướng dẫn học sinh thảo luận chuyên đề')}
      <p class="note-serif">Lớp học không chỉ là nơi truyền đạt tri thức, mà là nơi khơi dậy đam mê sáng tạo và tinh thần học hỏi suốt đời.</p>
      ${img('lc-real-img2301_294202480.jpeg', 'Học sinh tự tin trình bày dự án học tập trước lớp', 'photo-short')}
      <p class="note-small">Phong trào thi đua "Dạy tốt — Học tốt" luôn là kim chỉ nam trong mọi hoạt động sư phạm của nhà trường suốt 25 năm qua.</p>
    </div>`
  },

  // ── 09 ── TRƯỜNG HỌC SỐ ──
  {
    title: 'Tiên phong trường học số',
    className: 'pg-grid',
    body: `<div class="prose-wrap">
      ${label('08', 'Đổi mới & Số hóa')}
      <h2>Tiên phong <em>trường học số.</em></h2>
      <p>Từ bảng phấn truyền thống đến màn hình tương tác thông minh, THPT Lê Chân luôn chủ động ứng dụng công nghệ hiện đại vào từng tiết dạy và quản lý học đường.</p>
      ${trio([
        ['fb-post-959139.jpg', 'Chuyển đổi số và ứng dụng công nghệ thông tin trong quản trị trường học'],
        ['lc-real-giam-sat-gd24420241738_2542024111.jpg', 'Hệ thống số hóa quản lý giáo dục và học tập thông minh'],
        ['lc-real-ctxhth_7520241454.png', 'Học sinh chủ động tiếp cận công nghệ và kỹ năng số trong học tập']
      ])}
      <p class="caption">Chuyên đề "Trường học số 2024" — Bước tiến bứt phá trong lộ trình chuyển đổi số của nhà trường.</p>
    </div>`
  },

  // ── 10 ── NGƯỜI ĐƯA ĐÒ ──
  {
    title: 'Người thắp sáng ngọn lửa',
    className: 'pg-dark',
    body: `<div class="prose-wrap">
      ${label('09', 'Người đưa đò')}
      <h2>Người <em>thắp sáng ngọn lửa.</em></h2>
      ${img('lc-25nam-05.jpg', 'Hội đồng sư phạm và tập thể cán bộ giáo viên THPT Lê Chân trang trọng trong ngày hội lớn', 'photo-grow')}
      <p class="note-serif">Một phần tư thế kỷ, biết bao thế hệ thầy cô đã trao trọn trí tuệ và tình thương cho sự nghiệp trồng người.</p>
      <p class="note-small">100% cán bộ giáo viên đạt chuẩn và trên chuẩn — nhiều thầy cô là giáo viên dạy giỏi cấp thành phố, chiến sĩ thi đua tận tụy cống hiến cho mái trường Lê Chân.</p>
    </div>`
  },

  // ── 11 ── TRI ÂN THẦY CÔ ──
  {
    title: 'Tri ân người chắp cánh',
    className: 'pg-dark',
    body: `<div class="prose-wrap">
      ${label('10', 'Tri ân')}
      <blockquote class="big-quote">Cảm ơn thầy cô vì đã luôn tin tưởng chúng em — ngay cả những khi chúng em chưa tin chính mình.</blockquote>
      <div class="divider divider-light"></div>
      <p>Đứng trên bục giảng 25 năm qua, các thầy cô không chỉ trao đi kiến thức mà còn trao niềm tin, lòng nhân ái và nhân cách làm người.</p>
      ${duo([
        ['lc-25nam-12.jpg', 'Gặp gỡ và tri ân các thế hệ nhà giáo gắn bó cùng mái trường Lê Chân'],
        ['lc-tet2026-1052.jpg', 'Học sinh biểu diễn các tiết mục văn nghệ đặc sắc dâng tặng thầy cô']
      ])}
      ${img('lc-25nam-16.jpg', 'Những bó hoa tươi thắm tri ân thầy cô trong ngày kỷ niệm 25 năm', 'photo-short')}
    </div>`
  },

  // ── 12 ── ĐOÀN THANH NIÊN & BAN TRUYỀN THÔNG ──
  {
    title: 'Sức trẻ xung kích & Ban Truyền Thông',
    className: 'pg-grid',
    body: `<div class="prose-wrap">
      ${label('11', 'Đoàn trường & BTT')}
      <h2>Sức trẻ <em>xung kích & Ống kính thanh xuân.</em></h2>
      <p>Đoàn TNCS Hồ Chí Minh và Ban Truyền Thông THPT Lê Chân — cái nôi rèn luyện bản lĩnh, giữ lửa nhiệt huyết và bắt trọn từng khoảnh khắc thanh xuân rực rỡ nhất dưới mái trường.</p>
      ${trio([
        ['union-01.png', 'Lễ kết nạp Đoàn viên mới trang nghiêm tại phòng truyền thống'],
        ['fb-photo-962096.jpg', 'Học sinh Lê Chân nhận thư chúc mừng của Ban Truyền Thông và Đoàn trường'],
        ['union-02.png', 'Nghi thức trao huy hiệu Đoàn cho thanh niên ưu tú']
      ])}
      <p class="note-serif">Bản lĩnh — Trách nhiệm — Sáng tạo: Ba giá trị cốt lõi khắc sâu trong từng hành động của tuổi trẻ Lê Chân.</p>
    </div>`
  },

  // ── 13 ── TRẢI NGHIỆM THỰC TẾ ──
  {
    title: 'Vươn ra thế giới rộng lớn',
    className: 'pg-hero',
    body: `
      ${img('lc-tet2026-1163.jpg', 'Học sinh Lê Chân náo nức tham gia các hoạt động ngoại khóa và trải nghiệm ngày hội lớn', 'hero-img')}
      <div class="hero-overlay">
        ${label('12', 'Trải nghiệm')}
        <h2>Vươn ra <em>thế giới rộng lớn.</em></h2>
        <p>Không chỉ học trong trang sách, học sinh Lê Chân được tham gia các chuyến hành trình về nguồn, tìm hiểu di tích lịch sử và danh lam thắng cảnh để bồi đắp vốn sống và tình yêu quê hương đất nước.</p>
      </div>
    `
  },

  // ── 14 ── DẤU CHÂN MƯỜI TÁM ──
  {
    title: 'Dấu chân trên mọi nẻo đường',
    className: 'pg-grid',
    body: `<div class="prose-wrap">
      ${label('13', 'Hành trình')}
      <h2>Dấu chân <em>trên mọi nẻo đường.</em></h2>
      ${quad([
        ['lc-tet2026-1212.jpg', 'Nụ cười rạng ngời của học sinh Lê Chân trong hoạt động tập thể'],
        ['lc-tet2026-1222.jpg', 'Tinh thần đồng đội gắn kết qua từng trò chơi dân gian'],
        ['fb-photo-103726.jpg', 'Nét duyên dáng thanh xuân của nữ sinh Lê Chân'],
        ['lc-tet2026-1045.jpg', 'Hào hứng khám phá không gian văn hóa học đường']
      ])}
      ${img('lc-tet2026-1389.jpg', 'Tập thể học sinh lưu niệm bên sân trường rực rỡ nắng vàng', 'photo-short')}
      <p class="caption">Hành trình ngoại khóa: Đi để mở rộng tầm nhìn, đi để gắn kết và yêu thương bạn bè nhiều hơn.</p>
    </div>`
  },

  // ── 15 ── HỘI XUÂN HỌC ĐƯỜNG ──
  {
    title: 'Mùa xuân nở trên sân trường',
    className: 'pg-hero',
    body: `
      ${img('lc-tet2026-stage-28.jpg', 'Không khí rộn ràng của chuyên đề Tết sum vầy – Xuân yêu thương trên sân trường THPT Lê Chân', 'hero-img')}
      <div class="hero-overlay">
        ${label('14', 'Hội xuân')}
        <h2>Mùa xuân <em>nở trên sân trường.</em></h2>
        <p>Mỗi dịp Tết, sân trường lại bừng lên sắc xuân. Cờ hoa rợp bóng, gian hàng ẩm thực thơm nức, tiếng cười nói rộn ràng — đó là ngày hội văn hóa mà ai ai cũng háo hức mong chờ.</p>
      </div>
    `
  },

  // ── 16 ── TẾT SUM VẦY ──
  {
    title: 'Tết sum vầy ấm áp',
    className: 'pg-grid',
    body: `<div class="prose-wrap">
      ${label('15', 'Tết sum vầy')}
      <h2>Ấm áp <em>hương vị Tết xưa.</em></h2>
      ${trio([
        ['lc-tet2026-1031.jpg', 'Gian hàng ẩm thực truyền thống ngày Tết do học sinh tự tay bài trí'],
        ['lc-tet2026-1085.jpg', 'Các tiết mục văn nghệ đặc sắc ca ngợi quê hương đất nước chào xuân'],
        ['lc-tet2026-stage-30.jpg', 'Khoảnh khắc sum vầy thân thương của thầy và trò THPT Lê Chân']
      ])}
      <p class="note-serif">Hội xuân ở Lê Chân không chỉ là ngày vui, mà còn là dịp gắn kết tình thân ái và tôn vinh văn hóa cổ truyền.</p>
    </div>`
  },

  // ── 17 ── XUÂN YÊU THƯƠNG ──
  {
    title: 'Xuân yêu thương — Cho đi là còn mãi',
    className: 'pg-split',
    body: `<div class="prose-wrap">
      ${label('16', 'Sẻ chia')}
      <h2>Xuân yêu thương — <em>Cho đi là còn mãi.</em></h2>
      ${img('lc-25nam-21.jpg', 'Chương trình Xuân yêu thương trao quà Tết và học bổng cho học sinh vượt khó', 'photo-tilt')}
      <p>Chương trình "Xuân yêu thương" là truyền thống nhân ái đáng quý của trường. Hàng trăm phần quà ý nghĩa đã trao tận tay học sinh vượt khó học giỏi — bởi sân trường ấm áp nhất khi không ai bị bỏ lại phía sau.</p>
      ${img('lc-25nam-24.jpg', 'Không khí rạng rỡ nghĩa tình trong ngày hội sum vầy ấm áp', 'photo-grow')}
      <p class="caption">Lan tỏa tinh thần tương thân tương ái — nét đẹp nhân văn sáng ngời của thầy trò THPT Lê Chân.</p>
    </div>`
  },

  // ── 18 ── THỂ THAO HỌC ĐƯỜNG ──
  {
    title: 'Hết mình với tuổi trẻ',
    className: 'pg-grid',
    body: `<div class="prose-wrap">
      ${label('17', 'Đua tài')}
      <h2>Hết mình <em>với tuổi trẻ.</em></h2>
      <p>Sân trường bùng nổ nhiệt huyết trong các hội thi tài năng, trò chơi dân gian và phong trào đua tài sôi nổi của học sinh Lê Chân.</p>
      ${quad([
        ['lc-tet2026-1212.jpg', 'Hội thi viết thư pháp và trò chơi dân gian sôi nổi giữa các khối lớp'],
        ['lc-tet2026-1222.jpg', 'Trao thưởng và tôn vinh tinh thần đồng đội xuất sắc trên sân khấu'],
        ['lc-tet2026-1163.jpg', 'Sân trường náo nức với các hoạt động trải nghiệm văn hóa thể thao'],
        ['lc-tet2026-1389.jpg', 'Tiếng reo hò cổ vũ cuồng nhiệt và nụ cười rạng rỡ của cả sân trường']
      ])}
      <p class="caption">Chiến thắng đẹp nhất là tinh thần fair-play, sự gắn kết đồng đội và những kỷ niệm rực rỡ tuổi học trò.</p>
    </div>`
  },

  // ── 19 ── TÌNH BẠN DIỆU KỲ ──
  {
    title: 'Bạn bè — Kho báu thanh xuân',
    className: 'pg-split',
    body: `<div class="prose-wrap">
      ${label('18', 'Tình bạn')}
      <h2>Bạn bè — <em>Kho báu thanh xuân.</em></h2>
      ${img('fb-photo-962096.jpg', 'Nụ cười trong veo của những người bạn cùng lớp dưới mái trường Lê Chân', 'photo-grow')}
      <p>Sau tất cả, tài sản vô giá nhất mà ba năm cấp ba trao tặng không chỉ là kiến thức, mà là những người bạn đã cùng ta sẻ chia những vui buồn của tuổi học trò.</p>
      <div class="divider"></div>
      <p class="note-small">Năm tháng sẽ trôi, nhưng tình bạn thuở hoa niên dưới mái trường Lê Chân sẽ mãi trong sáng như ngày đầu gặp gỡ.</p>
    </div>`
  },

  // ── 20 ── LỄ TRI ÂN TRƯỞNG THÀNH ──
  {
    title: 'Ngày ta trưởng thành — Khi tôi 18',
    className: 'pg-hero',
    body: `
      ${img('lc-25nam-18.jpg', 'Khoảnh khắc thiêng liêng và xúc động trong ngày hội ngộ và tri ân', 'hero-img')}
      <div class="hero-overlay">
        ${label('19', 'Trưởng thành')}
        <h2>Khắc sâu <em>ơn cha nghĩa thầy.</em></h2>
        <p>Khoảnh khắc tiếng ve râm ran báo hiệu mùa hạ cuối. Lời tri ân nghẹn ngào gửi đến cha mẹ, lời hứa son sắt dâng lên thầy cô. Mười tám tuổi, những cánh chim non đã vững vàng cất cánh bay xa.</p>
      </div>
    `
  },

  // ── 21 ── MÙA CHIA TAY ──
  {
    title: 'Mùa hạ cuối dưới tán phượng hồng',
    className: 'pg-grid',
    body: `<div class="prose-wrap">
      ${label('20', 'Chia tay')}
      <h2>Lưu bút <em>mùa hạ cuối.</em></h2>
      ${duo([
        ['lc-25nam-20.jpg', 'Giây phút nghẹn ngào xúc động trong ngày hội ngộ tri ân'],
        ['lc-25nam-22.jpg', 'Thầy cô dặn dò và gửi trọn niềm tin cho học trò thân yêu']
      ])}
      ${img('lc-25nam-25.jpg', 'Tập thể lưu niệm trước thềm dấu mốc 25 năm thành lập trường', 'photo-short')}
      <p class="note-serif">Tạm biệt bảng đen phấn trắng, tạm biệt tà áo trắng tinh khôi — Lê Chân mãi là mái nhà ấm áp để trở về.</p>
    </div>`
  },

  // ── 22 ── MẢNH GHÉP KÝ ỨC ──
  {
    title: 'Album ký ức Lê Chân',
    className: 'pg-grid',
    body: `<div class="prose-wrap">
      ${label('21', 'Ký ức')}
      <h2>Mảnh ghép <em>thanh xuân rực rỡ.</em></h2>
      <div class="pg-filmstrip">
        ${mosaic([
          ['fb-photo-571601.jpg', 'Chuyên đề an toàn và ngoại khóa dưới sân trường THPT Lê Chân'],
          ['fb-post-959139.jpg', 'Hội nghị công bố quyết định nâng cấp Chi bộ trường THPT Lê Chân'],
          ['lc-tet2026-1085.jpg', 'Tiết mục văn nghệ chào xuân rạng rỡ của học sinh'],
          ['lc-25nam-08.jpg', 'Đại biểu và thế hệ giáo chức tề tựu trong ngày kỷ niệm 25 năm'],
          ['lc-tet2026-1052.jpg', 'Điệu múa duyên dáng của nữ sinh THPT Lê Chân'],
          ['lc-25nam-14.jpg', 'Nụ cười hội ngộ của các thế hệ cựu học sinh trở về thăm trường']
        ])}
      </div>
      <p class="caption">Sáu khoảnh khắc — ngàn kỷ niệm: Những mảnh ghép thiêng liêng dệt nên câu chuyện 25 năm rạng rỡ.</p>
    </div>`
  },

  // ── 23 ── 25 NĂM TỰ HÀO ──
  {
    title: '25 Năm — Một phần tư thế kỷ',
    className: 'pg-accent',
    body: `<div class="prose-wrap">
      ${label('22', '2001 — 2026')}
      <div class="giant-number">25</div>
      <h2>Một phần tư thế kỷ. <em>Vạn niềm tự hào.</em></h2>
      <p>Hơn 15.000 học sinh đã trưởng thành và tỏa đi khắp mọi miền Tổ quốc. Ngày 19/04/2026, chuỗi hoạt động kỷ niệm 25 năm thành lập trường mở hội chào đón các thế hệ thầy và trò cùng sum vầy hội ngộ.</p>
      ${duo([
        ['lc-25nam-01.jpg', 'Hội nghị khởi động chuỗi sự kiện kỷ niệm 25 năm thành lập trường THPT Lê Chân'],
        ['lc-25nam-03.jpg', 'Ban Giám hiệu và các thế hệ cán bộ giáo viên sum họp ngày vui chung']
      ])}
      <p class="note-small">25 năm một chặng đường vàng — Tự hào truyền thống, vững bước tương lai tươi sáng.</p>
    </div>`
  },

  // ── 24 ── BÌA SAU ──
  {
    title: 'Bìa sau',
    className: 'pg-back',
    cover: true,
    body: `
      <div class="back-inner">
        <div class="back-logo-ring">
          <img src="assets/school-logo.jpg" alt="Logo THPT Lê Chân" class="back-logo">
        </div>
        <div class="back-school">TRƯỜNG THPT LÊ CHÂN</div>
        <div class="back-years">2001 — 2026</div>
        <div class="divider divider-gold"></div>
        <p class="back-addr">Khu 5, Phường Vĩnh Niệm · Quận Lê Chân · TP. Hải Phòng</p>
        <p class="back-addr">Điện thoại: 0225 3272 519 · Email: thpt-lechan@haiphong.edu.vn</p>
        <p class="back-web">thptlechan.haiphong.edu.vn</p>
        <p class="back-addr" style="font-size:10px;opacity:0.85">FB Trường: fb.com/truongthptlechanhaiphong<br>Ban Truyền Thông: fb.com/thptlechanhaiphong</p>
        ${img('campus-02.jpg', 'THPT Lê Chân — Mái nhà chung của nhiều thế hệ học sinh', 'back-photo')}
        <p class="back-tagline">Hành Trình Vàng — Một Phần Tư Thế Kỷ Dưới Mái Trường</p>
      </div>
    `
  }
];
