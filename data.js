const FLIPBOOK_DATA = {
  title: "25 NĂM — MỘT CHẶNG ĐƯỜNG",
  subtitle: "Trường THPT Lê Chân • Hải Phòng • 2001 – 2026",
  theme: {
    primaryColor: "#0d2240",
    accentColor: "#c8a951",
    bgColor: "#f8f6f0",
    textLight: "#ffffff",
    textDark: "#1a1a2e",
  },
  pages: [
    {
      id: "cover", type: "cover",
      title: "25 NĂM", subtitle: "MỘT CHẶNG ĐƯỜNG",
      body: "TRƯỜNG THPT LÊ CHÂN • HẢI PHÒNG",
      year: "2001 – 2026",
      image: "assets/photos/lc-banner-moi.png",
      logo: "assets/school-logo.jpg",
      bgColor: "#0d2240", textColor: "#ffffff", accentColor: "#c8a951",
    },
    {
      id: "intro", type: "quote", label: "LỜI NGỎ",
      quote: "25 năm — khoảng thời gian đủ để một người trưởng thành, và cũng đủ để mái trường THPT Lê Chân trở thành một phần thanh xuân rực rỡ của biết bao thế hệ.",
      body: "Nhân dịp kỷ niệm 25 năm thành lập và phát triển (2001 – 2026), tập thể cán bộ, giáo viên, nhân viên và học sinh nhà trường cùng nhìn lại hành trình đã qua — với tất cả niềm tự hào và lòng tri ân sâu sắc.",
      author: "Ban Giám hiệu Trường THPT Lê Chân",
      bgColor: "#ffffff", textColor: "#0d2240", accentColor: "#c8a951", image: "",
    },
    {
      id: "le-chan-story", type: "image-left", label: "NGƯỜI ANH HÙNG",
      title: "Nữ tướng Lê Chân", subtitle: "khoảng năm 20 – 43 Công nguyên",
      body: "Người con ưu tú của đất Việt, khai phá vùng đất An Biên — nền tảng của thành phố Hải Phòng ngày nay. Bà theo Hai Bà Trưng phất cờ khởi nghĩa, được phong làm Thánh Chân Công chúa, thống lĩnh toàn bộ quân đội. Tinh thần bất khuất của Bà là nguồn cảm hứng bất tận cho các thế hệ học sinh mang tên Bà.",
      image: "assets/photos/campus-01.jpg",
      imageCaption: "Cổng trường THPT Lê Chân rạng rỡ dưới bóng cờ hoa",
      bgColor: "#0d2240", textColor: "#ffffff", accentColor: "#c8a951",
    },
    {
      id: "origin-2001", type: "timeline-page", label: "KHỞI NGUỒN", year: "2001",
      title: "Những ngày đầu tiên",
      body: "Ngày 12/07/2001, trường chính thức thành lập theo Quyết định số 1484/QĐ-UBND của UBND TP. Hải Phòng với tên gọi Trường THPT bán công Lê Chân. Những ngày đầu với muôn vàn khó khăn: chỉ 10 lớp học, 500 học sinh, 10 giáo viên cơ hữu dưới sự dẫn dắt của Hiệu trưởng đầu tiên — thầy Đoàn Đắc Lân.",
      stats: [
        { number: "10", label: "Lớp học" },
        { number: "500", label: "Học sinh" },
        { number: "10", label: "Giáo viên" }
      ],
      image: "assets/photos/campus-01.jpg",
      bgColor: "#f8f6f0", textColor: "#0d2240", accentColor: "#c8a951",
    },
    {
      id: "transform-2008", type: "timeline-page", label: "CHUYỂN MÌNH", year: "2008",
      title: "Từ bán công sang công lập",
      body: "Ngày 30/10/2008, theo Quyết định số 1848/QĐ-UBND, trường chính thức chuyển đổi từ loại hình bán công sang công lập và mang tên THPT Lê Chân — dấu mốc lịch sử khẳng định vị thế ngày càng cao của nhà trường trong lòng phụ huynh và học sinh thành phố Cảng.",
      stats: [
        { number: "2008", label: "Năm chuyển đổi" },
        { number: "Công lập", label: "Loại hình mới" }
      ],
      image: "assets/photos/lc-25nam-04.jpg",
      bgColor: "#0d2240", textColor: "#ffffff", accentColor: "#c8a951",
    },
    {
      id: "school-today", type: "image-full", label: "HÔM NAY",
      title: "Ngôi trường hôm nay",
      body: "Khuôn viên rộng hơn 20.000 m² tại phường Vĩnh Niệm, quận Lê Chân — cơ sở vật chất khang trang, hiện đại, là môi trường lý tưởng để hàng nghìn học sinh học tập và phát triển mỗi năm.",
      image: "assets/photos/campus-02.jpg",
      bgColor: "#1a1a2e", textColor: "#ffffff", accentColor: "#c8a951",
    },
    {
      id: "achievements", type: "stats-page", label: "TỰ HÀO",
      title: "Thành tích & Tự hào",
      body: "Qua 25 năm xây dựng và trưởng thành, THPT Lê Chân đã khẳng định vị thế dẫn đầu trong khối các trường THPT không chuyên tại Hải Phòng.",
      stats: [
        { number: "100%", label: "Tỷ lệ tốt nghiệp THPT" },
        { number: "90%", label: "Đỗ đại học, cao đẳng" },
        { number: "Top 9", label: "Trong 66 trường THPT TP" },
        { number: "25+", label: "Năm liên tục Trường Tiên tiến" }
      ],
      image: "assets/photos/lc-thanh-tich-2025.jpg",
      bgColor: "#f8f6f0", textColor: "#0d2240", accentColor: "#c8a951",
    },
    {
      id: "activities", type: "gallery", label: "THANH XUÂN",
      title: "Thanh xuân rực rỡ",
      body: "Từ chuyên đề Tết sum vầy, các hội thi học sinh giỏi, văn hóa, thể thao đến phong trào Đoàn thanh niên — mỗi hoạt động là một mảnh ghép rực rỡ.",
      images: [
        { src: "assets/photos/lc-tet2026-1031.jpg", caption: "Gian hàng Tết truyền thống do học sinh tự tay dựng" },
        { src: "assets/photos/lc-tet2026-1052.jpg", caption: "Tiết mục văn nghệ đặc sắc chào xuân" },
        { src: "assets/photos/lc-tet2026-1163.jpg", caption: "Học sinh tham gia hoạt động trải nghiệm dân gian" },
        { src: "assets/photos/lc-tet2026-1389.jpg", caption: "Không khí sôi động ngày hội dưới sân trường" }
      ],
      bgColor: "#0d2240", textColor: "#ffffff", accentColor: "#c8a951",
    },
    {
      id: "anniversary", type: "image-right", label: "DẤU MỐC VÀNG",
      title: "Hội nghị kỷ niệm 25 năm", subtitle: "Tháng 4 / 2026",
      body: "Ngày 19/04/2026, nhà trường trang trọng tổ chức Hội nghị khởi động chuỗi hoạt động kỷ niệm 25 năm thành lập, chào đón các cựu giáo viên chủ nhiệm và cựu học sinh qua các thời kỳ cùng về tụ họp dưới mái trường xưa.",
      image: "assets/photos/lc-25nam-01.jpg",
      imageCaption: "Hội nghị kỷ niệm 25 năm thành lập trường THPT Lê Chân (2001–2026)",
      bgColor: "#f8f6f0", textColor: "#0d2240", accentColor: "#c8a951",
    },
    {
      id: "teachers", type: "quote", label: "TRI ÂN",
      quote: "Người thầy giáo không phải là người nhồi nhét kiến thức, mà là người thắp sáng ngọn lửa tư duy.",
      body: "Qua 25 năm, hàng trăm thầy cô đã cống hiến hết mình cho sự nghiệp trồng người. Đội ngũ cán bộ, giáo viên đạt chuẩn và trên chuẩn — nhiều thầy cô đạt danh hiệu giáo viên giỏi cấp thành phố, là nền tảng vững chắc cho chất lượng giáo dục của nhà trường.",
      author: "Tập thể Giáo viên THPT Lê Chân",
      image: "assets/photos/lc-25nam-05.jpg",
      bgColor: "#0d2240", textColor: "#ffffff", accentColor: "#c8a951",
    },
    {
      id: "back-cover", type: "back-cover",
      title: "25 năm — và hành trình phía trước",
      body: "Với nền tảng vững chắc sau 25 năm xây dựng, THPT Lê Chân tự hào tiếp bước hành trình mới — vươn cao, vươn xa, xứng danh ngôi trường mang tên Nữ tướng hào kiệt đất Hải Phòng.",
      address: "Khu 5, Vĩnh Niệm, Quận Lê Chân, Hải Phòng",
      phone: "0225 3272 519",
      website: "thptlechan.haiphong.edu.vn",
      logo: "assets/school-logo.jpg",
      bgColor: "#0d2240", textColor: "#ffffff", accentColor: "#c8a951",
    },
  ],
};
