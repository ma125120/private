// 打开 main.js
import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import api from '@/api'
import Vue from "vue";
import { secretKey, apiCode } from '@/config'
// 初始化 SDK版本 2.0.0 以下保留之前的初始化方法
Bmob.initialize(secretKey, apiCode);

// 挂载到全局使用
Vue.prototype.Bmob = Bmob
Vue.prototype.$api = api
