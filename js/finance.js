const addFinance = document.getElementById('addFinance');
const viewFinance = document.getElementById('viewFinance');
const reportModal = typeof bootstrap !== 'undefined' ? new bootstrap.Modal(document.getElementById('reportModal')) : null;
const reportContent = document.getElementById('reportContent');
const financeSearch = document.getElementById('financeSearch');
const weeklyReportTab = document.getElementById('weeklyReportTab');
const monthlyReportTab = document.getElementById('monthlyReportTab');
const yearlyReportTab = document.getElementById('yearlyReportTab');
const recordsReportTab = document.getElementById('recordsReportTab');

function renderReport(type, year = currentYear) {
    let html = '';
    let totalIncome = 0, totalExpense = 0;

    if (type === 'weekly') {
        // Group by BS weeks (approximate by dividing the month into 4 weeks)
        let weeks = [];
        const daysInMonth = calendarData[year][currentMonthIndex].days;
        const daysPerWeek = Math.ceil(daysInMonth / 4);
        for (let week = 0; week < 4; week++) {
            let startDay = week * daysPerWeek + 1;
            let endDay = Math.min((week + 1) * daysPerWeek, daysInMonth);
            let weekIncome = 0, weekExpense = 0;

            for (let day = startDay; day <= endDay; day++) {
                let date = `${year}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                notes.forEach(note => {
                    if (note.type === 'income' || note.type === 'expense') {
                        getRecurringDates(note).forEach(noteDate => {
                            if (noteDate === date) {
                                if (note.type === 'income') weekIncome += parseFloat(note.title || 0);
                                else weekExpense += parseFloat(note.title || 0);
                            }
                        });
                    }
                });
            }

            weeks.push({ startDay, endDay, income: weekIncome, expense: weekExpense });
            totalIncome += weekIncome;
            totalExpense += weekExpense;
        }

        html += `<h4>${isNepali ? 'साप्ताहिक सारांश' : 'Weekly Summary'}</h4>`;
        weeks.forEach((week, index) => {
            html += `
                <p><strong>${isNepali ? `हप्ता ${index + 1}` : `Week ${index + 1}`} (${week.startDay} - ${week.endDay} ${isNepali ? monthsNepali[currentMonthIndex] : calendarData[year][currentMonthIndex].name}):</strong></p>
                <p>${isNepali ? 'आय' : 'Income'}: ${week.income} NPR</p>
                <p>${isNepali ? 'खर्च' : 'Expense'}: ${week.expense} NPR</p>
                <p>${isNepali ? 'शुद्ध' : 'Net'}: ${(week.income - week.expense)} NPR</p>
            `;
        });
    } else if (type === 'monthly') {
        let months = calendarData[year].map((month, index) => {
            let monthIncome = 0, monthExpense = 0;
            let datePrefix = `${year}-${String(index + 1).padStart(2, '0')}`;
            notes.forEach(note => {
                if (note.type === 'income' || note.type === 'expense') {
                    getRecurringDates(note).forEach(date => {
                        if (date.startsWith(datePrefix)) {
                            if (note.type === 'income') monthIncome += parseFloat(note.title || 0);
                            else monthExpense += parseFloat(note.title || 0);
                        }
                    });
                }
            });
            return { name: isNepali ? monthsNepali[index] : month.name, income: monthIncome, expense: monthExpense };
        });

        totalIncome = months.reduce((sum, month) => sum + month.income, 0);
        totalExpense = months.reduce((sum, month) => sum + month.expense, 0);

        html += `<h4>${isNepali ? 'मासिक सारांश' : 'Monthly Summary'}</h4>`;
        months.forEach(month => {
            html += `
                <p><strong>${month.name} ${year}:</strong></p>
                <p>${isNepali ? 'आय' : 'Income'}: ${month.income} NPR</p>
                <p>${isNepali ? 'खर्च' : 'Expense'}: ${month.expense} NPR</p>
                <p>${isNepali ? 'शुद्ध' : 'Net'}: ${(month.income - month.expense)} NPR</p>
            `;
        });
    } else if (type === 'yearly') {
        let yearlyIncome = 0, yearlyExpense = 0;
        calendarData[year].forEach((month, index) => {
            let datePrefix = `${year}-${String(index + 1).padStart(2, '0')}`;
            notes.forEach(note => {
                if (note.type === 'income' || note.type === 'expense') {
                    getRecurringDates(note).forEach(date => {
                        if (date.startsWith(datePrefix)) {
                            if (note.type === 'income') yearlyIncome += parseFloat(note.title || 0);
                            else yearlyExpense += parseFloat(note.title || 0);
                        }
                    });
                }
            });
        });

        totalIncome = yearlyIncome;
        totalExpense = yearlyExpense;

        html += `<h4>${isNepali ? 'वार्षिक सारांश' : 'Yearly Summary'}</h4>`;
        html += `
            <p><strong>${year}:</strong></p>
            <p>${isNepali ? 'आय' : 'Income'}: ${yearlyIncome} NPR</p>
            <p>${isNepali ? 'खर्च' : 'Expense'}: ${yearlyExpense} NPR</p>
            <p>${isNepali ? 'शुद्ध' : 'Net'}: ${(yearlyIncome - yearlyExpense)} NPR</p>
        `;
    }

    html += `
        <h4>${isNepali ? 'कुल सारांश' : 'Total Summary'}</h4>
        <p>${isNepali ? 'कुल आय' : 'Total Income'}: ${totalIncome} NPR</p>
        <p>${isNepali ? 'कुल खर्च' : 'Total Expense'}: ${totalExpense} NPR</p>
        <p>${isNepali ? 'कुल शुद्ध' : 'Total Net'}: ${(totalIncome - totalExpense)} NPR</p>
    `;

    if (type !== 'weekly') {
        let ctx = document.createElement('canvas');
        reportContent.innerHTML = html;
        reportContent.appendChild(ctx);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: type === 'monthly' ? calendarData[year].map((m, i) => isNepali ? monthsNepali[i] : m.name) : [year],
                datasets: [
                    {
                        label: isNepali ? 'आय' : 'Income',
                        data: type === 'monthly' ? calendarData[year].map((_, i) => {
                            let datePrefix = `${year}-${String(i + 1).padStart(2, '0')}`;
                            return notes.reduce((sum, note) => sum + (note.type === 'income' && getRecurringDates(note).some(d => d.startsWith(datePrefix)) ? parseFloat(note.title || 0) : 0), 0);
                        }) : [yearlyIncome],
                        backgroundColor: '#4caf50'
                    },
                    {
                        label: isNepali ? 'खर्च' : 'Expense',
                        data: type === 'monthly' ? calendarData[year].map((_, i) => {
                            let datePrefix = `${year}-${String(i + 1).padStart(2, '0')}`;
                            return notes.reduce((sum, note) => sum + (note.type === 'expense' && getRecurringDates(note).some(d => d.startsWith(datePrefix)) ? parseFloat(note.title || 0) : 0), 0);
                        }) : [yearlyExpense],
                        backgroundColor: '#f44336'
                    }
                ]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } else {
        reportContent.innerHTML = html;
    }
}

function renderFinancialRecords() {
    let filteredNotes = notes.filter(note => note.type === 'income' || note.type === 'expense');
    if (financeSearch.value) {
        filteredNotes = filteredNotes.filter(note =>
            note.title.toLowerCase().includes(financeSearch.value.toLowerCase()) ||
            note.description.toLowerCase().includes(financeSearch.value.toLowerCase())
        );
    }

    let groupedByMonth = {};
    filteredNotes.forEach(note => {
        getRecurringDates(note).forEach(date => {
            let [year, month, day] = date.split('-').map(Number);
            let monthKey = `${year}-${month}`;
            if (!groupedByMonth[monthKey]) {
                groupedByMonth[monthKey] = [];
            }
            groupedByMonth[monthKey].push({ date, note, day });
        });
    });

    let html = `
        <select id="financeMonthFilter" class="form-select mb-3" aria-label="Filter by Month">
            <option value="all">${isNepali ? 'सबै महिनाहरू' : 'All Months'}</option>
    `;
    for (let y = 2081; y <= 2083; y++) {
        calendarData[y].forEach((month, index) => {
            html += `<option value="${y}-${index + 1}">${isNepali ? monthsNepali[index] : month.name} ${y}</option>`;
        });
    }
    html += '</select>';

    html += '<ul class="list-unstyled">';
    for (let monthKey in groupedByMonth) {
        let [year, month] = monthKey.split('-').map(Number);
        month--; // Adjust for 0-based index
        if (financeSearch.dataset.month && financeSearch.dataset.month !== 'all' && financeSearch.dataset.month !== monthKey) {
            continue;
        }
        html += `<li><strong>${isNepali ? monthsNepali[month] : calendarData[year][month].name} ${year}</strong></li>`;
        groupedByMonth[monthKey].forEach(({ date, note, day }) => {
            let bsDate = `${year} ${isNepali ? monthsNepali[month] : calendarData[year][month].name} ${isNepali ? day.toString().replace(/[0-9]/g, d => String.fromCharCode(0x0966 + parseInt(d))) : day}`;
            let gregDate = getGregorianDate(year, month, day);
            html += `
                <li style="margin-left: 20px;">
                    <strong>${bsDate} (${gregDate.toLocaleDateString('en-US')}):</strong>
                    ${note.type} - ${note.title} NPR
                    (${note.description || ''})
                    ${note.category ? `(${note.category})` : ''}
                </li>
            `;
        });
    }
    html += '</ul>';

    reportContent.innerHTML = html;
    document.getElementById('financeMonthFilter').addEventListener('change', function () {
        financeSearch.dataset.month = this.value;
        renderFinancialRecords();
    });
}

function exportFinancesToExcel() {
    let headers = isNepali
        ? ['मिति', 'प्रकार', 'रकम', 'विवरण', 'श्रेणी']
        : ['Date', 'Type', 'Amount', 'Description', 'Category'];
    let data = [];
    notes.filter(note => note.type === 'income' || note.type === 'expense').forEach(note => {
        getRecurringDates(note).forEach(date => {
            let [year, month, day] = date.split('-').map(Number);
            month--;
            let bsDate = `${year} ${isNepali ? monthsNepali[month] : calendarData[year][month].name} ${day}`;
            let gregDate = getGregorianDate(year, month, day);
            data.push([
                bsDate + ` (${gregDate.toLocaleDateString('en-US')})`,
                note.type,
                note.title,
                note.description || '',
                note.category || ''
            ]);
        });
    });

    let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isNepali ? 'वित्त' : 'Finances');
    XLSX.writeFile(wb, `Finances_${currentYear}.xlsx`);
}

function exportFinancesToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let headers = isNepali
        ? ['मिति', 'प्रकार', 'रकम', 'विवरण', 'श्रेणी']
        : ['Date', 'Type', 'Amount', 'Description', 'Category'];
    let data = [];
    notes.filter(note => note.type === 'income' || note.type === 'expense').forEach(note => {
        getRecurringDates(note).forEach(date => {
            let [year, month, day] = date.split('-').map(Number);
            month--;
            let bsDate = `${year} ${isNepali ? monthsNepali[month] : calendarData[year][month].name} ${day}`;
            let gregDate = getGregorianDate(year, month, day);
            data.push([
                bsDate + ` (${gregDate.toLocaleDateString('en-US')})`,
                note.type,
                note.title,
                note.description || '',
                note.category || ''
            ]);
        });
    });

    doc.text(isNepali ? `वित्तीय रेकर्डहरू ${currentYear}` : `Financial Records ${currentYear}`, 14, 20);
    doc.autoTable({
        startY: 30,
        head: [headers],
        body: data,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [2, 136, 209] },
        alternateRowStyles: { fillColor: [240, 240, 240] }
    });
    doc.save(`Finances_${currentYear}.pdf`);
}

function importFinanceData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function (e) {
        let file = e.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function (e) {
            try {
                let importedNotes = JSON.parse(e.target.result);
                importedNotes = importedNotes.filter(note => note.type === 'income' || note.type === 'expense');
                notes = notes.filter(note => note.type !== 'income' && note.type !== 'expense');
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

if (addFinance) {
    addFinance.addEventListener('click', () => {
        document.getElementById('entryType').value = 'income';
        document.getElementById('noteTitle').placeholder = isNepali ? 'रकम' : 'Amount';
        document.getElementById('entryCategory').style.display = 'block';
        document.getElementById('categoryManager').style.display = 'block';
        document.getElementById('budgetSection').style.display = 'block';
        noteFormModal.show();
    });
}

if (viewFinance) {
    viewFinance.addEventListener('click', () => {
        reportModal.show();
        weeklyReportTab.click();
    });
}

if (financeSearch) {
    financeSearch.addEventListener('input', debounce(() => {
        renderFinancialRecords();
    }, 300));
}

if (weeklyReportTab) {
    weeklyReportTab.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
        weeklyReportTab.classList.add('active');
        renderReport('weekly');
    });
}

if (monthlyReportTab) {
    monthlyReportTab.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
        monthlyReportTab.classList.add('active');
        renderReport('monthly');
    });
}

if (yearlyReportTab) {
    yearlyReportTab.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
        yearlyReportTab.classList.add('active');
        renderReport('yearly');
    });
}

if (recordsReportTab) {
    recordsReportTab.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
        recordsReportTab.classList.add('active');
        renderFinancialRecords();
    });
}

if (typeof document !== 'undefined') {
    document.querySelectorAll('.excel-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'finance') exportFinancesToExcel();
        });
    });

    document.querySelectorAll('.pdf-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'finance') exportFinancesToPDF();
        });
    });

    document.querySelectorAll('.import-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'finance') importFinanceData();
        });
    });
}