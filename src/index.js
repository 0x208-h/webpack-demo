import Header from './header.js'
import avatar from './avatar.jpg'
import './index.scss'

new Header();
console.log(avatar)

const img  = new Image
img.src = '../dist/' + avatar
img.classList.add('avatar')
// img.src = avatar
const root = document.getElementById('root')
root.append(img)