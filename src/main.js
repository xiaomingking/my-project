// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-default/index.css'
import store from './store/index'
import VueResource from 'vue-resource'
import axios from 'axios'
import iView from 'iview'
import ElementUI from 'element-ui'
import 'iview/dist/styles/iview.css'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(iView)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App },
  render: h => h(App)
})
