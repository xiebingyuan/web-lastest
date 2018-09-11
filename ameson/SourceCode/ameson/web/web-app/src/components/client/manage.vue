<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query(pageSize, pageNo)">查询</a>
      <a slot="right" @click="syncData" style="margin-left: 20px">同步</a>
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
            <tbody v-for="info in infos" track-by="$index" v-if="code==0">
            <tr>
              <td class="tableTd">{{info.custCode}}</td>
              <td class="tableTd">{{info.custName}}</td>
              <td>
                <x-button mini plain type="primary" @click.native="process(info.custCode)">查看设备</x-button>
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
  </div>
</template>

<script>
  import { Selector, TransferDom, XSwitch, XHeader, XButton, Group, Cell, XInput, XTable, CellBox, Popup, Tab, TabItem, Actionsheet, Scroller, LoadMore } from 'vux'
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
      LoadMore
    },
    data () {
      return {
        name: '客户查询',
        reqInfo: {
          custName: ''
        },
        infos: {},
        code: 0,
        pageNo: 1,
        pageSize: 5,
        loadShow: false,
        onFetching: false
      }
    },
    mounted () {
    },
    methods: {
      async query (pageSize, pageNo) {
        let res = await this.$http.postDeviceQuery('/devBaseInfo/getDevBaseInfoList', this.reqInfo, pageSize, pageNo)
        this.infos = res.data
        if (this.code === 0 && res.data.length === 0) {
          this.code = -1
        }
        this.pageSize = 5
      },
      async syncData () {
        console.info('sync data............')
      },
      process (custCode) {
        this.$router.push({path: '/device/detail', query: { custCode: custCode }})
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
      scrollerllerBottom () {
        console.info('scrollerllerBottom')
      }
    }
  }
</script>

<style>

</style>
