<template>
  <div class="pan">
    <div class="bar">
      <ul class="row w h">
        <li class="col v-m">
          <Button type="primary" @click="uploadmodal = true">文件上传</Button>
          <Button type="ghost" @click="makeFolder">新建文件夹</Button>
          <Button v-if="current" type="ghost" @click="back">返回上一层</Button>
        </li>
        <li class="col v-m"></li>
        <li class="col v-m t-r grid">
          <span>文件夹：{{list.directions}}</span>
          <span>文件：{{list.files}}</span>
          <span
            class="iconfont"
            :class="{
              'icon-listgrid': !grid,
              'icon-list': grid
            }"
            @click="toggleGrid"
          ></span>
        </li>
      </ul>
    </div>
    <ul class="grid dir-title" v-if="!grid">
      <li class="grid-item" style="width:75%;">文件名</li>
      <li class="grid-item" style="width:10%;">大小</li>
      <li class="grid-item t-r" style="width:15%;">修改日期</li>
    </ul>
    <loading v-if="loading" name="tail-spin" style="height:600px;" :size="28">
      <span slot="text">正在努力加载，请稍后！</span>
    </loading>
    <empty v-if="!loading && !list.content.length" name="tail-spin" style="height:600px;" :size="28">
      <img slot="icon" src="static/tip2.png" alt="">
      <span slot="text">这里还空空如也！</span>
    </empty>
    <ul
      v-if="!loading"
      class="dir-list"
      :class="{
        'grid': grid
      }"
    >
      <li v-if="!grid" v-for="(item, index) in list.content" :key="index">
        <div @click="jump(item)" class="dir-item" @contextmenu.prevent="$refs.menu.open($event, item)">
          <div class="icon" v-if="item.url && item.ext.indexOf('image') > -1">
            <img :src="item.url" alt="">
          </div>
          <div class="icon" v-else>
            <img :src="item.icon" alt="">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="size">{{item.size || '-'}}</div>
          <div class="time">{{new Date(parseInt(item.lasttime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}}</div>
        </div>
      </li>
      <li v-if="grid" v-for="(item, index) in list.content" :key="index">
        <Poptip trigger="hover" title="文件信息" placement="bottom-end">
          <span class="iconfont icon-info"></span>
          <div slot="content">
            <p>文件名称：{{item.name}}</p>
            <p>文件大小：{{item.size || '-'}}</p>
            <p>修改时间：{{new Date(parseInt(item.lasttime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}}</p>
          </div>
        </Poptip>
        <div @click="jump(item)" class="dir-item" @contextmenu.prevent="$refs.menu.open($event, item)">
          <div class="icon" v-if="item.url && item.ext === 'image/jpeg' || item.ext === 'image/png'">
            <img :src="item.url" alt="">
          </div>
          <div class="icon" v-else>
            <img :src="item.icon" alt="">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="size">{{item.size || '-'}}</div>
          <div class="time">{{new Date(parseInt(item.lasttime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}}</div>
        </div>
      </li>
    </ul>
    <!-- 右键菜单 -->
    <context-menu ref="menu">
      <ul class="options" :user-data="1">
        <li @click="onClick($refs.menu.userData, 'rename')"><span class="v-m iconfont icon-rename"></span><span class="v-m">重命名</span></li>
        <li @click="onClick($refs.menu.userData, 'share')"><span class="v-m iconfont icon-share"></span><span class="v-m">分享</span></li>
        <li @click="onClick($refs.menu.userData, 'move')"><span class="v-m iconfont icon-move"></span><span class="v-m">移动到</span></li>
        <li @click="onClick($refs.menu.userData, 'delete')"><span class="v-m iconfont icon-del"></span><span class="v-m">删除</span></li>
        <li @click="onClick($refs.menu.userData, 'download')"><span class="v-m iconfont icon-download"></span><span class="v-m">下载</span></li>
      </ul>
    </context-menu>
    <el-dialog
      title="文件上传"
      :visible.sync="uploadmodal"
      :close-on-click-modal="false"
      width="800px">
      <el-upload
        class="upload-demo"
        drag
        :action="updir"
        :show-file-list="false"
        :http-request="uploadFiles"
        :auto-upload="true"
        :file-list="uploadlist"
        :on-change="upchange"
        ref="upload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form >
        <el-form-item :label="item.name" v-for="(item, index) in uploadlist" :key="index">
          <el-progress
            :percentage="item.percentage"
            :status="item.status === 'uploadSuccess' ? 'success' : ''"
          ></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadmodal = false">取 消</el-button>
        <el-button type="primary" @click="uploadmodal = false">完成</el-button>
      </span>
    </el-dialog>
    <iframe :src="downurl" frameborder="0"></iframe>
  </div>
</template>
<script>
import {pan, makedir, deldir, updatedir, updir, downdir} from '@/config'
import axios from 'axios'
import contextMenu from '@/components/contextmenu'
import Loading from '@/components/loading'
import empty from '@/components/empty'
export default {
  name: 'pan',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '网盘',
      parent: '',
      grid: true,
      foldname: '',
      list: {
        directions: 0,
        files: 0
      },
      loading: false,
      uploadmodal: false,
      updir: updir,
      download: downdir,
      downurl: '',
      uploadlist: [],
      current: ''
    }
  },
  components: {
    'context-menu': contextMenu,
    Loading,
    empty
  },
  created () {
    this.getDir()
    this.current = this.$route.query.dir
  },
  methods: {
    back () {
      window.history.go(-1)
    },
    upchange (file, fileList) {
      this.uploadlist = fileList
    },
    uploadFiles (params) {
      let parent = this.$route.query.dir
      if (parent) {
        parent = parent.split('/')
        parent.shift()
        this.parent = parent.join('/')
      } else {
        parent = ''
      }
      var formData = new FormData()
      formData.append('file', params.file)
      formData.append('dir', parent)
      axios({
        method: 'post',
        url: updir,
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onUploadProgress: (progressEvent) => {
          this.uploadlist.forEach((item, index) => {
            if (item.uid === params.file.uid) {
              this.uploadlist[index]['percentage'] = parseInt(progressEvent.loaded / progressEvent.total * 100)
              if (this.uploadlist[index]['percentage'] === 100) {
                this.uploadlist[index]['status'] = 'uploadSuccess'
              }
              console.log(this.uploadlist[index]['percentage'])
            }
          })
        }
      }).then(res => {
        this.getDir()
      })
    },
    getDir () {
      this.loading = !this.loading
      let params = {}
      let dir = this.$route.query.dir
      this.current = dir
      if (dir) {
        dir = dir.split('/')
        dir.shift()
        dir = dir.join('/')
        params = {
          'dir': dir
        }
      }
      axios({
        method: 'get',
        url: pan,
        params: params
      }).then(res => {
        this.list = res.data.data
        this.loading = !this.loading
      })
    },
    toggleGrid () {
      this.grid = !this.grid
    },
    onClick (opt, tag) {
      switch (tag) {
        case 'delete':
          this.delete(opt)
          break
        case 'rename':
          this.rename(opt)
          break
        case 'download':
          this.downfile(opt)
          break
      }
    },
    downfile (item) {
      let url = item.dir.split('/')
      url.shift()
      url = url.join('\\')
      let name = item.name.split('.')
      name.pop()
      name = name.join('')
      this.downurl = this.download + '?url=' + url + '&name=' + name
      console.log(url)
    },
    rename (item) {
      this.$prompt('您正在重命名（' + item.name + '）！', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        let newname = item.dir.split('/')
        newname.shift()
        newname[newname.length - 1] = value
        newname = newname.join('/')
        let dir = item.dir.split('/')
        dir.shift()
        dir = dir.join('/')
        console.log(newname, dir)
        axios({
          method: 'get',
          url: updatedir,
          params: {
            dir: dir,
            value: newname
          }
        }).then(res => {
          this.getDir()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    delete (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'get',
          url: deldir,
          params: {
            dir: item.dir
          }
        }).then(res => {
          this.getDir()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    jump (item) {
      if (!item.url) {
        this.$router.push('/pan?dir=' + item.dir)
      }
    },
    makeFolder () {
      this.$prompt('请填写目录名称！', '创建目录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        let parent = this.$route.query.dir
        if (parent) {
          parent = parent.split('/')
          parent.shift()
          this.parent = parent.join('/')
        } else {
          parent = ''
        }
        axios({
          method: 'get',
          url: makedir,
          params: {
            dir: value,
            parent: this.parent
          }
        }).then(res => {
          this.getDir()
        })
      }).catch(() => {
      })
    }
  },
  watch: {
    '$route': 'getDir'
  }
}
</script>
<style scoped>
.bar {
  padding: 20px 0;
}
.dir-list {
  display: block;
  font-size: 0;
  padding: 0 0 20px 0;
  margin:-5px;
}
.dir-list li {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
}
.dir-list.grid li {
  display: inline-block;
  width: 10%;
  padding: 5px;
  box-sizing: border-box;
  position:relative;
}
.grid .dir-item {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  border-radius: 5px;
  white-space: pre-wrap;
}
.grid .dir-item .icon img {
  width: 56px;
  height: 56px;
}
.dir-item:hover {
  background: #f1f5fa;
}
.dir-list .dir-item {
  font-size: 14px;
  color: #333;
}
.dir-list.grid .size,
.dir-list.grid .time {
  display: none;
}
.dir-item {
  display: table;
  width: 100%;
  height: 50px;
}
.grid .dir-item {
  display: block;
  height: auto;
  text-align: center;
}
.dir-item .icon,
.dir-item .name,
.dir-item .size,
.dir-item .time {
  display: table-cell;
  vertical-align: middle;
}
.grid .dir-item .icon,
.grid .dir-item .name,
.grid .dir-item .size,
.grid .dir-item .time {
  display: inline-block;
  width: 100%;
}
.dir-item .icon {
  width: 5%;
  padding-left: 10px;
}
.grid .dir-item .size,
.grid .dir-item .time {
  display: none;
}
.grid .dir-item {
  border: none;
}
.grid .dir-item .icon {
  width: 100%;
  padding-left: 0;
}
.dir-item .icon img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
.dir-item .name {
  width: 70%;
}
.grid .dir-item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5px;
}
.dir-item .size {
  width: 10%;
}
.dir-item .time {
  width: 15%;
  text-align: right;
  padding-right: 10px;
}
.dir-item {
  border-bottom: 1px solid #f2f6fd;
  position:relative;
}
.dir-title {
  padding: 0 20px;
}
.dir-title .grid-item {
  font-size: 14px;
  color: #333;
  padding: 10px;
  border-bottom: 1px solid #f2f6fd;
}
.grid .iconfont {
  font-size: 24px;
  color: #2b92dc;
  cursor: pointer;
}
.grid span {
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;
}
.right-menu {
  position: fixed;
  background: #fff;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  z-index: 999;
  display: none;
}
.right-menu a {
  width: 75px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  display: block;
  color: #1a1a1a;
}
.right-menu a:hover {
  background: #eee;
  color: #fff;
}
.options li{
  font-size:14px;
  padding:0.5em 2em;
  cursor: pointer;
}
.options li:hover{
  background:#2D87D7;
  color:#fff;
}
.options li .iconfont{
  display:inline-block;
  width:25px;
}
.dir-list .icon-info{
  font-size:16px;
  color:#B9C9D6;
  width:18px;
  height: 18px;
  line-height: 18px;
  text-align:center;
  display:inline-block;
  display:none;
}
.dir-item:hover .icon-info{
  display:block;
}
.dir-list .ivu-poptip{
  display:inline-block;
  position:absolute;
  right: 10px;
  top:10px;
  z-index:100;
}
</style>
