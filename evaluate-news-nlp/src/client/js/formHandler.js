function handleSubmit(event) {
    event.preventDefault()
    resetPage()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    const url = `http://localhost:8080/classify?param=${formText}`
    fetch(url, { credentials: 'same-origin' })
        .then(res => res.json())
        .then(function (res) {
            console.log(res)
            document.getElementById('results').innerHTML = res.text
            document.getElementById('query').innerHTML = "The query was " + res.query
        }).catch(error => {

            document.getElementById('errorField').innerHTML = error.toString()
        })
}

function resetPage() {
    document.getElementById('results').innerHTML = ""
    document.getElementById('query').innerHTML = ""
    document.getElementById('errorField').innerHTML = ""

}
export { handleSubmit }
