let filteredHistory = [];
let currentReportType = 'weekly';
let budgetChart = null;
let categoryChart = null;

function renderReport() {
    const reportContent = document.getElementById('reportContent');
    if (!reportContent) {
        console.error('Report content element not found');
        return;
    }

    const year = currentYear;
    const month = currentMonthIndex + 1;
    const startDate = new Date(year - 57, 0, 1);
    const endDate = new Date(year - 56, 0, 1);

    let filtered = history.filter(item => {
        const [itemYear] = item.date.split('-').map(Number);
        return itemYear === year;
    });

    if (currentReportType === 'weekly') {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        filtered = history.filter(item => {
            const [itemYear, itemMonth, itemDay] = item.date.split('-').map(Number);
            const itemDate = new Date(itemYear - 57, itemMonth - 1, itemDay);
            return itemDate >= weekStart && itemDate <= weekEnd;
        });
    } else if (currentReportType === 'monthly') {
        filtered = history.filter(item => {
            const [itemYear, itemMonth] = item.date.split('-').map(Number);
            return itemYear === year && itemMonth === month;
        });
    }

    const income = filtered.filter(item => item.type === 'income').reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const expense = filtered.filter(item => item.type === 'expense').reduce((sum, item) => sum + parseFloat(item.amount), 0);

    if (currentReportType === 'records') {
        renderFinancialRecords();
        return;
    }

    reportContent.innerHTML = `
        <h4>${isNepali ? 'आय' : 'Income'}: ${income.toFixed(2)}</h4>
        <h4>${isNepali ? 'खर्च' : 'Expense'}: ${expense.toFixed(2)}</h4>
        <h4>${isNepali ? 'शुद्ध' : 'Net'}: ${(income - expense).toFixed(2)}</h4>
    `;

    if (currentReportType === 'monthly') {
        const monthlyBudget = budgets[`${year}-${String(month).padStart(2, '0')}`] || 0;
        const actualExpense = expense;

        // Budget vs Actual Chart
        const budgetCanvas = document.createElement('canvas');
        budgetCanvas.id = 'budgetChart';
        reportContent.appendChild(budgetCanvas);

        if (budgetChart) budgetChart.destroy();
        budgetChart = new Chart(budgetCanvas, {
            type: 'bar',
            data: {
                labels: [isNepali ? 'बजेट' : 'Budget', isNepali ? 'वास्तविक' : 'Actual'],
                datasets: [{
                    label: isNepali ? 'रकम (NPR)' : 'Amount (NPR)',
                    data: [monthlyBudget, actualExpense],
                    backgroundColor: ['#36A2EB', '#FF6384']
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Category-wise Breakdown
        const categories = {};
        filtered.filter(item => item.type === 'expense').forEach(item => {
            const category = item.category || 'Other';
            categories[category] = (categories[category] || 0) + parseFloat(item.amount);
        });

        const categoryCanvas = document.createElement('canvas');
        categoryCanvas.id = 'categoryChart';
        reportContent.appendChild(categoryCanvas);

        if (categoryChart) categoryChart.destroy();
        categoryChart = new Chart(categoryCanvas, {
            type: 'pie',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    label: isNepali ? 'खर्च (NPR)' : 'Expense (NPR)',
                    data: Object.values(categories),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
                }]
            }
        });
    } else {
        const canvas = document.createElement('canvas');
        canvas.id = 'reportChart';
        reportContent.appendChild(canvas);

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: [isNepali ? 'आय' : 'Income', isNepali ? 'खर्च' : 'Expense'],
                datasets: [{
                    label: isNepali ? 'रकम (NPR)' : 'Amount (NPR)',
                    data: [income, expense],
                    backgroundColor: ['#36A2EB', '#FF6384']
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}

function renderFinancialRecords() {
    const reportContent = document.getElementById('reportContent');
    const financeSearch = document.getElementById('financeSearch')?.value.toLowerCase() || '';
    if (!reportContent) {
        console.error('Report content element not found');
        return;
    }

    filteredHistory = history.filter(item =>
        item.title.toLowerCase().includes(financeSearch) ||
        item.description.toLowerCase().includes(financeSearch)
    );

    reportContent.innerHTML = '';
    if (filteredHistory.length === 0) {
        reportContent.innerHTML = `<p data-en="No records found" data-ne="कुनै रेकर्डहरू फेला परेन">No records found</p>`;
        return;
    }

    filteredHistory.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'record-item card mb-2 p-3';
        itemDiv.innerHTML = `
            <h5>${item.title} (${item.date})</h5>
            <p>${item.description}</p>
            <p><strong>${isNepali ? 'प्रकार' : 'Type'}:</strong> ${item.type}</p>
            <p><strong>${isNepali ? 'रकम' : 'Amount'}:</strong> ${item.amount}</p>
            <p><strong>${isNepali ? 'श्रेणी' : 'Category'}:</strong> ${item.category || 'N/A'}</p>
            <button class="btn btn-sm btn-warning edit-finance" data-index="${index}" data-en="Edit" data-ne="सम्पादन गर्नुहोस्">Edit</button>
            <button class="btn btn-sm btn-danger delete-finance ms-2" data-index="${index}" data-en="Delete" data-ne="मेटाउनुहोस्">Delete</button>
        `;
        reportContent.appendChild(itemDiv);
    });

    document.querySelectorAll('.edit-finance').forEach(button => {
        button.addEventListener('click', (e) => {
            try {
                const idx = parseInt(e.target.dataset.index);
                const item = history[idx];
                document.getElementById('entryType').value = item.type;
                document.getElementById('noteTitle').value = item.title;
                document.getElementById('noteDescription').value = item.description;
                document.getElementById('noteTime').value = item.time || '';
                document.getElementById('entryCategory').value = item.category || '';
                document.getElementById('recurring').checked = item.recurring;
                document.getElementById('reminder').checked = item.reminder;
                document.getElementById('selectedDate').textContent = item.date;
                document.getElementById('monthlyBudget').value = budgets[item.date.slice(0, 7)] || '';
                const noteFormModal = new bootstrap.Modal(document.getElementById('noteFormModal'));
                noteFormModal.show();
            } catch (error) {
                console.error('Error editing finance record:', error);
            }
        });
    });

    document.querySelectorAll('.delete-finance').forEach(button => {
        button.addEventListener('click', (e) => {
            try {
                const idx = parseInt(e.target.dataset.index);
                if (confirm(isNepali ? 'के तपाईं यो रेकर्ड मेटाउन चाहनुहुन्छ?' : 'Are you sure you want to delete this record?')) {
                    history.splice(idx, 1);
                    localStorage.setItem('history', JSON.stringify(history));
                    renderReport();
                }
            } catch (error) {
                console.error('Error deleting finance record:', error);
            }
        });
    });
}

function saveFinance() {
    try {
        const entryType = document.getElementById('entryType').value;
        const noteTitle = document.getElementById('noteTitle').value;
        const noteDescription = document.getElementById('noteDescription').value;
        const noteTime = document.getElementById('noteTime').value;
        const entryCategory = document.getElementById('entryCategory').value;
        const recurring = document.getElementById('recurring').checked;
        const reminder = document.getElementById('reminder').checked;
        const date = document.getElementById('selectedDate').textContent;
        const monthlyBudget = document.getElementById('monthlyBudget').value;

        if (!noteTitle || !date || !entryType) {
            alert(isNepali ? 'कृपया शीर्षक, मिति र प्रकार भर्नुहोस्' : 'Please fill in the title, date, and type');
            return;
        }

        const financeEntry = {
            type: entryType,
            title: noteTitle,
            description: noteDescription,
            time: noteTime,
            category: entryCategory,
            recurring,
            reminder,
            date,
            amount: noteTitle
        };

        history.push(financeEntry);
        if (monthlyBudget) {
            budgets[date.slice(0, 7)] = parseFloat(monthlyBudget);
            localStorage.setItem('budgets', JSON.stringify(budgets));
        }

        localStorage.setItem('history', JSON.stringify(history));
        if (reminder) {
            scheduleNotification(financeEntry);
        }
        renderReport();
        const noteFormModal = bootstrap.Modal.getInstance(document.getElementById('noteFormModal'));
        noteFormModal.hide();
    } catch (error) {
        console.error('Error saving finance entry:', error);
    }
}

function exportFinanceToExcel() {
    try {
        const ws = XLSX.utils.json_to_sheet(filteredHistory);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Finances');
        XLSX.writeFile(wb, 'finances.xlsx');
    } catch (error) {
        console.error('Error exporting finances to Excel:', error);
    }
}

function exportFinanceToPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(isNepali ? 'वित्तीय रेकर्डहरू' : 'Financial Records', 10, 10);
        let y = 20;
        filteredHistory.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.title} (${item.date}) - ${item.type}: ${item.amount}`, 10, y);
            doc.text(item.description, 10, y + 5);
            y += 15;
            if (y > 280) {
                doc.addPage();
                y = 10;
            }
        });
        doc.save('finances.pdf');
    } catch (error) {
        console.error('Error exporting finances to PDF:', error);
    }
}

function importFinanceData(event) {
    try {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            history = data;
            localStorage.setItem('history', JSON.stringify(history));
            renderReport();
            checkUpcomingReminders();
        };
        reader.readAsText(file);
    } catch (error) {
        console.error('Error importing finance data:', error);
    }
}

document.getElementById('weeklyReportTab')?.addEventListener('click', () => {
    currentReportType = 'weekly';
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
    document.getElementById('weeklyReportTab').classList.add('active');
    renderReport();
});

document.getElementById('monthlyReportTab')?.addEventListener('click', () => {
    currentReportType = 'monthly';
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
    document.getElementById('monthlyReportTab').classList.add('active');
    renderReport();
});

document.getElementById('yearlyReportTab')?.addEventListener('click', () => {
    currentReportType = 'yearly';
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
    document.getElementById('yearlyReportTab').classList.add('active');
    renderReport();
});

document.getElementById('recordsReportTab')?.addEventListener('click', () => {
    currentReportType = 'records';
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));
    document.getElementById('recordsReportTab').classList.add('active');
    renderReport();
});

document.getElementById('financeSearch')?.addEventListener('input', debounce(renderReport, 300));
document.getElementById('saveNote')?.addEventListener('click', saveFinance);
document.querySelectorAll('.excel-option')?.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target.dataset.type === 'finance') exportFinanceToExcel();
    });
});
document.querySelectorAll('.pdf-option')?.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target.dataset.type === 'finance') exportFinanceToPDF();
    });
});
document.querySelectorAll('.import-option')?.forEach(option => {
    if (option.dataset.type === 'finance') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', importFinanceData);
        input.click();
    }
});

if (document.getElementById('reportContent')) {
    renderReport();
}
