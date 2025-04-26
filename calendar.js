document.addEventListener('DOMContentLoaded', () => {
    // Calendar Data
    const calendarData = {
        2081: [
            {name:"Baisakh",days:31,gregStart:"2024-04-13"},
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
            {name:"Baisakh",days:31,gregStart:"2025-04-14"},
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
            {name:"Baisakh",days:31,gregStart:"2026-04-14"},
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

    // Holidays Data
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

    // Initialize State
    let currentYear = 2082;
    let currentMonthIndex = 0;
    let isNepali = false;
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let customCategories = JSON.parse(localStorage.getItem('customCategories')) || [];
    let budgets = JSON.parse(localStorage.getItem('budgets')) || {};
    let editingNoteIndex = null;
    let undoStack = [];

    // Language Data
    const monthsNepali = ['बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत'];
    const daysNepali = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];
    const daysEnglish = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // DOM Elements
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

    // Function to Calculate Start Day from gregStart
    function getStartDay(gregStart) {
        const date = new Date(gregStart);
        return date.getDay(); // 0 (Sunday) to 6 (Saturday)
    }

    // Function to Convert Gregorian Date to Nepali Date (Simplified Approximation)
    function gregorianToNepali(gregDate) {
        const referenceDate = new Date("2025-04-14"); // Baisakh 1, 2082
        const diffDays = Math.floor((gregDate - referenceDate) / (1000 * 60 * 60 * 24));
        let year = 2082;
        let monthIndex = 0;
        let date = 1;

        let remainingDays = diffDays;
        for (let i = 0; i < calendarData[year].length; i++) {
            if (remainingDays < calendarData[year][i].days) {
                monthIndex = i;
                date = remainingDays + 1;
                break;
            }
            remainingDays -= calendarData[year][i].days;
        }

        return { year, monthIndex, date };
    }

    // Render Calendar Grid
    function renderCalendar(year, monthIndex) {
        const monthData = calendarData[year][monthIndex];
        const monthName = monthData.name;
        const grid = document.getElementById(`calendarGrid${monthName}`);
        if (!grid) {
            console.error(`Calendar grid for ${monthName} not found`);
            return;
        }
        console.log(`Rendering calendar for ${monthName}, ${year}`);
        grid.innerHTML = '';

        // Add day labels
        const days = isNepali ? daysNepali : daysEnglish;
        days.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.className = 'calendar-day';
            dayLabel.textContent = day;
            grid.appendChild(dayLabel);
        });

        // Calculate start day
        const startDay = getStartDay(monthData.gregStart);
        console.log(`Start day for ${monthName}: ${startDay}`);

        // Add empty days before the start of the month
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            grid.appendChild(emptyDay);
        }

        // Add days of the month
        const today = new Date(); // Current date (e.g., April 26, 2025)
        const todayNepali = gregorianToNepali(today); // Convert to Nepali date
        console.log(`Today in Nepali Calendar: Year ${todayNepali.year}, Month ${todayNepali.monthIndex}, Date ${todayNepali.date}`);
        for (let i = 1; i <= monthData.days; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = isNepali ? i.toString().replace(/[0-9]/g, d => String.fromCharCode(0x0966 + parseInt(d))) : i;
            const dayHolidays = holidays[year]?.filter(h => h.month === monthIndex && h.day === i);
            if (dayHolidays && dayHolidays.length > 0) {
                day.classList.add('holiday');
                day.title = dayHolidays.map(h => isNepali ? h.nepali : h.name).join(', ');
            }
            if (year === todayNepali.year && monthIndex === todayNepali.monthIndex && i === todayNepali.date) {
                day.classList.add('today');
            }
            day.addEventListener('click', () => {
                selectedDate.textContent = `${isNepali ? monthsNepali[monthIndex] : monthData.name} ${i}, ${year}`;
                noteFormModal.show();
            });
            grid.appendChild(day);
        }
    }

    // Render Holidays for the Current Month
    function renderHolidays(year, monthIndex) {
        const holidayList = document.getElementById('holidayList');
        const holidayListBelowGrid = document.getElementById('holidayListBelowGrid');
        const holidayTitle = document.getElementById('holidayTitle');
        const holidayTitleBelowGrid = document.getElementById('holidayTitleBelowGrid');
        
        if (!holidayList || !holidayListBelowGrid) {
            console.error('Holiday list element not found');
            return;
        }

        // Update holiday titles
        const monthName = isNepali ? monthsNepali[monthIndex] : calendarData[year][monthIndex].name;
        holidayTitle.textContent = isNepali ? `${monthName}मा बिदाहरू` : `Holidays in ${monthName}`;
        holidayTitleBelowGrid.textContent = isNepali ? `${monthName}मा बिदाहरू` : `Holidays in ${monthName}`;

        // Clear existing holidays
        holidayList.innerHTML = '';
        holidayListBelowGrid.innerHTML = '';

        // Filter holidays for the current month
        const monthHolidays = holidays[year]?.filter(h => h.month === monthIndex) || [];
        console.log(`Rendering holidays for ${monthName}, ${year}:`, monthHolidays);

        if (monthHolidays.length === 0) {
            const li = document.createElement('li');
            li.textContent = isNepali ? 'कुनै बिदा छैन' : 'No holidays';
            holidayList.appendChild(li);
            holidayListBelowGrid.appendChild(li.cloneNode(true));
            return;
        }

        monthHolidays.forEach(holiday => {
            const monthNameDisplay = isNepali ? monthsNepali[holiday.month] : calendarData[year][holiday.month].name;
            const li = document.createElement('li');
            li.textContent = `${monthNameDisplay} ${holiday.day}: ${isNepali ? holiday.nepali : holiday.name}`;
            holidayList.appendChild(li);
            holidayListBelowGrid.appendChild(li.cloneNode(true));
        });
    }

    // Initialize Calendar
    function initializeCalendar(year) {
        console.log(`Initializing calendar for year ${year}`);
        calendarData[year].forEach((month, index) => {
            console.log(`Calling renderCalendar for month ${month.name}, index ${index}`);
            renderCalendar(year, index);
        });
        renderHolidays(year, currentMonthIndex);
        document.querySelector('h3[data-en="Calendar 2082 BS"]').textContent = isNepali ? `पात्रो ${year} BS` : `Calendar ${year} BS`;
    }

    // Year Change Handler
    document.getElementById('yearSelect').addEventListener('change', (e) => {
        currentYear = parseInt(e.target.value);
        initializeCalendar(currentYear);
        renderHolidays(currentYear, currentMonthIndex);
    });

    // Month Tab Change Handler
    document.querySelectorAll('#monthTabs .nav-link').forEach((tab, index) => {
        tab.addEventListener('click', () => {
            currentMonthIndex = index;
            renderHolidays(currentYear, currentMonthIndex);
        });
    });

    // Language Toggle
    document.getElementById('languageToggle').addEventListener('click', () => {
        isNepali = !isNepali;
        document.querySelectorAll('[data-en]').forEach(elem => {
            elem.textContent = isNepali ? elem.getAttribute('data-ne') : elem.getAttribute('data-en');
        });
        initializeCalendar(currentYear);
        renderHolidays(currentYear, currentMonthIndex);
    });

    // Dark Mode Toggle
    document.getElementById('darkModeToggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Add Note and Finance
    document.getElementById('addNote').addEventListener('click', () => {
        entryType.value = 'note';
        selectedDate.textContent = 'Today';
        noteFormModal.show();
    });

    document.getElementById('addFinance').addEventListener('click', () => {
        entryType.value = 'income';
        selectedDate.textContent = 'Today';
        noteFormModal.show();
    });

    // View Note and Finance
    document.getElementById('viewNote').addEventListener('click', () => {
        const noteEntries = notes.filter(n => n.type === 'note');
        if (noteEntries.length === 0) {
            alert('No notes available.');
        } else {
            const noteList = noteEntries.map(n => `Date: ${n.date}, Title: ${n.title}, Description: ${n.description}`).join('\n');
            alert(`Notes:\n${noteList}`);
        }
    });

    document.getElementById('viewFinance').addEventListener('click', () => {
        const financeEntries = notes.filter(n => n.type === 'income' || n.type === 'expense');
        if (financeEntries.length === 0) {
            alert('No finance entries available.');
        } else {
            const financeList = financeEntries.map(n => `Date: ${n.date}, Type: ${n.type}, Title: ${n.title}, Amount: ${n.title}, Category: ${n.category || 'N/A'}`).join('\n');
            alert(`Finance Entries:\n${financeList}`);
        }
    });

    // Entry Type Change Handler
    entryType.addEventListener('change', () => {
        const type = entryType.value;
        if (type === 'note') {
            entryCategory.style.display = 'none';
            categoryManager.style.display = 'none';
            budgetSection.style.display = 'none';
        } else {
            entryCategory.style.display = 'block';
            categoryManager.style.display = 'block';
            budgetSection.style.display = 'block';
            // Populate custom categories
            entryCategory.innerHTML = `<option value="" data-en="Select Category" data-ne="श्रेणी चयन गर्नुहोस्">${isNepali ? 'श्रेणी चयन गर्नुहोस्' : 'Select Category'}</option>`;
            const defaultCategories = ['Food', 'Salary', 'Rent', 'Utilities', 'Transport', 'Entertainment', 'Freelance', 'Other'];
            defaultCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = isNepali ? entryCategory.querySelector(`option[value="${category}"]`)?.getAttribute('data-ne') || category : category;
                entryCategory.appendChild(option);
            });
            customCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                entryCategory.appendChild(option);
            });
        }
    });

    // Add Category
    addCategory.addEventListener('click', () => {
        const category = newCategory.value.trim();
        if (category && !customCategories.includes(category)) {
            customCategories.push(category);
            try {
                localStorage.setItem('customCategories', JSON.stringify(customCategories));
            } catch (e) {
                console.error('Error saving custom categories to localStorage:', e);
                alert('Failed to save custom category. Please check your browser settings.');
            }
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            entryCategory.appendChild(option);
            newCategory.value = '';
        }
    });

    // Save Note
    saveNote.addEventListener('click', () => {
        const entry = {
            type: entryType.value,
            title: noteTitle.value.trim(),
            time: noteTime.value,
            description: noteDescription.value.trim(),
            category: entryCategory.value || '',
            date: selectedDate.textContent,
            recurring: recurring.checked,
            reminder: reminder.checked,
            year: currentYear,
            month: currentMonthIndex
        };

        if (!entry.title) {
            alert('Please enter a title or amount.');
            return;
        }

        try {
            if (editingNoteIndex !== null) {
                notes[editingNoteIndex] = entry;
                editingNoteIndex = null;
                editEntry.style.display = 'none';
            } else {
                notes.push(entry);
                undoStack.push({ action: 'add', note: entry });
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            if (entry.type !== 'note') {
                const budget = parseFloat(monthlyBudget.value) || 0;
                budgets[`${currentYear}-${currentMonthIndex}`] = budget;
                localStorage.setItem('budgets', JSON.stringify(budgets));
            }
            noteFormModal.hide();
            // Reset form
            noteTitle.value = '';
            noteTime.value = '';
            noteDescription.value = '';
            entryCategory.value = '';
            recurring.checked = false;
            reminder.checked = false;
            monthlyBudget.value = '';
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            alert('Failed to save entry. Please check your browser settings.');
        }
    });

    // Close Modal
    closeEntry.addEventListener('click', () => {
        noteFormModal.hide();
        // Reset form
        noteTitle.value = '';
        noteTime.value = '';
        noteDescription.value = '';
        entryCategory.value = '';
        recurring.checked = false;
        reminder.checked = false;
        monthlyBudget.value = '';
    });

    // Export Functionality
    document.querySelectorAll('.excel-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const type = e.target.getAttribute('data-type');
            let data = [];
            if (type === 'monthly_calendar') {
                data = calendarData[currentYear].map((month, index) => ({
                    Month: isNepali ? monthsNepali[index] : month.name,
                    Days: month.days,
                    StartDate: month.gregStart
                }));
            } else if (type === 'yearly_holidays') {
                data = holidays[currentYear]?.map(h => ({
                    Month: isNepali ? monthsNepali[h.month] : calendarData[currentYear][h.month].name,
                    Day: h.day,
                    Name: isNepali ? h.nepali : h.name
                })) || [];
            } else if (type === 'note' || type === 'finance') {
                data = notes.filter(n => type === 'note' ? n.type === 'note' : (n.type === 'income' || n.type === 'expense')).map(n => ({
                    Date: n.date,
                    Type: n.type,
                    Title: n.title,
                    Description: n.description,
                    Category: n.category || ''
                }));
            }
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, type);
            XLSX.writeFile(wb, `${type}.xlsx`);
        });
    });

    document.querySelectorAll('.pdf-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const type = e.target.getAttribute('data-type');
            doc.text(`Export: ${type}`, 10, 10);
            if (type === 'monthly_calendar') {
                calendarData[currentYear].forEach((month, index) => {
                    doc.text(`${isNepali ? monthsNepali[index] : month.name}: ${month.days} days, Starts: ${month.gregStart}`, 10, 20 + index * 10);
                });
            } else if (type === 'yearly_holidays') {
                holidays[currentYear]?.forEach((h, index) => {
                    doc.text(`${isNepali ? monthsNepali[h.month] : calendarData[currentYear][h.month].name} ${h.day}: ${isNepali ? h.nepali : h.name}`, 10, 20 + index * 10);
                });
            }
            doc.save(`${type}.pdf`);
        });
    });

    // Import Functionality
    document.querySelectorAll('.import-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const type = e.target.getAttribute('data-type');
            const fileInput = document.getElementById('restoreFileInput');
            fileInput.setAttribute('data-import-type', type);
            fileInput.click();
        });
    });

    document.getElementById('restoreFileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    const type = e.target.getAttribute('data-import-type');
                    if (type === 'note' || type === 'finance') {
                        notes = notes.concat(data);
                        localStorage.setItem('notes', JSON.stringify(notes));
                    }
                    console.log(`Imported ${type}:`, data);
                } catch (e) {
                    console.error('Error importing data:', e);
                    alert('Failed to import data. Please ensure the file is valid JSON.');
                }
            };
            reader.readAsText(file);
        }
    });

    // Initialize
    initializeCalendar(currentYear);
    renderHolidays(currentYear, currentMonthIndex);
});
