import { isSameDate } from './date';
// import { Room, Staff, Record } from "@/types/index";
import { getDiff, now, hours, minutes, toDayDiff, filterToday, toDayjs } from "./date";

const { Message } = ELEMENT
import router from '@/router'
import dayjs from 'dayjs';
export const arr2map = (arr, label, id = 'objectId') => arr.reduce((prev, next) => (prev[next[id]] = next[label], prev), {})

export const filterRecord = (time) => v => toDayjs(v.startTime).isSame(dayjs(time), 'day')

export const records = [];

export const HEIGHT = 50;
export const WIDTH = 118;

export const getReverseForm = () => ({
  roomId: '',
  startDate: now,
  startTime: "",
  endTime: "",
  duration: 0,
  count: 0,
  note: "",
  mobile: "",
  staffId: '',
  startHour: "00",
  startMinute: "00",
  durationHour: hours[0].id,
  durationMinute: minutes[0].id
});

export const getActForm = () => ({
  roomId: '',
  startDate: now,
  startTime: "",
  endTime: "",
  duration: 0,
  count: 0,
  status: '',
  roomCharge: '',
  actMoney: '',
  payType: [],
  note: "",
  staffId: '',
  staffName: '',
  startHour: "00",
  startMinute: "00",
  durationHour: hours[0].id,
  durationMinute: minutes[0].id,
  endHour: "2",
  endMinute: "00",
});

export const record2form = (record = getReverseForm()) => ({
  ...record,
  // staff: record.staff && record.staff.id + "",
  // room: record.room && record.room.id + ""
});

export const formatRecord = (arr, now = "2019-12-06", roomlist) => {
  if (!roomlist) return [];
  const nextDay = dayjs(now).add(1, 'day')
  if (arr && arr.length > 0) {
    arr.filter(v => filterToday(v, now)).forEach(v => toDayDiff(v, now));
  }

  // const rooms = new Set([...roomlist.map(v => v.roomName), ...arr.map(v => v.roomName)]);
  const rooms = new Set([
    ...roomlist.map(v => v.roomName),
    ...arr.map(v => v.roomName)
  ]);
  let results = [];
  [...rooms].map((room, i) => {  
    let children = arr.filter(v => v.roomName === room);
    children = children.map(v => ({
      ...v,
      top: i + 1,
      visible: false,
      left: getDiff(v.start, now, 'left').per,
      width: getDiff(v.end, v.start).per,
    }));
    if (children.length > 0) {
      results.push({ roomName: room, roomId: children[0].roomId, children });
    } else {
      results.push({ roomName: room, roomId: Date.now() + Math.random(), children: [], });
    }
  });

  return results;
};

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  });
}

export async function scroll5(name, len, date) {

  if (len <= 5 || !router.currentRoute.path.startsWith('/work') || !isSameDate(date, new Date())) return ;

  await wait(50);
  const scrollEl = document.querySelector(`.${name} .el-table__body-wrapper`);
  const el = document.querySelectorAll(`.${name} .el-table__body tbody tr`)

  if (el && el[len - 5]) {
    const { top = 0 } = el[len - 5].getBoundingClientRect();
    scrollEl.scrollTop = top;
  }
}

let ins;
export const showError = (text, needThrow = false) => {
  if (ins) {
    ins.close();
  }
  ins = Message({
    type: "error",
    message: text
  });
  if (needThrow) {
    throw new Error(text)
  }
};

export const barHeight = window.innerWidth >= 1280 ? 0 : 0;
// console.log(barHeight, window.innerWidth);