import { StateType } from './state'

export default {
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
