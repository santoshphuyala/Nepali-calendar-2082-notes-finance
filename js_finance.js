// DOM elements
const viewFinance = document.getElementById('viewFinance');
const addFinance = document.getElementById('addFinance');
const reportModal = new bootstrap.Modal(document.getElementById('reportModal'));
const closeReportModal = document.getElementById('closeReportModal');
const financeSearch = document.getElementById('financeSearch');
const reportContent = document.getElementById('reportContent');
const weeklyReportTab = document.getElementById('weeklyReportTab');
const monthlyReportTab = document.getElementById('monthlyReportTab');
const yearlyReportTab = document.getElementById('yearlyReportTab');
const recordsReportTab = document.getElementById('recordsReportTab');

// Populate categories for financial entries
function populateCategories() {
    entryCategory.innerHTML = `<option value="" data-en="Select Category" data-ne="श्रेणी चयन गर्नुहोस्">${isNepali ? 'श्रेणी चयन गर्नुहोस्' : 'Select Category'}</option>`;
    const defaultCategories = [
        { en: 'Food', ne: 'खाना' },
        { en: 'Salary', ne: 'तलब' },
        { en: 'Rent', ne: 'भाडा' },
        { en: 'Utilities', ne: 'उपयोगिताहरू' },
        { en: 'Transport', ne: 'यातायात' },
        { en: 'Entertainment', ne: 'मनोरञ्जन' },
        { en: 'Freelance', ne: 'फ्रीलान्स' },
        { en: 'Other', ne: 'अन्य' }
    ];
    defaultCategories.forEach(cat => {
        let option = document.createElement('option');
        option.value = cat.en;
        option.textContent = isNepali ? cat.ne : cat.en;
        entryCategory.appendChild(option);
    });
    customCategories.forEach(cat => {
        let option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        entryCategory.appendChild(option);
    });
}

// Render financial records in the records tab
function renderFinancialRecords() {
    reportContent.innerHTML = '';
    const fragment = document.createDocumentFragment();
    let searchQuery = financeSearch.value.toLowerCase();
    let filteredNotes = notes.filter(note => (note.type === 'income' || note.type === 'expense') && (
        note.title.toLowerCase().includes(searchQuery) ||
        note.description.toLowerCase().includes(searchQuery) ||
        note.category.toLowerCase().includes(searchQuery)
    ));
    if (filteredNotes.length === 0) {
        let p = document.createElement('p');
        p.textContent = isNepali ? 'कुनै वित्तीय रेकर्डहरू छैनन्' : 'No financial records available';
        fragment.appendChild(p);
    } else {
        let financeList = document.createElement('div');
        filteredNotes.forEach((note, index) => {
            let globalIndex = notes.findIndex(n => n === note);
            let financeItem = document.createElement('div');
            financeItem.className = 'border-bottom py-2';
            financeItem.innerHTML = `
                <div><strong>${note.date}</strong> - ${note.type === 'income' ? (isNepali ? 'आय' : 'Income') : (isNepali ? 'खर्च' : 'Expense')}: ${note.title} NPR</div>
                <div>${note.description || ''}</div>
                <div>${note.category ? (isNepali ? `श्रेणी: ${note.category}` : `Category: ${note.category}`) : ''}</div>
                <div>${note.recurring ? (isNepali ? 'मासिक दोहोरिने' : 'Recurring Monthly') : ''}</div>
                <div>${note.reminder ? (isNepali ? 'रिमाइन्डर सेट' : 'Reminder Set') : ''}</div>
                <div class="d-flex gap-2">
                    <a href="#" class="edit-note text-primary" data-en="Edit" data-ne="सम्पादन">${isNepali ? 'सम्पादन' : 'Edit'}</a>
                    <a href="#" class="delete-note text-danger" data-en="Delete" data-ne="मेटाउन">${isNepali ? 'मेटाउन' : 'Delete'}</a>
                </div>
            `;
            financeItem.querySelector('.edit-note').addEventListener('click', () => editNote(globalIndex));
            financeItem.querySelector('.delete-note').addEventListener('click', () => deleteNote(globalIndex));
            financeList.appendChild(financeItem);
        });
        fragment.appendChild(financeList);

        let canvas = document.createElement('canvas');
        canvas.id = 'financeChart';
        canvas.className = 'my-3';
        canvas.setAttribute('aria-label', isNepali ? 'वित्तीय रेकर्ड चार्ट' : 'Financial Records Chart');
        fragment.appendChild(canvas);
        reportContent.appendChild(fragment);

        let dates = [...new Set(filteredNotes.map(n => n.date))].sort();
        let incomeData = dates.map(date => {
            return filteredNotes.filter(n => n.date === date && n.type === 'income')
                .reduce((sum, n) => sum + parseFloat(n.title || 0), 0);
        });
        let expenseData = dates.map(date => {
            return filteredNotes.filter(n => n.date === date && n.type === 'expense')
                .reduce((sum, n) => sum + parseFloat(n.title || 0), 0);
        });
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: isNepali ? 'आय' : 'Income',
                        data: incomeData,
                        borderColor: '#4caf50',
                        fill: false
                    },
                    {
                        label: isNepali ? 'खर्च' : 'Expense',
                        data: expenseData,
                        borderColor: '#d32f2f',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: isNepali ? 'वित्तीय रेकर्ड अवलोकन' : 'Financial Records Overview' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}

// Render financial reports (weekly, monthly, yearly)
function renderReport(type) {
    reportContent.innerHTML = '';
    let year = parseInt(yearFilter.value);
    let lang = isNepali ? 'ne' : 'en';
    let headers = {
        en: {
            period: 'Period', income: 'Income (NPR)', expense: 'Expense (NPR)', balance: 'Balance (NPR)', day: 'Day',
            dailySummary: 'Daily Summary', noData: 'No financial data available for this period', budget: 'Budget (NPR)', variance: 'Variance (NPR)'
        },
        ne: {
            period: 'अवधि', income: 'आय (NPR)', expense: 'खर्च (NPR)', balance: 'ब्यालेन्स (NPR)', day: 'दिन',
            dailySummary: 'दैनिक सारांश', noData: 'यो अवधिको लागि कुनै वित्तीय डेटा उपलब्ध छैन', budget: 'बजेट (NPR)', variance: 'भिन्नता (NPR)'
        }
    };

    let fragment = document.createDocumentFragment();
    let table = document.createElement('table');
    table.className = 'table report-table table-striped';
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    if (type === 'weekly') {
        let weeks = [];
        let month = calendarData[year][0];
        let startDate = new Date(month.gregStart);
        let endDate = new Date(calendarData[year][11].gregStart);
        endDate.setDate(endDate.getDate() + calendarData[year][11].days - 1);
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            let weekStart = new Date(currentDate);
            let weekEnd = new Date(currentDate);
            weekEnd.setDate(weekEnd.getDate() + 6);
            if (weekEnd > endDate) weekEnd = endDate;

            let bsStart = getBSDateFromGregorian(weekStart);
            let bsEnd = getBSDateFromGregorian(weekEnd);
            if (!bsStart || !bsEnd) {
                currentDate.setDate(currentDate.getDate() + 7);
                continue;
            }

            let income = 0, expense = 0;
            notes.forEach(note => {
                if (note.type === 'income' || note.type === 'expense') {
                    getRecurringDates(note).forEach(date => {
                        let [noteYear, noteMonth, noteDay] = date.split('-').map(Number);
                        noteMonth--;
                        if (noteYear === year) {
                            let noteGregDate = getGregorianDate(noteYear, noteMonth, noteDay);
                            if (noteGregDate >= weekStart && noteGregDate <= weekEnd) {
                                if (note.type === 'income') income += parseFloat(note.title || 0);
                                else expense += parseFloat(note.title || 0);
                            }
                        }
                    });
                }
            });

            weeks.push({
                period: `${bsStart.day}/${bsStart.month + 1}/${bsStart.year} - ${bsEnd.day}/${bsEnd.month + 1}/${bsEnd.year}`,
                income,
                expense,
                balance: income - expense
            });

            currentDate.setDate(currentDate.getDate() + 7);
        }

        thead.innerHTML = `
            <tr>
                <th>${headers[lang].period}</th>
                <th>${headers[lang].income}</th>
                <th>${headers[lang].expense}</th>
                <th>${headers[lang].balance}</th>
            </tr>
        `;
        if (weeks.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">${headers[lang].noData}</td></tr>`;
        } else {
            weeks.forEach(week => {
                tbody.innerHTML += `
                    <tr>
                        <td>${week.period}</td>
                        <td>${week.income}</td>
                        <td>${week.expense}</td>
                        <td>${week.balance}</td>
                    </tr>
                `;
            });
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        fragment.appendChild(table);

        let canvas = document.createElement('canvas');
        canvas.id = 'weeklyChart';
        canvas.className = 'my-3';
        canvas.setAttribute('aria-label', isNepali ? 'साप्ताहिक वित्तीय चार्ट' : 'Weekly Financial Chart');
        fragment.appendChild(canvas);
        reportContent.appendChild(fragment);

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: weeks.map(w => w.period),
                datasets: [
                    {
                        label: isNepali ? 'आय' : 'Income',
                        data: weeks.map(w => w.income),
                        borderColor: '#4caf50',
                        fill: false
                    },
                    {
                        label: isNepali ? 'खर्च' : 'Expense',
                        data: weeks.map(w => w.expense),
                        borderColor: '#d32f2f',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: isNepali ? 'साप्ताहिक वित्तीय अवलोकन' : 'Weekly Financial Overview' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else if (type === 'monthly') {
        let months = calendarData[year].map((month, index) => {
            let dateStr = `${year}-${String(index + 1).padStart(2, '0')}`;
            let income = 0, expense = 0;
            notes.forEach(note => {
                if (note.type === 'income' || note.type === 'expense') {
                    getRecurringDates(note).forEach(date => {
                        if (date.startsWith(dateStr)) {
                            if (note.type === 'income') income += parseFloat(note.title || 0);
                            else expense += parseFloat(note.title || 0);
                        }
                    });
                }
            });
            let budget = budgets[dateStr] || 0;
            let variance = budget ? budget - expense : 0;
            return {
                period: isNepali ? monthsNepali[index] : month.name,
                income,
                expense,
                budget,
                variance
            };
        });

        thead.innerHTML = `
            <tr>
                <th>${headers[lang].period}</th>
                <th>${headers[lang].income}</th>
                <th>${headers[lang].expense}</th>
                <th>${headers[lang].budget}</th>
                <th>${headers[lang].variance}</th>
            </tr>
        `;
        if (months.every(m => m.income === 0 && m.expense === 0)) {
            tbody.innerHTML = `<tr><td colspan="5">${headers[lang].noData}</td></tr>`;
        } else {
            months.forEach(month => {
                tbody.innerHTML += `
                    <tr>
                        <td>${month.period}</td>
                        <td>${month.income}</td>
                        <td>${month.expense}</td>
                        <td>${month.budget}</td>
                        <td>${month.variance}</td>
                    </tr>
                `;
            });
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        fragment.appendChild(table);

        let canvas = document.createElement('canvas');
        canvas.id = 'monthlyChart';
        canvas.className = 'my-3';
        canvas.setAttribute('aria-label', isNepali ? 'मासिक वित्तीय चार्ट' : 'Monthly Financial Chart');
        fragment.appendChild(canvas);
        reportContent.appendChild(fragment);

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: months.map(m => m.period),
                datasets: [
                    {
                        label: isNepali ? 'आय' : 'Income',
                        data: months.map(m => m.income),
                        backgroundColor: '#4caf50'
                    },
                    {
                        label: isNepali ? 'खर्च' : 'Expense',
                        data: months.map(m => m.expense),
                        backgroundColor: '#d32f2f'
                    },
                    {
                        label: isNepali ? 'बजेट' : 'Budget',
                        data: months.map(m => m.budget),
                        backgroundColor: '#0288d1'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: isNepali ? 'मासिक वित्तीय अवलोकन' : 'Monthly Financial Overview' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else if (type === 'yearly') {
        let income = 0, expense = 0, budget = 0;
        notes.forEach(note => {
            if (note.type === 'income' || note.type === 'expense') {
                getRecurringDates(note).forEach(date => {
                    let [noteYear] = date.split('-').map(Number);
                    if (noteYear === year) {
                        if (note.type === 'income') income += parseFloat(note.title || 0);
                        else expense += parseFloat(note.title || 0);
                    }
                });
            }
        });
        for (let i = 0; i < 12; i++) {
            let dateStr = `${year}-${String(i + 1).padStart(2, '0')}`;
            budget += budgets[dateStr] || 0;
        }
        let variance = budget ? budget - expense : 0;

        thead.innerHTML = `
            <tr>
                <th>${headers[lang].income}</th>
                <th>${headers[lang].expense}</th>
                <th>${headers[lang].budget}</th>
                <th>${headers[lang].variance}</th>
            </tr>
        `;
        tbody.innerHTML = `
            <tr>
                <td>${income}</td>
                <td>${expense}</td>
                <td>${budget}</td>
                <td>${variance}</td>
            </tr>
        `;
        table.appendChild(thead);
        table.appendChild(tbody);
        fragment.appendChild(table);

        let canvas = document.createElement('canvas');
        canvas.id = 'yearlyChart';
        canvas.className = 'my-3';
        canvas.setAttribute('aria-label', isNepali ? 'वार्षिक वित्तीय चार्ट' : 'Yearly Financial Chart');
        fragment.appendChild(canvas);
        reportContent.appendChild(fragment);

        new Chart(canvas, {
            type: 'pie',
            data: {
                labels: [isNepali ? 'आय' : 'Income', isNepali ? 'खर्च' : 'Expense', isNepali ? 'बजेट' : 'Budget'],
                datasets: [{
                    data: [income, expense, budget],
                    backgroundColor: ['#4caf50', '#d32f2f', '#0288d1']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: isNepali ? 'वार्षिक वित्तीय अवलोकन' : 'Yearly Financial Overview' }
                }
            }
        });
    } else if (type === 'records') {
        renderFinancialRecords();
        return;
    }
}

// Export financial data to Excel
function exportFinanceToExcel() {
    let headers = isNepali 
        ? ['मिति', 'प्रकार', 'रकम (NPR)', 'विवरण', 'श्रेणी', 'दोहोरिने', 'रिमाइन्डर']
        : ['Date', 'Type', 'Amount (NPR)', 'Description', 'Category', 'Recurring', 'Reminder'];
    let data = notes.filter(note => note.type === 'income' || note.type === 'expense').map(note => [
        note.date,
        isNepali ? (note.type === 'income' ? 'आय' : 'खर्च') : note.type,
        note.title,
        note.description || '',
        note.category || '',
        note.recurring ? (isNepali ? 'हो' : 'Yes') : (isNepali ? 'होइन' : 'No'),
        note.reminder ? (isNepali ? 'हो' : 'Yes') : (isNepali ? 'होइन' : 'No')
    ]);
    let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isNepali ? 'वित्त' : 'Finances');
    XLSX.writeFile(wb, `Finances_${currentYear}.xlsx`);
}

// Export financial data to PDF
function exportFinanceToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let title = isNepali ? `वित्त ${currentYear}` : `Finances ${currentYear}`;
    let headers = isNepali 
        ? ['मिति', 'प्रकार', 'रकम (NPR)', 'विवरण', 'श्रेणी']
        : ['Date', 'Type', 'Amount (NPR)', 'Description', 'Category'];
    let data = notes.filter(note => note.type === 'income' || note.type === 'expense').map(note => [
        note.date,
        isNepali ? (note.type === 'income' ? 'आय' : 'खर्च') : note.type,
        note.title,
        note.description || '',
        note.category || ''
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

// Import financial data from JSON
function importFinanceData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        let file = e.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function(e) {
            try {
                let importedNotes = JSON.parse(e.target.result);
                importedNotes = importedNotes.filter(note => note.type === 'income' || note.type === 'expense');
                notes.push(...importedNotes);
                localStorage.setItem('notes', JSON.stringify(notes));
                renderCalendar();
                renderFinancialRecords();
                renderMonthlySummary();
                alert(isNepali ? 'वित्त डेटा सफलतापूर्वक आयात गरियो' : 'Finance data imported successfully');
            } catch (err) {
                alert(isNepali ? 'आयात असफल: अमान्य फाइल ढाँचा' : 'Import failed: Invalid file format');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Event listeners
viewFinance.addEventListener('click', () => {
    reportModal.show();
    weeklyReportTab.click();
});

addFinance.addEventListener('click', () => {
    selectedDate.textContent = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-01`;
    entryType.value = 'income';
    noteTitle.value = '';
    noteTime.value = '';
    noteDescription.value = '';
    entryCategory.value = '';
    recurring.checked = false;
    reminder.checked = false;
    entryCategory.style.display = 'block';
    categoryManager.style.display = 'block';
    budgetSection.style.display = entryType.value === 'expense' ? 'block' : 'none';
    saveNote.style.display = 'block';
    editEntry.style.display = 'none';
    populateCategories();
    noteFormModal.show();
    noteTitle.focus();
});

weeklyReportTab.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
    weeklyReportTab.classList.add('active');
    renderReport('weekly');
});

monthlyReportTab.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
    monthlyReportTab.classList.add('active');
    renderReport('monthly');
});

yearlyReportTab.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
    yearlyReportTab.classList.add('active');
    renderReport('yearly');
});

recordsReportTab.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
    recordsReportTab.classList.add('active');
    renderReport('records');
});

financeSearch.addEventListener('input', debounce(() => renderReport('records'), 300));

closeReportModal.addEventListener('click', () => reportModal.hide());