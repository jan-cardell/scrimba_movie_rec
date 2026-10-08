import { supabase } from './config.js';

const preForm = document.querySelector('#pre-form')
const header = document.querySelector('header')
const formDiv = document.getElementById('form-div')
const recMovieDiv = document.getElementById('rec-movie-div')
const nextMovieBtn = document.getElementById('next-movie-btn')

preForm.addEventListener('submit', render_forms)

function render_forms(e) {
    e.preventDefault()

    const n = Number(document.getElementById('n').value)
    const watchTime = document.getElementById('watch-time').value
    const favoriteMovieArr = []
    const movieAgeArr = []
    const filmMoodArr = []
    let i = 0
    
    formDiv.innerHTML = ''
    
    header.innerHTML = `
        <img src="/img/logo.png">
        <h1>${i+1}</h1>`
    
    formDiv.innerHTML = `
            <form id="individual-form">
                <label class="individual-input-label">What’s your favorite movie and why?</label>
                <textarea id="favorite-movie"></textarea>
                <label for="film-age" class="individual-input-label">Are you in the mood for something new or a classic?</label>
                <div id='film-age' class='radio-div'>
                        <input type="radio" name="film-age" id="classic" value="classic" class="radio-input">
                        <label for="classic" class="radio-label">Classic</label>
                        <input type="radio" name="film-age" id="new" value="new" class="radio-input">
                        <label for="new" class="radio-label">New</label>
                </div>
                <label for="film-mood" class="individual-input-label">What are you in the mood for?</label>
                <div id='film-mood' class='radio-div'>
                        <input type="checkbox" name="film-mood" id="fun" value="fun" class="radio-input">
                        <label for="fun" class="radio-label">Fun</label>
                        <input type="checkbox" name="film-mood" id="serious" value="serious" class="radio-input">
                        <label for="serious" class="radio-label">Serious</label>
                        <input type="checkbox" name="film-mood" id="inspiring" value="inspiring" class="radio-input">
                        <label for="inspiring" class="radio-label">Inspiring</label>
                        <input type="checkbox" name="film-mood" id="scary" value="scary" class="radio-input">
                        <label for="scary" class="radio-label">Scary</label>
                </div>
            
                <button id='next-person-btn'>${n === 1 ? 'Get Movie' : 'Next Person'}</button>
            </form>
    `
    const individualForm = document.querySelector('#individual-form')
    individualForm.addEventListener('submit', function(e){
        e.preventDefault()
        i++
        header.innerHTML = `
            <img src="/img/logo.png">
            <h1>${i+1}</h1>`

        const favoriteMovie = document.getElementById('favorite-movie').value
        const filmAge = document.querySelector('input[name="film-age"]:checked')?.value
        const moods = [...document.querySelectorAll('input[name="film-mood"]:checked')].map(input => input.value)

        
        if (favoriteMovie) {
            favoriteMovieArr.push(favoriteMovie)
        }
        
        if (filmAge) {
            movieAgeArr.push(filmAge)
        }
    
        if (moods) {
            filmMoodArr.push(...moods)
        }

        if (i === n-1) {
            document.getElementById('next-person-btn').innerText = 'Get Movie'
        }

        if (i === n) {
            header.innerHTML = `
                <img src="/img/logo.png">`
            formDiv.style.display = 'none'

            getReccomendations(favoriteMovieArr, movieAgeArr, filmMoodArr, watchTime)
            
        }

        individualForm.reset()

    })
}

async function getReccomendations(favoriteMovieArr, movieAgeArr, filmMoodArr, watchTime) {
    // Create search embedding
    const movieString = `Similar Movies: ${favoriteMovieArr}, Age: ${movieAgeArr} Moods: ${filmMoodArr} Watchtime: ${watchTime}`
    console.log(movieString)
    const embeddingResponse = await fetch('/.netlify/functions/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: movieString })
    })
    const { embedding } = await embeddingResponse.json();
    const { data } = await supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.50,
        match_count: 20
    })
    console.log(data.length)

    recMovieDiv.style.display = 'flex'
    nextMovieBtn.style.display = 'flex'

    let i = 0

    recMovieDiv.innerHTML = `
    <h2>${data[i].title} (${data[i].releaseyear})</h2>
    <p>${data[i].content}</p>
    <p>This movie matches your interests by ${Math.round(Number(data[i].similarity)*100)}%</p>
    <button id='next-movie-btn'>Next Movie</button>
    `
    
    nextMovieBtn.addEventListener('click', function(){
        i ++
        if (i < data.length){
            recMovieDiv.innerHTML = `
            <h2>${data[i].title} (${data[i].releaseyear})</h2>
            <p>${data[i].content}</p>
            <p>This movie matches your interests by ${Math.round(Number(data[i].similarity)*100)}%</p>
            <button id='next-movie-btn'>Next Movie</button>
            `
        } else {
            nextMovieBtn.style.display = 'none'
        }
    })
}
