import { DATE_STR } from './../util/date';

import router from '@/router';
import routeNames from '@/router/name'
import { getSysMsgs } from './sys'
import store from '@/store'
import dayjs from 'dayjs'
import { Users, Reservation, Actual } from '@/types/sql'
import { getVaildDate, composeTable } from './common'
// import User from '@/api/user';
import { scroll5 } from '@/util'
import { filterToday } from '@/util/date'

export default {
  saveUser(state, user) {
    if (JSON.stringify(state.user) !== JSON.stringify(user)) {
      state.user = new Users(user);
      localStorage.user = JSON.stringify(new Users(user));
    }
  },
  restoreUser(state) {
    if (state.nowUser && state.user) return ;
    let { user, nowUser, } = localStorage;
    if (user) {
      store.dispatch('setUser', new Users(JSON.parse(user)))
    }
    if (nowUser) {
      // console.log(`回复`, nowUser)
      store.commit('chooseUserMutation', new Users(JSON.parse(nowUser)))
    }
  },
  saveChildren(state, _children) {
    let children = _children.map(v => new Users(v)).filter(v => v.isActivation === 1);
    state.userChildren = children;
    if (children.length > 0) {
      state.isShowAddChild = false;
      const vaildUser = children.find(getVaildDate)
      if (!state.nowUser && vaildUser) {
        // console.log('save children')
        store.commit('chooseUserMutation', vaildUser)
      }
      if (!vaildUser) {
        store.commit('logout')
      }

      if (state.isHost && router.currentRoute.path === routeNames.home) {
        // router.push(routeNames.workplace)
        store.commit('setLogin')
      }
    } else {
      if (store.getters.role === 0) {
        state.isShowAddChild = true;
      }
      if (router.currentRoute.path !== '/') {
        router.push('/')
      }
    }
  },
  saveChildAccount(state, _children) {
    let children = _children.map(v => new Users(v))
    state.childAccount = children;
  },
  chooseUserMutation(state, user) {
    state.nowUser = new Users(user);
    localStorage.nowUser = JSON.stringify(new Users(user));
    store.dispatch('getStaffList');
    store.dispatch('getRoomList');
  },
  chooseUser_(state, user) {
    state.nowUser = new Users(user);
    localStorage.nowUser = JSON.stringify(new Users(user));
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
    const list = [...state.roomList, item, ]
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
    state.sysMsgs = [];
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
  addDate(state) {
    let time = dayjs(state.selectDay).add(1, 'day').format(DATE_STR)
    store.dispatch(`changeDay`, time);
    // state.selectDay = time;
  },
  delDate(state) {
    let time = dayjs(state.selectDay).subtract(1, 'day').format(DATE_STR)
    store.dispatch(`changeDay`, time);
    // state.selectDay = time;
  },
  saveRecords(state, list) {
    state.records = list.filter(v => filterToday(v, state.selectDay));
    scroll5(`record--table`, list.length, state.selectDay);
  },
  saveActs(state, list) {
    let fields = ['roomCharge', 'snackFee', 'shouldPay', 'discount', 'actMoney']
    list = composeTable(list.filter(v => filterToday(v, state.selectDay)), fields)

    state.acts = list;
    scroll5(`act--table`, list.length, state.selectDay);
  },

  getSysMsgs(state, list) {
    const msgs = getSysMsgs(list);

    state.sysMsgs = msgs;
  }
};
