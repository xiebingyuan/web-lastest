'use strict'

import Vue from 'vue'

export default {
  sendLog: function () {
    console.info('test success')
    Vue.prototype.$http.postDict('', '')
  },
  initDict: function () {
    // Vue.prototype.$http.post('http://47.100.239.45:8661/getAllDict', {token: 'OIPI-89-8876-DAD-8686-JOIJIO-098786'}).then(function (response) {
    Vue.prototype.$http.post('http://www.zjytech.cn:8661/getAllDict', {token: 'OIPI-89-8876-DAD-8686-JOIJIO-098786'}).then(function (response) {
      // console.log(response)
      Vue.prototype.GLOBAL.dictInfo = response
      if (window.localStorage) {
        localStorage.setItem('dictInfo', JSON.stringify(response))
      }
    })
  },
  getDictInfo: function () {
    var oldData = window.localStorage.getItem('dictInfo')
    if (!oldData || oldData == null) {
      this.initDict()
    }
    var data = window.localStorage.getItem('dictInfo')
    return JSON.parse(data)
  },
  getUserId: function () { // set userId to localStorage when user login
    var userId = window.localStorage.getItem('userId')
    return userId
  },
  getUserInfo: function () {
    var userInfo = window.localStorage.getItem('userInfo')
    return JSON.parse(userInfo)
  },
  getToken: function () {
    // var token = window.localStorage.getItem('token')
    var token = '222222'
    return token
  }
}
