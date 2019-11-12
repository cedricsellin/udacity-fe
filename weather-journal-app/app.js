// Personal API Key for OpenWeatherMap API
let d = new Date()
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear()

let zipcode = null
let content = null

const maxFeelingsLength = 2000

function convertJSONtoHTML (json) {
    let html = `<div class="entrydate">${json.date}</div> 
    <div class="entrytemp">${json.temp}</div>
    <div class="entrycont">${json.content}</div>`

    return html
}

function clickOnGenerate () {
    const errorField = document.getElementById('error')
    let errorString = null
    let fieldToFocus = null
    const zipCode = document.getElementById('zip').value
    const feelingsContent = document.getElementById('feelings').value

    if (validateZipCode(zipcode) == false) {
        errorString = "This is an invalid zipcode"
        fieldToFocus = document.getElementById('zip')
    } else if ( validateContent(feelingsContent) == false) {
        errorString = `The content field cannot be empty and be less than ${maxFeelingsLength} characters`
        fieldToFocus = document.getElementById('feelings')
    } else {
        //TODO: CALL APIS FOR TEMPERATURE!
        errorString = ""
    }
    
    errorField.innerHTML=errorString;
    if (fieldToFocus !== null)
        fieldToFocus.focus()

    const fields = {date:"11-1-1", temp:"20", content:"${feelingsContent}"}
    const JSONversion = JSON.stringify(fields);
    
    const postData = async ( url, data)=>{

      const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
            },
         // body: JSON.stringify(data), // body data type must match "Content-Type" header        
        })

        try {
            const newData = await response.json();
            console.log(newData);
            return newData
          } catch (error) {
          console.log("error", error);
          // appropriately handle the error
          }
    }

    
    const serverResp = postData('http://localhost:8080/newentry', fields)
    

    return;
    //TODO: If success remove Error since it could be from the previous event...
}

function validateContent(value) {

    if (value.length > 0 && value.length <= maxFeelingsLength) {
        return true;
    } else {
        return false;
    }

}

function validateZipCode (value) {
    
    return true
    //TODO: CHECK EXCEPTIONS AND CONVERT TO INT THE STRING...
    if (value > 0 && value < 99999) {
        return true
    }

    return false;
}

// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', function () {
    // Now that the DOM is loaded we can listen for a click on the button
    document.getElementById('generate').addEventListener('click', clickOnGenerate)
    initializeRecentEntries()
    //Load the content from the server for the previous data

})

//Needs to become an Async function...
function initializeRecentEntries (){
    //GET JSON
    //TODO: Move to a server call
    const fetchNewData = async (url) => {
        const response = await fetch(url, {credentials: 'same-origin'})
        
        try {
          const data = await response.json();
          console.log(data);


          let html = ""

        for (let i = 0; i < data.length; i++) {
             html += `<div class="entry" id="entryHolder${i}">`+convertJSONtoHTML(data[i])+"</div>"
        }

        const entryHolder = document.getElementById('entrycontainer')
        entryHolder.innerHTML = html
          return data;
        } catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    
    }

    const newData = fetchNewData('http://localhost:8080/all');

    let html = ""

    for (let i = 0; i < newData.length; i++) {
            html += `<div class="entry" id="entryHolder${i}">`+convertJSONtoHTML(newData[i])+"</div>"
    }

    const entryHolder = document.getElementById('entrycontainer')
    entryHolder.innerHTML = html
}


/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */