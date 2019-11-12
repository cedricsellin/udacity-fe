
const express = require('express')

const cors = require('cors')


const app = express()
const data = [{date:"11-11-11", temp:"20", content:"hhhh"}, {date:"11-12-11", temp:"22", content:"hhhfdsfgdsh"}]

app.use(cors())

app.get('/all', (req, resp) => {
    console.log("got a GET request")
    resp.send(JSON.stringify(data))
})

app.post('/newentry', (req, resp)=> {
    console.log("TESTING ON THE /newentry with a get")
    resp.send(JSON.stringify(data))

    console.log("GOT A POST REQUEST")
})
app.listen(port=8080, () => {
    console.log(`Server Ready listening on port ${port}`)
})

// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes

// Start up an instance of app

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance

// Initialize the main project folder

// Spin up the server
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route