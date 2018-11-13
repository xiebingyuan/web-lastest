<template>
  <div>
    <x-header>{{name}}
      <!-- <a slot="right" @click="query(pageSize, pageNo)">查询</a> -->
    </x-header>
    <group></group>
    <button-tab>
      <button-tab-item @on-item-click="itemClick(1)" selected>待处理</button-tab-item>
      <button-tab-item @on-item-click="itemClick(2)">已处理</button-tab-item>
    </button-tab>
    <div style="padding-top: 10px;">
      <scroller lock-x height="250px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
        <div>
          <x-table full-bordered style="background-color:#fff;" >
            <thead>
              <tr style="background-color: #F7F7F7">
                <th>工单号</th>
                <th>工单状态</th>
                <th>提交时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info,index) in infos" :class="{ 'select-status': index === selected }" track-by="$index" @click="choose(index)" v-if="code==0">
                <td>{{info.serOrderNum}}</td>
                <td>{{info.statusName}}</td>
                <td>{{info.creatTime}}</td>
              </tr>  
            </tbody>
          </x-table>
        </div>
        <load-more v-show="loadShow" tip="loading"></load-more>
      </scroller>
      </group>
      <group v-if="code!=0" >
        <cell-box class="no-find-content">
          无符合条件数据！
        </cell-box>
      </group>
    </div>
    <div v-show="selected!==''" style="padding-bottom:58px;">
      <group>
        <selector ref="defaultValueRef" title="问题类型" readonly class="floatLeft" direction="rtl"  :options="questionTypeList" v-model="detail.serOrderType"></selector>
        <selector ref="defaultValueRef" title="问题分类" readonly  :options="questionClassList" v-model="detail.serOrderClassify"></selector>
        <cell title="设备编号" v-model="detail.devCode"></cell>
        <!-- <x-input title="设备编号" disabled v-model="detail.devCode"></x-input> -->
        <x-textarea title="问题描述" disabled v-model="detail.serOrderDesc"></x-textarea>
        <cell title="工单状态" v-model="detail.serOrderStatusName"></cell>
<!--         <selector ref="defaultValueRef" title="状态" readonly class="floatLeft" direction="rtl"  :options="orderStatusList" v-model="info.orderStatus"></selector> -->
        <x-textarea :max="200" title="处理反馈" placeholder="请输入处理反馈..." v-model="info.handlDesc" :show-counter="false"></x-textarea>
        <cell title="上传图片"><input type="file" ref="file" @change="uploadFile"/></cell> 
        <!-- <x-textarea title="工单备注" disabled v-model="detail.serOrderRemark"></x-textarea> -->
        <!-- <cell title="审核状态" v-model="detail.serOrderExamStatusName"></cell> -->
        <!-- <cell title="工单状态" v-model="detail.serOrderStatusName"></cell> -->
<!--         <cell title="处理人" v-model="detail.devCode"></cell>
        <cell title="处理时间" v-model="detail.devCode"></cell>
        <cell title="审批情况" v-model="detail.devCode"></cell> -->
      </group>
    </div>  
    <tabbar style="position:fixed" v-show="selected!=='' && detail.serOrderStatus === 2">
      <tabbar-item ><span slot="label" class="submit-btn"></span></tabbar-item>
      <tabbar-item @click.native="handleData" class="bg-color-orange"><span slot="label" class="submit-btn">处  理</span></tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
               title="删除确认"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">您确认删除该故障信息?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Confirm, TransferDom, XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, XTextarea, CellBox, Selector, Scroller, LoadMore, Popup, Checklist, Search, ButtonTab, ButtonTabItem } from 'vux'
  export default {
    name: 'HandlerOrder',
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
      XTextarea,
      Confirm,
      CellBox,
      Selector,
      Scroller,
      LoadMore,
      Popup,
      Checklist,
      Search,
      ButtonTab,
      ButtonTabItem
    },
    data () {
      return {
        name: '工单处理',
        code: 0,
        pageNo: 1,
        pageSize: 6,
        isPick: false,
        loadShow: false,
        onFetching: false,
        selected: '',
        faultCode: '',
        typeList: [],
        statusMap: {},
        orderStatusMap: {},
        showVerifyPopup: false,
        showReasonPopup: false,
        questionStatusList: [],
        questionClassList: [],
        questionTypeList: [],
        statusList: [],
        orderStatusList: [],
        showConfirm: false,
        objectListValue: [],
        infos: [],
        searchValue: '',
        waitOrderShow: true,
        handleOrderShow: false,
        url: '',
        reqInfo: {
          serOrderStatus: '',
          serOrderType: '',
          serOrderClassify: ''
        },
        detail: {
          serOrderType: 0,
          serOrderClassify: 0,
          devCode: '',
          custCode: '',
          serOrderNum: '',
          serOrderDesc: '',
          serOrderRemark: '',
          serOrderExamStatus: 99,
          serOrderStatusName: '',
          serOrderExamStatusName: ''
        },
        info: {
          serOrderNum: '',
          custCode: '',
          serOrderExamStatus: 0,
          handlDesc: '',
          handlPath: '',
          orderStatus: 3
        }
      }
    },
    mounted () {
      this.pageSize = this.commonJs.getCommonPageCount()
      var data = new Map()
      var orderData = new Map()
      var dictAll = this.commonJs.getDictInfo()

      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 工单问题类型
        if (dict.dictParentId === 105) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          this.questionTypeList.push(newInfo)
        }
        // 工单问题分类
        if (dict.dictParentId === 110) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          this.questionClassList.push(newInfo)
        }
        // 工单审核状态
        if (dict.dictParentId === 114) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          data.set(key, name)
          this.questionStatusList.push(newInfo)
          this.statusList.push(newInfo)
        }
        // 工单状态
        if (dict.dictParentId === 100) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          this.orderStatusList.push(newInfo)
          orderData.set(key, name)
        }
      }
      this.statusMap = data
      this.orderStatusMap = orderData
      this.url = '/serviceOrder/getWaitHandleList'
      this.query(this.url, this.pageSize, this.pageNo)
    },
    watch: {
      objectListValue: function (val, oldVal) {
        console.info(val)
      }
    },
    methods: {
      async query (url, pageSize, pageNo) {
        this.selected = ''
        this.infos = []
        let response = await this.$http.postDeviceQuery(url, this.reqInfo, pageSize, pageNo)
        this.code = response.code
        this.isInit = true
        this.infos = response.data
        console.log(this.statusMap)
        for (var i = this.infos.length - 1; i >= 0; i--) {
          this.infos[i].statusName = this.orderStatusMap.get(parseInt(this.infos[i].serOrderStatus))
        }
        if (this.infos.length === 0) {
          this.code = -1
        }
        this.pageSize = this.commonJs.getCommonPageCount()
      },
      itemClick (type) {
        console.log('change type = ' + type)
        if (type === 1) {
          this.waitOrderShow = true
          this.handleOrderShow = false
          this.url = '/serviceOrder/getWaitHandleList'
          this.query(this.url, this.pageSize, this.pageNo)
        } else {
          this.waitOrderShow = false
          this.handleOrderShow = true
          this.url = '/serviceOrder/getMyHandleList'
          this.query(this.url, this.pageSize, this.pageNo)
        }
      },
      choose (index) {
        this.selected = index
        this.isPick = true
        this.detail = this.infos[index]
        console.log(this.infos[index].serOrderStatus)
        console.log(this.orderStatusMap)
        this.detail.serOrderStatusName = this.orderStatusMap.get(parseInt(this.infos[index].serOrderStatus))
        this.detail.serOrderExamStatusName = this.statusMap.get(parseInt(this.infos[index].serOrderExamStatus))
      },
      showVerify () {
        this.showVerifyPopup = true
      },
      closePopup () {
        this.showVerifyPopup = false
      },
      closeReasonPopup () {
        this.showReasonPopup = false
      },
      saveReason () {
        this.showReasonPopup = false
      },
      process (code) {
        this.$router.push({path: '/fault/plan', query: { faultCode: code }})
      },
      change () {
        if (this.objectListValue.length !== 0 && this.objectListValue[0] === 2) {
          this.showReasonPopup = true
        }
      },
      async onConfirm () {
        let response = await this.$http.postDeviceCommon('/devFaultCodeConfig/upDevFaultCodeConfig', {uuid: this.infos[this.selected].uuid, status: -1})
        if (response.code === 0) {
          this.$vux.toast.show({
            text: '删除成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.infos.splice(this.selected, 1)
          this.selected = ''
          this.isPick = false
        } else {
          this.$vux.toast.show({
            text: '删除失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      async uploadFile (e) {
        let file = e.target.files[0]
        let param = new FormData()
        param.append('file', file, file.name)
        let resp = await this.$http.postFile('/upload', param)
        console.log(resp)
        this.info.handlPath = resp
      },
      async handleData () {
        this.info.serOrderNum = this.detail.serOrderNum
        this.info.custCode = this.detail.custCode
        let res = await this.$http.postDeviceCommon('/serviceOrder/handleServiceOrder', this.info)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '处理成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.selected = ''
          this.isPick = false
        } else {
          this.$vux.toast.show({
            text: '处理失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      resultClick (item) {
        console.log('on-resultClick', item)
      },
      onFocus () {
        console.info('onFocus.')
      },
      onSubmit () {
        console.info('onSubmit.')
      },
      onCancel () {
        console.info('onCancel.')
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.loadShow = true
          this.onFetching = true
          setTimeout(() => {
            this.pageSize = this.pageSize + this.commonJs.getCommonPageCount()
            this.query(this.url, this.pageSize, this.pageNo)
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
.floatLeft {
  text-align: left !important;
}
</style>
