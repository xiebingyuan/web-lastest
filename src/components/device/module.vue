<template>
  <div>
    <x-header>{{name}}</x-header>
    <group>
      <x-input title="IMIS号" placeholder="请输入IMIS号" v-model="info.commImisCode"></x-input>
      <x-input title="厂商" disabled v-model="info.commFactory"></x-input>
      <selector ref="defaultValueRef" title="状态" :options="statusList" v-model="info.commStatus"></selector>
    </group>
    <tabbar style="position:fixed">
      <tabbar-item><span slot="label"></span></tabbar-item>
      <tabbar-item @click.native="sumbit" class="bg-color-orange"><span slot="label" class="submit-btn">提交</span></tabbar-item>
    </tabbar>
  </div>	
</template>

<script>
  import { XHeader, Group, XInput, Selector, Tabbar, TabbarItem } from 'vux'
  export default {
    components: {
      XHeader,
      Group,
      XInput,
      Selector,
      Tabbar,
      TabbarItem
    },
    mounted () {
      this.info.devCode = this.$route.query.devCode
      this.name = this.info.devCode + '通信模块注册'
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 通信模块注册状态
        if (dict.dictParentId === 64) {
          let newInfo = {key: dict.dictTypeValue, value: dict.dictTypeCname}
          this.statusList.push(newInfo)
        }
      }
    },
    data () {
      return {
        name: '',
        statusList: [],
        info: {
          devCode: '',
          commImisCode: '',
          commFactory: '中国电信',
          commStatus: 1
        }
      }
    },
    methods: {
      async sumbit () {
        if (this.info.commImisCode === '') {
          this.$vux.toast.show({
            text: '请输入IMIS号!',
            position: 'middle',
            type: 'warn',
            time: 1000
          })
          return
        }
        let res = await this.$http.postDeviceCommon('/devCommModuleInfo/addDevCommModuleInfo', this.info)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '保存成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.$router.push({path: '/device/query', query: {}})
        } else {
          this.$vux.toast.show({
            text: '保存失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      }
    }
  }
</script>

<style>
	
</style>