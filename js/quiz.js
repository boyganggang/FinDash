let index = 0;
let score = 0;
let selected = null;
let timer;
let timeLeft = 10;
let wrongQuestions = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next");

/* ===== RANDOM CHUẨN (FISHER–YATES) ===== */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ===== START QUIZ ===== */
export function startQuiz(data) {
  index = 0;
  score = 0;
  wrongQuestions = [];

  // 🔥 RANDOM MỖI LẦN START
  window.currentQuiz = shuffle(data).slice(0, 10);

  loadQuestion();
}

/* ===== LOAD QUESTION ===== */
function loadQuestion() {
  selected = null;
  startTimer();

  const q = window.currentQuiz[index];
  questionEl.innerText = q.q;
  progressEl.innerText = `${index + 1} / ${window.currentQuiz.length}`;
  answersEl.innerHTML = "";

  q.a.forEach((text, i) => {
    const div = document.createElement("div");
    div.className = "answer";
    div.innerText = text;

    div.onclick = () => {
      document
        .querySelectorAll(".answer")
        .forEach(a => a.classList.remove("selected"));
      div.classList.add("selected");
      selected = i;
    };

    answersEl.appendChild(div);
  });
}

/* ===== TIMER ===== */
function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timerEl.innerText = `⏱ ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏱ ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}

/* ===== NEXT ===== */
nextBtn.onclick = () => {
  if (selected === null) {
    alert("Bạn chưa chọn đáp án");
    return;
  }
  submit();
};

function submit() {
  clearInterval(timer);
  const q = window.currentQuiz[index];

  if (selected === q.correct) {
    score++;
  } else {
    wrongQuestions.push({
      question: q.q,
      user: q.a[selected],
      correct: q.a[q.correct],
    });
  }

  index++;
  index < window.currentQuiz.length ? loadQuestion() : showResult();
}

function autoNext() {
  const q = window.currentQuiz[index];
  wrongQuestions.push({
    question: q.q,
    user: "Hết giờ",
    correct: q.a[q.correct],
  });

  index++;
  index < window.currentQuiz.length ? loadQuestion() : showResult();
}

/* ===== RESULT ===== */
function showResult() {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  history.push({
    date: new Date().toLocaleString(),
    score,
    total: window.currentQuiz.length,
  });
  localStorage.setItem("quizHistory", JSON.stringify(history));

  document.getElementById("quizBox").innerHTML = `
    <h2>Hoàn thành 🎉</h2>
    <p>Điểm: <b>${score}/${window.currentQuiz.length}</b></p>

    <h3>Câu sai:</h3>
    ${wrongQuestions.map(q => `
      <div class="wrong">
        <b>${q.question}</b><br>
        ❌ ${q.user}<br>
        ✅ ${q.correct}
      </div>
    `).join("")}

    <button onclick="location.reload()">Làm lại</button>
  `;
}
