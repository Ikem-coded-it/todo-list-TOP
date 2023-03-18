import LocalStorageOperations from "../storage";
import createForm from './form.js'
const storage = new LocalStorageOperations();

export default class Content {
    noteSection = document.createElement('div');
    todoSection = document.createElement('div');

    createSections() {
        const content = document.createElement('div')
        content.classList.add('main-content')

        this.noteSection.textContent = 'Notes'
        this.noteSection.classList.add('notes-section');

        this.todoSection = document.createElement('div');
        this.todoSection.classList.add('todos-section');
        this.todoSection.appendChild(createForm())
        this.todoSection.appendChild(this.createAllTasksContent())

        content.appendChild(this.noteSection)
        content.appendChild(this.todoSection)

        return content;
    }

    changeTodoContent(newContent) {
        this.todoSection.removeChild(this.todoSection.firstChild)
        this.todoSection.appendChild(newContent)
    }

    changeNoteContent(newContent) {
        this.noteSection.removeChild(this.noteSection.firstChild)
        this.noteSection.appendChild(newContent)
    }

    createAllTasksContent() {
        const { todos } = storage.getAll();
        const todoContainer = document.createElement('div')
        const todoHeading = document.createElement('h3')
        const todoList = document.createElement('ul')

        todoContainer.classList.add('todoContainer');

        todoHeading.textContent = 'Get Busy';

        todos.forEach(todo => {
            const todoItem = document.createElement('li')
            todoItem.innerHTML = ` \
            <input type="checkbox" >\
            ${todo.title}
            <i class="fa-solid fa-star ${todo.priority}" ></i>`;

            todoList.appendChild(todoItem);
        })

        todoContainer.appendChild(todoHeading);
        todoContainer.appendChild(todoList);

        return todoContainer
    }

}