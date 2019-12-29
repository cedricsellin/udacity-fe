const dotenv = require('dotenv')
dotenv.config()

//Cannnot put those calls before the dotenv.config()
const username = process.env.GEONAME_USERNAME
const pixabayKey = process.env.PIXABAY_KEY
const darkskyKey = process.env.DARKSKY_KEY

const fetch = require('node-fetch')
const converter = require('xml-js')


//GEONAME SECTION
const geonameUser = process.env.GEONAME_USERNAME
const city = encodeURIComponent('Paris')
const geonameEndPoint = `http://api.geonames.org/postalCodeSearchJSON?username=${geonameUser}&placename=${city}`
console.log(geonameEndPoint)

async function getCityInformation(city) {

    let latitude = null
    let longitude = null
    let countryCode = null
    let weather = null


    const geoResponse = await fetch(geonameEndPoint).then(res => res.json()).then(value => {
        latitude = value.postalCodes[0].lat
        longitude = value.postalCodes[0].lng
        countryCode = value.postalCodes[0].countryCode
    }).catch(error => { console.log(error.toString()) })

    //const time = new Date()
    //TODO: LOOK AT UNITS
    const darkskyEndpoint = `https://api.darksky.net/forecast/${darkskyKey}/${latitude},${longitude}`
    console.log(`latitude ${latitude}, longitude ${longitude}`)
    console.log(darkskyEndpoint)
    const darkskyResponse = await fetch(darkskyEndpoint).then(response => response.json()).then(value => {
        console.log(value.daily.summary)
        weather = value.daily.summary
    }).catch(error => { console.log(error.toString()) })

    const pixabayEndpoint = `http://pixabay.com/api/?key=${pixabayKey}&q=${city}`
    console.log(pixabayEndpoint)

    const url = await getPixabayImgURL(city)

    let json = {
        lat: latitude,
        lon: longitude,
        countryCode: countryCode,
        summary: weather,
        URL: url
    }
    console.log('JSON ' + JSON.stringify(json))

    return (json)
}

async function getPixabayImgURL(city) {
    const pixabayEndpoint = `http://pixabay.com/api/?key=${pixabayKey}&q=${city}`
    let result = null
    const resp = await fetch(pixabayEndpoint).then(response => response.json()).then(data => {
        console.log('got the result' + data.hits[0].webformatURL)
        result = data.hits[0].webformatURL
        return result
    }
    ).catch(error => {
        console.log("There was an error" + error.toString())
    })

    return resp
}

module.exports.getPixabayImgURL = getPixabayImgURL
module.exports.getCityInformation = getCityInformation

//fetch(geonameEndPoint).then(res => console.log(res.text()))

//.then(txt => (txt)).then(data => console.log(data))
//test()
//DARK SKY SECTION
const latitude = 0
//check exclusions
//const darkskyEndpoint = `api.darksky.net/forecast/${darkskyKey}/${latitude},${longitude},${time}?units='si'`


//res.temperatureMin
//res.temperatureHigh

//PIXABAY SECTION




