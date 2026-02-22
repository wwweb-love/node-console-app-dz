const path = require("path")
const fs = require("fs/promises")
const chalk = require("chalk");
const notesPath = path.join(__dirname, "db.json");

async function listNotes() {
    const notes = await fs.readFile(notesPath, {encoding: "utf8"})
    return JSON.parse(notes)
}

async function addNote(title) {
    const notes = await listNotes();

    const note = {
        id: Date.now().toString(),
        title
    }

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function putNote(noteId, noteTitle) {
    let notes = await listNotes()
    console.log(chalk.bgGreen(noteId, noteTitle))

    notes.map((note) => {
        if (note.id == noteId) {
            note.title = noteTitle
        }
    })

    console.log(chalk.bgGrey(notes))

    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote(removeId) {
    let notes = await listNotes();

    notes.forEach((note, index) => {
        if (note.id === removeId) {
            notes.splice(index, 1)
        }
    })

    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function prontListNotes() {
    const notes = await listNotes();
    notes.forEach((note) => {
        console.log(chalk.bgBlue(note.id), chalk.bgGreen(note.title));
    })
}

module.exports = {
    prontListNotes, addNote, removeNote, listNotes, putNote
}


//
// { "id": 1771675703152, "title": "Roman" },
// { "id": 1771675958196, "title": "Alex" },
// { "id": 1771676105796, "title": "Nastya" }
// ]