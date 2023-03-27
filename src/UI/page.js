import './style.css';
import { createHeader } from './header.js';
import createSideBar from './sidebar.js';
import ContentCreator from './content.js';
const contentCreator = new ContentCreator();

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
    footer.innerHTML = `<p>Copyright © Ikem-Coded-It ${new Date().getFullYear()}</p><i class="fa-solid fa-github"></i>`;

    body.appendChild(header)
    body.appendChild(sideBar)
    body.appendChild(content)
    body.appendChild(footer)
}