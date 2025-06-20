// Load and display students
window.onload = function () {
  renderStudentList();
};

function renderStudentList() {
  const list = document.getElementById("studentList");
  list.innerHTML = "";
  const students = JSON.parse(localStorage.getItem("students")) || [];

  students.forEach(student => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="info">
        <strong>${student.name}</strong> (ID: ${student.id})<br>
        Access Code: ${student.accessCode ? student.accessCode : "Not generated"}
      </div>
      <button onclick="generateCode(${student.id})">
        ${student.accessCode ? "Regenerate" : "Generate"}
      </button>
    `;
    list.appendChild(li);
  });
}

function generateCode(id) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students.find(s => s.id === id);

  if (!student) {
    showToast("Student not found.");
    return;
  }

  const newCode = randomCode(5);
  student.accessCode = newCode;

  const index = students.findIndex(s => s.id === id);
  students[index] = student;
  localStorage.setItem("students", JSON.stringify(students));

  renderStudentList();
  showToast(`Access code generated: ${newCode}`);
  addLogEntry(`Generated parent access code for: ${student.name} (ID: ${student.id}) → ${newCode}`);
}

function randomCode(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
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


