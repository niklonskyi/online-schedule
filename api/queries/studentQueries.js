const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getStudents = (request, response) => {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getStudentById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createStudent = (request, response) => {
    const { group_id, name, email, phone } = request.body
    try{
        pool.query('INSERT INTO students (group_id, name, email, phone) VALUES ($1, $2, $3, $4) RETURNING *', [group_id, name, email, phone], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Student added with ID: ${results.rows[0].id}`)

        })
    }
    catch (error) {
        response.send(error)
    }

}

const updateStudent = (request, response) => {
    const id = parseInt(request.params.id)
    const { group_id, name, email, phone } = request.body

    try {
        pool.query(
            'UPDATE students SET group_id = $1, name = $2, email = $3, phone = $4 WHERE id = $5',
            [group_id, name, email, phone, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Student modified with ID: ${id}`)
            }
        )
    }

    catch (error) {
        console.log(error)
    }

}

const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Student deleted with ID: ${id}`)
    })
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
}