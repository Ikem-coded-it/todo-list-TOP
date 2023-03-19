import LocalStorageOperations from "./storage";
const storage = new LocalStorageOperations();

export default class Project {
    constructor(name, todos) {
        this.name = name;
        this.todos = todos ? todos : [];
    }

    saveProject() {
        storage.saveProject(this)
        console.log('project saved to local storage');
    }

    deleteProject() {
        storage.deleteProject(this)
        console.log('project deleted')
    }

    addTodo(newTodo) {
        this.todos.push(newTodo)
        storage.addProjectTodo(this)
        console.log(`Todo added to ${this.name} project`)
    }

    removeTodo(todo) {
        storage.removeProjectTodo(todo, this)
        console.log(`Todo removed from ${this.name} project`)
    }
}