<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query(pageSize, 1)">查询</a>
      <a slot="right" @click="resetData" style="margin-left: 20px">重置</a>
    </x-header>
    <group>
      <x-input title="设备编号" v-model="devCode"  placeholder="请输入设备编号..."></x-input>
      <x-input title="客户编号" v-model="custCode" placeholder="请输入客户编号..."></x-input>
    </group>
    <group></group>
    <div>
      <scroller lock-x height="200px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
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
                <x-button mini plain type="primary" @click.native="queryPwd(device.devCode, device.deviceId)">查询密码组</x-button>
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
          {{noFindMsg}}
        </cell-box>
      </group>
    </div>
    <div v-if="isPwd">
      <group>
        <cell title="设备编号" v-model="pwdInfo.devCode"></cell>
        <cell title="客户名称" v-model="pwdInfo.custName"></cell>
        <cell title="首次使用时间" v-model="pwdInfo.passFirstTime"></cell>
        <cell>
          <div>
            <a @click="goParam" style="color: blue">[查询参数]</a>
          </div>
        </cell>
        <cell title="密码组使用情况" class="fontWeight"></cell>
        <div>
          <!-- <div v-if="pwdInfo.passCurrUsedPosition !== 0">
            <span v-for="i in pwdInfo.passCurrUsedPosition-1" track-by="$index">
              00000{{i}},
            </span>
          </div> -->
          <cell :title="confirmTitle">
            <div>
              <a @click="changeStatus" style="color: blue">[使用密码]</a>
            </div>
          </cell>
        </div>
        <x-textarea :show-counter="false" :height="200" :rows="8" :cols="30">
        </x-textarea>
      </group>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
               title="密码组使用确认"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">{{confirmContent}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Confirm, TransferDom, XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, Toast, XTextarea, CellBox, Scroller, LoadMore } from 'vux'
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
      Toast,
      XTextarea,
      Confirm,
      CellBox,
      Scroller,
      LoadMore
    },
    data () {
      return {
        name: '密码组分配',
        devCode: '',
        custCode: '',
        devices: {},
        noFindMsg: '无符合条件数据！',
        code: 0,
        pageNo: 1,
        pageSize: 5,
        loadShow: false,
        isPwd: false,
        showConfirm: false,
        deviceId: '',
        pwdInfo: {
          uuid: '',
          devCode: '',
          custName: '',
          passCurrPass: '',
          passCurrUsedPosition: 0, // 当前密码组位置(第几个)
          passGroup: '', // 密码组
          passFirstTime: '' // 首次使用时间
        },
        confirmTitle: '',
        confirmContent: '',
        usedMeterInfo: '',
        currentPwdInfo: '',
        remainMeterInfo: ''
      }
    },
    methods: {
      async query (pageSize, pageNo) {
        let formData = {}
        if (this.devCode !== '') {
          formData.devCode = this.devCode
        }
        if (this.custCode !== '') {
          formData.custCode = this.custCode
        }
        this.isPwd = false
        let res = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', formData, pageSize, pageNo)
        if (res.code === 0 && res.data.length !== 0) {
          this.code = res.code
          this.devices = res.data
        } else {
          this.code = -1
        }
        this.pageSize = 5
      },
      resetData () {
        this.devCode = ''
        this.custCode = ''
        this.code = 0
        this.pageSize = 5
        this.devices = {}
        this.isPwd = false
      },
      async queryPwd (devCode, deviceId) {
        let response = await this.$http.postDeviceCommon('/devPasswordGroup/getPasswordGroup', {devCode: devCode})
        this.deviceId = deviceId
        if (response.code === 0 && response.data !== '') {
          this.pwdInfo = response.data
          this.isPwd = true
          this.confirmTitle = '当前所在第' + response.data.passCurrUsedPosition + '组密码,密码为' + this.pwdInfo.passCurrPass
          this.confirmContent = '您确认为设备' + this.pwdInfo.devCode + '使用' + this.pwdInfo.passCurrPass + '密码组?'
        } else {
          this.$vux.toast.show({
            text: '没有找到相关的密码组信息!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          this.isPwd = false
        }
      },
      goDetail (devCode) {
        this.$router.push({path: '/device/detail', query: { devCode: devCode }})
      },
      async onConfirm () {
        let formData = {}
        formData.devCode = this.pwdInfo.devCode
        formData.passInfo = this.pwdInfo.passCurrPass
        formData.passPosition = this.pwdInfo.passCurrUsedPosition
        console.info(11111111111111)
        let response = await this.$http.postDeviceCommon('/devPasswordGroup/activatePasswordGroup', formData)
        if (response.code === 0) {
          this.$vux.toast.show({
            text: '设置成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
        } else {
          this.$vux.toast.show({
            text: '设置失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      onCancel  () {
        console.info('cancle')
      },
      changeStatus () {
        this.showConfirm = true
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
      },
      goParam () {
        window.location.href = 'http://120.25.251.207:8612/ameson/parameter?deviceId=' + this.deviceId
      }
    }
  }
</script>

<style>
  .fontWeight {
    font-weight: bold;
  }
</style>
