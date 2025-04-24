const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
let isNepali = isBrowser ? (localStorage.getItem('language') === 'ne') : false;
let currentYear = 2082;
let currentMonthIndex = new Date().getMonth();
let notes = isBrowser ? (JSON.parse(localStorage.getItem('notes')) || []) : [];
let history = isBrowser ? (JSON.parse(localStorage.getItem('history')) || []) : [];
let budgets = isBrowser ? (JSON.parse(localStorage.getItem('budgets')) || {}) : {};

const monthsNepali = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कात्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत'];

// Holiday list for 2082
const holidays2082 = {
    '2082-01-01': { en: 'New Year', ne: 'नयाँ वर्ष' },
    '2082-01-15': { en: 'Buddha Jayanti', ne: 'बुद्ध जयन्ती' },
    '2082-02-10': { en: 'Republic Day', ne: 'गणतन्त्र दिवस' },
    '2082-06-17': { en: 'Dashain', ne: 'दशैं' },
    '2082-06-18': { en: 'Dashain', ne: 'दशैं' },
    '2082-06-19': { en: 'Dashain', ne: 'दशैं' },
    '2082-06-20': { en: 'Dashain', ne: 'दशैं' },
    '2082-06-21': { en: 'Dashain', ne: 'दशैं' },
    '2082-07-01': { en: 'Tihar', ne: 'तिहार' },
    '2082-07-02': { en: 'Tihar', ne: 'तिहार' },
    '2082-07-03': { en: 'Tihar', ne: 'तिहार' },
    '2082-12-30': { en: 'Holi', ne: 'होली' }
};

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

function requestNotificationPermission() {
    if (!isBrowser || !('Notification' in window)) return;
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
            }
        });
    }
}

function scheduleNotification(note) {
    if (!isBrowser || !('Notification' in window) || Notification.permission !== 'granted') return;
    if (!note.reminder || !note.time) return;

    const [year, month, day] = note.date.split('-').map(Number);
    const [hour, minute] = note.time.split(':').map(Number);
    const noteDate = new Date(year - 57, month - 1, day, hour, minute); // Adjust BS to AD
    const now = new Date();
    const timeDiff = noteDate.getTime() - now.getTime();

    if (timeDiff > 0) {
        setTimeout(() => {
            new Notification(note.title, {
                body: note.description || 'Reminder for your note!',
                icon: '/favicon.ico'
            });
        }, timeDiff);
    }
}

function checkUpcomingReminders() {
    if (!isBrowser) return;
    notes.forEach(note => {
        if (note.reminder) {
            getRecurringDates(note).forEach(date => {
                scheduleNotification({ ...note, date });
            });
        }
    });
}

if (isBrowser) {
    // Language Toggle
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

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = isNepali ? 'लाइट मोड' : 'Light Mode';
        }
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            darkModeToggle.textContent = isDark ? (isNepali ? 'लाइट मोड' : 'Light Mode') : (isNepali ? 'डार्क मोड' : 'Dark Mode');
        });
    }

    // Request notification permission on load
    requestNotificationPermission();
    // Check reminders on load
    checkUpcomingReminders();
}
