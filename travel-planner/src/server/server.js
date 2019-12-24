const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 8080

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.static('dist'))

app.listen(PORT, function () {
    console.log('server listening on port ' + PORT)
})

//Returning the website html page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/savedTrips', function(req,res){
    const savedTrips = {
        trips: [
            {
                city: 'Paris',
                country: 'France',
                departingDate: '12/25/2019',
                tempLow: 10,
                tempHigh: 20,
                description: 'Mostly Sunny'
            }, 
            {
                city: 'Tel Aviv',
                country: 'Israel',
                departingDate: '12/26/2020',
                tempLow: 25,
                tempHigh: 36,
                description: 'Always Sunny'
            },
            {
                city: 'London',
                country: 'UK',
                departingDate: '03/26/2020',
                tempLow: -3,
                tempHigh: 3,
                description: 'Always Raining'
            }
        ]
    }
    res.send(JSON.stringify(savedTrips))
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
