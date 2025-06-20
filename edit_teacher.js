// Get teacher ID from URL
const urlParams = new URLSearchParams(window.location.search);
const teacherId = parseInt(urlParams.get("id"));

if (!teacherId) {
  showToast("No teacher ID found.");
  throw new Error("Missing teacher ID");
}

const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
const teacher = teachers.find((t) => t.id === teacherId);

if (!teacher) {
  showToast("Teacher not found.");
  throw new Error("Invalid teacher ID");
}

// Fill header and form with existing data
document.getElementById("teacherName").textContent = teacher.name;
document.getElementById("teacherId").textContent = `ID: ${teacher.id}`;
document.getElementById("username").value = teacher.username;
document.getElementById("password").value = teacher.password;

function saveTeacherEdits() {
  teacher.username = document.getElementById("username").value.trim();
  teacher.password = document.getElementById("password").value.trim();

  const index = teachers.findIndex((t) => t.id === teacherId);
  teachers[index] = teacher;
  localStorage.setItem("teachers", JSON.stringify(teachers));

  showToast("Teacher profile updated successfully!");
  addLogEntry(`Edited teacher: ${teacher.name} (ID: ${teacher.id})`);
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


