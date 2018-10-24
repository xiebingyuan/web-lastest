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
      <scroller lock-x height="400px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
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
                <x-button mini plain type="primary" @click.native="goLocation(device.devCode)">定位</x-button>
                <x-button mini plain type="primary" @click.native="goDetail(device.devCode)">详情</x-button>
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
    <div>
      <div v-show="isLocation">
        <group>
          <cell title="联网状态">
            <span solt="left" class="net-status">{{netStatus}}</span>
            <a solt="right" class="his-location" @click="goHis">历史位置</a>
          </cell>
        </group>
      </div>
      <div id="allmap" style="width: 100%; height: 300px;padding-bottom:58px;" v-show="mapShow"></div>
      <group class="tabbarBottom" v-show="mapShow">
        <cell-box>
          位置 : {{locationAddr}}
        </cell-box>  
      </group>  
    </div>  
    
    <tabbar v-if="isLocation" style="position:fixed">
      <tabbar-item @click.native="updated"><span slot="label" class="showClass">固体升级</span></tabbar-item>
      <tabbar-item @click.native="setup"><span slot="label" class="showClass">参数设置</span></tabbar-item>
      <tabbar-item><span slot="label" class="showClass">申请报修</span></tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <popup v-model="showPopup" height="100%">
        <div class="popup1">
          <x-header :left-options="{showBack: false}">
            <a slot="left" @click="closeHis">
              <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
            </a>
            {{popupTitle}}
          </x-header>
          <group></group>
          <x-table full-bordered style="background-color:#fff;">
            <thead>
            <tr style="background-color: #F7F7F7">
              <th>时间</th>
              <th>位置</th>
              <th>定位方式</th>
            </tr>
            </thead>
            <tbody v-for="(l,key,index) in locations" track-by="$index">
            <tr>
              <td>{{l.gpsTime}}</td>
              <td class="textAlignLeft">{{l.gpsAddr}}</td>
              <td>{{l.hold1}}</td>
            </tr>
            </tbody>
          </x-table>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import { XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, TransferDom, Popup, ViewBox, CellBox, Scroller, LoadMore } from 'vux'
  import BMap from 'BMap'
  let map
  export default {
    name: 'Location',
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
      LoadMore
    },
    data () {
      return {
        name: '设备定位',
        devCode: '',
        custCode: '',
        code: 0,
        pageSize: 10,
        pageNo: 1,
        loadShow: false,
        isLocation: false,
        onFetching: false,
        netStatus: '未联网',
        locationAddr: '',
        statusMap: {},
        showPopup: false,
        devices: {},
        locationCode: '',
        locations: {},
        popupTitle: '',
        mapShow: true,
        map: {
          lng: 118.07307,
          lat: 24.451332
        }
      }
    },
    mounted () {
      map = new BMap.Map('allmap')
      let point = new BMap.Point(116.30799, 40.058692)
      let marker = new BMap.Marker(point)
      map.addOverlay(marker)
      map.centerAndZoom(point, 15)
      map.addControl(new BMap.MapTypeControl())
      map.enableScrollWheelZoom(true)
      map.enableDoubleClickZoom(true)
      this.mapShow = false
      var sMap = new Map()
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 联网状态
        if (dict.dictParentId === 67) {
          sMap.set(dict.dictTypeValue, dict.dictTypeCname)
        }
      }
      this.statusMap = sMap
      let id = this.$route.query.devCode
      if (id) {
        this.devCode = id
        this.query(this.pageSize, this.pageNo)
      }
    },
    methods: {
      async query (pageSize, pageNo) {
        let formData = {}
        this.isLocation = false
        this.mapShow = false
        if (this.devCode !== '') {
          formData.devCode = this.devCode
        }
        if (this.custCode !== '') {
          formData.custCode = this.custCode
        }
        let response = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', formData, pageSize, pageNo)
        this.code = response.code
        this.devices = response.data
        if (response.code === 0 && response.data.length === 0) {
          this.code = -1
        }
        this.pageSize = 10
      },
      resetData () {
        this.devCode = ''
        this.custCode = ''
        this.locationCode = ''
        this.devices = {}
        this.code = 0
        this.isLocation = false
        this.mapShow = false
        this.pageSize = 10
      },
      async goLocation (devCode) {
        this.locationCode = devCode
        let response = await this.$http.postDeviceCommon('/devGpsRecord/getTbDevGpsRecord', {devCode: devCode})
        if (response.code === 0 && response.data !== '') {
          this.mapShow = true
          this.isLocation = true
          this.map.lng = response.data.gpsLng
          this.map.lat = response.data.gpsLat
          this.locationAddr = response.data.gpsAddr
          console.info(this.statusMap)
          this.netStatus = '已联网'
          map.clearOverlays()
          let point = new BMap.Point(this.map.lng, this.map.lat)
          let marker = new BMap.Marker(point)
          map.addOverlay(marker)
          setTimeout(function () {
            map.setCenter(point)
          }, 100)
        } else {
          this.netStatus = '未联网'
          this.mapShow = false
          this.isLocation = true
          this.$vux.toast.show({
            text: response.msg,
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      async goHis () {
        this.showPopup = true
        this.popupTitle = this.locationCode + '历史位置'
        let response = await this.$http.postDeviceQuery('/devGpsRecord/getDevGpsRecordList', {devCode: this.locationCode}, 10, 1)
        this.locations = response.data
        for (var i = this.locations.length - 1; i >= 0; i--) {
          this.locations[i].hold1 = this.statusMap.get(parseInt(this.locations[i].gpsType))
        }
      },
      closeHis () {
        this.showPopup = false
      },
      setup () {
        this.$router.push({path: '/param/list', query: { devCode: this.locationCode }})
      },
      goDetail () {
        this.$router.push({path: '/device/detail', query: { devCode: this.locationCode }})
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
  .net-status {
    margin-left: -180px;
    position: absolute;
    color: red;
  }
  .his-location {
    color: blue;
  }
</style>
