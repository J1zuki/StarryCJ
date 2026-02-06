const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("profileInput");
const previewImg = document.getElementById("profilePreview");
const placeholder = document.querySelector(".avatar-placeholder");

let avatarBase64 = "";

// ==========================
// AVATAR UPLOAD
// ==========================
uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (!file || !file.type.startsWith("image/")) {
    alert("Please select an image file ❌");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    avatarBase64 = reader.result;
    previewImg.src = avatarBase64;
    previewImg.style.display = "block";
    placeholder.style.display = "none";
  };
  reader.readAsDataURL(file);
});

// ==========================
// SIGN UP LOGIC (LOCAL USERS)
// ==========================
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim(); // optional
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;
  const mobile = document.getElementById("signupMobile").value.trim();

  if (!username || !password || !confirm) {
    alert("Please fill in all required fields ❌");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match ❌");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // 🔥 IMPORTANT: check DUPLICATE USERNAME (not email)
  if (users.some(u => u.username === username)) {
    alert("Username already exists ❌");
    return;
  }

  // Save user
  users.push({
    username,
    email,        // stored but NOT used for login
    password,
    mobile,
    avatar: avatarBase64
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully ✅");
  window.location.href = "./login.html";
});