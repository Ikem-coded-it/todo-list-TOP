import LocalStorageOperations from "./storage";
const { Temporal } = require('@js-temporal/polyfill');
const storage = new LocalStorageOperations();

export default class DateTodoFetchOperations{
    
    fetchTodayTodos() {
        let { todos, projects } = storage.getAll();
        let projectTodos = []
        projects.forEach(project => {
            if (project.todos.length > 0) {
                project.todos.forEach(todo => projectTodos.push(todo))
            }
        });

        const allTodos = todos.concat(projectTodos)
        const date = Temporal.Now.plainDateISO().toString()
 
        let todayTodos = []
        allTodos.forEach(todo => {
            if (todo.dueDate == date) todayTodos.push(todo)
        })

        console.log(todayTodos)
        return todayTodos
    }

    fetchNext7DaysTodos() {
        const { todos } = storage.getAll();

        const date = Temporal.Now.plainDateISO()

        let next7DaysDates = []
        for (let i = 1; i <= 7; i++) {
            let day = date.add({ days: i }).toString()
            next7DaysDates.push(day)
        }

        let next7DaysTodos = []
        todos.forEach(todo => {
            if (next7DaysDates.includes(todo.dueDate)) next7DaysTodos.push(todo)
        })

        console.log(next7DaysTodos)
        return next7DaysTodos
    }
}