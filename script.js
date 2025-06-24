const balances = [
  "Maskering TS", "Kontrollering 1", "Kontrollering 2", "Pålast 1", "Pålast 2",
  "Tork", "Avs 1", "Avs 2", "Avs 3", "Avplock",
  "Sillar", "Takspoiler", "Inlagring", "Nedre Förlast", "Nedre Pålast",
  "Nedre VTC", "Nedre Avs", "SLUTKONTROLL"
];

let employees = [];

function switchMainTab(tabName) {
  document.querySelectorAll('.main-tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.main-tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');

  if (tabName === "add") {
    renderEmployees();
  }
}

function switchTab(shift) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(shift).classList.add('active');
  event.target.classList.add('active');
  renderEmployees();
}

// Skapa checkboxar för balanser i formuläret
function createBalanceCheckboxes() {
  const container = document.getElementById("balanceCheckboxes");
  container.innerHTML = "";
  balances.forEach((balance, idx) => {
    const label = document.createElement("label");
    label.className = "balance-checkbox";
    label.innerHTML = `
      <input type="checkbox" value="${balance}" /> ${balance}
    `;
    container.appendChild(label);
  });
}

// Lägg till medarbetare
function addEmployee() {
  const name = document.getElementById("nameInput").value.trim();
  const shift = document.getElementById("shiftInput").value;
  const checkedBoxes = [...document.querySelectorAll("#balanceCheckboxes input[type=checkbox]:checked")];
  const balancesSelected = checkedBoxes.map(cb => cb.value);

  if (!name) return alert("Ange namn!");
  if (balancesSelected.length === 0) return alert("Välj minst en balans!");

  employees.push({ name, shift, balances: balancesSelected });

  // Rensa formulär
  document.getElementById("nameInput").value = "";
  document.getElementById("shiftInput").value = "dag";
  document.querySelectorAll("#balanceCheckboxes input[type=checkbox]").forEach(cb => cb.checked = false);

  renderEmployees();
}

// Visa medarbetare under respektive skift
function renderEmployees() {
  ["dag", "kvall", "natt", "flex"].forEach(shift => {
    const container = document.getElementById(shift);
    container.innerHTML = "";

    const list = document.createElement("div");
    list.className = "employee-list";

    employees.filter(e => e.shift === shift).forEach((emp, index) => {
      const div = document.createElement("div");
      div.className = "employee";

      // Skapa en pil som roterar vid klick och fäller ut balanserna
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "▶";

      const header = document.createElement("div");
      header.className = "employee-header";

      const nameSpan = document.createElement("span");
      nameSpan.className = "employee-name";
      nameSpan.textContent = emp.name;

      arrow.onclick = () => {
        const balanceList = div.querySelector(".balance-list");
        if (balanceList.style.display === "block") {
          balanceList.style.display = "none";
          arrow.classList.remove("open");
        } else {
          balanceList.style.display = "block";
          arrow.classList.add("open");
        }
      };

      // Knapp för att ändra balanser
      const editBtn = document.createElement("button");
      editBtn.textContent = "Ändra";
      editBtn.onclick = () => editEmployee(index);

      // Knapp för att ta bort medarbetare
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Ta bort";
      deleteBtn.onclick = () => {
        if (confirm(`Vill du ta bort ${emp.name}?`)) {
          employees.splice(index, 1);
          renderEmployees();
        }
      };

      header.appendChild(arrow);
      header.appendChild(nameSpan);
      header.appendChild(editBtn);
      header.appendChild(deleteBtn);
      div.appendChild(header);

      // Lista över balanser, som är dolt som default
      const balanceList = document.createElement("ul");
      balanceList.className = "balance-list";
      balanceList.style.display = "none";
      emp.balances.forEach(bal => {
        const li = document.createElement("li");
        li.textContent = bal;
        balanceList.appendChild(li);
      });
      div.appendChild(balanceList);

      list.appendChild(div);
    });

    container.appendChild(list);
  });
}

// Funktion för att ändra balanser för en person
function editEmployee(index) {
  const emp = employees[index];

  // Visa en prompt-liknande modal eller enklare lösning
  // Vi bygger ett enkelt prompt med kryssrutor för balanser

  // Temporärt dold lägg till-formulär
  document.querySelector('.form-section').style.display = 'none';

  // Skapa ett edit-form i en popup-div
  const editDiv = document.createElement('div');
  editDiv.id = "editDiv";
  editDiv.style.position = "fixed";
  editDiv.style.top = "50%";
  editDiv.style.left = "50%";
  editDiv.style.transform = "translate(-50%, -50%)";
  editDiv.style.background = "white";
  editDiv.style.padding = "20px";
  editDiv.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
  editDiv.style.zIndex = "9999";
  editDiv.style.borderRadius = "8px";
  editDiv.style.maxWidth = "300px";

  const title = document.createElement("h3");
  title.textContent = `Ändra balanser för ${emp.name}`;
  editDiv.appendChild(title);

  // Checkboxes för balanser
  balances.forEach(bal => {
    const label = document.createElement("label");
    label.style.display = "block";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = bal;
    checkbox.checked = emp.balances.includes(bal);
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + bal));
    editDiv.appendChild(label);
  });

  // Spara-knapp
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Spara";
  saveBtn.style.marginTop = "10px";
  saveBtn.onclick = () => {
    // Samla in valda balanser
    const checked = [...editDiv.querySelectorAll('input[type=checkbox]:checked')].map(cb => cb.value);
    if (checked.length === 0) {
      alert("Välj minst en balans!");
      return;
    }
    employees[index].balances = checked;
    document.body.removeChild(editDiv);
    document.querySelector('.form-section').style.display = 'block';
    renderEmployees();
  };

  // Avbryt-knapp
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Avbryt";
  cancelBtn.style.marginLeft = "8px";
  cancelBtn.onclick = () => {
    document.body.removeChild(editDiv);
    document.querySelector('.form-section').style.display = 'block';
  };

  editDiv.appendChild(saveBtn);
  editDiv.appendChild(cancelBtn);

  document.body.appendChild(editDiv);
}

// Init
window.onload = () => {
  createBalanceCheckboxes();
  renderEmployees();
};
