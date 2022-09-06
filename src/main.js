import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入图标
import './assets/iconfont/iconfont.css'
import vant from 'vant'
// 引入vatn
import 'vant/lib/index.css'

// 引入rem适配
import 'amfe-flexible'

Vue.use(vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
