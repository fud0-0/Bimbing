// Simulated database
const teacherData = [
  { id: 1, name: 'Amal', username: 'missamal', password: 'tamal1' },
  { id: 2, name: 'Butowski', username: 'sirbutowski', password: 'tbutowski2' }
];

// Store in localStorage if not already stored
if (!localStorage.getItem('teachers')) {
  localStorage.setItem('teachers', JSON.stringify(teacherData));
}

function handleTeacherLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorEl = document.getElementById('error');

  const teachers = JSON.parse(localStorage.getItem('teachers'));

  const matched = teachers.find(t => t.username === username && t.password === password);

  if (matched) {
    // Save session data
    localStorage.setItem('loggedInUser', JSON.stringify({
      id: matched.id,
      name: matched.name,
      role: 'teacher'
    }));
    window.location.href = 'teacher_dashboard.html'; // change this as needed
  } else {
    errorEl.textContent = 'Invalid username or password.';
  }
}
