// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const portNum = 8080
// Start up an instance of app
/* Dependencies */
const app = express()
const projectData = []

/* Middleware*/
// Cors for cross origin allowance
app.use(cors())
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json())

// Spin up the server
// Callback to debug

// Initialize all route with a callback function

// Initialize the main project folder
// Callback function to complete GET '/all'
app.get('/all', (req, resp) => {
    resp.send(JSON.stringify(projectData))
})

// Post Route
app.post('/newentry', (req, resp) => {
    projectData.push(req.body)
    resp.status(200)
    resp.statusText = "Data Stored Successfully"
    resp.send()
})

app.listen(portNum, () => {
    console.log(`Server Ready listening on port ${portNum}`)
})