import dayjs from "dayjs";

export function getDiff(date1, date2, type = 'width') {
  // if (type === 'left' && dayjs(date1).isBefore(dayjs(date2))) {
  //   date1 = dayjs(date1).add(1, 'day')
  // }
  let diff = dayjs(date1).diff(dayjs(date2)) / 1000;
  let hour = Math.abs(Math.floor((diff / 3600) % 24));
  let minute = Math.abs(Math.floor((diff % 3600) / 60));

  return {
    hour,
    minute,
    per: Math.abs(hour + minute / 60)
  };
}

export function getToday() {
  const nowDate = dayjs(new Date())
  const now = nowDate.format(DATE_STR_DETAIL + ':ss');
  return {
    str: now,
    hm: nowDate.format('HH:mm')
  }
}

export const isSameDate = (date1, date2) =>
  dayjs(date1).isSame(dayjs(date2), "date");

export const DATE_STR = "YYYY-MM-DD";
export const DATE_STR_DETAIL = "YYYY-MM-DD HH:mm";
export const DATE_STR_DETAIL1 = "YYYY-MM-DD HH:mm:ss";

export const now = dayjs(new Date()).format(DATE_STR);
export const weeks = ["日", "一", "二", "三", "四", "五", "六"];

export const hoursWith0 = new Array(24)
  .fill(0)
  .map((v, i) => `${i}`.padStart(2, "0"))
  .map(v => ({ id: v, name: v }));
export const minutesWith0 = new Array(60)
  .fill(0)
  .map((v, i) => `${i}`.padStart(2, "0"))
  .map(v => ({ id: v, name: v }));

export const hours = new Array(24)
  .fill(0)
  .map((v, i) => i + "")
  .map(v => ({ id: v, name: v }));
export const minutes = new Array(60)
  .fill(0)
  .map((v, i) => `${i}`.padStart(2, "0"))
  .map(v => ({ id: v, name: v }));

export const shortcuts = [
  {
    text: "今天",
    onClick(picker) {
      picker.$emit("pick", new Date());
    }
  },
  {
    text: "明天",
    onClick(picker) {
      picker.$emit(
        "pick",
        dayjs(new Date())
          .add(1, "day")
          .format(DATE_STR)
      );
    }
  }
];

export const getRange = (date) => {
  const val = date;
  const start = toDayjs(val + ` 00:00:00`).subtract(1, 'day').format(DATE_STR_DETAIL + ':ss');
  // console.log(start)
  const end = toDayjs(val).add(1, 'day').add(23, 'hour').add(59, 'minute').format(DATE_STR_DETAIL + ':ss');

  return [start, end]
}

export const toDayjs = (date) => {
  return dayjs(date && date.iso ? date.iso : date)
}

export const getLastWeekRange = () => {
  let time = dayjs().subtract(1, 'week');
  const day = time.day();
  // day() 6是周六 0 是周日

  let start = time.subtract(day === 0 ? 6 : day - 1, 'day');
  let end = time.add(day === 0 ? 0 : (7 - day), 'day');
  return [start, end].map(v => v.format(DATE_STR));
}
export const getLastMonthRange = () => {
  const month = dayjs().subtract(1, 'month');
  let start = month.day(0);
  let end = month.day(month.daysInMonth() - 1);
  return [start, end].map(v => v.format(DATE_STR));
}
export const getTodayRange = () => {
  let end = dayjs();
  return [end, end].map(v => v.format(DATE_STR));
}

export const isSameRange = (arr1, arr2) => {
  if (arr1.length === 0 || arr2.length === 0) return true;

  return dayjs(arr1[0]).isSame(dayjs(arr2[0]), 'day') && dayjs(arr1[1]).isSame(dayjs(arr2[1]), 'day')
}

export const toDayDiff = (item, now) =>  {
  now = dayjs(now);

  if (dayjs(item.startTime).isBefore(now)) {
    item.start = now.format(DATE_STR) + ` 00:00`;
  } else {
    item.start = item.startTime;
  }

  if (dayjs(item.endTime).isAfter(now.add(1, 'day'))) {
    item.end = now.format(DATE_STR) + ` 23:59`;
  } else {
    item.end = item.endTime;
  }
}

export const filterToday = (item, now) => {
  now = dayjs(now)
  const tomorrow = now.add(1, 'day');
  const yestorday = now.subtract(1, 'day')
  
  return !(item.objectId && dayjs(item.endTime).isBefore(now) || dayjs(item.startTime).isAfter(tomorrow))
}