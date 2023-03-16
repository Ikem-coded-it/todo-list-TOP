import LocalStorageOperations from './storage.js';
import initializeUI from './UI/page.js';
import {determineGreeting} from './UI/header';
const storage = new LocalStorageOperations();
import Project from './project.js'

storage.initializeStorage()

const project1 = new Project('work')
const project2 = new Project('gym')
const project3 = new Project('school')

project1.saveProject()
project2.saveProject()
project3.saveProject()

initializeUI()