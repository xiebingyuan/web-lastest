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
  setInitInfo: function (uInfo) {
    console.info(uInfo)
    window.localStorage.setItem('token', uInfo.token)
    window.localStorage.setItem('userInfo', JSON.stringify(uInfo.userInfo))
    window.localStorage.setItem('rlId', uInfo.rlId)
  },
  getDictInfo: function () {
    var oldData = window.localStorage.getItem('dictInfo')
    if (!oldData || oldData == null || oldData === 'undefined') {
      this.initDict()
    }
    var data = window.localStorage.getItem('dictInfo')
    if (data === '' || data === null || data === 'undefined') {
      return null
    }
    return JSON.parse(data)
  },
  getUserId: function () { // set userId to localStorage when user login
    var userInfo = this.getUserInfo()
    if (userInfo != null) {
      return userInfo.uId
    }
    return ''
  },
  getUserInfo: function () {
    var userInfo = window.localStorage.getItem('userInfo')
    if (userInfo === '' || userInfo === 'undefined') {
      return null
    }
    // return userInfo
    return JSON.parse(userInfo)
  },
  getToken: function () {
    var token = window.localStorage.getItem('token')
    if (token === '' || token === null || token === 'undefined') {
      return null
    }
    return token.toString()
  },
  getRlId: function () {
    var rlId = window.localStorage.getItem('rlId')
    if (rlId === '' || rlId === null || rlId === 'undefined') {
      return null
    }
    return rlId.toString()
  },
  getUuid: function () { // set userId to localStorage when user login
    var userInfo = this.getUserInfo()
    if (userInfo != null) {
      return userInfo.uuid
    }
    return ''
  },
  getBelongArea: function () {
    var userInfo = this.getUserInfo()
    if (userInfo != null) {
      return userInfo.eBelongArea
    }
    return ''
  }
}
