let titles = [];
let notes = [];
let savedNotes = getNotes('savedNotes');
let savedTitles = getTitles('savedTitles');

console.log(titles);
console.log(notes);

function showFullCard() {
    document.getElementById('first-line').classList.remove('hidden');
    document.getElementById('last-line').classList.remove('hidden');
}

function closeLine() {
    document.getElementById('first-line').classList.add('hidden');
    document.getElementById('last-line').classList.add('hidden');
}

function loadNote() {
    let note = document.getElementById('note').value;
    let title = document.getElementById('title').value;
    if (note.length > 0 || title.length > 0) {
        notes.push(note);
        titles.push(title);
        addNotes();
    }
    document.getElementById('note').value = '';
    document.getElementById('title').value = '';
}


function addNotes() {
    let mynotes = document.getElementById('mynotes');
    mynotes.innerHTML = '';

    for (i = 0; i < notes.length; i++) {
        mynotes.innerHTML += generateNote(notes, titles);
    }

}

function generateNote(notes, titles) {
    return `<div class="note"> 
    <div class="space-between">
        <b class="title">${titles[i]}</b>
        <div>
        <a href="#" onclick="saveNote(${i})"><img class="icon" src="img/save-16.ico"></a> 
        <a href="#" onclick="deleteNote(${i})"><img class="icon" src="img/delete-16.ico"></a> 
        </div>
        </div> 
    ${notes[i]}
    </div>`;
}

function saveNote(i) {
    noteToSave = notes[i];
    titleToSave = titles[i];
    checkNotesInLocalStorage();
    checkTitlesInLocalStorage();
    addSavedNotes();
    deleteNote(i);
}

function checkNotesInLocalStorage() {
    if (savedNotes) {
        savedNotes.push(noteToSave);
    }
    else {
        savedNotes = [];
        savedNotes.push(noteToSave);
    }
    saveNotes('savedNotes', savedNotes);
}

function checkTitlesInLocalStorage() {
    if (savedTitles) {
        savedTitles.push(titleToSave);
    }
    else {
        savedTitles = [];
        savedTitles.push(titleToSave);
    }
    saveTitles('savedTitles', savedTitles);
}

function saveNotes(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getNotes(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveTitles(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getTitles(key) {
    return JSON.parse(localStorage.getItem(key));
}

function addSavedNotes() {
    if (getNotes('savedNotes')) {
        let savnotes = document.getElementById('savednotes');
        savnotes.innerHTML = '';
        for (i = 0; i < savedNotes.length; i++) {
            savnotes.innerHTML += generateSavedNote(savedNotes, savedTitles);
        }
    }
}

function generateSavedNote(savedNotes, savedTitles) {
    return ` <div class="note saved-note"> 
    <div class="space-between">
    <b class="title">${savedTitles[i]}</b>
    <a href="#" onclick="deleteSavedNote(${i})"><img class="icon" src="img/delete-16.ico"></a> 
    </div> 
        ${savedNotes[i]}
    </div>`;
}

function deleteNote(i) {
    titles.splice(i, 1);
    notes.splice(i, 1);
    addNotes();
}

function deleteSavedNote(i) {
    savedNotes.splice(i, 1);
    savedTitles.splice(i, 1);
    saveNotes('savedNotes', savedNotes);
    saveTitles('savedTitles', savedTitles);
    addSavedNotes();
}

function filterNotes() {
    let search = document.getElementById('searchTitle').value;
    let mynotes = document.getElementById('mynotes');
    mynotes.innerHTML = '';

    for (i = 0; i < notes.length; i++) {
        let title = titles[i];
        let note = notes[i];
        if (note.toLowerCase().includes(search.toLowerCase()) || title.toLowerCase().includes(search.toLowerCase())) {
            mynotes.innerHTML += generateNote(notes, titles)
        }
    }
}

function filterNotes() {
    searchNotes();
    searchSavedNotes();
}

function searchNotes() {
    let search = document.getElementById('searchTitle').value;
    let mynotes = document.getElementById('mynotes');
    mynotes.innerHTML = '';
    for (i = 0; i < notes.length; i++) {
        let title = titles[i];
        let note = notes[i];
        if (note.toLowerCase().includes(search.toLowerCase()) || title.toLowerCase().includes(search.toLowerCase())) {
            mynotes.innerHTML += generateNote(notes, titles);
        }
    }
}

function searchSavedNotes() {
    let search = document.getElementById('searchTitle').value;
    let savnotes = document.getElementById('savednotes');
    savnotes.innerHTML = '';
    for (i = 0; i < savedNotes.length; i++) {
        let savednote = savedNotes[i];
        let savedtitle = savedTitles[i];
        if (savednote.toLowerCase().includes(search.toLowerCase()) || savedtitle.toLowerCase().includes(search.toLowerCase())) {
            savnotes.innerHTML += generateSavedNote(savedNotes, savedTitles);
        }
    }
}