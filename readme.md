Nepali Calendar 2082
A web-based Nepali calendar application with support for notes and financial tracking. Designed by Santosh Phuyal.
Features

Display Nepali and Gregorian dates for the years 2081-2083 BS.
Add, edit, and delete notes and financial entries (income/expense).
Generate weekly, monthly, and yearly financial reports with charts.
Export data to Excel and PDF formats.
Import data from JSON files.
Language toggle (English/Nepali).
Responsive design using Bootstrap.

Project Structure
nepali-calendar/
├── index.html          # Main page combining all modules
├── calendar.html       # Calendar-focused page
├── finance.html        # Finance-focused page
├── notes.html          # Notes-focused page
├── css/
│   ├── shared.css      # Shared styles
│   ├── calendar.css    # Calendar styles
│   ├── finance.css     # Finance styles
│   └── note.css        # Notes styles
├── js/
│   ├── shared.js       # Shared utilities
│   ├── calendar.js     # Calendar functionality
│   ├── finance.js      # Finance functionality
│   └── note.js         # Notes functionality
├── README.md           # Project overview
└── help.txt            # User help guide

Setup

Clone the repository:git clone <repository-url>


Open index.html in a web browser.
Alternatively, use a local server (e.g., python -m http.server or VS Code Live Server) to avoid CORS issues with file imports.



Usage

Calendar: View the calendar grid, click on a day to add a note or financial entry.
Notes: Add, edit, or delete notes, filter by month, and export to Excel/PDF.
Finance: Track income and expenses, view reports (weekly, monthly, yearly), and export to Excel/PDF.
Language Toggle: Switch between English and Nepali using the toggle button.

Dependencies

Bootstrap 5.3.2
Chart.js (for financial charts)
XLSX (for Excel export)
jsPDF (for PDF export)
Google Fonts (Poppins, Noto Sans Devanagari)

License
This project is licensed under the MIT License.
