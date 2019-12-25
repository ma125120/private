import { isSameDate } from './date';
// import { Room, Staff, Record } from "@/types/index";
import { getDiff, now, hours, minutes } from "./date";
import { Message } from 'element-ui'
// import { rooms, staffes } from "./mock";
import router from '@/router'
export const arr2map = (arr, label, id = 'objectId') => arr.reduce((prev, next) => (prev[next[id]] = next[label], prev), {})

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

export const formatRecord = (arr: any[], now = "2019-12-06", roomlist) => {
  if (!roomlist) return [];

  const rooms = new Set(roomlist.map(v => v.roomName));
  let results = [];
  [...rooms].map((room, i) => {
    let children = arr.filter(v => v.roomName === room);
    children = children.map(v => ({
      ...v,
      top: i + 1,
      visible: false,
      left: getDiff(v.startTime, now + ' 08:00', 'left').per,
      width: getDiff(v.endTime, v.startTime).per
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

export const showError = (text, needThrow = false) => {
  Message({
    type: "error",
    message: text
  });
  if (needThrow) {
    throw new Error(text)
  }
};
