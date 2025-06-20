// Load and display existing teachers
window.onload = function () {
  renderTeacherList();
};

function renderTeacherList() {
  const list = document.getElementById("teacherList");
  list.innerHTML = "";
  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  teachers.forEach(teacher => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${teacher.id} — ${teacher.name}
      <button onclick="confirmDelete(${teacher.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function confirmDelete(id) {
  if (confirm("Are you sure you want to delete this teacher?")) {
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    teachers = teachers.filter(t => t.id !== id);
    localStorage.setItem("teachers", JSON.stringify(teachers));
    renderTeacherList();
    showToast("Teacher deleted.");
    addLogEntry(`Deleted teacher: ${teacher.name} (ID: ${teacher.id})`);
  }
}

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  clearForm();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("id").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function saveTeacher() {
  const name = document.getElementById("name").value.trim();
  const id = parseInt(document.getElementById("id").value);
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !id || !username || !password) {
    showToast("Please fill in all fields.");
    return;
  }

  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  if (teachers.some(t => t.id === id)) {
    showToast("A teacher with this ID already exists.");
    return;
  }

  teachers.push({ id, name, username, password });
  localStorage.setItem("teachers", JSON.stringify(teachers));
  renderTeacherList();
  closeModal();
  showToast("Teacher profile added.");
  addLogEntry(`Added teacher: ${name} (ID: ${id})`);
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


