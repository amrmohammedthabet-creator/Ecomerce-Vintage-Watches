document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".frm-log");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput?.value.trim();
    const password = passwordInput?.value;

  
    if (!email || !password) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      user => user.email === email && user.password === password
    );

    if (foundUser) {
    
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      
      alert("✅ Login successful!");
      window.location.href = "index.html"; 
    } else {
      alert("❌ Invalid email or password");
    }
  });
});