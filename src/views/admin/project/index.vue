<template>
  <div class="page-view">
    <div class="page-title">
      <ul class="row w h">
        <li class="col v-m g-4">项目管理</li>
        <li class="col v-m t-r">
          <Poptip placement="bottom-start" width="450">
            <Button icon="funnel" type="text">更多条件</Button>
            <ul class="form more" slot="content">
              <li class="form-item">
                <ul class="row w">
                  <li class="col v-m g-5">项目组：</li>
                  <li class="col v-m g-19 t-l">
                    <Select v-model="limit.branch">
                      <Option v-for="item in branch" :value="item.label" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </li>
                </ul>
              </li>
              <li class="form-item">
                <ul class="row w">
                  <li class="col v-m g-5">分类：</li>
                  <li class="col v-m g-19 t-l">
                    <Select v-model="limit.category">
                      <Option v-for="item in projectCategory" :value="item.label" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </li>
                </ul>
              </li>
              <li class="form-item">
                <ul class="row w">
                  <li class="col v-m g-5">发布时间：</li>
                  <li class="col v-m g-19 t-l">
                    <DatePicker v-model="between" type="datetimerange" placeholder="选择发布时间" style="width: 100%"/>
                  </li>
                </ul>
              </li>
            </ul>
          </Poptip>
          <div class="search">
            <Input v-model="limit.title" placeholder="请输入项目名称！" style="width: 300px"/>
            <Button @click="_search" type="primary" icon="ios-search"></Button>
          </div>
          <Button type="ghost" @click="jump('/admin/project/publish')">发布项目</Button>
          <Button type="error" v-if="selection.split(',').length > 1" @click="modal.delete = !modal.delete">批量删除</Button>
        </li>
      </ul>
    </div>
    <div class="admin-main">
      <div class="w h" ref="main">
        <Table border ref="selection" :columns="column" :data="list" :height="height" :loading="tableLoading" @on-selection-change="onSelected"></Table>
      </div>
    </div>
    <div class="page-area row">
      <div class="col v-m">
        每页<span>{{search.pagesize}}</span>条/
        总数：<span>{{total}}</span>条
      </div>
      <div class="col v-m t-r">
        <Page :current="currentPage" :page-size="search.pagesize" size="small" :total="total" show-elevator @on-change="pageChange"></Page>
      </div>
    </div>
    <Modal
        v-model="modal.add"
        title="发布项目"
        width="1200px"
        :mask-closable="false">
        <div class="t-r" slot="footer">
          <Button @click="modal.add = false" type="text">取消</Button>
          <Button v-if="!addDone" @click="addSubmit" :loading = 'loading' type="primary" size="large">确认添加</Button>
          <Button v-if="addDone" @click="addReset" :loading = 'loading' type="primary" size="large">继续添加</Button>
        </div>
    </Modal>
    <!-- 修改 -->
    <Modal
      v-model="modal.edit"
      title="编辑用户"
      :mask-closable="false">
      <div class="t-r" slot="footer">
        <Button @click="modal.edit = false" type="text">取消</Button>
        <Button @click="editSubmit" :loading = 'loading' type="primary" size="large">确认添加</Button>
      </div>
    </Modal>
    <!-- 删除 -->
    <Modal
        v-model="modal.delete"
        title="确认删除"
        :loading="true"
        @on-ok="delSubmit">
        <p>确认要删除该<span style="color:#f00;margin:0 5px;font-size:16px;">({{selection.split(',').length}})</span>条记录？</p>
    </Modal>
  </div>
</template>
<script>
import {projectList, captcha, adminUserAdd, adminUserEdit, removeUser, branch, projectCategory} from '@/config'
import axios from 'axios'
export default {
  name: 'userList',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '项目管理',
      captcha: captcha,
      branch: branch,
      projectCategory: projectCategory,
      loading: false,
      currentPage: parseInt(this.$route.query.page) || 1,
      tableLoading: false,
      addDone: false,
      slide: '邮箱',
      height: 0,
      selection: '',
      currentData: {},
      total: 0,
      modal: {
        add: false,
        edit: false,
        delete: false
      },
      limit: {
        branch: '',
        category: '',
        title: ''
      },
      between: [],
      search: {
        sort: 'desc',
        limit: '',
        pagesize: 15,
        page: this.$route.query.page || 1,
        between: ''
      },
      add: {
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
        username: '',
        phone: '',
        email: '',
        captcha: ''
      },
      edit: {
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
        oId: '',
        userInfo: '',
        captcha: ''
      },
      column: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '标题',
        key: 'title',
        width: 500
      }, {
        title: '所属部门',
        key: 'branch',
        align: 'center',
        width: 100,
        render: (h, params) => {
          const item = this.list[params.index][params.column.key]
          return item.name
        }
      }, {
        title: '分类',
        key: 'category',
        align: 'center',
        width: 100,
        render: (h, params) => {
          const item = this.list[params.index][params.column.key]
          return item.name
        }
      }, {
        title: '作者',
        key: 'author',
        align: 'center',
        width: 100,
        render: (h, params) => {
          const item = this.list[params.index][params.column.key]
          return item.name
        }
      }, {
        title: '浏览量',
        align: 'center',
        width: 100,
        key: 'view'
      }, {
        title: '下载量',
        width: 100,
        align: 'center',
        key: 'download'
      }, {
        title: '注册时间',
        key: 'created_at',
        align: 'center',
        render: (h, params) => {
          const timestamp = this.list[params.index][params.column.key]
          return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
        }
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'ghost',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  console.log(params.index)
                }
              }
            }, '查看'),
            h('Button', {
              props: {
                type: 'ghost',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.modal.edit = true
                  this.currentData = this.list[params.index]
                  this.oId = this.list[params.index].uId
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.selection = ''
                  this.modal.delete = true
                  this.selection = this.list[params.index].uId
                }
              }
            }, '删除')
          ])
        }
      }],
      list: []
    }
  },
  mounted () {
    this.height = this.$refs.main.offsetHeight
  },
  created () {
    this.getList()
  },
  methods: {
    delSubmit () {
      console.log(this.selection)
      axios({
        method: 'get',
        url: removeUser,
        params: {
          uId: this.selection,
          author: JSON.parse(this.$localStorage.get('userInfo')).uId
        }
      }).then(res => {
        if (res.data.status) {
          this.$Message.success(res.data.msg)
          this.getcaptcha()
          this.modal.delete = false
          this.getList()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    onSelected (items) {
      this.selection = []
      items.forEach((item, index) => {
        this.selection += item.uId + ','
      })
      this.selection = this.selection.substr(0, this.selection.length - 1)
    },
    dateChange (v) {
      this.currentData.birthday = new Date(v).valueOf() / 1000
    },
    editSubmit () {
      this.edit.oId = this.currentData.uId
      console.log(this.edit, this.currentData)
      // delete this.currentData.uId
      // delete this.currentData.recId
      this.edit.userInfo = JSON.stringify(this.currentData)
      this.loading = !this.loading
      axios({
        method: 'get',
        url: adminUserEdit,
        params: this.edit
      }).then(res => {
        this.loading = !this.loading
        if (res.data.status) {
          this.$Message.success(res.data.msg)
          this.getcaptcha()
          this.modal.edit = false
          this.getList()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    pageChange (page) {
      console.log(page)
      this.$router.push('/admin/project?page=' + page)
      this.search.page = page
      this.getList()
    },
    getcaptcha () {
      this.captcha = this.captcha + '?' + new Date()
    },
    addReset () {
      this.add = {
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
        username: '',
        phone: '',
        email: '',
        captcha: ''
      }
      this.addDone = false
    },
    addSubmit () {
      this.loading = !this.loading
      axios({
        method: 'get',
        url: adminUserAdd,
        params: this.add
      }).then(res => {
        this.loading = !this.loading
        if (res.data.status) {
          this.$Message.success(res.data.msg)
          this.addDone = true
          this.addReset()
          this.getcaptcha()
          this.getList()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    getList () {
      this.tableLoading = true
      axios({
        method: 'get',
        url: projectList,
        params: this.search
      }).then(res => {
        if (res.data.status) {
          console.log(res.data.data)
          this.total = res.data.data.total
          this.list = res.data.data.data
          this.tableLoading = false
        }
      })
    },
    _search () {
      for (var i in this.limit) {
        if (this.limit[i] === '' || this.limit[i] === 'null') {
          delete this.limit[i]
        }
      }
      this.search.page = 1
      this.currentPage = 1
      this.$router.replace('/admin/project?page=' + this.currentPage)
      this.search.limit = JSON.stringify(this.limit)
      if (this.between.length) {
        const start = this.between[0]
        const end = this.between[1]
        this.search.between = {
          start: Date.parse(new Date(start)) / 1000,
          end: Date.parse(new Date(end)) / 1000
        }
        this.search.between = JSON.stringify(this.search.between)
      }
      this.getList()
    },
    jump (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="scss" type="text/css">
.search {
  display:inline-block;
  margin-right:20px;
  font-size:0;
  vertical-align: middle;
  button{
    margin-left:5px;
  }
}
</style>
