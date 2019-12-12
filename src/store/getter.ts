import { StateType } from './state'

export default {
  role: (state: StateType, getters) => {
    return state.user?.jurisdictionType ?? ''
  },
  isAdmin: (state: StateType, getters) => getters.role === 0,
};
