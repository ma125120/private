import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import { Reservation as ReservationClass } from '@/types/sql'
import BaseApi from './base'
import { Message } from 'element-ui';

export default class Reservation extends BaseApi {
  tableName = 'FXZ_Reservation';
  timeFields = ['startTime', 'endTime'];
  omitFields = ['startHour', 'startMinute', 'durationHour', 'durationMinute', 'passWord1', 'oldPassword', 'names']

  async getList(superId, parentId, startTime, endTime) {
    try {
      let res = await this._query({
        parentId,
        superId,
      }, [
        [`startTime`, '>=', startTime,],
        [`endTime`, '<=', endTime,]
      ]);
      if (res && res.length > 0) {
        return res.map(v => new ReservationClass(v));
      } else {
        return [];
      }
    } catch (err) {
      console.log(err)
    }
  }

  async find(objectId) {
    try {
      let res = await this._query({
        objectId,
      });
      if (res && res.length > 0) {
        return new ReservationClass(res[0])
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
      console.log(err)
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
      console.log(err)
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
  async checkTime(obj, companyId, branchStoreId) {
    if (!obj.objectId) return ;

    try {
      let res = await this._query({
        companyId,
        branchStoreId,
      }, [
        'startTime', '>=', obj.startTime,
        'endTime', '>=', obj.endTime,
        'objectId', '!=', obj.objectId,
      ]);

      if (res && res.length > 0) {
        Message({ message: `保存失败，此房间该时间段已有预约项目，请修改`, type: 'error' })
        throw new Error('保存失败，此房间该时间段已有预约项目，请修改');
      }
    } catch (err) {
      console.log(err)
    }
  }
}