<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
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
