<template>
  <div>
    <x-header :left-options="{showBack: false}">{{name}}</x-header>
    <group>
      <cell title="设备管理">
        <i slot="icon" class="iconfont icon-shugang icon-grid"></i>
      </cell>
    </group>
    <grid>
      <grid-item :link="{ path: '/device/query'}">
        <i slot="icon" class="iconfont icon-chaxun1 icon-grid"></i>
        <span class="icon-span">设备查询</span>
      </grid-item>
      <grid-item :link="{ path: '/device/add'}">
        <i slot="icon" class="iconfont icon-tianjia icon-grid color-red"></i>
        <span class="icon-span">设备添加</span>
      </grid-item>
      <grid-item :link="{ path: '/standard/list'}">
        <i slot="icon" class="iconfont icon-msnui-maintain icon-grid"></i>
        <span class="icon-span">设备规格参数维护</span>
      </grid-item>
      <grid-item :link="{ path: '/fault/list'}">
        <i slot="icon" class="iconfont icon-mima icon-grid"></i>
        <span class="icon-span">固障码维护</span>
      </grid-item>
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
    <group>
      <cell title="售后服务">
        <i slot="icon" class="iconfont icon-shugang icon-grid"></i>
      </cell>
    </group>
    <grid>
      <grid-item :link="{ path: '/order/me'}">
        <i slot="icon" class="iconfont icon-order-mine icon-grid"></i>
        <span class="icon-span">我的工单</span>
      </grid-item>
      <grid-item :link="{ path: '/order/submit'}">
        <i slot="icon" class="iconfont icon-tijiao icon-grid color-red"></i>
        <span class="icon-span">提交工单</span>
      </grid-item>
      <grid-item :link="{ path: '/order/verify'}">
        <i slot="icon" class="iconfont icon-shenhe icon-grid"></i>
        <span class="icon-span">工单审核</span>
      </grid-item>
      <grid-item :link="{ path: '/order/handle'}">
        <i slot="icon" class="iconfont icon-yichuli icon-grid"></i>
        <span class="icon-span">工单处理</span>
      </grid-item>
    </grid>
    <grid>
      <grid-item :link="{ path: '/order/count'}">
        <i slot="icon" class="iconfont icon-tongji icon-grid"></i>
        <span class="icon-span">统计分析</span>
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
    </grid>
    <div style="padding-bottom: 58px;">
      <group>
        <cell title="客户管理">
          <i slot="icon" class="iconfont icon-shugang icon-grid"></i>
        </cell>
      </group>
      <grid>
        <grid-item :link="{ path: '/client/list'}">
          <i slot="icon" class="iconfont icon-kehuchaxun icon-grid"></i>
          <span class="icon-span">客户查询</span>
        </grid-item>
        <grid-item :link="{ path: '/client/manage'}">
          <i slot="icon" class="iconfont icon-xiaoshouguanli icon-grid color-red"></i>
          <span class="icon-span">销售管理</span>
        </grid-item>
        <grid-item>
        <i slot="icon" class="iconfont icon-more icon-grid"></i>
        <span class="icon-span">等待添加</span>
      </grid-item>
      <grid-item>
        <i slot="icon" class="iconfont icon-more icon-grid"></i>
        <span class="icon-span">等待添加</span>
      </grid-item>
      </grid>
    </div>
    <!-- <tabbar style="position:fixed">
      <tabbar-item  link="/">
        <i slot="icon" class="iconfont icon-shouye icon-grid"></i>
        <span slot="label">Home</span>
      </tabbar-item>
      <tabbar-item selected link="/workbench">
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
    </tabbar> -->
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
        events: []
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
