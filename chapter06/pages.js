/** @param {HTMLElement} container */
export default container => {
  const home = () => {
    container.textContent = 'This is Home page';
  };

  const list = () => {
    container.textContent = 'This is List page';
  };

  const notFound = () => {
    container.textContent = 'Page Not Found!';
  };

  return {
    home,
    list,
    notFound
  };
};
