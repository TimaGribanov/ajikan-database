const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});


const getSong = (request, response) => {
    pool.query("SELECT title, record FROM ajikan.songs WHERE title_romaji LIKE '%Rewrite%'", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

module.exports = {
    getSong
};