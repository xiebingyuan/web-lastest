<template>
	<div>
		<x-header>{{name}}
      <a slot="right" @click="submit">提交</a>
    </x-header>
    <group>
    	<selector ref="defaultValueRef" title="故障类型" :options="typeList" v-model="info.faultType"></selector>
    	<x-input title="故障码" v-model="info.faultCode"  placeholder="请输入故障码..."></x-input>
    	<x-input title="故障简述" v-model="info.faultRemark"  placeholder="请输入故障简述..."></x-input>
    	<group>
        <x-textarea :max="200" title="故障描述" placeholder="请输入故障描述..." v-model="info.faultDesc" :show-counter="false"></x-textarea>
      </group>
    </group>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
               title="添加确认"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">操作成功，是否继续添加?</p>
      </confirm>
    </div>
	</div>	
</template>

<script type="text/javascript">
  import { XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, XTextarea, Selector, Confirm, TransferDom } from 'vux'
  export default {
    name: 'FaultList',
    directives: {
      TransferDom
    },
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
      Selector,
      Confirm
    },
    data () {
      return {
        name: '故障码添加',
        selected: '',
        faultCode: '',
        showConfirm: false,
        typeList: [],
        info: {
          faultType: '',
          faultCode: '',
          faultRemark: '',
          faultDesc: ''
        }
      }
    },
    mounted () {
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 故障类型
        if (dict.dictParentId === 151) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.typeList.push(newInfo)
        }
      }
    },
    methods: {
      async submit () {
        if (this.checkSubmitField(this.info.faultType, '请选择故障类型!')) {
          return
        }
        if (this.checkSubmitField(this.info.faultCode, '请输入故障码!')) {
          return
        }
        if (this.checkSubmitField(this.info.faultRemark, '请输入故障简述!')) {
          return
        }
        if (this.checkSubmitField(this.info.faultDesc, '请输入故障描述!')) {
          return
        }
        let response = await this.$http.postDeviceCommon('/devFaultCodeConfig/addDevFaultCodeConfig', this.info)
        if (response.code === 0) {
          this.showConfirm = true
        }
      },
      checkSubmitField (field, msg) {
        if (field === '') {
          this.$vux.toast.show({
            text: msg,
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return true
        }
        return false
      },
      onConfirm () {
        this.info.faultCode = ''
        this.info.faultType = ''
        this.info.faultRemark = ''
        this.info.faultDesc = ''
      },
      onCancel () {
        this.$router.push({path: '/fault/list', query: { faultCode: this.info.faultCode }})
      }
    }
  }
</script>

<style type="text/css">
	
</style>