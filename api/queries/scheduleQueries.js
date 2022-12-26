const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getSchedules = (request, response) => {
    pool.query('SELECT * FROM schedule ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getScheduleById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM schedule WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createSchedule = (request, response) => {
    const { name, teacher_id, discipline_id, group_id, time, classroom } = request.body

    pool.query('INSERT INTO schedule (name, teacher_id, discipline_id, group_id, time, classroom) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, teacher_id, discipline_id, group_id, time, classroom], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Schedule added with ID: ${results.rows[0].id}`)

    })
}

const updateSchedule = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, teacher_id, discipline_id, group_id, time, classroom } = request.body

    pool.query(
        'UPDATE schedule SET name = $1, teacher_id = $2, discipline_id = $3, group_id = $4, time = $5, classroom = $6 WHERE id = $7',
        [name, teacher_id, discipline_id, group_id, time, classroom, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Schedule modified with ID: ${id}`)
        }
    )
}

const deleteSchedule = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM schedule WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Schedule deleted with ID: ${id}`)
    })
}

module.exports = {
    getSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
}