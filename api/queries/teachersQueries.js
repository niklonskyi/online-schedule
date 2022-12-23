const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getTeachers = (request, response) => {
    pool.query('SELECT * FROM teachers ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTeacherById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM teachers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createTeacher = (request, response) => {
    const { name, surname, email, phone } = request.body
    try{
        pool.query('INSERT INTO teachers (name, surname, email, phone) VALUES ($1, $2, $3, $4) RETURNING *', [name, surname, email, phone], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Teacher added with ID: ${results.rows[0].id}`)

        })
    }
    catch (error) {
        response.send(error)
    }

}

const updateTeacher = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, surname, email, phone } = request.body

    try {
        pool.query(
            'UPDATE teachers SET name = $1, surname = $2, email = $3, phone = $4 WHERE id = $5',
            [name, surname, email, phone, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Teacher modified with ID: ${id}`)
            }
        )
    }

    catch (error) {
        console.log(error)
    }

}

const deleteTeacher = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM teachers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Teacher deleted with ID: ${id}`)
    })
}

module.exports = {
    getTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
}