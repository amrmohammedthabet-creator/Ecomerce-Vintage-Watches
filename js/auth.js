function checkAuth() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("👋 Logged out successfully!");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  checkAuth();

  const logoutLink = document.getElementById('logout');
 
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  
});