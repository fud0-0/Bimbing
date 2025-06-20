function handleContinue() {
  const role = document.getElementById('roleSelect').value;
  if (!role) {
    alert('Please select a role to continue.');
    return;
  }
  // Redirect to the respective login page
  window.location.href = `login_${role}.html`;
}
