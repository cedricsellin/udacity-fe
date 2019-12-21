function newFormHandler (event) {
    event.preventDefault()
    
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    fetch('http://localhost:8081/test')
    .then(resp => resp.json())
    .then(data => {
        document.getElementById('results').innerHTML = data.message
    })
    .catch(error => {
        console.log('there was an error '+error.toString())
    })

}

export { newFormHandler }