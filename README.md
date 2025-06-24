# 🧭 SchemaSystemet – Automatisk Schemagenerator

Detta system skapar dagliga arbetsscheman för ett arbetslag där **18 olika balanser (arbetsstationer)** alltid måste vara bemannade.

Systemet hanterar **personlig behörighet**, **schemarotation**, **ersättare** samt **Excel-export**.

---

## 🚀 Funktioner

### ✅ Behörighetshantering
- Varje anställd har individuella behörigheter för vilka balanser de kan jobba på.
- 70 % av personalen är **fullutbildade** (kan alla balanser).
- 30 % är **delutbildade** (kan bara vissa balanser).
- Alla behörigheter sparas och används automatiskt vid schemaläggning.

### ✅ Dagligt schema
- Varje dag bemannas **alla 18 balanser**.
- Regler för schemagenerering:
  - Minst en person per balans
  - Inga personer får samma balans två dagar i rad
  - Max **40 % upprepning** jämfört med föregående dag
  - Rotation sker automatiskt mellan passen

### ✅ Ersättare
- Användaren kan enkelt **ersätta en person** vid frånvaro
- Ersättare väljs från en färdig lista med sparade behörigheter

### ✅ Excel-export
- Efter generering kan schemat sparas som en `.xlsx`-fil
- Formatet:
  - Namn i vänsterspalt
  - Pass 1–7 i kolumner
  - 18 rader (en rad per person)

---

## 🧠 Användarflöde

1. Ange vilka personer som ska jobba
2. Lägg till ersättare (vid behov)
3. Klicka på “Skapa schema”
4. Se det färdiga schemat på skärmen
5. Klicka “Exportera till Excel”

---

## 🛠️ Teknik (exempel på stack)

- Frontend: HTML / CSS / JavaScript
- Backend (valfritt): Python, Flask eller Firebase
- Excel-export: SheetJS (JS) eller `openpyxl` (Python)
- Hosting: Firebase / Vercel / Netlify / Lokalt

---

## 📦 Kom igång (lokalt)

```bash
git clone https://github.com/ditt-namn/ditt-repo.git
cd ditt-repo
# Öppna index.html i valfri webbläsare
