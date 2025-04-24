// Shared state and utilities
let currentYear = 2082;
let currentMonthIndex = 0;
let isNepali = false;
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let customCategories = JSON.parse(localStorage.getItem('customCategories')) || [];
let budgets = JSON.parse(localStorage.getItem('budgets')) || {};
let editingNoteIndex = null;
let undoStack = [];

const monthsNepali = ['बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत'];
const daysNepali = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];
const daysEnglish = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// DOM elements shared across modules
const yearFilter = document.getElementById('yearFilter');
const todayButton = document.getElementById('todayButton');
const languageToggle = document.getElementById('languageToggle');
const backupData = document.getElementById('backupData');
const restoreData = document.getElementById('restoreData');
const restoreFileInput = document.getElementById('restoreFileInput');
const undoAction = document.getElementById('undoAction');
const noteFormModal = new bootstrap.Modal(document.getElementById('noteFormModal'));
const entryType = document.getElementById('entryType');
const noteTitle = document.getElementById('noteTitle');
const noteTime = document.getElementById('noteTime');
const noteDescription = document.getElementById('noteDescription');
const entryCategory = document.getElementById('entryCategory');
const newCategory = document.getElementById('newCategory');
const addCategory = document.getElementById('addCategory');
const categoryManager = document.getElementById('categoryManager');
const budgetSection = document.getElementById('budgetSection');
const monthlyBudget = document.getElementById('monthlyBudget');
const recurring = document.getElementById('recurring');
const reminder = document.getElementById('reminder');
const saveNote = document.getElementById('saveNote');
const editEntry = document.getElementById('editEntry');
const closeEntry = document.getElementById('closeEntry');
const selectedDate = document.getElementById('selectedDate');
const todayNepaliDate = document.getElementById('todayNepaliDate');
const todayEnglishDate = document.getElementById('todayEnglishDate');

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

function getBSDateFromGregorian(date) {
    try {
        for (let year in calendarData) {
            for (let i = 0; i < calendarData[year].length; i++) {
                let month = calendarData[year][i];
                let startDate = new Date(month.gregStart);
                let endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + month.days - 1);
                if (date >= startDate && date <= endDate) {
                    let dayDiff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24)) + 1;
                    return { year: parseInt(year), month: i, day: dayDiff };
                }
            }
        }
        return null;
    } catch (err) {
        console.error('Error in getBSDateFromGregorian:', err);
        return null;
    }
}

function getGregorianDate(year, monthIndex, day) {
    try {
        let month = calendarData[year][monthIndex];
        let startDate = new Date(month.gregStart);
        startDate.setDate(startDate.getDate() + day - 1);
        return startDate;
    } catch (err) {
        console.error('Error in getGregorianDate:', err);
        return new Date();
    }
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function getRecurringDates(note) {
    if (!note.recurring) return [note.date];
    let dates = [];
    let [startYear, startMonth, startDay] = note.date.split('-').map(Number);
    startMonth--;
    for (let year = startYear; year <= 2083; year++) {
        for (let month = (year === startYear ? startMonth : 0); month < 12; month++) {
            if (calendarData[year][month].days >= startDay) {
                dates.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`);
            }
        }
    }
    return dates;
}

function toggleLanguage() {
    isNepali = !isNepali;
    document.querySelectorAll('[data-en]').forEach(elem => {
        elem.textContent = isNepali ? elem.dataset.ne : elem.dataset.en;
    });
    renderMonthTabs();
    renderCalendar();
    renderNotesList();
    renderFinancialRecords();
    renderReport('weekly');
}

function backup() {
    let data = {
        notes,
        customCategories,
        budgets
    };
    let blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = `calendar_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function restore(e) {
    let file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let data = JSON.parse(e.target.result);
            if (data.notes) notes = data.notes;
            if (data.customCategories) customCategories = data.customCategories;
            if (data.budgets) budgets = data.budgets;
            localStorage.setItem('notes', JSON.stringify(notes));
            localStorage.setItem('customCategories', JSON.stringify(customCategories));
            localStorage.setItem('budgets', JSON.stringify(budgets));
            renderCalendar();
            renderNotesList();
            renderFinancialRecords();
            renderMonthlySummary();
            populateCategories();
            alert(isNepali ? 'डेटा सफलतापूर्वक पुनर्स्थापना गरियो' : 'Data restored successfully');
        } catch (err) {
            alert(isNepali ? 'पुनर्स्थापना असफल: अमान्य फाइल ढाँचा' : 'Restore failed: Invalid file format');
        }
    };
    reader.readAsText(file);
}

// Shared event listeners
languageToggle.addEventListener('click', toggleLanguage);
backupData.addEventListener('click', backup);
restoreData.addEventListener('click', () => restoreFileInput.click());
restoreFileInput.addEventListener('change', restore);
undoAction.addEventListener('click', undoLastAction);