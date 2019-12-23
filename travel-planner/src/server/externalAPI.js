const dotenv = require('dotenv')
const username = process.env.GEONAME_USERNAME

dotenv.config()

//GEONAME SECTION
const geonameUser = process.env.GEONAME_USERNAME
const city = encodeURIComponent('New York')
const geonameEndPoint = `api.geonames.org/postalCodeSearch?username=${geonameUser}&placename=${city}`
console.log(geonameEndPoint)
const res = encodeURIComponent(geonameEndPoint)
console.log(res)

//DARK SKY SECTION
const darkskyKey = process.env.DARKSKY_KEY
//check exclusions
const darkskyEndpoint = `api.darksky.net/forecast/${DARKSKY_KEY}/${latitude},${longitude},${time}?units='si'`


//res.temperatureMin
//res.temperatureHigh

//PIXABAY SECTION
const pixabayKey = process.env.PIXABAY_KEY
const pixabayEndpoint = `pixabay.com/api/?key=${pixabayKey}&q=${city}`



