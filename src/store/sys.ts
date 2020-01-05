import dayjs from 'dayjs'

const now = dayjs();
const _expires = [7, 3, 1,]

export const toDayjs = (date) => {
  return dayjs(date && date.iso ? date.iso : date);
};

export const getSysMsgs = (arr = []) => {
  let res = [];
  arr.map(v => {
    const end = toDayjs(v.overTime)
    let diff = end.diff(now, 'day');
    let expires = [30, ..._expires];
    if (v.isTest) {
      expires[0] = 10
    }

    expires.forEach(count => {
      if (diff <= count) {
        res.push({
          text: getText(v.branchStoreName, count, v.isTest),
          date: end.subtract(count, "day"),
          time: end.subtract(count, "day").format(`YYYY年MM月DD日`)
        });
      }
    });

    if (end.diff(now, 'day') === 0) {
      res.push({
        text: getText(v.branchStoreName, 0, v.isTest),
        date: end,
        time: end.format(`YYYY年MM月DD日`)
      });
    }
  });
  res.sort((a, b) => b.date.diff(a.date))

  return res.map(v => ({ text: v.text, time: v.time }));
}

function getText(name = '', count = 1, isTest = false, ) {
  const username = isTest ? `试用账号` : `分店账号：${name}，`;
  const dayText = count === 0 ? `今天` : `还有${count}天`;
  return `你的${username}${dayText}就要到期了，到期后系统所有功能无法使用，请尽快联系客户经理续费哦（微信号2829672684）。如果不再续费，可以尽快导出历史数据，到期后不能再导出。`;
}