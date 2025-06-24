let employees = [];

function switchMainTab(tabName) {
  document.querySelectorAll('.main-tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.main-tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

function switchTab(shift) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(shift).classList.add('active');
  event.target.classList.add('active');
  renderEmployees();
}

function addEmployee() {
  const name = document.getElementById("nameInput").value.trim();
  const shift = document.getElementById("shiftInput").value;
  const balances = document.getElementById("balancesInput").value.split(',').map(b => b.trim()).filter(b => b);

  if (!name || balances.length === 0) return alert("Fyll i alla fält!");

  employees.push({ name, shift, balances });
  document.getElementById("nameInput").value = "";
  document.getElementById("balancesInput").value = "";
  renderEmployees();
}

function renderEmployees() {
  ["dag", "kvall", "natt", "flex"].forEach(shift => {
    const container = document.getElementById(shift);
    container.innerHTML = "";

    const list = document.createElement("div");
    list.className = "employee-list";

    employees.filter(e => e.shift === shift).forEach((emp, index) => {
      const div = document.createElement("div");
      div.className = "employee";

      div.innerHTML = `
        <strong>${emp.name}</strong>
        <ul>${emp.balances.map(b => `<li>${b}</li>`).join("")}</ul>
        <div class="actions">
          <button onclick="editEmployee(${index})">Ändra</button>
          <button onclick="deleteEmployee(${index})">Ta bort</button>
        </div>
      `;

      list.appendChild(div);
    });

    container.appendChild(list);
  });
}

function editEmployee(index) {
  const emp = employees[index];
  const newName = prompt("Ändra namn:", emp.name);
  if (!newName) return;

  const newBalances = prompt("Ändra balanser (kommaseparerat):", emp.balances.join(","));
  if (!newBalances) return;

  employees[index].name = newName.trim();
  employees[index].balances = newBalances.split(",").map(b => b.trim()).filter(b => b);
  renderEmployees();
}

function deleteEmployee(index) {
  if (confirm("Vill du ta bort personen?")) {
    employees.splice(index, 1);
    renderEmployees();
  }
}

renderEmployees();
