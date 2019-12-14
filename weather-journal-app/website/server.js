// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const APIKEY = "727fe42fb2c8c85e8121c5bdbfaf4804"
const portNum = 8080
// Start up an instance of app
/* Dependencies */
const app = express()
const data = [{ date: "date", temp: "temperature", content: "content" }]

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
    console.log("got a GET request")
    resp.send(JSON.stringify(data))
})

// Post Route
app.post('/newentry', (req, resp) => {

    console.log(req.body)

    const zipcode = req.body.zip

    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${APIKEY}`

    const projectData = fetch(url)
        .then(response => response.json())
        .then(info => info.main.temp)
        .then(temp => {
            data.push({ date: req.body.date, temp: convertKelvinToCelsius(temp), content: req.body.content })
            console.log("TESTING ON THE /newentry with a get", data)
            resp.send(JSON.stringify(data))
        })
        .catch(err => console.log('error' + err));

})

function convertKelvinToCelsius(kelvin) {
    return (Math.round(kelvin - 273.15))
}

app.listen(portNum, () => {
    console.log(`Server Ready listening on port ${portNum}`)
})