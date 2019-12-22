function handleSubmit(event) {
    let formText = document.getElementById('name').value
    const url = `http://localhost:8080/classify?param=${formText}`

    event.preventDefault()

    // check what text was put into the form field
    if (urlValidation(formText) == false) {
        console.log('invalid URL')
        setErrorCode('invalid URL')
        return
    } else {
        console.log('url validation passed')
    }
    
    fetch(url, { credentials: 'same-origin' })
        .then(res => {
            if (res.status != 200) {
                throw "Server Error HTTP CODE "+res.status
            } else {
                return res.json()
            }
        })
        .then(function (res) {
            console.log(res)
            document.getElementById('results').innerHTML = "Category: "+res.text
            document.getElementById('query').innerHTML = "The query was " + res.query
        }).catch(error => {
            setErrorCode(error.toString())
        })

        resetPage()

}

function setErrorCode(errorString) {
    //Removing previous information since we got an error
    resetPage()
    document.getElementById('errorField').innerHTML = errorString

}

function resetPage() {
    document.getElementById('results').innerHTML = ""
    document.getElementById('query').innerHTML = ""
    document.getElementById('errorField').innerHTML = ""
}

function urlValidation(url) {
    console.log(url)
    //starts with http or https
    const re = /^http[s]?:\/\/www\.[a-zA-Z0-9]/
    console.log(re.test(url))
    return (re.test(url))
}

export { handleSubmit, urlValidation}
