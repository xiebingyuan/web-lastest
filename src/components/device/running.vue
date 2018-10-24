<template>
  <div>
    <x-header>{{name}}
    </x-header>
    <group></group>
    <div>
      <scroller lock-x height="1000px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
        <div>
          <x-table full-bordered style="background-color:#fff;">
            <thead>
              <tr style="background-color: #F7F7F7">
                <th>编号</th>
                <th>设备系列</th>
                <th>设备类型</th>
                <th>详情</th>
              </tr>
            </thead>
            <tbody v-for="(device,index) in devices" track-by="$index">
            <tr>
              <td>{{device.devCode}}</td>
              <td>{{device.deviceTypeName}}</td>
              <td>{{device.devSeriesName}}</td>
              <td><x-button mini plain type="primary" @click.native="toDetail(device.devCode)">详情</x-button></td>
            </tr>
            </tbody>
          </x-table>
        </div>
        <load-more v-show="loadShow" tip="loading"></load-more>
      </scroller>
      <group v-if="code!=0">
        <cell-box class="no-find-content">
          无符合条件数据！
        </cell-box>
      </group>
    </div>
  </div>
</template>

<script>
  import { CheckIcon, XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, Scroller, LoadMore, CellBox } from 'vux'
  export default {
    name: 'Query',
    components: {
      XHeader,
      Group,
      XButton,
      XInput,
      XTable,
      Cell,
      Tabbar,
      TabbarItem,
      CheckIcon,
      Scroller,
      LoadMore,
      CellBox
    },
    data () {
      return {
        name: '运行中的设备',
        devCode: '',
        custCode: '',
        code: 0,
        pageNo: 1,
        pageSize: 5,
        isRepair: false,
        checkBox: false,
        onFetching: false,
        loadShow: false,
        devices: {},
        devList: [],
        statusList: [],
        typeMap: {},
        seriesMap: {},
        reqInfo: {}
      }
    },
    mounted () {
      var seriesdata = new Map()
      var typeData = new Map()
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 设备系列
        if (dict.dictParentId === 57) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          seriesdata.set(key, name)
        }
        // 设备类型
        if (dict.dictParentId === 1) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          typeData.set(key, name)
        }
      }
      this.typeMap = typeData
      this.seriesMap = seriesdata
      this.query(5, 1)
    },
    watch: {
    },
    methods: {
      async query (pageSize, pageNo) {
        let res = await this.$http.postDeviceQuery('/devBaseInfo/getRunDevList', this.reqInfo, pageSize, pageNo)
        if (res.code === 0 && res.data.length !== 0) {
          this.code = res.code
          this.devices = res.data
          for (var i = this.devices.length - 1; i >= 0; i--) {
            this.devices[i].devSeriesName = this.seriesMap.get(parseInt(this.devices[i].devSeries))
            this.devices[i].deviceTypeName = this.typeMap.get(parseInt(this.devices[i].deviceType))
          }
        } else {
          this.code = -1
        }
        this.pageSize = 5
      },
      toDetail (devCode) {
        this.$router.push({path: '/device/detail', query: { devCode: devCode }})
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
  
</style>
