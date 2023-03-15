import LocalStorageOperations from "./storage";
const storage = new LocalStorageOperations();

export default class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    } 

    saveTodo() {
        storage.saveTodo(this)
        console.log('Todo saved to local storage')
    }

    deleteTodo() {
        storage.deleteTodo(this)
        console.log('Todo deleted')
    }

    updateTodo(todo) {
        storage.updateTodo(this, todo)
        console.log('Todo updated')
    }
}