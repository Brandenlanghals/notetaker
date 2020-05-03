const util = require('util')
const fs = require('fs')

const uuidv1 = require('uuid/v1')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
  read() {
    return readFileAsync("./db.json", "utf8")
  }

  write(note) {
    return writeFileAsync("./db.json", JSON.stringify(note))
  }

  getNotes() {
    this.read().then(notes => {
      // parse the JSON string and turn into an object
      // add them to a list
      // return that list (array)
    })
  }

  addNote(note) {
    // use the note argument
    // create a new note object with your required fields (text, title, id)
    // write that object to the json file
  }

  removeNote(id) {
    // get all notes
    // remove the note with the given id
    // and return a list of notes that does NOT have that id (in essence the filtered list)
  }

}

module.exports = new Store()