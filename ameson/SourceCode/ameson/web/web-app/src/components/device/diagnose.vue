<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query(pageSize, pageNo)">查询</a>
      <a slot="right" @click="resetData" style="margin-left: 20px">重置</a>
    </x-header>
    <group>
      <x-input title="设备编号" v-model="devCode"  placeholder="请输入设备编号..."></x-input>
      <x-input title="客户编号" v-model="custCode" placeholder="请输入客户编号..."></x-input>
    </group>
    <group></group>
    <div>
      <scroller lock-x height="250px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
        <div>
          <x-table full-bordered style="background-color:#fff;">
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
                <x-button mini plain type="primary" @click.native="diagnose(device)">诊断</x-button>
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
    <div style="padding-bottom:58px;" v-show="isDiagnose">
      <group >
        <cell title="设备编号" :value="diagnoseInfo.devCode"></cell>
        <cell title="联网状态" :value="diagnoseInfo.netStatusName"></cell>
        <cell title="故障码" :value="diagnoseInfo.faultCode">
          <a slot="left" @click="process(diagnoseInfo.devCode)">处理方案</a>
        </cell>
        <cell title="故障描述" :value="diagnoseInfo.faultName"></cell>
        <x-textarea :max="400" title="诊断结果" v-model="diagnoseInfo.faultDesc" :rows="10" :show-counter="false"></x-textarea>
      </group>
    </div>
    <div v-transfer-dom>
      <popup v-model="showLog" height="100%">
        <x-header :left-options="{showBack: false}">
          <a slot="left" @click="closeLog">
            <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
          </a>
          设备运行日志
        </x-header>
        <group>
          <cell title="设备编号" v-model="diagnoseDevCode"></cell>
        </group>
        <div>
          <group >
            <div v-for="info in logInfos" track-by="$index">
              <cell :title="info.creatTime" @click.native="showLogDetail(info)" is-link></cell>
            </div>  
          </group>  
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
            运行日志
          </x-header>
          <div>
            <cell-box>{{logDetail}}</cell-box>
          </div>
        </div>
      </popup>
    </div>
    <tabbar v-if="isDiagnose" style="position:fixed">
      <tabbar-item @click.native="updated"><span slot="label" class="showClass">固体升级</span></tabbar-item>
      <tabbar-item @click.native="setup"><span slot="label" class="showClass">参数设置</span></tabbar-item>
      <tabbar-item @click.native="location"><span slot="label" class="showClass">设备定位</span></tabbar-item>
      <tabbar-item @click.native="goDetail" ><span slot="label" class="showClass">设备详情</span></tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, TransferDom, Popup, ViewBox, CellBox, Scroller, LoadMore, XTextarea } from 'vux'
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
      Tabbar,
      TabbarItem,
      Popup,
      ViewBox,
      CellBox,
      Scroller,
      LoadMore,
      XTextarea
    },
    data () {
      return {
        name: '设备诊断',
        devCode: '',
        custCode: '',
        code: 0,
        devices: {},
        pageNo: 1,
        pageSize: 5,
        diagnoseDevCode: '',
        loadShow: false,
        onFetching: false,
        faultStatus: '',
        faultCode: '',
        faultDesc: '',
        faultMap: {},
        netStatusMap: {},
        logDetail: '',
        diagnoseInfo: {
          devCode: '',
          netStatus: '',
          netStatusName: '',
          faultCode: '',
          faultName: '',
          faultDesc: ''
        },
        isDiagnose: false,
        showLogDetailPopup: false,
        showLog: false,
        logInfos: {},
        logInfo: '未找到相关的日志信息.'
      }
    },
    mounted () {
      var dictAll = this.commonJs.getDictInfo()
      var map = new Map()
      var netMap = new Map()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 故障类型
        if (dict.dictParentId === 31) {
          map.set(dict.dictTypeValue, dict.dictTypeCname)
        }
        // 联网状态
        if (dict.dictParentId === 67) {
          netMap.set(dict.dictTypeValue, dict.dictTypeCname)
        }
      }
      this.faultMap = map
      this.netStatusMap = netMap
    },
    methods: {
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
        this.pageSize = 5
      },
      resetData () {
        this.devCode = ''
        this.custName = ''
        this.code = 0
        this.devices = {}
        this.isDiagnose = false
        this.pageSize = 5
      },
      async diagnose (info) {
        if (info.commStatus !== 1) {
          this.$vux.toast.show({
            text: '设备还未注册通讯模块，无法诊断!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        } else {
          let response = await this.$http.postDeviceCommon('/devBaseInfo/deviceDiagnosis', {devCode: info.devCode})
          if (response.code === 0) {
            this.isDiagnose = true
            this.diagnoseInfo = response.data
            this.diagnoseInfo.faultName = this.faultMap.get(parseInt(response.data.faultCode))
            this.diagnoseInfo.netStatusName = this.netStatusMap.get(parseInt(response.data.netStatus))
            this.diagnoseDevCode = info.devCode
          } else {
            this.$vux.toast.show({
              text: '诊断异常,请重新提交!',
              position: 'middle',
              type: 'warn',
              time: 1500
            })
          }
        }
      },
      process (code) {
        console.info('code = ' + code)
      },
      updated () {
        console.info('固体升级 = ' + this.diagnoseDevCode)
      },
      async showDeviceLog (devCode) {
        this.showLog = true
        let res = await this.$http.postDeviceQuery('/devRunRecord/getDevRunRecordList', {devCode: devCode}, 10, 1)
        if (res.code === 0) {
          this.logInfos = res.data
        }
      },
      closeLog () {
        this.showLog = false
      },
      closeLogDetailPopup () {
        this.showLogDetailPopup = false
      },
      showLogDetail (info) {
        this.logTitle = '设备运行日志'
        this.showLogDetailPopup = true
        this.logDetail = info.recordDetail
      },
      setup () {
        this.$router.push({path: '/param/list', query: { devCode: this.diagnoseDevCode }})
      },
      location () {
        this.$router.push({path: '/device/location', query: { devCode: this.diagnoseDevCode }})
      },
      goDetail () {
        this.$router.push({path: '/device/detail', query: { devCode: this.diagnoseDevCode }})
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.loadShow = true
          this.onFetching = true
          setTimeout(() => {
            this.pageSize = this.pageSize + 5
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
  .no-find-content {
    text-align: center;
    color: red;
  }
</style>
