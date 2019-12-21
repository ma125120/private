const routes = {
  home: '/',
  addReverse: '/reverse',
  workplace: '/workplace',
  staff: '/setting/staff',
  room: '/setting/room',
  account: '/setting/account',
  child: '/setting/child',
  shop: '/setting/shop',
  childEdit: '/setting/child/edit',
  childNew: '/setting/child/new',
  actAdd: "/workplace/act/add",
}

export default routes

export const needNotLogin = [routes.home, ]
export const needLogin = [routes.workplace, routes.addReverse]