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
      <scroller lock-x height="300px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
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
                <x-button mini plain type="primary" @click.native="repair(device.devCode)">报修</x-button>
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
    <div v-if="isRepair" style="padding-bottom:58px;">
      <group>
        <cell title="设备编号" v-model="formData.devCode"></cell>
        <x-input title="故障码" v-model="formData.faultCode"></x-input>
        <x-textarea :max="200" title="问题描述" v-model="formData.serOrderDesc" placeholder="请输入问题描述" :show-counter="true"></x-textarea>
        <x-textarea :max="200" title="问题备注" v-model="formData.serOrderRemark" placeholder="您还有什么需要说明的" :show-counter="true"></x-textarea>
        <cell title="上传图片"><input type="file" ref="file" @change="uploadFile"/></cell>
      </group>
    </div>
    <tabbar v-if="isRepair" style="position:fixed">
      <tabbar-item><span slot="label"></span></tabbar-item>
      <tabbar-item @click.native="sumbit" class="bg-color-orange"><span slot="label" class="submit-btn">提交报修单</span></tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, Toast, XTextarea, CellBox, Scroller, LoadMore } from 'vux'
  export default {
    name: 'Diagnose',
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
      CellBox,
      Scroller,
      LoadMore
    },
    data () {
      return {
        name: '设备报修',
        devCode: '',
        custCode: '',
        code: 0,
        pageNo: 1,
        pageSize: 6,
        loadShow: false,
        onFetching: false,
        noFindMsg: '无符合条件数据！',
        isRepair: false,
        devices: {},
        formData: {
          devCode: '',
          custCode: '10000',
          serOrderClassify: 1,  // 工单分类-设备固障
          serOrderType: 1, // 问题类型-售后
          faultCode: '',
          serOrderDesc: '',
          serOrderRemark: '',
          serOrderPath: ''
        }
      }
    },
    mounted () {
      this.pageSize = this.commonJs.getCommonPageCount()
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
        this.devices = res.data
        if (this.code === 0 && res.data.length === 0) {
          this.code = -1
        }
        this.pageSize = this.commonJs.getCommonPageCount()
      },
      resetData () {
        this.devCode = ''
        this.custCode = ''
        this.code = 0
        this.devices = {}
        this.isRepair = false
        this.pageSize = this.commonJs.getCommonPageCount()
      },
      repair (devCode) {
        this.isRepair = true
        this.formData.devCode = devCode
      },
      async sumbit () {
        if (this.formData.faultCode === '') {
          this.$vux.toast.show({
            text: '请输入故障码!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        let res = await this.$http.postDeviceCommon('/serviceOrder/addServiceOrder', this.formData)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '提交成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.formData.faultCode = ''
          this.formData.serOrderDesc = ''
          this.formData.serOrderRemark = ''
        } else {
          this.$vux.toast.show({
            text: '提交失败,请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      goDetail (devCode) {
        this.$router.push({path: '/device/detail', query: { devCode: devCode }})
      },
      async uploadFile (e) {
        let file = e.target.files[0]
        let param = new FormData()
        param.append('file', file, file.name)
        let resp = await this.$http.postFile('/upload', param)
        console.log(resp)
        this.formData.serOrderPath = resp
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.loadShow = true
          this.onFetching = true
          setTimeout(() => {
            this.pageSize = this.pageSize + this.commonJs.getCommonPageCount()
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
