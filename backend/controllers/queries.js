const mariadb = require('mariadb')
const songsRouter = require('express').Router()
const logger = require('../utils/logger')
const config = require('../utils/config')

songsRouter.get('/', async (request, response, next) => {
  let isConnected = false
  let conn
  try {
    conn = await mariadb.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PWD,
      database: config.DB_SCHEMA
    })
    isConnected = true
  } catch (error) {
    next(error)
  }

  const songReq = request.query.name

  let query
  if (songReq !== undefined) {
    const songReqFormatted = `%${songReq}%`
    query = `SELECT s.id AS "id", JSON_ARRAY(s.title_ro, s.title_ja) AS "song", ` +
      `JSON_ARRAYAGG(JSON_OBJECT("rel_id", r.id, "rel_title_ro", r.title_ro, "rel_title_ja", CONVERT(r.title_ja USING UTF8MB4)) ORDER BY r.id) AS "releases" ` +
      `FROM rel_songs rs ` +
      `JOIN releases r ON r.id = rs.release_id ` +
      `JOIN songs s ON s.id = rs.song_id ` +
      `WHERE s.title_ro LIKE "${songReqFormatted}" ` +
      `OR s.title_ja LIKE "${songReqFormatted}" OR s.title_en LIKE "${songReqFormatted}" ` +
      `GROUP BY s.title_ro ORDER BY s.title_ro;`
  } else {
    query = `SELECT s.id AS "id", JSON_ARRAY(s.title_ro, s.title_ja) AS "song", ` +
      `JSON_ARRAYAGG(JSON_OBJECT("rel_id", r.id, "rel_title_ro", r.title_ro, "rel_title_ja", CONVERT(r.title_ja USING UTF8MB4)) ORDER BY r.id) AS "releases" ` +
      `FROM rel_songs rs ` +
      `JOIN releases r ON r.id = rs.release_id ` +
      `JOIN songs s ON s.id = rs.song_id ` +
      `GROUP BY s.title_ro ORDER BY s.title_ro;`
  }

  if (isConnected) {
    try {
      logger.info(`Running a query: ${query}`)

      const rows = await conn.query(query)
      response.status(200).json(rows)
    } catch (error) {
      logger.error(`Couldn't run a SELECT query`, error.message)
      response.status(500).json({ error: 'Problem with a SELECT query' })
    }
  }
})

module.exports = songsRouter