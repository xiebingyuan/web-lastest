<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query(pageSize, pageNo)">查询</a>
    </x-header>
    <group>
      <x-input title="客户名称" v-model="reqInfo.custName" placeholder="请输入客户名称..."></x-input>
    </group>
    <group></group>
    <div>
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
        <div>  
          <x-table full-bordered style="background-color:#fff;" >
            <thead>
            <tr style="background-color: #F7F7F7">
              <th>客户编号</th>
              <th>客户名称</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody v-for="info in infos" >
              <tr>
                <td class="tableTd">{{info.custCode}}</td>
                <td class="tableTd">{{info.custName}}</td>
                <td>
                  <x-button mini plain type="primary" @click.native="process(info)">查看设备</x-button>
                </td>
              </tr>
            </tbody>
          </x-table>
        </div>
        <load-more v-show="loadShow" tip="loading"></load-more>
      </scroller>
      <div v-transfer-dom>
        <popup v-model="showListPopup" height="100%">
          <div class="popup1">
             <x-header :left-options="{showBack: false}">
              <a slot="left" @click="closeListPopup">
                <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
              </a>
              {{selectInfo.custName}}设备列表
            </x-header>
            <group></group>
            <x-table full-bordered style="background-color:#fff;" >
              <thead>
              <tr style="background-color: #F7F7F7">
                <th>编号</th>
                <th>设备系列</th>
                <th>设备类型</th>
              </tr>
              </thead>
              <tbody v-for="(device,index) in devices" :class="{ 'select-status': index === selected }" track-by="$index" @click="choose(index)">
              <tr>
                <td class="tableTd">{{device.custCode}}</td>
                <td class="tableTd">{{device.custCode}}</td>
                <td class="tableTd">{{device.custName}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
          <div>
            <div v-if="selected !== ''">
              <tabbar style="position:fixed">
                  <tabbar-item @click.native="toAdd"><span slot="label" class="showClass">添加</span></tabbar-item>
                  <tabbar-item @click.native="toUpdate"><span slot="label" class="showClass">修改</span></tabbar-item>
                  <tabbar-item @click.native="toDel"><span slot="label" class="showClass">删除</span></tabbar-item>
              </tabbar>
            </div>
            <div v-else>
              <tabbar style="position:fixed">
                <tabbar-item @click.native="toAdd"><span slot="label" class="showClass">添加</span></tabbar-item>
                <tabbar-item><span slot="label">修改</span></tabbar-item>
                <tabbar-item><span slot="label">删除</span></tabbar-item>
              </tabbar>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <popup v-model="showAddPopup" height="100%">
          <div class="popup1">
            <x-header :left-options="{showBack: false}">
              <a slot="left" @click="closeAddPopup">
                <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
              </a>
              {{actionType}}设备
            </x-header>
            <group></group>
            <group>
              <flexbox>
                <flexbox-item><div>
                  <cell title="设备编号" :value="deviceInfo.devCode"></cell>
                </div></flexbox-item>
                <flexbox-item><div class="flex-demo">
                  <a class="class-A" @click="selectDevice()">选择设备</a>
                </div></flexbox-item>
              </flexbox>
              <flexbox>
                <flexbox-item><div>
                  <cell title="所属辖区" :value="deviceInfo.areaName"></cell>
                </div></flexbox-item>
                <flexbox-item><div class="flex-demo">
                  <a class="class-A" @click="selectArea()">选择辖区</a>
                </div></flexbox-item>
              </flexbox>
            </group>  
            <group></group>
            <x-button type="primary" @click.native="dataSumbit">提交</x-button>
          </div>
        </popup>      
      </div>
      <div v-transfer-dom>
        <popup v-model="showDevicePopup" height="100%">
          <div class="popup1">
            <x-header :left-options="{showBack: false}">
              <a slot="left" @click="closeDevicePopup">
                <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
              </a>
              设备选择
              <a slot="right" @click="queryDevice(20, 1)">查询</a>
              <a slot="right" @click="resetDeviceData" style="margin-left: 20px">重置</a>
            </x-header>
            <group>
              <x-input title="设备编号" v-model="selectReq.devCode"  placeholder="请输入设备编号..."></x-input>
              <selector ref="defaultValueRef" title="设备系列" readonly :options="seriesList" v-model="selectReq.devSeries"></selector>
              <selector ref="defaultValueRef" title="设备类型" readonly :options="typeList" v-model="selectReq.devType"></selector>
            </group>
            <group></group>
            <div style="padding-bottom:58px;">
              <scroller lock-x height="500px" @on-scroll-bottom="onSelectScrollBottom" ref="selectScrollerllerBottom" :scroll-bottom-offst="200">
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
                    <tbody v-for="(device,index) in deviceList" track-by="$index" >
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
            <tabbar style="position:fixed">
              <tabbar-item><span slot="label"></span></tabbar-item>
              <tabbar-item @click.native="select" class="bg-color-orange"><span slot="label" class="submit-btn">选 择</span></tabbar-item>
            </tabbar>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <confirm v-model="showConfirm"
                 title="选择确认"
                 @on-cancel="onCancel"
                 @on-confirm="onConfirm">
          <p style="text-align:center;">您确认要选择编号为{{selectDev}}?</p>
        </confirm>
      </div>
      <div v-transfer-dom>
        <confirm v-model="showAreaConfirm"
                 title="选择确认"
                 @on-cancel="onAreaCancel"
                 @on-confirm="onAreaConfirm">
          <p style="text-align:center;">您确认要选择该辖区?</p>
        </confirm>
      </div>
      <div v-transfer-dom>
        <confirm v-model="showDeleteDeviceConfirm"
                 title="选择确认"
                 @on-cancel="onDeviceCancel"
                 @on-confirm="onDeviceConfirm">
          <p style="text-align:center;">您确认要删除该条记录?</p>
        </confirm>
      </div>
      <div v-transfer-dom>
        <popup v-model="showAreaPopup" height="100%">
          <div class="popup1">
            <x-header :left-options="{showBack: false}">
              <a slot="left" @click="closeAreaPopup">
                <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
              </a>
              设备所属辖区选择
            </x-header>
            <group>
            </group>
            <div>  
              <x-table full-bordered style="background-color:#fff;" >
                <thead>
                <tr style="background-color: #F7F7F7">
                  <th></th>
                  <th>辖区编号</th>
                  <th>辖区名称</th>
                </tr>
                </thead>
                <tbody v-for="(info,index) in areaList" track-by="$index" >
                <tr>
                  <td>
                    <input class="magic-checkbox" v-model="areaIdList" type="checkbox" name="layout" :id="index" :value="info">
                        <label :for="index"></label>
                  </td>
                  <td class="tableTd">{{info.key}}</td>
                  <td class="tableTd">{{info.value}}</td>
                </tr>
                </tbody>
              </x-table>
            </div>
            <tabbar style="position:fixed">
              <tabbar-item><span slot="label"></span></tabbar-item>
              <tabbar-item @click.native="selectAreaCode" class="bg-color-orange"><span slot="label" class="submit-btn">选 择</span></tabbar-item>
            </tabbar>
          </div>
        </popup>
      </div>        
      <group v-if="code!=0" >
        <cell-box class="no-find-content">
          无符合条件数据！
        </cell-box>
      </group>
    </div>
  </div>
</template>

<script>
  import { Selector, TransferDom, XSwitch, XHeader, XButton, Group, Cell, XInput, XTable, CellBox, Popup, Tab, TabItem, Actionsheet, Scroller, LoadMore, Tabbar, TabbarItem, Flexbox, FlexboxItem, Confirm } from 'vux'
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
      LoadMore,
      Tabbar,
      TabbarItem,
      Flexbox,
      FlexboxItem,
      Confirm
    },
    data () {
      return {
        name: '销售管理',
        reqInfo: {
          custName: ''
        },
        devices: [], // 客户设备列表
        deviceDetail: {},
        devList: [], // 选中设备
        deviceList: [], // 选择设备列表
        seriesList: [], // 系列选择框
        seriesMap: [], // 系列数据
        typeList: [], // 类型选择框
        typeMap: [], // 类型数据
        areaList: [], // 辖区列表
        areaIdList: [], // 选择辖区列表
        deviceInfo: {
          devCode: '',
          custCode: '',
          areaCode: '',
          areaName: ''
        },
        selectReq: {
          devCode: '',
          devType: '',
          devSeries: ''
        },
        infos: [{custCode: 'C001', custName: 'aliba'}], // 客户销售列表
        selectInfo: {},
        code: 0,
        pageNo: 1,
        pageSize: 5,
        selected: '',
        actionType: '',
        loadShow: false,
        onFetching: false,
        showListPopup: false,
        showAddPopup: false,
        showDevicePopup: false,
        showConfirm: false,
        selectDev: '',
        showAreaPopup: false,
        showAreaConfirm: false,
        showDeleteDeviceConfirm: false
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
          let newInfo = {key: key, value: name}
          this.seriesList.push(newInfo)
          seriesdata.set(key, name)
        }
        // 设备类型
        if (dict.dictParentId === 1) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          this.typeList.push(newInfo)
          typeData.set(key, name)
        }
        // 业务区域
        if (dict.dictParentId === 47) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          this.areaList.push(newInfo)
        }
      }
      this.typeMap = typeData
      this.seriesMap = seriesdata
    },
    methods: {
      async query (pageSize, pageNo) {
        let res = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', this.reqInfo, pageSize, pageNo)
        // this.infos = res.data
        if (this.code === 0 && res.data.length === 0) {
          this.code = -1
        }
        this.pageSize = 5
      },
      closeListPopup () {
        this.showListPopup = false
        this.selected = ''
      },
      async process (info) {
        this.selectInfo = info
        this.showListPopup = true
        let r = {}
        r.custCode = info.custCode
        let res = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', r, 100, 1)
        if (res.code === 0) {
          this.devices = res.data
        }
      },
      choose (index) {
        console.info(index)
        this.selected = index
        this.deviceDetail = this.devices[index]
      },
      toAdd () {
        this.showAddPopup = true
        this.actionType = '新增'
      },
      toUpdate () {
        this.showAddPopup = true
        this.actionType = '编辑'
        console.info(this.deviceDetail)
        this.deviceInfo = this.deviceDetail
      },
      toDel () {
        this.showDeleteDeviceConfirm = true
        this.deviceInfo = this.deviceDetail
      },
      closeAddPopup () {
        this.showAddPopup = false
      },
      selectDevice () {
        this.showDevicePopup = true
        this.queryDevice()
      },
      closeDevicePopup () {
        this.showDevicePopup = false
      },
      async dataSumbit () {
        let res = null
        if (this.actionType === '新增') {
          this.deviceInfo.custCode = this.selectInfo.custCode
          res = await this.$http.postDeviceCommon('/devCustRelation/addDevCustRelation', this.deviceInfo)
        } else {
          console.info(this.deviceInfo)
        }
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '保存失败，请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          this.showDevicePopup = false
        } else {
          this.$vux.toast.show({
            text: '保存失败，请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      async queryDevice (pageSize, pageNo) {
        let reqInfo = {}
        reqInfo.custCode = this.selectInfo.custCode
        let res = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', reqInfo, pageSize, pageNo)
        if (res.code === 0) {
          this.deviceList = res.data
        }
      },
      resetDeviceData () {
        this.selectReq = {}
      },
      select () {
        if (this.devList.length === 0) {
          this.$vux.toast.show({
            text: '请至少选择一条记录!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        if (this.devList.length > 1) {
          this.$vux.toast.show({
            text: '只能选择一条记录!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        this.selectDev = this.devList[0].devCode
        this.showConfirm = true
      },
      selectAreaCode () {
        if (this.areaIdList.length === 0) {
          this.$vux.toast.show({
            text: '请至少选择一条记录!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        if (this.areaIdList.length > 1) {
          this.$vux.toast.show({
            text: '只能选择一条记录!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        this.showAreaConfirm = true
        this.selectAreaInfo = this.areaIdList[0]
      },
      onCancel () {
        console.info('cancle operation..')
      },
      onConfirm () {
        this.deviceInfo.devCode = this.devList[0].devCode
        this.showDevicePopup = false
      },
      onDeviceCancel () {
        console.info('cancle operation..')
      },
      async onDeviceConfirm () {
        console.info(this.deviceDetail)
        this.showDeleteDeviceConfirm = false
        let res = await this.$http.postDeviceCommon('/devCustRelation/deleteCustDev', this.deviceInfo)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '删除成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.process(this.selectInfo)
        } else {
          this.$vux.toast.show({
            text: '删除失败，请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      onAreaCancel () {
        console.info('cancle operation..')
      },
      onAreaConfirm () {
        this.deviceInfo.areaCode = this.selectAreaInfo.key
        this.deviceInfo.areaName = this.selectAreaInfo.value
        this.showAreaPopup = false
      },
      selectArea () {
        this.showAreaPopup = true
      },
      closeAreaPopup () {
        this.showAreaPopup = false
      },
      onSelectScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.loadShow = true
          this.onFetching = true
          setTimeout(() => {
            this.pageSize = this.pageSize + 5
            this.queryDevice(this.pageSize, this.pageNo)
            this.onFetching = false
            this.loadShow = false
          }, 1000)
        }
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.loadShow = true
          this.onFetching = true
          setTimeout(() => {
            this.pageSize = this.pageSize + 5
            this.query(this.pageSize, this.pageNo)
            this.onFetching = false
            this.loadShow = false
          }, 1000)
        }
      },
      selectScrollerllerBottom () {
        console.info('scrollerllerBottom')
      },
      scrollerllerBottom () {
        console.info('scrollerllerBottom')
      }
    }
  }
</script>

<style>
.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>
