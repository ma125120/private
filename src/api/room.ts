import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import { Room as RoomClass } from '@/types/sql'
import BaseApi from './base'

export default class Room extends BaseApi {
  tableName = 'FXZ_RoomAdmin';
  timeFields = [];

  async getList(branchStoreId, companyId) {
    try {
      let res = await this._query({
        branchStoreId,
        companyId,
      });
      if (res && res.length > 0) {
        return res.map(v => new RoomClass(v));
      } else {
        return [];
      }
    } catch (err) {
      console.log(err)
    }
  }

  async save(obj) {
    return this.edit(obj);
  }
  async edit(obj) {
    try {
      let res = await this._edit(obj);
      return res
    } catch (err) {
      return Promise.reject({
        code: 100,
        msg: '请重试',
      });
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

  async isDuplicate(name, branchStoreId, companyId) {
    try {
      let res = await this._query({
        roomName: name,
        companyId,
        branchStoreId,
      });

      return res && res.length > 0;
    } catch (err) {
      console.log(err)
    }
  }
}