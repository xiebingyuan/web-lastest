<template>
	<div>
		<x-header>{{name}}</x-header>
		<div>
			<x-table full-bordered style="background-color:#fff;">
				<thead>
          <tr style="background-color: #F7F7F7">
            <th>设备系列</th>
            <th>设备类型</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
        	<tr v-for="(info,index) in infos" :class="{ 'select-status': index === selected }" track-by="$index" @click="choose(index)">
        		<td>{{info.devSeries}}</td>
        		<td>{{info.devType}}</td>
        		<td>{{info.status}}</td>
        	</tr>	
        </tbody>	
			</x-table>	
		</div>
		<tabbar style="position:fixed">
      <tabbar-item @click.native="toAdd"><span slot="label" class="showClass">添加</span>
      </tabbar-item>
      <tabbar-item @click.native="toUpdate"><span slot="label" :class="isPick ? 'showClass' : '' ">修改</span>
      </tabbar-item>
      <tabbar-item @click.native="toDel"><span slot="label" :class="isPick ? 'showClass' : '' ">删除</span>
      </tabbar-item>
      <tabbar-item @click.native="toDetail"><span slot="label" :class="isPick ? 'showClass' : '' ">详情</span>
      </tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
               title="添加确认"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">操作成功，是否继续添加?</p>
      </confirm>
    </div>
	</div>	
</template>

<script type="text/javascript">
  import { CheckIcon, XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, Confirm, TransferDom } from 'vux'
  export default {
    name: 'Query',
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
      CheckIcon,
      Confirm
    },
    data () {
      return {
        name: '查询设备规格参数',
        infos: {},
        isPick: false,
        selected: '',
        showConfirm: false
      }
    },
    mounted () {
      this.query()
    },
    methods: {
      async query () {
        let response = await this.$http.postDeviceQuery('/devSpecifications/getDevSpecifications', {}, 10, 1)
        this.infos = response.data
      },
      choose: function (index) {
        this.selected = index
        this.isPick = true
      },
      toAdd () {
        this.$router.push({path: '/standard/add'})
      },
      toUpdate () {
        let info = this.infos[this.selected]
        console.info(info)
        this.$router.push({path: '/standard/edit', query: { devSeries: info.devSeries, devType: info.devType }})
      },
      onConfirm () {
      },
      onCancel () {
      }
    }
  }
</script>

<style type="text/css">

</style>