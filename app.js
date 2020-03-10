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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://timagribanov.github.io");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

const db = require('./queries.js');

app.get('/songs', db.getSongs);
app.get('/records', db.getRecords);
app.get('/songs_records', db.getSongsRecords);
