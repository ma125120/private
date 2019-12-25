import dayjs from 'dayjs'

export const getVaildDate = (item) => dayjs(item.overTime).isAfter(dayjs())

export const getInvaildDate = (item) => dayjs().isAfter(dayjs(item.overTime))

export const composeTable = (list, fields = []) => {
  if (list.length === 0) {
    return []
  }
  let obj = {
    startTime: '',
    endTime: '',
  };
  // let fields = ['roomCharge', 'snackFee', 'shouldPay', 'discount', 'actMoney']
  fields.map(key => {
    obj[key] = list.reduce((prev, next) => prev + (next[key] || 0), 0)
  })
  list.push(obj)

  return list;
}