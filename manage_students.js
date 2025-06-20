// Load and render students
window.onload = () => {
  renderStudentList();
};

function renderStudentList() {
  const container = document.getElementById("studentList");
  container.innerHTML = "";
  const students = JSON.parse(localStorage.getItem("students")) || [];

  students.forEach((s, index) => {
    const card = document.createElement("div");
    card.className = "student-card";
    card.innerHTML = `
      ${s.photo ? `<img src="${s.photo}" class="student-img">` : ""}
      <h3>${s.name}</h3>
      <p>ID: ${s.id}</p>
      <p>Class: ${s.class || "-"}</p>
      <button onclick="editStudent(${index})">Edit</button>
      <button onclick="deleteStudent(${index})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function openAddModal() {
  document.getElementById("modalTitle").textContent = "Add Student";
  document.getElementById("studentName").value = "";
  document.getElementById("studentId").value = "";
  document.getElementById("studentClass").value = "";
  document.getElementById("studentPhoto").value = "";
  document.getElementById("modal").dataset.index = "-1";
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function saveStudent() {
  const name = document.getElementById("studentName").value.trim();
  const id = parseInt(document.getElementById("studentId").value);
  const studentClass = document.getElementById("studentClass").value.trim();
  const photoInput = document.getElementById("studentPhoto");
  const index = parseInt(document.getElementById("modal").dataset.index);

  if (!name || isNaN(id) || !studentClass) {
    return showToast("Please fill all required fields.");
  }

  const students = JSON.parse(localStorage.getItem("students")) || [];
  const reader = new FileReader();

  reader.onloadend = function () {
    const base64 = photoInput.files[0] ? reader.result : (students[index]?.photo || "");
    const updatedStudent = {
      id,
      name,
      class: studentClass,
      photo: base64,
      accessCode: students[index]?.accessCode || generateAccessCode(),
      tpLevel: students[index]?.tpLevel || 0,
      teacherComment: students[index]?.teacherComment || "",
      readingScore: students[index]?.readingScore || 0,
      writingScore: students[index]?.writingScore || 0,
      listeningScore: students[index]?.listeningScore || 0,
      speakingScore: students[index]?.speakingScore || 0
    };

    if (index >= 0) {
      students[index] = updatedStudent;
      addLogEntry(`Edited student profile: ${updatedStudent.name} (ID: ${updatedStudent.id})`);
    } else {
      students.push(updatedStudent);
      addLogEntry(`Added new student: ${updatedStudent.name} (ID: ${updatedStudent.id})`);
    }

    localStorage.setItem("students", JSON.stringify(students));
    closeModal();
    renderStudentList();
    showToast("Student saved successfully.");
  };

  if (photoInput.files.length > 0) {
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    reader.onloadend();
  }
}

function editStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[index];

  document.getElementById("modalTitle").textContent = "Edit Student";
  document.getElementById("studentName").value = student.name;
  document.getElementById("studentId").value = student.id;
  document.getElementById("studentClass").value = student.class || "";
  document.getElementById("studentPhoto").value = "";
  document.getElementById("modal").dataset.index = index;
  document.getElementById("modal").style.display = "block";
}

function deleteStudent(index) {
  if (!confirm("Are you sure you want to delete this student?")) return;
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const removed = students.splice(index, 1);
  addLogEntry(`Deleted student: ${removed[0].name} (ID: ${removed[0].id})`);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudentList();
  showToast("Student deleted.");
}

function generateAccessCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function addLogEntry(message) {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const timestamp = new Date().toLocaleString();
  logs.push(`[${timestamp}] ${message}`);
  localStorage.setItem("logs", JSON.stringify(logs));
}
