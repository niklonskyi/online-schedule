const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getGroups = (request, response) => {
    pool.query('SELECT * FROM groups ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getGroupById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM groups WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createGroup = (request, response) => {
    const { department_id, name, course } = request.body
    try{
        pool.query('INSERT INTO groups (department_id, name, course) VALUES ($1, $2, $3) RETURNING *', [department_id, name, course], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Group added with ID: ${results.rows[0].id}`)

        })
    }
    catch (error) {
        response.send(error)
    }

}

const updateGroup = (request, response) => {
    const id = parseInt(request.params.id)
    const { department_id, name, course } = request.body

    try {
        pool.query(
            'UPDATE groups SET department_id = $1 name = $2, course = $3 WHERE id = $4',
            [department_id, name, course, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`Group modified with ID: ${id}`)
            }
        )
    }

    catch (error) {
        console.log(error)
    }

}

const deleteGroup = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM groups WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Group deleted with ID: ${id}`)
    })
}

module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
}