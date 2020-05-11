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

// Returns all notes from when getNotes() is called in index.js
app.get("/api/notes", function (req, res) {
    return res.json(notesArray);
});