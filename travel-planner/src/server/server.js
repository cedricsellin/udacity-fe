const { getCityInformation } = require('./externalAPI')
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 8080

// This is an array with all the saved trips but only the city and departingDate are keys the rest is updated when the client requests the information
/* let savedTrips = [
    {
        city: 'Paris',
        country: 'France',
        departingDate: '2019-12-25',
        
        tempLow: 10,
        tempHigh: 20,
        description: 'Mostly Sunny',
        imgURL: 'https://pixabay.com/get/57e0d74b4e52b108f5d08460962933791536d9ec504c704c722878dd9e45c75b_640.jpg',
        tags: 'louvre, pyramid, paris'
    },
    {
        city: 'Tel Aviv',
        country: 'Israel',
        departingDate: '2020-12-23',
        
        tempLow: 25,
        tempHigh: 36,
        description: 'Always Sunny',
        imgURL: 'https://pixabay.com/get/55e2d7474d5aa914f6da8c7dda79367a123fd7e25a526c4870287cd0974fc55ab0_640.jpg',
        tags: 'steel, tel aviv, architecture' 
    },
    {
        city: 'London',
        country: 'UK',
        departingDate: '2020-12-23',
        
        tempLow: -3,
        tempHigh: 3,
        description: 'Always Raining',
        imgURL: 'https://pixabay.com/get/54e3d7474255a914f6da8c7dda79367a123fd7e25a526c4870287cd0974ccd5fbf_640.jpg',
        tags: 'tower bridge, london, bridge'
    }
] */

let savedTrips = []
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('dist'))

app.listen(PORT, function () {
    //////console.log('server listening on port ' + PORT)
})

//Returning the website html page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//Function returning the saved trips
app.get('/savedTrips', function (req, res) {
    //////console.log('sending trips back')
    refreshTripData().then(result => {
        res.send(JSON.stringify(savedTrips))
    }).catch(error => {
        res.statusText = error.toString()
        res.statusCode = 500
        res.send()
    })
})

//Function to search information on a trip before saving it 
app.get('/searchTrips/:location/:date', function (req, res) {
    //console.log('searching trips')
    //console.log(req.params.location)
    //console.log(req.params.date)

    getCityInformation(req.params.location, req.params.date).then(result => {
        //console.log('sending result ' + result)
        res.send(JSON.stringify(result))
    }).catch(error => {
        res.status(500)
        res.statusText = error.toString()
        res.send()
    })
})

//Function adding a trip to the saved trips
app.post('/newtrip', function (req, res) {
    //console.log('logging a new trip')
    //console.log(req.body)
    res.status(200)
    res.statusText = "Data Successfully Added"
    savedTrips.push({
        city: req.body.city,
        departingDate: req.body.departingDate,
        country: req.body.country
    })

    res.send()
})

//Function adding a trip to the saved trips
app.post('/removetrip', function (req, res) {
    //console.log('removing an old trip')
    //console.log(req.body)
    //console.log(savedTrips.length)
    for (let i = 0; i < savedTrips.length; i++) {
        //console.log(savedTrips[i].departingDate, req.body.departingDate, savedTrips[i].city, req.body.city)

        if (savedTrips[i].departingDate == req.body.departingDate && savedTrips[i].city == req.body.city && savedTrips[i].country == req.body.country) {
            savedTrips.splice(i, 1)
            res.status(200)
            res.statusText = "Data Successfully Removed"
            //console.log("found the element - new data")
            //console.log(savedTrips)
            break
        }

        if (i == savedTrips.length - 1) {
            res.status(500)
            res.statusText = "Data could not be found"
            //console.log("couldn't find the data in the array")
        }
    }

    res.send()
})


async function refreshTripData() {
    let resp = []

    for (let i = 0; i < savedTrips.length; i++) {
        resp[i] = getCityInformation(savedTrips[i].city, savedTrips[i].departingDate).then(res => savedTrips[i] = res)
    }

    return Promise.all(resp)
}