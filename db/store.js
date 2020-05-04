const util = require('util')
const fs = require('fs')
const uuidv1 = require('uuid/v1')
//READ AND WRITE FILE
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

//STORE CONSTRUCTOR
class Store {
  read() {
    return readFileAsync("./db.json", "utf8")
  }

  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
 //THIS IS WHERE WE GET NOTES
  getNotes() {
    return this.read().then(notes => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  //THIS IS HOW WE ADD NOTES, AND IF STATEMENT FOR IMPROPER ENTRY
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Text input areas cannot be blank");
    }
    //CREATE THE NEW NOTE AND WRITE TO UPDATED NOTES
    const newNote = { title, text, id: ++this.lastId };
    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  }
  //REMOVE NOTES FROM CURRENT SAVED NOTES
  removeNote(id) {
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !== parseInt(id)))
      .then(filteredNotes => this.write(filteredNotes));
  }
}

module.exports = new Store();