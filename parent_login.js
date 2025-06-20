function handleParentLogin(event) {
  event.preventDefault();

  const inputCode = document.getElementById("accessCode").value.trim();
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const matchedStudent = students.find(s => s.accessCode === inputCode);

  if (!matchedStudent) {
    showToast("Invalid access code. Please try again.");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify({
    role: "parent",
    childId: matchedStudent.id,
    childName: matchedStudent.name,
    accessCode: matchedStudent.accessCode
  }));

  addLogEntry(`Parent logged in using access code for: ${matchedStudent.name} (ID: ${matchedStudent.id})`);
  window.location.href = "parent_summary.html";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function addLogEntry(message) {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const timestamp = new Date().toLocaleString();
  logs.push(`[${timestamp}] ${message}`);
  localStorage.setItem("logs", JSON.stringify(logs));
}
