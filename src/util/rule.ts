import { showError } from '@/util';
// 44、这里限制能输入11位数字，其他字符输入失败，直接TOAST：输入失败，只能输入数字。
// 超出11位，输入失败，直接TOAST：输入失败，只能输入11位数字手机号

export const validateNum = (form, arr = []) => {
  if (form.mobile) {
    let { mobile } = form;
    if (!/^\d+$/g.test(mobile)) {
      showError('手机号只能输入数字', true);
    } else if (!/^\d{11}$/g.test(mobile)) {
      showError('只能输入11位数字手机号', true);
    }
  }

  if (form.durationHour === '0' && form.durationMinute === '00') {
    showError('保存失败，预计时长必须大于0小时00分钟', true);
  }
}