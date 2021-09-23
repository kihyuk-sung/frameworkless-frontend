import performance from './performance.js';
import getTodos from './getTodos.js';
import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import registry from './registry.js';
import applyDiff from './applyDiff.js';
import appView from './view/app.js';
import modelFactory from './model/model.js';

const model = modelFactory();

performance.init();

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const {
  addChangeListener,
  ...events
} = model;

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

addChangeListener(render);
