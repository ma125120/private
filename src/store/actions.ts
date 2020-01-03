import { Users, getOvertime } from '@/types/sql'
import api from '@/api'

// import router from '@/router';
import { Message } from 'element-ui'
import dayjs from 'dayjs';
import { DATE_STR_DETAIL, getToday, getRange } from '../util/date';

export default {
  async setUser({ commit, dispatch, }, user: Users) {
    commit('saveUser', user);
    dispatch('selectChildren', user);
  },
  async skipTeach({ commit, dispatch, state, }) {
    const user = state.user;
    if (!user) return ;

    user.isFirst = false;
    await api.user.edit(user);
  },
  async selectChildren({ commit, dispatch, }, user: Users) {
    if (user.jurisdictionType === 0) {
      let children = await api.user.findChildren(user.objectId);
      commit('getSysMsgs', children)
      commit('saveChildren', children);
    } else if (user.jurisdictionType === 1) {
      commit('saveChildren', [user])
      
      // commit('chooseUserMutation', user);
      if (dayjs(user.overTime).isBefore(dayjs())) {
        // 已经过期
        commit('logout')
      }
      commit('getSysMsgs', [user])
    } else {
      let children = await api.user.findParents(user.branchStoreIds);
      commit('saveChildren', children);
    }
  },
  async addEndUser({ commit, dispatch, state, }, { form, isFirst }) {
    let data = {
      ...form,
      companyId: state.user.objectId,
      companyName: state.user.companyName || '',
      jurisdictionType: 1,
      expireDuration: 365,
      createTime: getToday().str,
      overTime: getOvertime(form.version),
    }
    if (!isFirst) {
      let user = await api.user.checkActive(data, state.user.objectId);
      data.expireDuration = user.expireDuration;
      data.objectId = user.objectId;
      data.version = user.version;
      data.overTime = getOvertime(data.version);
      data.isActivation = 1;
    }

    let user = await api.user.saveChild(data);
    Message({ message: `${form.objectId ? '编辑' : '激活'}成功`, type: 'success' })
    dispatch('selectChildren', state.user)
    // api.user.increment(state.user);
  },
  async chooseUser({ commit, dispatch, state, }, user) {
    commit(`chooseUserMutation`, user);

    dispatch('getAllRecords')
  },
  async add_staff({ commit, dispatch, state, }, obj) {
    let name = obj.clerkName;
    if (!name) return;
    if (obj.objectId) {
      let isDuplicate = await api.staff.isDuplicate(name, obj.objectId, state.nowUser.objectId, state.nowUser.companyId);
      validateDuplicate(isDuplicate, `修改失败，店员名必须和已创建的店员名不同`)
    }

    let staff = {
      clerkType: 1,
      companyId: state.nowUser.companyId,
      branchStoreId: state.nowUser.objectId,
      clerkName: name,
    }

    let res = await api.staff.save(staff);
    Message({ message: `添加成功`, type: 'success' })
    commit('addStaffList', { ...staff, objectId: res.objectId })
  },
  async edit_staff({ commit, dispatch, state, }, obj) {
    let name = obj.clerkName;
    if (!name) return;
    let isDuplicate = await api.staff.isDuplicate(name, obj.objectId, state.nowUser.objectId, state.nowUser.companyId);
    validateDuplicate(isDuplicate, `修改失败，姓名必须和已创建的店员名不同`)

    let res = await api.staff.edit(obj);
    Message({ message: `修改成功`, type: 'success' })
    commit('editStaff', { ...obj })
  },
  async getStaffList({ commit, state, }) {
    let list = await api.staff.getList(state.nowUser.objectId, state.nowUser.companyId);
    commit('saveStaffList', list)
  },

  async add_room({ commit, dispatch, state, }, obj) {
    let name = obj.roomName;
    if (!name) return;
    let isDuplicate = await api.room.isDuplicate(name, state.nowUser.objectId, state.nowUser.companyId);
    validateDuplicate(isDuplicate, `修改失败，房间名必须和已创建的房间名不同`)

    let room = {
      companyId: state.nowUser.companyId,
      branchStoreId: state.nowUser.objectId,
      roomName: name,
    }

    let res = await api.room.save(room);
    Message({ message: `添加成功`, type: 'success' })
    commit('addRoomList', { ...room, objectId: res.objectId })
  },
  async edit_room({ commit, dispatch, state, }, obj) {
    let name = obj.roomName;
    if (!obj.roomName) return;
    let isDuplicate = await api.room.isDuplicate(name, state.nowUser.objectId, state.nowUser.companyId);
    validateDuplicate(isDuplicate, `修改失败，姓名必须和已创建的房间名不同`)

    let res = await api.room.edit(obj);
    Message({ message: `修改成功`, type: 'success' })
    commit('editRoom', { ...obj })
  },
  async del_room({ commit, dispatch, state, }, obj) {
    let res = await api.room.del(obj);
    Message({ message: `删除成功`, type: 'success' })
    
    const list = state.roomList;
    list.splice(list.findIndex(v => v.objectId === obj.objectId), 1)
    commit('saveRoomList', list);
  },
  async getRoomList({ commit, state, }) {
    let branchStoreId = state.nowUser.objectId;
    if (!branchStoreId) return ;

    let list = await api.room.getList(branchStoreId, state.nowUser.companyId);
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
      overTime: state.nowUser.overTime,
      version: state.nowUser.version,
      createTime: state.nowUser.createTime,
      companyId: state.nowUser.companyId,
      branchStoreName: state.nowUser.branchStoreName || '',
      companyName: state.nowUser.companyName || '',
    }

    let res = await api.user.edit(data);
    Message({ message: `添加成功`, type: 'success' })

    let children = [{ ...data, objectId: res.objectId, }, ...state.childAccount, ]
    commit('saveChildAccount', children)
  },
  async editChildAccount({ commit, dispatch, state, }, obj) {
    let res = await api.user.edit(obj);
    Message({ message: `编辑成功`, type: 'success' })

    let index = state.childAccount.findIndex(v => v.objectId === obj.objectId)
    let children = [...state.childAccount]
    children[index] = obj;
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

  async addRecord({ commit, dispatch, state, }, obj) {
    await api.record.checkTime(obj, state.nowUser.companyId, state.nowUser.objectId,);

    let res = await api.record.edit(obj);
    let type = obj.objectId ? 'edit' : 'add'

    Message({ message: `${type === 'add' ? '添加' : '编辑'}成功`, type: 'success' })
    commit('addRecordMutation', { ...obj, ...res });
  },
  async delRecord({ commit, dispatch, state, }, obj) {
    let res = await api.record.del(obj);

    Message({ message: `删除成功`, type: 'success' })
    commit('delRecordMutation', obj);
  },
  async addAct({ commit, dispatch, state, }, obj) {
    await api.act.checkTime(obj, state.nowUser.companyId, state.nowUser.objectId);

    let res = await api.act.edit(obj);
    let type = obj.objectId ? 'edit' : 'add'

    Message({ message: `${type === 'add' ? '添加' : '编辑'}成功`, type: 'success' })
    commit('addActMutation', { ...obj, ...res });
  },
  async delAct({ commit, dispatch, state, }, obj) {
    let res = await api.act.del(obj);

    Message({ message: `删除成功`, type: 'success' })
    commit('delActMutation', obj);
  },

  async changeDay({ commit, dispatch, state, }, val) {
    const start = val + ` 00:00:00`;
    const end = dayjs(val).add(1, 'day').add(8, 'hour').format(DATE_STR_DETAIL + ':ss');
    commit('changeDayMutation', val)

    dispatch('getAllRecords')
  },
  async getAllRecords({ commit, dispatch, state, }, val) {
    dispatch('getRecords')
    dispatch('getActs')
  },
  async getRecords({ commit, dispatch, state, }) {
    const val = state.selectDay;
    const [start, end] = getRange(val);
    // const start = val + ` 00:00:00`;
    // const end = dayjs(val).add(1, 'day').format(DATE_STR_DETAIL + ':ss');
    const list = await api.record.getList(state.nowUser.companyId, state.nowUser.objectId, start, end)
    commit('saveRecords', list)
  },
  async getActs({ commit, dispatch, state, }) {
    const val = state.selectDay;
    const [start, end] = getRange(val);
    // const start = val + ` 00:00:00`;
    // const end = dayjs(val).add(1, 'day').format(DATE_STR_DETAIL + ':ss');
    const list = await api.act.getList(state.nowUser.companyId, state.nowUser.objectId, start, end)
    commit('saveActs', list)
  },

  async restore({ commit, dispatch, state, }) {
    commit('restoreUser');

    setTimeout(async () => {
      let { user, } = state;
      if (!user) return;
      let newUser = await api.user.login(user.userName, user.passWord);
      dispatch('setUser', newUser);

      // let { nowUser, } = state;
      // let nowNewUser = await api.user.login(nowUser.nowUserName, user.passWord);
      // commit('chooseUser_', nowNewUser)
    }, 50);
  }
}

function validateDuplicate(isValid, text = `修改失败，姓名必须和已创建的房间名不同`) {
  if (isValid) {
    Message({ message: text, type: 'error' });
    throw new Error(text)
    return;
  }
}