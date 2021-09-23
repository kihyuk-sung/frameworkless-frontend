const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = '([^\\/]+)';
const NAV_A_SELECTOR = 'a[data-navigation]';
const TICKTIME = 250;

const extractUrlParams = (route, windowHash) => {
  const params = {};

  if (route.params.length === 0) {
    return params;
  }

  const matches = windowHash.match(route.testRegExp);

  matches.shift();

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index];
    params[paramName] = paramValue;
  });

  return params;
};

export default () => {
  const routes = [];
  let notFound = () => { };
  let lastPathname;

  const router = {};

  const checkRoutes = () => {
    const { pathname } = window.location;

    if (lastPathname === pathname) {
      return;
    }

    lastPathname = pathname;

    const currentRoute = routes.find(route => {
      const { testRegExp } = route;
      return testRegExp.test(pathname);
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, pathname);

    currentRoute.component(urlParams);
  };

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
      testRegExp: new RegExp(`^${parsedFragment}$`),
      component,
      params
    });

    return router;
  };

  router.setNotFound = cb => {
    notFound = cb;
    return router;
  };

  router.navigate = path => {
    window.history.pushState(null, null, path);
  };

  router.start = () => {
    checkRoutes();
    window.setInterval(checkRoutes, TICKTIME);
    document.body.addEventListener('click', e => {
      const { target } = e;
      if (target.matches(NAV_A_SELECTOR)) {
        e.preventDefault();
        router.navigate(target.href);
      }
    });
  };

  return router;
};
