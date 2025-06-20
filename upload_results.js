const urlParams = new URLSearchParams(window.location.search);
const studentId = parseInt(urlParams.get("id"));
const students = JSON.parse(localStorage.getItem("students")) || [];
const student = students.find(s => s.id === studentId);

if (!student) {
  showToast("Student not found.");
} else {
  document.getElementById("studentName").textContent = student.name;
  document.getElementById("studentId").textContent = `ID: ${student.id}`;
  document.getElementById("studentClass").textContent = `Class: ${student.class || "-"}`;

  const photoEl = document.getElementById("studentPhoto");
  if (student.photo) {
    photoEl.src = student.photo;
    photoEl.style.display = "block";
  } else {
    photoEl.style.display = "none";
  }

  document.getElementById("tpLevel").value = student.tpLevel || 0;
  document.getElementById("comment").value = student.teacherComment || "";
  document.getElementById("reading").value = student.readingScore || 0;
  document.getElementById("writing").value = student.writingScore || 0;
  document.getElementById("listening").value = student.listeningScore || 0;
  document.getElementById("speaking").value = student.speakingScore || 0;
}

function saveResults() {
  student.tpLevel = parseInt(document.getElementById("tpLevel").value) || 0;
  student.teacherComment = document.getElementById("comment").value.trim();
  student.readingScore = parseFloat(document.getElementById("reading").value) || 0;
  student.writingScore = parseFloat(document.getElementById("writing").value) || 0;
  student.listeningScore = parseFloat(document.getElementById("listening").value) || 0;
  student.speakingScore = parseFloat(document.getElementById("speaking").value) || 0;

  const updatedStudents = students.map(s => {
  return s.id === student.id ? { ...student } : s;
});
localStorage.setItem("students", JSON.stringify(updatedStudents));


  addLogEntry(`Updated literacy results for ${student.name} (ID: ${student.id})`);
  showToast("Results updated.");
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
