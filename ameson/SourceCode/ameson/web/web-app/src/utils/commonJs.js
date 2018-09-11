'use strict'

import Vue from 'vue'

export default {
  sendLog: function () {
    console.info('test success')
    Vue.prototype.$http.postDict('', '')
  },
  initDict: function () {
    Vue.prototype.$http.post('http://120.25.198.2:8661/getAllDict', {token: 'OIPI-89-8876-DAD-8686-JOIJIO-098786'}).then(function (response) {
      // console.log(response)
      Vue.prototype.GLOBAL.dictInfo = response
      if (window.localStorage) {
        localStorage.setItem('dictInfo', JSON.stringify(response))
      }
    })
  },
  getDictInfo: function () {
    if (window.localStorage.getItem('dictInfo') == null) {
      this.initDict()
    }
    var data = window.localStorage.getItem('dictInfo')
    return JSON.parse(data)
  }
}
