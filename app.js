const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Load a html page
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'));
});

// Get elements from input
/*app.post('/', (request, response) => {
    printIt(request.body, response);
});*/

//function printIt(text, response)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

const db = require('./queries.js');

app.get('/songs', db.getSongs);
app.get('/records', db.getRecords);
