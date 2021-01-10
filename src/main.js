import Vue from 'vue'
import App from './App.vue';
import iView from 'iview';
import axios from "axios";

import 'iview/dist/styles/iview.css';

import request from './api/request'

Vue.prototype.$axios = axios;
Vue.prototype.$http = request

import router from './router'
import store from './store'

// 全局路由鉴权以及判断token 
import './permission'

import plugins from './libs/plugins'


Vue.use(iView);
Vue.use(plugins);

Vue.config.productionTip = false




new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')