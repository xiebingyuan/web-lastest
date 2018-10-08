<template>
  <div>
    <x-header :left-options="{showBack: false}">{{name}}</x-header>
    <div style="padding-bottom: 58px">
      <panel  :list="list" :type="type"></panel>
      <group>
        <cell title="我的消息" is-link :link="{ path: '/message'}">
          <i slot="icon" class="iconfont icon-weibiaoti1 icon-title"></i>
        </cell>
        <cell title="我的待办" is-link :link="{ path: '/me/waitEvents'}">
          <i slot="icon" class="iconfont icon-tijiao icon-title"></i>
        </cell>
        <cell title="手机变更" is-link :link="{ path: '/me/phoneChange'}">
          <i slot="icon" class="iconfont icon-shouji icon-title"></i>
        </cell>
      </group>
      <group>
        <cell title="设置" is-link :link="{ path: '/me/setup'}">
          <i slot="icon" class="iconfont icon-shebeisheshi icon-title"></i>
        </cell>
      </group>
      <group>
        <cell title="建议反馈" is-link :link="{ path: '/me/advice'}">
          <i slot="icon" class="iconfont icon-tiexinshouhou icon-title"></i>
        </cell>
      </group>
      <group>
        <cell title="软件版本" is-link :link="{ path: '/me/version'}">
          <i slot="icon" class="iconfont icon-banben icon-title"></i>
        </cell>
      </group>
      <group>
        <cell title="固件升级档上传" is-link :link="{ path: '/me/upgradeUpload'}">
          <i slot="icon" class="iconfont icon-gengxinxitongbanben icon-title"></i>
        </cell>
      </group>
    </div>
    <!-- <tabbar style="position:fixed">
      <tabbar-item  link="/">
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
      <tabbar-item selected link="/me">
        <i slot="icon" class="iconfont icon-wo1 icon-grid"></i>
        <span slot="label">Me</span>
      </tabbar-item>
    </tabbar> -->
  </div>
</template>

<script>
  import { Cell, Tabbar, TabbarItem, XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, XTable, Panel, Group } from 'vux'
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
      Tabbar,
      TabbarItem,
      Panel,
      Group,
      Cell
    },
    data () {
      return {
        name: '我的',
        type: '1',
        list: [{
          src: 'http://photo.16pic.com/00/52/65/16pic_5265951_b.jpg',
          fallbackSrc: 'http://photo.16pic.com/00/52/65/16pic_5265951_b.jpg',
          title: '陈国坤',
          desc: '系统管理员',
          url: '/me'
        }]
      }
    },
    methods: {
    }
  }
</script>

<style>
  .icon-title {
    width: 20px;
    font-size: 20px;
    margin-right: 10px;
  }
</style>
