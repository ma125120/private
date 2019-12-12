import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import { Users } from '@/types/sql'
import BaseApi from './base'

export default class User extends BaseApi {
  tableName = 'FXZ_User';
  timeFields = [];

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
    const query = Bmob.Query(this.tableName);
    query.set('id', obj.objectId);
    query.set('overTime', new Date(`2020-12-10 01:00`));
    query.set('version', '2019-12-08 00:00')
    query.save().then(res => {
      console.log(res)
    })
  }

  async findChildren(id): Promise<Users[]> {
    try {
      let res = await this._query({
        companyId: id,
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
      console.log(res)
      return res
    } catch (err) {
      console.log(err)
      return Promise.reject({
        code: 100,
        msg: '错误，未找到分店账号',
      });
    }
  }
}