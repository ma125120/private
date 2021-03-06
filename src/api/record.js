import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import { Reservation as ReservationClass } from '@/types/sql'
import BaseApi from './base'
const { Message } = ELEMENT
import { getRange, toDayjs, DATE_STR } from '@/util/date'
import dayjs from 'dayjs';

export default class Reservation extends BaseApi {
                 sort = "createdAt";
                 tableName = "FXZ_Reservation";
                 timeFields = ["startTime", "endTime"];
                 omitFields = [
                   "startHour",
                   "startMinute",
                   "durationStr",
                   "start",
                   "end",
                   "startTimeStr",
                   "endTimeStr",
                   "durationHour",
                   "durationMinute",
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
                       return res.map(v => new ReservationClass(v));
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
                       return new ReservationClass(res[0]);
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
                   // console.log(obj)
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
                     .map(v => new ReservationClass(v))
                     .filter(v => v.objectId !== obj.objectId);

                   if (res && res.length > 0 && checkTime(res, obj)) {
                     Message({
                       message: `保存失败，此房间该时间段已有预约项目，请修改`,
                       type: "error"
                     });
                     throw new Error(
                       "保存失败，此房间该时间段已有预约项目，请修改"
                     );
                   }
                   // throw new Error()
                 }
               }

export function checkTime(arr, obj) {
  let start = toDayjs(obj.startTime);
  let end = toDayjs(obj.endTime);

  return arr.some(v => {
      let startTime = toDayjs(v.startTime)
      let endTime = toDayjs(v.endTime)

      return !(endTime.isBefore(start)
      || startTime.isAfter(end)
      || (startTime.isSame(end, 'hour') && startTime.isSame(end, 'minute'))
      || (endTime.isSame(start, 'hour') && endTime.isSame(start, 'minute'))
      )
    })
}

// // true表示冲突
// export function checkTime(arr, obj) {
//   let start = dayjs(obj.startTime);
//   let end = dayjs(obj.endTime);
//   /**
//    * 结束在start之后
//    * 开始在end之前
//    * 开始在start之后 结束在start之前
//    */
  
//   /*
//   * 开始时间 < endTime < 结束时间
//   * 开始时间 < startTime < 结束时间
//   * 开始时间 < startTime && endTime < 结束时间
//    */

//   return arr.filter(v => v.objectId !== obj.objectId)
//   .some(v => {
//     let startTime = dayjs(v.startTime)
//     let endTime = dayjs(v.endTime)

//     return (isBefore(endTime, start) && isBefore(end, endTime))
//       || (isBefore(startTime, start) && isBefore(start, endTime))
//       || (isBefore(startTime, start) && isBefore(end, endTime))
//     || startTime.isSame(start, 'minute') || endTime.isSame(end, 'minute')
//   })
// }

// function isBefore(date1, date2) {
//   return date1.diff(date2) < 0;
// }
// function isAfter(date1, date2) {
//   return date1.diff(date2) > 0;
// }

