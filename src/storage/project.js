import LocalStorageOperations from "./storage";
const storage = new LocalStorageOperations();
import { v4 as uuidv4 } from 'uuid';

export default class Project {
    constructor(name, todos) {
        this.id = uuidv4()
        this.name = name;
        this.todos = todos ? todos : [];
    }

    saveProject() {
        storage.saveProject(this)
        console.log('project saved to local storage');
    }

    updateProject(newProject) {
        storage.updateProject(this, newProject)
        console.log('Project updated')
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