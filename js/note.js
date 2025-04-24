const addNote = document.getElementById('addNote');
const viewNotes = document.getElementById('viewNotes');
const notesModal = typeof bootstrap !== 'undefined' ? new bootstrap.Modal(document.getElementById('notesModal')) : null;
const notesList = document.getElementById('notesList');
const noteSearch = document.getElementById('noteSearch');
const monthFilter = document.getElementById('monthFilter');
const clearNotesButton = document.getElementById('clearNotes');
const noteFormModal = typeof bootstrap !== 'undefined' ? new bootstrap.Modal(document.getElementById('noteFormModal')) : null;

function renderNotes() {
    if (!notesList || !monthFilter) {
        console.error('notesList or monthFilter element not found');
        return;
    }
    let filteredNotes = notes.filter(note => note.type === 'note');
    if (noteSearch && noteSearch.value) {
        filteredNotes = filteredNotes.filter(note =>
            note.title.toLowerCase().includes(noteSearch.value.toLowerCase()) ||
            note.description.toLowerCase().includes(noteSearch.value.toLowerCase())
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

    let html = '';
    for (let monthKey in groupedByMonth) {
        let [year, month] = monthKey.split('-').map(Number);
        month--;
        if (monthFilter.value !== 'all' && monthFilter.value !== `${year}-${month + 1}`) continue;

        html += `<li><strong>${isNepali ? monthsNepali[month] : calendarData[year][month].name} ${year}</strong></li>`;
        groupedByMonth[monthKey].sort((a, b) => a.day - b.day).forEach(entry => {
            let note = entry.note;
            html += `
                <li class="mb-2">
                    <strong>${entry.date}</strong>: ${note.title}
                    <br>${note.description ? note.description : ''}
                    ${note.time ? `<br>${isNepali ? 'समय' : 'Time'}: ${note.time}` : ''}
                    <br>
                    <button class="btn btn-sm btn-warning edit-note" data-date="${entry.date}" data-title="${note.title}">${isNepali ? 'सम्पादन' : 'Edit'}</button>
                    <button class="btn btn-sm btn-danger delete-note" data-date="${entry.date}" data-title="${note.title}">${isNepali ? 'मेटाउनुहोस्' : 'Delete'}</button>
                </li>
            `;
        });
    }
    notesList.innerHTML = html;

    document.querySelectorAll('.edit-note').forEach(button => {
        button.addEventListener('click', () => {
            let date = button.dataset.date;
            let title = button.dataset.title;
            let note = notes.find(n => n.date === date && n.title === title);
            if (note) {
                document.getElementById('selectedDate').textContent = date;
                document.getElementById('entryType').value = 'note';
                document.getElementById('noteTitle').value = note.title;
                document.getElementById('noteDescription').value = note.description || '';
                document.getElementById('noteTime').value = note.time || '';
                document.getElementById('recurring').checked = note.recurring || false;
                document.getElementById('reminder').checked = note.reminder || false;
                document.getElementById('entryCategory').style.display = 'none';
                document.getElementById('categoryManager').style.display = 'none';
                document.getElementById('budgetSection').style.display = 'none';
                noteFormModal.show();
            }
        });
    });

    document.querySelectorAll('.delete-note').forEach(button => {
        button.addEventListener('click', () => {
            let date = button.dataset.date;
            let title = button.dataset.title;
            let note = notes.find(n => n.date === date && n.title === title);
            if (note) {
                history.push({ type: 'delete', note });
                notes = notes.filter(n => n !== note);
                localStorage.setItem('notes', JSON.stringify(notes));
                localStorage.setItem('history', JSON.stringify(history));
                renderNotes();
                if (typeof renderCalendar === 'function') renderCalendar();
            }
        });
    });
}

if (monthFilter) {
    for (let y = 2081; y <= 2083; y++) {
        calendarData[y].forEach((month, index) => {
            let option = document.createElement('option');
            option.value = `${y}-${index + 1}`;
            option.textContent = `${isNepali ? monthsNepali[index] : month.name} ${y}`;
            monthFilter.appendChild(option);
        });
    }
    monthFilter.addEventListener('change', renderNotes);
}

if (addNote) {
    addNote.addEventListener('click', () => {
        try {
            document.getElementById('entryType').value = 'note';
            document.getElementById('noteTitle').placeholder = isNepali ? 'शीर्षक' : 'Title';
            document.getElementById('entryCategory').style.display = 'none';
            document.getElementById('categoryManager').style.display = 'none';
            document.getElementById('budgetSection').style.display = 'none';
            noteFormModal.show();
        } catch (error) {
            console.error('Error in addNote click handler:', error);
        }
    });
}

if (viewNotes) {
    viewNotes.addEventListener('click', () => {
        try {
            notesModal.show();
            renderNotes();
        } catch (error) {
            console.error('Error in viewNotes click handler:', error);
        }
    });
}

if (noteSearch) {
    noteSearch.addEventListener('input', debounce(renderNotes, 300));
}

if (clearNotesButton) {
    clearNotesButton.addEventListener('click', () => {
        try {
            history.push({ type: 'clear', notes: [...notes] });
            notes = notes.filter(note => note.type !== 'note');
            localStorage.setItem('notes', JSON.stringify(notes));
            localStorage.setItem('history', JSON.stringify(history));
            renderNotes();
            if (typeof renderCalendar === 'function') renderCalendar();
        } catch (error) {
            console.error('Error in clearNotesButton click handler:', error);
        }
    });
}

function exportNotesToExcel() {
    if (typeof XLSX === 'undefined') {
        console.error('XLSX library not loaded');
        return;
    }
    let headers = isNepali
        ? ['मिति', 'शीर्षक', 'विवरण']
        : ['Date', 'Title', 'Description'];
    let data = notes.filter(note => note.type === 'note')
        .flatMap(note => getRecurringDates(note).map(date => [
            date,
            note.title,
            note.description || ''
        ]));
    let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isNepali ? 'नोटहरू' : 'Notes');
    XLSX.writeFile(wb, `Notes_${new Date().toISOString().split('T')[0]}.xlsx`);
}

function exportNotesToPDF() {
    if (typeof window === 'undefined' || !window.jspdf) {
        console.error('jsPDF library not loaded');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let headers = isNepali
        ? ['मिति', 'शीर्षक', 'विवरण']
        : ['Date', 'Title', 'Description'];
    let data = notes.filter(note => note.type === 'note')
        .flatMap(note => getRecurringDates(note).map(date => [
            date,
            note.title,
            note.description || ''
        ]));
    doc.text(isNepali ? 'नोटहरू' : 'Notes', 14, 20);
    doc.autoTable({
        startY: 30,
        head: [headers],
        body: data,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [2, 136, 209] },
        alternateRowStyles: { fillColor: [240, 240, 240] }
    });
    doc.save(`Notes_${new Date().toISOString().split('T')[0]}.pdf`);
}

function importNotesData() {
    if (typeof document === 'undefined') {
        console.error('document not available');
        return;
    }
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
                importedNotes.forEach(note => {
                    if (note.type === 'note') {
                        notes.push(note);
                    }
                });
                localStorage.setItem('notes', JSON.stringify(notes));
                renderNotes();
                if (typeof renderCalendar === 'function') renderCalendar();
                alert(isNepali ? 'नोटहरू सफलतापूर्वक आयात गरियो' : 'Notes imported successfully');
            } catch (err) {
                alert(isNepali ? 'आयात असफल: अमान्य फाइल ढाँचा' : 'Import failed: Invalid file format');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

if (typeof document !== 'undefined') {
    document.querySelectorAll('.excel-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'note') exportNotesToExcel();
        });
    });

    document.querySelectorAll('.pdf-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'note') exportNotesToPDF();
        });
    });

    document.querySelectorAll('.import-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            if (option.dataset.type === 'note') importNotesData();
        });
    });
}

const saveNoteButton = document.getElementById('saveNote');
const editEntryButton = document.getElementById('editEntry');
if (saveNoteButton) {
    saveNoteButton.addEventListener('click', () => {
        try {
            let date = document.getElementById('selectedDate').textContent;
            let type = document.getElementById('entryType').value;
            let title = document.getElementById('noteTitle').value;
            let description = document.getElementById('noteDescription').value;
            let category = document.getElementById('entryCategory').value;
            let time = document.getElementById('noteTime').value;
            let recurring = document.getElementById('recurring').checked;
            let reminder = document.getElementById('reminder').checked;

            if (!title) {
                alert(isNepali ? 'कृपया शीर्षक/रकम प्रविष्ट गर्नुहोस्' : 'Please enter a title/amount');
                return;
            }

            let note = { date, type, title, description, category, time, recurring, reminder };
            history.push({ type: 'add', note });
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            localStorage.setItem('history', JSON.stringify(history));
            noteFormModal.hide();
            if (typeof renderCalendar === 'function') renderCalendar();
            if (typeof renderNotes === 'function') renderNotes();
            if (typeof renderFinancialRecords === 'function') renderFinancialRecords();
            if (typeof renderMonthlySummary === 'function') renderMonthlySummary();
        } catch (error) {
            console.error('Error in saveNoteButton click handler:', error);
        }
    });
}

if (editEntryButton) {
    editEntryButton.addEventListener('click', () => {
        try {
            let date = document.getElementById('selectedDate').textContent;
            let type = document.getElementById('entryType').value;
            let title = document.getElementById('noteTitle').value;
            let description = document.getElementById('noteDescription').value;
            let category = document.getElementById('entryCategory').value;
            let time = document.getElementById('noteTime').value;
            let recurring = document.getElementById('recurring').checked;
            let reminder = document.getElementById('reminder').checked;

            let existingNote = notes.find(note => note.date === date && note.title === document.getElementById('noteTitle').value);
            if (existingNote) {
                history.push({ type: 'edit', note: { ...existingNote }, oldNote: { ...existingNote } });
                existingNote.type = type;
                existingNote.title = title;
                existingNote.description = description;
                existingNote.category = category;
                existingNote.time = time;
                existingNote.recurring = recurring;
                existingNote.reminder = reminder;
                localStorage.setItem('notes', JSON.stringify(notes));
                localStorage.setItem('history', JSON.stringify(history));
                noteFormModal.hide();
                if (typeof renderCalendar === 'function') renderCalendar();
                if (typeof renderNotes === 'function') renderNotes();
                if (typeof renderFinancialRecords === 'function') renderFinancialRecords();
                if (typeof renderMonthlySummary === 'function') renderMonthlySummary();
            }
        } catch (error) {
            console.error('Error in editEntryButton click handler:', error);
        }
    });
}