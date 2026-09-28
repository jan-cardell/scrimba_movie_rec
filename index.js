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

    formDiv.innerHTML = ''

    header.innerHTML = `
        <img src="img/logo.png">
        <h1>${i+1}</h1>`
    
    formDiv.innerHTML = `
            <form id="individual-form">
                <label class="individual-input-label">What’s your favorite movie and why?</label>
                <input type="text" placeholder="" id="favorite-movie">
                <label for="film-age" class="individual-input-label">Are you in the mood for something new or a classic?</label>
                <div id='film-age'>
                        <input type="radio" name="classic" id="classic" value="classic">
                        <label for="classic">Classic</label>
                        <input type="radio" name="new" id="new" value="new">
                        <label for="new">New</label>

                </div>
                <button id='next-person-btn'>Next Person</button>
            </form>
    `
    const individualForm = document.querySelector('#individual-form')
    individualForm.addEventListener('submit', function(e){
        e.preventDefault()
        i++
        if (i < n-1) {
            header.innerHTML = `
                <img src="img/logo.png">
                <h1>${i+1}</h1>`
            favoriteMovieArr.push(document.getElementById('favorite-movie').value)
        }
        if (i === n-1) {
            document.getElementById('next-person-btn').innerText = 'Get Movie'
            header.innerHTML = `
                <img src="img/logo.png">
                <h1>${i+1}</h1>`
            favoriteMovieArr.push(document.getElementById('favorite-movie').value)
        }

        if (i === n) {
            header.innerHTML = `
            <img src="img/logo.png">`
            
            formDiv.style.display = 'none'
            favoriteMovieArr.push(document.getElementById('favorite-movie').value)

        }
        console.log(favoriteMovieArr)
        individualForm.reset()

    })
}