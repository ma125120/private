const routes = {
  home: '/',
  msg: '/msg',
  addReverse: '/reverse',
  workplace: '/workplace',
  work: '/workplace',
  staff: '/setting/staff',
  room: '/setting/room',
  account: '/setting/account',
  child: '/setting/child',
  shop: '/setting/shop',
  excel: '/setting/excel',
  childEdit: '/setting/child/edit',
  childNew: '/setting/child/new',
  actAdd: "/workplace/act/add",

  reverse: '/work/reverse',
  act: '/work/act',
  record: '/work/record',

  intro: '/intro',
  help: '/help',
}

export default routes

export const needNotLogin = [routes.home, routes.intro]
export const needLogin = [routes.workplace, routes.addReverse]