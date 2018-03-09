<template>
  <div class="page-view">
    <div class="page-title">
      <ul class="row w h">
        <li class="col v-m g-4">用户管理</li>
        <li class="col v-m t-r">
          <Poptip placement="bottom-start" width="450">
            <Button icon="funnel" type="text">更多条件</Button>
            <ul class="form more" slot="content">
              <li class="form-item">
                <ul class="row w">
                  <li class="col v-m g-5">性别：</li>
                  <li class="col v-m g-19 t-l">
                    <RadioGroup v-model="limit.sex">
                      <Radio :label="0">男</Radio>
                      <Radio :label="1">女</Radio>
                      <Radio :label="2">隐私</Radio>
                      <Radio label="null">不限</Radio>
                    </RadioGroup>
                  </li>
                </ul>
              </li>
              <li class="form-item">
                <ul class="row w">
                  <li class="col v-m g-5">注册时间：</li>
                  <li class="col v-m g-19 t-l">
                    <DatePicker v-model="between" type="datetimerange" placeholder="Select date" style="width: 100%"/>
                  </li>
                </ul>
              </li>
            </ul>
          </Poptip>
          <div class="search">
            <Input v-model="limit.name" placeholder="请输入用户姓名！" style="width: 300px"/>
            <Button @click="_search" type="primary" icon="ios-search"></Button>
          </div>
          <Button type="ghost" @click="modal.add = !modal.add">添加用户</Button>
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
        title="新增用户"
        :mask-closable="false">
        <div class="t-c">
          <RadioGroup v-model="slide" type="button">
            <Radio label="邮箱"></Radio>
            <Radio label="手机"></Radio>
          </RadioGroup>
        </div>
        <ul class="form" style="width:90%;margin-top:20px;">
          <li class="form-item">
            <ul class="row w">
              <li class="col v-m g-3">用户名：</li>
              <li class="col v-m">
                <Input v-model="add.username" size="large" placeholder="用户名"/>
              </li>
            </ul>
          </li>
          <li class="form-item" v-if="slide === '邮箱'">
            <ul class="row w">
              <li class="col v-m g-3">邮箱：</li>
              <li class="col v-m">
                <Input v-model="add.email" size="large" placeholder="邮箱"/>
              </li>
            </ul>
          </li>
          <li class="form-item" v-if="slide === '手机'">
            <ul class="row w">
              <li class="col v-m g-3">手机号：</li>
              <li class="col v-m">
                <Input v-model="add.phone" size="large" placeholder="手机号码"/>
              </li>
            </ul>
          </li>
          <li class="form-item">
            <ul class="row w">
              <li class="col v-m g-3">验证码：</li>
              <li class="col v-m">
                <Input v-model="add.captcha" size="large" placeholder="验证码"/>
              </li>
              <li class="col v-m">
                <img @click="getcaptcha" style="margin-left:10px;" class="v-m captcha" :src="captcha" alt="">
              </li>
            </ul>
          </li>
          <li class="form-item">
            <ul class="row w">
              <li class="col v-m g-3"></li>
              <li class="col v-m">
                <p v-if="slide === '手机'" class="tip" style="color:#D84447;">密码默认是手机号码后6位。</p>
                <p v-if="slide === '邮箱'" class="tip" style="color:#D84447;">随机生成6位数字密码，并发送到以上邮箱！</p>
              </li>
            </ul>
          </li>
        </ul>
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
      <ul class="form" style="width:90%;margin-top:20px;">
        <li class="form-item">
          <ul class="row w">
            <li class="col v-m g-3">用户名：</li>
            <li class="col v-m">
              <Input v-model="currentData.username" size="large" placeholder="用户名"/>
            </li>
          </ul>
        </li>
        <li class="form-item">
          <ul class="row w">
            <li class="col v-m g-3">姓名：</li>
            <li class="col v-m">
              <Input v-model="currentData.name" size="large" placeholder="姓名"/>
            </li>
          </ul>
        </li>
        <li class="form-item">
          <ul class="row w">
            <li class="col v-m g-3">性别：</li>
            <li class="col v-m">
              <RadioGroup v-model="currentData.sex">
                <Radio :label="0">男</Radio>
                <Radio :label="1">女</Radio>
                <Radio :label="2">私密</Radio>
              </RadioGroup>
            </li>
          </ul>
        </li>
        <li class="form-item">
          <ul class="row w">
            <li class="col v-m g-3">生日：</li>
            <li class="col v-m">
              <DatePicker @on-change="dateChange" v-model="currentData.birthday" format="yyyy/MM/dd" type="date" placeholder="选择出生日期" style="width: 200px"></DatePicker>
            </li>
          </ul>
        </li>
        <li class="form-item">
          <ul class="row w">
            <li class="col v-m g-3">邮箱：</li>
            <li class="col v-m">
              <Input v-model="currentData.email" size="large" placeholder="邮箱"/>
            </li>
          </ul>
        </li>
        <li class="form-item">
          <ul class="row w">
            <li class="col v-m g-3">手机号：</li>
            <li class="col v-m">
              <Input v-model="currentData.phone" size="large" placeholder="手机号码"/>
            </li>
          </ul>
        </li>
        <li class="form-item">
          <ul class="row w">
            <li class="col v-m g-3">验证码：</li>
            <li class="col v-m">
              <Input v-model="edit.captcha" size="large" placeholder="验证码"/>
            </li>
            <li class="col v-m">
              <img @click="getcaptcha" style="margin-left:10px;" class="v-m captcha" :src="captcha" alt="">
            </li>
          </ul>
        </li>
      </ul>
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
import {userList, captcha, adminUserAdd, adminUserEdit, removeUser} from '@/config'
import plugins from '@/plugins'
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
      title: '用户管理',
      captcha: captcha,
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
        sex: 'null',
        name: ''
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
        title: '姓名',
        key: 'name'
      }, {
        title: '用户名',
        key: 'username'
      }, {
        title: '性别',
        key: 'sex',
        render: (h, params) => {
          const val = this.list[params.index][params.column.key]
          return plugins.filterSex(val)
        }
      }, {
        title: '邮箱',
        key: 'email'
      }, {
        title: '手机',
        key: 'phone'
      }, {
        title: '生日',
        key: 'birthday',
        render: (h, params) => {
          const timestamp = this.list[params.index][params.column.key]
          if (timestamp) {
            return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
          }
        }
      }, {
        title: '微信',
        key: 'wechat'
      }, {
        title: '注册时间',
        key: 'created_at',
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
      this.$router.push('/admin/user?page=' + page)
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
        url: userList,
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
      this.$router.replace('/admin/user?page=' + this.currentPage)
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
      console.log(this.search)
      console.log(this.between)
      this.getList()
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
