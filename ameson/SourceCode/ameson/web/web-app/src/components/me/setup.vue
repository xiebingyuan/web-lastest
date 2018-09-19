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
        stringValue: '', // 1-表示提醒（开）；0 或记录不存在表示关；
        reqInfo: {
          uId: ''
        },
        info: {
          uId: '',
          smsRemindStatus: ''
        }
      }
    },
    mounted () {
      this.queryStatus()
    },
    methods: {
      async queryStatus () {
        let res = await this.$http.postUserCommon('/userSmsRemindConfig/queryByUid', this.reqInfo)
        if (res.code === 0) {
          let result = res.data
          this.stringValue = result.smsRemindStatus
          this.info.uId = result.uId
        } else {
          this.$vux.toast.show({
            text: '获取短信提醒失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      async changeStatus (value) {
        console.info('changeStatus = ' + value)
        this.info.smsRemindStatus = value
        let res = await this.$http.postUserCommon('/userSmsRemindConfig/updateSmsStatus', this.info)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '更新状态成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
        } else {
          this.$vux.toast.show({
            text: '更新状态失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
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