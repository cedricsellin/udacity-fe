const maxFeelingsLength = 2000
let errorField

function convertJSONtoHTML(json) {
    let html = `<div class="entrydate">${json.date}</div> 
    <div class="entrytemp">${json.temp}</div>
    <div class="entrycont">${json.content}</div>`

    return html
}

const postData = async (url, data) => {
    let success = true
    //TODO: CHECK WE DEAL WITH SERVER ERRORS
    //TODO: HOW TO PROPAGATE THE ERRORS
    try {
        let resp = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header        
        })

        if (resp.status != 200) {
            errorField.innerHTML = 'Server Error '+resp.status
            success = false
        }
    } catch (error) {
        success = false
        // Main error is the ZipCode Lookup
        errorField.innerHTML = 'Error uploading the data to the server'
    } 

    return success
    
}

const getWeatherdata = async (zipcode) => {
    const APIKEY = "727fe42fb2c8c85e8121c5bdbfaf4804"
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${APIKEY}`

    const query = fetch(weatherURL)
        .then(response => response.json())
        .then(info => info.main.temp)
        .catch(err => {
            errorField.innerHTML = err.toString()
        });

    return query
}


//This function will return TRUE or FALSE based on the success of the data push...
async function pushDataToServer(temp) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const feelingsContent = document.getElementById('feelings').value

    const fields = { date: `${yyyy}-${mm}-${dd}`, temp: temp, content: `${feelingsContent}` }

    let success = postData('http://localhost:8080/newentry', fields)

    return success
}


async function clickOnGenerate() {
    let errorString = null
    let fieldToFocus = null
    const zipCode = document.getElementById('zip').value
    const feelingsContent = document.getElementById('feelings').value

    if (validateZipCode(zipCode) == false) {
        errorString = "This is an invalid zipcode"
        fieldToFocus = document.getElementById('zip')
    } else if (validateContent(feelingsContent) == false) {
        errorString = `The content field cannot be empty and be less than ${maxFeelingsLength} characters`
        fieldToFocus = document.getElementById('feelings')
    } else {
        errorString = ""
    }

    errorField.innerHTML = errorString;
    if (fieldToFocus !== null) {
        fieldToFocus.focus()
        return
    }

    //TODO: FIX
    try {
        const temp = await getWeatherdata(zipCode)
        const upload = await pushDataToServer(convertKelvinToCelsius(temp))
        if (upload)
            updateEntries()

        //Resetting the fields after the entry is logged
        document.getElementById('zip').value = ""
        document.getElementById('feelings').value = ""
    }
    catch (error) {
        errorField.innerHTML=error.toString()
    }

}

function validateContent(value) {

    if (value.length > 0 && value.length <= maxFeelingsLength) {
        return true;
    } else {
        return false;
    }

}

function convertKelvinToCelsius(kelvin) {
    return (Math.round(kelvin - 273.15))
}

function validateZipCode(value) {
    return /^\d{5}(-\d{4})?$/.test(value);
}

// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', function () {
    // Now that the DOM is loaded we can listen for a click on the button
    document.getElementById('generate').addEventListener('click', clickOnGenerate)
    errorField = document.getElementById('error')

    try {
        //Load the content from the server for the previous data
        updateEntries()
    } catch (error) {
        errorField.innerHTML = "There was an error with the server getting the data"
    }
})

function updateMostRecentEntries(data) {
    let html = "";

    for (let i = 0; i < data.length; i++) {
        html += `<div class="entry" id="entryHolder${i}">` + convertJSONtoHTML(data[i]) + "</div>"
    }

    const entryHolder = document.getElementById('entrycontainer');
    entryHolder.innerHTML = html;
}


//Needs to become an Async function...
function updateEntries() {

    fetch('http://localhost:8080/all', { credentials: 'same-origin' })
        .then(response => response.json())
        .then(data => updateMostRecentEntries(data))
        .catch(err => {
            errorField.innerHTML = err.toString()
        });


}