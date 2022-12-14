const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 3000

const facultyQueries = require('./queries/facultyQueries')
const departmentQueries = require('./queries/departmentQueries')
const groupQueries = require('./queries/groupQueries')
const studentQueries = require('./queries/studentQueries')
const disciplineQueries = require('./queries/disciplineQueries')
const teachersQueries = require('./queries/teachersQueries')
const scheduleQueries = require('./queries/scheduleQueries')

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

app.get('/departments', departmentQueries.getDepartments)
app.get('/departments/:id', departmentQueries.getDepartmentById)
app.post('/departments/add', departmentQueries.createDepartment)
app.put('/departments/:id', departmentQueries.updateDepartment)
app.delete('/departments/:id', departmentQueries.deleteDepartment)

app.get('/groups', groupQueries.getGroups)
app.get('/groups/:id', groupQueries.getGroupById)
app.post('/groups/add', groupQueries.createGroup)
app.put('/groups/:id', groupQueries.updateGroup)
app.delete('/groups/:id', groupQueries.deleteGroup)

app.get('/students', studentQueries.getStudents)
app.get('/students/:id', studentQueries.getStudentById)
app.post('/students/add', studentQueries.createStudent)
app.put('/students/:id', studentQueries.updateStudent)
app.delete('/students/:id', studentQueries.deleteStudent)

app.get('/disciplines', disciplineQueries.getDisciplines)
app.get('/disciplines/:id', disciplineQueries.getDisciplineById)
app.post('/disciplines/add', disciplineQueries.createDiscipline)
app.put('/disciplines/:id', disciplineQueries.updateDiscipline)
app.delete('/disciplines/:id', disciplineQueries.deleteDiscipline)

app.get('/teachers', teachersQueries.getTeachers)
app.get('/teachers/:id', teachersQueries.getTeacherById)
app.post('/teachers/add', teachersQueries.createTeacher)
app.put('/teachers/:id', teachersQueries.updateTeacher)
app.delete('/teachers/:id', teachersQueries.deleteTeacher)

app.get('/schedule', scheduleQueries.getSchedules)
app.get('/schedule/:id', scheduleQueries.getScheduleById)
app.post('/schedule/add', scheduleQueries.createSchedule)
app.put('/schedule/:id', scheduleQueries.updateSchedule)
app.delete('/schedule/:id', scheduleQueries.deleteSchedule)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})