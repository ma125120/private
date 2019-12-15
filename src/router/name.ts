const routes = {
  home: '/',
  addReverse: '/reverse',
  workplace: '/workplace',
  staff: '/setting/staff',
  room: '/setting/room',
  account: '/setting/account'
}

export default routes

export const needNotLogin = [routes.home, ]
export const needLogin = [routes.workplace, routes.addReverse]