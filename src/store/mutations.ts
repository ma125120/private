
import router from '@/router';
import routeNames from '@/router/name'
import {Notification} from 'element-ui'
import store from '@/store'
import { Users, Reservation, Actual } from '@/types/sql'
// import User from '@/api/user';
import { scroll5 } from '@/util'

export default {
  saveUser(state, user) {
    state.user = user;
    localStorage.user = JSON.stringify(user);
  },
  restoreUser(state) {
    if (state.nowUser && state.user) return ;
    let { user, nowUser, } = localStorage;
    if (user) {
      store.dispatch('setUser', new Users(JSON.parse(user)))
    }
    if (nowUser) {
      store.commit('chooseUserMutation', new Users(JSON.parse(nowUser)))
    }
  },
  saveChildren(state, _children) {
    let children = _children.map(v => new Users(v));
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
  saveChildAccount(state, _children) {
    let children = _children.map(v => new Users(v))
    state.childAccount = children;
  },
  chooseUserMutation(state, user) {
    state.nowUser = user;
    localStorage.nowUser = JSON.stringify(user);
    store.dispatch('getStaffList');
    store.dispatch('getRoomList');
  },

  saveStaffList(state, list) {
    state.staffList = list;
  },
  addStaffList(state, item) {
    const list = [...state.staffList, item, ]
    state.staffList = list;
  },
  editStaff(state, item) {
    const index = state.staffList.findIndex(v => v.objectId === item.objectId)
    const list = [...state.staffList]
    list[index] = item;
    state.staffList = list;
  },
  saveRoomList(state, list) {
    state.roomList = list;
  },
  addRoomList(state, item) {
    const list = [item, ...state.roomList,]
    state.roomList = list;
  },
  editRoom(state, item) {
    const index = state.roomList.findIndex(v => v.objectId === item.objectId)
    const list = [...state.roomList]
    list[index] = item;
    state.roomList = list;
  },

  logout(state) {
    state.user = null;
    state.nowUser = null;
    localStorage.removeItem('user')
    localStorage.removeItem('nowUser')
    if (router.currentRoute.path !== routeNames.home) {
      router.replace(routeNames.home)
    }
  },
  // 用户触发的登录
  setLogin(state, isHost = false) {
    state.isHost = isHost;
  },

  addRecordMutation(state, item) {
    let id = item.objectId;
    let obj = new Reservation(item)
    const list = [...state.records]
    const index = list.findIndex(v => v.objectId === id);
    if (index === -1) {
      store.dispatch('getRecords')
      // state.records = [obj , ...state.records,];
    } else {
      list[index] = obj;
      state.records = list;
    }
  },
  delRecordMutation(state, item) {
    const list = [...state.records]
    const index = list.findIndex(v => v.objectId === item.objectId);
    list.splice(index, 1);
    state.records = list;
  },
  addActMutation(state, item) {
    let id = item.objectId;
    let obj = new Actual(item)
    const list = [...state.acts]
    const index = list.findIndex(v => v.objectId === id);
    if (index === -1) {
      store.dispatch('getActs')
      // state.acts = [obj, ...state.acts,];
    } else {
      list[index] = obj;
      state.acts = list;
    }
  },
  delActMutation(state, item) {
    const list = [...state.acts]
    const index = list.findIndex(v => v.objectId === item.objectId);
    list.splice(index, 1);
    state.acts = list;
  },
  changeDayMutation(state, time) {
    state.selectDay = time;
  },
  saveRecords(state, list) {
    state.records = list;
    scroll5(`record--table`, list.length);
  },
  saveActs(state, list) {
    state.acts = list;
    scroll5(`act--table`, list.length);
  }
};
