<template>
	<div>
		<x-header>{{name}}</x-header>
    <group>
    	<x-input title="原手机号" v-model="info.oldPhone"  placeholder="请输入原手机号..."></x-input>    	
    	<x-input title="新手机号" v-model="info.newPhone"  placeholder="请输入新手机号..."></x-input>
    	<x-input title="验证码" class="weui-vcode" v-model="info.verifyCode">
        <x-button @click.native="sendCode" slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>
    </group>
    <tabbar style="position:fixed">
      <tabbar-item><span slot="label"></span></tabbar-item>
      <tabbar-item @click.native="sumbit" class="bg-color-orange"><span slot="label" class="submit-btn">提交</span></tabbar-item>
    </tabbar>
	</div>	
</template>

<script type="text/javascript">
  import { XButton, XHeader, XTable, Group, XInput, Cell, Tabbar, TabbarItem } from 'vux'
  // import qs from 'qs'
  export default {
    components: {
      XHeader,
      XTable,
      Group,
      XInput,
      Cell,
      XButton,
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        name: '手机号变更',
        info: {
          oldPhone: '',
          newPhone: '',
          verifyCode: ''
        }
      }
    },
    mounted () {
      this.query()
    },
    methods: {
      query () {
        var _this = this
        _this.$http({
          method: 'post',
          url: this.GLOBAL.deviceUrl + '/serviceOrder/getWaitHandleList',
          data: {}
        }).then(function (response) {
          _this.infos = response.data.data
        })
      },
      sendCode () {
        console.info('send verify code....')
      }
    }
  }
</script>

<style type="text/css">

</style>