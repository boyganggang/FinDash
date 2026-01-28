const quiz = [
  // ===== HTML =====
  { q: "HTML dùng để làm gì?", a: ["Trang trí", "Xử lý logic", "Tạo cấu trúc web", "Lưu dữ liệu"], correct: 2 },
  { q: "Thẻ nào tạo liên kết?", a: ["<div>", "<a>", "<p>", "<span>"], correct: 1 },
  { q: "Thẻ nào để hiển thị hình ảnh?", a: ["<img>", "<image>", "<pic>", "<photo>"], correct: 0 },
  { q: "Thuộc tính alt dùng để?", a: ["Đổi màu ảnh", "SEO & khi ảnh lỗi", "Link ảnh", "Resize ảnh"], correct: 1 },
  { q: "Thẻ nào xuống dòng?", a: ["<br>", "<hr>", "<p>", "<span>"], correct: 0 },

  // ===== CSS =====
  { q: "CSS dùng để?", a: ["Trang trí giao diện", "Xử lý logic", "Database", "API"], correct: 0 },
  { q: "Thuộc tính đổi màu chữ?", a: ["background", "color", "font-style", "text-align"], correct: 1 },
  { q: "display: flex dùng để?", a: ["Ẩn phần tử", "Layout linh hoạt", "Animation", "Responsive ảnh"], correct: 1 },
  { q: "justify-content dùng để?", a: ["Căn dọc", "Căn ngang", "Đổi màu", "Ẩn div"], correct: 1 },
  { q: "align-items dùng để?", a: ["Căn dọc", "Căn ngang", "Font size", "Padding"], correct: 0 },

  // ===== JAVASCRIPT =====
  { q: "JavaScript dùng để?", a: ["Trang trí", "Tạo tương tác", "Lưu database", "Thiết kế UI"], correct: 1 },
  { q: "Khai báo biến đúng?", a: ["int a", "var a", "string a", "define a"], correct: 1 },
  { q: "Hàm in ra console?", a: ["alert()", "print()", "console.log()", "log()"], correct: 2 },
  { q: "Sự kiện click?", a: ["onhover", "onclick", "onchange", "onsubmit"], correct: 1 },
  { q: "DOM là gì?", a: ["Database", "Cấu trúc HTML trong JS", "API", "Framework"], correct: 1 },

  // ===== WEB =====
  { q: "HTTP là gì?", a: ["Ngôn ngữ", "Giao thức", "Database", "Framework"], correct: 1 },
  { q: "Frontend là gì?", a: ["Server", "Người dùng nhìn thấy", "Database", "API"], correct: 1 },
  { q: "Backend là gì?", a: ["Giao diện", "Xử lý server", "HTML", "CSS"], correct: 1 },
  { q: "API dùng để?", a: ["Trang trí", "Kết nối hệ thống", "Viết CSS", "Chạy game"], correct: 1 },
  { q: "localStorage dùng để?", a: ["Lưu server", "Lưu trình duyệt", "Lưu DB", "Lưu ảnh"], correct: 1 },

  // ===== FIREBASE =====
  { q: "Firebase Auth dùng để?", a: ["Lưu ảnh", "Đăng nhập", "CSS", "API"], correct: 1 },
  { q: "Firestore là gì?", a: ["SQL DB", "NoSQL DB", "File system", "Cache"], correct: 1 },
  { q: "Firebase Storage dùng để?", a: ["Lưu ảnh/file", "Login", "API", "CSS"], correct: 0 },
  { q: "UID là gì?", a: ["Tên user", "ID duy nhất", "Password", "Email"], correct: 1 },
  { q: "onAuthStateChanged dùng để?", a: ["Đăng ký", "Theo dõi login", "Logout", "Reset pass"], correct: 1 },

  // ===== KIẾN THỨC CHUNG =====
  { q: "Git dùng để?", a: ["Thiết kế UI", "Quản lý mã nguồn", "Viết JS", "Chạy server"], correct: 1 },
  { q: "Framework là?", a: ["CSS", "Bộ hỗ trợ lập trình", "Database", "Server"], correct: 1 },
  { q: "Responsive là?", a: ["Đẹp", "Tự co giãn màn hình", "Màu sắc", "Animation"], correct: 1 },
  { q: "Bug là gì?", a: ["Tính năng", "Lỗi code", "Framework", "API"], correct: 1 },
  { q: "Deploy là gì?", a: ["Viết code", "Đưa web lên mạng", "Test", "Debug"], correct: 1 }
];

window.quizData = quiz;
