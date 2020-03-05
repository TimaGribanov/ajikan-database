const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.get('/index', (request, response) => {
    response.sendFile(path.join('index.html'))
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

const db = require('./queries.js');

app.get('/song', db.getSong);