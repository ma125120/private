import { Notification } from 'element-ui'
import { showError } from '@/util';

export default function validateRoom(form, arr = []) {
  if (form.roomId || arr.length > 0) return ;
  showError('请先用管理员账号去设置-房间管理页，创建房间，这里必须选择房间才能保存成功', true)
  // Notification.error({
  //   title: '错误',
  //   message: '请先用管理员账号去设置-房间管理页，创建房间，这里必须选择房间才能保存成功'
  // });
  // throw new Error('');
}