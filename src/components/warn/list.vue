<template>
  <div>
    <x-header>{{name}}</x-header>
    <x-table full-bordered style="background-color:#fff;">
      <thead>
      <tr style="background-color: #F7F7F7">
        <th>序号</th>
        <th>预警内容</th>
        <th>时间</th>
      </tr>
      </thead>
      <tbody v-for="(i,index) in infos" track-by="$index">
      <tr>
        <td>{{index + 1}}</td>
        <td class="textAlignLeft">{{i.msgDesc}}</td>
        <td>{{i.creatTime}}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import { XHeader, Group, XTable, Cell } from 'vux'
  export default {
    name: 'WarnList',
    components: {
      XHeader,
      Group,
      XTable,
      Cell
    },
    data () {
      return {
        name: '预警消息',
        rlId: '',
        msgType: 2, // 用料预警
        infos: {}
      }
    },
    mounted () {
      this.query()
    },
    methods: {
      async query () {
        let formData = {}
        formData.msgType = 2
        // formData.rlId = ''
        let res = await this.$http.postDeviceQuery('/msgSysMessage/getMsgSysMessageList', formData, 10, 1)
        this.infos = res.data
      }
    }
  }
</script>

<style>

</style>
