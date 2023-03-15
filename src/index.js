import Todo from './todo.js';
import Project from './project.js';
import LocalStorageOperations from './storage.js';
const storage = new LocalStorageOperations();

const todo1 = new Todo('john', 'fat', 'tomorrow', 'stuff')
const todo2 = new Todo('mike', 'fat', 'tomorrow', 'stuff')
const project1 = new Project('work')
const project2 = new Project('home')


storage.initializeStorage()
todo1.saveTodo()
todo2.saveTodo()
project1.saveProject()
project2.saveProject()

project1.addTodo(todo1)
project1.removeTodo(todo1)

storage.getAll()