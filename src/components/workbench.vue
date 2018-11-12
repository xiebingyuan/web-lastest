<template>
  <div>
    <x-header :left-options="{showBack: false}">{{name}}</x-header>
    <div v-for="(menu,index) in menuList">
      <group  v-if="menu.mId === '14'">
        <cell title="设备管理">
          <i slot="icon" class="iconfont icon-shugang icon-grid"></i>
        </cell>
      </group>
    </div>  
    
    <grid>
      <div v-for="(menu,index) in menuList">
        <grid-item :link="{ path: '/device/query'}" v-if="menu.mId === '14'">
          <i slot="icon" class="iconfont icon-chaxun1 icon-grid"></i>
          <span class="icon-span">设备查询</span>
        </grid-item>
        <grid-item :link="{ path: '/device/add'}" v-if="menu.mId === '85'">
          <i slot="icon" class="iconfont icon-tianjia icon-grid color-red"></i>
          <span class="icon-span">设备添加</span>
        </grid-item>
        <grid-item :link="{ path: '/standard/list'}"  v-if="menu.mId === '17'">
          <i slot="icon" class="iconfont icon-msnui-maintain icon-grid"></i>
          <span class="icon-span">设备规格参数维护</span>
        </grid-item>
        <grid-item :link="{ path: '/fault/list'}"  v-if="menu.mId === '37'">
          <i slot="icon" class="iconfont icon-mima icon-grid"></i>
          <span class="icon-span">固障码维护</span>
        </grid-item>
      </div>
      <div v-for="(n,index) in deviceNum">
        <grid-item >
          <i slot="icon" class="iconfont icon-more icon-grid"></i>
          <span class="icon-span">等待添加</span>
        </grid-item>
      </div>
    </grid>
    <!-- <group>
      <cell title="系统管理">
        <i slot="icon" class="iconfont icon-shugang icon-grid"></i>
      </cell>
    </group>
    <grid>
      <grid-item :link="{ path: '/device/query'}">
        <i slot="icon" class="iconfont icon-yonghuguanli icon-grid"></i>
        <span class="icon-span">用户管理</span>
      </grid-item>
      <grid-item :link="{ path: '/warn/list'}">
        <i slot="icon" class="iconfont icon-tianjia icon-grid color-red"></i>
        <span class="icon-span">角色管理</span>
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}">
        <i slot="icon" class="iconfont icon-quanxianguanli icon-grid"></i>
        <span class="icon-span">权限管理</span>
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}">
        <i slot="icon" class="iconfont icon-weibiaoti15 icon-grid"></i>
        <span class="icon-span">菜单管理</span>
      </grid-item>
    </grid>
    <grid :show-lr-borders="false">
      <grid-item :link="{ path: '/device/query'}">
        <i slot="icon" class="iconfont icon-dictionary icon-grid"></i>
        <span class="icon-span">字典维护</span>
      </grid-item>
      <grid-item>
        <i slot="icon" class="iconfont icon-more icon-grid"></i>
        <span class="icon-span">等待添加</span>
      </grid-item>
      <grid-item>
        <i slot="icon" class="iconfont icon-more icon-grid"></i>
        <span class="icon-span">等待添加</span>
      </grid-item>
      <grid-item>
        <i slot="icon" class="iconfont icon-more icon-grid"></i>
        <span class="icon-span">等待添加</span>
      </grid-item>
    </grid> -->
    <div v-for="(menu,index) in menuList">
      <group v-if="menu.mId === '22'">
        <cell title="售后服务">
          <i slot="icon" class="iconfont icon-shugang icon-grid"></i>
        </cell>
      </group>
    </div>
    <grid>
      <div v-for="(menu,index) in menuList">
        <grid-item :link="{ path: '/order/me'}" v-if="menu.mId === '23'">
          <i slot="icon" class="iconfont icon-order-mine icon-grid"></i>
          <span class="icon-span">我的工单</span>
        </grid-item>
        <grid-item :link="{ path: '/order/submit'}" v-if="menu.mId === '24'">
          <i slot="icon" class="iconfont icon-tijiao icon-grid color-red"></i>
          <span class="icon-span">提交工单</span>
        </grid-item>
        <grid-item :link="{ path: '/order/verify'}" v-if="menu.mId === '25'">
          <i slot="icon" class="iconfont icon-shenhe icon-grid"></i>
          <span class="icon-span">工单审核</span>
        </grid-item>
        <grid-item :link="{ path: '/order/handle'}" v-if="menu.mId === '26'">
          <i slot="icon" class="iconfont icon-yichuli icon-grid"></i>
          <span class="icon-span">工单处理</span>
        </grid-item>
      </div>
      <div v-for="(n,index) in saleNum1">
        <grid-item>
          <i slot="icon" class="iconfont icon-more icon-grid"></i>
          <span class="icon-span">等待添加</span>
        </grid-item>
      </div>  
    </grid>
    <grid>
      <div v-for="(menu,index) in menuList">
        <grid-item :link="{ path: '/order/count'}" v-if="menu.mId === '27'">
          <i slot="icon" class="iconfont icon-tongji icon-grid"></i>
          <span class="icon-span">统计分析</span>
        </grid-item>
      </div>
      <div v-for="(n,index) in saleNum2">
        <grid-item>
          <i slot="icon" class="iconfont icon-more icon-grid"></i>
          <span class="icon-span">等待添加</span>
        </grid-item>
      </div>
    </grid>
    <div style="padding-bottom: 58px;">
      <div v-for="(menu,index) in menuList">
        <group v-if="menu.mId === '28'">
          <cell title="客户管理">
            <i slot="icon" class="iconfont icon-shugang icon-grid"></i>
          </cell>
        </group>
      </div> 
      <grid>
        <div v-for="(menu,index) in menuList">
          <grid-item :link="{ path: '/client/list'}" v-if="menu.mId === '38'">
            <i slot="icon" class="iconfont icon-kehuchaxun icon-grid"></i>
            <span class="icon-span">客户查询</span>
          </grid-item>
          <grid-item :link="{ path: '/client/manage'}" v-if="menu.mId === '29'">
            <i slot="icon" class="iconfont icon-xiaoshouguanli icon-grid color-red"></i>
            <span class="icon-span">销售管理</span>
          </grid-item>
        </div>  
        <div>
          <div v-for="(n,index) in manageNum">
            <grid-item>
              <i slot="icon" class="iconfont icon-more icon-grid"></i>
              <span class="icon-span">等待添加</span>
            </grid-item>
          </div>  
        </div>  
      </grid>
    </div>
  </div>
</template>

<script>
  import { XHeader, Group, Cell, Grid, GridItem, Tabbar, TabbarItem } from 'vux'
  export default {
    name: 'Home',
    components: {
      XHeader,
      Group,
      Cell,
      Grid,
      GridItem,
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        name: '工作台',
        menuList: [],
        deviceNum: 0,
        manageNum: 0,
        saleNum1: 0,
        saleNum2: 0
      }
    },
    mounted () {
      this.menuList = this.commonJs.getMenuList()
      if (this.menuList !== null && this.menuList.length > 0) {
        let totalDevice = 4
        let totalManage = 4
        let totalSale = 0
        for (var i = this.menuList.length - 1; i >= 0; i--) {
          let menu = this.menuList[i]
          if (menu.mId === '15' || menu.mId === '17' || menu.mId === '37' || menu.mId === '85') {
            totalDevice -= 1
          }
          if (menu.mId === '29' || menu.mId === '38') {
            totalManage -= 1
          }
          if (menu.mId === '23' || menu.mId === '24' || menu.mId === '25' || menu.mId === '26' || menu.mId === '27') {
            totalSale += 1
          }
        }
        if (totalDevice !== 4) {
          this.deviceNum = totalDevice
        }
        if (totalManage !== 4) {
          this.manageNum = totalManage
        }
        if (totalSale === 0) {
        } else if (totalSale < 4) {
          this.saleNum1 = 4 - totalSale
        } else if (totalSale > 4) {
          this.saleNum2 = 8 - totalSale
        }
      }
    }
  }
</script>

<style>
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
</style>
