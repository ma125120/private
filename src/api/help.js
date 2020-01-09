import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
// import { Room as RoomClass } from "@/types/sql";
import BaseApi from "./base";

// const sb = v => ({ ...v, answer: v.answer. });
export default class Room extends BaseApi {
  tableName = "help";
  timeFields = [];

  async getList(branchStoreId, companyId) {
    try {
      let res = await this._query();
      if (res && res.length > 0) {
        const result = {
          1: res.filter(v => v.type === 1).sort((a, b) => a.sort - b.sort),
          2: res.filter(v => v.type === 2).sort((a, b) => a.sort - b.sort),
          3: res.filter(v => v.type === 3).sort((a, b) => a.sort - b.sort),
          4: res.filter(v => v.type === 4).sort((a, b) => a.sort - b.sort),
        };

        return result;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    return this.edit(obj);
  }
  async edit(obj) {
    try {
      let res = await this._edit(obj);
      return res;
    } catch (err) {
      return Promise.reject({
        code: 100,
        msg: "请重试"
      });
    }
  }

  async del(obj) {
    try {
      let res = await this._del(obj);
      return res;
    } catch (err) {
      return Promise.reject({
        code: 100,
        msg: "删除失败，请重试"
      });
    }
  }
}
