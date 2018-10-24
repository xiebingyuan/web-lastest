<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query(pageSize, pageNo)">查询</a>
      <a slot="right" @click="resetData" style="margin-left: 20px">重置</a>
    </x-header>
    <group>
      <x-input title="设备编号" v-model="reqInfo.devCode"  placeholder="请输入设备编号..."></x-input>
      <x-input title="客户编号" v-model="reqInfo.custCode" placeholder="请输入客户编号..."></x-input>
    </group>
    <group></group>
    <div>
      <scroller lock-x height="400px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
        <div>
          <x-table full-bordered style="background-color:#fff;">
            <thead>
              <tr style="background-color: #F7F7F7">
                <th></th>
                <th>编号</th>
                <th>客户</th>
                <!-- <th>类型</th> -->
                <th>通讯</th>
              </tr>
            </thead>
            <tbody v-for="(device,index) in devices" track-by="$index" v-if="code==0">
            <tr>
              <td>
                <input class="magic-checkbox" v-model="devList" type="checkbox" name="layout" :id="index" :value="device">
                <label :for="index"></label>
              </td>
              <td>{{device.devCode}}</td>
              <td>{{device.custName}}</td>
              <!-- <td>{{device.deviceTypeName}}</td> -->
              <td>{{device.commStatusName}}</td>
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
    <div>
      <div v-if="checkBox">
        <tabbar style="position:fixed">
            <tabbar-item @click.native="toAdd"><span slot="label" class="showClass">添加</span></tabbar-item>
            <tabbar-item @click.native="toUpdate"><span slot="label" class="showClass">修改</span></tabbar-item>
            <tabbar-item @click.native="toDel"><span slot="label" class="showClass">删除</span></tabbar-item>
            <tabbar-item @click.native="toModule"><span slot="label" class="showClass">设备模块</span></tabbar-item>
        </tabbar>
      </div>
      <div v-else>
        <tabbar style="position:fixed">
          <tabbar-item @click.native="toAdd"><span slot="label" class="showClass">添加</span></tabbar-item>
          <tabbar-item><span slot="label">修改</span></tabbar-item>
          <tabbar-item><span slot="label">删除</span></tabbar-item>
          <tabbar-item><span slot="label">设备模块</span></tabbar-item>
        </tabbar>
      </div>
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
        name: '设备查询',
        devCode: '',
        custCode: '',
        code: 0,
        pageNo: 1,
        pageSize: 10,
        isRepair: false,
        checkBox: false,
        onFetching: false,
        loadShow: false,
        devices: {},
        devList: [],
        statusList: [],
        typeMap: {},
        deviceTypeMap: {},
        reqInfo: {
          devCode: '',
          custCode: ''
        },
        formData: {
          devCode: '',
          faultCode: '',
          faultDesc: '',
          faultRemark: ''
        }
      }
    },
    mounted () {
      let id = this.$route.query.devCode
      if (id) {
        this.reqInfo.devCode = id
        this.query(this.pageSize, this.pageNo)
      }
      let custCode = this.$route.query.custCode
      if (custCode) {
        this.reqInfo.custCode = custCode
        this.query(this.pageSize, this.pageNo)
      }
      var data = new Map()
      var deviceMap = new Map()
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 通信模块注册状态
        if (dict.dictParentId === 70) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          data.set(key, name)
        }
        // 设备类型
        if (dict.dictParentId === 1) {
          deviceMap.set(dict.dictTypeValue, dict.dictTypeCname)
        }
      }
      this.typeMap = data
      this.deviceTypeMap = deviceMap
    },
    watch: {
      devList: function (val, oldVal) {
        if (val.length > 0) {
          this.checkBox = true
        } else {
          this.checkBox = false
        }
      }
    },
    methods: {
      async query (pageSize, pageNo) {
        let res = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', this.reqInfo, pageSize, pageNo)
        if (res.code === 0 && res.data.length !== 0) {
          this.code = res.code
          this.devices = res.data
          for (var i = this.devices.length - 1; i >= 0; i--) {
            this.devices[i].commStatusName = this.typeMap.get(this.devices[i].commStatus)
            // this.devices[i].deviceTypeName = this.deviceTypeMap.get(this.devices[i].devType)
          }
        } else {
          this.code = -1
        }
        this.pageSize = 10
      },
      resetData () {
        this.reqInfo.devCode = ''
        this.reqInfo.custCode = ''
        this.code = 0
        this.devices = {}
        this.pageSize = 10
      },
      toAdd () {
        this.$router.push({path: '/device/add'})
      },
      toUpdate () {
        if (this.devList.length > 1) {
          this.$vux.toast.show({
            text: '仅支持单条数据修改!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        let devCode = this.devList[0].devCode
        console.info('devCode=' + devCode)
        this.$router.push({path: '/device/edit', query: { devCode: devCode }})
      },
      async toDel () {
        console.info(this.devList.length)
        for (var i = this.devList.length - 1; i >= 0; i--) {
          console.log(this.devList[i])
          let uuid = this.devList[i].uuid
          console.log('uuid=' + uuid)
          let res = await this.$http.postDeviceCommon('/devBaseInfo/upDevBaseInfo', { uuid: uuid, status: -1 })
          if (res.code === 0) {
            this.$vux.toast.show({
              text: '删除成功!',
              position: 'middle',
              type: 'success',
              time: 1500
            })
          }
        }
        this.query(10, 1)
      },
      toModule () {
        if (this.devList.length > 1) {
          this.$vux.toast.show({
            text: '仅支持单条数据注册模块!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        let status = this.devList[0].commStatus
        // 未注册的
        if (status === 1) {
          this.$vux.toast.show({
            text: '仅支持未注册的模块!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        let devCode = this.devList[0].devCode
        this.$router.push({path: '/device/module', query: { devCode: devCode }})
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
