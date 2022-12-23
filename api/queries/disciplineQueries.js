const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getDisciplines = (request, response) => {
    pool.query('SELECT * FROM disciplines ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDisciplineById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM disciplines WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createDiscipline = (request, response) => {
    const { name } = request.body

    pool.query('INSERT INTO disciplines (name) VALUES ($1) RETURNING *', [name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Discipline added with ID: ${results.rows[0].id}`)

    })
}

const updateDiscipline = (request, response) => {
    const id = parseInt(request.params.id)
    const { name } = request.body

    pool.query(
        'UPDATE discipline SET name = $1 WHERE id = $2',
        [name, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Discipline modified with ID: ${id}`)
        }
    )
}

const deleteDiscipline = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM disciplines WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Discipline deleted with ID: ${id}`)
    })
}

module.exports = {
    getDisciplines,
    getDisciplineById,
    createDiscipline,
    updateDiscipline,
    deleteDiscipline,
}