<template>
  <div id="app">
    <router-view></router-view>
    <div>
    	<span id="dictBtn" @click="queryDict" type="hidden"></span>
    </div>	
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    async queryDict () {
      let res = await this.$http.postDict('/getAllDict', {token: 'OIPI-89-8876-DAD-8686-JOIJIO-098786'})
      this.GLOBAL.dictInfo = res
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
