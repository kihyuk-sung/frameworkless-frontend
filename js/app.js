import performance from './performance.js';
import getTodos from './getTodos.js';
import view from './view.js';

performance.init();

const state = {
  todos: getTodos(),
  currentFilter: 'All'
};

const main = document.querySelector('.todoapp');

window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
