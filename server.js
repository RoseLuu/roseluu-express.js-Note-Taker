const express = require('express');
const apiRoutes = require('./routes/api.js');
const htmlRoutes = require('./routes/html.js');

const PORT = process.env.PORT || 3001;
const path = require("path")
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes)



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);