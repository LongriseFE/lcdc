<template>
  <div class="page-view" style="padding-bottom:10px;">
    <div
      style="height:55px;margin-top:-55px;padding:8px 10px;"
    >
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
    </div>
    <div class="admin-main" style="overflow:auto;" v-if="list">
      <el-tree
        style="padding:0 20px;"
        :data="list"
        :props="defaultProps"
        node-key="id"
        :default-expand-all="true"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree"
        :getCheckedNodes="getChecked"
        :render-content="renderContent">
      </el-tree>
    </div>
    <el-dialog
      title="填写部门名称"
      :visible.sync="modal.add"
      width="30%">
      <p style="margin-bottom:20px;">您正在添加<span style="color:#D94447;margin:0 5px;">{{current.name}}</span>的二级部门</p>
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
import {department, addDepartment, delDepartment} from '@/config'
let id = 1000
export default {
  data () {
    return {
      filterText: '',
      list: null,
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
  methods: {
    getChecked () {

    },
    getList () {
      this.list = []
      axios({
        method: 'get',
        url: department
      }).then(res => {
        this.list.push(res.data.data)
      })
    },
    addSubmit () {
      axios({
        method: 'get',
        url: addDepartment,
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
    modalAdd (node, data) {
      this.current = data
      this.add.parent = data.uId
      this.modal.add = true
    },
    delSubmit () {
      axios({
        method: 'get',
        url: delDepartment,
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
    modalDel (node, data) {
      this.current = data
      this.del.id = data.uId
      this.modal.del = true
    },
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent (h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
        <span>
        <span>
        {this.renderParent(data)}
        {data.name}
        </span>
        </span>
        <span class="do">
        <el-button title="添加子部门" style="font-size: 12px;" plain size="mini" on-click={ () => this.modalAdd(node, data)} icon="el-icon-plus"></el-button>
        <el-button title="删除该部门" style="font-size: 12px;" plain size="mini" on-click={ () => this.modalDel(node, data) } icon="el-icon-minus"></el-button>
        </span>
        </span>)
    },
    renderParent (data) {
      if (data.children.length) {
        return <span class="iconfont icon-folder" style="margin-right:5px;"></span>
      } else {
        if (data.name.indexOf('总监') > -1) {
          return <span class="iconfont icon-yonghu" style="margin-right:5px;"></span>
        } else if (data.name.indexOf('经理') > -1) {
          return <span class="iconfont icon-leader" style="margin-right:5px;"></span>
        } else if (data.name.indexOf('组长') > -1) {
          return <span class="iconfont icon-icon-" style="margin-right:5px;"></span>
        } else {
          return <span class="iconfont icon-list" style="margin-right:5px;"></span>
        }
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
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
