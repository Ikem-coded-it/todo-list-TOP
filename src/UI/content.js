import LocalStorageOperations from "../storage";
import Todo from '../todo.js';
import formFunctions from './form.js'
const storage = new LocalStorageOperations();

export default class ContentCreator {
    noteSection = document.createElement('div');
    todoSection = document.createElement('div');

    createSections() {
        const content = document.createElement('div')
        content.classList.add('main-content')

        this.noteSection.textContent = 'Notes'
        this.noteSection.classList.add('notes-section');

        this.todoSection = document.createElement('div');
        this.todoSection.classList.add('todos-section');

        let { form } = formFunctions()
        listener.submit(form)

        this.todoSection.appendChild(form)
        this.todoSection.appendChild(this.createAllTasksContent())

        content.appendChild(this.noteSection)
        content.appendChild(this.todoSection)

        return content;
    }

    createAllTasksContent() {
        const todoContainer = document.createElement('div')
        const todoHeading = document.createElement('h3')

        todoContainer.classList.add('todo-container');

        todoHeading.textContent = 'Get Busy';

        let todoList = this.createTodoList()

        todoContainer.appendChild(todoHeading);
        todoContainer.appendChild(todoList);

        return todoContainer
    }

     createTodoList() {
        let { todos, projects } = storage.getAll();
        let projectTodos = []
        projects.forEach(project => {
            if (project.todos.length > 0) {
                project.todos.forEach(todo => projectTodos.push(todo))
            }
        });

        const allTodos = todos.concat(projectTodos)
     
        const todoList = document.createElement('ul')
        todoList.classList.add('todo-list')
        allTodos.forEach(todo => {
            const todoItem = document.createElement('li')
            todoItem.classList.add('todo-item')
            todoItem.innerHTML = `\<input type="checkbox" >${todo.title}<div class="todo-icons-container"> \
                <i class="fa-solid fa-star ${todo.priority}" ></i> \
                <svg class="trash-can" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M19 6h-3.5l-1-1h-5l-1 1H5v2h14zM8 19v-9h2v9H8zm4 0v-9h2v9h-2zm4 0v-9h2v9h-2z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </div>`;
            listener.showDetails(todoItem, todo)

            todoList.appendChild(todoItem);
        })
        return todoList;
    }

    updateTodoList() {
   
        const todosParent = document.getElementsByClassName('todo-container')[0]
        const todos = todosParent.childNodes[1]

        todosParent.removeChild(todos)

        let newTodoList = this.createTodoList()

        todosParent.appendChild(newTodoList);
    }

    changeNoteContent(newContent) {
        this.noteSection.removeChild(this.noteSection.firstChild)
        this.noteSection.appendChild(newContent)
    }

}

// Returns event listener functions
function listen() {
    let submit = function(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let { todos } = storage.getAll()
            let values = []
            let elements = form.elements;
            [...elements].forEach(element => {
                values.push(element.value)
            })

            todos.forEach(todo => {
                if (todo.title == values[0]) alert('Todo exists already.')
                return
            })

            if (values[0] == '' || values[0] == null) return

            let todo = new Todo(
                values[0],
                values[1],
                values[2],
                values[3]
            )
            todo.saveTodo()
            let content = new ContentCreator()
            content.updateTodoList()

            let { emptyForm } = formFunctions();
            emptyForm();
        })
        return
    }

    let showDetails = (todoItem, todo) => {
        let { displayForm } = formFunctions();
        todoItem.addEventListener('click', () => displayForm(todo))
        return;
    }

    return {
        submit,
        showDetails
    }
}

const listener = listen()