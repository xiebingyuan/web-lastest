<template>
  <div>
    <x-header>{{name}}</x-header>
    <group title="基础信息">
      <!-- <x-input title="设备编号" disabled  v-model="info.devCode"></x-input> -->
      <selector ref="defaultValueRef" title="设备系列" :options="devSeriesList" v-model="info.devSeries"></selector>
      <selector ref="defaultValueRef" title="设备类型" :options="devTypeList" v-model="info.devType"></selector>
      <selector ref="defaultValueRef" title="设备状态" :options="devStatusList" v-model="info.devStatus"></selector>
      <datetime title="出厂时间" v-model="info.devOutTime" format="YYYY-MM-DD HH:mm"></datetime>
    <!--   <x-input title="管理员密码" disabled value="******" ></x-input>
      <x-input title="SOS密码" disabled  value="******"></x-input> -->
      <x-textarea :max="300" title="密码组" v-model="info.passGroup" placeholder="请输入至少三组密码组,格式如下:111111,222222,333333" :show-counter="false"></x-textarea>
    </group>
    <group>
      <cell title="默认规格参数">
        <div style="text-align: left !important;margin-left: -180px;">
          <i slot="icon" class="iconfont icon-xiangxiajixu icon-grid" @click="showParam"></i>
        </div>
      </cell>
    </group>
   <!--  <group class="detail-area">
      <x-textarea :max="200" @on-focus="onEvent('focus')"  name="detail" :show-counter="false"></x-textarea>
    </group> -->
    <tabbar style="position:fixed">
      <tabbar-item ><span slot="label" class="submit-btn"></span></tabbar-item>
      <x-button type="primary" @click.native="sumbit">提  交</x-button>
    </tabbar>
    <div v-transfer-dom>
      <popup v-model="showPopup" height="100%">
        <div class="popup1">
          <x-header :left-options="{showBack: false}">
            <a slot="left" @click="closePopup">
              <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
            </a>
            参数规格
          </x-header>
          <tab>
            <tab-item selected @on-item-click="onItemClick">基础参数</tab-item>
            <tab-item @on-item-click="onItemClick">开发者参数</tab-item>
            <tab-item @on-item-click="onItemClick">管理员参数</tab-item>
          </tab>
          <div v-show="itemIndex == 0">
            <group>
              <x-input title="加热丝功率值" v-model="paramInfo.hotPower"></x-input>
              <x-input title="风机风量" v-model="paramInfo.windVol" ></x-input>
              <selector ref="defaultValueRef" title="走膜模式" :options="modeTypeList" v-model="paramInfo.filmGoMode"></selector>
              <selector ref="defaultValueRef" title="主界面参数开关" :options="paramSwitchList" v-model="paramInfo.mainParamSwitch"></selector>
              <x-input title="计米停值" v-model="paramInfo.meterStopValue" >
                <cell slot="right">[m]</cell>
              </x-input>
              <selector ref="defaultValueRef" title="走膜模式开关" :options="openCloseList" v-model="paramInfo.filmGoModeSwitch"></selector>
              <selector ref="defaultValueRef" title="开发开关" :options="openCloseList" v-model="paramInfo.developSwitch"></selector>
              <x-input title="设备加速完成后的运行速度" v-model="paramInfo.devAcceSpeed" >
                <cell slot="right">[m/min]</cell>
              </x-input>
              <x-input title="收卷机力" v-model="paramInfo.winderForce" ></x-input>
              <x-input title="启动暂缓时间" v-model="paramInfo.startStopTime" ></x-input>
              <x-input title="主界面可调的风机最大档位" v-model="paramInfo.mainWindMax" ></x-input>
              <selector ref="defaultValueRef" title="风机模式" :options="windModeList" v-model="paramInfo.windMode"></selector>
              <x-input title="内置金属感应开关检测灵敏度" v-model="paramInfo.inMetalSwitchSenc" ></x-input>
              <x-input title="外置光电检测灵敏度" v-model="paramInfo.outLigthSenc" ></x-input>
            </group>
          </div>
          <div v-show="itemIndex == 1">
            <group>
              <x-input title="电机运行起始速度" v-model="paramInfo.runStartSpeed" ></x-input>
              <selector ref="defaultValueRef" title="环境温度检测开关" :options="recordTypeList" v-model="paramInfo.tempCheckSwitch"></selector>
              <selector ref="defaultValueRef" title="内置光电检测开关" :options="startStopList" v-model="paramInfo.inLightCheckSwitch"></selector>
              <selector ref="defaultValueRef" title="外置光电检测开关" :options="startStopList" v-model="paramInfo.outLightCheckSwitch"></selector>
              <selector ref="defaultValueRef" title="上盖与压杆状态检测开关" :options="checkList" v-model="paramInfo.upCheckSwitch"></selector>
              <x-input title="上盖与压杆状态检测灵敏度" v-model="paramInfo.upCheckSenc" ></x-input>
              <x-input title="持续温度补偿" v-model="paramInfo.contTempComp" ></x-input>
              <x-input title="启动温度补偿" v-model="paramInfo.startTempComp" ></x-input>
              <x-input title="温度补偿时间" v-model="paramInfo.tempCompTimen" ></x-input>
            </group>  
          </div>
          <div v-show="itemIndex == 2">
            <group>
              <x-input title="第一组ID 限行米数" v-model="paramInfo.firstIdMeter" ></x-input>
              <x-input title="电机最大可调运行速度" v-model="paramInfo.windMaxSpeed" ></x-input>
              <x-input title="第二组ID 限行米数" v-model="paramInfo.secondIdMeter" ></x-input>
              <x-input title="ID号" v-model="paramInfo.idNum" ></x-input>
              <x-input title="米数校准值" v-model="paramInfo.meterCheck" ></x-input>
              <x-input title="可调温度档位最大值" v-model="paramInfo.adjustTempMax" ></x-input>
              <x-input title="SOS米数" v-model="paramInfo.sosMeterNum" ></x-input>
            </group>  
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
               title="添加确认"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">操作成功，设备号为{{addDeviceCode}},是否继续添加?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { XTextarea, XButton, Tabbar, TabbarItem, XHeader, XTable, Group, XInput, Cell, Selector, Datetime, TransferDom, Popup, Tab, TabItem, Confirm } from 'vux'
  // import qs from 'qs'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      XTable,
      Tabbar,
      TabbarItem,
      Group,
      XInput,
      Cell,
      Selector,
      Datetime,
      XButton,
      XTextarea,
      Popup,
      Tab,
      TabItem,
      Confirm
    },
    data () {
      return {
        name: '设备添加',
        showPopup: false,
        itemIndex: 0,
        showConfirm: false,
        devStatusList: [],
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
        checkFlag: false,
        addDeviceCode: '',
        info: {
          // devCode: 'A0000004',
          devSeries: 1,
          devType: 3,
          devStatus: 2,
          devOutTime: '',
          devBluetCode: '',
          passGroup: '' // 逗号隔开
          // devSosPass: '',
          // passGroup: ''
        },
        paramInfo: {
          devCode: '',
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
          outLigthSenc: 0,
          runStartSpeed: 0,
          tempCheckSwitch: 0,
          inLightCheckSwitch: 0,
          outLightCheckSwitch: 0,
          upCheckSwitch: 0,
          upCheckSenc: 0,
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
        }
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
        // 设备状态
        if (dict.dictParentId === 123) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.devStatusList.push(newInfo)
        }
      }
    },
    methods: {
      async sumbit () {
        console.info('.....' + this.info.devSeries)
        if (this.checkSubmitField(this.info.devSeries, '请选择设备系列!')) {
          return
        }
        if (this.checkSubmitField(this.info.devType, '请选择设备类型!')) {
          return
        }
        if (this.checkSubmitField(this.info.devStatus, '请选择设备状态!')) {
          return
        }
        if (this.checkSubmitField(this.info.devOutTime, '请选择出厂时间!')) {
          return
        }
        if (this.checkSubmitField(this.info.passGroup, '请输入密码组!')) {
          return
        }
        let pg = this.info.passGroup.split(',')
        if (pg.length < 3) {
          this.$vux.toast.show({
            text: '密码组格式不正确,请至少输入三组密码组',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        if (this.info.devOutTime.length === 16) {
          this.info.devOutTime = this.info.devOutTime + ':00'
        }
        let response = await this.$http.postDeviceCommon('/devBaseInfo/addDevBaseInfo', this.info)
        if (response.code === 0) {
          if (response.data.length !== 0) {
            console.log(response.data)
            // let respData = JSON.parse(response.data)
            this.addDeviceCode = response.data[0].devCode
          }
          this.showConfirm = true
        } else {
          this.$vux.toast.show({
            text: '提交失败,请重新提交',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      onEvent (event) {
        this.showPopup = true
      },
      closePopup () {
        this.showPopup = false
      },
      onItemClick (index) {
        console.log('on item click:', index)
        this.itemIndex = index
      },
      async showParam () {
        this.showPopup = true
        let formData = {}
        formData.devType = this.info.devType
        formData.devSeries = this.info.devSeries
        let res = await this.$http.postDeviceCommon('/devSpecifications/getDevSpecifications', formData)
        if (res.code === 0) {
          this.paramInfo = res.data
        }
      },
      onConfirm () {
        this.info.devCode = ''
        this.info.devSeries = 1
        this.info.devType = 3
        this.info.devStatus = 2
        this.info.devOutTime = ''
        this.info.passGroup = ''
      },
      onCancel () {
        this.$router.push({path: '/device/query', query: { devCode: this.info.devCode }})
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
  .submit-btn {
    font-size: 20px;
    color: orange;
  }
  .detail-area {
    width: 80%;
    margin-left: 10%;
    padding-bottom: 58px;
  }
  .icon-grid {
    font-size: 20px;
  }
</style>
