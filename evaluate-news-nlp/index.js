var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const AYLIENTextAPI = require('aylien_textapi')
const dotenv = require('dotenv')
const validUrl = require('valid-url')
const cors = require('cors')
const bodyParser = require('body-parser')

dotenv.config()

const textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()

function classificationCallBack(error, resp) {
    console.log(resp)
}

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
    console.log('sending a request out')
})

app.get('/classify', function (req, res) {
    const content = req.query.param
    let param = null

    //Checking if we were passed a URL else pass the data as text
    if (validUrl.isHttpUri(content)) {
        param = { url: content }
    } else {
        param = { text: content }
    }

    textapi.classify(param, function (error, response) {
        //Returning both the classification and the query parameters received
        let JSONResponse = { 'query': content, 'text': null }

        if (error == null) {
            if (response.classify != null)
                text = response.classify
            else
                text = "Could not classify this content"
        } else {
            //Propagating the error to the client could normalize them if needed
            text = error.toString()
        }
        JSONResponse.text = text
        res.send(JSON.stringify(JSONResponse))
    })

})
