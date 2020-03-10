const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

const getSongs = (request, response) => {
    pool.query('SELECT * FROM ajikan.songs ORDER BY id', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getRecords = (request, response) => {
    pool.query('SELECT * FROM ajikan.records ORDER BY id', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getSongsRecords = (request, response) => {
    pool.query('select s.title, s.title_romaji, s.title_en r.title as record_title, case when r.type = 1 then (select title_romaji from ajikan.albums alb where r.self_id = alb.id) when r.type = 2 then (select title_romaji from ajikan.singles sin where r.self_id = sin.id) when r.type = 3 then (select title_romaji from ajikan.mini_albums malb where r.self_id = malb.id) when r.type = 4 then (select title_romaji from ajikan.compilations comp where r.self_id = comp.id) else (select title_romaji from ajikan.indie ind where r.self_id = ind.id) end as record_title_romaji from ajikan.songs s inner join ajikan.records r on r.id && s.record order by s.title', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};


module.exports = {
    getSongs,
    getRecords,
    getSongsRecords
};