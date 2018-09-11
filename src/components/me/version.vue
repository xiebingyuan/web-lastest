<template>
	<div>
		<x-header>{{name}}</x-header>
    <group>
      <cell title="当前版本" v-model="currentVersion"></cell>
      <cell title="最新版本" v-model="lastVersion"></cell>
    </group>
    <tabbar style="position:fixed" v-if="isUpdate">
      <tabbar-item><span slot="label"></span></tabbar-item>
      <tabbar-item @click.native="update" class="bg-color-orange"><span slot="label" class="submit-btn">更新</span></tabbar-item>
    </tabbar>
	</div>	
</template>

<script type="text/javascript">
  import { XHeader, Group, XInput, Cell, Tabbar, TabbarItem } from 'vux'
  // import qs from 'qs'
  export default {
    components: {
      XHeader,
      Group,
      XInput,
      Cell,
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        name: '软件版本',
        currentVersion: '1.0',
        lastVersion: '1.1',
        isUpdate: false
      }
    },
    mounted () {
      if (this.currentVersion !== this.lastVersion) {
        this.isUpdate = true
      }
    },
    methods: {
      update () {
        var _this = this
        _this.$vux.toast.show({
          text: '设置成功!',
          position: 'middle',
          type: 'success',
          time: 1000
        })
        // _this.$http({
        //   method: 'post',
        //   url: this.GLOBAL.deviceUrl + '/serviceOrder/getWaitHandleList',
        //   data: {}
        // }).then(function (response) {
        //   _this.infos = response.data.data
        // })
      }
    }
  }
</script>

<style type="text/css">

</style>