<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    fetchDate () {
      let ip = window.parent.window.location
      window.parent.window.postMessage('returnPage', ip, [])
      console.info(111)
    }
  },
  watch: {
    '$route': 'fetchDate'
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
