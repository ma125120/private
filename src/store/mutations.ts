
import router from '@/router';
import routeNames from '@/router/name'
import {Notification} from 'element-ui'
import store from '@/store'

export default {
  saveUser(state, user) {
    state.user = user;
    sessionStorage.user = JSON.stringify(user);
  },
  restoreUser(state) {
    let user = sessionStorage.user
    if (user) {
      store.dispatch('setUser', JSON.parse(user))
    }
  },
  saveChildren(state, children) {
    state.userChildren = children;
    if (children.length > 0) {
      state.isShowAddChild = false;
      // state.nowUser = children[0];
      store.commit('chooseUserMutation', children[0])
      router.push(routeNames.workplace)
    } else {
      state.isShowAddChild = true;
    }
  },
  chooseUserMutation(state, user) {
    state.nowUser = user;
  }
};
