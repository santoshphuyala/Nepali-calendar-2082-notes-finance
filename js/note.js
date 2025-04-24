let filteredNotes = [];
let editIndex = null;

function renderNotes() {
    const notesList = document.getElementById('notesList');
    const monthFilter = document.getElementById('monthFilter');
    if (!notesList || !monthFilter) {
        console.error('Required elements for rendering notes not found');
        return;
    }

    notesList.innerHTML = '';
    filteredNotes = notes.filter(note => {
        const noteMonth = note.date.split('-')[1];
        return monthFilter.value === 'all' || noteMonth === monthFilter.value;
    });

    const searchQuery = document.getElementById('noteSearch')?.value.toLowerCase() || '';
    filteredNotes = filteredNotes.filter(note =>
        note.title.toLowerCase().includes(searchQuery) ||
        note.description.toLowerCase().includes(searchQuery)
    );

    if (filteredNotes.length === 0) {
        notesList.innerHTML = `<p data-en="No notes found" data-ne="कुनै नोटहरू फेला परेन">No notes found</p>`;
        return;
    }

    filteredNotes.forEach((note, index) => {
        const dates = getRecurringDates(note);
        dates.forEach(date => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note-item card mb-2 p-3';
            noteDiv.innerHTML = `
                <h5>${note.title} (${date})</h5>
                <p>${note.description}</p>
                <p><small>${note.time || ''}</small></p>
                <button class="btn btn-sm btn-warning edit-note" data-index="${index}" data-date="${date}" data-en="Edit" data-ne="सम्पादन गर्नुहोस्">Edit</button>
                <button class="btn btn-sm btn-danger delete-note ms-2" data-index="${index}" data-date="${date}" data-en="Delete" data-ne="मेटाउनुहोस्">Delete</button>
            `;
            notesList.appendChild(noteDiv);
        });
    });

    document.querySelectorAll('.edit-note').forEach(button => {
        button.addEventListener('click', (e) => {
            try {
                const idx = parseInt(e.target.dataset.index);
                editIndex = idx;
                const note = notes[idx];
                document.getElementById('noteTitle').value = note.title;
                document.getElementById('noteDescription').value = note.description;
                document.getElementById('noteTime').value = note.time || '';
                document.getElementById('recurring').checked = note.recurring;
                document.getElementById('reminder').checked = note.reminder;
                document.getElementById('selectedDate').textContent = note.date;
                const noteFormModal = new bootstrap.Modal(document.getElementById('noteFormModal'));
                noteFormModal.show();
            } catch (error) {
                console.error('Error editing note:', error);
            }
        });
    });

    document.querySelectorAll('.delete-note').forEach(button => {
        button.addEventListener('click', (e) => {
            try {
                const idx = parseInt(e.target.dataset.index);
                if (confirm(isNepali ? 'के तपाईं यो नोट मेटाउन चाहनुहुन्छ?' : 'Are you sure you want to delete this note?')) {
                    notes.splice(idx, 1);
                    localStorage.setItem('notes', JSON.stringify(notes));
                    renderNotes();
                }
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        });
    });
}

function saveNote() {
    try {
        const noteTitle = document.getElementById('noteTitle').value;
        const noteDescription = document.getElementById('noteDescription').value;
        const noteTime = document.getElementById('noteTime').value;
        const recurring = document.getElementById('recurring').checked;
        const reminder = document.getElementById('reminder').checked;
        const date = document.getElementById('selectedDate').textContent;

        if (!noteTitle || !date) {
            alert(isNepali ? 'कृपया शीर्षक र मिति भर्नुहोस्' : 'Please fill in the title and date');
            return;
        }

        const note = { title: noteTitle, description: noteDescription, time: noteTime, recurring, reminder, date };

        if (editIndex !== null) {
            notes[editIndex] = note;
            editIndex = null;
        } else {
            notes.push(note);
        }

        localStorage.setItem('notes', JSON.stringify(notes));
        if (reminder) {
            scheduleNotification(note);
        }
        renderNotes();
        const noteFormModal = bootstrap.Modal.getInstance(document.getElementById('noteFormModal'));
        noteFormModal.hide();
    } catch (error) {
        console.error('Error saving note:', error);
    }
}

function exportNotesToExcel() {
    try {
        const ws = XLSX.utils.json_to_sheet(filteredNotes);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Notes');
        XLSX.writeFile(wb, 'notes.xlsx');
    } catch (error) {
        console.error('Error exporting notes to Excel:', error);
    }
}

function exportNotesToPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(isNepali ? 'नोटहरू' : 'Notes', 10, 10);
        let y = 20;
        filteredNotes.forEach((note, index) => {
            doc.text(`${index + 1}. ${note.title} (${note.date})`, 10, y);
            doc.text(note.description, 10, y + 5);
            y += 15;
            if (y > 280) {
                doc.addPage();
                y = 10;
            }
        });
        doc.save('notes.pdf');
    } catch (error) {
        console.error('Error exporting notes to PDF:', error);
    }
}

function importNotesData(event) {
    try {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            notes = data;
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
            checkUpcomingReminders();
        };
        reader.readAsText(file);
    } catch (error) {
        console.error('Error importing notes:', error);
    }
}

function clearNotes() {
    try {
        if (confirm(isNepali ? 'के तपाईं सबै नोटहरू मेटाउन चाहनुहुन्छ?' : 'Are you sure you want to clear all notes?')) {
            notes = [];
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
    } catch (error) {
        console.error('Error clearing notes:', error);
    }
}

if (document.getElementById('notesList')) {
    renderNotes();
}

document.getElementById('noteSearch')?.addEventListener('input', debounce(renderNotes, 300));
document.getElementById('monthFilter')?.addEventListener('change', renderNotes);
document.getElementById('saveNote')?.addEventListener('click', saveNote);
document.getElementById('editEntry')?.addEventListener('click', saveNote);
document.getElementById('clearNotes')?.addEventListener('click', clearNotes);
document.querySelectorAll('.excel-option')?.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target.dataset.type === 'note') exportNotesToExcel();
    });
});
document.querySelectorAll('.pdf-option')?.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target.dataset.type === 'note') exportNotesToPDF();
    });
});
document.querySelectorAll('.import-option')?.forEach(option => {
    if (option.dataset.type === 'note') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', importNotesData);
        input.click();
    }
});
