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
const todo4 = new Todo('mike', 'fat', '2023-03-16', 'stuff')
const todo5 = new Todo('mike', 'fat', '2023-03-15', 'stuff')
const todo6 = new Todo('mike', 'fat', '2023-03-18', 'stuff')
const todo7 = new Todo('mike', 'fat', '2023-03-19', 'stuff')
const todo8 = new Todo('mike', 'fat', '2023-03-17', 'stuff')
const todo9 = new Todo('mike', 'fat', '2023-03-20', 'stuff')
const todo10 = new Todo('mike', 'fat', '2023-03-21', 'stuff')
const todo11 = new Todo('mike', 'fat', '2023-03-22', 'stuff')
const todo12 = new Todo('mike', 'fat', '2023-03-23', 'stuff')
const project1 = new Project('work')
const project2 = new Project('home')

storage.initializeStorage()
todo1.saveTodo()
todo2.saveTodo()
todo3.saveTodo()
todo4.saveTodo()
todo5.saveTodo()
todo6.saveTodo()
todo7.saveTodo()
todo8.saveTodo()
todo9.saveTodo()
todo10.saveTodo()
todo11.saveTodo()
todo12.saveTodo()

testInput()

dateTodoOps.fetchNext7DaysTodos()