let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }

  return template
    .content
    .firstElementChild
    .cloneNode(true);
};

/**
 * 
 * @param {HTMLElement} element 
 * @param {Number} index 
 * @param {*} events 
 */
const attachEventsToTodoElement = (element, index, events) => {
  element
    .querySelector('button.destroy')
    .addEventListener('click', e => {
      events.deleteItem(index);
    });

  element
    .querySelector('input.toggle')
    .addEventListener('click', e => events.toggleItemCompleted(index));

  element
    .addEventListener('dblclick', e => {
      element.classList.add('editing');
      element.querySelector('input.edit').focus();
    });

  element
    .querySelector('input.edit')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        element.classList.remove('editing');
        events.updateItem(index, e.target.value);
      }
    });
};

const getTodoElement = (todo, index, events) => {
  const {
    text,
    completed
  } = todo;

  const element = createNewTodoNode();

  element.querySelector('input.edit').value = text;
  element.querySelector('label').textContent = text;

  if (completed) {
    element.classList.add('completed');
    element.querySelector('input.toggle').checked = true;
  }

  attachEventsToTodoElement(element, index, events);

  return element;
};

const filterTodos = (todos, filter) => {
  const isCompleted = todo => todo.completed;
  if (filter === 'Active') {
    return todos.filter(t => !isCompleted(t));
  }

  if (filter === 'Completed') {
    return todos.filter(isCompleted);
  }

  return [...todos];
};

export default (targetElement, state, events) => {
  const { todos, currentFilter } = state;
  const newTodoList = targetElement.cloneNode(true);
  newTodoList.innerHTML = '';

  const filteredTodos = filterTodos(todos, currentFilter);

  filteredTodos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach(element => {
      newTodoList.appendChild(element);
    });

  return newTodoList;
};
