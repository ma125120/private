import {Users} from '@/types/sql'
import api from '@/api'
// import router from '@/router';

export default {
  async setUser({ commit, dispatch, }, user: Users) {
    commit('saveUser', user);
    dispatch('selectChildren', user);
  },
  async selectChildren({ commit, dispatch, }, user: Users) {
    if (user.jurisdictionType === 0) {
      let children = await api.user.findChildren(user.objectId);
      commit('saveChildren', children);
    } else {

    }
  },
  async addEndUser({ commit, dispatch, state, }, obj) {
    let data = {
      ...obj,
      companyId: state.user.objectId,
      jurisdictionType: 1,
      companyName: state.user.name || '',
    }
    let user = await api.user.saveChild(data);
    dispatch('selectChildren', state.user)
  },
  async chooseUser({ commit, dispatch, state, }, user) {
    commit(`chooseUserMutation`, user);
    // 获取该用户的record
    let records = await api.user.saveChild(user);
    console.log(records)
    // dispatch('selectChildren', state.user);
  },
}