
import router from '@/router';
import routeNames from '@/router/name'
import {Notification} from 'element-ui'
export default {
  saveUser(state, user) {
    state.user = user;
  },
  saveChildren(state, children) {
    state.saveChildren = children;
    if (children.length > 0) {
      state.isShowAddChild = false;
      state.nowUser = children[0];
      router.push(routeNames.workplace)
    } else {
      state.isShowAddChild = true;
    }
  }
};
