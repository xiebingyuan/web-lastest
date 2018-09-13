<template>
	<div>
		 <x-header>{{name}}
    </x-header>
    <group></group>
    <div>
      <x-table full-bordered style="background-color:#fff;" >
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>问题类型</th>
            <th>问题分类</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(info,index) in infos">
            <td>{{info.serOrderTypeName}}</td>
            <td>{{info.serOrderClassifyName}}</td>
            <td>{{info.count}}</td>
          </tr>  
        </tbody>
      </x-table>
    </div>
    <group></group>
    <div>
    	<v-chart :data="data">
	      <v-line series-field="type" />
	    </v-chart>
    </div>	
	</div>	
</template>

<script type="text/javascript">
  import { Group, XHeader, XTable, VChart, VLine, VAxis, VTooltip } from 'vux'
  export default {
    name: 'HandlerCount',
    components: {
      Group,
      XHeader,
      XTable,
      VChart,
      VLine,
      VAxis,
      VTooltip
    },
    data () {
      return {
        name: '工单统计分析',
        classMap: {}, // 问题分类
        typeMap: {},  // 问题类型
        infos: {},
        data: [{'name': '未发现', 'type': '未发现', 'value': 1}]
        // data: [{'name': '财务', 'type': '售前', 'value': 99.9},
        //        {'name': '技术', 'type': '售前', 'value': 11.9},
        //        {'name': '耗材', 'type': '售前', 'value': 41.9},
        //        {'name': '财务', 'type': '售后', 'value': 71.9},
        //        {'name': '技术', 'type': '售后', 'value': 81.9},
        //        {'name': '耗材', 'type': '售后', 'value': 96.6}]
      }
    },
    mounted () {
      var classData = new Map()
      var typeData = new Map()
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 工单问题类型
        if (dict.dictParentId === 105) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          typeData.set(key, name)
        }
        // 工单问题分类
        if (dict.dictParentId === 110) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          classData.set(key, name)
        }
      }
      this.classMap = classData
      this.typeMap = typeData
      this.query()
    },
    methods: {
      async query () {
        let response = await this.$http.postDeviceQuery('/serviceOrder/getOrderCount', {}, 100, 1)
        if (response.code === 0) {
          this.infos = response.data
          for (var i = this.infos.length - 1; i >= 0; i--) {
            this.infos[i].serOrderTypeName = this.typeMap.get(parseInt(this.infos[i].serOrderType))
            this.infos[i].serOrderClassifyName = this.classMap.get(parseInt(this.infos[i].serOrderClassify))
            let dataO = {}
            dataO.name = this.infos[i].serOrderClassifyName
            dataO.type = this.infos[i].serOrderTypeName
            dataO.value = this.infos[i].count
            if (i === this.infos.length - 1) {
              this.data[0] = dataO
            } else {
              this.data.push(dataO)
            }
          }
          console.info(this.data)
        }
      }
    }
  }
</script>
