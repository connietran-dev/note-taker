/* DEPENDENCIES */
const express = require('express');
var path = require('path');

var notesArray = require("./db/db.json");

/* SETS UP THE EXPRESS APP */
var app = express();
var PORT = process.env.PORT || 3000;

/* SETS UP THE EXPRESS APP TO HANDLE DATA PARSING */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

/* STARTS THE SERVER TO BEGIN LISTENING */
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


/* ROUTES */

// GETs

// Basic routes that take user to each HTML page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Returns all notes from notesArray when getNotes() is called in index.js
app.get("/api/notes", function (req, res) {
    return res.json(notesArray);
});


// POSTs

// Route for saving a note to db.json
app.post("/api/notes", function (req, res) {
    // req.body is JSON post sent from UI
    let newNoteRequest = req.body;
    console.log(newNoteRequest);

    notesArray.push(newNoteRequest);

    // Set id property of newNoteRequest to its index in notesArray
    newNoteRequest.id = notesArray.indexOf(newNoteRequest);

    res.json({
        message: "Note successfully saved",
        port: PORT,
        status: 200,
        success: true
    });

});


// DELETEs

app.delete("/api/notes/:id", function (req, res) {
    // id is index of note in notesArray
    let id = parseInt(req.params.id);
    // Use id index to remove item from notesArray
    notesArray.splice(id, 1);

    res.json({
        data: notesArray,
        message: "Note successfully deleted",
        port: PORT,
        status: 200,
        success: true
    });
});


// Redirect to root if no routes match
app.get("*", function (req, res) {
    res.redirect('/');
});