
import { Todo } from '../todos/models/todo.model'

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo("Piedra del alma"),
        new Todo("Piedra del espacio"),
        new Todo("Piedra del tiempo"),
        new Todo("Piedra del poder"),
        new Todo("Piedra de la realidad"),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log("InitStore 🏆");
}

const loadStore = () => {
    
    if (localStorage.getItem("stateStorage") === null)  console.log("StateStorage es Null ☠️");

    if (!localStorage.getItem("stateStorage")) return;
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem("stateStorage"));

    state.todos = todos
    state.filter = filter
}

const saveStoreToLocalStorage = () => {

    // console.log(JSON.stringify(state)); // Serializa el state en un string
    localStorage.setItem("stateStorage", JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos]

        case Filters.Completed:
            return state.todos.filter(todo => todo.done) // (True) Devuelve el arreglo con todos los todos completados 

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done) // (False) Devuelve el arreglo con todos los todos pendientes

        default:
            throw new Error(`Opción ${filter} no es valida`)
    }
}

/**
 * 
 * @param {String} description description of the todo 
 */
const addTodo = (description) => {
    if (!description) throw new Error("Description is required");
    state.todos.push(new Todo(description));

    saveStoreToLocalStorage();
}

/**
 * 
 * @param {String} todoId Todo Identifier 
 */
const toggleTodo = (todoId) => {

    state.todos = state.todos.map(todo => {

        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStoreToLocalStorage();
}

/**
 * 
 * @param {String} todoId Todo Identifier  
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);

    saveStoreToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);

    saveStoreToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {

    //Investigar que el filtro que llega existe en Filters
    // Object.keys(newFilter).forEach(key => {
    //     if (!Object.keys(Filters).includes(key))
    //         throw new Error(`Opcion ${key} no es valida`);
    // })

    state.filter = newFilter

    saveStoreToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}