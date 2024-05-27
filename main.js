import './style.css'
import { App } from './src/todos/app'
import todoStore from './src/store/todo.store'

todoStore.initStore();

// Id referencia del elemento HTML donde queremos renderizar la app
App('#app');
