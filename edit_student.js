const urlParams = new URLSearchParams(window.location.search);
const studentId = parseInt(urlParams.get("id"));
let students = JSON.parse(localStorage.getItem("students")) || [];
let studentIndex = students.findIndex(s => s.id === studentId);
let student = students[studentIndex];

if (!student) {
  showToast("Student not found.");
} else {
  document.getElementById("name").value = student.name;
  document.getElementById("id").value = student.id;
  document.getElementById("studentClass").value = student.class || "";
}

function saveStudentEdits() {
  const newName = document.getElementById("name").value.trim();
  const newId = parseInt(document.getElementById("id").value);
  const newClass = document.getElementById("studentClass").value.trim();
  const photoInput = document.getElementById("studentPhoto");

  if (!newName || isNaN(newId)) {
    showToast("Please enter a valid name and ID.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = function () {
    const updatedPhoto = photoInput.files.length > 0 ? reader.result : student.photo;

    const updatedStudent = {
      ...student,
      name: newName,
      id: newId,
      class: newClass,
      photo: updatedPhoto
    };

    // remove old, insert updated
    students.splice(studentIndex, 1);
    students.push(updatedStudent);

    localStorage.setItem("students", JSON.stringify(students));
    addLogEntry(`Admin edited student: ${newName} (ID: ${newId})`);
    showToast("Student profile updated.");
  };

  if (photoInput.files.length > 0) {
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    reader.onloadend(); // call manually with previous photo
  }
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
