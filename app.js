const html = require('html');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.sendFile(__dirname+'/index.html');
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

const db = require('./queries.js');

//app.get('/song', db.getSong);