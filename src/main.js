import Vue from 'vue'
import App from './App.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import router from './router'
import store from './store'

import plugins from './libs/plugins'


Vue.use(iView);
Vue.use(plugins);

Vue.config.productionTip = false




new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')