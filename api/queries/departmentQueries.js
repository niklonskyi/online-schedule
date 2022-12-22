const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getDepartments = (request, response) => {
    pool.query('SELECT * FROM department ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getDepartmentById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM department WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createDepartment = (request, response) => {
    const { faculty_id, name, short_name } = request.body
    try{
        pool.query('INSERT INTO department (faculty_id, name, short_name) VALUES ($1, $2, $3) RETURNING *', [faculty_id, name, short_name], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Department added with ID: ${results.rows[0].id}`)

        })
    }
    catch (error) {
        response.send(error)
    }

}

const updateDepartment = (request, response) => {
    const id = parseInt(request.params.id)
    const { faculty_id, name, short_name } = request.body

        pool.query(
            'UPDATE department SET faculty_id = $1, name = $2, short_name = $3 WHERE id = $4',
            [faculty_id, name, short_name, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Department modified with ID: ${id}`)
            }
        )
}

const deleteDepartment = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM department WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Department deleted with ID: ${id}`)
    })
}

module.exports = {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}