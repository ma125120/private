
import router from '@/router';
import routeNames from '@/router/name'
import {Notification} from 'element-ui'
import store from '@/store'
import { Users } from '@/types/sql'

export default {
  saveUser(state, user) {
    state.user = user;
    sessionStorage.user = JSON.stringify(user);
  },
  restoreUser(state) {
    if (state.nowUser && state.user) return ;
    let { user, nowUser, } = sessionStorage;
    if (user) {
      store.dispatch('setUser', new Users(JSON.parse(user)))
    }
    if (nowUser) {
      state.nowUser = new Users(JSON.parse(nowUser));
    }
  },
  saveChildren(state, children) {
    state.userChildren = children;
    if (children.length > 0) {
      state.isShowAddChild = false;
      // state.nowUser = children[0];
      if (!state.nowUser) {
        store.commit('chooseUserMutation', children[0])
      }
      
      if (state.isHost && router.currentRoute.path === routeNames.home) {
        router.push(routeNames.workplace)
        store.commit('setLogin')
      }
    } else {
      state.isShowAddChild = true;
    }
  },
  chooseUserMutation(state, user) {
    state.nowUser = user;
    sessionStorage.nowUser = JSON.stringify(user);
  },

  saveStaffList(state, list) {
    state.staffList = list;
  },
  saveRoomList(state, list) {
    state.roomList = list;
  },

  logout(state) {
    state.user = null;
    state.nowUser = null;
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('nowUser')
    if (router.currentRoute.path !== routeNames.home) {
      router.replace(routeNames.home)
    }
  },
  // 用户触发的登录
  setLogin(state, isHost = false) {
    state.isHost = isHost;
  }
};
