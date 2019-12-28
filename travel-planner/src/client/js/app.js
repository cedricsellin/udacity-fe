//If we have a lot of historical data we might have multiple buttons???
let removeTripButtons = []
let saveNewTripButton = null
let newSearchButton = null
let errorField = null
let savedTripsSection = null

document.addEventListener('DOMContentLoaded', function () {
    newSearchButton = document.getElementById('new_trip_search_btn')
    errorField = document.getElementById('error_field')
    savedTripsSection = document.getElementById('past_trips')
    newSearchButton.addEventListener('click', clickedOnSearch)

    loadSavedTrips()
})


async function loadSavedTrips() {

    let html = ""

    const resp = await fetch('http://localhost:8080/savedTrips').then(response => {
        if (response.status == 200)
            return response.json()
        else {
            throw new Error("Server Error " + response.status)
        }
    }).then(data => {
        data.trips.forEach(element => {

            html += `<div id="trip_photo" class="trip_photo_holder"><img src="${element.imgURL}" alt="${element.tags}"  width="400"></div>
            <div class="trip_details">
                <div id="trip_location-0"> My Trip to ${element.city}, ${element.country}</div>
                <div id="trip_date-0">Departing: ${element.departingDate}</div>
                <div id="trip_buttons-0">
                    <button id="trip_save_btn" type="button" class="trip_btn"> Save Trip</button>
                    <button id="trip_remove_btn" type="button" class="trip_btn"> Remove Trip</button>
                </div>
                <div id="trip_info-days-0">Paris is 220 days away</div>
                <div id="trip_info-weather-0">
                    Typical weather for ${element.city} is: <br>
                    High: ${element.tempHigh} Low: ${element.tempLow}<br>
                    ${element.description}<br>
                </div>
            </div>`

        })
    }).catch(error => setErrorField(error.toString()))

    savedTripsSection.innerHTML += html

}

function setErrorField(err) {
    errorField.innerHTML = err.toString()
}

async function clickedOnSearch(event) {
    console.log('clicked on Search')
    const locationField = document.getElementById('new_trip_location')
    const dateField = document.getElementById('new_trip_date')

    let success = true

    if(locationField.value.length == 0) {
        setErrorField("Invalid Location")
        return false
    }

    const value = dateField.value
    if (dateField.value == '' || dateField.validity.valid == false) {
        setErrorField("Invalid Date")
        return false
    }
    const location = encodeURIComponent(locationField.value)
    const date = encodeURIComponent(dateField.value)
    console.log(document.getElementById('new_trip_date').value)
    const url = `http://localhost:8080/searchTrips/${location}/${date}`
    
    const resp = await fetch(url)

    if (resp.status != 200) {
        setErrorField('Server Error ' + resp.status)
        success = false
    }
    console.log(resp.json())

    return success
}



/*
function async postSearch() {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
} */