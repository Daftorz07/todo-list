//Caracteristicas ?raw de Vite
import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from './use-cases'

const ElementIDs = {
    ClearComplete: '.clear-completed',
    NewTodoInput: '#new-todo-input',
    TodoList: '.todo-list',
    TodoFilters: '.filter',
    PendingCountLabel: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        // console.log(todos);
    }

    const updatePendingTodos = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }

    //Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencia HTML   
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedTodoList = document.querySelector(ElementIDs.ClearComplete);
    const filtersLI = document.querySelectorAll(ElementIDs.TodoFilters);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        updatePendingTodos();

        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]') // Busca el primer elemento que coincida con el selector
        const idElement = element.getAttribute('data-id')
        todoStore.toggleTodo(idElement)
        displayTodos();
        updatePendingTodos();
    })

    todoListUL.addEventListener('click', (event) => {
        if (event.target.className !== 'destroy') return
        const element = event.target.closest('[data-id]')
        const idElement = element.getAttribute('data-id')
        todoStore.deleteTodo(idElement)
        displayTodos()
        updatePendingTodos();
    })

    clearCompletedTodoList.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
        updatePendingTodos();
    });

    filtersLI.forEach((element) => {

        element.addEventListener('click', (element) => {
            filtersLI.forEach((element) => element.classList.remove('selected'));
            element.target.classList.add('selected');

            // console.log(element.target.text);
            
            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
            }

            displayTodos();
            updatePendingTodos();


        })
    })
}

