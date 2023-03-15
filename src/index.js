import Todo from './todo.js';
import Project from './project.js';
import LocalStorageOperations from './storage.js';
import DateTodoFetchOperations from './date.js';
import testInput from './UI/input.js';
const storage = new LocalStorageOperations();
const dateTodoOps = new DateTodoFetchOperations();


const todo1 = new Todo('john', 'fat', 'tomorrow', 'stuff')
const todo2 = new Todo('mike', 'fat', 'tomorrow', 'stuff')
const todo3 = new Todo('mike', 'fat', '2023-03-15', 'stuff')
const project1 = new Project('work')
const project2 = new Project('home')


storage.initializeStorage()
todo1.saveTodo()
todo2.saveTodo()
todo3.saveTodo()
project1.saveProject()
project2.saveProject()

testInput()

dateTodoOps.fetchTodayTodos()