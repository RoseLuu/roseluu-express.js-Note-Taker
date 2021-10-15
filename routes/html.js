const html = require('express').Router();
const path = require('path');

//get Route for starter page
html.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
//get Route for note page
html.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})
// Wildcard route if not match then return to starter page
html.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = html;