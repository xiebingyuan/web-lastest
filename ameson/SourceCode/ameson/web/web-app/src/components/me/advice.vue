<template>
	<div>
		<x-header>{{name}}</x-header>
    <group title="建议内容">
      <x-textarea :max="800" :show-counter="false" name="description" placeholder="请输入建议内容..." v-model="advice"></x-textarea>
    </group>
    <tabbar style="position:fixed">
      <tabbar-item><span slot="label"></span></tabbar-item>
      <tabbar-item @click.native="sumbit" class="bg-color-orange"><span slot="label" class="submit-btn">提交</span></tabbar-item>
    </tabbar>
	</div>	
</template>

<script type="text/javascript">
  import { XButton, XHeader, XTextarea, Group, XInput, Cell, Tabbar, TabbarItem } from 'vux'
  // import qs from 'qs'
  export default {
    components: {
      XHeader,
      XTextarea,
      Group,
      XInput,
      Cell,
      XButton,
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        name: '建议反馈',
        advice: ''
      }
    },
    methods: {
      sumbit () {
        var _this = this
        if (_this.advice === '') {
          _this.$vux.toast.show({
            text: '请输入建议内容!',
            position: 'middle',
            type: 'warn',
            time: 1000
          })
          return
        }
        _this.$http({
          method: 'post',
          url: this.GLOBAL.deviceUrl + '/serviceOrder/getWaitHandleList',
          data: {}
        }).then(function (response) {
          _this.infos = response.data.data
        })
      }
    }
  }
</script>

<style type="text/css">

</style>