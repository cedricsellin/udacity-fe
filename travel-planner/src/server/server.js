const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 8080

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, function () {
    console.log('server listening on port ' + PORT)
})

//Returning the website html page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//Function returning the saved trips
app.get('/oldtrips', function (req, res) {
    console.log('logging a new trip')
})


//Function adding a trip to the saved trips
app.post('/newtrip', function (req, res) {
    console.log('logging a new trip')
})

//Function adding a trip to the saved trips
app.post('/removetrip', function (req, res) {
    console.log('removing an old trip')
})
