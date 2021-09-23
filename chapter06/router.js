export default () => {
  const routes = [];
  let notFound = () => { };

  const router = {};

  const checkRoutes = () => {
    const currentRoute = routes.find(route => route.fragment === window.location.hash);

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
  const URL_FRAGMENT_REGEXP = '([^\\/]+)';

  /**
   * @param {String} fragment 
   * @param {*} component 
   * @returns 
   */
  router.addRoute = (fragment, component) => {
    const params = [];

    const parsedFragment = fragment
      .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, '\\/');

    routes.push({
      textRegExp = new RegExp(`^${parsedFragment}`),
      component,
      params
    });

    return router;
  };

  router.setNotFound = cb => {
    notFound = cb;
    return router;
  };

  router.navigate = fragment => {
    window.location.hash = fragment;
  };

  router.start = () => {
    window.addEventListener('hashchange', checkRoutes);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    checkRoutes();
  };

  return router;
};
