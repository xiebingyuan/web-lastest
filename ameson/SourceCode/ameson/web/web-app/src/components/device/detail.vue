<template>
  <div>
    <x-header>{{name}}</x-header>
    <group title="基础信息">
      <x-input title="设备编号" disabled  v-model="info.devCode"></x-input>
      <x-input title="蓝牙编号" disabled  v-model="info.devBluetCode"></x-input>
      <selector ref="defaultValueRef" readonly title="设备系列" :options="devSeriesList" v-model="info.devSeries"></selector>
      <selector ref="defaultValueRef" readonly title="设备类型" :options="devTypeList" v-model="info.devType"></selector>
      <selector ref="defaultValueRef" readonly title="设备状态" :options="devStatusList" v-model="info.devStatus"></selector>
      <x-input title="客户" disabled  v-model="info.custName"></x-input>
      <x-input title="出售时间" disabled  v-model="info.saleTime"></x-input>
      <x-input title="出厂时间" disabled  v-model="info.devOutTime"></x-input>
<!--       <x-input title="管理员密码" disabled v-model="info.devAdminPass"></x-input>
      <x-input title="SOS密码" disabled  v-model="info.devSosPass"></x-input> -->
      <x-input title="当前运行米数" disabled  v-model="info.passMeterUsed"></x-input>
    </group>
    <!-- <group title="密码组 [自动生成]"></group> -->
    <group>
      <cell title="规格参数">
        <div style="text-align: left !important;margin-left: -180px;">
          <i slot="icon" class="iconfont icon-xiangxiajixu icon-grid" @click="showParam"></i>
        </div>
      </cell>
    </group>
    <group>
      <cell title="运行日志">
        <div style="text-align: left !important;margin-left: -180px;">
          <i slot="icon" class="iconfont icon-xiangxiajixu icon-grid" @click="showLog"></i>
        </div>
      </cell>
    </group> 
    <group>
      <cell title="维护日志">
        <div style="text-align: left !important;margin-left: -180px;">
          <i slot="icon" class="iconfont icon-xiangxiajixu icon-grid" @click="showOperation"></i>
        </div>
      </cell>
    </group>
    <div v-transfer-dom>
      <popup v-model="showParamPopup" height="100%">
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
              <x-input title="加热丝功率值" v-model="paramInfo.hotPower" ></x-input>
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
              <selector ref="defaultValueRef" title="上盖与压杆状态检测开关" :options="startStopList" v-model="paramInfo.upCheckSwitch"></selector>
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
          <div v-transfer-dom>
            <popup v-model="showLogPopup" height="100%">
              <div class="popup1">
                <x-header :left-options="{showBack: false}">
                  <a slot="left" @click="closeLogPopup">
                    <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
                  </a>
                  设备运行日志
                </x-header>
                <group>
                  <cell title="设备编号" v-model="info.devCode"></cell>
                </group>
                <div>
                  <group >
                    <div v-for="info in logInfos" track-by="$index">
                      <cell :title="info.creatTime" @click.native="showLogDetail(info)" is-link></cell>
                    </div>  
                  </group>  
                </div>
              </div>
            </popup>
          </div>
          <div v-transfer-dom>
            <popup v-model="showOperationPopup" height="100%">
              <div class="popup1">
                <x-header :left-options="{showBack: false}">
                  <a slot="left" @click="closeOperationPopup">
                    <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
                  </a>
                  设备维护日志
                </x-header>
                <group>
                  <cell title="设备编号" v-model="info.devCode"></cell>
                </group>
                <div>
                  <group >
                    <div v-for="info in operationInfos" track-by="$index">
                      <cell :title="info.creatTime" @click.native="showOperationLogDetail(info)" is-link></cell>
                    </div>  
                  </group>  
                </div>
              </div>
            </popup>
          </div>
          <div v-transfer-dom>
            <popup v-model="showLogDetailPopup" height="100%">
              <div class="popup1">
                <x-header :left-options="{showBack: false}">
                  <a slot="left" @click="closeLogDetailPopup">
                    <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
                  </a>
                  {{logTitle}}
                </x-header>
                <div>
                  <cell-box>{{logDetail}}</cell-box>
                </div>
              </div>
            </popup>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import { XTextarea, XButton, Tabbar, TabbarItem, XHeader, XTable, Group, XInput, Cell, Selector, Datetime, TransferDom, Popup, Tab, TabItem, CellBox } from 'vux'
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
      CellBox
    },
    data () {
      return {
        name: '设备详情',
        showParamPopup: false,
        showLogPopup: false,
        showOperationPopup: false,
        showLogDetailPopup: false,
        itemIndex: 0,
        logInfos: '',
        logTitle: '',
        logDetail: '',
        operationInfo: '',
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
        operationInfos: '',
        info: {
          uuid: '',
          devCode: '',
          devBluetCode: '',
          devSeries: 0,
          devType: 0,
          devStatus: 0,
          custName: '',
          saleTime: '',
          devOutTime: '',
          passUsedMeter: 0
          // devAdminPass: '******',
          // devSosPass: '******',
        },
        paramInfo: {
          uuid: '',
          devCode: '',
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
        }
      }
    },
    mounted () {
      let id = this.$route.query.devCode
      this.info.devCode = id
      if (id) {
        this.getDetail(id)
      }
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
      async getDetail (devCode) {
        let response = await this.$http.postDeviceCommon('/devBaseInfo/getDevBaseInfo', {devCode: devCode})
        if (response.code === 0) {
          this.info = response.data
        } else {
          console.info('1111')
        }
      },
      closePopup () {
        this.showParamPopup = false
      },
      closeLogPopup () {
        this.showLogPopup = false
      },
      closeOperationPopup () {
        this.showOperationPopup = false
      },
      closeLogDetailPopup () {
        this.showLogDetailPopup = false
      },
      onItemClick (index) {
        console.log('on item click:', index)
        this.itemIndex = index
      },
      async showParam () {
        this.showParamPopup = true
        let res = await this.$http.postDeviceCommon('/devParams/getDevParams', {devCode: this.info.devCode})
        if (res.code === 0) {
          this.paramInfo = res.data
        } else {
          this.$vux.toast.show({
            text: '获取数据失败,请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      async showOperation () {
        this.showOperationPopup = true
        let res = await this.$http.postDeviceQuery('/devMaintenanceRecord/getDevMaintenanceRecordList', {devCode: this.info.devCode}, 10, 1)
        if (res.code === 0) {
          this.operationInfos = res.data
        }
      },
      async showLog () {
        this.showLogPopup = true
        let res = await this.$http.postDeviceQuery('/devRunRecord/getDevRunRecordList', {devCode: this.info.devCode}, 10, 1)
        if (res.code === 0) {
          this.logInfos = res.data
        }
      },
      showLogDetail (info) {
        this.logTitle = '设备运行日志'
        this.showLogDetailPopup = true
        this.logDetail = info.recordDetail
      },
      showOperationLogDetail (info) {
        this.logTitle = '设备维护日志'
        this.showLogDetailPopup = true
        this.logDetail = info.recordDetail
      }
    }
  }
</script>

<style>
  .detail-area {
    width: 80%;
    margin-left: 10%;
    padding-bottom: 58px;
  }
</style>
