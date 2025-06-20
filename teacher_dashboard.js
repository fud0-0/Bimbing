// Check if a teacher is logged in
const user = JSON.parse(localStorage.getItem('loggedInUser'));
if (!user || user.role !== 'teacher') {
  window.location.href = 'login_teacher.html';
} else {
  document.getElementById('greeting').textContent = `Hi, ${user.name}.`;
  addLogEntry(`Teacher logged in: ${user.name} (ID: ${user.id})`);
}

// Logout functionality
function logout() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (user && user.role === 'teacher') {
    addLogEntry(`Teacher logged out: ${user.name} (ID: ${user.id})`);
  }
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login_teacher.html';
}

// Show student ID dropdown as teacher types
function showDropdown(input, type) {
  const query = input.value.trim();
  const dropdown = document.getElementById(`dropdown-${type}`);
  dropdown.innerHTML = '';
  if (query.length === 0) return;

  const students = JSON.parse(localStorage.getItem('students')) || [];
  const matches = students
    .filter(student => String(student.id).startsWith(query))
    .map(student => String(student.id));

  matches.forEach(id => {
    const div = document.createElement('div');
    div.textContent = id;
    div.onclick = () => {
      if (type === 'upload') {
        window.location.href = `upload_results.html?id=${id}`;
      } else {
        window.location.href = `view_progress.html?id=${id}`;
      }
    };
    dropdown.appendChild(div);
  });
}

function addLogEntry(message) {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const timestamp = new Date().toLocaleString();
  logs.push(`[${timestamp}] ${message}`);
  localStorage.setItem("logs", JSON.stringify(logs));
}
