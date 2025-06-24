const balances = [
  "Maskering TS", "Kontrollering 1", "Kontrollering 2", "Pålast 1", "Pålast 2",
  "Tork", "Avs 1", "Avs 2", "Avs 3", "Avplock", "Sillar", "Takspoiler",
  "Inlagring", "Nedre Förlast", "Nedre Pålast", "Nedre VTC", "Nedre Avs", "SLUTKONTROLL"
];

let employees = [];

function createBalanceCheckboxes() {
  const container = document.getElementById("balanceCheckboxes");
  container.innerHTML = "";

  balances.forEach((balance, index) => {
    const label = document.createElement("label");
    label.classList.add("checkbox-row");
    label.innerHTML = `
      <input type="checkbox" id="balance-${index}" value="${balance}" />
      ${balance}
    `;
    container.appendChild(label);
  });
}

function addEmployee() {
  const name = document.getElementById("employeeName").value.trim();
  if (!name) return alert("Skriv in ett namn!");

  const checked = [...document.querySelectorAll("#balanceCheckboxes input:checked")];
  const qualifiedBalances = checked.map(c => c.value);

  const employee = {
    name: name,
    balances: qualifiedBalances
  };

  employees.push(employee);
  document.getElementById("employeeName").value = "";
  document.querySelectorAll("#balanceCheckboxes input").forEach(cb => cb.checked = false);

  renderEmployees();
}

function renderEmployees() {
  const list = document.getElementById("employeeList");
  list.innerHTML = "";

  employees.forEach((emp, index) => {
    const div = document.createElement("div");
    div.className = "employee-entry";

    const header = document.createElement("h3");
    header.textContent = emp.name;
    div.appendChild(header);

    const balList = document.createElement("p");
    balList.textContent = "Balanser: " + emp.balances.join(", ");
    div.appendChild(balList);

    const btnDiv = document.createElement("div");
    btnDiv.className = "employee-buttons";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Ta bort";
    removeBtn.onclick = () => {
      employees.splice(index, 1);
      renderEmployees();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Ändra";
    editBtn.onclick = () => editEmployee(index);

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(removeBtn);
    div.appendChild(btnDiv);

    list.appendChild(div);
  });
}

function editEmployee(index) {
  const emp = employees[index];
  document.getElementById("employeeName").value = emp.name;

  // Markera kryssrutor
  document.querySelectorAll("#balanceCheckboxes input").forEach(cb => {
    cb.checked = emp.balances.includes(cb.value);
  });

  // Ta bort gamla
  employees.splice(index, 1);
  renderEmployees();
}

createBalanceCheckboxes();
renderEmployees();
