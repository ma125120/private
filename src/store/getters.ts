import { StateType } from './state'
import { formatRecord, filterRecord } from "@/util/index";
export const arr2map = (arr, label, id = 'objectId') => arr.reduce((prev, next) => (prev[next[id]] = next[label], prev), {})
import { getVaildDate, getInvaildDate, } from './common'

export default {
  todayRecods: (state) => state.records.filter(filterRecord(state.selectDay)),
  isFirst: (state) => state.user && state.user.isFirst,
  showChildren: (state, getters) => state.userChildren.filter(getVaildDate),
  invaildUsers: (state, getters) => state.userChildren.filter(getInvaildDate),
  invaildNames: (state, getters) => getters.invaildUsers.map(v => v.branchStoreName).join('、'),
  isReload: (state, getters) => 
    getters.invaildUsers.length > 0 && getters.invaildUsers.length === state.userChildren.length,
  childNames: (state) => {
    return state.userChildren.reduce((prev, next) => {
      prev[next.objectId] = next.branchStoreName;
      return prev;
    }, {})
  },
  // realActs: (state) => state.acts.filter(filterToday),
  realRecords: (state, getters) => formatRecord(state.records, state.selectDay, state.roomList),
  staffOptions: (state, getters) => 
    state.staffList.filter(v => v.clerkType === 1).map(v => ({ ...v, name: v.clerkName})),
  staffMap: (state, getters) => arr2map(state.staffList, 'clerkName'),
  roomMap: (state, getters) => arr2map(state.roomList, 'roomName'),
  role: (state: StateType, getters) => {
    return state.user && state.user.jurisdictionType
  },
  isAdmin: (state: StateType, getters) => getters.role === 0,
};
