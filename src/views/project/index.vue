<template>
  <div class="project">
    <ul class="tab">
      <li>
        <router-link to="/project/all">全部</router-link>
      </li>
      <li v-if="category.length" v-for="(item, index) in category" :key="index">
        <router-link :to="'/project/' + item.value">{{item.name}}</router-link>
        <el-dropdown v-if="item.children.length" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="iconfont icon-listgrid"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :class="[form.limit.category === sub.value ? 'active' : '']" v-for="(sub, index) in item.children" :key="index" :command="sub.value">{{sub.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li class="do">
        <span class="v-m">时间排序：</span>
        <span @click="handleSort" v-if="form.sort === 'asc'" class="iconfont icon-paixu-jiangxu v-m"></span>
        <span @click="handleSort" v-if="form.sort === 'desc'" class="iconfont icon-paixu-shengxu v-m"></span>
      </li>
    </ul>
    <loading v-if="loading" name="tail-spin" style="height:700px;" :size="28">
      <span slot="text">正在努力加载，请稍后！</span>
    </loading>
    <empty v-if="!list.length && !loading" style="height:700px;">
      <img slot="icon" src="static/tip2.png" alt="">
      <span slot="text">这里还空空如也！</span>
    </empty>
    <div v-if="!loading">
      <ul class="project-list">
        <li v-for="(item, index) in list" :key="index">
          <div class="project-item">
            <div class="cover">
              <img v-if="cover(item.cover)" v-lazy="cover(item.cover).url" alt="">
              <div class="faild" v-if="!cover(item.cover)">
                <p class="iconfont icon-gaojingtupian"></p>
                <span>加载失败</span>
              </div>
            </div>
            <h2 class="title"><router-link :to="'/project/' + item.branch + '/' + item.category + '/' + item.uId">{{item.title}}</router-link></h2>
            <p class="tag">
              <el-tag size="mini" style="margin-right:4px;" v-for="(item, index) in tag(item.tag)" :key="index">{{item}}</el-tag>
            </p>
            <el-row>
              <el-col :span="10">
                <p class="time">
                  <span class="iconfont icon-hot"></span>
                  <span>{{item.download}}</span>
                </p>
              </el-col>
              <el-col :span="14" style="text-align:right;">
                <p class="time">
                  <span class="iconfont icon-time"></span>
                  <span>{{gettime(item.created_at)}}</span>
                </p>
              </el-col>
            </el-row>
          </div>
        </li>
      </ul>
      <el-button :loading="ispaging" v-if="!nomore && list.length" @click="paging" type="text" style="width:100%;margin-top:20px;"><span class="iconfont icon-gengduo v-m"></span><span class="v-m" style="margin-left:5px;">点击加载更多</span></el-button>
      <el-button v-if="nomore" type="text" style="width:100%;margin-top:20px;"><span class="iconfont icon-gengduo v-m"></span><span class="v-m" style="margin-left:5px;">没有更多！</span></el-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Loading from '@/components/loading'
import Empty from '@/components/empty'
import {project, ProjectCategory} from '@/config'
import moment from 'moment'
export default {
  name: 'project',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '项目',
      list: [],
      total: 0,
      category: [],
      loading: false,
      ispaging: false,
      activeCategory: '',
      lastpage: 1,
      nomore: false,
      form: {
        page: 1,
        pagesize: 8,
        sort: 'desc',
        limit: {
          branch: '',
          category: ''
        }
      }
    }
  },
  components: {
    Loading,
    Empty
  },
  created () {
    this.form.limit.branch = this.$route.params.branch
    this.form.limit.category = this.$route.params.category
    this.getCategory()
    this.getProject()
  },
  methods: {
    gettime (num) {
      return moment(parseInt(num) * 1000).calendar()
    },
    cover (str) {
      if (str) {
        return JSON.parse(str)
      }
    },
    tag (str) {
      if (str) {
        return str.split(',')
      }
    },
    getProject () {
      for (var item in this.form.limit) {
        if (!this.form.limit[item] || this.form.limit[item] === 'all') {
          delete this.form.limit[item]
        }
      }
      this.loading = !this.loading
      axios({
        method: 'get',
        url: project,
        params: this.form
      }).then(res => {
        console.log(res.data.data)
        if (res.data.status) {
          this.list = this.list.concat(res.data.data.data)
          this.total = res.data.data.total
          this.lastpage = res.data.data.last_page
          if (res.data.data.to === res.data.data.total) {
            this.nomore = true
          }
        }
        this.loading = !this.loading
        this.ispaging = false
      })
    },
    paging () {
      this.ispaging = true
      this.form.page += 1
      if (this.form.page <= this.lastpage) {
        this.getProject()
      } else {
        this.nomore = true
      }
    },
    getCategory () {
      axios({
        method: 'get',
        url: ProjectCategory
      }).then(res => {
        this.category = res.data.data
        console.log(this.category)
      })
    },
    handleCommand (command) {
      // this.limit.category = command
      this.$router.push('/project/' + this.form.limit.branch + '/' + command)
    },
    handleCategory (v, o) {
      this.form.page = 1
      this.list = []
      this.nomore = false
      this.form.limit.branch = v.params.branch
      this.form.limit.category = v.params.category
      this.getProject()
    },
    handleSort () {
      this.page = 1
      this.list = []
      if (this.form.sort === 'asc') {
        this.form.sort = 'desc'
      } else {
        this.form.sort = 'asc'
      }
      this.getProject()
    }
  },
  watch: {
    '$route': 'handleCategory'
  }
}
</script>
<style lang="scss" scoped>
.project{
  .project-list{
    font-size:0;
    margin:-10px;
    li{
      display:inline-block;
      vertical-align: top;
      width:25%;
      padding:10px;
      box-sizing: border-box;
      .project-item{
        display:inline-block;
        width:100%;
        border:1px solid #eee;
        border-radius: 5px;
        overflow:hidden;
        padding:10px;
        transition:0.3s;
        height:320px;
        &:hover{
          box-shadow:0 2px 5px #ccc;
        }
        .time{
          font-size:12px;
          color:#999;
          margin-top:10px;
          span{
            vertical-align: middle;
          }
        }
        .tag{
          min-height:30px;
          padding-top:5px;
        }
        .title{
          font-size:14px;
          font-weight:normal;
          padding:5px 0;
          display:block;
          height:50px;
          a{
            color:#666;
            &:hover{
              color:#D94447;
            }
          }
        }
        .cover{
          height:180px;
          background:#F5F5F5;
          overflow:hidden;
          border-radius:5px;
          font-size:12px;
          color:#DEDEDE;
          text-align:center;
          .faild{
            .iconfont{
              font-size:36px;
              margin-bottom:-10px;
            }
            display:inline-block;
            vertical-align: middle;
            text-align:center;
          }
          &:before{
            content:"";
            display:inline-block;
            width:0;
            height:100%;
            vertical-align:middle;
          }
          &:hover img{
            transform:scale(1.1)
          }
          img{
            width:100%;
            vertical-align: middle;
            transition:0.3s;
          }
        }
      }
    }
  }
  .el-pagination{
    text-align: center;
    margin-top:40px;
  }
  .tab{
    font-size:0;
    border-bottom:1px solid #eee;
    margin-bottom:20px;
    position: relative;
    .do{
      position: absolute;
      right:0;
      top:50%;
      transform: translate(-40px, -50%);
      .iconfont{
        font-size:22px;
        cursor: pointer;
        color:#999;
      }
    }
    li{
      display:inline-block;
      font-size:14px;
      a{
        color:#666;
        display:inline-block;
        padding:12px 20px;
      }
      .el-dropdown{
        position: absolute;
        right:0;
        top:50%;
        transform:translate(0,-50%);
        display:none;
        .iconfont{
          font-size:22px;
          cursor: pointer;
        }
      }
      .router-link-active{
        color:#007BFF;
        border-bottom:2px solid #007BFF;
      }
      .router-link-active + .el-dropdown{
        display:block;
      }
    }
  }
}
.el-dropdown-menu__item.active{
  color:#007BFF;
  background:#F0F7FF;
}
</style>
