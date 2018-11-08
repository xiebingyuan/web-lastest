<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query">查询</a>
      <a slot="right" @click="resetData" style="margin-left: 20px">重置</a>
    </x-header>
    <group>
      <x-input title="设备编号" v-model="devCode"  placeholder="请输入设备编号..."></x-input>
      <x-input title="客户编号" v-model="custCode" placeholder="请输入客户编号..."></x-input>
    </group>
    <group></group>
    <div>
      <x-table full-bordered style="background-color:#fff;" >
        <thead>
        <tr style="background-color: #F7F7F7">
          <th>设备编号</th>
          <th>客户名称</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody v-for="(device,key,index) in devices" track-by="$index" v-if="code==0">
        <tr>
          <td class="tableTd">{{device.devCode}}</td>
          <td class="tableTd">{{device.custName}}</td>
          <td>
            <x-button mini plain type="primary" @click.native="goSetup(device.devCode)">设置</x-button>
            <x-button mini plain type="primary" @click.native="goDetail(device.devCode)">详情</x-button>
          </td>
        </tr>
        </tbody>
      </x-table>
      <group v-if="code!=0" >
        <cell-box class="no-find-content">
          {{noFindMsg}}
        </cell-box>
      </group>
    </div>
    <div v-if="isSetup">
      <group class="title-background-color">
        <cell :title="titleName">
          <i slot="icon" width="20" class="iconfont icon-shezhi1 icon-setup"></i>
        </cell>
      </group>  
      <group>
        <datetime title="定时启动时间" v-model="timeInfo.taskStartTime" :format="format"></datetime>
        <datetime title="定时停止时间" v-model="timeInfo.taskStopTime" :format="format"></datetime>
        <selector ref="defaultValueRef" title="状态" :options="statusList" v-model="timeInfo.taskStatus"></selector>
        <cell></cell>
        <x-button type="primary" @click.native="timeSubmit">提交</x-button>
      </group>
      <!-- <group></group>
      <group class="title-background-color">
        <cell title="定时日志文件上传">
          <i slot="icon" width="20" class="iconfont icon-shezhi1 icon-setup"></i>
        </cell>
      </group>  
      <group>
        <radio :options="weekDayList" v-model="fileInfo.taskEverydayFlag"></radio>
        <selector v-if="fileInfo.taskEverydayFlag===1" ref="defaultValueRef" title="星期" :options="weekList" v-model="fileInfo.taskWeekDay"></selector>
        <datetime title="上传时间" v-model="fileInfo.taskUploadTime" :format="HMformat"></datetime>
        <selector ref="defaultValueRef" title="状态" :options="statusList" v-model="fileInfo.taskStatus"></selector>
        <cell></cell>
        <x-button type="primary" @click.native="fileSubmit">提交</x-button>
      </group> -->
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Radio, Selector, Datetime, XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem } from 'vux'
  export default {
    name: 'Setup',
    components: {
      XHeader,
      Group,
      XButton,
      XInput,
      XTable,
      Cell,
      Tabbar,
      TabbarItem,
      Datetime,
      Selector,
      Radio,
      Flexbox,
      FlexboxItem
    },
    data () {
      return {
        name: '定时任务',
        titleName: '定时启停',
        devCode: '',
        custCode: '',
        noFindMsg: '无符合条件数据！',
        code: 0,
        setupCode: '',
        devices: {},
        isSetup: false,
        format: 'YYYY-MM-DD HH:mm',
        HMformat: 'HH:mm',
        statusList: [],
        weekDayList: [{key: 0, value: '每天'}, {key: 1, value: '每周几'}],
        weekList: [{key: 1, value: '一'}, {key: 2, value: '二'}, {key: 3, value: '三'}, {key: 4, value: '四'}, {key: 5, value: '五'}, {key: 6, value: '六'}, {key: 7, value: '日'}],
        timeStatus: 1,
        timeInfo: {
          devCode: '',
          taskStartTime: '',
          taskStopTime: '',
          taskStatus: ''
        },
        fileInfo: {
          devCode: '',
          taskUploadTime: '',
          taskEverydayFlag: '',
          taskWeekDay: '',
          taskStatus: ''
        }
      }
    },
    mounted () {
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 有效状态
        if (dict.dictParentId === 64) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.statusList.push(newInfo)
        }
      }
    },
    methods: {
      async query () {
        let formData = {}
        if (this.devCode !== '') {
          formData.devCode = this.devCode
        }
        if (this.custCode !== '') {
          formData.custCode = this.custCode
        }
        let response = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', formData, 10, 1)
        this.code = response.code
        this.devices = response.data
        if (response.code === 0 && response.data.length === 0) {
          this.code = -1
        }
      },
      resetData () {
        this.devCode = ''
        this.custName = ''
        this.code = 0
        this.isSetup = false
        this.titleName = '定时启停'
      },
      goSetup (devCode) {
        this.setupCode = devCode
        this.isSetup = true
        this.queryTimeSummit(devCode)
        this.queryFileSummit(devCode)
        this.titleName = '定时启停 ' + devCode
      },
      async queryTimeSummit (devCode) {
        let response = await this.$http.postDeviceCommon('/taskStartStopDev/getTaskStartStopDev', {devCode: devCode})
        if (response.code === 0 && response.data !== '') {
          this.timeInfo = response.data
        } else {
          this.timeInfo.devCode = devCode
          this.timeInfo.taskStartTime = ''
          this.timeInfo.taskStopTime = ''
          this.timeInfo.taskStatus = 1
        }
      },
      async queryFileSummit (devCode) {
        let response = await this.$http.postDeviceCommon('/taskUploadDevRunRecord/getTaskUploadDevRunRecord', {devCode: devCode})
        if (response.code === 0 && response.data !== '') {
          this.fileInfo = response.data
        } else {
          this.fileInfo.devCode = devCode
          this.fileInfo.taskUploadTime = ''
          this.fileInfo.taskEverydayFlag = ''
          this.fileInfo.taskWeekDay = ''
          this.fileInfo.taskStatus = ''
        }
      },
      goDetail (devCode) {
        this.$router.push({path: '/device/detail', query: { devCode: devCode }})
      },
      async timeSubmit () {
        if (this.checkSubmitField(this.timeInfo.taskStartTime, '请输入定时启动时间')) {
          return
        }
        if (this.checkSubmitField(this.timeInfo.taskStopTime, '请输入定时停止时间')) {
          return
        }
        if (this.checkSubmitField(this.timeInfo.taskStatus, '请选择状态')) {
          return
        }
        if (this.timeInfo.taskStartTime.length === 16) {
          this.timeInfo.taskStartTime = this.timeInfo.taskStartTime + ':00'
        }
        if (this.timeInfo.taskStopTime.length === 16) {
          this.timeInfo.taskStopTime = this.timeInfo.taskStopTime + ':00'
        }
        let response = await this.$http.postDeviceCommon('/taskStartStopDev/addTaskStartStopDev', this.timeInfo)
        if (response.code === 0) {
          this.$vux.toast.show({
            text: '保存成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
        } else {
          this.$vux.toast.show({
            text: '提交失败,请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      async fileSubmit () {
        if (this.checkSubmitField(this.fileInfo.taskEverydayFlag, '请选择频率')) {
          return
        }
        if (this.fileInfo.taskEverydayFlag === 1 && this.fileInfo.taskWeekDay === '') {
          this.$vux.toast.show({
            text: '请选择每周几!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        if (this.checkSubmitField(this.fileInfo.taskUploadTime, '请输入上传时间')) {
          return
        }
        if (this.checkSubmitField(this.fileInfo.taskStatus, '请选择状态')) {
          return
        }
        this.fileInfo.taskUploadTime = this.fileInfo.taskUploadTime + ':00'
        let response = await this.$http.postDeviceCommon('/taskUploadDevRunRecord/addTaskUploadDevRunRecord', this.fileInfo)
        if (response.code === 0) {
          this.$vux.toast.show({
            text: '保存成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
        } else {
          this.$vux.toast.show({
            text: '提交失败,请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
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
      }
    }
  }
</script>

<style>
  .title-background-color {
    background-color: #e4d1d1;
  }
</style>
