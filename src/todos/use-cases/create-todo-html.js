import { Todo } from "../models/todo.model";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = ( todo ) => {

    if (!todo) throw new Error("Todo is required");

    const {id, description, done} = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked' : '' }>
            <label>${ description }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `
    const liElewment = document.createElement("li");
    liElewment.innerHTML = html;
    liElewment.setAttribute('data-id', id);

    if (todo.done)
    liElewment.classList.add('completed');


    return liElewment;

}