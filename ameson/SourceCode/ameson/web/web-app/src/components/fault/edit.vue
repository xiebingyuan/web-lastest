<template>
	<div>
		<x-header>{{name}}
      <a slot="right" @click="submit">提交</a>
    </x-header>
    <group>
    	<selector ref="defaultValueRef" title="故障类型" :options="typeList" v-model="info.faultType"></selector>
    	<x-input title="故障码" v-model="info.faultCode" disabled placeholder="请输入故障码..."></x-input>
    	<x-input title="故障简述" v-model="info.faultRemark"  placeholder="请输入故障简述..."></x-input>
    	<group>
        <x-textarea :max="200" title="故障描述" v-model="info.faultDesc" :show-counter="false"></x-textarea>
      </group>
    </group>	
	</div>	
</template>

<script type="text/javascript">
  import { XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, XTextarea, Selector } from 'vux'
  import qs from 'qs'
  export default {
    name: 'FaultList',
    components: {
      XHeader,
      Group,
      XButton,
      XInput,
      XTable,
      Cell,
      Tabbar,
      TabbarItem,
      XTextarea,
      Selector
    },
    data () {
      return {
        name: '故障码编辑',
        selected: '',
        faultCode: '',
        typeList: [{key: '0', value: '停机'}, {key: '1', value: '卡料'}],
        info: {
          faultType: '',
          faultCode: '',
          faultRemark: '',
          faultDesc: ''
        }
      }
    },
    mounted () {
      this.info = this.$route.query.info
    },
    methods: {
      submit () {
        var _this = this
        let formData = qs.stringify(_this.info)
        _this.$http({
          method: 'post',
          url: this.GLOBAL.deviceurl + 'devBaseInfo/addDevBaseInfo',
          data: formData
        }).then(function (response) {
          if (response.data.code === 200) {
            _this.$vux.toast.show({
              text: '提交成功!',
              position: 'middle',
              type: 'success',
              time: 1500
            })
            this.$router.go(-1)
          } else {
            _this.$vux.toast.show({
              text: '提交失败,请重新提交!',
              position: 'middle',
              type: 'warn',
              time: 1500
            })
          }
        })
      }
    }
  }
</script>

<style type="text/css">
	
</style>