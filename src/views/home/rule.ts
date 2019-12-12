
export function validateLen(val, text, cb, min, max, reg = '', regText = '') {
  let len = val.length || 0;
  
  if (len > max) {
    cb(new Error(`${text}字符数超出要求`));
    return false;
  } else if (len < min) {
    cb(new Error(`${text}字符数不足要求`));
    return false;
  } else if (reg && !reg.test(val)) {
    cb(new Error(regText));
    return false;
  } else {
    cb();
    return true;
  }

  return true;
}