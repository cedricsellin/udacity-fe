const { getPixabayImgURL, getCityInformation } = require('./externalAPI')
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 8080

let savedTrips = {
    trips: [
        {
            city: 'Paris',
            country: 'France',
            departingDate: '12/25/2019',
            tempLow: 10,
            tempHigh: 20,
            description: 'Mostly Sunny',
            imgURL: 'https://pixabay.com/get/57e0d74b4e52b108f5d08460962933791536d9ec504c704c722878dd9e45c75b_640.jpg',
            tags: 'louvre, pyramid, paris'
        },
        {
            city: 'Tel Aviv',
            country: 'Israel',
            departingDate: '12/26/2020',
            tempLow: 25,
            tempHigh: 36,
            description: 'Always Sunny',
            imgURL: 'https://pixabay.com/get/55e2d7474d5aa914f6da8c7dda79367a123fd7e25a526c4870287cd0974fc55ab0_640.jpg',
            tags: 'steel, tel aviv, architecture'
        },
        {
            city: 'London',
            country: 'UK',
            departingDate: '03/26/2020',
            tempLow: -3,
            tempHigh: 3,
            description: 'Always Raining',
            imgURL: 'https://pixabay.com/get/54e3d7474255a914f6da8c7dda79367a123fd7e25a526c4870287cd0974ccd5fbf_640.jpg',
            tags: 'tower bridge, london, bridge'
        }
    ]
}

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.static('dist'))

app.listen(PORT, function () {
    console.log('server listening on port ' + PORT)
    //TODO: PUT THAT BACK
    //refreshImgURL()
})

//Returning the website html page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/savedTrips', function (req, res) {
    console.log('sending trips back')
    res.send(JSON.stringify(savedTrips))
})

//Function returning the saved trips
app.get('/oldtrips', function (req, res) {
    console.log('logging a new trip')
})

app.get('/searchTrips/:location/:date', function (req, res) {
    console.log('searching trips')
    console.log(req.params.location)
    console.log(req.params.date)

    getCityInformation(encodeURIComponent(req.params.location)).then(result => {
        console.log('sending result '+result)
        res.send(JSON.stringify(result))
    }
    )
})

//Function adding a trip to the saved trips
app.post('/newtrip', function (req, res) {
    console.log('logging a new trip')
})

//Function adding a trip to the saved trips
app.post('/removetrip', function (req, res) {
    console.log('removing an old trip')
})


function refreshImgURL() {

    savedTrips.trips.forEach(element => {
        getPixabayImgURL(element.city).then(value => {
            element.imgURL = value
        })
    })
}