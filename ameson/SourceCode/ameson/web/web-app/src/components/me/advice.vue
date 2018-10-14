<template>
	<div>
		<x-header>{{name}}</x-header>
    <group title="建议内容">
      <x-textarea :max="800" :show-counter="false" name="description" placeholder="请输入建议内容..." v-model="reqInfo.advContent"></x-textarea>
    </group>
    <tabbar style="position:fixed">
      <tabbar-item><span slot="label"></span></tabbar-item>
      <tabbar-item @click.native="sumbit" class="bg-color-orange"><span slot="label" class="submit-btn">提交</span></tabbar-item>
    </tabbar>
	</div>	
</template>

<script type="text/javascript">
  import { XButton, XHeader, XTextarea, Group, XInput, Cell, Tabbar, TabbarItem } from 'vux'
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
        reqInfo: {
          uId: '',
          advType: '建议反馈',
          advSubject: '对系统的建议反馈',
          advContent: ''
        }
      }
    },
    mounted () {
      this.reqInfo.uId = this.commonJs.getUserId()
    },
    methods: {
      async sumbit () {
        let res = await this.$http.postUserCommon('/sysSoftwareVersionAdvice/addAdvice', this.reqInfo)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '提交成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.$router.push({path: '/me', query: {}})
        } else {
          this.$vux.toast.show({
            text: '提交失败,请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      }
    }
  }
</script>

<style type="text/css">

</style>