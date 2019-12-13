import { assign } from "./base"
import dayjs from 'dayjs';

// Date类型一般为 2019-12-09 12:00这种
// 下方的类型表示枚举类型
// payType: 1 | 2 | 3 | 4 | 5 | 6 | 7;
const roles = {
  0: '管理员',
  1: '店长',
  2: '普通店员'
}

export class Users {
  constructor(data: any = {}) {
    const obj = assign(this, data) as Users;
    obj.overTimeStr = dayjs(obj.createdAt).add(obj.expireDuration, 'date').format(`YYYY年M月D日H时m分`);
    obj.overTime = dayjs(obj.createdAt).add(obj.expireDuration, 'date').format(`YYYY-MM-DD HH:mm`);
    return obj
  }

  objectId: string;
  overTimeStr?: string;
  // 分店店名，有则写，没有则无
  name: string;
  // 账号
  userName: string;
  // 密码
  passWord: string;
  // 账号类型 1 总店 2 分店 3 子账号
  jurisdictionType: keyof typeof roles;
  // 所属分店的id
  branchStoreId: string;
  // 所属总管理员的id
  companyId: string;
  // 总公司名和曾
  companyName: string = '';
  // 分部数量
  branchStoreNum: number = 0;
  // 可以创建分店的数量
  storeNumber: number = 0;
  // 是否为试用版本
  status: boolean = false;
  // 版本状态
  // version: string;
  // 有效期，以天为单位
  expireDuration: number = 30;
  // 到期时间
  overTime: string;
  // 分店账号的创建名额
  count: number;
  // 子账号的创建名额,默认为10
  childCount: number;
  // 权限，保留字段，目前是死的
  auth: string;
  // 创建日期
  createdAt: string;
}

// 店员表
class Staff {
  id: string;
  // 店员姓名
  name: string;
  // 状态， 1 在职 2 离职
  status: 0 | 1;
  // 所属分店的id，
  parentId: string;
  // 所属总管理员的id
  superId: string;
}

// 房间表
class Room {
  id: string;
  // 房间名
  name: string;
  // 所属分店的id，
  parentId: string;
  // 所属总管理员的id
  superId: string;
}

// 预约记录表
class Reservation {
  id: string;
  // 房间id
  roomId: string;
  // 到店时间
  startTime: Date;
  // 离店时间
  endTime: Date;
  // 人数
  count: number;
  // 备注
  note: string;
  // 顾客手机号
  mobile: string;
  // 店员id
  staffId: string;
  // 持续时长，以 h 为单位
  duration: number;
  // 所属分店的id
  parentId: string;
  // 所属总管理员的id
  superId: string;
}

// 实际到店表
class Actual {
  id: string;
  // 房间id
  roomId: string;
  // 到店时间
  startTime: Date;
  // 持续时长，以 h 为单位
  duration: number;
  // 离店时间
  endTime: Date;
  // 缴费状态 1 已结 2 未结
  status: 1 | 2;
  // 房间费
  roomCharge: number;
  // 小吃费
  snackFee: number;
  // 应付总金额
  shouldPay: number;
  // 优惠金额
  discount: number;
  // 实收总金额
  actMoney: number;
  // 付款方式
  payType: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  // 人数
  count: number;
  // 房间以外收费明细
  note: string;
  // 店员id
  staffId: string;
  
  // 所属分店的id
  parentId: string;
  // 所属总管理员的id
  superId: string;
}