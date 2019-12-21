import { StateType } from './state'
import { formatRecord } from "@/util/index";
export const arr2map = (arr, label, id = 'objectId') => arr.reduce((prev, next) => (prev[next[id]] = next[label], prev), {})

export default {
  showChildren: (state, getters) => state.userChildren.filter(v => v.objectId !== (state.nowUser || {}).objectId),
  childNames: (state) => {
    return state.userChildren.reduce((prev, next) => {
      prev[next.objectId] = next.branchStoreName;
      return prev;
    }, {})
  },
  realRecords: (state, getters) => formatRecord(state.records, state.selectDay + ` 08:00:00`),
  staffOptions: (state, getters) => 
    state.staffList.filter(v => v.clerkType === 1).map(v => ({ ...v, name: v.objectId + ' ' + v.clerkName})),
  staffMap: (state, getters) => arr2map(state.staffList, 'clerkName'),
  roomMap: (state, getters) => arr2map(state.roomList, 'roomName'),
  role: (state: StateType, getters) => {
    return state.user && state.user.jurisdictionType
  },
  isAdmin: (state: StateType, getters) => getters.role === 0,
  settingMenu: (state: StateType, getters) => {
    const menus = {
      0: [
        {
          text: '房间管理',
          path: '/setting/other',
        },
        {
          text: '房间管理',
          path: '/setting/other',
        },
      ]
    }
    return menus[getters.role] || [];
  }
};
