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

  document.getElementById("reading").textContent = student.readingScore;
  document.getElementById("writing").textContent = student.writingScore;
  document.getElementById("listening").textContent = student.listeningScore;
  document.getElementById("speaking").textContent = student.speakingScore;
  document.getElementById("tpLevel").textContent = student.tpLevel;
  document.getElementById("comment").textContent = student.teacherComment || "-";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

