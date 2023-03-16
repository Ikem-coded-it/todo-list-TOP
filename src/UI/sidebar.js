import LocalStorageOperations from '../storage.js'; 
const storage = new LocalStorageOperations();

export default function createSideBar () {
    const content = document.createElement('div');

    const allTasksContainer = document.createElement('div')
    const todayContainer = document.createElement('div')
    const next7DaysContainer = document.createElement('div')
    const projectsContainer = document.createElement('div')

    content.classList.add('side-bar-content')

    allTasksContainer.innerHTML = 
    '<i></i> \
    <div class"all-tasks" >All tasks</div>';

    todayContainer.innerHTML = 
    '<i></i> \
    <div class"today-tasks-btn" >Today</div>';

    next7DaysContainer.innerHTML =
    '<i></i> \
    <div class"nsd-tasks-btn" >Next 7 days</div>';

    projectsContainer.innerHTML =
    `<div><i></i><div class="projects">Projects</div></div>`;
    projectsContainer.appendChild(makeProjects())

    content.appendChild(allTasksContainer)
    content.appendChild(todayContainer)
    content.appendChild(next7DaysContainer)
    content.appendChild(projectsContainer)

    return content;
}

function makeProjects() {
    const projectList = document.createElement('ul');
    projectList.classList.add('project-list')

    const { projects } = storage.getAll();
    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.textContent = `${project.name}`;
        projectList.appendChild(projectItem);
    })

    return projectList;
}