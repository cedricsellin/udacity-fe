//If we have a lot of historical data we might have multiple buttons???
let removeTripButtons = []
let saveNewTripButton = null
let newSearchButton = null
let errorField = null
let savedTripsSection = null

document.addEventListener('DOMContentLoaded', function () {
    newSearchButton = document.getElementById('new_trip_search_btn')
    errorField = document.getElementById('error_field')
    savedTripsSection = document.getElementById('saved_trips')
    newSearchButton.addEventListener('click', clickedOnSearch)

    loadSavedTrips()
})


async function loadSavedTrips() {

    let html = ""
    try {
        
        const resp = await fetch('http://localhost:8080/savedTrips').catch(error => setErrorField(error))
        
        if (resp.status != 200){
            setErrorField("Server Error "+resp.status)
            return
        }
        
        savedTrips.trips.forEach(element => {

            html += `<div id="trip_photo" class="trip_photo_holder"></div>
        <div class="trip_details">
            <div id="trip_location-0"> My Trip to Paris, France</div>
            <div id="trip_date-0">Departing: 12/25/2019</div>
            <div id="trip_buttons-0">
                <button id="trip_save_btn" type="button" class="trip_btn"> Save Trip</button>
                <button id="trip_remove_btn" type="button" class="trip_btn"> Remove Trip</button>
            </div>
            <div id="trip_info-days-0">Paris is 220 days away</div>
            <div id="trip_info-weather-0">
                Typical weather for Paris is: <br>
                High: 46 Low: 30<br>
                Mostly sunny<br>
            </div>
        </div>`

        })
    } catch (error) {
        setErrorField(error.toString())
    }
    savedTripsSection.innerHTML += html
}

function setErrorField(err) {
    errorField.innerHTML = err.toString()
}

function clickedOnSearch(event) {
    console.log('clicked on Search')

}

