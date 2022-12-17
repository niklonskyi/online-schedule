const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getFaculties = (request, response) => {
    pool.query('SELECT * FROM faculty ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getFacultyById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM faculty WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createFaculty = (request, response) => {
    const { name, short_name } = request.body

    pool.query('INSERT INTO faculty (name, short_name) VALUES ($1, $2) RETURNING *', [name, short_name], (error, results) => {
        response.redirect('http://127.0.0.1:5173/faculty')
        if (error) {
            throw error
        }
        response.status(201).send(`Faculty added with ID: ${results.rows[0].id}`)

    })
}

const updateFaculty = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, short_name } = request.body

    pool.query(
        'UPDATE faculty SET name = $1, short_name = $2 WHERE id = $3',
        [name, short_name, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Faculty modified with ID: ${id}`)
        }
    )
}

const deleteFaculty = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM faculty WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Faculty deleted with ID: ${id}`)
    })
}

module.exports = {
    getFaculties,
    getFacultyById,
    createFaculty,
    updateFaculty,
    deleteFaculty,
}