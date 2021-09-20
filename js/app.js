import performance from './performance.js';
import getTodos from './getTodos.js';
import todosView from './todos.js';
import counterView from './counter.js';
import filtersView from './filters.js';
import registry from './registry.js';

performance.init();

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: 'All'
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 5000);

render();
