<template>
	<div>
		<x-header>{{name}}
      <a slot="right" @click="submit">提交</a>
    </x-header>
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
    <div v-show="itemIndex == 2">
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
	</div>	
</template>

<script type="text/javascript">
  import { Selector, XHeader, Group, XButton, XInput, XTable, Cell, Tab, TabItem, Toast, XTextarea, TransferDom } from 'vux'
  import qs from 'qs'
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
      Selector
    },
    mounted () {
      let type = this.$route.query.devType
      let series = this.$route.query.devSeries
      console.info('type = ' + type)
      console.info('series = ' + series)
    },
    data () {
      return {
        name: '设备规格参数修改',
        itemIndex: 0,
        devSeriesList: [{key: '0', value: 'MINI AIR缓冲气垫机'}, {key: '1', value: 'AM气柱袋'}],
        devTypeList: [{key: '0', value: 'AM气柱袋'}, {key: '1', value: 'AIR缓冲气垫机台'}],
        devStatusList: [{key: '0', value: '在制'}, {key: '1', value: '在存'}],
        windModeList: [{key: '0', value: '内置鼓风机'}, {key: '1', value: '外围鼓风机'}, {key: '2', value: '气汞'}],
        openCloseList: [{key: '0', value: '打开'}, {key: '1', value: '关闭'}],
        paramSwitchList: [{key: '0', value: '可调节'}, {key: '1', value: '锁定'}],
        modeTypeList: [{key: '0', value: 'Filler'}, {key: '1', value: 'Wrapper'}],
        info: {
          devSeries: '',
          devType: '',
          hotPower: '',
          windVol: '',
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
          inMetalSwitchSenc: 0,
          outLigthSenc: 0
        }
      }
    },
    methods: {
      submit () {
        let _this = this
        let data = qs.stringify(_this.info)
        console.info('submit = ' + data)
      },
      onItemClick (index) {
        console.log('on item click:', index)
        this.itemIndex = index
      }
    }
  }
</script>

<style type="text/css">
	
</style>