import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import { Users } from '@/types/sql'
import BaseApi from './base'
import { showError } from '@/util'

export default class User extends BaseApi {
  tableName = 'FXZ_User';
  timeFields = ['overTime', 'createTime'];
  omitFields = ['accountType', 'status', 'versionStr', 'versionTable', 'overTimeStr', 'passWord1', 'oldPassword', 'names',]

  async login(userName, passWord) {
    try {
      let res = await this._query({
        userName,
        passWord
      });
      if (res[0]) {
        return new Users(res[0]);
      } else {
        return Promise.reject({
          code: 100,
          msg: '账号或密码输入错误，请重新输入',
        });
      }
    } catch(err) {
      console.log(err)
    }
  }

  edit(obj) {
    return this.saveChild(obj);
  }

  async checkActive(data, companyId) {
    let res = await this._query({
      companyId,
      jurisdictionType: 1,
      userName: data.userName,
      passWord: data.passWord,
    });
    if (!res || res.length === 0) {
      showError('账号名或密码错误');
      throw new Error('');
    }

    const user = res && res[0] || {} as Users;
    if (user.isActivation) {
      showError('账号已激活，请更换账号');
      throw new Error('');
    }

    return user;
  }

  async findChildren(id): Promise<Users[]> {
    try {
      let res = await this._query({
        companyId: id,
        jurisdictionType: 1,
      });
      return res.map(v => new Users(v));
    } catch (err) {
      console.log(err)
      return Promise.reject({
        code: 100,
        msg: '错误，未找到分店账号',
      });
    }
  }

  async saveChild(user) {
    let { userName, passWord, objectId } = user;
    if (!objectId) {
      let result = await this._query({
        userName,
      });
      if (result && result.length > 0) {
        showError('该账号已存在，请更换账号名');
        throw new Error('')
      }
    }
    
    try {
      let res = await this._edit(user);
      return res
    } catch (err) {
      console.log(err)
      return Promise.reject({
        code: 100,
        msg: '错误，保存分店账号失败',
      });
    }
  }

  async increment(user) {
    // try {
    //   await this._edit({ ...user, branchStoreNum: user.branchStoreNum + 1 })
    // } catch (err) {
    //   console.log(err)
    //   return Promise.reject({
    //     code: 100,
    //     msg: '分店账号+1失败',
    //   });
    // }
  }

  async getChildAccounts(companyId, branchStoreId, ) {
    try {
      let res = await this._query({
        companyId,
        jurisdictionType: 2,
      });

      return res;
    } catch (err) {
      console.log(err)
    }
  }
  async getChildAccount(objectId) {
    try {
      let res = await this._query({
        objectId,
        // jurisdictionType: 2,
      });

      return res && res[0] || {};
    } catch (err) {
      console.log(err)
    }
  }

  async del(obj) {
    try {
      let res = await this._del(obj);
      return res
    } catch (err) {
      return Promise.reject({
        code: 100,
        msg: '删除失败，请重试',
      });
    }
  }
}