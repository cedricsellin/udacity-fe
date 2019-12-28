In this project we will have a web app allowing the users to input a location, date and it will return a picture of the place in addition to the weather information

At the initial stage the application will query the server for the past trip information


Server setup:
All the information will be stored on a redis cache for the server side - to ensure persistency we will also setup a postgress instance to store the data
The server will listen on port 8080 and have three main endpoints
GET: '/' to get the index.html file
GET: '/oldtrips' to get the past trips - it will return a JSON with Date, Location and Weather
POST: '/newtrip' sending a JSON to the server to insert the latest trip information
POST: '/removetrip' sending a JSON to the server to delete an existing trip


//TODO: Deal with the caching of images?
// REDIS INSTANCE - KUBERNETES - DOCKER
// TEST OBSCURE LOCATION
// TEST WHEN EMPTY ARRAY OF SAVED TRIPS
// CHECK RUNNING THE SERVER FROM HIS LOCAL DIRECTORY 
// WHERE IS THE INDEX.HTML COMING FROM
// DEAL WITH THE ALT from the images