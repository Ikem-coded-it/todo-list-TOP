import LocalStorageOperations from "./storage";
const storage = new LocalStorageOperations();

export default class DateTodoFetchOperations{
     
    fetchTodayTodos() {
        const { todos } = storage.getAll();
        const date = new Date()
        const dateArray = new Array(date.getFullYear(), `0${date.getMonth() + 1}`, date.getDate())
        const stringDate = dateArray.join('-');

        let todayTodos = []
        todos.forEach(todo => {
            if (todo.dueDate == stringDate) todayTodos.push(todo)
        })

        console.log(todayTodos)
        return todayTodos
    }
}