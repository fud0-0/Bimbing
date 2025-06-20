function handleAdminLogin(event) {
  event.preventDefault();

  const enteredPassword = document.getElementById("password").value;
  const toast = document.getElementById("toast");

  if (enteredPassword === "iamadmin123") {
    localStorage.setItem("loggedInUser", JSON.stringify({
      name: "admin",
      role: "admin"
    }));
    window.location.href = "admin_dashboard.html";
  } else {
    showToast("Incorrect password. Please try again.");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

