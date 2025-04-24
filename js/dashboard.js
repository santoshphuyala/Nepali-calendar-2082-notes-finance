if (typeof localStorage === "undefined") {
    console.error("localStorage is not available. This script is intended to run in a browser environment.");
} else {
    let notesChart, financialTrendsChart;

    function initializeDashboard() {
        updateFinancialSummary();
        renderNotesChart();
        renderUpcomingHolidays();
        renderUpcomingReminders();
        renderFinancialTrendsChart();
        updateLanguage();
    }

    function updateFinancialSummary() {
        const finances = JSON.parse(localStorage.getItem("finances")) || [];
        let totalIncome = 0, totalExpenses = 0;
        finances.forEach(finance => {
            if (finance.type === "income") totalIncome += parseFloat(finance.amount);
            else if (finance.type === "expense") totalExpenses += parseFloat(finance.amount);
        });
        document.getElementById("totalIncome").textContent = `${totalIncome.toFixed(2)} NPR`;
        document.getElementById("totalExpenses").textContent = `${totalExpenses.toFixed(2)} NPR`;
        document.getElementById("netBalance").textContent = `${(totalIncome - totalExpenses).toFixed(2)} NPR`;
    }

    function renderNotesChart() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const months = ["Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Asoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
        const notesCount = Array(12).fill(0);
        notes.forEach(note => {
            const month = new Date(note.date).getMonth();
            notesCount[month]++;
        });

        const ctx = document.getElementById("notesChart").getContext("2d");
        if (notesChart) notesChart.destroy();
        notesChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: months,
                datasets: [{
                    label: "Notes per Month",
                    data: notesCount,
                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: "Number of Notes" } },
                    x: { title: { display: true, text: "Month" } }
                }
            }
        });
    }

    function renderUpcomingHolidays() {
        const today = new Date();
        const upcomingHolidays = Object.entries(holidays2082)
            .filter(([date]) => new Date(date) >= today)
            .sort((a, b) => new Date(a[0]) - new Date(b[0]))
            .slice(0, 5);
        const holidayList = document.getElementById("upcomingHolidays");
        holidayList.innerHTML = upcomingHolidays.length
            ? upcomingHolidays.map(([date, holiday]) => `<li>${date}: ${holiday}</li>`).join("")
            : "<li>No upcoming holidays.</li>";
    }

    function renderUpcomingReminders() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const today = new Date();
        const upcomingReminders = notes
            .filter(note => note.reminder && new Date(note.date + "T" + note.time) >= today)
            .sort((a, b) => new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time))
            .slice(0, 5);
        const reminderList = document.getElementById("upcomingReminders");
        reminderList.innerHTML = upcomingReminders.length
            ? upcomingReminders.map(note => `<li>${note.date} ${note.time}: ${note.title}</li>`).join("")
            : "<li>No upcoming reminders.</li>";
    }

    function renderFinancialTrendsChart() {
        const finances = JSON.parse(localStorage.getItem("finances")) || [];
        const months = ["Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Asoj", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
        const incomeData = Array(12).fill(0);
        const expenseData = Array(12).fill(0);

        finances.forEach(finance => {
            const month = new Date(finance.date).getMonth();
            if (finance.type === "income") incomeData[month] += parseFloat(finance.amount);
            else if (finance.type === "expense") expenseData[month] += parseFloat(finance.amount);
        });

        const ctx = document.getElementById("financialTrendsChart").getContext("2d");
        if (financialTrendsChart) financialTrendsChart.destroy();
        financialTrendsChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: months,
                datasets: [
                    {
                        label: "Income",
                        data: incomeData,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        fill: true
                    },
                    {
                        label: "Expenses",
                        data: expenseData,
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        fill: true
                    }
                ]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: "Amount (NPR)" } },
                    x: { title: { display: true, text: "Month" } }
                }
            }
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        initializeDashboard();
        document.getElementById("languageToggle").addEventListener("click", () => {
            toggleLanguage();
            updateLanguage();
            renderNotesChart();
            renderFinancialTrendsChart();
        });
        document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
    });
}