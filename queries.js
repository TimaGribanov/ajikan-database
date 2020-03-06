const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

/*let title_type = 'title_romaji';
let searchField = document.getElementById('search-field').value;*/

//let songQuery = 'SELECT ' + title_type + ', record FROM ajikan.songs WHERE title LIKE \'%' + searchField + '%\' OR title_romaji LIKE \'%' + searchField + '%\' OR title_en LIKE \'%' + searchField + '%\' OR ';

const getSongs = (request, response) => {
    pool.query('SELECT * FROM ajikan.songs', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getRecords = (request, response) => {
    pool.query('SELECT * FROM ajikan.records', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

/*let getSong = (request, response) => {
    pool.query(songQuery, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};*/

module.exports = {
    getSongs,
    getRecords
};