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
        		<td>{{info.serOrderType}}</td>
        		<td>{{info.serOrderDesc}}</td>
        		<td><x-button mini plain type="primary" @click.native="process(info.serOrderNum)">处理</x-button></td>
        	</tr>	
        </tbody>	
			</x-table>	
		</div>
	</div>	
</template>

<script type="text/javascript">
  import { XButton, XHeader, XTable, Group, XInput, Cell } from 'vux'
  // import qs from 'qs'
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
        infos: {}
      }
    },
    mounted () {
      this.query()
    },
    methods: {
      query () {
        var _this = this
        _this.$http({
          method: 'post',
          url: this.GLOBAL.httpUrl + 'getWaitEvents',
          // url: this.GLOBAL.deviceUrl + '/serviceOrder/getWaitHandleList',
          data: {}
        }).then(function (response) {
          _this.infos = response.data.data
        })
      },
      sync () {
        console.info('22')
      },
      process (orderId) {
        console.info(orderId)
        this.$router.push({path: '/standard/edit', query: { serOrderNum: orderId }})
      }
    }
  }
</script>

<style type="text/css">
	
</style>