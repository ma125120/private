import dayjs from 'dayjs'

export const getVaildDate = (item) => dayjs(item.overTime).isAfter(dayjs())

export const getInvaildDate = (item) => dayjs().isAfter(dayjs(item.overTime))