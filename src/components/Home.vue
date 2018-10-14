<template>
  <div>
    <div class="islider">
      <img src="../assets/img/logo_ameson.png" class="img-responsive" style="border:solid 1px #fff;overflow:hidden;" width="100%" height="100%">
    </div>
    <group>
       <cell title="公告" :value="notice">
       </cell>
    </group>
    <group-title></group-title>
    <grid>
      <grid-item :link="{ path: '/component/cell'}">
        <i slot="icon" class="iconfont icon-21 icon-grid"></i>
        <span class="icon-span">设备控制</span>
      </grid-item>
      <grid-item :link="{ path: '/param/list'}">
        <i slot="icon" class="iconfont icon-canshu icon-grid"></i>
        <span class="icon-span">参数设置</span>
      </grid-item>
      <grid-item :link="{ path: '/device/diagnose'}">
        <i slot="icon" class="iconfont icon-zonghezhenduan icon-grid"></i>
        <span class="icon-span">设备诊断</span>
      </grid-item>
      <grid-item :link="{ path: '/device/repair'}">
        <i slot="icon" class="iconfont icon-iconset0204 icon-grid"></i>
        <span class="icon-span">设备报修</span>
      </grid-item>
    </grid>
    <grid>
      <grid-item :link="{ path: '/fault/query'}">
        <i slot="icon" class="iconfont icon-chaxun icon-grid"></i>
        <span class="icon-span">故障码查询</span>
      </grid-item>
      <grid-item :link="{ path: '/device/location'}">
        <i slot="icon" class="iconfont icon-dingwei icon-grid color-orange"></i>
        <span class="icon-span">设备定位</span>
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}">
        <i slot="icon" class="iconfont icon-ziyuan icon-grid"></i>
        <span class="icon-span">固体升级</span>
      </grid-item>
      <grid-item :link="{ path: '/timer/setup'}">
        <i slot="icon" class="iconfont icon-ico_dingshitixing icon-grid color-orange"></i>
        <span class="icon-span">定时任务</span>
      </grid-item>
    </grid>
    <grid>
      <grid-item :link="{ path: '/device/passwdSet'}">
        <i slot="icon" class="iconfont icon-shezhi icon-grid"></i>
        <span class="icon-span">密码组设置</span>
      </grid-item>
      <grid-item :link="{ path: '/warn/list'}">
        <i slot="icon" class="iconfont icon-yujing icon-grid color-red"></i>
        <span class="icon-span">预警消息</span>
      </grid-item>
      <grid-item :link="{ path: '/device/query'}">
        <i slot="icon" class="iconfont icon-chaxun1 icon-grid"></i>
        <span class="icon-span">快速检索</span>
      </grid-item>
      <grid-item :link="{ path: '/workbench'}">
        <i slot="icon" class="iconfont icon-more icon-grid"></i>
        <span class="icon-span">更多</span>
      </grid-item>
    </grid>
    <group>
      <cell title="代办事项">
        <i slot="icon" class="iconfont icon-shugang icon-grid"></i>
      </cell>
    </group>
    <div style="padding-bottom:58px;">
      <x-table full-bordered style="background-color:#fff;">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>事项类型</th>
            <th>事项描述</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="event in events" track-by="$index">
          <tr>
            <td>{{event.type}}</td>
            <td>{{event.desp}}</td>
            <td><x-button mini plain type="primary" @click.native="process(event.id)">处理</x-button></td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <tabbar style="position:fixed">
      <tabbar-item selected link="/">
        <i slot="icon" class="iconfont icon-shouye icon-grid"></i>
        <span slot="label">Home</span>
      </tabbar-item>
      <tabbar-item link="/workbench">
        <i slot="icon" class="iconfont icon-gongzuotai icon-grid"></i>
        <span slot="label">Work</span>
      </tabbar-item>
      <tabbar-item  link="/message">
        <i slot="icon" class="iconfont icon-weibiaoti1 icon-grid"></i>
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item link="/me">
        <i slot="icon" class="iconfont icon-wo1 icon-grid"></i>
        <span slot="label">Me</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem, Grid, GridItem, GroupTitle, Group, Cell, XTable, LoadMore, XButton } from 'vux'
  // import qs from 'qs'
  export default {
    name: 'Home',
    components: {
      Grid,
      GridItem,
      GroupTitle,
      Tabbar,
      TabbarItem,
      Group,
      Cell,
      XTable,
      LoadMore,
      XButton
    },
    data () {
      return {
        notice: '恭喜艾美森上线！',
        events: [
          {'type': '设备报修', 'desp': '设备A0001报修'},
          {'type': '耗材预警', 'desp': 'B0001耗材只剩3000米'}
        ]
      }
    },
    mounted () {
      // this.queryDict()
      this.commonJs.getDictInfo()
      window.addEventListener('message', this.receiveMsg, false)
    },
    methods: {
      receiveMsg (e) {
        console.log('Got a message!')
        console.log('nMessage: ' + e.data)
        console.log(this.commonJs.getToken())
        if (this.commonJs.getToken() !== '' && e.data !== '' && e.data !== undefined) {
          let reqData = e.data
          console.log('current data is ' + (typeof reqData))
          let uInfo = null
          try {
            uInfo = JSON.parse(reqData)
          } catch (e) {
          }
          if (uInfo !== null) {
            console.log('isTrue')
            this.commonJs.setInitInfo(uInfo)
          } else {
            console.info('isFalse')
          }
        }
      },
      async queryDict () {
        let res = await this.$http.postDict('/getAllDict', {token: 'OIPI-89-8876-DAD-8686-JOIJIO-098786'})
        this.GLOBAL.dictInfo = res
      },
      queryNotice () {
      },
      queryEvents () {
      },
      process (id) {
        console.info(id)
      }
    }
  }
</script>

<style scoped>
  .islider {
    height: 135px;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .icon-grid {
    font-size: 28px;
    width: 28px;
    height: 28px;
    margin: 0 auto;
    /*padding-bottom: 5px;*/
  }
  .icon-span {
    display: block;
    text-align: center;
    color: #000000;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 10px;
  }
  .color-red {
    color: red;
  }
  .color-orange {
    color: #ff5722;
  }
</style>

