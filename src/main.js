// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import { LoadingPlugin, ToastPlugin, AlertPlugin } from 'vux'
import routers from './router/index'
import axiosHttp from './utils/axiosJs'
import commonJs from './utils/commonJs'
import global from './components/common/Global.vue' // 引用全局变量文件
import axios from 'axios'

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

// Vue.component('vue-upload-component', VueUploadComponent)

Vue.use(VueRouter)
Vue.use(commonJs)

const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true,
  routes: routers
})

FastClick.attach(document.body)

Vue.config.productionTip = false

// Vue.http.options.emulateHTTP = true
// Vue.http.options.emulateJSON = true

Vue.prototype.GLOBAL = global // 挂载到Vue实例上面

Vue.prototype.commonJs = commonJs

Vue.prototype.$http = axiosHttp  // ajax请求

Vue.prototype.$https = axios  // ajax请求

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
