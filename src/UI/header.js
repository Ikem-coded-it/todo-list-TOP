const { Temporal } = require('@js-temporal/polyfill');

function createHeader() {
    const content = document.createElement('div');

    const logoContainer = document.createElement('div');
    const logoImage = document.createElement('div');
    const logoText = document.createElement('div');
    const greetingDateContainer = document.createElement('div');
    const greeting = document.createElement('div');
    const date = document.createElement('div');

    content.classList.add('header-content')

    logoContainer.classList.add('logo-container');

    logoImage.classList.add('logo-image')
    logoImage.innerHTML = '<i class="fa-regular fa-square-check" ></i>'

    logoText.classList.add('logo-text');
    logoText.textContent = 'Willdo';

    greetingDateContainer.classList.add('greeting-date-container')

    greeting.classList.add('greeting-container');
    greeting.textContent = determineGreeting();

    date.classList.add('date');
    date.textContent = determineDate();

    logoContainer.appendChild(logoImage)
    logoContainer.appendChild(logoText)
    greetingDateContainer.appendChild(greeting)
    greetingDateContainer.appendChild(date)
    content.appendChild(logoContainer)
    content.appendChild(greetingDateContainer)

    return content;
}

function determineGreeting() {
    const time = Temporal.Now.plainTimeISO().toString()
    let hour = parseInt(time.split(':')[0])

    let morningHours = [0,1,2,3,4,5,6,7,8,9,10,11];
    let afterNoonHours = [12,13,14,15,16,17];
    let eveningHours = [18,19,20,21,22,23];

    if (morningHours.includes(hour)) return 'Good morning';
    if (afterNoonHours.includes(hour)) return 'Good afternoon';
    if (eveningHours.includes(hour)) return 'Good evening';
}

function determineDate () {
    const date = Temporal.Now.plainDateISO().toString();
    return date;
}

module.exports = { createHeader }