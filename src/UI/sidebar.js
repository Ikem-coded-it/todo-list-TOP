import LocalStorageOperations from '../storage.js'; 
import ContentCreator from './content.js';
import DateTodoFetchOperations from '../date.js';
import Project from '../project.js';
const storage = new LocalStorageOperations();
const content = new ContentCreator();
const date = new DateTodoFetchOperations();
const project = new Project();

export default function createSideBar () {
    const content = document.createElement('div');
    const sideBarStuff = document.createElement('div')

    const allTasksContainer = document.createElement('div')
    const todayContainer = document.createElement('div')
    const next7DaysContainer = document.createElement('div')
    const projectsContainer = document.createElement('div')

    content.classList.add('side-bar-content')

    sideBarStuff.classList.add('side-bar-stuff')

    allTasksContainer.innerHTML = 
    '<i class="fa-solid fa-list-check" ></i> \
    <div class"all-tasks" >All tasks</div>';
    listener.getAllTasksEvent(allTasksContainer)

    todayContainer.innerHTML = 
    '<i class="fa-solid fa-calendar-week" ></i> \
    <div class"today-tasks-btn" >Today</div>';
    listener.getTodayTasks(todayContainer);

    next7DaysContainer.innerHTML =
    '<i class="fa-regular fa-calendar-days"></i> \
    <div class"nsd-tasks-btn" >Next 7 days</div>';
    listener.getWeeklyTasks(next7DaysContainer);

    projectsContainer.innerHTML =
    `<div> \
        <i class="fa-solid fa-plus" ></i> \
        <div class="projects">Projects</div> \
        <i class="fas fa-caret-down" ></i> \
    </div>`;
    projectsContainer.appendChild(newProjectForm())
    projectsContainer.appendChild(makeProjects())
    projectsContainer.setAttribute('id', 'projects-container')
    listener.showProjectForm(projectsContainer.childNodes[0].childNodes[1])
    listener.viewAllProjects(projectsContainer.childNodes[0].childNodes[5])

    sideBarStuff.appendChild(allTasksContainer)
    sideBarStuff.appendChild(todayContainer)
    sideBarStuff.appendChild(next7DaysContainer)
    sideBarStuff.appendChild(projectsContainer)

    content.appendChild(sideBarStuff)
    return content;
}

function newProjectForm() {
    let formContainer = document.createElement('div')
    let form = document.createElement('form');
    form.classList.add('project-form')
    form.innerHTML = '<input type="text" placeholder="Project name"><button type="submit">Add</button>';
    listener.addNewProject(form)
    formContainer.appendChild(form)
    formContainer.classList.add('project-form-container')
    return formContainer;
}

function makeProjects() {
    const projectList = document.createElement('ul');
    projectList.classList.add('project-list')
    projectList.classList.add('hide-projects')

    const { projects } = storage.getAll();
    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.textContent = `${project.name}`;
        projectList.appendChild(projectItem);
    })

    return projectList;
}

function listen() {
    const getAllTasksEvent = function(allTasksButton) {
        allTasksButton.addEventListener('click', () => {
            let allTasks = content.createTodoList()
            updateTodoList(allTasks);
        })
        return
    }

    const getTodayTasks = function(todayTasksButton) {
        todayTasksButton.addEventListener('click', () => {
            let todayTodos = date.fetchTodayTodos()
            let todayTodoList = content.createTodoList(todayTodos)
            updateTodoList(todayTodoList);
        })
        return
    }

    const getWeeklyTasks = function(next7DaysButton) {
        next7DaysButton.addEventListener('click', () => {
            let weeksTasks = date.fetchNext7DaysTodos()
            let sevenDaysTodoList = content.createTodoList(weeksTasks)
            updateTodoList(sevenDaysTodoList);
        })
    }

    const showProjectForm = function(newProjectButton) {
        newProjectButton.addEventListener('click', () => {
            let formContainer = document.getElementsByClassName('project-form-container')[0]
            let projectList = document.getElementsByClassName('project-list')[0]
            if (projectList.classList.length > 1) {
                projectList.classList.remove('display')
            }
            formContainer.classList.toggle('display');
        })
        return
    }

    const viewAllProjects = function(dropdownButton) {
        dropdownButton.addEventListener('click', () => {
            let todoListContainer = document.getElementsByClassName('project-list')[0]
            let formContainer = document.getElementsByClassName('project-form-container')[0];
            if (formContainer.classList.length > 1) {
                formContainer.classList.remove('display')
            }
            todoListContainer.classList.toggle('display')
        })
        return
    }

    const addNewProject = function(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let newProject = new Project(form.childNodes[0].value)
            newProject.saveProject()
            let formContainer = document.getElementsByClassName('project-form-container')[0];
            if (formContainer.classList.length > 1) {
                formContainer.classList.remove('display')
            }
            updateProjectList()
        })
        return
    }

    /**
     * HELPERS
     */

    const updateTodoList = function(todoList) {
        let todoContainer = document.getElementsByClassName('todo-container')[0]
        todoContainer.removeChild(todoContainer.childNodes[1]);
        todoContainer.appendChild(todoList);
        return;
    }

    const updateProjectList = function() {
        let newProjectList = makeProjects()
        let oldProjectList = document.getElementsByClassName('project-list')[0]

        let projectListContainer = oldProjectList.parentElement
        projectListContainer.removeChild(oldProjectList);
        projectListContainer.appendChild(newProjectList);
        return;
    }

    return {
        getAllTasksEvent,
        getTodayTasks,
        getWeeklyTasks,
        showProjectForm,
        viewAllProjects,
        addNewProject,
    }

}

const listener = listen()