import LocalStorageOperations from './storage.js';
import initializeUI from './UI/page.js';
import Project from './project.js';
import Todo from './todo.js';
const storage = new LocalStorageOperations();
 

storage.initializeStorage()

const project1 = new Project('work', [new Todo('projectTodo', 'from project', '2023-05-06', 'high'), 
    new Todo('Projecttodo2', 'from project', '2023-05-06', 'high')])
const project2 = new Project('gym')
const project3 = new Project('school')
const project4 = new Project('Todo app')
const project5 = new Project('accounting')
const project6 = new Project('hooping')

const todo1 = new Todo('stuff', 'very hard to do', '2023-05-06', 'high');
const todo2 = new Todo('some work', 'simplework', '1995-11-05', 'low');
const todo3 = new Todo('school', 'do homework', '2023-09-15', 'medium');
const todo4 = new Todo('code', 'do this project', '2020-08-12', 'high');
const todo5 = new Todo('eatjdcnkwnovn;oJVOIAJVONWRIFJOIWRJFOIJWROIFJOIEWJFIWEJSDNVLKNDLVLSDMVLDFVLIDFLIVLIV', 'find some food coz im starving', '2020-11-6', 'medium');

project1.saveProject()
project2.saveProject()
project3.saveProject()
project4.saveProject()
project5.saveProject()
project6.saveProject()

todo1.saveTodo()
todo2.saveTodo()
todo3.saveTodo()
todo4.saveTodo()
// todo5.saveTodo()
 
 

initializeUI()