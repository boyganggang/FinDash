const quiz = [
  // ===== HTML =====
  {
    q: "HTML dùng để làm gì?",
    a: ["Trang trí", "Xử lý logic", "Tạo cấu trúc web", "Lưu dữ liệu"],
    correct: 2
  },
  {
    q: "Thẻ nào dùng để tạo liên kết?",
    a: ["<div>", "<a>", "<p>", "<span>"],
    correct: 1
  },
  {
    q: "Thuộc tính nào dùng cho ảnh?",
    a: ["src", "href", "alt", "link"],
    correct: 0
  },
  {
    q: "Thẻ nào dùng để xuống dòng?",
    a: ["<hr>", "<br>", "<p>", "<span>"],
    correct: 1
  },

  // ===== CSS =====
  {
    q: "CSS dùng để làm gì?",
    a: ["Trang trí giao diện", "Database", "API", "Server"],
    correct: 0
  },
  {
    q: "Thuộc tính nào đổi màu chữ?",
    a: ["background", "color", "font", "text"],
    correct: 1
  },
  {
    q: "display: flex dùng để?",
    a: ["Ẩn phần tử", "Tạo layout linh hoạt", "Animation", "Đổ bóng"],
    correct: 1
  },
  {
    q: "Thuộc tính nào căn giữa theo chiều ngang?",
    a: ["align-items", "justify-content", "text-align", "float"],
    correct: 1
  },
  {
    q: "Đơn vị nào là responsive?",
    a: ["px", "cm", "%", "pt"],
    correct: 2
  },

  // ===== JAVASCRIPT =====
  {
    q: "JavaScript dùng để?",
    a: ["Trang trí", "Tạo tương tác", "Lưu file", "Chạy server"],
    correct: 1
  },
  {
    q: "Khai báo biến bằng từ khóa nào?",
    a: ["var", "int", "string", "const"],
    correct: 0
  },
  {
    q: "Hàm nào dùng để in ra console?",
    a: ["alert()", "log()", "console.log()", "print()"],
    correct: 2
  },
  {
    q: "Sự kiện click dùng từ khóa nào?",
    a: ["onhover", "onclick", "onpress", "onchange"],
    correct: 1
  },
  {
    q: "DOM là gì?",
    a: ["Cơ sở dữ liệu", "Cấu trúc HTML trong JS", "API", "Framework"],
    correct: 1
  },

  // ===== FIREBASE / WEB =====
  {
    q: "Firebase Authentication dùng để?",
    a: ["Lưu ảnh", "Đăng nhập người dùng", "Thiết kế UI", "Gửi email"],
    correct: 1
  },
  {
    q: "Firestore là gì?",
    a: ["SQL Database", "NoSQL Database", "File system", "Cache"],
    correct: 1
  },
  {
    q: "localStorage dùng để?",
    a: ["Lưu dữ liệu tạm", "Lưu dữ liệu trình duyệt", "Lưu server", "Lưu ảnh"],
    correct: 1
  },
  {
    q: "HTTP là gì?",
    a: ["Ngôn ngữ lập trình", "Giao thức truyền dữ liệu", "Database", "Framework"],
    correct: 1
  },
  {
    q: "API dùng để?",
    a: ["Trang trí web", "Kết nối các hệ thống", "Viết CSS", "Chạy game"],
    correct: 1
  },

  // ===== KIẾN THỨC CHUNG =====
  {
    q: "Git dùng để làm gì?",
    a: ["Thiết kế UI", "Quản lý mã nguồn", "Viết JS", "Chạy server"],
    correct: 1
  },
  {
    q: "Framework là gì?",
    a: ["Thư viện CSS", "Bộ công cụ hỗ trợ lập trình", "Database", "Server"],
    correct: 1
  },
  {
    q: "Frontend là gì?",
    a: ["Phần người dùng thấy", "Server", "Database", "API"],
    correct: 0
  },
  {
    q: "Backend là gì?",
    a: ["Giao diện", "Xử lý phía server", "CSS", "HTML"],
    correct: 1
  }
];

// ==========================
// BIẾN
// ==========================
let index = 0;
let score = 0;
let time = 10;
let timer;
let selected = null;

// ==========================
// ELEMENT
// ==========================
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next");

// ==========================
// LOAD QUESTION
// ==========================
function loadQuestion() {
  clearInterval(timer);
  time = 10;
  timerEl.innerText = `⏱️ ${time}s`;

  questionEl.innerText = quiz[index].q;
  progressEl.innerText = `${index + 1} / ${quiz.length}`;
  answersEl.innerHTML = "";

  quiz[index].a.forEach((text, i) => {
    const div = document.createElement("div");
    div.className = "answer";
    div.innerText = text;

    div.onclick = () => {
      document.querySelectorAll(".answer")
        .forEach(a => a.classList.remove("selected"));
      div.classList.add("selected");
      selected = i;
    };

    answersEl.appendChild(div);
  });

  timer = setInterval(() => {
    time--;
    timerEl.innerText = `⏱️ ${time}s`;
    if (time === 0) nextQuestion();
  }, 1000);
}

// ==========================
// NEXT
// ==========================
function nextQuestion() {
  clearInterval(timer);

  if (selected === quiz[index].correct) {
    score++;
  }

  selected = null;
  index++;

  if (index < quiz.length) {
    loadQuestion();
  } else {
    if (window.saveScore) {
      window.saveScore(score, quiz.length);
    }
    showResult();
  }
}

// ==========================
// RESULT
// ==========================
function showResult() {
  document.querySelector(".quiz").innerHTML = `
    <h2>Hoàn thành 🎉</h2>
    <p>Điểm của bạn: <b>${score}/${quiz.length}</b></p>
    <button onclick="location.reload()">Làm lại</button>
  `;
}

nextBtn.onclick = nextQuestion;
loadQuestion();
