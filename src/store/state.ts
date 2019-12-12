
import { Users } from '@/types/sql'
export type StateType = {
  user: Users,
  nowUser: Users,
  userChildren: Users[],
  isShowAddChild: boolean,
  [n: string]: any,
}

const state: StateType = {
  user: null,
  nowUser: null,
  userChildren: [],
  isShowAddChild: false,
}
export default state