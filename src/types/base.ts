export function assign(defaultObj, nowObj) {
  const obj = { ...defaultObj, ...nowObj }
  Object.keys(obj).map(v => {
    if (obj[v] === null) {
      obj[v] = defaultObj[v]
    }
  })

  return obj
}