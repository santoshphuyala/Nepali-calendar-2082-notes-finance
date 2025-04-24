// Calendar data
const calendarData = {
    2081: [
        {name:"Baishakh",days:31,gregStart:"2024-04-13"},
        {name:"Jestha",days:32,gregStart:"2024-05-14"},
        {name:"Ashadh",days:31,gregStart:"2024-06-15"},
        {name:"Shrawan",days:32,gregStart:"2024-07-16"},
        {name:"Bhadra",days:31,gregStart:"2024-08-17"},
        {name:"Asoj",days:31,gregStart:"2024-09-17"},
        {name:"Kartik",days:30,gregStart:"2024-10-18"},
        {name:"Mangsir",days:29,gregStart:"2024-11-17"},
        {name:"Poush",days:30,gregStart:"2024-12-16"},
        {name:"Magh",days:29,gregStart:"2025-01-15"},
        {name:"Falgun",days:30,gregStart:"2025-02-13"},
        {name:"Chaitra",days:30,gregStart:"2025-03-15"}
    ],
    2082: [
        {name:"Baishakh",days:31,gregStart:"2025-04-14"},
        {name:"Jestha",days:31,gregStart:"2025-05-15"},
        {name:"Ashadh",days:32,gregStart:"2025-06-15"},
        {name:"Shrawan",days:31,gregStart:"2025-07-17"},
        {name:"Bhadra",days:31,gregStart:"2025-08-17"},
        {name:"Asoj",days:31,gregStart:"2025-09-17"},
        {name:"Kartik",days:30,gregStart:"2025-10-18"},
        {name:"Mangsir",days:29,gregStart:"2025-11-17"},
        {name:"Poush",days:30,gregStart:"2025-12-16"},
        {name:"Magh",days:29,gregStart:"2026-01-15"},
        {name:"Falgun",days:30,gregStart:"2026-02-13"},
        {name:"Chaitra",days:31,gregStart:"2026-03-16"}
    ],
    2083: [
        {name:"Baishakh",days:31,gregStart:"2026-04-14"},
        {name:"Jestha",days:32,gregStart:"2026-05-15"},
        {name:"Ashadh",days:31,gregStart:"2026-06-16"},
        {name:"Shrawan",days:31,gregStart:"2026-07-17"},
        {name:"Bhadra",days:31,gregStart:"2026-08-17"},
        {name:"Asoj",days:30,gregStart:"2026-09-17"},
        {name:"Kartik",days:30,gregStart:"2026-10-17"},
        {name:"Mangsir",days:30,gregStart:"2026-11-16"},
        {name:"Poush",days:29,gregStart:"2026-12-16"},
        {name:"Magh",days:30,gregStart:"2027-01-14"},
        {name:"Falgun",days:30,gregStart:"2027-02-13"},
        {name:"Chaitra",days:31,gregStart:"2027-03-15"}
    ]
};

// Holidays data
const holidays = {
    2081: [
        { month: 6, day: 1, name: "Dashain", nepali: "दशैं", type: "dashain" },
        { month: 6, day: 15, name: "Tihar", nepali: "तिहार", type: "tihar" },
        { month: 11, day: 1, name: "Chaitra Navaratri", nepali: "चैत्र नवरात्री", type: "national" }
    ],
    2082: [
        { month: 0, day: 1, name: "Nepali New Year", nepali: "नेपाली नयाँ वर्ष", type: "national" },
        { month: 0, day: 5, name: "Ram Navami", nepali: "राम नवमी", type: "national" },
        { month: 0, day: 29, name: "Ubauli Parva", nepali: "उबौली पर्व", type: "ethnic" },
        { month: 0, day: 29, name: "Buddha Jayanti", nepali: "बुद्ध जयन्ती", type: "birth" },
        { month: 0, day: 18, name: "May Day Labour Day", nepali: "मे दिवस", type: "observed" },
        { month: 1, day: 15, name: "Republic Day", nepali: "गणतन्त्र दिवस", type: "observed" },
        { month: 3, day: 24, name: "Rakshya Bandhan", nepali: "रक्षा बन्धन", type: "national" },
        { month: 3, day: 25, name: "Gai Jatra", nepali: "गाईजात्रा", type: "jatra" },
        { month: 3, day: 25, name: "Gaijatra", nepali: "गाईजात्रा", type: "ethnic" },
        { month: 3, day: 31, name: "Krishna Janmashtami", nepali: "कृष्ण जन्माष्टमी", type: "national" },
        { month: 4, day: 10, name: "Haritalika (Teej)", nepali: "हरितालिका (तीज)", type: "women" },
        { month: 4, day: 15, name: "Gaura Parva", nepali: "गौरा पर्व", type: "ethnic" },
        { month: 4, day: 21, name: "Indra Jatra", nepali: "इन्द्रजात्रा", type: "jatra" },
        { month: 4, day: 30, name: "Jitiya Festival", nepali: "जितिया पर्व", type: "women" },
        { month: 5, day: 3, name: "Constitution Day", nepali: "संविधान दिवस", type: "observed" },
        { month: 5, day: 6, name: "Ghatasthapana", nepali: "घटस्थापना", type: "national" },
        { month: 5, day: 13, name: "Dashain", nepali: "दशैं", type: "dashain" },
        { month: 5, day: 14, name: "Dashain", nepali: "दशैं", type: "dashain" },
        { month: 5, day: 15, name: "Dashain", nepali: "दशैं", type: "dashain" },
        { month: 5, day: 16, name: "Dashain", nepali: "दशैं", type: "dashain" },
        { month: 5, day: 17, name: "Dashain", nepali: "दशैं", type: "dashain" },
        { month: 5, day: 18, name: "Dashain", nepali: "दशैं", type: "dashain" },
        { month: 6, day: 3, name: "Tihar", nepali: "तिहार", type: "tihar" },
        { month: 6, day: 4, name: "Tihar", nepali: "तिहार", type: "tihar" },
        { month: 6, day: 5, name: "Tihar", nepali: "तिहार", type: "tihar" },
        { month: 6, day: 6, name: "Tihar", nepali: "तिहार", type: "tihar" },
        { month: 6, day: 7, name: "Tihar", nepali: "तिहार", type: "tihar" },
        { month: 6, day: 10, name: "Chhath", nepali: "छठ", type: "national" },
        { month: 6, day: 25, name: "Falgunanda Jayanti", nepali: "फाल्गुनन्द जयन्ती", type: "birth" },
        { month: 7, day: 17, name: "International Day of Persons with Disabilities", nepali: "अन्तर्राष्ट्रिय अपाङ्गता दिवस", type: "disability" },
        { month: 7, day: 18, name: "Udhauli Parva, Yomari Punhi", nepali: "उधौली पर्व, योमरी पुन्ही", type: "national" },
        { month: 8, day: 10, name: "Christmas", nepali: "क्रिसमस", type: "national" },
        { month: 8, day: 15, name: "Tamu Lhosar", nepali: "तमु ल्होसार", type: "national" },
        { month: 8, day: 27, name: "Prithvi Jayanti", nepali: "पृथ्वी जयन्ती", type: "birth" },
        { month: 9, day: 1, name: "Maghi Parva/Maghe Sankranti", nepali: "माघी पर्व/माघे संक्रान्ति", type: "national" },
        { month: 9, day: 5, name: "Sonam Lhosar", nepali: "सोनाम ल्होसार", type: "national" },
        { month: 9, day: 9, name: "Basanta Panchami/Saraswati Puja", nepali: "बसन्त पञ्चमी/सरस्वती पूजा", type: "education" },
        { month: 9, day: 16, name: "Martyrs Day", nepali: "शहीद दिवस", type: "observed" },
        { month: 10, day: 3, name: "Maha Shivaratri", nepali: "महाशिवरात्रि", type: "national" },
        { month: 10, day: 6, name: "Gyalpo Lhosar", nepali: "ग्याल्पो ल्होसार", type: "national" },
        { month: 10, day: 7, name: "Democracy Day", nepali: "प्रजातन्त्र दिवस", type: "observed" },
        { month: 10, day: 18, name: "Fagu Purnima", nepali: "फागु पूर्णिमा", type: "national" },
        { month: 10, day: 24, name: "International Women's Day", nepali: "अन्तर्राष्ट्रिय महिला दिवस", type: "observed" },
        { month: 11, day: 1, name: "Fagu Purnima", nepali: "फागु पूर्णिमा", type: "national" },
        { month: 11, day: 4, name: "Ghode Jatra", nepali: "घोडेजात्रा", type: "jatra" }
    ],
    2083: [
        { month: 0, day: 1, name: "Nepali New Year", nepali: "नेपाली नयाँ वर्ष", type: "national" },
        { month: 5, day: 15, name: "Dashain", nepali: "दशैं", type: "dashain" },
        { month: 5, day: 29, name: "Tihar", nepali: "तिहार", type: "tihar" }
    ]
};

// DOM elements
const monthTabs = document.getElementById('monthTabs');
const calendarGrid = document.getElementById('calendarGrid');
const currentMonth = document.getElementById('currentMonth');
const holidayList = document.getElementById('holidayList');
const monthlySummary = document.getElementById('monthlySummary');

// Rendering functions
function renderMonthTabs() {
    monthTabs.innerHTML = '';
    const fragment = document.createDocumentFragment();
    calendarData[currentYear].forEach((month, index) => {
        let tab = document.createElement('button');
        tab.className = `btn btn-outline-primary ${index === currentMonthIndex ? 'active' : ''}`;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', index === currentMonthIndex);
        tab.textContent = isNepali ? monthsNepali[index] : month.name;
        if (isNepali) tab.classList.add('nepali');
        fragment.appendChild(tab);
    });
    monthTabs.appendChild(fragment);
}

function renderCalendar() {
    let month = calendarData[currentYear]?.[currentMonthIndex];
    if (!month) {
        console.error('Invalid month data');
        currentMonth.textContent = isNepali ? 'त्रुटि: अमान्य महिना' : 'Error: Invalid Month';
        return;
    }
    currentMonth.textContent = isNepali 
        ? `${monthsNepali[currentMonthIndex]} ${currentYear} BS` 
        : `${month.name} ${currentYear} BS`;
    const fragment = document.createDocumentFragment();

    const weekdays = isNepali ? daysNepali : daysEnglish;
    weekdays.forEach(day => {
        let dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day bg-primary text-white text-center py-2';
        dayHeader.textContent = day;
        fragment.appendChild(dayHeader);
    });

    let startDate = new Date(month.gregStart);
    let firstDay = startDate.getDay();
    let today = new Date();
    let todayBS = getBSDateFromGregorian(today);

    for (let i = 0; i < firstDay; i++) {
        let emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day bg-light';
        fragment.appendChild(emptyDay);
    }

    for (let day = 1; day <= month.days; day++) {
        let gregDate = getGregorianDate(currentYear, currentMonthIndex, day);
        let dayDiv = document.createElement('div');
        dayDiv.className = `calendar-day bg-white border p-2 ${todayBS && todayBS.year === currentYear && todayBS.month === currentMonthIndex && todayBS.day === day ? 'today' : ''}`;
        dayDiv.setAttribute('role', 'gridcell');
        dayDiv.setAttribute('tabindex', '0');
        if (gregDate.getDay() === 6) dayDiv.classList.add('saturday');

        let holiday = holidays[currentYear]?.find(h => h.month === currentMonthIndex && h.day === day);
        if (holiday) {
            dayDiv.classList.add(holiday.type);
            let festivalDiv = document.createElement('div');
            festivalDiv.className = 'festival';
            festivalDiv.textContent = isNepali ? holiday.nepali : holiday.name;
            dayDiv.appendChild(festivalDiv);

            let tooltip = document.createElement('div');
            tooltip.className = 'festival-tooltip';
            tooltip.textContent = isNepali ? holiday.nepali : holiday.name;
            dayDiv.appendChild(tooltip);
        }

        let bsDate = document.createElement('div');
        bsDate.className = 'bs-date';
        bsDate.textContent = isNepali ? (day).toString() : day;
        dayDiv.appendChild(bsDate);

        let gregDateDiv = document.createElement('div');
        gregDateDiv.className = 'greg-date';
        gregDateDiv.textContent = gregDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dayDiv.appendChild(gregDateDiv);

        let dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        let dayNotes = notes.filter(note => getRecurringDates(note).includes(dateStr));
        dayNotes.forEach(note => {
            let indicator = document.createElement('div');
            let tooltip = document.createElement('div');
            let preview = document.createElement('div');
            preview.className = 'event-preview';
            if (note.type === 'note') {
                indicator.className = 'note-indicator';
                tooltip.className = 'note-tooltip';
                tooltip.textContent = note.title;
                preview.textContent = note.title.substring(0, 15) + (note.title.length > 15 ? '...' : '');
            } else if (note.type === 'income') {
                indicator.className = 'income-indicator';
                tooltip.className = 'finance-tooltip';
                tooltip.textContent = `Income: ${note.title} NPR`;
                preview.textContent = `+${note.title} NPR`;
            } else if (note.type === 'expense') {
                indicator.className = 'expense-indicator';
                tooltip.className = 'finance-tooltip';
                tooltip.textContent = `Expense: ${note.title} NPR`;
                preview.textContent = `-${note.title} NPR`;
            }
            dayDiv.appendChild(indicator);
            dayDiv.appendChild(tooltip);
            dayDiv.appendChild(preview);
        });

        dayDiv.addEventListener('click', () => {
            selectedDate.textContent = dateStr;
            entryType.value = 'note';
            noteTitle.value = '';
            noteTime.value = '';
            noteDescription.value = '';
            recurring.checked = false;
            reminder.checked = false;
            entryCategory.style.display = 'none';
            categoryManager.style.display = 'none';
            budgetSection.style.display = 'none';
            saveNote.style.display = 'block';
            editEntry.style.display = 'none';
            noteFormModal.show();
            noteTitle.focus();
        });

        dayDiv.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                dayDiv.click();
            }
        });

        fragment.appendChild(dayDiv);
    }

    calendarGrid.innerHTML = '';
    calendarGrid.appendChild(fragment);
    renderMonthlySummary();
    renderHolidays();
}

function renderMonthlySummary() {
    let income = 0, expense = 0;
    let dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}`;
    let monthNotes = notes.filter(note => getRecurringDates(note).some(d => d.startsWith(dateStr)) && (note.type === 'income' || note.type === 'expense'));
    monthNotes.forEach(note => {
        if (note.type === 'income') income += parseFloat(note.title || 0);
        else expense += parseFloat(note.title || 0);
    });
    let budget = budgets[dateStr] || 0;
    let variance = budget ? budget - expense : 0;
    monthlySummary.innerHTML = isNepali
        ? `कुल आय: ${income} NPR<br>कुल खर्च: ${expense} NPR<br>ब्यालेन्स: ${income - expense} NPR<br>बजेट: ${budget} NPR<br>भिन्नता: ${variance} NPR`
        : `Total Income: ${income} NPR<br>Total Expense: ${expense} NPR<br>Balance: ${income - expense} NPR<br>Budget: ${budget} NPR<br>Variance: ${variance} NPR`;
}

function renderHolidays() {
    holidayList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    let monthHolidays = holidays[currentYear]?.filter(h => h.month === currentMonthIndex) || [];
    if (monthHolidays.length === 0) {
        let li = document.createElement('li');
        li.textContent = isNepali ? 'यस महिनामा कुनै बिदा छैन' : 'No holidays this month';
        fragment.appendChild(li);
    } else {
        monthHolidays.forEach(holiday => {
            let li = document.createElement('li');
            li.textContent = `${isNepali ? holiday.nepali : holiday.name} - ${holiday.day} ${isNepali ? monthsNepali[currentMonthIndex] : calendarData[currentYear][currentMonthIndex].name}`;
            if (isNepali) li.classList.add('nepali');
            fragment.appendChild(li);
        });
    }
    holidayList.appendChild(fragment);
}

function setToday() {
    let today = new Date();
    let bsDate = getBSDateFromGregorian(today);
    if (bsDate) {
        currentYear = bsDate.year;
        currentMonthIndex = bsDate.month;
        yearFilter.value = currentYear;
        renderMonthTabs();
        renderCalendar();
    } else {
        console.error('Could not set today: Invalid BS date');
        currentYear = 2082;
        currentMonthIndex = 0;
        yearFilter.value = currentYear;
        renderMonthTabs();
        renderCalendar();
    }
    todayNepaliDate.textContent = bsDate 
        ? `${bsDate.day} ${monthsNepali[bsDate.month]} ${bsDate.year} BS`
        : (isNepali ? 'अमान्य मिति' : 'Invalid Date');
    todayEnglishDate.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Event listeners
yearFilter.addEventListener('change', () => {
    currentYear = parseInt(yearFilter.value);
    currentMonthIndex = 0;
    renderMonthTabs();
    renderCalendar();
});

todayButton.addEventListener('click', setToday);

monthTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        currentMonthIndex = Array.from(monthTabs.children).indexOf(e.target);
        renderMonthTabs();
        renderCalendar();
    }
});

// Export calendar and holiday data
function exportCalendarToExcel() {
    let headers = isNepali ? ['महिना', 'दिनहरू', 'ग्रेगोरियन सुरु'] : ['Month', 'Days', 'Gregorian Start'];
    let data = calendarData[currentYear].map(month => [
        isNepali ? monthsNepali[calendarData[currentYear].indexOf(month)] : month.name,
        month.days,
        month.gregStart
    ]);
    let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isNepali ? 'पात्रो' : 'Calendar');
    XLSX.writeFile(wb, `Calendar_${currentYear}.xlsx`);
}

function exportHolidayToExcel() {
    let headers = isNepali ? ['महिना', 'दिन', 'नाम', 'नेपाली', 'प्रकार'] : ['Month', 'Day', 'Name', 'Nepali', 'Type'];
    let data = (holidays[currentYear] || []).map(holiday => [
        isNepali ? monthsNepali[holiday.month] : calendarData[currentYear][holiday.month].name,
        holiday.day,
        holiday.name,
        holiday.nepali,
        holiday.type
    ]);
    let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isNepali ? 'बिदाहरू' : 'Holidays');
    XLSX.writeFile(wb, `Holidays_${currentYear}.xlsx`);
}

function exportCalendarToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let title = isNepali ? `पात्रो ${currentYear}` : `Calendar ${currentYear}`;
    let headers = isNepali ? ['महिना', 'दिनहरू', 'ग्रेगोरियन सुरु'] : ['Month', 'Days', 'Gregorian Start'];
    let data = calendarData[currentYear].map(month => [
        isNepali ? monthsNepali[calendarData[currentYear].indexOf(month)] : month.name,
        month.days,
        month.gregStart
    ]);
    doc.text(title, 14, 20);
    doc.autoTable({
        startY: 30,
        head: [headers],
        body: data,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [2, 136, 209] },
        alternateRowStyles: { fillColor: [240, 240, 240] }
    });
    doc.save(`${title}.pdf`);
}

function importCalendarData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.onchange = function(e) {
        let file = e.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function(e) {
            try {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
                let sheet = workbook.Sheets[workbook.SheetNames[0]];
                let importedData = XLSX.utils.sheet_to_json(sheet);
                calendarData[currentYear] = importedData.map(row => ({
                    name: row.Month || row['महिना'],
                    days: row.Days || row['दिनहरू'],
                    gregStart: row [row['Gregorian Start'] || row['ग्रेगोरियन सुरु']
                }));
                renderCalendar();
                renderMonthTabs();
                alert(isNepali ? 'पात्रो डेटा सफलतापूर्वक आयात गरियो' : 'Calendar data imported successfully');
            } catch (err) {
                alert(isNepali ? 'आयात असफल: अमान्य फाइल ढाँचा' : 'Import failed: Invalid file format');
            }
        };
        reader.readAsArrayBuffer(file);
    };
    input.click();
}

function importHolidayData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.onchange = function(e) {
        let file = e.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function(e) {
            try {
                let data = new Uint8Array(e.target.result);
                let workbook = XLSX.read(data, { type: 'array' });
                let sheet = workbook.Sheets[workbook.SheetNames[0]];
                let importedData = XLSX.utils.sheet_to_json(sheet);
                holidays[currentYear] = importedData.map(row => ({
                    month: monthsNepali.indexOf(row['महिना']) !== -1 ? monthsNepali.indexOf(row['महिना']) : calendarData[currentYear].findIndex(m => m.name === row.Month),
                    day: row.Day || row['दिन'],
                    name: row.Name || row['नाम'],
                    nepali: row.Nepali || row['नेपाली'],
                    type: row.Type || row['प्रकार']
                }));
                renderCalendar();
                renderHolidays();
                alert(isNepali ? 'बिदा डेटा सफलतापूर्वक आयात गरियो' : 'Holiday data imported successfully');
            } catch (err) {
                alert(isNepali ? 'आयात असफल: अमान्य फाइल ढाँचा' : 'Import failed: Invalid file format');
            }
        };
        reader.readAsArrayBuffer(file);
    };
    input.click();
}

// Initialize
(function initCalendar() {
    if (!calendarData[currentYear]) {
        currentYear = 2082;
        yearFilter.value = currentYear;
    }
    setToday();
    renderMonthTabs();
    renderCalendar();
})();