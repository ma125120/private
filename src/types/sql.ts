import { DATE_STR } from './../util/date';
import { assign } from "./base"
import dayjs from 'dayjs';
import { hours, minutes, toDayjs, DATE_STR_DETAIL1 } from "@/util/date";
import { arr2map } from '@/util/index'

// Date类型一般为 2019-12-09 12:00这种
// 下方的类型表示枚举类型
// payType: 1 | 2 | 3 | 4 | 5 | 6 | 7;
const roles = {
  0: '公司总管理员',
  1: '分店管理员账号',
  2: '子账号'
}

export const over2time = (str = '试用30天') => {
  const obj = {
    '已付费(季度)': [3, 'month', '季度'],
    '已付费(半年度)': [6, 'month', '半年度'],
    '已付费(年度)': [1, 'year', '年度'],
    '试用30天': [30, 'day', '30天'],
  }

  return obj[str] || [];
}

export const getOvertime = (str, time = '') => {
  const times = over2time(str);
  const date = time ? toDayjs(time) : dayjs()
  return date.add(times[0], times[1]).format(DATE_STR_DETAIL1);
}

export const getExpire = (str) => {
  const times = over2time(str);
  return times && times[2] || ''
}

function getMinuteNum(num) {
  let str = (num + '').split('.')[1] || '0'
  str = '0.' + str;

  return (Math.round(+str * 60) + '').padStart(2, '0');
}

function isTestUser(user: Users) {
  return over2time(user.version)[0] === 30;
}
export class Users {
  constructor(data: any = {}) {
    const obj = assign(this, data) as Users;
    // const overTime = dayjs(getOvertime(obj.version, obj.createTime)) ;
    const overTime = toDayjs(obj.overTime)
    obj.overTimeStr = overTime.format(`YYYY年M月D日H:m`);
    obj.overTime = overTime.format(`YYYY-MM-DD HH:mm`);
    obj.createTime = toDayjs(obj.createTime || Date.now()).format(DATE_STR);
    obj.accountType = roles[obj.jurisdictionType]
    if (obj.jurisdictionType !== 0) {
      obj.accountType += `：${obj.branchStoreName || obj.companyName}`
    }

    const isOver = dayjs(Date.now()).isAfter(overTime);
    obj.version = (obj.version || '').replace(/（/g, '(').replace(/）/g, ')').trim()
    obj.expireDuration = getExpire(obj.version);
    obj.versionStr = isOver ? `已到期` : obj.version;
    obj.isTest = isTestUser(obj);
    obj.versionTable = isOver ? `已到期请续费\n到期时间：\n   ${overTime.format(`YYYYMMDD`)}` : `已付费生效`;
    return obj
  }

  objectId: string;
  isTest: boolean = false;
  overTimeStr?: string;
  accountType?: string;
  versionTable?: string;
  versionStr: string;
  branchStoreNames?: string[];
  branchStoreIds: string[];
  // 激活时间
  createTime: string;
  // 	是否激活 （ 0未激活 1已激活 ）
  isActivation: number;
  // 分店店名，有则写，没有则无
  branchStoreName: string;
  // 账号
  userName: string;
  // 密码
  passWord: string;
  // 账号类型 
  jurisdictionType: keyof typeof roles;
  // 所属分店的id
  branchStoreId: string;
  // 所属总管理员的id
  companyId: string;
  // 总公司名和曾
  companyName: string = '';
  // 分部数量,为0时表示第一次创建，需要新手指引
  branchStoreNum: number = 0;
  // 可以创建分店的数量
  storeNumber: number = 0;
  // 是否为试用版本
  status: boolean = false;
  // 版本状态
  version: string;
  // 有效期，以天为单位
  expireDuration: number = 30;
  // 到期时间
  overTime: string;
  // 权限，保留字段，目前是死的
  auth: string;
  // 创建日期
  createdAt: string;
}

// 店员表
export class Staff {
  constructor(data: any = {}) {
    const obj = assign(this, data) as Staff;
    return obj
  }

  objectId: string;
  // 店员姓名
  clerkName: string;
  // 状态， 1 在职 2 离职
  clerkType: 1 | 2 = 1;
  // 所属分店的id，
  branchStoreId: string;
  // 所属总管理员的id
  companyId: string;
}

// 房间表
export class Room {
  constructor(data: any = {}) {
    const obj = assign(this, data) as Room;
    return obj
  }
  objectId: string;
  // 房间名
  roomName: string;
  // 所属分店的id，
  branchStoreId: string;
  // 所属总管理员的id
  companyId: string;
}

const toDay = (str) => {
  return dayjs(typeof str === 'string' ? str : str.iso).format(`YYYY-MM-DD HH:mm`)
}
// 预约记录表
export class Reservation {
  constructor(data: any = {}) {
    const obj = assign(this, data) as Reservation;
    obj.startTime = toDay(obj.startTime);
    obj.endTime = toDay(obj.endTime);
    let _start = dayjs(obj.startTime)
    let _end = dayjs(obj.endTime)
    obj.startDate = _start.format(`YYYY-MM-DD`);
    obj.startHour = _start.format(`HH`);
    obj.startMinute = _start.format(`mm`);
    obj.durationHour = Math.floor(obj.duration) + '';
    obj.durationMinute = getMinuteNum(obj.duration);
    obj.durationStr = obj.durationHour + 'h' + +obj.durationMinute + 'min'
    return obj
  }
  
  startDate: String;
  startHour = "00";
  startMinute = "00";
  durationHour = hours[0].id;
  durationMinute = minutes[0].id;
  durationStr: string;

  id: string;
  // start: string;
  // end: string;
  // 房间id
  roomId: string;
  // 到店时间
  startTime: string;
  // 离店时间
  endTime: string;
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

export const actStatus = [
  { id: '1', name: '已结' },
  { id: '2', name: '未结' },
]
// 付款方式 1团购 2微信 3支付宝 4美团预定 5现金 6美团买单
export const payTypes = [
  { id: '1', name: '团购' },
  { id: '2', name: '微信' },
  { id: '3', name: '支付宝' },
  { id: '4', name: '美团预定' },
  { id: '5', name: '现金' },
  { id: '6', name: '美团买单' },
]
export const payMap = arr2map(payTypes, 'name', 'id');
export const actStatusMap = arr2map(actStatus, 'name', 'id');
// 实际到店表
export class Actual {
  constructor(data: any = {}) {
    const obj = assign(this, data) as Actual;
    obj.statusStr = actStatusMap[obj.status] || '';
    obj.startTime = toDay(obj.startTime);
    obj.endTime = toDay(obj.endTime);
    let _start = dayjs(obj.startTime);
    let _end = dayjs(obj.endTime);
    obj.startDate = _start.format(`YYYY-MM-DD`);
    obj.startHour = _start.format(`HH`);
    obj.endMinute = _end.format(`mm`);
    obj.endHour = _end.format(`HH`);
    obj.startMinute = _start.format(`mm`);
    obj.durationHour = Math.floor(obj.duration) + '';
    obj.durationMinute = getMinuteNum(obj.duration);
    obj.payTypeStr = obj.payType.map(v => payMap[v]).join(' ')
    obj.durationStr = obj.durationHour + 'h' + +obj.durationMinute + 'min'
    return obj
  }
  
  id: string;
  startHour: string;
  startMinute: string;
  durationHour: string;
  durationMinute: string;
  endHour: string;
  endMinute: string;
  statusStr: string;
  payTypeStr: string;
  durationStr: string;
  // 房间id
  roomId: string;
  // 到店时间
  startTime: string;
  startDate: string;
  // 持续时长，以 h 为单位
  duration: number;
  // 离店时间
  endTime: string;
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
  // 付款方式[]
  payType: (1 | 2 | 3 | 4 | 5 | 6 | 7)[] = [];
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
