const persons = [];
const BALANSER = Array.from({length: 18}, (_, i) => `Balans ${i + 1}`);

// Skapa 18 fake-personer med slumpad behörighet (70% kan alla balanser, 30% kan random subset)
for (let i = 1; i <= 18; i++) {
  const isFull = Math.random() < 0.7;
  const allowedBalans = isFull 
    ? [...BALANSER] 
    : BALANSER.filter(() => Math.random() < 0.5);
  persons.push({
    id: i,
    name: `Person ${i}`,
    allowedBalans,
    isAbsent: false,       // frånvaro (vab/sjuk)
    replacementId: null,   // vem ersätter
  });
}

const personContainer = document.getElementById('person-container');
const absenceContainer = document.getElementById('absence-container');
const generateBtn = document.getElementById('generate-btn');
const scheduleContainer = document.getElementById('schedule-container');

function renderPersons() {
  personContainer.innerHTML = '';
  persons.forEach(person => {
    const row = document.createElement('div');
    row.className = 'person-row';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'person-name';
    nameDiv.textContent = person.name;
    row.appendChild(nameDiv);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    BALANSER.forEach(balans => {
      const label = document.createElement('label');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = person.allowedBalans.includes(balans);
      cb.disabled = true;
      label.appendChild(cb);
      label.appendChild(document.createTextNode(balans));
      checkboxContainer.appendChild(label);
    });

    row.appendChild(checkboxContainer);
    personContainer.appendChild(row);
  });
}

function renderAbsence() {
  absenceContainer.innerHTML = '';
  persons.forEach(person => {
    const row = document.createElement('div');
    row.className = 'absence-row';

    const cbAbsent = document.createElement('input');
    cbAbsent.type = 'checkbox';
    cbAbsent.checked = person.isAbsent;
    cbAbsent.id = `absent-${person.id}`;
    cbAbsent.addEventListener('change', () => {
      person.isAbsent = cbAbsent.checked;
      renderReplacementOptions();
    });

    const labelAbsent = document.createElement('label');
    labelAbsent.htmlFor = `absent-${person.id}`;
    labelAbsent.textContent = `${person.name} frånvarande`;

    row.appendChild(cbAbsent);
    row.appendChild(labelAbsent);

    absenceContainer.appendChild(row);
  });
}

function renderReplacementOptions() {
  // Här kan vi utöka för att välja ersättare om du vill
  // För nu låter vi det vara så här
}

generateBtn.addEventListener('click', () => {
  // För nu: visa vilka som är frånvarande och vilka som ersätter
  const absentPersons = persons.filter(p => p.isAbsent);
  if (absentPersons.length === 0) {
    scheduleContainer.textContent = 'Alla är närvarande. (Fortsatt utveckling på schemat kommer.)';
  } else {
    scheduleContainer.textContent = `Frånvarande:\n${absentPersons.map(p => p.name).join('\n')}\n\n(Schemagenerering kommer snart.)`;
  }
});

renderPersons();
renderAbsence();
