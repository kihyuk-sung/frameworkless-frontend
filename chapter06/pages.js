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

  const detail = (params) => {
    const { id } = params;
    container.textContent = `This is Detail Page with Id ${id}`;
  };

  const anotherDetail = (params) => {
    const { id, anotherId } = params;
    container.textContent = `This is anther Detail Page with Id ${id} and AnotherId ${anotherId}`;
  };

  return {
    home,
    list,
    notFound,
    detail,
    anotherDetail
  };
};
