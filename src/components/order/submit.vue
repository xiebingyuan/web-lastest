<template>
	<div>
		<x-header>{{name}}
      <a slot="right" @click="submit">提交</a>
    </x-header>
    <group>
    	<selector ref="defaultValueRef" title="问题类型" :options="questionTypeList" v-model="info.serOrderType"></selector>
    	<selector ref="defaultValueRef" title="问题分类" :options="questionClassList" v-model="info.serOrderClassify"></selector>
    	<x-input title="设备编号" v-model="info.devCode"  placeholder="请输入设备编号..."></x-input>
    	<x-input title="客户编号" v-model="info.custCode"  placeholder="请输入客户编号..."></x-input>
    	<x-textarea :max="200" title="问题描述" placeholder="请输入问题描述..." v-model="info.serOrderDesc" :show-counter="false"></x-textarea>
    	<x-textarea :max="200" title="问题备注" placeholder="请输入问题备注..." v-model="info.serOrderRemark" :show-counter="false"></x-textarea>
<!--     	<group>
        <x-textarea :max="200" title="问题描述" placeholder="请输入问题描述..." v-model="info.serOrderDesc" :show-counter="false"></x-textarea>
      </group> -->
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
        name: '提交工单',
        selected: '',
        faultCode: '',
        showConfirm: false,
        questionTypeList: [],
        questionClassList: [],
        typeList: [],
        info: {
          serOrderClassify: 1,
          serOrderType: 1,
          devCode: '',
          custCode: '',
          serOrderDesc: '',
          serOrderRemark: ''
        }
      }
    },
    mounted () {
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 工单问题类型
        if (dict.dictParentId === 105) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          this.questionTypeList.push(newInfo)
        }
        // 工单问题分类
        if (dict.dictParentId === 110) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          this.questionClassList.push(newInfo)
        }
        // 工单状态
        if (dict.dictParentId === 100) {
          // let key = dict.dictTypeValue
          // let name = dict.dictTypeCname
          // let newInfo = {key: key, value: name}
          // this.questionStatusList.push(newInfo)
        }
      }
    },
    methods: {
      async submit () {
        if (this.checkSubmitField(this.info.serOrderType, '请选择问题类型!')) {
          return
        }
        if (this.checkSubmitField(this.info.serOrderClassify, '请输入问题分类!')) {
          return
        }
        if (this.checkSubmitField(this.info.devCode, '请输入设备编号!')) {
          return
        }
        let response = await this.$http.postDeviceCommon('/serviceOrder/addServiceOrder', this.info)
        if (response.code === 0) {
          this.$vux.toast.show({
            text: '提交成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.$router.push({path: '/order/me', query: {}})
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