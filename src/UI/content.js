import LocalStorageOperations from "../storage/storage";
import Todo from '../storage/todo.js';
import Project from "../storage/project";
import formFunctions from './form.js';
import Note from '../storage/notes';
const storage = new LocalStorageOperations();

export default class ContentCreator {
    noteSection = document.createElement('div');
    todoSection = document.createElement('div');

    createSections() {
        const content = document.createElement('div')
        content.classList.add('main-content')

        this.noteSection.classList.add('notes-section');

        this.todoSection = document.createElement('div');
        this.todoSection.classList.add('todos-section');

        let { form } = formFunctions()
        listener.submit(form)

        this.todoSection.appendChild(form)
        this.todoSection.appendChild(this.createAllTasksContent())

        let notesHeadingContainer = document.createElement('div')
        notesHeadingContainer.innerHTML = '\
        <h3 class="notes-heading">Notes</h3>\
        <i class="fa-solid fa-plus notes-plus"></i>';
        listener.addNewNote(notesHeadingContainer.childNodes[3])
        notesHeadingContainer.classList.add('notes-heading-container');
        this.noteSection.appendChild(notesHeadingContainer)
        this.noteSection.appendChild(this.createAllNotesContent())

        content.appendChild(this.noteSection)
        content.appendChild(this.todoSection)

        return content;
    }

    createAllTasksContent() {
        const todoContainer = document.createElement('div')
        const todoHeading = document.createElement('h3')

        todoContainer.classList.add('todo-container');
        todoHeading.classList.add('todo-heading');

        todoHeading.textContent = 'Get Busy';

        let todoList = this.createTodoList();
        todoList.classList.add('todo-list')

        todoContainer.appendChild(todoHeading);
        todoContainer.appendChild(todoList);

        return todoContainer
    }

    // Takes todo objects and puts them in unordered list
     createTodoList(todos) {
        let allTodos;
        if (todos) {
            allTodos = todos
        } else {
            let { todos, projects } = storage.getAll();
            let projectTodos = []
            projects.forEach(project => {
                if (project.todos.length > 0) {
                    project.todos.forEach(todo => projectTodos.push(todo))
                }
            });

            allTodos = todos.concat(projectTodos)
        }
     
        const todoList = document.createElement('ul')
        todoList.classList.add('todo-list')

        allTodos.forEach(todo => {
            const todoItem = document.createElement('li')
            todoItem.classList.add('todo-item')
            todoItem.setAttribute('data-id', `${todo.id}`)
            todoItem.innerHTML = `<div class="check-title-container"><input type="checkbox" ><p >${todo.title}</p>\
            </div>\ 
            <div class="todo-icons-container">\
                <i class="fa-solid fa-star ${todo.priority}" ></i>\
                <i class="fa-solid fa-trash-can trash-can"></i>\
            </div>`;

            listener.showDetails(todoItem.childNodes[0].childNodes[1], todo)
            listener.deleteTodo(todoItem.childNodes[2].childNodes[3], todo)

            todoList.appendChild(todoItem);
        })
        return todoList;
    }

    //refreshes todo list after changes to a todo
    updateTodoList() {
   
        const todosParent = document.getElementsByClassName('todo-container')[0]
        const todos = todosParent.childNodes[1]

        todosParent.removeChild(todos)

        let newTodoList = this.createTodoList()

        todosParent.appendChild(newTodoList);
    }

    createAllNotesContent() {
        let notesContainer = document.createElement('div');
        notesContainer.classList.add('notes-container')

        let notes = storage.getAllNotes()
        let textAreaNotesContainer = notes.map((note) => {
            let textAreaContainer = document.createElement('div')
            textAreaContainer.innerHTML = `
            <textarea class="note-text-area">${note.body}</textarea>
            <i class="fa-solid fa-trash-can note-delete-btn"></i>`;
            textAreaContainer.classList.add('textarea-container');
            textAreaContainer.setAttribute('data-note-id', `${note.id}`)
            listener.oldNoteEdit(textAreaContainer.childNodes[1])
            listener.deleteNote(textAreaContainer.childNodes[3]);
            return textAreaContainer;
        })

        textAreaNotesContainer.forEach(textAreaContainer => {
            notesContainer.appendChild(textAreaContainer);
        })
        return notesContainer;
    }

    updateNotesList() {
        let notesSection = document.getElementsByClassName('notes-section')[0]
        let notesContainer = document.getElementsByClassName('notes-container')[0]
        notesSection.removeChild(notesContainer);
        notesSection.appendChild(this.createAllNotesContent());
    }
}

// Returns event listener functions
function listen() {
    
    const submit = function(form) {
        form.addEventListener('submit', (e) => onSubmit(e, form)) // "onSubmit (line 177 - 273)"
        return
    }

    const showDetails = (todoItem, todo) => {
        let { displayForm } = formFunctions();
        todoItem.addEventListener('click', () => displayForm(todo))
        return;
    }

    const deleteTodo = (deleteButton, todo) => {
        deleteButton.addEventListener('click', () => {
            let { todos, projects } = storage.getAll();
            let todoId = todo.id;

             // Delete a todo thats under a project
            let propertyAssignedProject
            projects.forEach(project => {
                if (project.todos.length > 0) {
                    project.todos.forEach(todo => {
                        if (todo.id == todoId) {
                            propertyAssignedProject = Object.assign(new Project(), project)
                        } 
                    })
                }
            });

            if (propertyAssignedProject) {
                propertyAssignedProject.removeTodo(todo)
                let content = new ContentCreator()
                content.updateTodoList();
                return
            }
            
            let propertyAssignedTodo;
            todos.forEach(task => {
                if (task.id == todo.id) {
                    propertyAssignedTodo = Object.assign(new Todo(), task)
                }
            })

            if (propertyAssignedTodo) {
                propertyAssignedTodo.deleteTodo()
            }
            let content = new ContentCreator()
            content.updateTodoList();
            return
        })
    }

    const addNewNote = function(newNoteButton) {
        newNoteButton.addEventListener('click', () => {
            let notesContainer = document.getElementsByClassName('notes-container')[0];
            let textAreaContainer = document.createElement('div')
            textAreaContainer.innerHTML = '\
            <textarea class="note-text-area"></textarea>\
            <i class="fa-solid fa-trash-can note-delete-btn"></i>';
            textAreaContainer.classList.add('textarea-container');
            deleteNote(textAreaContainer.childNodes[3]);

            notesContainer.appendChild(textAreaContainer);
            let newNote = new Note(
                textAreaContainer.childNodes[1].value
            )
            newNote.saveNote();
            textAreaContainer.setAttribute('data-note-id', `${newNote.id}`)
            oldNoteEdit(textAreaContainer.childNodes[1])
            textAreaContainer.childNodes[1].focus()
        })
        return;
    }

    const deleteNote = function(deleteNoteButton) {
        deleteNoteButton.addEventListener('click', (e) => {
            let noteId = e.target.parentElement.getAttribute('data-note-id');
            storage.deleteNote(noteId);
            let content = new ContentCreator()
            content.updateNotesList()
        })
        return;
    }
 
    const oldNoteEdit = function(textArea) {
        textArea.addEventListener('focusout', (e) => {
            let noteId = e.target.parentElement.getAttribute('data-note-id');
            if (noteId) {
                let note = storage.getSingleNote(noteId);
                let propertyAssignedNote = Object.assign(new Note(), note)
                let newNote = new Note(
                    e.target.value
                )
                propertyAssignedNote.updateNote(newNote)
            }
        })
        return;
    }
 
 
    const onSubmit = (e, form) => {
        e.preventDefault()
        /**
         * ==================================================================================================
         * Run this if to edit todo
         */
        if (form.classList[1] == 'edit-form') {
            let { todos, projects } = storage.getAll();
            let todoId = form.getAttribute('data-id')

            // run this if editing project todo
            let propertyAssignedProject
            projects.forEach(project => {
                if (project.todos.length > 0) {
                    project.todos.forEach(todo => {
                        if (todo.id == todoId) {
                            todo.title = form.titleInput.value,
                            todo.description = form.descriptionInput.value,
                            todo.dueDate = form.dateInput.value,
                            todo.priority = form.priorityInput.value,
            
                            propertyAssignedProject = Object.assign(new Project(), project)
                        } 
                    })
                }
            });
             

            if (propertyAssignedProject) {
                let newProject = new Project(
                    propertyAssignedProject.name,
                    propertyAssignedProject.todos
                )
                propertyAssignedProject.updateProject(newProject)
                finalizeUpdate(form)
                return
            }

            // Update todo that's under default todos 
            let editableTodo
            todos.forEach(todo => {
                if (todo.id == todoId) editableTodo = todo;
            })

            let propertyAssignedTodo = Object.assign(new Todo(), editableTodo)
            let newTodo = new Todo(
                form.titleInput.value,
                form.descriptionInput.value,
                form.dateInput.value,
                form.priorityInput.value,
            )

            propertyAssignedTodo.updateTodo(newTodo)
            finalizeUpdate(form)
            return
        }

        /**
         * ==================================================================================================
         * Run this if to add new todo
         */

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
         
        let projectId = form.getAttribute('data-project-id')
        if (projectId) {
            let projectToUpdate = storage.getSingleProject(projectId);
            let propertyAssignedProjectToUpdate = Object.assign(new Project(), projectToUpdate);
            propertyAssignedProjectToUpdate.addTodo(todo)
            form.removeAttribute('data-project-id');
            finalizeUpdate(form)
            return
        }
         
        todo.saveTodo()
        finalizeUpdate(form)

    } // end of 'onSubmit' function--------------------------------------------------------------


     // Helper functions
    const finalizeUpdate = (form) => {
        let content = new ContentCreator()
        content.updateTodoList()
        formFunctions().emptyForm(form)
        if (form.classList[1] == 'edit-form') {
            form.classList.remove('edit-form');
            form.childNodes[3].textContent = 'Add'
        }    
    }

    return {
        submit,
        showDetails,
        deleteTodo,
        addNewNote,
        deleteNote,
        oldNoteEdit,
    }
}

const listener = listen()
export { listener as formListener };