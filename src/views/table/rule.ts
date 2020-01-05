
import { showError } from '@/util';

export default function validateRoom(form, arr = []) {
  if (form.roomId || arr.length > 0) return ;
  return true;
}