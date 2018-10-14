<template>
	<div>
		<x-header>{{name}}</x-header>
    <group>
    	<x-input title="原手机号" v-model="info.uPhone"  placeholder="请输入原手机号..."></x-input>    	
    	<x-input title="新手机号" v-model="info.newPhone"  placeholder="请输入新手机号..."></x-input>
    	<x-input title="验证码" class="weui-vcode" v-model="info.smsCode">
        <x-button v-show="isSend" @click.native="sendCode" slot="right" type="primary" mini>发送验证码</x-button>
        <x-button v-show="!isSend" slot="right" type="primary" mini>{{count}}秒后再发送</x-button>
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
          uPhone: '',
          newPhone: '',
          smsCode: '',
          uId: ''
        },
        isSend: true,
        count: '',
        timer: null
      }
    },
    mounted () {
      this.info.uId = this.commonJs.getUserId()
    },
    methods: {
      async sendCode () {
        if (this.info.uPhone === '') {
          this.$vux.toast.show({
            text: '请输入原手机号!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        if (this.info.newPhone === '') {
          this.$vux.toast.show({
            text: '请输入新手机号!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        let reqInfo = {}
        reqInfo.uPhone = this.info.newPhone
        let res = await this.$http.postUserCommon('/auth/sendSmsVerifyCode', reqInfo)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '发送成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.btnChange()
        } else {
          this.$vux.toast.show({
            text: '发送失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      async sumbit () {
        if (this.info.smsCode === '') {
          this.$vux.toast.show({
            text: '请输入验证码!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        let res = await this.$http.postUserCommon('/user/changePhone', this.info)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '更新成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.$router.push({path: '/me', query: {}})
        } else {
          this.$vux.toast.show({
            text: '更新失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      btnChange () {
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.isSend = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.isSend = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    }
  }
</script>

<style type="text/css">

</style>