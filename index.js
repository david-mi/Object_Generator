const inputDiv = document.querySelector('input');
const objDiv = document.querySelector('.object-container')
const instructDiv = document.querySelector('.instruction')

let obj = {};
let key = ''
let type = ''
let name = ''


const showObj = () => `${type} ${name ? name + ' = ' : ''} ${JSON.stringify(obj, undefined, 1)}`

const validateKey = e => (e.length > 2 && e.length < 10) && /^[a-zA-Z]+$/.test(e)


inputDiv.addEventListener('keypress', (e) => {
  let input = e.target.value
  let info = instructDiv.innerText
  if (e.key == 'Enter') {
    if (info == 'TYPE' && (input == 'const' || input == 'let')) {
      type = input
      instructDiv.innerText = 'NAME'
      console.log(info)
    } else if (info == 'NAME' && validateKey(input)) {
      name = input
      instructDiv.innerText = 'KEY'
    } else if (input && info == 'VALUE') {
      obj[key] = input.trim()
      key = ''
      instructDiv.innerText = 'KEY'
      navigator.clipboard.writeText(showObj())
    } else if (info == 'KEY' && validateKey(input)) {
      obj[input] = ''
      key = input
      instructDiv.innerText = 'VALUE'
    }
    e.target.value = null
    objDiv.innerText = showObj()
    console.log(obj)
  }
})

