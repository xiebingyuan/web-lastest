<template>
	<div>
		<x-header>{{name}}</x-header>
    <group></group>
    <group>
      <cell title="标题" v-model="info.msgTypeName"></cell>
      <x-textarea title="内容" :value="info.msgDesc" readonly></x-textarea>
      <cell title="时间" v-model="info.creatTime"></cell>
    </group>
	</div>	
</template>

<script type="text/javascript">
  import { XHeader, XTextarea, Group, XInput, Cell } from 'vux'
  export default {
    components: {
      XHeader,
      XTextarea,
      Group,
      XInput,
      Cell
    },
    data () {
      return {
        name: '消息详情',
        info: []
      }
    },
    mounted () {
      let message = this.$route.query.message
      this.info = message
    },
    methods: {
    }
  }
</script>

<style type="text/css">

</style>