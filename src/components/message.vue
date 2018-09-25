<template>
  <div>
    <x-header :left-options="{showBack: false}" title="slot:overwrite-title">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab>
          <button-tab-item @on-item-click="itemClick(1)" selected>未读</button-tab-item>
          <button-tab-item @on-item-click="itemClick(2)">已读</button-tab-item>
        </button-tab>
      </div>
    </x-header>
    <div v-if="unread" style="padding-bottom: 58px">
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <tbody>
        <tr v-for="(info,index) in unreadInfos" track-by="$index" style="background-color: #F7F7F7">
          <td>{{info.msgTypeName}}</td>
          <td>{{info.msgDesc}}</td>
          <td>{{info.creatTime}}</td>
        </tr>
        <!-- <tr style="background-color: #F7F7F7">
          <td>[设备]</td>
          <td>A0001设备出现故障...</td>
          <td>2018-07-01</td>
        </tr>
        <tr style="background-color: #F7F7F7">
          <td>[售前]</td>
          <td>有新客户注册申请...</td>
          <td>2018-07-01</td>
        </tr>
        <tr style="background-color: #F7F7F7">
          <td>[售后]</td>
          <td>A002设备耗材使用预警...</td>
          <td>2018-07-01</td>
        </tr> -->
        </tbody>
      </x-table>
    </div>
    <div v-if="alreadyread" style="padding-bottom: 58px">
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <tbody>
        <tr v-for="(info,index) in alreadyreadInfos" track-by="$index" style="background-color: #F7F7F7">
          <td>{{info.msgTypeName}}</td>
          <td>{{info.msgDesc}}</td>
          <td>{{info.creatTime}}</td>
        </tr>
        <!-- <tr style="background-color: #F7F7F7">
          <td>[售前]</td>
          <td>有新客户注册申请...</td>
          <td>2018-06-01</td>
        </tr>
        <tr style="background-color: #F7F7F7">
          <td>[售前]</td>
          <td>有新客户注册申请...</td>
          <td>2018-05-01</td>
        </tr>
        <tr style="background-color: #F7F7F7">
          <td>[售前]</td>
          <td>有新客户注册申请...</td>
          <td>2018-05-01</td>
        </tr>
        <tr style="background-color: #F7F7F7">
          <td>[售前]</td>
          <td>有新客户注册申请...</td>
          <td>2018-04-01</td>
        </tr>
        <tr style="background-color: #F7F7F7">
          <td>[售前]</td>
          <td>有新客户注册申请...</td>
          <td>2018-04-01</td>
        </tr>
        <tr style="background-color: #F7F7F7">
          <td>[售前]</td>
          <td>有新客户注册申请...</td>
          <td>2018-04-01</td>
        </tr>
        <tr style="background-color: #F7F7F7">
          <td>[售后]</td>
          <td>A002设备耗材使用预警...</td>
          <td>2018-04-01</td>
        </tr> -->
        </tbody>
      </x-table>
    </div>
   <!--  <tabbar style="position:fixed">
      <tabbar-item link="/">
        <i slot="icon" class="iconfont icon-shouye icon-grid"></i>
        <span slot="label">Home</span>
      </tabbar-item>
      <tabbar-item link="/workbench">
        <i slot="icon" class="iconfont icon-gongzuotai icon-grid"></i>
        <span slot="label">Work</span>
      </tabbar-item>
      <tabbar-item selected link="/message">
        <i slot="icon" class="iconfont icon-weibiaoti1 icon-grid"></i>
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item link="/me">
        <i slot="icon" class="iconfont icon-wo1 icon-grid"></i>
        <span slot="label">Me</span>
      </tabbar-item>
    </tabbar> -->
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, XTable, LoadMore } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      XHeader,
      Actionsheet,
      XTable,
      LoadMore,
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        unread: true,
        alreadyread: false,
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false,
        statusMap: [],
        setReq: {
          uuid: ''
        },
        unreadReq: {
          msgFlag: 2, // 未读状态
          rlId: 'J004',
          uId: 'U00022'
        },
        unreadInfos: [],
        alreadyreadReq: {
          msgFlag: 1, // 已读状态
          rlId: ''
        },
        alreadyreadInfos: []
      }
    },
    mounted () {
      var dictAll = this.commonJs.getDictInfo()
      var dataMap = new Map()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 消息类型
        if (dict.dictParentId === 129) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          dataMap.set(key, name)
        }
      }
      this.statusMap = dataMap
      // let uId = 'U00022'
      // let uId = this.commonJs.getUserId()
      // this.unreadReq.rlId = uId
      // this.alreadyreadReq.rlId = uId
      // this.setReq.uuid = uId
      this.queryUnRead()
      this.queryAlready()
    },
    methods: {
      async queryUnRead () {
        let req = await this.$http.postDeviceQuery('/msgSysMessage/getMsgSysMessageList', this.unreadReq, 1, 100)
        if (req.code === 0) {
          this.unreadInfos = req.data
          for (var i = this.unreadInfos.length - 1; i >= 0; i--) {
            this.unreadInfos[i].msgTypeName = this.statusMap.get(parseInt(this.unreadInfos[i].msgType))
          }
        }
      },
      async queryAlready () {
        let req = await this.$http.postDeviceQuery('/msgSysMessage/getMsgSysMessageList', this.alreadyreadReq, 1, 100)
        if (req.code === 0) {
          this.alreadyreadInfos = req.data
          for (var i = this.alreadyreadInfos.length - 1; i >= 0; i--) {
            this.alreadyreadInfos[i].msgTypeName = this.statusMap.get(parseInt(this.alreadyreadInfos[i].msgType))
          }
        }
      },
      async setRead () {
        let req = await this.$http.postDeviceCommon('/msgSysMessage/upMsgSysMessage', this.setReq)
        if (req.code === 0) {
          console.info('set message to read success')
        } else {
          console.info('set message to read error')
        }
      },
      itemClick (type) {
        if (type === 1) {
          this.unread = true
          this.alreadyread = false
          this.queryUnRead()
        } else {
          this.unread = false
          this.alreadyread = true
          this.setRead()
          this.queryAlready()
        }
      }
    }
  }
</script>

<style>
  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
