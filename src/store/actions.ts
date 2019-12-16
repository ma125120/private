import {Users} from '@/types/sql'
import api from '@/api'
// import router from '@/router';
import { Message } from 'element-ui'

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
      commit('chooseUserMutation', user);
    }
  },
  async addEndUser({ commit, dispatch, state, }, obj) {
    let data = {
      ...obj,
      companyId: state.user.objectId,
      jurisdictionType: 1,
      expireDuration: 365,
      companyName: state.user.companyName || '',
    }
    let user = await api.user.saveChild(data);
    dispatch('selectChildren', state.user)
    api.user.increment(state.user)
  },
  async chooseUser({ commit, dispatch, state, }, user) {
    commit(`chooseUserMutation`, user);
    // 获取该用户的record
    // let records = await api.user.saveChild(user);
    // console.log(records)
    // dispatch('selectChildren', state.user);
  },
  async add_staff({ commit, dispatch, state, }, name) {
    if (!name) return;
    let isDuplicate = await api.staff.isDuplicate(name, state.nowUser.objectId, state.nowUser.companyId);
    if (isDuplicate) {
      Message({ message: `创建失败，姓名必须和已创建的店员名不同`, type: 'error' });
      return ;
    }

    let staff = {
      clerkType: 1,
      companyId: state.user.objectId,
      branchStoreId: state.nowUser.objectId,
      clerkName: name,
    }

    let res = await api.staff.save(staff);
    Message({ message: `添加成功`, type: 'success' })
    dispatch('getStaffList')
  },
  async edit_staff({ commit, dispatch, state, }, obj) {
    if (!obj.clerkName) return;
    let isDuplicate = await api.staff.isDuplicate(name, state.nowUser.objectId, state.nowUser.companyId);
    if (isDuplicate) {
      Message({ message: `修改失败，姓名必须和已创建的店员名不同`, type: 'error' });
      return;
    }

    let res = await api.staff.edit(obj);
    Message({ message: `修改成功`, type: 'success' })
    dispatch('getStaffList');
  },
  async getStaffList({ commit, state, }) {
    let list = await api.staff.getList(state.nowUser.objectId, state.nowUser.companyId);
    commit('saveStaffList', list)
  },

  async add_room({ commit, dispatch, state, }, name) {
    if (!name) return;
    let isDuplicate = await api.room.isDuplicate(name, state.nowUser.objectId, state.nowUser.companyId);
    if (isDuplicate) {
      Message({
        message: `创建失败，名称必须和已创建的房间名不同`, type: 'error' });
      return;
    }

    let room = {
      companyId: state.user.objectId,
      branchStoreId: state.nowUser.objectId,
      roomName: name,
    }

    let res = await api.room.save(room);
    Message({ message: `添加成功`, type: 'success' })
    dispatch('getRoomList')
  },
  async edit_room({ commit, dispatch, state, }, obj) {
    if (!obj.roomName) return;
    let isDuplicate = await api.room.isDuplicate(name, state.nowUser.objectId, state.nowUser.companyId);
    if (isDuplicate) {
      Message({ message: `修改失败，姓名必须和已创建的房间名不同`, type: 'error' });
      return;
    }

    let res = await api.room.edit(obj);
    Message({ message: `修改成功`, type: 'success' })
    dispatch('getRoomList');
  },
  async del_room({ commit, dispatch, state, }, obj) {
    let res = await api.room.del(obj);
    Message({ message: `删除成功`, type: 'success' })
    dispatch('getRoomList');
  },
  async getRoomList({ commit, state, }) {
    let list = await api.room.getList(state.nowUser.objectId, state.nowUser.companyId);
    commit('saveRoomList', list);
  },

  async editShopUser({ commit, dispatch, state, }, obj) {
    let res = await api.user.edit(obj);
    Message({ message: `编辑成功`, type: 'success' })
    
    let index = state.userChildren.findIndex(v => v.objectId === obj.objectId)
    let children = [...state.userChildren ]
    children[index] = obj;
    commit('saveChildren', children)
  },

  async saveChildAccount({ commit, dispatch, state, }, obj) {
    let data = {
      ...obj,
      jurisdictionType: 2,
      expireDuration: 365,
      companyId: state.nowUser.companyId,
      companyName: state.nowUser.companyName || '',
    }
    let res = await api.user.edit(data);
    Message({ message: `添加成功`, type: 'success' })

    let children = [{ ...data, objectId: res.objectId, }, ...state.childAccount, ]
    commit('saveChildAccount', children)
  },
  async getChildAccounts({ commit, dispatch, state, }) {
    let list = await api.user.getChildAccounts(state.nowUser.companyId, state.nowUser.objectId, );
    commit('saveChildAccount', list);
  },
  async del_child_account({ commit, dispatch, state, }, obj) {
    let res = await api.user.del(obj);
    Message({ message: `删除成功`, type: 'success' })
    dispatch('getChildAccounts');
  },
}