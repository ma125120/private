import XLSX from 'xlsx'
import { showError } from './index'
import { filterToday, } from './date'
import dayjs from 'dayjs';

export const exportExcel = (arr, headers, filename, startDate, endDate, text, ) => {
  if (arr.length === 0) {
    showError('数据为空，无需下载', true);
  }

  const header1 = text + ' ' + dayjs(startDate).format(`YYYYMMDD`) + '-' + dayjs(endDate).format(`YYYYMMDD`)

  let book = XLSX.utils.book_new();
  let date = dayjs(startDate)
  endDate = dayjs(endDate).add(1, 'day')
  do {
    let sheet = XLSX.utils.aoa_to_sheet(json2arr(arr, headers, date, header1))
    XLSX.utils.book_append_sheet(book, sheet, date.format(`YYYYMMDD`))

    date = date.add(1, 'day')
  } while (date.isBefore(endDate));
  
  let wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: true, type: 'array' });
  let blob = new Blob([wbout], { type: 'application/octet-stream' });
  download(URL.createObjectURL(blob), filename + '.xlsx')
}

export const download = (url, name = '1.xlsx') => {
  let a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
}

function json2arr(arr = [], headers = [], date = dayjs(), header1){
  const dateStr = dayjs(date).format(`YYYYMMDD`)
  arr = arr.filter(v => filterToday(v, date)).map(v => ({ ...v, date: dateStr }));
  let res = [];
  let header = [];
  // if (hasIndex) {
  //   header.push(``)
  // }
  header = [...header, ...headers.map(v => v.name)];

  let nest = arr.map((v, i) => {
    let item = [];
    // if (hasIndex) {
    //   item.push(i + 1)
    // }
    item = [...item, ...headers.map(({ key }) => v[key])];
    return item;
  })

  return [
    [header1],
    header,
    ...nest,
  ]
}

export const json2table = (arr, headers = [], hasIndex = true) => {
  let table = [`<table><thead><tr>`]
  if (hasIndex) {
    table.push(`<th></th>`)
  }
  headers.forEach(v => {
    table.push(`<th>${v.name}</th>`)
  })
  table.push(`</tr></thead><tbody>`)
  arr.forEach((v, i) => {
    table.push(`<tr>`)
    if (hasIndex) {
      table.push(`<td>${i + 1}</td>`)
    }
    headers.forEach(({ key }) => {
      table.push(`<td>${v[key]}</td>`)
    })
    table.push(`</tr>`)
  })
  table.push(`</tbody></table>`)

  return table.join('');
}

export const actHeader = [
  { name: '日期', key: 'date' },
  { name: '房间', key: 'roomName', },
  { name: '到店时间', key: 'startTime', },
  { name: '实际时长/h', key: 'duration', },
  { name: '离店时间', key: 'endTime', },
  { name: '缴费状态', key: 'statusStr', },
  { name: '房间费', key: 'roomCharge', },
  { name: '小吃费', key: 'snackFee', },
  { name: '应收总金额', key: 'shouldPay', },
  { name: '优惠金额', key: 'discount', },
  { name: '实收总金额', key: 'actMoney', },
  { name: '付款方式', key: 'payTypeStr', },
  { name: '人数', key: 'count', },
  { name: '房费以外的收费项目明细', key: 'note', },
  // { name: '员工', key: 'staffName', },
]

export const recordHeader = [
  { name: '日期', key: 'date' },
  { name: '房间名', key: 'roomName', },
  { name: '电话', key: 'mobile', },
  { name: '到店时间', key: 'startTime', },
  { name: '预计时长/h', key: 'duration', },
  { name: '离店时间', key: 'endTime', },
  { name: '人数', key: 'count', },
  { name: '备注', key: 'note', },
  { name: '预订员工', key: 'staffName', },
]