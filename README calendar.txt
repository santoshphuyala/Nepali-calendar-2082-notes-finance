README FILE FOR NEPALI CALENDAR 2082
====================================

## Project Title
Nepali Calendar 2082

## Description
The Nepali Calendar 2082 is a web-based application that provides a Bikram Sambat (BS) calendar for the years 2081, 2082, and 2083, integrated with Gregorian dates. It offers features to track holidays, add notes and financial entries (income/expense), generate reports, and export/import data. The application supports both English and Nepali languages and includes a responsive design for desktop and mobile use.

Designed by Santosh Phuyal, this calendar is ideal for users in Nepal or those interested in the Nepali calendar system, combining traditional calendar functionality with modern note-taking and financial tracking capabilities.

## Features
- Display Nepali BS calendar with Gregorian date mapping.
- Highlight holidays and festivals with distinct colors.
- Add, edit, and delete notes and financial entries (income/expense).
- Set recurring entries and reminders (browser notifications).
- Financial reports (weekly, monthly, yearly, daily records) with charts.
- Export data to Excel (.xlsx) and PDF formats.
- Import data from JSON (notes/finances) and Excel (calendar/holidays).
- Backup and restore all data as JSON.
- Undo functionality for note deletions and clear actions.
- Toggle between English and Nepali languages.
- Responsive design with Bootstrap styling.
- Monthly summary of income, expenses, budget, and variance.
- Holiday list for the current month.

## Technologies Used
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.2 (CSS and JS)
- Chart.js (for financial charts)
- jsPDF 2.5.1 (for PDF export)
- XLSX 0.18.5 (for Excel export/import)
- External fonts: Poppins, Noto Sans Devanagari (via Google Fonts)
- LocalStorage for data persistence
- Content Security Policy (CSP) for security

## Installation
1. **Download the File**:
   - Obtain the `nepali calendar final.html` file.

2. **Host or Open Locally**:
   - **Local**: Open the HTML file directly in a modern web browser (Chrome, Firefox, Edge, etc.).
   - **Server**: Host the file on a web server (e.g., Apache, Nginx, or a simple Node.js server) to ensure proper loading of external resources.

3. **Internet Access**:
   - An internet connection is required to load external libraries (Bootstrap, Chart.js, jsPDF, XLSX) and fonts on the first load.
   - After loading, the application can function offline, except for features requiring external resources.

4. **Browser Requirements**:
   - Use a modern browser with JavaScript enabled.
   - Ensure notifications are allowed for reminder functionality.

## Usage
1. Open the HTML file in a browser.
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

For detailed instructions, refer to the `HELP.txt` file.

## File Structure
- `nepali calendar final.html`: The main application file containing HTML, CSS, and JavaScript.

## Security Notes
- The application uses a Content Security Policy (CSP) to restrict resource loading to trusted sources.
- Nonce-based script execution is implemented for inline scripts.
- Data is stored in the browser's LocalStorage, so it remains on the user's device.
- No server-side processing or external API calls are required, except for loading CDN resources.

## Limitations
- LocalStorage may limit the amount of data stored (typically 5-10 MB, depending on the browser).
- Reminders require browser notification permissions and may not work if the browser is closed.
- Importing/exporting large datasets may be slow in some browsers.
- The application is designed for single-user use and does not sync data across devices.

## Future Improvements
- Add cloud storage for cross-device syncing.
- Implement user authentication for multi-user support.
- Enhance accessibility (ARIA attributes are partially implemented).
- Add more interactive features, such as event reminders via email or calendar integration.
- Support additional years beyond 2081-2083.

## Credits
- **Concept and Design**: Santosh Phuyal
- **Libraries**:
  - Bootstrap (https://getbootstrap.com)
  - Chart.js (https://www.chartjs.org)
  - jsPDF (https://github.com/parallax/jsPDF)
  - XLSX (https://github.com/SheetJS/sheetjs)
- **Fonts**: Google Fonts (Poppins, Noto Sans Devanagari)

## License
This project is for personal use and does not include an explicit license. Contact the designer, Santosh Phuyal, for permission to modify or distribute.

## Contact
For questions or feedback, contact Santosh Phuyal (no direct contact details provided in the application).

Thank you for using the Nepali Calendar 2082!