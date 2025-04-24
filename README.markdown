# Nepali Calendar 2082

## Overview
The Nepali Calendar 2082 is a web-based application that provides a Bikram Sambat (BS) calendar for the years 2081, 2082, and 2083, integrated with Gregorian dates. It offers features to track holidays, add notes, and manage financial entries (income/expense), with support for both English and Nepali languages. The application is modularized into three components: Calendar, Finance, and Note, ensuring maintainability and scalability.

Designed by Santosh Phuyal, this calendar is ideal for users in Nepal or those interested in the Nepali calendar system, combining traditional calendar functionality with modern note-taking and financial tracking capabilities.

## Features
- Display Nepali BS calendar with Gregorian date mapping.
- Highlight holidays and festivals with distinct colors.
- Add, edit, and delete notes and financial entries (income/expense).
- Set recurring entries and reminders (browser notifications).
- Financial reports (weekly, monthly, yearly, daily records) with Chart.js visualizations.
- Export data to Excel (.xlsx) and PDF formats.
- Import data from JSON (notes/finances) and Excel (calendar/holidays).
- Backup and restore all data as JSON.
- Undo functionality for note deletions and clear actions.
- Toggle between English and Nepali languages.
- Responsive design with Bootstrap styling.
- Monthly summary of income, expenses, budget, and variance.
- Holiday list for the current month.

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Frameworks/Libraries**:
  - Bootstrap 5.3.2 (CSS and JS)
  - Chart.js (for financial charts)
  - jsPDF 2.5.1 (for PDF export)
  - XLSX 0.18.5 (for Excel export/import)
- **Fonts**: Poppins, Noto Sans Devanagari (via Google Fonts)
- **Storage**: LocalStorage for data persistence
- **Security**: Content Security Policy (CSP) with nonce-based script execution

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/nepali-calendar-2082.git
   cd nepali-calendar-2082
   ```

2. **Serve the Application**:
   - **Local**: Open `index.html` in a modern web browser (Chrome, Firefox, Edge, etc.).
   - **Server**: Host the files on a web server (e.g., using a simple HTTP server):
     ```bash
     npm install -g http-server
     http-server .
     ```
     Access the application at `http://localhost:8080`.

3. **Dependencies**:
   - The application requires an internet connection to load external libraries (Bootstrap, Chart.js, jsPDF, XLSX) and fonts on the first load.
   - After loading, it can function offline, except for features requiring external resources.

4. **Browser Requirements**:
   - Use a modern browser with JavaScript enabled.
   - Ensure notifications are allowed for reminder functionality.

## Usage
1. Open the application in a browser.
2. Select a year (2081, 2082, or 2083) from the dropdown.
3. Navigate months using the tabs.
4. Click a day to add a note or financial entry.
5. Use buttons to:
   - Add notes or finances.
   - View notes or financial reports.
   - Export data to Excel/PDF.
   - Import data.
   - Backup/restore data.
   - Undo actions.
   - Toggle language (English/Nepali).
6. View monthly summaries and holiday lists below the calendar.

For detailed instructions, refer to the `HELP.txt` file in the repository.

## File Structure
```
nepali-calendar-2082/
├── index.html              # Main application entry point
├── css/
│   ├── calendar.css        # Calendar-specific styles
│   ├── finance.css         # Finance-specific styles
│   ├── note.css            # Note-specific styles
│   └── shared.css          # Shared styles
├── js/
│   ├── calendar.js         # Calendar module logic
│   ├── finance.js          # Finance module logic
│   ├── note.js             # Note module logic
│   └── shared.js           # Shared utilities and state
├── README.md               # Project documentation
└── HELP.txt                # User guide
```

## Security Notes
- Uses a Content Security Policy (CSP) to restrict resource loading to trusted sources.
- Implements nonce-based script execution for inline scripts.
- Stores data in the browser's LocalStorage, keeping it on the user's device.
- No server-side processing or external API calls are required, except for CDN resources.

## Limitations
- LocalStorage limits data storage (typically 5-10 MB, depending on the browser).
- Reminders require browser notification permissions and may not work if the browser is closed.
- Importing/exporting large datasets may be slow in some browsers.
- Designed for single-user use with no cross-device syncing.

## Future Improvements
- Add cloud storage for cross-device syncing.
- Implement user authentication for multi-user support.
- Enhance accessibility with full ARIA support.
- Add event reminders via email or calendar integration.
- Support additional years beyond 2081–2083.

## Credits
- **Concept and Design**: Santosh Phuyal
- **Libraries**:
  - Bootstrap: https://getbootstrap.com
  - Chart.js: https://www.chartjs.org
  - jsPDF: https://github.com/parallax/jsPDF
  - XLSX: https://github.com/SheetJS/sheetjs
- **Fonts**: Google Fonts (Poppins, Noto Sans Devanagari)

## License
This project is for personal use and does not include an explicit license. Contact the designer, Santosh Phuyal, for permission to modify or distribute.

## Contact
For questions or feedback, contact Santosh Phuyal (no direct contact details provided in the application).

---

**Note**: To host this repository on GitHub, create a new repository, push the files, and ensure the `README.md` is in the root directory. The application can be tested locally or deployed to a static hosting service like GitHub Pages.