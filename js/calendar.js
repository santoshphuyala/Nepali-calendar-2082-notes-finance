const calendarGrid = typeof document !== 'undefined' ? document.getElementById('calendarGrid') : null;
const monthTabs = typeof document !== 'undefined' ? document.getElementById('monthTabs') : null;
const currentMonthDisplay = typeof document !== 'undefined' ? document.getElementById('currentMonth') : null;
const yearFilter = typeof document !== 'undefined' ? document.getElementById('yearFilter') : null;
const todayButton = typeof document !== 'undefined' ? document.getElementById('todayButton') : null;
const monthlySummary = typeof document !== 'undefined' ? document.getElementById('monthlySummary') : null;
const holidayList = typeof document !== 'undefined' ? document.getElementById('holidayList') : null;
const todayNepaliDate = typeof document !== 'undefined' ? document.getElementById('todayNepaliDate') : null;
const todayEnglishDate = typeof document !== 'undefined' ? document.getElementById('todayEnglishDate') : null;
const noteFormModal = typeof bootstrap !== 'undefined' && typeof document !== 'undefined'
    ? new bootstrap.Modal(document.getElementById('noteFormModal'))
    : null;

function renderMonthTabs() {
    if (!monthTabs) return;
    monthTabs.innerHTML = '';
    calendarData[currentYear].forEach((month, index) => {
        let tab = document.createElement('button');
        tab.className = `btn ${index === currentMonthIndex ? 'btn-primary' : 'btn-outline-primary'}`;
        tab.textContent = isNepali ? monthsNepali[index] : month.name;
        tab.setAttribute('aria-label', `Select ${month.name}`);
        tab.addEventListener('click', () => {
            currentMonthIndex = index;
            renderCalendar();
        });
        monthTabs.appendChild(tab);
    });
}

function renderCalendar() {
    if (!calendarGrid || !currentMonthDisplay) return;
    calendarGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const month = calendarData[currentYear][currentMonthIndex];
    currentMonthDisplay.textContent = `${isNepali ? monthsNepali[currentMonthIndex] : month.name} ${currentYear}`;

    const daysOfWeek = isNepali
        ? ['आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        let dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-header';
        dayHeader.textContent = day;
        fragment.appendChild(dayHeader);
    });

    let gregDate = new Date(month.gregStart);
    let firstDayGreg = new Date(month.gregStart);
    let firstDayOfWeek = firstDayGreg.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
        let emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        fragment.appendChild(emptyCell);
    }

    for (let day = 1; day <= month.days; day++) {
        let dayIndex = day - 1;
        let cell = document.createElement('div');
        cell.className = 'calendar-day';
        gregDate = new Date(month.gregStart);
        gregDate.setDate(gregDate.getDate() + dayIndex);
        let gregDay = gregDate.getDay();
        cell.classList.add(`day-${gregDay}`);

        // Day number (BS day)
        let dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = isNepali ? day.toString().replace(/[0-9]/g, d => String.fromCharCode(0x0966 + parseInt(d))) : day;
        cell.appendChild(dayNumber);

        // Nepali (BS) date (Year Month Day)
        let nepaliDate = document.createElement('small');
        nepaliDate.className = 'nepali-date';
        nepaliDate.textContent = `${currentYear} ${isNepali ? monthsNepali[currentMonthIndex] : month.name} ${isNepali ? day.toString().replace(/[0-9]/g, d => String.fromCharCode(0x0966 + parseInt(d))) : day}`;
        cell.appendChild(nepaliDate);

        // Gregorian date
        let gregorianDate = document.createElement('small');
        gregorianDate.className = 'gregorian-date';
        gregorianDate.textContent = gregDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        cell.appendChild(gregorianDate);

        let holiday = month.holidays.find(h => h.day === day);
        if (holiday) {
            let holidayIndicator = document.createElement('div');
            holidayIndicator.className = 'holiday-indicator';
            holidayIndicator.setAttribute('data-tooltip', holiday.name);
            cell.appendChild(holidayIndicator);
        }

        getRecurringDates({ date: `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`, recurring: true }).forEach(date => {
            let dayNotes = notes.filter(note => note.date === date);
            dayNotes.forEach(note => {
                if (note.type === 'note') {
                    let noteIndicator = document.createElement('div');
                    noteIndicator.className = 'note-indicator';
                    noteIndicator.setAttribute('data-tooltip', note.title);
                    cell.appendChild(noteIndicator);
                } else if (note.type === 'income' || note.type === 'expense') {
                    let financeIndicator = document.createElement('div');
                    financeIndicator.className = `finance-indicator ${note.type}`;
                    financeIndicator.setAttribute('data-tooltip', `${note.type}: ${note.title} NPR`);
                    cell.appendChild(financeIndicator);
                }
            });
        });

        cell.addEventListener('click', () => {
            if (!document || !noteFormModal) return;
            document.getElementById('selectedDate').textContent = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            noteFormModal.show();
        });

        fragment.appendChild(cell);
    }

    calendarGrid.appendChild(fragment);
    renderMonthlySummary();
    renderHolidayList();
}

function renderMonthlySummary() {
    if (!monthlySummary) return;
    let income = 0, expense = 0;
    let datePrefix = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}`;
    notes.forEach(note => {
        if (note.type === 'income' || note.type === 'expense') {
            getRecurringDates(note).forEach(date => {
                if (date.startsWith(datePrefix)) {
                    if (note.type === 'income') income += parseFloat(note.title || 0);
                    else expense += parseFloat(note.title || 0);
                }
            });
        }
    });
    let budget = budgets[datePrefix] || 0;
    let variance = budget ? budget - expense : 0;
    monthlySummary.innerHTML = `
        <strong>${isNepali ? 'आय' : 'Income'}:</strong> ${income} NPR<br>
        <strong>${isNepali ? 'खर्च' : 'Expense'}:</strong> ${expense} NPR<br>
        <strong>${isNepali ? 'बजेट' : 'Budget'}:</strong> ${budget} NPR<br>
        <strong>${isNepali ? 'भिन्नता' : 'Variance'}:</strong> ${variance} NPR
    `;
}

function renderHolidayList() {
    if (!holidayList) return;
    holidayList.innerHTML = '';
    const month = calendarData[currentYear][currentMonthIndex];
    if (month.holidays.length === 0) {
        let li = document.createElement('li');
        li.textContent = isNepali ? 'यस महिनामा कुनै बिदा छैन' : 'No holidays this month';
        holidayList.appendChild(li);
    } else {
        month.holidays.forEach(holiday => {
            let li = document.createElement('li');
            li.textContent = `${holiday.day} ${isNepali ? monthsNepali[currentMonthIndex] : month.name}: ${holiday.name}`;
            holidayList.appendChild(li);
        });
    }
}

function exportCalendarToExcel() {
    if (typeof XLSX === 'undefined') return; // Skip in Node.js unless XLSX is mocked
    let headers = isNepali
        ? ['मिति', 'दिन', 'ग्रेगोरियन मिति', 'बिदा']
        : ['Date', 'Day', 'Gregorian Date', 'Holiday'];
    let data = [];
    const month = calendarData[currentYear][currentMonthIndex];
    let gregDate = new Date(month.gregStart);
    for (let day = 1; day <= month.days; day++) {
        let holiday = month.holidays.find(h => h.day === day);
        data.push([
            `${currentYear}-${currentMonthIndex + 1}-${day}`,
            gregDate.toLocaleDateString('en-US', { weekday: 'long' }),
            gregDate.toLocaleDateString('en-US'),
            holiday ? holiday.name : ''
        ]);
        gregDate.setDate(gregDate.getDate() + 1);
    }
    let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isNepali ? 'पात्रो' : 'Calendar');
    XLSX.writeFile(wb, `Calendar_${currentYear}_${currentMonthIndex + 1}.xlsx`);
}

function exportHolidaysToExcel() {
    if (typeof XLSX === 'undefined') return; // Skip in Node.js unless XLSX is mocked
    let headers = isNepali
        ? ['महिना', 'दिन', 'बिदा']
        : ['Month', 'Day', 'Holiday'];
    let data = [];
    calendarData[currentYear].forEach((month, index) => {
        month.holidays.forEach(holiday => {
            data.push([
                isNepali ? monthsNepali[index] : month.name,
                holiday.day,
                holiday.name
            ]);
        });
    });
    let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isNepali ? 'बिदाहरू' : 'Holidays');
    XLSX.writeFile(wb, `Holidays_${currentYear}.xlsx`);
}

function exportCalendarToPDF() {
    if (typeof window === 'undefined' || !window.jspdf) return; // Skip in Node.js unless jsPDF is mocked
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let title = isNepali
        ? `पात्रो ${currentYear} - ${monthsNepali[currentMonthIndex]}`
        : `Calendar ${currentYear} - ${calendarData[currentYear][currentMonthIndex].name}`;
    let headers = isNepali
        ? ['मिति', 'दिन', 'ग्रेगोरियन मिति', 'बिदा']
        : ['Date', "Day", 'Gregorian Date', 'Holiday'];
    let data = [];
    const month = calendarData[currentYear][currentMonthIndex];
    let gregDate = new Date(month.gregStart);
    for (let day = 1; day <= month.days; day++) {
        let holiday = month.holidays.find(h => h.day === day);
        data.push([
            `${currentYear}-${currentMonthIndex + 1}-${day}`,
            gregDate.toLocaleDateString('en-US', { weekday: 'long' }),
            gregDate.toLocaleDateString('en-US'),
            holiday ? holiday.name : ''
        ]);
        gregDate.setDate(gregDate.getDate() + 1);
    }
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
    if (typeof document === 'undefined') return; // Skip in Node.js
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function (e) {
        let file = e.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function (e) {
            try {
                let importedData = JSON.parse(e.target.result);
                if (importedData[currentYear]) {
                    calendarData[currentYear] = importedData[currentYear];
                    localStorage.setItem('calendarData', JSON.stringify(calendarData));
                    renderCalendar();
                    alert(isNepali ? 'पात्रो डेटा सफलतापूर्वक आयात गरियो' : 'Calendar data imported successfully');
                } else {
                    alert(isNepali ? 'आयात असफल: अमान्य डेटा ढाँचा' : 'Import failed: Invalid data format');
                }
            } catch (err) {
                alert(isNepali ? 'आयात असफल: अमान्य फाइल ढाँचा' : 'Import failed: Invalid file format');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function importHolidayData() {
    if (typeof document === 'undefined') return; // Skip in Node.js
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function (e) {
        let file = e.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function (e) {
            try {
                let importedHolidays = JSON.parse(e.target.result);
                calendarData[currentYear].forEach((month, index) => {
                    month.holidays = importedHolidays[index]?.holidays || month.holidays;
                });
                localStorage.setItem('calendarData', JSON.stringify(calendarData));
                renderCalendar();
                alert(isNepali ? 'बिदा डेटा सफलतापूर्वक आयात गरियो' : 'Holiday data imported successfully');
            } catch (err) {
                alert(isNepali ? 'आयात असफल: अमान्य फाइल ढाँचा' : 'Import failed: Invalid file format');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function setTodayDate() {
    if (!todayNepaliDate || !todayEnglishDate) return;
    let today = new Date();
    let bsDate = getBSDateFromGregorian(today);
    todayNepaliDate.textContent = `${isNepali ? 'आजको मिति (नेपाली):' : 'Today (Nepali):'} ${bsDate.day} ${isNepali ? monthsNepali[bsDate.month] : calendarData[bsDate.year][bsDate.month].name} ${bsDate.year}`;
    todayEnglishDate.textContent = `${isNepali ? 'आजको मिति (अंग्रेजी):' : 'Today (English):'} ${today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

if (yearFilter) {
    yearFilter.addEventListener('change', () => {
        currentYear = parseInt(yearFilter.value);
        currentMonthIndex = 0;
        renderCalendar();
    });
}

if (todayButton) {
    todayButton.addEventListener('click', () => {
        let today = new Date();
        let bsDate = getBSDateFromGregorian(today);
        currentYear = bsDate.year;
        currentMonthIndex = bsDate.month;
        yearFilter.value = currentYear;
        renderCalendar();
    });
}

if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTodayDate();
        renderMonthTabs();
        renderCalendar();
    });
}

if (typeof document !== 'undefined') {
    document.querySelectorAll('.excel-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'calendar') exportCalendarToExcel();
            else if (option.dataset.type === 'holiday') exportHolidaysToExcel();
        });
    });

    document.querySelectorAll('.pdf-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'calendar') exportCalendarToPDF();
        });
    });

    document.querySelectorAll('.import-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'calendar') importCalendarData();
            else if (option.dataset.type === 'holiday') importHolidayData();
        });
    });
}