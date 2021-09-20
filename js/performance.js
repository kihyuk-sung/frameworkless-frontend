let panel;
let start;
let frames = 0;

const create = () => {
  const div = document.createElement('div');
  div.classList.add('performance');
  return div;
};

const tick = () => {
  frames++;
  const now = window.performance.now();
  if (now >= start + 1000) {
    panel.innerText = frames;
    frames = 0;
    start = now;
  }
  window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
  panel = create();
  window.requestAnimationFrame(() => {
    start = window.performance.now();
    parent.appendChild(panel);
    tick();
  });
};

export default {
  init
};
