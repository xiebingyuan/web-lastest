<template>
	<div>
    <x-header>{{name}}
      <a slot="right" @click="add">添加</a>
    </x-header>
    <div >
    	<group v-for="(p,index) in plans" :key="index">
	    	<card :header="{title: '方案' + (index+1) }" :footer="{title: '删除',link:'/'}" >
		      <x-textarea :max="200" slot="content" v-model="p.sechemeDesc" :show-counter="false"></x-textarea>
		    </card>
        <!-- <x-button mini>删除</x-button> -->
	    </group>
    </div>
    <div v-transfer-dom>
      <popup v-model="showAdd" position="bottom" max-height="50%">
      	<x-header :left-options="{showBack: false}">
          <a slot="left" @click="closePopup">
            <i slot="icon" class="iconfont icon-guanbi icon-grid"></i>
          </a>
          新增方案
        </x-header>
        <div style="padding: 15px;">
	      	<group title="方案描述">
	      		<x-textarea :max="400" v-model="plan.sechemeDesc" :show-counter="false"></x-textarea>
	      	</group>
        </div>
        <div style="padding: 15px;">
          <x-button @click.native="submit" plain type="primary"> 提交 </x-button>
        </div>
      </popup>
    </div>
	</div>	
</template>

<script type="text/javascript">
  import { XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, XTextarea, Selector, Card, TransferDom, Popup } from 'vux'
  export default {
    name: 'FaultList',
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Group,
      XButton,
      XInput,
      XTable,
      Cell,
      Tabbar,
      TabbarItem,
      XTextarea,
      Selector,
      Card,
      Popup
    },
    data () {
      return {
        name: '',
        selected: '',
        faultCode: '',
        showAdd: false,
        sechemeDesc: '',
        plans: {},
        plan: {
          faultCode: '',
          sechemeDesc: '',
          sechemeImgPath: ''
        }
      }
    },
    mounted () {
      let id = this.$route.query.faultCode
      if (id) {
        this.faultCode = id
        this.queryPlans(id)
        this.name = id + '处理方案'
        this.plan.faultCode = id
      }
    },
    methods: {
      async queryPlans (code) {
        let response = await this.$http.postDeviceQuery('/devFaultDealwithSecheme/getDevFaultDealwithSechemeList', {faultCode: code}, 20, 1)
        if (response.code === 0) {
          this.plans = response.data
        }
      },
      add () {
        this.showAdd = true
      },
      footClick () {
        console.info('footClick')
      },
      closePopup () {
        this.showAdd = false
      },
      async submit () {
        if (this.plan.sechemeDesc === '') {
          this.$vux.toast.show({
            text: '请输入方案描述!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
        let response = await this.$http.postDeviceCommon('/devFaultDealwithSecheme/addDevFaultDealwithSecheme', this.plan)
        if (response.code === 0) {
          this.$vux.toast.show({
            text: '请输入方案描述!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.showAdd = false
          this.plan.sechemeDesc = ''
          this.queryPlans(this.plan.faultCode)
        } else {
          this.$vux.toast.show({
            text: '添加失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      }
    }
  }
</script>

<style type="text/css"></style>