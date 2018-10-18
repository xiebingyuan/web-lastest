<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query(pageSize, pageNo)">查询</a>
      <a slot="right" @click="resetData" style="margin-left: 20px">重置</a>
    </x-header>
    <group>
      <x-input title="设备编号" v-model="devCode"  placeholder="请输入设备编号...">{{devCode}}</x-input>
      <x-input title="客户编号" v-model="custCode" placeholder="请输入客户编号...">{{custCode}}</x-input>
    </group>
    <group></group>
    <div>
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
        <div>  
          <x-table full-bordered style="background-color:#fff;" >
            <thead>
            <tr style="background-color: #F7F7F7">
              <th>设备编号</th>
              <th>客户名称</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody v-for="device in devices" track-by="$index" v-if="code==0">
            <tr>
              <td class="tableTd">{{device.devCode}}</td>
              <td class="tableTd">{{device.custName}}</td>
              <td>
                <x-button mini plain type="primary" @click.native="toSelect(device)">设置</x-button>
                <x-button mini plain type="primary" @click.native="process(device.devCode)">详情</x-button>
              </td>
            </tr>
            </tbody>
          </x-table>
        </div>
        <load-more v-show="loadShow" tip="loading"></load-more>
      </scroller>  
      <group v-if="code!=0" >
        <cell-box class="no-find-content">
          无符合条件数据！
        </cell-box>
      </group>
    </div>
    <div v-transfer-dom>
      <popup v-model="showPopup" height="100%">
        <div class="popup1">
          <x-header :left-options="{showBack: false}">
            <a slot="left" @click="closePopup">
              <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
            </a>
            参数规格
            <a slot="right" @click="sumbitForm" style="margin-left: 20px">提交</a>
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
        </div>
      </popup>
    </div>
    <actionsheet
      v-model="showSetup"
      :menus="menu7"
      @on-click-menu="clickMenu"
      @on-after-hide="clickMenuLog('after hide')"
      @on-after-show="clickMenuLog('after show')">
    </actionsheet>
  </div>
</template>

<script>
  import { Selector, TransferDom, XSwitch, XHeader, XButton, Group, Cell, XInput, XTable, CellBox, Popup, Tab, TabItem, Actionsheet, Scroller, LoadMore } from 'vux'
  export default {
    name: 'Home',
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      XButton,
      Group,
      Cell,
      XInput,
      XTable,
      CellBox,
      Popup,
      XSwitch,
      Tab,
      TabItem,
      Selector,
      Actionsheet,
      Scroller,
      LoadMore
    },
    data () {
      return {
        name: '参数设置',
        notice: '',
        devCode: '',
        selectCode: '',
        custCode: '',
        code: 0,
        pageNo: 1,
        pageSize: 10,
        onFetching: false,
        devices: [],
        windModeList: [],
        openCloseList: [],
        paramSwitchList: [],
        modeTypeList: [],
        modeTypeSwitchList: [],
        recordTypeList: [],
        startStopList: [],
        checkList: [],
        showPopup: false,
        itemIndex: 0,
        showSetup: false,
        loadShow: false,
        menu7: {
          1: '单参数设置',
          2: '批量参数设置'
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
      this.queryDict()
      var devCode = this.$route.query.devCode
      if (devCode) {
        this.devCode = devCode
        this.query(this.pageSize, this.pageNo)
      }
    },
    methods: {
      queryDict () {
        var dictAll = this.commonJs.getDictInfo()
        for (var i = 0; i < dictAll.length; i++) {
          let dict = dictAll[i]
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
      async query (pageSize, pageNo) {
        let params = {}
        if (this.devCode !== '') {
          params.devCode = this.devCode
        }
        if (this.custCode !== '') {
          params.custCode = this.custCode
        }
        let res = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', params, pageSize, pageNo)
        this.code = res.code
        this.isInit = true
        this.devices = res.data
        if (this.code === 0 && res.data.length === 0) {
          this.code = -1
        }
        this.pageSize = 10
      },
      resetData () {
        this.devCode = ''
        this.custCode = ''
        this.selectCode = ''
        this.code = 0
        this.pageSize = 10
        this.devices = {}
      },
      toSelect (info) {
        if (info.commStatus !== 1) {
          this.$vux.toast.show({
            text: '设备还未注册通讯模块，无法远程设置参数!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        } else {
          this.showSetup = true
          this.selectCode = info.devCode
          this.deviceId = info.deviceId
        }
      },
      async setup () {
        this.showPopup = true
        let paramData = {devCode: this.selectCode}
        let res = await this.$http.postDeviceCommon('/devParams/getDevParams', paramData)
        if (res.code === 0) {
          this.paramInfo.devCode = this.selectCode
          if (res.data !== '') {
            this.paramInfo = res.data
          }
        } else {
          this.$vux.toast.show({
            text: '提交失败,请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      closePopup () {
        this.showPopup = false
      },
      async sumbitForm () {
        let res = await this.$http.postDeviceCommon('/devParams/upDevParams', this.paramInfo)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '提交成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.showPopup = false
        } else {
          this.$vux.toast.show({
            text: '提交失败,请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      onItemClick (index) {
        console.log('on item click:', index)
        this.itemIndex = index
      },
      process (devCode) {
        this.$router.push({path: '/device/detail', query: { devCode: devCode }})
      },
      clickMenu (key, item) {
        console.info(key)
        if (key === '1') {
          window.location.href = 'http://www.zjytech.cn:8612/ameson/parameter?deviceId=' + this.deviceId
        } else {
          this.setup()
        }
      },
      clickMenuLog (msg) {
        console.info(msg)
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.loadShow = true
          this.onFetching = true
          setTimeout(() => {
            this.pageSize = this.pageSize + 10
            console.info(this.pageSize)
            this.query(this.pageSize, this.pageNo)
            this.onFetching = false
            this.loadShow = false
          }, 1000)
        }
      },
      scrollerllerBottom () {
        console.info('scrollerllerBottom')
      }
    }
  }
</script>

<style>

</style>
