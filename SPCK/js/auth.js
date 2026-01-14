import { auth, db } from "./firebase_config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const quizBox = document.getElementById("quizBox");
  const logoutBtn = document.getElementById("logout");
  const userNameEl = document.getElementById("username"); // Thêm phần tử username
  const avatarEl = document.getElementById("avatar"); // Thêm phần tử avatar

  let currentUsername = "";

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "./pages/login.html";
      return;
    }

    quizBox.style.display = "block";

    const q = query(
      collection(db, "users"),
      where("uid", "==", user.uid)
    );

    const snap = await getDocs(q);
    snap.forEach(doc => {
      currentUsername = doc.data().username;
      userNameEl.innerText = currentUsername;
      avatarEl.src = doc.data().photoURL || avatarEl.src;  // Cập nhật avatar nếu có
    });
  });

  logoutBtn.onclick = async () => {
    await signOut(auth);
    window.location.href = "./pages/login.html";
  };

  window.saveScore = async (score, total) => {
    if (!auth.currentUser) return;

    await setDoc(
      doc(db, "scores", auth.currentUser.uid),
      {
        username: currentUsername,
        score: score,
        total: total,
        updatedAt: serverTimestamp(),
      }
    );
  };
});
