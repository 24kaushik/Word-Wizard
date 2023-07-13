//initializing the variables
let inputWord = document.getElementById('inputWord')
let search = document.getElementById('search')
let word = document.getElementById('word')
let origin = document.getElementById('origin')
let pronAs = document.getElementById('pronAs')
let voice = document.getElementById('voice')
let meanings = document.getElementById('meanings')


const options = {
    method: 'GET'
}

//fetching data
const fetchData = async () => {
    let value = inputWord.value
    let meaningResult = ''
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`, options)
        .then(response => response.json())
        .then((response) => {
            word.innerHTML = response[0].word
            origin.innerHTML = response[0].origin ? response[0].origin : "Not Avilable."
            pronAs.innerHTML = response[0].phonetic
            voice.setAttribute('src', response[0].phonetics[0].audio)
            response[0].meanings.forEach(element => {
                meaningResult += `<div class="meaning">
                <span class="partOfSpeech"><b>Part of speech:</b> ${element.partOfSpeech}</span>
                <div class="ps-definition px-3">${element.definitions[0].definition}</div>
                <div class="example px-3"><b>eg:</b> ${element.definitions[0].example}</span></div>
            </div>`
            });
            console.log(meaningResult)
            meanings.innerHTML = meaningResult

        })
}

search.addEventListener('click', (e) => {
    e.preventDefault()
    fetchData()
})

