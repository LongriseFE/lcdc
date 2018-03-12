<template>
  <div class="page-view" style="padding-bottom:10px;">
    <div
      style="height:55px;margin-top:-55px;padding:8px 10px;"
    >
      <el-button @click="modalAdd(null, null)" type="text">添加一级分类</el-button>
    </div>
    <div class="admin-main" style="overflow:auto;" v-if="list">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in list" :key="index">
          <el-card class="box-card" style="margin-bottom:20px;">
            <div slot="header" class="clearfix">
              <span>{{item.name}}</span>
              <el-button @click="modalDel(item)" style="float: right; padding: 5px 10px;margin-left:10px;" type="danger">删除</el-button>
              <el-button @click="modalAdd(item)" style="float: right; padding: 5px 10px" type="primary">添加分类</el-button>
            </div>
            <el-tag
              style="margin:5px;"
              v-for="tags in item.children"
              :key="tags.name"
              closable
              @close="modalDel(tags)"
              :type="tag[index]">
              {{tags.name}}
            </el-tag>
          </el-card>
        </el-col>
      </el-row>
      <empty v-if="!list.length && !loading">
        <img slot="icon" src="static/tip1.png" alt="">
        <p slot="text">还没有添加任何部门哦！
          <el-button @click="modalAdd(null, null)" type="text">前去添加</el-button>
        </p>
      </empty>
      <app-loading v-if="loading" style="height:100%;" name="tail-spin">
        <span slot="text">正在努力加载中，请稍后！</span>
      </app-loading>
    </div>
    <el-dialog
      :title="Object.keys(current).length ? '请填写子分类' : '请填顶级分类'"
      :visible.sync="modal.add"
      @close="clearCurrent"
      width="30%">
      <p v-if="Object.keys(current).length" style="margin-bottom:20px;">您正在添加<span style="color:#D94447;margin:0 5px;">{{current.name}}</span>的二级部门</p>
      <el-input
        placeholder="请填写部门名称"
        v-model="add.name"
        clearable>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modal.add = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="确认删除"
      :visible.sync="modal.del"
      width="30%">
      <p style="margin-bottom:20px;">您正在删除<span style="color:#D94447;margin:0 5px;">{{current.name}}</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modal.del = false">取 消</el-button>
        <el-button type="primary" @click="delSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import {addProjectCategory, ProjectCategory, delProjectCategory} from '@/config'
import empty from '@/components/empty'
import AppLoading from '@/components/loading'
export default {
  data () {
    return {
      loading: false,
      tag: ['primary', 'success', 'warning', 'danger'],
      filterText: '',
      list: [],
      current: {},
      modal: {
        add: false,
        del: false
      },
      add: {
        name: '',
        parent: '',
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId
      },
      del: {
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
        id: ''
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created () {
    this.getList()
  },
  components: {
    empty,
    AppLoading
  },
  methods: {
    clearCurrent () {
      console.log('清空')
      this.current = {}
    },
    getList () {
      this.loading = !this.loading
      this.list = []
      axios({
        method: 'get',
        url: ProjectCategory
      }).then(res => {
        this.loading = !this.loading
        if (Object.prototype.toString.call(res.data.data) === '[object Array]') {
          this.list = res.data.data
        } else {
          this.list.push(res.data.data)
        }
        console.log(this.list)
      })
    },
    addSubmit () {
      axios({
        method: 'get',
        url: addProjectCategory,
        params: this.add
      }).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.status ? 'success' : 'error'
        })
        this.modal.add = false
        this.getList()
      })
    },
    modalAdd (data) {
      if (data) {
        this.current = data
        this.add.parent = data.uId
      }
      this.modal.add = true
    },
    delSubmit () {
      axios({
        method: 'get',
        url: delProjectCategory,
        params: this.del
      }).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.status ? 'success' : 'error'
        })
        this.modal.del = false
        this.getList()
      })
      this.modal.del = false
    },
    modalDel (data) {
      this.current = data
      this.del.id = data.uId
      this.modal.del = true
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>
<style>
.el-tree-node__content{
  height:38px !important;
  border-bottom:1px solid #f9f9f9;
}
.do{
  display:none;
}
.el-tree-node__content:hover .do{display:block;}
.el-button--mini{
  padding:5px;
}
</style>
