import { Todo } from "../models/todo.model";
import { createTodoHtml } from "./create-todo-html";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todo 
 */
export const renderTodos = ( elementId, todo = [] ) => {

    if (!element) element = document.querySelector( elementId );
    if (!element) throw new Error(`Element ${elementId} not found`);

    element.innerHTML = '';

    todo.forEach( todo => {
        element.append( createTodoHtml(todo))
    });


}