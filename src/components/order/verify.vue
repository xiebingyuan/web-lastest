<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query(pageSize, pageNo)">查询</a>
    </x-header>
    <group>
      <selector ref="defaultValueRef" title="问题类型" :options="questionTypeList" v-model="reqInfo.devStatus"></selector>
      <selector ref="defaultValueRef" title="状态" :options="questionStatusList" v-model="reqInfo.serOrderStatus"></selector>
      <selector ref="defaultValueRef" title="问题分类" :options="questionClassList" v-model="reqInfo.serOrderClassify"></selector>
    </group>
    <group></group>
    <div>
      <scroller lock-x height="400px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
        <div>
          <x-table full-bordered style="background-color:#fff;" >
            <thead>
              <tr style="background-color: #F7F7F7">
                <th>工单号</th>
                <th>审核状态</th>
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
        <!-- <x-textarea title="工单备注" disabled v-model="detail.serOrderRemark"></x-textarea> -->
        <cell title="审核状态" v-model="detail.serOrderExamStatusName"></cell>
        <cell title="工单状态" v-model="detail.serOrderStatusName"></cell>
        <cell title="处理人" v-model="detail.currHandlUser"></cell>
        <cell title="处理时间" v-model="detail.handlTime"></cell>
        <cell title="审批情况" v-model="detail.handlDesc"></cell>
      </group>
    </div>  
    <tabbar style="position:fixed" v-show="selected!=='' && detail.serOrderExamStatus === 0">
      <tabbar-item ><span slot="label" class="submit-btn"></span></tabbar-item>
      <tabbar-item @click.native="showVerify" class="bg-color-orange"><span slot="label" class="submit-btn">审  核</span></tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <popup v-model="showVerifyPopup" height="100%">
        <div class="popup1">
           <x-header :left-options="{showBack: false}">
            <a slot="left" @click="closePopup">
              <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
            </a>
            工单指派
          </x-header>
          <group>
            <checklist ref="demoObject" title="工单审核状态" :options="statusList" v-model="objectListValue" :max="1" @on-change="change"></checklist>
          </group>
          <search
            @result-click="resultClick"
            @on-change="getResult"
            v-model="searchValue"
            top="191px"
            @on-focus="onFocus"
            @on-cancel="onCancel"
            @on-submit="onSubmit"
            ref="search">
          </search>
          <div>
            <x-table full-bordered style="background-color:#fff;">
              <thead>
                <tr style="background-color: #F7F7F7">
                  <th></th>
                  <th>用户名</th>
                </tr>
              </thead>
              <tbody v-for="(user,index) in users" track-by="$index">
              <tr>
                <td>
                  <input class="magic-checkbox" v-model="userIdList" type="checkbox" name="layout" :id="index" :value="user">
                  <label :for="index"></label>
                </td>
                <td>{{user.uName}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </div>
        <tabbar style="position:fixed">
          <tabbar-item ><span slot="label" class="submit-btn"></span></tabbar-item>
          <tabbar-item @click.native="verifyUser" class="bg-color-orange"><span slot="label" class="submit-btn">指  派</span></tabbar-item>
        </tabbar>  
      </popup>  
    </div>
    <div v-transfer-dom>
      <popup v-model="showReasonPopup" height="100%">
        <div class="popup1">
          <x-header :left-options="{showBack: false}">
            <a slot="left" @click="closeReasonPopup">
              <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
            </a>
            审核不通过原因
          </x-header>
          <group title="原因">
            <x-textarea :max="400" :rows="10" v-model="info.handlDesc" :show-counter="true"></x-textarea>
          </group> 
          <tabbar style="position:fixed">
            <tabbar-item ><span slot="label" class="submit-btn"></span></tabbar-item>
            <tabbar-item @click.native="saveReason" class="bg-color-orange"><span slot="label" class="submit-btn">保  存</span></tabbar-item>
          </tabbar> 
        </div>
      </popup>    
    </div>  
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
  import { Confirm, TransferDom, XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, XTextarea, CellBox, Selector, Scroller, LoadMore, Popup, Checklist, Search } from 'vux'
  export default {
    name: 'FaultList',
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
      Search
    },
    data () {
      return {
        name: '工单审核',
        code: 0,
        pageNo: 1,
        pageSize: 10,
        isPick: false,
        loadShow: false,
        onFetching: false,
        selected: '',
        faultCode: '',
        users: [],
        // users: [{'uuid': '1', 'uId': '101', 'uName': '张国立'}, {'uuid': '2', 'uId': '201', 'uName': '王杰'}],
        userIdList: [],
        typeList: [],
        statusMap: {},
        orderStatusMap: {},
        showVerifyPopup: false,
        showReasonPopup: false,
        questionStatusList: [],
        questionClassList: [],
        questionTypeList: [],
        statusList: [],
        showConfirm: false,
        objectListValue: [],
        infos: {},
        searchValue: '',
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
          serOrderExamStatusName: '',
          currHandlUser: '',
          handlTime: '',
          handlDesc: ''
        },
        info: {
          serOrderNum: '',
          custCode: '',
          serOrderExamStatus: 0,
          handlDesc: '',
          nextHandlUser: ''
        }
      }
    },
    mounted () {
      var data = new Map()
      var orderData = new Map()
      var dictAll = this.commonJs.getDictInfo()
      this.questionTypeList.push({key: '', value: '全部'})
      this.questionClassList.push({key: '', value: '全部'})
      this.questionStatusList.push({key: '', value: '全部'})
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
          // let newInfo = {key: key, value: name}
          orderData.set(key, name)
        }
      }
      this.statusMap = data
      this.orderStatusMap = orderData
    },
    watch: {
      userIdList: function (val, oldVal) {
        if (val.length > 0) {
          this.checkBox = true
        } else {
          this.checkBox = false
        }
      },
      objectListValue: function (val, oldVal) {
        console.info(val)
      }
    },
    methods: {
      async query (pageSize, pageNo) {
        this.selected = ''
        let response = await this.$http.postDeviceQuery('/serviceOrder/getServiceOrderList', this.reqInfo, pageSize, pageNo)
        this.code = response.code
        this.isInit = true
        this.infos = response.data
        for (var i = this.infos.length - 1; i >= 0; i--) {
          this.infos[i].statusName = this.statusMap.get(parseInt(this.infos[i].serOrderStatus))
        }
        if (this.infos.length === 0) {
          this.code = -1
        }
        this.pageSize = 10
      },
      choose (index) {
        this.selected = index
        this.isPick = true
        this.detail = this.infos[index]
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
      resultClick (item) {
        console.log('on-resultClick', item)
      },
      async getResult (val) {
        console.log('on-change', val)
        let reqInfo = {}
        reqInfo.uName = val
        reqInfo.uType = 0
        let response = await this.$http.postUserQuery('user/qryUserBasicInfoList', reqInfo, 5, 1)
        if (response.code === 0) {
          this.users = response.data
        }
        console.info(response.data)
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
      async verifyUser () {
        if (this.objectListValue.length === 0) {
          this.$vux.toast.show({
            text: '请选择审核状态!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        if (this.objectListValue[0] === 2 && this.info.handlDesc === '') {
          this.$vux.toast.show({
            text: '请输入不通过的原因!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        if (this.userIdList.length === 0) {
          this.$vux.toast.show({
            text: '请选择指派人员!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        if (this.userIdList.length !== 1) {
          this.$vux.toast.show({
            text: '只能指派一个人员!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        this.info.serOrderExamStatus = this.objectListValue[0]
        this.info.nextHandlUser = this.userIdList[0]
        this.info.serOrderNum = this.detail.serOrderNum
        this.info.custCode = this.detail.custCode
        if (this.objectListValue[0] === 1) {
          this.detail.handlDesc = ''
        }
        let vRes = await this.$http.postDeviceCommon('/serviceOrder/examServiceOrder', this.info)
        if (vRes.code === 0) {
          this.$vux.toast.show({
            text: '指派成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.showVerifyPopup = false
        } else {
          this.$vux.toast.show({
            text: '指派失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
        console.info(this.userIdList[0].uId)
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
.floatLeft {
  text-align: left !important;
}
</style>
