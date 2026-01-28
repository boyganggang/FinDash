import { auth, storage } from "./firebase_config.js";
import { startQuiz } from "./quiz.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const avatar = document.getElementById("avatar");
  const overlay = document.getElementById("profileOverlay");
  const profileEmail = document.getElementById("profileEmail");
  const profileAvatar = document.getElementById("profileAvatar");
  const logoutBtn = document.getElementById("logoutBtnProfile");

  let currentUser;

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      location.href = "./pages/login.html";
      return;
    }

    currentUser = user;

    const saved = JSON.parse(localStorage.getItem("currentUser")) || {};
    const photo =
      saved.photo ||
      user.photoURL ||
      "https://i.pinimg.com/originals/7c/d3/d4/7cd3d4a24e4821ead74b90cb8a55a692.jpg";

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: user.email, photo })
    );

    avatar.src = photo;
    profileAvatar.src = photo;
    profileEmail.value = user.email;

    startQuiz(window.quizData);
  });

  avatar.onclick = () => (overlay.style.display = "flex");
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  };

  /* ===== UPLOAD AVATAR (RESIZE + FIREBASE) ===== */
  window.uploadAvatar = async () => {
    const file = document.getElementById("avatarFile").files[0];
    if (!file) return alert("Chọn ảnh!");

    const resized = await resizeImage(file, 256, 256);

    const avatarRef = ref(storage, `avatars/${currentUser.uid}.jpg`);
    await uploadBytes(avatarRef, resized);

    const url = await getDownloadURL(avatarRef);

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: currentUser.email, photo: url })
    );

    avatar.src = url;
    profileAvatar.src = url;

    alert("Đã cập nhật avatar!");
  };

  logoutBtn.onclick = async () => {
    await signOut(auth);
    localStorage.clear();
    location.href = "./pages/login.html";
  };
});

/* ===== RESIZE IMAGE ===== */
function resizeImage(file, w, h) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
    };

    reader.readAsDataURL(file);
  });
}
