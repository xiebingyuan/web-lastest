<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query">查询</a>
      <a slot="right" @click="resetData" style="margin-left: 20px">重置</a>
    </x-header>
    <group>
      <x-input title="故障码" v-model="info.faultCode"  placeholder="请输入故障码..."></x-input>
      <x-input title='故障简述' disabled v-model="info.faultRemark"></x-input>
      <x-textarea title="故障描述" disabled v-model="info.faultDesc"></x-textarea>
    </group>
    <div style="padding-bottom:58px;">
      <div v-for="(p,key,index) in plans">
        <group >
          <cell title="处理方案">
            <span slot="left">{{index}}</span>
          </cell>
          <x-textarea :max="200" disabled v-model="p.plan" :show-counter="false"></x-textarea>
        </group>
      </div>
    </div>
    <tabbar v-if="code===0" style="position:fixed">
      <tabbar-item><span slot="label"></span></tabbar-item>
      <tabbar-item @click.native="sumbit"><span slot="label" class="submit-btn">故障码维护</span></tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, XTextarea } from 'vux'
  export default {
    name: 'Diagnose',
    components: {
      XHeader,
      Group,
      XButton,
      XInput,
      XTable,
      Cell,
      Tabbar,
      TabbarItem,
      XTextarea
    },
    data () {
      return {
        name: '故障码查询',
        code: -1,
        isQuerySuccess: -1,
        info: {
          uuid: '',
          faultType: '',
          faultCode: '',
          faultRemark: '',
          faultDesc: ''
        },
        plans: {}
      }
    },
    methods: {
      async query () {
        if (this.info.faultCode === '') {
          this.$vux.toast.show({
            text: '请输入故障码!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        let res = await this.$http.postDeviceQuery('/devFaultCodeConfig/getDevFaultCodeConfigList', {faultCode: this.info.faultCode}, 1, 1)
        this.code = res.code
        if (res.code === 0) {
          if (res.data !== '') {
            this.info = res.data[0]
            // 查询故障处理方案
            let respone = await this.$http.postDeviceQuery('/devFaultDealwithSecheme/getDevFaultDealwithSechemeList', {faultCode: this.info.faultCode}, 10, 1)
            if (respone.code === 0 && respone.data !== '') {
              this.plans = respone.data
            }
          }
        } else {
          this.$vux.toast.show({
            text: '查询失败!请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      resetData () {
        this.faultCode = ''
        this.faultRemark = ''
        this.faultDesc = ''
        this.plans = ''
        this.isQuerySuccess = false
      },
      sumbit () {
        this.$router.push({path: '/fault/list', query: { faultId: this.faultCode }})
      }
    }
  }
</script>

<style>

</style>
