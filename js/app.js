import performance from './performance.js';
import getTodos from './getTodos.js';
import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import registry from './registry.js';
import applyDiff from './applyDiff.js';
import appView from './view/app.js';

import actionsFactory from './model/state.js';

performance.init();

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const loadState = () => {
  const serializedState = window.localStorage.getItem('state');

  if (!serializedState) {
    return;
  }

  return JSON.parse(serializedState);
};

const actions = actionsFactory(loadState());

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');
    const newMain = registry.renderRoot(main, state, actions);
    applyDiff(document.body, main, newMain);
  });
};

actions.addChangeListener(render);
actions.addChangeListener(state => {
  Promise.resolve().then(() => {
    window.localStorage.setItem('state', JSON.stringify(state));
  });
});

actions.addChangeListener(state => {
  console.log(`Current State (${(new Date())})`, state);
});
