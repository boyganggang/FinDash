import { auth } from "./firebase_config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// =========================
// LOGIN
// =========================
const loginForm = document.getElementById("signin-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.replace("../index.html"); // Login successful, redirect to quiz
    } catch (err) {
      alert("Login failed: " + err.message); // Show login error message
    }
  });
}

// =========================
// SIGN UP
// =========================
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;
    const terms = document.getElementById("termsCheck");

    // Check if the password length is greater than 6 characters
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    // Check if the user agreed to the terms
    if (!terms.checked) {
      alert("Bạn phải đồng ý với điều khoản.");
      return;
    }

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Sign-up successful
      alert("Đăng ký thành công! Vui lòng đăng nhập.");

      // Redirect to login tab
      document.getElementById("pills-login-tab").click();
    } catch (err) {
      alert("Đăng ký thất bại: " + err.message); // Show signup error message
    }
  });
}
