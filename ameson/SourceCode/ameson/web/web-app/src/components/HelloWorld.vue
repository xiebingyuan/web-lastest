<template>
  <div class="hello">
   
    <cell title="上传文件"><input type="file" /></cell>
<!--     <vue-file-upload>
    <span slot="label" v-on:onAdd = "onAddItem">上传文件</span>
    </vue-file-upload> -->
<!--     <file-upload
      ref="upload"
      v-model="files"
      post-action="/post.method"
      put-action="/put.method"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
    上传文件
    </file-upload> -->
    <!-- <file-upload title="Add upload files"></file-upload> -->
    <!-- <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
// import FileUpload from 'vue-upload-component'
// import VueFileUpload from 'vue-file-upload'
// const file = {
//   name: '文件名称' , // 文件名称
//   size: 123  // 文件大小
  // type: "image/jpeg" , // 文件类型
  // isReady: false , //，点击上传后，即将准备好上传
  // isUploading: false , // 正在上传
  // isUploaded: false , // 上传后
  // isSuccess: false , // 成功上传
  // isCancel: false, // 取消上传
  // isError: false, // 上传失败
  // progress: 0 // 上传进度
import { Cell } from 'vux'
export default {
  name: 'HelloWorld',
  components: {
    Cell
    // VueFileUpload: VueFileUpload
  },
  data () {
    return {
      files: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  method: {
    uploadItem (file) {
      file.upload()
    },
    onAddItem (files) {
      console.log(files)
      this.files = files
    }
    // inputFile: function (newFile, oldFile) {
    //   if (newFile && oldFile && !newFile.active && oldFile.active) {
    //     // 获得相应数据
    //     console.log('response', newFile.response)
    //     if (newFile.xhr) {
    //       //  获得响应状态码
    //       console.log('status', newFile.xhr.status)
    //     }
    //   }
    // },
    // inputFilter: function (newFile, oldFile, prevent) {
    //   if (newFile && !oldFile) {
    //     // 过滤不是图片后缀的文件
    //     if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
    //       return prevent()
    //     }
    //   }
    //   // 创建 blob 字段 用于图片预览
    //   newFile.blob = ''
    //   let URL = window.URL || window.webkitURL
    //   if (URL && URL.createObjectURL) {
    //     newFile.blob = URL.createObjectURL(newFile.file)
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.file-uploads {
  overflow: hidden;
  position: relative;
  text-align: center;
  display: inline-block;
}
.file-uploads.file-uploads-html4 input[type="file"] {
  opacity: 0;
  font-size: 20em;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.file-uploads.file-uploads-html5 input[type="file"] {
  overflow: hidden;
  position: fixed;
  width: 1px;
  height: 1px;
  z-index: -1;
  opacity: 0;
}
</style>
