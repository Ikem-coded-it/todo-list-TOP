

export default function createForm () {
    const form = document.createElement('form');

    const titleInput = document.createElement('input')
    const descriptionInput = document.createElement('textarea')
    const dateInput = document.createElement('input')
    const priorityInput = document.createElement('select')
    const titleLabel = document.createElement('label')
    const descriptionLabel = document.createElement('label')
    const dateLabel = document.createElement('label')
    const priorityLabel = document.createElement('label')
    const submitButton = document.createElement('button')

    // add attributes
    titleInput.setAttribute('type', 'text')
    titleInput.setAttribute('name', 'title')
    titleInput.classList.add('title-input')

    dateInput.setAttribute('type', 'date')
    dateInput.setAttribute('name', 'date')
    dateInput.classList.add('date-input')

    descriptionInput.setAttribute('name', 'description')

    priorityInput.setAttribute('name', 'priority')
    priorityInput.innerHTML = '\
    <option value="low" >Low</option> \
    <option value="medium" >Medium</option> \
    <option value="high" >High</option>';

    titleLabel.setAttribute('for', 'title')
    descriptionLabel.setAttribute('for', 'description')
    dateLabel.setAttribute('for', 'date')
    priorityLabel.setAttribute('for', 'priority')

    submitButton.setAttribute('type', 'submit')
    submitButton.classList.add('btn')

    // append inputs and labels to form
    form.appendChild(titleLabel)
    form.appendChild(titleInput)
    form.appendChild(descriptionLabel)
    form.appendChild(descriptionInput)
    form.appendChild(dateLabel)
    form.appendChild(dateInput)
    form.appendChild(priorityLabel)
    form.appendChild(priorityInput)
    form.appendChild(submitButton)

    return form;
}