// Shared state
let currentYear = 2082;
let currentMonthIndex = 0;
let isNepali = false;
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let budgets = JSON.parse(localStorage.getItem('budgets')) || {};
let customCategories = JSON.parse(localStorage.getItem('customCategories')) || [];
let undoStack = [];

// Calendar data for 2081, 2082, 2083
const calendarData = {
    2081: [
        { name: "Baisakh", days: 31, gregStart: "2024-04-13", holidays: [{ day: 1, name: "Nepali New Year" }, { day: 5, name: "Buddha Jayanti" }] },
        { name: "Jestha", days: 32, gregStart: "2024-05-14", holidays: [] },
        { name: "Asar", days: 31, gregStart: "2024-06-15", holidays: [] },
        { name: "Shrawan", days: 32, gregStart: "2024-07-16", holidays: [{ day: 10, name: "Janai Purnima" }] },
        { name: "Bhadra", days: 31, gregStart: "2024-08-17", holidays: [] },
        { name: "Asoj", days: 30, gregStart: "2024-09-17", holidays: [{ day: 20, name: "Dashain" }] },
        { name: "Kartik", days: 30, gregStart: "2024-10-17", holidays: [{ day: 5, name: "Tihar" }] },
        { name: "Mangsir", days: 29, gregStart: "2024-11-16", holidays: [] },
        { name: "Poush", days: 29, gregStart: "2024-12-15", holidays: [] },
        { name: "Magh", days: 29, gregStart: "2025-01-13", holidays: [] },
        { name: "Falgun", days: 30, gregStart: "2025-02-11", holidays: [{ day: 15, name: "Holi" }] },
        { name: "Chaitra", days: 30, gregStart: "2025-03-13", holidays: [] },
    ],
    2082: [
        { name: "Baisakh", days: 31, gregStart: "2025-04-13", holidays: [{ day: 1, name: "Nepali New Year" }, { day: 5, name: "Buddha Jayanti" }] },
        { name: "Jestha", days: 32, gregStart: "2025-05-14", holidays: [] },
        { name: "Asar", days: 31, gregStart: "2025-06-15", holidays: [] },
        { name: "Shrawan", days: 32, gregStart: "2025-07-16", holidays: [{ day: 10, name: "Janai Purnima" }] },
        { name: "Bhadra", days: 31, gregStart: "2025-08-17", holidays: [] },
        { name: "Asoj", days: 30, gregStart: "2025-09-17", holidays: [{ day: 20, name: "Dashain" }] },
        { name: "Kartik", days: 30, gregStart: "2025-10-17", holidays: [{ day: 5, name: "Tihar" }] },
        { name: "Mangsir", days: 29, gregStart: "2025-11-16", holidays: [] },
        { name: "Poush", days: 29, gregStart: "2025-12-15", holidays: [] },
        { name: "Magh", days: 30, gregStart: "2026-01-13", holidays: [] },
        { name: "Falgun", days: 30, gregStart: "2026-02-12", holidays: [{ day: 15, name: "Holi" }] },
        { name: "Chaitra", days: 30, gregStart: "2026-03-14", holidays: [] },
    ],
    2083: [
        { name: "Baisakh", days: 31, gregStart: "2026-04-13", holidays: [{ day: 1, name: "Nepali New Year" }, { day: 5, name: "Buddha Jayanti" }] },
        { name: "Jestha", days: 32, gregStart: "2026-05-14", holidays: [] },
        { name: "Asar", days: 32, gregStart: "2026-06-15", holidays: [] },
        { name: "Shrawan", days: 31, gregStart: "2026-07-17", holidays: [{ day: 10, name: "Janai Purnima" }] },
        { name: "Bhadra", days: 31, gregStart: "2026-08-17", holidays: [] },
        { name: "Asoj", days: 30, gregStart: "2026-09-17", holidays: [{ day: 20, name: "Dashain" }] },
        { name: "Kartik", days: 30, gregStart: "2026-10-17", holidays: [{ day: 5, name: "Tihar" }] },
        { name: "Mangsir", days: 29, gregStart: "2026-11-16", holidays: [] },
        { name: "Poush", days: 29, gregStart: "2026-12-15", holidays: [] },
        { name: "Magh", days: 30, gregStart: "2027-01-13", holidays: [] },
        { name: "Falgun", days: 30, gregStart: "2027-02-12", holidays: [{ day: 15, name: "Holi" }] },
        { name: "Chaitra", days: 30, gregStart: "2027-03-14", holidays: [] },
    ],
};

const monthsNepali = [
    "वैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
    "कात्तिक", "मंसिर", "पुस", "माघ", "फागुन", "चैत"
];

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function getBSDateFromGregorian(gregDate) {
    const refDate = new Date("2025-04-13");
    const refBSDate = { year: 2082, month: 0, day: 1 };
    const diffDays = Math.floor((gregDate - refDate) / (1000 * 60 * 60 * 24));
    let bsYear = refBSDate.year;
    let bsMonth = refBSDate.month;
    let bsDay = refBSDate.day + diffDays;

    while (bsDay > calendarData[bsYear][bsMonth].days) {
        bsDay -= calendarData[bsYear][bsMonth].days;
        bsMonth++;
        if (bsMonth > 11) {
            bsMonth = 0;
            bsYear++;
        }
    }
    while (bsDay <= 0) {
        bsMonth--;
        if (bsMonth < 0) {
            bsMonth = 11;
            bsYear--;
        }
        bsDay += calendarData[bsYear][bsMonth].days;
    }
    return { year: bsYear, month: bsMonth, day: bsDay };
}

function getGregorianDate(bsYear, bsMonth, bsDay) {
    const refDate = new Date("2025-04-13");
    let totalDays = 0;
    for (let year = 2082; year < bsYear; year++) {
        totalDays += calendarData[year].reduce((sum, month) => sum + month.days, 0);
    }
    for (let month = 0; month < bsMonth; month++) {
        totalDays += calendarData[bsYear][month].days;
    }
    totalDays += bsDay - 1;

    const gregDate = new Date(refDate);
    gregDate.setDate(gregDate.getDate() + totalDays);
    return gregDate;
}

function getRecurringDates(note) {
    let dates = [];
    let [year, month, day] = note.date.split('-').map(Number);
    month--;
    if (note.recurring) {
        for (let y = 2081; y <= 2083; y++) {
            if (calendarData[y][month].days >= day) {
                dates.push(`${y}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
            }
        }
    } else {
        dates.push(note.date);
    }
    return dates;
}

function toggleLanguage() {
    isNepali = !isNepali;
    localStorage.setItem('isNepali', isNepali);
    document.querySelectorAll('[data-en][data-ne]').forEach(elem => {
        elem.textContent = isNepali ? elem.dataset.ne : elem.dataset.en;
    });
    document.querySelectorAll('option[data-en][data-ne]').forEach(option => {
        option.textContent = isNepali ? option.dataset.ne : option.dataset.en;
    });
    renderCalendar();
    renderNotesList();
    renderFinancialRecords();
    renderMonthlySummary();
}

// Undo last action
function undoLastAction() {
    if (undoStack.length === 0) {
        alert(isNepali ? 'पुर्ववत गर्न कुनै कार्य छैन' : 'No actions to undo');
        return;
    }
    let lastAction = undoStack.pop();
    if (lastAction.action === 'add') {
        notes = notes.filter(n => n !== lastAction.note);
    } else if (lastAction.action === 'edit') {
        notes[lastAction.index] = lastAction.oldNote;
    } else if (lastAction.action === 'delete') {
        notes.splice(lastAction.index, 0, lastAction.note);
    } else if (lastAction.action === 'clear') {
        notes.push(...lastAction.notes);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    renderCalendar();
    renderNotesList();
    renderFinancialRecords();
    renderMonthlySummary();
}

// Shared event listeners
document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
document.getElementById('undoAction').addEventListener('click', undoLastAction);
