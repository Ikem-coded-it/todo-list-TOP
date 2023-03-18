import './style.css';
import { createHeader } from './header.js';
import createSideBar from './sidebar.js';
import Content from './content.js';
const contentCreator = new Content();

export default function createWebsiteFrame() {
    const body = document.body;
    const header = document.createElement('div')
    const sideBar = document.createElement('div')
    const content = document.createElement('div')
    const footer = document.createElement('div')

    header.classList.add('header')
    header.appendChild(createHeader())

    sideBar.classList.add('side-bar')
    sideBar.appendChild(createSideBar())

    content.classList.add('content')
    content.appendChild(contentCreator.createSections());

    footer.classList.add('footer')
    footer.textContent = 'footer'

    body.appendChild(header)
    body.appendChild(sideBar)
    body.appendChild(content)
    body.appendChild(footer)
}