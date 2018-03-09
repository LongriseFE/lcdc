<template>
  <div class="page-view">
    <div class="page-title">
      <ul class="row w h">
        <li class="col v-m g-4">主题管理</li>
        <li class="col v-m t-r">
          <el-button size="small" @click="modal.add = true">添加主题</el-button>
        </li>
      </ul>
    </div>
    <div class="admin-main">
      <ul class="grid theme-list" v-if="list">
        <li class="grid-item g-4" v-for="(item, index) in list" :key="index">
          <div class="theme-item" :style="'background:' + item.color1">
            <ul class="row w bottom">
              <li class="col v-m">
                <h2 class="name">{{item.name}}</h2>
              </li>
              <li class="col v-m hot t-r">
                <span class="iconfont icon-hot"></span>
                <span class="v-m">{{item.use.length}}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog
      title="添加主题"
      :visible.sync="modal.add"
      width="50%">
      <el-form :model="add" label-width="80px">
        <el-form-item label="主题名称">
          <el-input v-model="add.name"></el-input>
        </el-form-item>
        <ul class="row w">
          <li class="col v-m g-6">
            <el-form-item label="主色调">
              <el-color-picker class="v-m" v-model="add.color1" show-alpha></el-color-picker>
            </el-form-item>
          </li>
          <li class="col v-m g-6">
            <el-form-item label="辅助颜色">
              <el-color-picker class="v-m" v-model="add.color2" show-alpha></el-color-picker>
            </el-form-item>
          </li>
          <li class="col v-m">
            <p class="tips">选择颜色之后，会自动生成css代码！</p>
          </li>
        </ul>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modal.add = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {addTheme, themeList} from '@/config'
import axios from 'axios'
export default {
  name: 'author',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '主题管理',
      list: null,
      add: {
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
        name: '',
        color1: '',
        color2: ''
      },
      modal: {
        add: false
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    addSubmit () {
      axios({
        method: 'get',
        url: addTheme,
        params: this.add
      }).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.status ? 'success' : 'error'
        })
        this.modal.add = false
        console.log(res)
        this.getList()
      })
    },
    getList () {
      axios({
        method: 'get',
        url: themeList,
        params: {
          sort: 'asc'
        }
      }).then(res => {
        this.list = res.data.data
        console.log(this.list)
      })
    }
  },
  watch: {
    'color': 'renderCss'
  }
}
</script>
<style lang="scss" type="text/css">
.theme-list{
  .grid-item{
    padding:10px;
    .theme-item{
      height:300px;
      border:1px solid #eee;
      border-radius:5px;
      position: relative;
      .bottom{
        position: absolute;
        bottom:0;
        left:0;
        width:100%;
        .name{
          font-size:18px;
          font-weight:normal;
          color:rgba(255,255,255,0.5);
          padding:10px;
          vertical-align: middle;
        }
        .hot{
          font-size:36px;
          color:rgba(255,255,255,0.3);
          padding-right:10px;
          .iconfont{
            font-size:18px;
          }
        }
      }
    }
  }
}
</style>
