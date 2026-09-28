import { openai, supabase } from './config.js';

const preForm = document.querySelector('#pre-form')
const header = document.querySelector('header')
const formDiv = document.getElementById('form-div')

preForm.addEventListener('submit', render_forms)

function render_forms(e) {
    e.preventDefault()

    const n = Number(document.getElementById('n').value)
    let i = 0
    const favoriteMovieArr = []
    const movieAgeArr = []
    const filmMoodArr = []

    formDiv.innerHTML = ''

    header.innerHTML = `
        <img src="img/logo.png">
        <h1>${i+1}</h1>`
    
    formDiv.innerHTML = `
            <form id="individual-form">
                <label class="individual-input-label">What’s your favorite movie and why?</label>
                <input type="text" placeholder="" id="favorite-movie">
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
            
                <button id='next-person-btn'>Next Person</button>
            </form>
    `
    const individualForm = document.querySelector('#individual-form')
    individualForm.addEventListener('submit', function(e){
        e.preventDefault()
        i++
        header.innerHTML = `
            <img src="img/logo.png">
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
                <img src="img/logo.png">`
            formDiv.style.display = 'none'
        }

        individualForm.reset()

    })
}