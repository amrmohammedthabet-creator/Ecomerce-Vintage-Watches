document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector(".frm-log"); 
  if (!registerForm) return;

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // منع إعادة تحميل الصفحة

  
    const nameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("Confirm-password");

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const password = passwordInput?.value;
    const confirmPassword = confirmPasswordInput?.value;

  
    if (!name || !email || !password || !confirmPassword) {
      alert("⚠️ Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isExist = users.some(user => user.email === email);
    if (isExist) {
      alert("⚠️ Email already exists. Please login instead.");
      return;
    }

  
    const newUser = {
      id: Date.now(),    // لازم يكون تعريف مختلف ف بيرجع بالملي ويستخم ك id
      name: name,
      email: email,
      password: password  
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

  
    alert("✅ Registration successful! Please login.");
    window.location.href = "login.html";
  });
});