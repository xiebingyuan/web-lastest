<template>
	<div>
		<x-header>{{name}}</x-header>
    <group></group>
    <div>
			<x-table full-bordered style="background-color:#fff;">
				<thead>
          <tr style="background-color: #F7F7F7">
            <th>待办事项</th>
            <th>待办内容</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
        	<tr v-for="(info,index) in infos" track-by="$index">
        		<td>{{info.typeName}}</td>
        		<td>{{info.serOrderDesc}}</td>
        		<td><x-button mini plain type="primary" @click.native="process(info)">处理</x-button></td>
        	</tr>	
        </tbody>	
			</x-table>	
		</div>
	</div>	
</template>

<script type="text/javascript">
  import { XButton, XHeader, XTable, Group, XInput, Cell } from 'vux'
  export default {
    components: {
      XHeader,
      XTable,
      Group,
      XInput,
      Cell,
      XButton
    },
    data () {
      return {
        name: '我的待办',
        infos: {},
        typeMap: [],
        pageNo: 1,
        pageSize: 20
      }
    },
    mounted () {
      var orderData = new Map()
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 工单问题类型
        if (dict.dictParentId === 110) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          orderData.set(key, name)
        }
      }
      this.typeMap = orderData
      this.query(this.pageSize, this.pageNo)
    },
    methods: {
      async query (pageSize, pageNo) {
        let res = await this.$http.postDeviceQuery('/serviceOrder/getWaitHandleList', {}, pageSize, pageNo)
        if (res.code === 0) {
          this.infos = res.data
          for (var i = this.infos.length - 1; i >= 0; i--) {
            this.infos[i].typeName = this.typeMap.get(parseInt(this.infos[i].serOrderType))
          }
        }
      },
      process (info) {
        this.$router.push({path: '/order/handle', query: {}})
        // this.$router.push({path: '/standard/edit', query: { serOrderNum: orderId }})
      }
    }
  }
</script>

<style type="text/css">
	
</style>