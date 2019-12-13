import Vue from "vue";
import './http';

import {
  Button,
  Popover,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Popconfirm,
  Table,
  TableColumn,
  MessageBox,
  Message,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Dialog,
  Loading,
  Notification,
  DatePicker
} from "element-ui";
import dayjs from "dayjs";
import { now } from "@/util/date";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

import "../styles/var.scss";

Vue.use(Button);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Input);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);

(Vue.prototype.$notify = Notification);
Vue.prototype.$nerror = function(text) {
  Notification.error({
    title: "错误",
    message: text
  });
};

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$alertCb = function(text, callback) {
  return MessageBox.alert(text, "", {
    confirmButtonText: "知道了",
    callback
  });
};
Vue.prototype.$errorForm = function(params) {
  const msg = params[Object.keys(params)[0]][0].message;
  Message.error(msg);
};

Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;

Vue.filter("time", date => {
  return dayjs(date).format("H:mm");
});

Vue.prototype.$filters = {
  duration(row, column, cellValue, index) {
    return row.duration || 0;
  }
};
Vue.prototype.$now = now;

const requireComponent = require.context(
  // 其组件目录的相对路径
  "../components",
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
    )
  );

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});
