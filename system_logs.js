// Load and display logs from localStorage
window.onload = function () {
  renderLogs();
};

function renderLogs() {
  const list = document.getElementById("logList");
  list.innerHTML = "";

  const logs = JSON.parse(localStorage.getItem("logs")) || [];

  if (logs.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No logs available.";
    list.appendChild(li);
    return;
  }

  logs.reverse().forEach(log => {
    const li = document.createElement("li");
    li.textContent = log;
    list.appendChild(li);
  });
}
