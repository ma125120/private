
import { Users } from '@/types/sql'
import { now } from '@/util/date'
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
      name: 'room',
    },
    {
      text: '店员管理',
      name: 'staff',
    },
    {
      text: '账号管理',
      name: 'account',
    },
    {
      text: '数据导出',
      name: 'export',
    },
  ],

  staffList: [],
  roomList: [],
  isHost: false,
  childAccount: [],

  records: [],
  acts: [],
  selectDay: now,
}
export default state