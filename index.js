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

/*app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});*/

let server = app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
server.setTimeout(500000);

const db = require('./queries.js');

app.get('/song', db.getSong);