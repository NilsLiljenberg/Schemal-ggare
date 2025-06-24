const employees = [
  {
    name: "Anna Persson",
    balances: ["Maskering TS", "Kontrollering 1", "Tork"],
    shift: "dag",
  },
  {
    name: "Johan Eriksson",
    balances: ["Avs 1", "Avs 2", "Avs 3", "Avplock"],
    shift: "kvall",
  },
  {
    name: "Sara Lind",
    balances: ["Sillar", "Takspoiler", "Inlagring"],
    shift: "natt",
  },
  {
    name: "Mikael Holm",
    balances: ["Nedre Förlast", "Nedre Pålast", "SLUTKONTROLL"],
    shift: "flex",
  }
];

function renderEmployees() {
  const shiftContainers = {
    dag: document.getElementById("dag-list"),
    kvall: document.getElementById("kvall-list"),
    natt: document.getElementById("natt-list"),
    flex: document.getElementById("flex-list"),
  };

  for (let shift in shiftContainers) {
    shiftContainers[shift].innerHTML = "";
  }

  employees.forEach((emp, index) => {
    const container = shiftContainers[emp.shift];
    if (!container) return;

    const empDiv = document.createElement("div");
    empDiv.className = "employee";

    const header = document.createElement("div");
    header.className = "employee-header";
    header.innerText = emp.name;
    header.onclick = () => {
      body.style.display = body.style.display === "block" ? "none" : "block";
    };

    const body = document.createElement("div");
    body.className = "employee-body";
    body.innerHTML = `<strong>Utbildad på:</strong><ul>${emp.balances.map(b => `<li>${b}</li>`).join("")}</ul>`;

    empDiv.appendChild(header);
    empDiv.appendChild(body);
    container.appendChild(empDiv);
  });
}

function switchTab(tabName) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  tabs.forEach(tab => {
    tab.classList.remove("active");
  });
  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}

renderEmployees();
