const express = require('express')
const cors = require ('cors')
const bodyParser = require('body-parser')
const PORT = 8080

const app = express()
app.use(cors())
app.use(bodyParser.json())

//Returning the website html page
app.get('/', function (req,res) {
    res.sendFile('dist/index.html')
})

app.listen(PORT, function (){
console.log('server listening on port '+PORT)
})
