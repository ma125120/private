import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import { Actual as ActClass } from '@/types/sql'
import BaseApi from './base'
const { Message } = ELEMENT
import { checkTime } from './record'
import { getRange } from '@/util/date'

export default class Act extends BaseApi {
                 sort = "createdAt";
                 tableName = "FXZ_Actual";
                 timeFields = ["startTime", "endTime", "", ""];
                 omitFields = [
                   "startHour",
                   "startTimeStr",
                   "endTimeStr",
                   "start",
                   "end",
                   "durationStr",
                   "payTypeStr",
                   "statusStr",
                   "startMinute",
                   "durationHour",
                   "durationMinute",
                   "endHour",
                   "endMinute",
                   "passWord1",
                   "oldPassword",
                   "names"
                 ];

                 async getList(superId, parentId, startTime, endTime) {
                   try {
                     let res = await this._query(
                       {
                         parentId,
                         superId
                       },
                       [
                         [`startTime`, ">=", startTime],
                         [`endTime`, "<=", endTime]
                       ]
                     );
                     if (res && res.length > 0) {
                       return res.map(v => new ActClass(v));
                     } else {
                       return [];
                     }
                   } catch (err) {
                     console.log(err);
                   }
                 }

                 async find(objectId) {
                   try {
                     let res = await this._query({
                       objectId
                     });
                     if (res && res.length > 0) {
                       return new ActClass(res[0]);
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
                     console.log(err);
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
                     console.log(err);
                     return Promise.reject({
                       code: 100,
                       msg: "删除失败，请重试"
                     });
                   }
                 }

                 async isDuplicate(name, branchStoreId, companyId) {
                   try {
                     let res = await this._query({
                       roomName: name,
                       companyId,
                       branchStoreId
                     });

                     return res && res.length > 0;
                   } catch (err) {
                     console.log(err);
                   }
                 }
                 async checkTime(obj, superId, parentId) {
                   let [start, end] = getRange(obj.startDate);

                   let res = await this._query(
                     {
                       superId: obj.superId,
                       parentId: obj.parentId,
                       roomName: obj.roomName
                     },
                     [
                       [`startTime`, ">=", start],
                       [`endTime`, "<=", end]
                     ]
                   );
                   res = res
                     .map(v => new ActClass(v))
                     .filter(v => v.objectId !== obj.objectId);

                   if (res && res.length > 0 && checkTime(res, obj)) {
                     Message({
                       message: `保存失败，此房间该时间段已有项目，请修改`,
                       type: "error"
                     });
                     throw new Error(
                       "保存失败，此房间该时间段已有项目，请修改"
                     );
                   }
                 }
               }