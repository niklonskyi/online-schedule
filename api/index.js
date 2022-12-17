const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 3000

const facultyQueries = require('./queries/facultyQueries')

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/faculty', facultyQueries.getFaculties)
app.get('/faculty/:id', facultyQueries.getFacultyById)
app.post('/faculty/adds', facultyQueries.createFaculty)
app.put('/faculty/:id', facultyQueries.updateFaculty)
app.delete('/faculty/:id', facultyQueries.deleteFaculty)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})