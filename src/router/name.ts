const routes = {
  home: '/',
  addReverse: '/reverse',
  workplace: '/workplace'
}

export default routes

export const needLogin = [routes.workplace, routes.addReverse]