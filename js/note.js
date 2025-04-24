// DOM elements
const viewNotes = document.getElementById('viewNotes');
const addNote = document.getElementById('addNote');
const notesModal = new bootstrap.Modal(document.getElementById('notesModal'));
const closeModal = document.getElementById('closeModal');
const noteSearch = document.getElementById('noteSearch');
const monthFilter = document.getElementById('monthFilter');
const notesList = document.getElementById('notesList');
const clearNotes = document.getElementById('clearNotes');

// Populate month filter for notes
function populateMonthFilter() {
    monthFilter.innerHTML = `<option value="all" data-en="All Months" data-ne="सबै महिनाहरू">${isNepali ? 'सबै महिनाहरू' : 'All Months'}</option>`;
    calendarData[currentYear].forEach((month, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = isNepali ? monthsNepali[index] : month.name;
        monthFilter.appendChild(option);
    });
}

// Render notes list in the notes modal
function renderNotesList() {
    notesList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    let searchQuery = noteSearch.value.toLowerCase();
    let filteredNotes = notes.filter(note => note.type === 'note' && (
        note.title.toLowerCase().includes(searchQuery) ||
        note.description.toLowerCase().includes(searchQuery)
    ));
    if (monthFilter.value !== 'all') {
        let selectedMonth = parseInt(monthFilter.value);
        filteredNotes = filteredNotes.filter(note => {
            let [year, month] = note.date.split('-').map(Number);
            return year === currentYear && month - 1 === selectedMonth;
        });
    }
    if (filteredNotes.length === 0) {
        let p = document.createElement('p');
        p.textContent = isNepali ? 'कुनै नोटहरू छैनन्' : 'No notes available';
        fragment.appendChild(p);
    } else {
        filteredNotes.forEach((note, index) => {
            let globalIndex = notes.findIndex(n => n === note);
            let noteItem = document.createElement('div');
            noteItem.className = 'border-bottom py-2';
            noteItem.innerHTML = `
                <div><strong>${note.date}</strong> - ${note.title}</div>
                <div>${note.time ? note.time : ''}</div>
                <div>${note.description || ''}</div>
                <div>${note.recurring ? (isNepali ? 'मासिक दोहोरिने' : 'Recurring Monthly') : ''}</div>
                <div>${note.reminder ? (isNepali ? 'रिमाइन्डर सेट' : 'Reminder Set') : ''}</div>
                <div class="d-flex gap-2">
                    <a href="#" class="edit-note text-primary" data-en="Edit" data-ne="सम्पादन">${isNepali ? 'सम्पादन' : 'Edit'}</a>
                    <a href="#" class="delete-note text-danger" data-en="Delete" data-ne="मेटाउन">${isNepali ? 'मेटाउन' : 'Delete'}</a>
                </div>
            `;
            noteItem.querySelector('.edit-note').addEventListener('click', () => editNote(globalIndex));
            noteItem.querySelector('.delete-note').addEventListener('click', () => deleteNote(globalIndex));
            fragment.appendChild(noteItem);
        });
    }
    notesList.appendChild(fragment);
}

// Save or edit a note/finance entry
function saveEntry() {
    let date = selectedDate.textContent;
    let type = entryType.value;
    let title = noteTitle.value.trim();
    if (!title) {
        alert(isNepali ? 'शीर्षक वा रकम आवश्यक छ' : 'Title or amount is required');
        return;
    }
    let note = {
        date,
        type,
        title,
        time: noteTime.value,
        description: noteDescription.value.trim(),
        category: type !== 'note' ? entryCategory.value : '',
        recurring: recurring.checked,
        reminder: reminder.checked
    };
    if (type === 'expense' && monthlyBudget.value) {
        budgets[`${date.split('-')[0]}-${date.split('-')[1]}`] = parseFloat(monthlyBudget.value);
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }
    if (editingNoteIndex !== null) {
        undoStack.push({ action: 'edit', index: editingNoteIndex, oldNote: { ...notes[editingNoteIndex] }, newNote: note });
        notes[editingNoteIndex] = note;
    } else {
        undoStack.push({ action: 'add', note });
        notes.push(note);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    renderCalendar();
    renderNotesList();
    renderFinancialRecords();
    renderMonthlySummary();
    if (note.reminder && note.time) {
        let [year, month, day] = date.split('-').map(Number);
        let gregDate = getGregorianDate(year, month - 1, day);
        let [hours, minutes] = note.time.split(':');
        gregDate.setHours(hours, minutes);
        let now = new Date();
        if (gregDate > now) {
            setTimeout(() => {
                if (Notification.permission === 'granted') {
                    new Notification(note.title, { body: note.description || 'Reminder' });
                }
            }, gregDate - now);
        }
    }
    noteFormModal.hide();
}

// Edit an existing note
function editNote(index) {
    let note = notes[index];
    editingNoteIndex = index;
    selectedDate.textContent = note.date;
    entryType.value = note.type;
    noteTitle.value = note.title;
    noteTime.value = note.time || '';
    noteDescription.value = note.description || '';
    entryCategory.value = note.category || '';
    recurring.checked = note.recurring;
    reminder.checked = note.reminder;
    entryCategory.style.display = note.type !== 'note' ? 'block' : 'none';
    categoryManager.style.display = note.type !== 'note' ? 'block' : 'none';
    budgetSection.style.display = note.type === 'expense' ? 'block' : 'none';
    let budgetKey = `${note.date.split('-')[0]}-${note.date.split('-')[1]}`;
    monthlyBudget.value = budgets[budgetKey] || '';
    saveNote.style.display = 'none';
    editEntry.style.display = 'block';
    populateCategories();
    noteFormModal.show();
    noteTitle.focus();
}

// Delete a note
function deleteNote(index) {
    undoStack.push({ action: 'delete', index, note: { ...notes[index] } });
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderCalendar();
    renderNotesList();
    renderFinancialRecords();
    renderMonthlySummary();
}

// Clear all notes
function clearAllNotes() {
    if (confirm(isNepali ? 'के तपाईं सबै नोटहरू मेटाउन निश्चित हुनुहुन्छ?' : 'Are you sure you want to delete all notes?')) {
        undoStack.push({ action: 'clear', notes: [...notes.filter(n => n.type === 'note')] });
        notes = notes.filter(n => n.type !== 'note');
        localStorage.setItem('notes', JSON.stringify(notes));
        renderCalendar();
        renderNotesList();
        renderMonthlySummary();
    }
}

// Undo last action
function undoLastAction() {
    if (undoStack.length === 0) {
        alert(isNepali ? 'पुर्ववत गर्न कुनै कार्य छैन' : 'No actions to undo');
        return;
    }
    let lastAction = undoStack.pop();
    if (lastAction.action === 'add') {
        notes = notes.filter(n => n !== lastAction.note);
    } else if (lastAction.action === 'edit') {
        notes[lastAction.index] = lastAction.oldNote;
    } else if (lastAction.action === 'delete') {
        notes.splice(lastAction.index, 0, lastAction.note);
    } else if (lastAction.action === 'clear') {
        notes.push(...lastAction.notes);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    renderCalendar();
    renderNotesList();
    renderFinancialRecords();
    renderMonthlySummary();
}

// Export notes to Excel
function exportNotesToExcel() {
    let headers = isNepali 
        ? ['मिति', 'शीर्षक', 'समय', 'विवरण', 'दोहोरिने', 'रिमाइन्डर']
        : ['Date', 'Title', 'Time', 'Description', 'Recurring', 'Reminder'];
    let data = notes.filter(note => note.type === 'note').map(note => [
        note.date,
        note.title,
        note.time || '',
        note.description || '',
        note.recurring ? (isNepali ? 'हो' : 'Yes') : (isNepali ? 'होइन' : 'No'),
        note.reminder ? (isNepali ? 'हो' : 'Yes') : (isNepali ? 'होइन' : 'No')
    ]);
    let ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isNepali ? 'नोटहरू' : 'Notes');
    XLSX.writeFile(wb, `Notes_${currentYear}.xlsx`);
}

// Export notes to PDF
function exportNotesToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let title = isNepali ? `नोटहरू ${currentYear}` : `Notes ${currentYear}`;
    let headers = isNepali 
        ? ['मिति', 'शीर्षक', 'विवरण']
        : ['Date', 'Title', 'Description'];
    let data = notes.filter(note => note.type === 'note').map(note => [
        note.date,
        note.title,
        note.description || ''
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

// Import notes from JSON
function importNoteData() {
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
                importedNotes = importedNotes.filter(note => note.type === 'note');
                notes.push(...importedNotes);
                localStorage.setItem('notes', JSON.stringify(notes));
                renderCalendar();
                renderNotesList();
                alert(isNepali ? 'नोट डेटा सफलतापूर्वक आयात गरियो' : 'Note data imported successfully');
            } catch (err) {
                alert(isNepali ? 'आयात असफल: अमान्य फाइल ढाँचा' : 'Import failed: Invalid file format');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Event listeners
viewNotes.addEventListener('click', () => {
    populateMonthFilter();
    renderNotesList();
    notesModal.show();
});

addNote.addEventListener('click', () => {
    selectedDate.textContent = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-01`;
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

noteSearch.addEventListener('input', debounce(renderNotesList, 300));

monthFilter.addEventListener('change', renderNotesList);

clearNotes.addEventListener('click', clearAllNotes);

closeModal.addEventListener('click', () => notesModal.hide());

saveNote.addEventListener('click', saveEntry);

editEntry.addEventListener('click', () => {
    saveEntry();
    editingNoteIndex = null;
});

entryType.addEventListener('change', () => {
    entryCategory.style.display = entryType.value !== 'note' ? 'block' : 'none';
    categoryManager.style.display = entryType.value !== 'note' ? 'block' : 'none';
    budgetSection.style.display = entryType.value === 'expense' ? 'block' : 'none';
    populateCategories();
});

addCategory.addEventListener('click', () => {
    let category = newCategory.value.trim();
    if (category && !customCategories.includes(category)) {
        customCategories.push(category);
        localStorage.setItem('customCategories', JSON.stringify(customCategories));
        populateCategories();
        newCategory.value = '';
    }
});

closeEntry.addEventListener('click', () => {
    editingNoteIndex = null;
    noteFormModal.hide();
});

// Export/import listeners
document.querySelectorAll('.excel-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        if (option.dataset.type === 'note') exportNotesToExcel();
        else if (option.dataset.type === 'finance') exportFinanceToExcel();
    });
});

document.querySelectorAll('.pdf-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        if (option.dataset.type === 'note') exportNotesToPDF();
        else if (option.dataset.type === 'finance') exportFinanceToPDF();
    });
});

document.querySelectorAll('.import-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        if (option.dataset.type === 'note') importNoteData();
        else if (option.dataset.type === 'finance') importFinanceData();
    });
});