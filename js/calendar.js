const yearFilter = document.getElementById('yearFilter');
const todayButton = document.getElementById('todayButton');
const monthTabs = document.getElementById('monthTabs');
const currentMonthDisplay = document.getElementById('currentMonth');
const calendarGrid = document.getElementById('calendarGrid');
const holidayList = document.getElementById('holidayList');
const todayNepaliDate = document.getElementById('todayNepaliDate');
const todayEnglishDate = document.getElementById('todayEnglishDate');

function renderCalendar() {
    if (!calendarGrid || !currentMonthDisplay || !monthTabs) {
        console.error('Required calendar elements not found');
        return;
    }

    const year = parseInt(yearFilter?.value || currentYear);
    const monthData = calendarData[year][currentMonthIndex];
    currentMonthDisplay.textContent = `${isNepali ? monthsNepali[currentMonthIndex] : monthData.name} ${year}`;

    // Populate month tabs
    monthTabs.innerHTML = '';
    calendarData[year].forEach((month, index) => {
        const button = document.createElement('button');
        button.className = `btn btn-outline-primary ${index === currentMonthIndex ? 'active' : ''}`;
        button.textContent = isNepali ? monthsNepali[index] : month.name;
        button.addEventListener('click', () => {
            currentMonthIndex = index;
            renderCalendar();
        });
        monthTabs.appendChild(button);
    });

    // Render calendar grid
    calendarGrid.innerHTML = '';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });

    for (let i = 0; i < monthData.days; i++) {
        const day = i + 1;
        const dateStr = `${year}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const holiday = holidays2082[dateStr];
        const dayDiv = document.createElement('div');
        dayDiv.className = `calendar-day ${holiday ? 'holiday' : ''}`;
        dayDiv.innerHTML = `
            <span class="day-number">${day}</span>
            <span class="nepali-date">${day}</span>
            <span class="gregorian-date">${new Date(year - 57, currentMonthIndex, day).toISOString().split('T')[0]}</span>
            ${holiday ? `<span class="holiday-indicator" data-en="${holiday.en}" data-ne="${holiday.ne}">${isNepali ? holiday.ne : holiday.en}</span>` : ''}
        `;
        dayDiv.addEventListener('click', () => {
            document.getElementById('selectedDate').textContent = dateStr;
            const noteFormModal = new bootstrap.Modal(document.getElementById('noteFormModal'));
            noteFormModal.show();
        });
        calendarGrid.appendChild(dayDiv);
    }

    // Render holidays for the current month
    holidayList.innerHTML = '';
    const monthHolidays = Object.keys(holidays2082).filter(date => {
        const [hYear, hMonth] = date.split('-').map(Number);
        return hYear === year && hMonth === (currentMonthIndex + 1);
    });

    if (monthHolidays.length === 0) {
        holidayList.innerHTML = `<li data-en="No holidays this month" data-ne="यस महिनामा कुनै बिदा छैन">No holidays this month</li>`;
    } else {
        monthHolidays.forEach(date => {
            const holiday = holidays2082[date];
            const li = document.createElement('li');
            li.innerHTML = `<span class="holiday-date">${date}</span>: ${isNepali ? holiday.ne : holiday.en}`;
            holidayList.appendChild(li);
        });
    }

    // Update today's date
    const today = new Date();
    todayNepaliDate.textContent = `${isNepali ? 'आज' : 'Today'}: ${today.getDate()} ${isNepali ? monthsNepali[today.getMonth()] : today.toLocaleString('default', { month: 'long' })} ${today.getFullYear() + 57}`;
    todayEnglishDate.textContent = `${isNepali ? 'आज' : 'Today'}: ${today.toISOString().split('T')[0]}`;
}

if (yearFilter) {
    yearFilter.addEventListener('change', () => {
        currentYear = parseInt(yearFilter.value);
        renderCalendar();
    });
}

if (todayButton) {
    todayButton.addEventListener('click', () => {
        const today = new Date();
        currentYear = today.getFullYear() + 57;
        currentMonthIndex = today.getMonth();
        yearFilter.value = currentYear;
        renderCalendar();
    });
}

document.addEventListener('DOMContentLoaded', renderCalendar);
