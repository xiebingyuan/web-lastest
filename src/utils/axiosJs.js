'use strict'

import axios from 'axios'
import Vue from 'vue'
import commonJs from './commonJs'
import { Loading, Toast } from 'vux'

Vue.component('loading', Loading)
Vue.component('toast', Toast)

// Vue.use(LoadingPlugin)

axios.interceptors.request.use(config => {
  // loading
  // NProgress.start()
  Vue.$vux.loading.show({
    text: 'Loading'
  })
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

console.info(commonJs.getUserInfo())
axios.defaults.headers.post['token'] = commonJs.getToken()
axios.defaults.headers.post['uId'] = commonJs.getUserId()
axios.defaults.headers.post['rlId'] = commonJs.getRlId()
// axios.defaults.headers.post['uBelongArea'] = commonJs.getBelongArea()
console.log('rlId = ' + commonJs.getRlId())

function checkStatus (response) {
  // loading
  Vue.$vux.loading.hide()
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // NProgress.done()
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    Vue.$vux.toast.show({
      text: '网络异常，请重新提交!',
      position: 'middle',
      type: 'cancel',
      time: 1000
    })
    return
  }
  if (res.data && (!res.data.success)) {
    // console.info('res data = ' + res.code)
    // alert(res.data.error_msg)
  }
  return res
}

export default {
  postUserQuery (url, data) {
    return axios({
      method: 'post',
      // baseURL: 'http://47.100.239.45:8621/',
      baseURL: 'http://www.zjytech.cn:8621/',
      url,
      data: {reqInfo: data, pageCount: 5, pageNumber: 1},
      timeout: 10000,
      headers: {
        'X-Requested-With': 'Content-Type',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postUserCommon (url, data) {
    return axios({
      method: 'post',
      // baseURL: 'http://47.100.239.45:8621/',
      baseURL: 'http://www.zjytech.cn:8621/',
      url,
      data: {reqInfo: data},
      timeout: 10000,
      headers: {
        'X-Requested-With': 'Content-Type',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postDeviceQuery (url, data, pageCount, pageNumber) {
    return axios({
      method: 'post',
      baseURL: 'http://www.zjytech.cn:8622/',
      // baseURL: 'http://47.100.239.45:8622/',
      url,
      data: {reqInfo: data, pageCount: pageCount, pageNumber: pageNumber},
      timeout: 10000,
      headers: {
        'X-Requested-With': 'Content-Type',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postDeviceCommon (url, data) {
    return axios({
      method: 'post',
      baseURL: 'http://www.zjytech.cn:8622/',
      // baseURL: 'http://47.100.239.45:8622/',
      url,
      data: {reqInfo: data},
      timeout: 10000,
      headers: {
        'X-Requested-With': 'Content-Type',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postFile (url, data) {
    return axios({
      method: 'post',
      baseURL: 'http://www.zjytech.cn:8612',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'Content-Type',
        'Content-Type': 'multipart/form-data; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postDict (url, data) {
    return axios({
      method: 'post',
      baseURL: 'http://www.zjytech.cn:8661/',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'Content-Type',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: 'http://www.zjytech.cn/',
      url,
      data: {reqInfo: data, pageCount: 5, pageNumber: 1},
      timeout: 10000,
      headers: {
        'X-Requested-With': 'Content-Type',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: 'https://cnodejs.org/api/v1',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
