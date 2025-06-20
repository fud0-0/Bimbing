// Check if a parent is logged in
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user || user.role !== "parent") {
  window.location.href = "login_parent.html";
} else {
  loadStudentData(user.childId);
  addLogEntry(`Parent viewed summary for: ${user.childName} (ID: ${user.childId})`);
  createExitButton();
}

function loadStudentData(id) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find(s => s.id === id);

  if (!student) {
    showToast("Student data not found.");
    return;
  }

  document.getElementById("studentName").textContent = student.name || "-";
  document.getElementById("studentId").textContent = `ID: ${student.id || "-"}`;
  document.getElementById("studentClass").textContent = `Class: ${student.class || "-"}`;

  const photoEl = document.getElementById("studentPhoto");
  if (student.photo) {
    photoEl.src = student.photo;
    photoEl.style.display = "block";
  } else {
    photoEl.style.display = "none";
  }

  document.getElementById("reading").textContent = student.readingScore ?? 0;
  document.getElementById("writing").textContent = student.writingScore ?? 0;
  document.getElementById("listening").textContent = student.listeningScore ?? 0;
  document.getElementById("speaking").textContent = student.speakingScore ?? 0;
  document.getElementById("tpLevel").textContent = student.tpLevel ?? 0;
  document.getElementById("comment").textContent = student.teacherComment || "-";
}

function createExitButton() {
  const exitBtn = document.createElement("button");
  exitBtn.textContent = "Exit";
  exitBtn.className = "exit-btn";
  exitBtn.onclick = function () {
    addLogEntry(`Parent logged out for: ${user.childName} (ID: ${user.childId})`);
    localStorage.removeItem("loggedInUser");
    window.location.href = "login_parent.html";
  };
  document.querySelector(".container").appendChild(exitBtn);
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
