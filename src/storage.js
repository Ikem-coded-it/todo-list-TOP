export default class LocalStorageOperations{

    storage = localStorage;

    initializeStorage() {
        // initialize todo and project arrays in local storage
        const todos = []
        const projects = []

        this.storage.setItem('todos', JSON.stringify(todos))
        this.storage.setItem('projects', JSON.stringify(projects))
        console.log('storage loaded')
        return
    }

    getAll() {
        const todos = JSON.parse(this.storage.getItem('todos'));
        const projects = JSON.parse(this.storage.getItem('projects'));
        console.log(todos)
        console.log(projects)
        return {todos, projects};
    }

    saveTodo(todo) {
        const todoDatabase = JSON.parse(this.storage.getItem('todos'));
        todoDatabase.push(todo)
        this.storage.setItem('todos', JSON.stringify(todoDatabase))
         
        return
    }

    deleteTodo(todoToDelete) {
        const todoDatabase = JSON.parse(this.storage.getItem('todos'));
        let todoIndex;
        todoDatabase.forEach(todo => {
            if (todo.title == todoToDelete.title &&
                todo.description == todoToDelete.description) {
                todoIndex = todoDatabase.indexOf(todo)
            }
        })
        todoDatabase.splice(todoIndex, 1);
        this.storage.setItem('todos', JSON.stringify(todoDatabase));
         
        return
    }

    updateTodo(oldTodo, newTodo) {
        const todoDatabase = JSON.parse(this.storage.getItem('todos'));

        // find todo in todo array
        const todo = todoDatabase.find(todo => todo.title === oldTodo.title && todo.description === oldTodo.description)

        if (!todo) {
            console,log('Todo does not exist');
            return
        };

        // update todo properties
        todo.title = newTodo.title
        todo.description = newTodo.description;
        todo.dueDate = newTodo.dueDate;
        todo.priority = newTodo.priority;

        this.storage.setItem('todos', JSON.stringify(todoDatabase));
        
        return
    }


    saveProject(project) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));
        projectDatabase.push(project);
        this.storage.setItem('projects', JSON.stringify(projectDatabase));

        return
    }

    addProjectTodo(projectToUpdate) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));
        const project = projectDatabase.find(project => project.name == projectToUpdate.name)

        if (!project) {
            console,log('Project does not exist');
            return
        };

        project.todos = projectToUpdate.todos

        this.storage.setItem('projects', JSON.stringify(projectDatabase));

        return
    }

    removeProjectTodo(todoToRemove, projectToRemoveFrom) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));
        const project = projectDatabase.find(project => project.name == projectToRemoveFrom.name)

        if (!project) {
            console,log('Project does not exist');
            return
        };

        let todoIndex;
        project.todos.forEach(todo => {
            if (todo.title == todoToRemove.title &&
                todo.description == todoToRemove.decription) {
                    todoIndex = project.todos.indexOf(todo)
            }
        })

        project.todos.splice(todoIndex, 1)

        this.storage.setItem('projects', JSON.stringify(projectDatabase))

        return
    }

    deleteProject(projectToDelete) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));
        let projectIndex;
        projectDatabase.forEach(project => {
            if (project.name == projectToDelete.name) {
                projectIndex = projectDatabase.indexOf(project)
            }
        })
        projectDatabase.splice(projectIndex, 1);
        this.storage.setItem('projects', JSON.stringify(projectDatabase));
         
        return
    }
}