/*
 * @Author: your name
 * @Date: 2021-01-11 11:41:11
 * @LastEditTime: 2021-02-04 17:38:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hss\vue-iview-admin\src\main.js
 */
import Vue from 'vue'
import App from './App.vue';
import iView from 'iview';
import axios from "axios";
import * as echarts from 'echarts';

import 'iview/dist/styles/iview.css';

import request from './api/request'

Vue.prototype.$axios = axios;
Vue.prototype.$http = request

// console.log(request({
//   url: '/api/log/list',
//   method: 'get',
  
// }))
import router from './router'
import store from './store'

// 全局路由鉴权以及判断token 
import './permission'

import plugins from './libs/plugins'
Vue.prototype.$bus = new Vue()
console.log(echarts);
Vue.prototype.$echarts = echarts


Vue.use(iView);
Vue.use(plugins);

Vue.config.productionTip = false




new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')