import LocalStorageOperations from '../storage.js'; 
const storage = new LocalStorageOperations();

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

    todayContainer.innerHTML = 
    '<i class="fa-solid fa-calendar-week" ></i> \
    <div class"today-tasks-btn" >Today</div>';

    next7DaysContainer.innerHTML =
    '<i class="fa-regular fa-calendar-days"></i> \
    <div class"nsd-tasks-btn" >Next 7 days</div>';

    projectsContainer.innerHTML =
    `<div> \
        <i class="fa-solid fa-briefcase" ></i> \
        <div class="projects">Projects</div> \
        <i class="fas fa-caret-down" ></i> \
    </div>`;
    projectsContainer.appendChild(makeProjects())
    projectsContainer.setAttribute('id', 'projects-container')
    projectsContainer.addEventListener('click', () => {
        const projectList = document.getElementsByClassName('project-list')[0]
        console.log(projectList)
        projectList.classList.toggle('display');
    })

    sideBarStuff.appendChild(allTasksContainer)
    sideBarStuff.appendChild(todayContainer)
    sideBarStuff.appendChild(next7DaysContainer)
    sideBarStuff.appendChild(projectsContainer)

    content.appendChild(sideBarStuff)
    return content;
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