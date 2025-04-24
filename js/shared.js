let isNepali = localStorage.getItem('language') === 'ne';
let currentYear = 2082;
let currentMonthIndex = new Date().getMonth();
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let history = JSON.parse(localStorage.getItem('history')) || [];
let budgets = JSON.parse(localStorage.getItem('budgets')) || {};

const monthsNepali = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कात्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत'];

// Placeholder calendar data (simplified for demonstration)
const calendarData = {
    2081: Array(12).fill().map((_, i) => ({ name: `Month ${i + 1}`, days: 30 })),
    2082: Array(12).fill().map((_, i) => ({ name: `Month ${i + 1}`, days: 30 })),
    2083: Array(12).fill().map((_, i) => ({ name: `Month ${i + 1}`, days: 30 }))
};

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function getRecurringDates(note) {
    if (!note.recurring) return [note.date];
    const dates = [];
    const [startYear, startMonth] = note.date.split('-').map(Number);
    for (let year = 2081; year <= 2083; year++) {
        for (let month = 1; month <= 12; month++) {
            if (year === startYear && month < startMonth) continue;
            dates.push(`${year}-${String(month).padStart(2, '0')}-${note.date.split('-')[2]}`);
        }
    }
    return dates;
}

const languageToggle = document.getElementById('languageToggle');
if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        isNepali = !isNepali;
        localStorage.setItem('language', isNepali ? 'ne' : 'en');
        document.querySelectorAll('[data-en]').forEach(elem => {
            elem.textContent = isNepali ? elem.dataset.ne : elem.dataset.en;
        });
        if (typeof renderCalendar === 'function') renderCalendar();
        if (typeof renderNotes === 'function') renderNotes();
        if (typeof renderFinancialRecords === 'function') renderFinancialRecords();
    });
}