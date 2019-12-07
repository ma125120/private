import { Room, Staff, Record } from "@/types/index";
import { getDiff, now, hours, minutes } from "./date";
import { rooms, staffes } from "./mock";
export { rooms, staffes } from "./mock";

export const records = [
  {
    room: rooms[0],
    staff: staffes[0],
    id: 1,
    mobile: "18201103398",
    startTime: "2019-12-07 09:38",
    endTime: "2019-12-07 12:38",
    startDate: "2019-12-07",
    startHour: "09",
    startMinute: "38",
    durationHour: "3",
    durationMinute: "00",
    count: 12,
    duration: 3,
    note: "谷歌备注大萨达撒大阿斯达"
  },

  {
    id: 2,
    room: rooms[1],
    staff: staffes[1],
    mobile: "18201103395",
    startTime: "2019-12-07 08:00",
    endTime: "2019-12-07 09:10",
    startDate: "2019-12-07",
    startHour: "08",
    startMinute: "00",
    durationHour: "1",
    durationMinute: "10",
    count: 12,
    duration: 1.1,
    note: ""
  },
  {
    id: 3,
    room: rooms[2],
    staff: staffes[1],
    mobile: "18201103395",
    startTime: "2019-12-07 18:00",
    endTime: "2019-12-07 19:10",
    count: 12,
    duration: 1.1,
    startDate: "2019-12-07",
    startHour: "18",
    startMinute: "00",
    durationHour: "1",
    durationMinute: "10",
    note: ""
  },
  {
    id: 4,
    room: rooms[3],
    staff: staffes[0],
    mobile: "18401103395",
    startTime: "2019-12-07 20:00",
    endTime: "2019-12-07 21:10",
    duration: 1.1,
    startDate: "2019-12-07",
    startHour: "20",
    startMinute: "00",
    durationHour: "1",
    durationMinute: "10",
    count: 12,
    note: ""
  }
];

export const HEIGHT = 50;
export const WIDTH = 118;

export const getReverseForm = () => ({
  room: null,
  startDate: now,
  startTime: "",
  endTime: "",
  duration: 0,
  count: 0,
  note: "",
  mobile: "",
  staff: null,
  startHour: "00",
  startMinute: "00",
  durationHour: hours[0].id,
  durationMinute: minutes[0].id
});

export const record2form = (record = getReverseForm()) => ({
  ...record,
  staff: record.staff && record.staff.id + "",
  room: record.room && record.room.id + ""
});

export const formatRecord = (arr: any[], now = "2019-12-06 08:00") => {
  const rooms = new Set(arr.map(v => v.room.name));
  let results = [];
  [...rooms].map((room, i) => {
    let children = arr.filter(v => v.room.name === room);
    children = children.map(v => ({
      ...v,
      top: i + 1,
      visible: false,
      left: getDiff(v.startTime, now).per,
      width: getDiff(v.endTime, v.startTime).per
    }));
    if (children.length > 0) {
      results.push({ roomName: room, roomId: children[0].room.id, children });
    }
  });

  return results;
};
