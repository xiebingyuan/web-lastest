<template>
  <div>
    <x-header>{{name}}
      <a slot="right" @click="query(pageSize, pageNo)">查询</a>
      <a slot="right" @click="resetData" style="margin-left: 20px">重置</a>
    </x-header>
    <group>
      <x-input title="故障码" v-model="faultCode"  placeholder="请输入故障码..."></x-input>
    </group>
    <div>
      <scroller lock-x height="300px" @on-scroll-bottom="onScrollBottom" ref="scrollerllerBottom" :scroll-bottom-offst="200">
        <div>
          <x-table full-bordered style="background-color:#fff;" >
            <thead>
              <tr style="background-color: #F7F7F7">
                <th>类型</th>
                <th>故障码</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(info,index) in infos" :class="{ 'select-status': index === selected }" track-by="$index" @click="choose(index)" v-if="code==0">
                <td>{{info.faultTypeName}}</td>
                <td>{{info.faultCode}}</td>
                <td><x-button mini plain type="primary" @click.native="process(info.faultCode)">处理方案</x-button></td>
              </tr>  
            </tbody>
          </x-table>
          </div>
        <load-more v-show="loadShow" tip="loading"></load-more>
      </scroller>
      </group>
      <group v-if="code!=0" >
        <cell-box class="no-find-content">
          无符合条件数据！
        </cell-box>
      </group>
    </div>
    <div v-if="selected!==''" style="padding-bottom:58px;">
      <group>
        <x-input title="故障码" disabled v-model="detail.faultCode"></x-input>
        <selector ref="defaultValueRef" title="故障类型" readonly :options="typeList" v-model="detail.faultType"></selector>
        <x-input title='故障简述' disabled v-model="detail.faultRemark"></x-input>
        <x-textarea title="故障描述" disabled v-model="detail.faultDesc"></x-textarea>
      </group>
    </div>  
    <tabbar style="position:fixed">
      <tabbar-item @click.native="toAdd"><span slot="label" class="showClass">添加</span>
      </tabbar-item>
      <tabbar-item @click.native="toEdit"><span slot="label" :class="isPick ? 'showClass' : '' ">修改</span>
      </tabbar-item>
      <tabbar-item @click.native="toDel"><span slot="label" :class="isPick ? 'showClass' : '' ">删除</span>
      </tabbar-item>
      <tabbar-item @click.native="toSubmit"><span slot="label" :class="isPick ? 'showClass' : '' ">提交</span>
      </tabbar-item>
      <tabbar-item @click.native="toCancle"><span slot="label" :class="isPick ? 'showClass' : '' ">取消</span>
      </tabbar-item>
    </tabbar>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
               title="删除确认"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;">您确认删除该故障信息?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Confirm, TransferDom, XHeader, Group, XButton, XInput, XTable, Cell, Tabbar, TabbarItem, XTextarea, CellBox, Selector, Scroller, LoadMore } from 'vux'
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
      Confirm,
      CellBox,
      Selector,
      Scroller,
      LoadMore
    },
    data () {
      return {
        name: '故障码维护',
        isQuerySuccess: false,
        code: 0,
        pageNo: 1,
        pageSize: 6,
        isPick: false,
        loadShow: false,
        onFetching: false,
        selected: '',
        faultCode: '',
        typeList: [],
        typeMap: {},
        showConfirm: false,
        infos: {},
        detail: {
          faultCode: '',
          faultType: '',
          faultTypeName: '',
          faultRemark: '',
          faultDesc: ''
        }
      }
    },
    mounted () {
      this.pageSize = this.commonJs.getCommonPageCount()
      var faultId = this.$route.query.faultCode
      if (faultId) {
        this.faultCode = faultId
        this.query(this.pageSize, this.pageNo)
      }
      var data = new Map()
      var dictAll = this.commonJs.getDictInfo()
      for (var i = 0; i < dictAll.length; i++) {
        let dict = dictAll[i]
        // 故障类型
        if (dict.dictParentId === 151) {
          let key = dict.dictTypeValue
          let name = dict.dictTypeCname
          let newInfo = {key: key, value: name}
          data.set(key, name)
          this.typeList.push(newInfo)
        }
      }
      this.typeMap = data
    },
    methods: {
      async query (pageSize, pageNo) {
        this.selected = ''
        let formData = {}
        if (this.faultCode !== '') {
          formData.faultCode = this.faultCode
        }
        let response = await this.$http.postDeviceQuery('/devFaultCodeConfig/getDevFaultCodeConfigList', formData, pageSize, pageNo)
        this.code = response.code
        this.isInit = true
        this.infos = response.data
        for (var i = this.infos.length - 1; i >= 0; i--) {
          this.infos[i].faultTypeName = this.typeMap.get(parseInt(this.infos[i].faultType))
        }
        if (this.infos.length === 0) {
          this.code = -1
        }
        this.pageSize = this.commonJs.getCommonPageCount()
      },
      resetData () {
        this.isInit = false
        this.code = 0
        this.infos = {}
        this.pageSize = this.commonJs.getCommonPageCount()
        this.faultCode = ''
        this.selected = ''
        this.isPick = ''
      },
      choose (index) {
        this.selected = index
        this.isPick = true
        this.detail = this.infos[index]
      },
      toAdd () {
        this.$router.push({path: '/fault/add'})
      },
      toEdit () {
        this.$router.push({path: '/fault/edit', query: { info: this.infos[this.selected] }})
      },
      toDel () {
        this.showConfirm = true
      },
      toSubmit () {
        console.info(1)
      },
      toCancle () {
        console.info(1)
      },
      process (code) {
        this.$router.push({path: '/fault/plan', query: { faultCode: code }})
      },
      async onConfirm () {
        let response = await this.$http.postDeviceCommon('/devFaultCodeConfig/upDevFaultCodeConfig', {uuid: this.infos[this.selected].uuid, status: -1})
        if (response.code === 0) {
          this.$vux.toast.show({
            text: '删除成功!',
            position: 'middle',
            type: 'success',
            time: 1500
          })
          this.infos.splice(this.selected, 1)
          this.selected = ''
          this.isPick = false
        } else {
          this.$vux.toast.show({
            text: '删除失败!',
            position: 'middle',
            type: 'warn',
            time: 1500
          })
        }
      },
      onCancel () {
        console.info('cancle delete fault info.')
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.loadShow = true
          this.onFetching = true
          setTimeout(() => {
            this.pageSize = this.pageSize + this.commonJs.getCommonPageCount()
            console.info(this.pageSize)
            this.query(this.pageSize, this.pageNo)
            this.onFetching = false
            this.loadShow = false
          }, 1000)
        }
      },
      scrollerllerBottom () {
        console.info('scrollerllerBottom')
      }
    }
  }
</script>

<style>

</style>
