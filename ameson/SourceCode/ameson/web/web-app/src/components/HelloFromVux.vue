<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png" @click="tt">
      <h1> </h1>
    </div>
    <div id="allmap" style="width: 100%; height: 300px"></div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link ></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import BMap from 'BMap'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  mounted () {
    let map = new BMap.Map('allmap')
    let point = new BMap.Point(116, 39)
    let marker = new BMap.Marker(point)
    map.addOverlay(marker)
    map.centerAndZoom(point, 15)
  },
  methods: {
    tt () {
      console.info('tt')
      this.$vux.loading.show({
        text: '加载中...'
      })
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
