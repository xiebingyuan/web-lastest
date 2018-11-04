<template>
  <div>
    <x-header>{{name}}</x-header>
    <group></group>
    <group>
      <x-input title="设备编号" disabled  v-model="formData.devCode"></x-input>
      <x-input title="故障码" v-model="formData.faultCode"  placeholder="请输入故障码..."></x-input>
        <x-textarea :max="200" title="问题描述" placeholder="请输入问题描述..." v-model="formData.serOrderDesc" :show-counter="false"></x-textarea>
      <group>
        <x-textarea :max="200" title="问题备注" placeholder="请输入问题备注..." v-model="formData.serOrderRemark" :show-counter="false"></x-textarea>
      </group>
      <cell title="上传图片"><input type="file" ref="file" @change="uploadFile"/></cell>
    </group>
    <tabbar style="position:fixed">
      <tabbar-item><span slot="label"></span></tabbar-item>
      <tabbar-item @click.native="sumbit" class="bg-color-orange"><span slot="label" class="submit-btn">提交报修单</span></tabbar-item>
    </tabbar>
  </div>  
</template>

<script>
  import { CheckIcon, XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, Scroller, LoadMore, CellBox, XTextarea } from 'vux'
  export default {
    name: 'Query',
    components: {
      XHeader,
      Group,
      XButton,
      XInput,
      XTable,
      Cell,
      Tabbar,
      TabbarItem,
      CheckIcon,
      Scroller,
      LoadMore,
      CellBox,
      XTextarea
    },
    data () {
      return {
        name: '设备报修',
        devCode: '',
        custCode: '',
        code: 0,
        pageNo: 1,
        pageSize: 10,
        typeMap: {},
        seriesMap: {},
        formData: {
          devCode: '',
          custCode: '10000',
          serOrderClassify: 1,  // 工单分类-设备固障
          serOrderType: 1, // 问题类型-售后
          faultCode: '',
          serOrderDesc: '',
          serOrderRemark: '',
          serOrderPath: ''
        }
      }
    },
    mounted () {
      let id = this.$route.query.devCode
      this.formData.devCode = id
    },
    methods: {
      async sumbit () {
        if (this.formData.faultCode === '') {
          this.$vux.toast.show({
            text: '请输入故障码!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
          return
        }
        let res = await this.$http.postDeviceCommon('/serviceOrder/addServiceOrder', this.formData)
        if (res.code === 0) {
          this.$vux.toast.show({
            text: '提交成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
        } else {
          this.$vux.toast.show({
            text: '提交失败,请重新提交!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      async uploadFile (e) {
        let file = e.target.files[0]
        let param = new FormData()
        param.append('file', file, file.name)
        let resp = await this.$http.postFile('/upload', param)
        console.log(resp)
        this.formData.serOrderPath = resp
      }
    }
  }
</script>

