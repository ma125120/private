import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import { Users } from '@/types/sql'
import BaseApi from './base'

export default class User extends BaseApi {
  tableName = 'FXZ_User';
  timeFields = ['overTime'];
  omitFields = ['accountType', 'status', 'versionTable', 'overTimeStr', 'passWord1', 'oldPassword', 'names']

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

  async findChildren(id): Promise<Users[]> {
    try {
      let res = await this._query({
        companyId: id,
        jurisdictionType: 1,
      });
      return res.map(v => new Users(v));
    } catch (err) {
      return Promise.reject({
        code: 100,
        msg: '错误，未找到分店账号',
      });
    }
  }

  async saveChild(user) {
    try {
      let res = await this._edit(user);
      return res
    } catch (err) {
      console.log(err)
      return Promise.reject({
        code: 100,
        msg: '错误，未找到分店账号',
      });
    }
  }

  async increment(user) {
    try {
      await this._edit({ ...user, branchStoreNum: user.branchStoreNum + 1 })
    } catch (err) {
      console.log(err)
      return Promise.reject({
        code: 100,
        msg: '分店账号+1失败',
      });
    }
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