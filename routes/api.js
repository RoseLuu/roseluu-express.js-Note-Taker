const api = require('express').Router();
//require uuid for unique id
const { v4: uuidv4 } = require('uuid');
//require helper function
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/helper.js');
//GET route for all notes
api.get('/notes', (req, res) => {
    console.log("GET request");
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)))
})
//GET route for specific notes
api.get('/notes/:id', (req, res) => {
    console.log("Each GET request")
    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== id)
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID')
        })
})
//DELETE route
api.delete('/notes/:id', (req, res) => {
    console.log("DELETE request")
    //GET note id
    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== id);

            writeToFile('./db/db.json', result);
            res.json(`Note ${id} has been deleted`)
        })
})
//POST route to save the new notes
api.post('/notes', (req, res) => {
    //destructuring note 
    console.log("POST request");
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            'title': req.body.title,
            'text': req.body.text,
            'id': uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json(newNote);
    } else {
        res.error('Error to write new note');
    }
})


module.exports = api;