import { auth, db } from "./firebase_config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const quizBox = document.getElementById("quizBox");
  const logoutBtn = document.getElementById("logout");

  // header
  const userNameEl = document.getElementById("username");
  const avatarEl = document.getElementById("avatar");

  // profile modal
  const profileOverlay = document.getElementById("profileOverlay");
  const profileUsername = document.getElementById("profileUsername");
  const profileEmail = document.getElementById("profileEmail");
  const profileAvatar = document.getElementById("profileAvatar");
  const logoutBtnProfile = document.getElementById("logoutBtnProfile");

  let currentUsername = "";

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "./pages/login.html";
      return;
    }

    quizBox.style.display = "block";

    // ===== EMAIL (luôn có) =====
    profileEmail.value = user.email;

    // ===== LẤY DATA TỪ AUTH TRƯỚC =====
    let username = user.displayName || "";
    let photoURL = user.photoURL || "";

    // ===== THỬ LẤY TỪ FIRESTORE =====
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const snap = await getDocs(q);

    if (!snap.empty) {
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        username = data.username || username;
        photoURL = data.photoURL || photoURL;
      });
    }

    // ===== FALLBACK CUỐI =====
    if (!username) {
      username = user.email.split("@")[0];
    }

    if (!photoURL) {
      photoURL =
        "https://i.pinimg.com/originals/7c/d3/d4/7cd3d4a24e4821ead74b90cb8a55a692.jpg";
    }

    // ===== SET HEADER =====
    userNameEl.innerText = username;
    avatarEl.src = photoURL;

    // ===== SET PROFILE =====
    profileUsername.value = username;
    profileAvatar.src = photoURL;

    currentUsername = username;
  });

  // ===== LOGOUT (quiz) =====
  if (logoutBtn) {
    logoutBtn.onclick = async () => {
      await signOut(auth);
      window.location.href = "./pages/login.html";
    };
  }

  // ===== LOGOUT (profile) =====
  if (logoutBtnProfile) {
    logoutBtnProfile.onclick = async () => {
      await signOut(auth);
      window.location.href = "./pages/login.html";
    };
  }

  // ===== OPEN PROFILE =====
  avatarEl.onclick = () => {
    profileOverlay.style.display = "flex";
  };

  // ===== CLOSE PROFILE =====
  profileOverlay.onclick = (e) => {
    if (e.target === profileOverlay) {
      profileOverlay.style.display = "none";
    }
  };

  // ===== SAVE SCORE =====
  window.saveScore = async (score, total) => {
    if (!auth.currentUser) return;

    await setDoc(doc(db, "scores", auth.currentUser.uid), {
      username: currentUsername,
      score,
      total,
      updatedAt: serverTimestamp(),
    });
  };
});
