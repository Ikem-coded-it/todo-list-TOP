import LocalStorageOperations from './storage.js';
import initializeUI from './UI/page.js';
import Project from './project.js';
import Todo from './todo.js';
const storage = new LocalStorageOperations();
 

storage.initializeStorage()

const project1 = new Project('work', [new Todo('Code stuff', 'from project', '2023-05-06', 'high'), 
    new Todo('work things', 'from project', '2023-05-06', 'high')])
const project2 = new Project('gym', [new Todo('Gym Stuff', 'from project', '2023-05-06', 'high'), 
    new Todo('School stuff', 'from project', '2023-05-06', 'high')])
const project3 = new Project('school')
const project4 = new Project('Todo app')
const project5 = new Project('accounting')
const project6 = new Project('hooping')

const todo1 = new Todo('stuff', 'very hard to do', '2023-03-21', 'high');
const todo2 = new Todo('some work', 'simplework', '2023-03-21', 'low');
const todo3 = new Todo('school', 'do homework', '2023-09-15', 'medium');
const todo5 = new Todo('code', 'do this project', '2020-08-12', 'high');
const todo6 = new Todo('watch anime', 'do this task', '2023-03-22', 'high');
const todo7 = new Todo('do dishes', 'do this task', '2023-03-23', 'high');
const todo8 = new Todo('play music', 'do this task', '2023-03-24', 'high');
const todo9 = new Todo('press phone', 'do this task', '2023-03-25', 'high');
const todo10 = new Todo('eat food', 'do this task', '2023-03-26', 'high');
const todo11 = new Todo('tweet', 'do this task', '2023-03-27', 'high');
const todo12 = new Todo('whatsapp', 'do this task', '2023-03-28', 'high');
const todo13 = new Todo('watch movie', 'do this task', '2023-03-29', 'high');
const todo14 = new Todo('eatjdcnkwnovn;oJVOIAJVONWRIFJOIWRJFOIJWROIFJOIEWJFIWEJSDNVLKNDLVLSDMVLDFVLIDFLIVLIV', 'find some food coz im starving', '2020-11-6', 'medium');

// project1.saveProject()
// project2.saveProject()
project3.saveProject()
project4.saveProject()
project5.saveProject()
project6.saveProject()

todo1.saveTodo()
todo2.saveTodo()
todo3.saveTodo()
todo6.saveTodo()
todo7.saveTodo()
todo8.saveTodo()
todo9.saveTodo()
todo10.saveTodo()
todo11.saveTodo()
todo12.saveTodo()
todo13.saveTodo()
// todo5.saveTodo()
 
 

initializeUI()