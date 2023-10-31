import './style.sass'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="text-7xl">Hello Sofia 21!</h1>
    <div class="card">
      <button id="counter" class="bg-green-700 p-8 text-3xl text-white rounded-2xl shadow-2xl" type="button"></button>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))
