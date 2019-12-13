
import { Users } from '@/types/sql'
export type StateType = {
  user: Users,
  nowUser: Users,
  userChildren: Users[],
  isShowAddChild: boolean,
  menus: any[],
  [n: string]: any,
}

const state: StateType = {
  user: null,
  nowUser: null,
  userChildren: [],
  isShowAddChild: false,
  menus: [
    {
      text: '房间管理',
      path: '/setting/room',
    },
    {
      text: '店员管理',
      path: '/setting/staff',
    },
    {
      text: '账号管理',
      path: '/setting/account',
    },
    {
      text: '数据导出',
      path: '/setting/export',
    },
  ]
}
export default state