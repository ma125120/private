import dayjs from "dayjs";

export function getDiff(date1, date2) {
  let diff = dayjs(date1).diff(dayjs(date2)) / 1000;
  let hour = Math.abs(Math.floor((diff / 3600) % 24));
  let minute = Math.abs(Math.floor((diff % 3600) / 60));

  return {
    hour,
    minute,
    per: Math.abs(hour + minute / 60)
  };
}

export const isSameDate = (date1, date2) =>
  dayjs(date1).isSame(dayjs(date2), "date");

export const DATE_STR = "YYYY-MM-DD";
export const DATE_STR_DETAIL = "YYYY-MM-DD HH:mm";

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
  .map((v, i) => i + "")
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
  // {
  //   text: '昨天',
  //   onClick(picker) {
  //     const date = new Date();
  //     date.setTime(date.getTime() - 3600 * 1000 * 24);
  //     picker.$emit('pick', date);
  //   }
  // }, {
  //   text: '一周前',
  //   onClick(picker) {
  //     const date = new Date();
  //     date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
  //     picker.$emit('pick', date);
  //   }
  // }
];
