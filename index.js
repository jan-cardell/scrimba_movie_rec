import { openai, supabase } from './config.js';

const preForm = document.querySelector('#pre-form')

preForm.addEventListener('submit', render_forms)

function render_forms(e) {
    e.preventDefault()
    const n = document.getElementById('n').value
    console.log(n)
    for (let i = 0; i < n; i ++){
        // Save inputs from previous form, hide previous form, enable new form
    }
}