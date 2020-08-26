import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/flexable'

Vue.config.productionTip = false

// 开发环境下面使用vConsole进行调试
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  new VConsole()
}

import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'localhost:2000',
  //socket地址,连接后直接触发后台connection事件
}))

import moment from 'moment'
//手动引入所需要的语言包
import 'moment/locale/zh-cn';
// 指定使用的语言
moment.locale('zh-cn');
// day.js代替moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
