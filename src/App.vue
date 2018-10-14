<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    window.addEventListener('message', this.receiveMsg, false)
  },
  methods: {
    receiveMsg (e) {
      console.log('Got a message!')
      console.log('nMessage: ' + e.data)
      console.log(this.commonJs.getToken())
      if (this.commonJs.getToken() !== '' && e.data !== '' && e.data !== undefined) {
        let reqData = e.data
        console.log('current data is ' + (typeof reqData))
        let uInfo = null
        try {
          uInfo = JSON.parse(reqData)
        } catch (e) {
        }
        if (uInfo !== null) {
          console.log('isTrue')
          this.commonJs.setInitInfo(uInfo)
        } else {
          console.info('isFalse')
        }
      }
    },
    pageChangeNotice () {
      // let ip = window.parent.window.location
      let reqData = {}
      reqData.returnPage = window.location.hash
      console.log(window.location.hash)
      window.parent.window.postMessage(reqData, '*', [])
      console.info(111)
    }
  },
  watch: {
    '$route': 'pageChangeNotice'
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
