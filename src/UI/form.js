import ContentCreator from "./content";

export default function formFunctions () {
    const form = document.createElement('form');
    form.classList.add('todo-form')

    const titleInput = document.createElement('div')
    const descriptionInput = document.createElement('div')
    const datePriorityInput = document.createElement('div')
    const dateInput = document.createElement('div')
    const priorityInput = document.createElement('div')
    const submitButton = document.createElement('button')

    titleInput.innerHTML = ' \
    <label for="title" >Title \
    </label> \
    <input id="titleInput"  type="text" name="title" class="title-input" >';

    descriptionInput.innerHTML = ' \
    <label for="description">Details \
    </label> \
    <textarea id="descriptionInput" name="description" class="description-input"> \
    </textarea>';

    datePriorityInput.setAttribute('id', 'date-priority-input-container')
    dateInput.innerHTML = ' \
    <label for="date" >Due date \
    </label> \
    <input id="dateInput" type="date" name="date" class="date-input" >';

    priorityInput.innerHTML = ' \
    <label for="priority" >Priority</label> \
    <select id="priorityInput" name="priority" > \
        <option value="low" selected="selected">Low</option> \
        <option value="medium" >Medium</option> \
        <option value="high" >High</option> \
    </select>';

    submitButton.setAttribute('type', 'submit')
    submitButton.classList.add('submit-btn')
    submitButton.textContent = 'Add';

    datePriorityInput.appendChild(dateInput)
    datePriorityInput.appendChild(priorityInput)

    // append inputs and labels to form
    form.appendChild(titleInput)
    form.appendChild(descriptionInput)
    form.appendChild(datePriorityInput)
    form.appendChild(submitButton)

    const emptyForm = () => {
        let filledForm = document.getElementsByClassName('todo-form')[0]
        filledForm.titleInput.value = '';
        filledForm.descriptionInput.value = '';
        filledForm.dateInput.value = '';
        filledForm.priorityInput.value = 'low';
    }

    const displayForm = (todo) => {
        let display = document.getElementsByClassName('todo-form')[0];
         
        display.titleInput.value = todo.title;
        display.descriptionInput.value = todo.description;
        display.dateInput.value = todo.dueDate;
        display.priorityInput.value = todo.priority;


        display.classList.add('edit-form')
        display.childNodes[3].textContent = 'Edit';
        display.setAttribute('data-id', `${todo.id}`)
 
        return display;
    }

    return { 
        form, 
        emptyForm,
        displayForm
    };
}