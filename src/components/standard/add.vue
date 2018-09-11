<template>
	<div>
		<x-header>{{name}}
      <a slot="right" @click="submit">提交</a>
    </x-header>
    <group>
    	<selector ref="defaultValueRef" title="设备系列" :options="devSeriesList" v-model="info.devSeries"></selector>
    	<selector ref="defaultValueRef" title="设备类型" :options="devTypeList" v-model="info.devType"></selector>
    </group>
    <cell></cell>
    <tab>
      <tab-item selected @on-item-click="onItemClick">基础参数</tab-item>
      <tab-item @on-item-click="onItemClick">开发者参数</tab-item>
      <tab-item @on-item-click="onItemClick">管理员参数</tab-item>
    </tab>
    <div v-show="itemIndex == 0">
      <group>
        <x-input title="加热丝功率值" v-model="info.hotPower" ></x-input>
        <x-input title="风机风量" v-model="info.windVol" ></x-input>
        <selector ref="defaultValueRef" title="走膜模式" :options="modeTypeList" v-model="info.filmGoMode"></selector>
        <selector ref="defaultValueRef" title="主界面参数开关" :options="paramSwitchList" v-model="info.mainParamSwitch"></selector>
        <x-input title="计米停值" v-model="info.meterStopValue" >
          <cell slot="right">[m]</cell>
        </x-input>
        <selector ref="defaultValueRef" title="走膜模式开关" :options="openCloseList" v-model="info.filmGoModeSwitch"></selector>
        <selector ref="defaultValueRef" title="开发开关" :options="openCloseList" v-model="info.developSwitch"></selector>
        <x-input title="设备加速完成后的运行速度" v-model="info.devAcceSpeed" >
          <cell slot="right">[m/min]</cell>
        </x-input>
        <x-input title="收卷机力" v-model="info.winderForce" ></x-input>
        <x-input title="启动暂缓时间" v-model="info.startStopTime" ></x-input>
        <x-input title="主界面可调的风机最大档位" v-model="info.mainWindMax" ></x-input>
        <selector ref="defaultValueRef" title="风机模式" :options="windModeList" v-model="info.windMode"></selector>
        <x-input title="内置金属感应开关检测灵敏度" v-model="info.inMetalSwitchSenc" ></x-input>
        <x-input title="外置光电检测灵敏度" v-model="info.outLigthSenc" ></x-input>
      </group>
    </div>
    <div v-show="itemIndex == 1">
      <group>
        <x-input title="电机运行起始速度" v-model="info.runStartSpeed" ></x-input>
        <selector ref="defaultValueRef" title="环境温度检测开关" :options="recordTypeList" v-model="info.tempCheckSwitch"></selector>
        <selector ref="defaultValueRef" title="内置光电检测开关" :options="startStopList" v-model="info.inLightCheckSwitch"></selector>
        <selector ref="defaultValueRef" title="外置光电检测开关" :options="startStopList" v-model="info.outLightCheckSwitch"></selector>
        <selector ref="defaultValueRef" title="上盖与压杆状态检测开关" :options="checkList" v-model="info.upCheckSwitch"></selector>
        <x-input title="上盖与压杆状态检测灵敏度" v-model="info.upCheckSenc" ></x-input>
        <x-input title="持续温度补偿" v-model="info.contTempComp" ></x-input>
        <x-input title="启动温度补偿" v-model="info.startTempComp" ></x-input>
        <x-input title="温度补偿时间" v-model="info.tempCompTimen" ></x-input>
      </group>  
    </div>
    <div v-show="itemIndex == 2">
      <group>
        <x-input title="第一组ID 限行米数" v-model="info.firstIdMeter" ></x-input>
        <x-input title="电机最大可调运行速度" v-model="info.windMaxSpeed" ></x-input>
        <x-input title="第二组ID 限行米数" v-model="info.secondIdMeter" ></x-input>
        <x-input title="ID号" v-model="info.idNum" ></x-input>
        <x-input title="米数校准值" v-model="info.meterCheck" ></x-input>
        <x-input title="可调温度档位最大值" v-model="info.adjustTempMax" ></x-input>
        <x-input title="SOS米数" v-model="info.sosMeterNum" ></x-input>
      </group>  
    </div>
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
  import { Selector, XHeader, Group, XButton, XInput, XTable, Cell, Tab, TabItem, Toast, XTextarea, Confirm, TransferDom } from 'vux'
  export default {
    name: 'Diagnose',
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
      Tab,
      TabItem,
      Toast,
      XTextarea,
      Selector,
      Confirm
    },
    data () {
      return {
        name: '添加设备规格参数',
        itemIndex: 0,
        showConfirm: false,
        devSeriesList: [],
        devTypeList: [],
        windModeList: [],
        openCloseList: [],
        paramSwitchList: [],
        modeTypeList: [],
        modeTypeSwitchList: [],
        recordTypeList: [],
        startStopList: [],
        checkList: [],
        info: {
          devSeries: '',
          devType: '',
          hotPower: 0,
          windVol: 0,
          filmGoMode: 0,
          mainParamSwitch: 0,
          meterStopValue: 0,
          filmGoModeSwitch: 0,
          developSwitch: 0,
          devAcceSpeed: 0,
          winderForce: 0,
          startStopTime: 0,
          mainWindMax: 0,
          windMode: 0,
          inMetalSwitchSenc: '',
          outLigthSenc: '',
          runStartSpeed: 0,
          tempCheckSwitch: 0,
          inLightCheckSwitch: 0,
          outLightCheckSwitch: 0,
          upCheckSwitch: 0,
          upCheckSenc: '',
          contTempComp: 0,
          startTempComp: 0,
          tempCompTimen: 0,
          firstIdMeter: 0,
          windMaxSpeed: 0,
          secondIdMeter: 0,
          idNum: '',
          meterCheck: 0,
          adjustTempMax: 0,
          sosMeterNum: 0
        },
        devSies: '',
        devType: ''
      }
    },
    mounted () {
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 设备系列
        if (dict.dictParentId === 57) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.devSeriesList.push(newInfo)
        }
        // 设备类型
        if (dict.dictParentId === 1) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.devTypeList.push(newInfo)
        }
        // 走膜模式
        if (dict.dictParentId === 73) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.modeTypeList.push(newInfo)
        }
        // 主界面参数开关
        if (dict.dictParentId === 76) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.paramSwitchList.push(newInfo)
        }
        // 走膜模式开关
        if (dict.dictParentId === 79) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.modeTypeSwitchList.push(newInfo)
        }
        // 开发开关
        if (dict.dictParentId === 82) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.openCloseList.push(newInfo)
        }
        // 风机模式
        if (dict.dictParentId === 85) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.windModeList.push(newInfo)
        }
        // 环境温度检测开关
        if (dict.dictParentId === 90) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.recordTypeList.push(newInfo)
        }
        // 内置光电检测开关
        if (dict.dictParentId === 93) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.startStopList.push(newInfo)
        }
        // 内置光电检测开关
        if (dict.dictParentId === 97) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.checkList.push(newInfo)
        }
      }
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
        this.itemIndex = index
      },
      async submit () {
        if (this.info.devSeries === '') {
          this.$vux.toast.show({
            text: '请选择设备系列!',
            position: 'middle',
            type: 'warn',
            time: 1000
          })
          return
        }
        if (this.info.devType === '') {
          this.$vux.toast.show({
            text: '请选择设备类型!',
            position: 'middle',
            type: 'warn',
            time: 1000
          })
          return
        }
        let res = await this.$http.postDeviceCommon('/devSpecifications/addDevSpecifications', this.info)
        if (res.code === 0) {
          this.showConfirm = true
        }
      },
      onConfirm () {
        console.info('confirm')
      },
      onCancel () {
        this.$router.push({path: '/standard/list'})
      }
    }
  }
</script>

<style type="text/css">
	
</style>