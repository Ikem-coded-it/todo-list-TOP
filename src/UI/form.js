

export default function createForm () {
    const form = document.createElement('form');

    const titleInput = document.createElement('div')
    const descriptionInput = document.createElement('div')
    const dateInput = document.createElement('div')
    const priorityInput = document.createElement('div')
    const submitButton = document.createElement('button')

    titleInput.innerHTML = ' \
    <label for="title" >Title</label> \
    <input  type="text" name="title" class="title-input" >';

    descriptionInput.innerHTML = ' \
    <label for="description">Details</label> \
    <textarea name="description" class="description-input"></textarea>';

    dateInput.innerHTML = ' \
    <label for="date" >Due date</label> \
    <input type="date" name="date" class="date-input" >';

    priorityInput.innerHTML = ' \
    <label for="priority" >Priority</label> \
    <select name="priority" > \
        <option value="low" >Low</option> \
        <option value="medium" >Medium</option> \
        <option value="high" >High</option> \
    </select>';

    submitButton.setAttribute('type', 'submit')
    submitButton.textContent = 'Add todo'
    submitButton.classList.add('btn')

    // append inputs and labels to form
    form.appendChild(titleInput)
    form.appendChild(descriptionInput)
    form.appendChild(dateInput)
    form.appendChild(priorityInput)
    form.appendChild(submitButton)

    return form;
}