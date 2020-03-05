const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'aarbrccmbkbtmp',
    host: 'ec2-18-210-51-239.compute-1.amazonaws.com',
    database: 'd7c7mngnbufq3i',
    password: '630134674690346541724fe4caa6653e24a3c84512d72489a0a1a18fadaf1c39',
    port: 5432,
});

const getSong = (request, response) => {
    pool.query('SELECT title, record FROM ajikan.songs WHERE title_romaji LIKE "%Rewrite%"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

module.exports = {
    getSong,
}