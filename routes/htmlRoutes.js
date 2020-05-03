var path = require("path");
var router = require("express").Router();

// "/notes" responds with the notes.html file
router.get("/notes", function (request, response) {
  response.sendFile(path.join(__dirname, "../public/notes.html"));
})

// the default route, should redirect every other route request to index.html
router.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "../public/index.html"));
})

module.exports = router;

