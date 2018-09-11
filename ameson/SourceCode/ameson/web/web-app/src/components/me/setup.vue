<template>
	<div>
		<x-header>{{name}}</x-header>
    <group>
      <x-switch title="短信提醒" :value-map="['0', '1']" v-model="stringValue"></x-switch>
    </group>
	</div>	
</template>

<script type="text/javascript">
  import { XHeader, Group, XInput, Cell, XSwitch } from 'vux'
  // import qs from 'qs'
  export default {
    components: {
      XHeader,
      Group,
      XInput,
      Cell,
      XSwitch
    },
    data () {
      return {
        name: '设置',
        stringValue: ''
      }
    },
    mounted () {
      this.query()
    },
    methods: {
      changeStatus (value) {
        console.info('changeStatus = ' + value)
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
    },
    watch: {
      stringValue (curVal, oldVal) {
        console.log(curVal)
        this.changeStatus(curVal)
      }
    }
  }
</script>

<style type="text/css">

</style>