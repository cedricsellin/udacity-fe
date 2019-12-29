//If we have a lot of historical data we might have multiple buttons???
let removeTripButtons = []
let saveNewTripButton = null
let newSearchButton = null
let errorField = null
let savedTripsSection = null
let searchResultSection = null
const separator = "%"
const serverUrl = "http://localhost:8080"

document.addEventListener('DOMContentLoaded', function () {
    newSearchButton = document.getElementById('new_trip_search_btn')
    errorField = document.getElementById('error_field')
    savedTripsSection = document.getElementById('past_trips')
    newSearchButton.addEventListener('click', clickedOnSearch)

    searchResultSection = document.getElementById('search_result')
    loadSavedTrips()
})

async function loadSavedTrips() {

    let html = ""
    let i = 0

    //Resetting the loaded trips to support the reloading
    savedTripsSection.innerHTML = ""
    const resp = await fetch(serverUrl + '/savedTrips').then(response => {
        if (response.status == 200) {
            return response.json()
        } else {
            throw new Error("Server Error " + response.status)
        }
    }).then(data => {
        data.forEach(element => {

            html += generateTemplateHTML(element, i, true)
            i++
        })
    }).catch(error => setErrorField(error.toString()))

    savedTripsSection.innerHTML += html

    for (let j = 0; j < i; j++) {
        document.getElementById(`trip_remove_btn-${j}`).addEventListener('click', removeTripBtnPressed)
    }

}
// Passing the element which has all the information and a unique id and a boolean to know if it is saved trip or a new one ;-)
function generateTemplateHTML(element, i, savedTrip) {
    const buttonText = (savedTrip) ? "Remove Trip" : "Save Trip"// This is the text for the button 
    const buttonId = (savedTrip) ? `trip_remove_btn-${i}` : `trip_save_btn-${i}`
    const UID = `${element.city}${separator}${element.departingDate}${separator}${element.country}`

    const newHtml = `<div id="trip_photo_${i}" class="trip_photo_holder"><img src="${element.imgURL}" alt="${element.tags}"  width="400"></div>
    <div class="trip_details" id="trip_details_${i}">
        <div id="trip_location_${i}"> My Trip to ${element.city}, ${element.country}</div>
        <div id="trip_date_${i}">Departing: ${element.departingDate}</div>
        <div id="trip_buttons_${i}">
            <button id="${buttonId}" data="${i}" uid="${UID}" type="button" class="trip_btn"> ${buttonText} </button>
        </div>
        <div id="trip_info-days_${i}">Paris is 220 days away</div>
        <div id="trip_info-weather_${i}">
            Typical weather for ${element.city} is: <br>
            High: ${element.tempHigh} Low: ${element.tempLow}<br>
            ${element.description}<br>
        </div>
    </div>`
    return newHtml
}

function setErrorField(err) {
    errorField.innerHTML = err.toString()
}

async function clickedOnSearch(event) {
    console.log('clicked on Search')
    const locationField = document.getElementById('new_trip_location')
    const dateField = document.getElementById('new_trip_date')

    let success = true

    if (locationField.value.length == 0) {
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
    const url = serverUrl + `/searchTrips/${location}/${date}`

    await fetch(url).then(resp => {

        if (resp.status != 200) {
            setErrorField('Server Error ' + resp.status)
            success = false
        }
        return resp.json()   //TODO: DEAL WITH MULTIPLE SEARCH RESULTS
    }).then(data => { 
        let i = 0
        searchResultSection.innerHTML = generateTemplateHTML(data, i, false)
        document.getElementById(`trip_save_btn-${i}`).addEventListener('click', saveTripBtnPressed)
    
    }).catch(error => {
        setErrorField(errorField.toString())
    })
    return success
}

function saveTripBtnPressed(event) {
    const id = event.target.getAttribute('data')
    const uid = event.target.getAttribute('uid')
    const values = uid.split(separator)

    const resp = fetch(serverUrl + `/newtrip`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            city: values[0],
            departingDate: values[1],
            country: values[2]
        })
    }).then(resp => {
        //Reload the trips now that we have added a new one ;-)
        loadSavedTrips()
        //Removing the old search given we are saving it
        searchResultSection.innerHTML = ""
    }).catch(error => {
        setErrorField(error.toString())
    })
}

function removeTripBtnPressed(event) {
    const id = event.target.getAttribute('data')
    const uid = event.target.getAttribute('uid')
    const values = uid.split(separator)

    const resp = fetch(serverUrl + `/removetrip`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            city: values[0],
            departingDate: values[1],
            country: values[2]
        })
    }).then(resp => {
        const tripDetails = document.getElementById(`trip_details_${id}`)
        const tripPhoto   = document.getElementById(`trip_photo_${id}`)
        tripDetails.style.display = 'none'
        tripPhoto.style.display = 'none'
        console.log('removing element')
    }).catch(error => {
        setErrorField(error.toString())
    })
}
