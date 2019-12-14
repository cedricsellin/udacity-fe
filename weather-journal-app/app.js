const maxFeelingsLength = 2000

function convertJSONtoHTML(json) {
    let html = `<div class="entrydate">${json.date}</div> 
    <div class="entrytemp">${json.temp}</div>
    <div class="entrycont">${json.content}</div>`

    return html
}

function clickOnGenerate() {
    const errorField = document.getElementById('error')
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

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const fields = { date: `${yyyy}-${mm}-${dd}`, zip: zipCode, content: `${feelingsContent}` }

    const postData = async (url, data) => {

        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header        
        })

        try {
            const newData = await response.json();
            console.log(newData);
            updateMostRecentEntries(newData)
            return newData
        } catch (error) {
            console.log("error in clickOnGenerate", error);
        }
    }

    postData('http://localhost:8080/newentry', fields)

    //Resetting the fields after the entry is logged
    document.getElementById('zip').value=""
    document.getElementById('feelings').value=""
    return;
}

function validateContent(value) {

    if (value.length > 0 && value.length <= maxFeelingsLength) {
        return true;
    } else {
        return false;
    }

}

function validateZipCode(value) {
    return /^\d{5}(-\d{4})?$/.test(value);
}

// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', function () {
    // Now that the DOM is loaded we can listen for a click on the button
    document.getElementById('generate').addEventListener('click', clickOnGenerate)
    initializeRecentEntries()
    //Load the content from the server for the previous data
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
function initializeRecentEntries() {

    const fetchNewData = async (url) => {
        const response = await fetch(url, { credentials: 'same-origin' })

        try {
            const data = await response.json();
            console.log(data);

            updateMostRecentEntries(data);

            return data;
        } catch (error) {
            console.log("error in fetchNewData", error);
        }

    }

    fetchNewData('http://localhost:8080/all');
}