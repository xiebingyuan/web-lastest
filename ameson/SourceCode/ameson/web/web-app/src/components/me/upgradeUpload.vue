<template>
	<div>
		<x-header>{{name}}</x-header>
    <div id="app">
      <a class="btn">上传图片</a>
<!--       <myUpload url="/upload"
        lang-type="en"
        field="img"
        key="1"
        max-size="500"
        :only-single="true"
        :value="true"
        :only-img="true"
        :params="params"></myUpload> -->
    </div>
	</div>	
</template>

<script type="text/javascript">
  import { XHeader, Group, XInput, Cell, Tabbar, TabbarItem } from 'vux'
  // import myUpload from 'vue-upload-file'
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
        name: '固件升级档上传',
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