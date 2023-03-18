import LocalStorageOperations from './storage.js';
import initializeUI from './UI/page.js';
import {determineGreeting} from './UI/header';
const storage = new LocalStorageOperations();
import Project from './project.js';
import Todo from './todo.js';

storage.initializeStorage()

const project1 = new Project('work')
const project2 = new Project('gym')
const project3 = new Project('school')
const project4 = new Project('Todo app')
const project5 = new Project('accounting')
const project6 = new Project('hooping')

const todo1 = new Todo('stuff', 'very hard to do', '2023-5-6', 'high');
const todo2 = new Todo('some work', 'simplework', '1995-7-6', 'low');
const todo3 = new Todo('school', 'do homework', '2023-5-14', 'medium');
const todo4 = new Todo('code', 'do this project', '2020-5-6', 'high');
const todo5 = new Todo('walk', 'walk somewhere', '2012-5-6', 'high');
const todo6 = new Todo('run', 'run a little bit', '2028-5-11', 'low');
const todo7 = new Todo('eat', 'find some food coz im starving', '2020-11-6', 'medium');
const todo8 = new Todo('eatjdcnkwnovn;oJVOIAJVONWRIFJOIWRJFOIJWROIFJOIEWJFIWEJSDNVLKNDLVLSDMVLDFVLIDFLIVLIV', 'find some food coz im starving', '2020-11-6', 'medium');

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
todo5.saveTodo()
todo6.saveTodo()
todo7.saveTodo()
// todo8.saveTodo()

initializeUI()