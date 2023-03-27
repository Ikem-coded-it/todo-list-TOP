export default class LocalStorageOperations{

    storage = localStorage;

    initializeStorage() {
        // initialize todo and project arrays in local storage
        const todos = []
        const projects = []
        const notes = []

        this.storage.setItem('todos', JSON.stringify(todos))
        this.storage.setItem('projects', JSON.stringify(projects))
        this.storage.setItem('notes', JSON.stringify(notes))
        console.log('storage loaded')
        return
    }

    getAll() {
        const todos = JSON.parse(this.storage.getItem('todos'));
        const projects = JSON.parse(this.storage.getItem('projects'));
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
        const projectTodDatabase = JSON.parse(this.storage.getItem('projects'))

        let projectTodos = []
        projectTodDatabase.forEach(project => {
             if (project.todos.length > 0) {
                project.todos.forEach(todo => projectTodos.push(todo))
            }
        })
        let allTodos = todoDatabase.concat(projectTodos)

        // find todo in todo array
        const todo = allTodos.find(todo => todo.id === oldTodo.id)

        if (!todo) {
            alert('Todo does not exist');
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

    getSingleProject(projectId) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));
        let project = projectDatabase.find(project => project.id == projectId);
        return project;
    }


    saveProject(project) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));
        projectDatabase.push(project);
        this.storage.setItem('projects', JSON.stringify(projectDatabase));

        return
    }

    updateProject(oldProject, newProject) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));

        let project = projectDatabase.find(project => project.id == oldProject.id)
        if (!project) {
            alert('Project does not exist')
            return
        } 
 
        project.name = newProject.name
        project.todos = newProject.todos
 
        this.storage.setItem('projects', JSON.stringify(projectDatabase))
        return
    }

    addProjectTodo(projectToUpdate) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));
        const project = projectDatabase.find(project => project.id == projectToUpdate.id)

        if (!project) {
            alert('Project does not exist');
            return
        };

        project.todos = projectToUpdate.todos

        this.storage.setItem('projects', JSON.stringify(projectDatabase));

        return
    }

    removeProjectTodo(todoToRemove, projectToRemoveFrom) {
        const projectDatabase = JSON.parse(this.storage.getItem('projects'));
        const project = projectDatabase.find(project => project.id == projectToRemoveFrom.id)

        if (!project) {
            alert('Project does not exist');
            return
        };

        let todoIndex;
        project.todos.forEach(todo => {
            if (todo.id == todoToRemove.id ) {
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

    // STORAGE OPERATION FOR NOTES ------------------------------------------------------

    getAllNotes() {
        let notes = JSON.parse(this.storage.getItem('notes'));
        if (!notes) {
            alert('No notes found')
            return
        }
        return notes;
    }

    getSingleNote(id) {
        let allNotes = JSON.parse(this.storage.getItem('notes'));
        let note = allNotes.find(note => note.id == id);
        if (!note) {
            alert('Note does not exist')
            return
        }
        return note;
    }

    saveNote(note) {
        let allNotes = this.getAllNotes();
        allNotes.push(note)
        this.storage.setItem('notes', JSON.stringify(allNotes));
    }

    updateNote(newNote, oldNote) {
        let allNotes = this.getAllNotes();

        let note = allNotes.find(note => note.id == oldNote.id)
        if (!note) {
            alert('Note does not exist')
            return
        }
 
        note.body = newNote.body
 
        this.storage.setItem('notes', JSON.stringify(allNotes))
        return
    }

    deleteNote(id) {
        let allNotes = this.getAllNotes();
        allNotes.forEach(note => {
            if (note.id == id) {
                let noteIndex = allNotes.indexOf(note)
                allNotes.splice(noteIndex, 1)
            }
        })
        this.storage.setItem('notes', JSON.stringify(allNotes));
    }
}