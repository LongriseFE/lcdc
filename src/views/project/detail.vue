<template>
  <div class="detail">
    <iframe :src="downUrl" style="height:0;" frameborder="0"></iframe>
    <el-row v-if="info">
      <el-col :span="18" style="padding-right:40px;" class="article">
        <div class="router">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
            <el-breadcrumb-item to="/project">项目</el-breadcrumb-item>
            <el-breadcrumb-item :to="'/project/' + info.branch.value">{{info.branch.name}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="'/project/' + info.branch.value + '/' + info.category.value">{{info.category.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div v-html="info.html" style="margin-bottom:50px;"></div>
        <el-row>
          <el-col style="text-align:center;padding-bottom:20px;">
            <span @click="setThumbs" title="点赞" class="thumb-button" :class="info.praise ? 'active' : ''">
              <i class="iconfont icon-zan"></i>
              <span v-if="!info.praise">点赞</span>
              <span v-if="info.praise">取消</span>
            </span>
          </el-col>
          <el-col style="text-align:center;margin-bottom:40px;background:#f5f5f5;padding:3px 0;">
            <router-link class="raise" to="" v-for="(item, index) in info.praiselist.data" :key="index">
              <span class="cover">
                <img :src="file + item.cover" alt="">
              </span>
              <b>{{item.name}}</b>
            </router-link>
            <span style="display:inline-block;vertical-align:middle;font-size:14px;color:#666;">等<span style="color:#D94447;font-size:18px;margin:0 5px;">{{info.praiselist.total}}</span>人觉得很赞！</span>
          </el-col>
        </el-row>
        <h3 class="title">评论 <span class="count"><i>{{total}}</i>条评论</span></h3>
        <ul class="comments" v-if="comments.length">
          <li v-for="(item, index) in comments" :key="index">
            <div class="comment-item">
              <h2>
                <router-link :to="'/user/' + item.from.uId" v-if="item.from">
                  <img :src="file + item.from.cover" alt="">
                  <span>{{item.from.name}}</span>
                </router-link>
                <span>于</span>
                <span>{{gettime(item.created_at)}}</span>
                <span>评论：</span>
                <span v-if="item.to">
                  <img :src="file + item.to.cover" alt="">
                  <span>{{item.to.name}}</span>
                </span>
                <i class="time">
                  <el-button @click="reback(item)" type="text">回复({{item.children.length}})</el-button>
                </i>
              </h2>
              <p>{{item.content}}</p>
            </div>
            <ul class="sub" v-if="item.children">
              <li v-for="(i, index) in item.children" :key="index">
                <div class="comment-item">
                  <h2>
                    <router-link :to="'/user/' + i.from.uId" class="v-m">{{i.from.name}}</router-link>
                    <span>回复</span>
                    <router-link :to="'/user/' + i.to.uId" class="v-m">{{i.to.name}}</router-link>
                    <span style="margin-left:1em;">{{gettime(i.created_at)}}</span>
                    <i class="time"><el-button @click="rebacks(item, i)" type="text">回复</el-button></i>
                  </h2>
                  <p>{{i.content}}</p>
                </div>
              </li>
            </ul>
            <el-input
              type="textarea"
              :rows="2"
              :placeholder="'回复' + item.from.name"
              v-if="item.reply"
              v-model="reply.content">
            </el-input>
          </li>
        </ul>
        <empty v-if="!comments.length && userInfo">
          <img slot="icon" src="static/tip1.png" alt="">
          <span slot="text">还没有任何评论，快来抢沙发！</span>
        </empty>
        <empty v-if="!userInfo">
          <img slot="icon" src="static/tip1.png" alt="">
          <span slot="text">还没有任何评论，快来抢沙发！<router-link :to="'/login?prev=' + route.path">前往登录！</router-link></span>
        </empty>
        <el-input
          v-if="userInfo"
          style="margin-bottom:10px;"
          type="textarea"
          :rows="4"
          :placeholder="reply.parentId ? '回复：' + rebacker.from.name : '评论内容'"
          v-model="reply.content">
        </el-input>
        <el-button v-if="userInfo" @click="submit" type="primary" v-text="reply.parentId ? '回复' : '评论'"></el-button>
      </el-col>
      <el-col :span="6" class="article-info">
        <h2 class="title">详情</h2>
        <el-form style="margin-bottom:20px;">
          <el-form-item label="标题：">
            {{info.title}}
          </el-form-item>
          <el-form-item label="分类：">
            {{info.branch.name}}>{{info.category.name}}
          </el-form-item>
          <el-form-item label="标签：" v-if="info.tag">
            <el-tag style="margin-right:5px;" size="mini" v-for="(item, index) in info.tag.split(',')" :key="index">{{item}}</el-tag>
          </el-form-item>
          <el-form-item label="作者：">
            {{info.author.name}}
          </el-form-item>
          <el-form-item label="发布时间：">
            {{gettime(info.created_at)}}
          </el-form-item>
          <el-form-item label="修改时间：">
            {{gettime(info.updated_at)}}
          </el-form-item>
          <el-form-item label="浏览量：">
            {{info.view}}次
          </el-form-item>
          <el-form-item label="下载量：">
            {{info.download}}次
          </el-form-item>
          <el-form-item v-if="info.attach">
            <el-button v-for="(item, index) in info.attach" :key="index" @click="down(item)" type="primary" round style="width:100%;margin-bottom:20px;">下载附件</el-button>
            <span></span>
            <el-button @click="addCollection" v-if="!info.collection" type="danger" round style="width:100%;margin-bottom:50px;">收藏</el-button>
            <el-button @click="addCollection" plain v-if="info.collection" type="danger" round style="width:100%;margin-bottom:50px;">取消收藏</el-button>
          </el-form-item>
        </el-form>
        <h2 class="title">最受欢迎</h2>
        <ul class="list">
          <li v-for="(item, index) in info.related" :key="index">
            <router-link :to="'/project/' + item.branch + '/' + item.category + '/' + item.uId"><i class="tag">{{index + 1}}</i>{{item.title}}</router-link>
            <span>{{moment(parseInt(item.updated_at) * 1000).startOf('hour').fromNow()}}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {projectInfo, download, comments, file, commentAdd, praise, collectionadd} from '@/config'
import axios from 'axios'
import Empty from '@/components/empty'
import moment from 'moment'
import { setTimeout } from 'timers'
export default {
  name: 'projectInfo',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '文章详情',
      info: null,
      comments: [],
      file: file,
      total: 0,
      downUrl: '',
      pagesize: 100,
      userInfo: JSON.parse(this.$localStorage.get('userInfo')),
      defaultProps: {
        children: 'children',
        label: 'content'
      },
      route: this.$route,
      reply: {
        content: '',
        topicId: this.$route.params.uId,
        topicType: 0,
        parentId: '',
        fromId: '',
        toId: ''
      },
      rebacker: {}
    }
  },
  components: {
    Empty
  },
  created () {
    if (this.userInfo) {
      this.reply.fromId = this.userInfo.uId
    }
    this.getInfo()
  },
  methods: {
    addCollection () {
      axios({
        methods: 'get',
        url: collectionadd,
        params: {
          target: this.$route.params.uId,
          user: this.userInfo.uId
        }
      }).then(res => {
        if (res.data.status) {
          if (res.data.status === 1) {
            this.info.collection = 1
          } else if (res.data.status === 2) {
            this.info.collection = 0
          }
          this.getInfo()
        }
      })
    },
    gettime (num) {
      return moment(parseInt(num) * 1000).calendar()
    },
    reback (item) {
      this.reply.parentId = item.uId
      this.reply.toId = item.fromId
      this.rebacker = item
      this.reply.fromId = JSON.parse(this.$localStorage.get('userInfo')).uId
    },
    rebacks (item, items) {
      this.reply.parentId = item.uId
      this.reply.toId = items.fromId
      this.rebacker = items
      this.reply.fromId = JSON.parse(this.$localStorage.get('userInfo')).uId
    },
    submit () {
      if (!this.reply.content || this.reply.content.length < 6) {
        this.$message.error('评论内容必须长于6位字符！')
        return false
      }
      console.log(this.reply)
      axios({
        method: 'get',
        url: commentAdd,
        params: this.reply
      }).then(res => {
        console.log(res)
        this.reply.content = ''
        this.getComments()
      })
    },
    down (item) {
      console.log(item)
      this.downUrl = download + '?url=' + item.name + '&name=' + this.info.title + '&uId=' + this.info.uId
      setTimeout(() => {
        this.getInfo()
      }, 1000)
    },
    getInfo () {
      this.reply.topicId = this.$route.params.uId
      axios({
        method: 'get',
        url: projectInfo,
        params: {
          uId: this.$route.params.uId,
          vistor: this.userInfo.uId
        }
      }).then(res => {
        this.info = res.data.data
        console.log(this.info)
        var attach = this.info.attach.split('-')
        attach.forEach((item, index) => {
          attach[index] = JSON.parse(item)
        })
        this.info.attach = attach
        this.title = res.data.data.title
        this.$emit('updateHead')
        this.getComments()
        // console.log(this.info)
      })
    },
    getComments () {
      this.total = 0
      this.comments = []
      axios({
        method: 'get',
        url: comments,
        params: {
          topicId: this.$route.params.uId,
          pagesize: this.pagesize
        }
      }).then(res => {
        this.total = res.data.total
        this.comments = res.data.data.data
      })
    },
    setThumbs () {
      axios({
        methods: 'get',
        url: praise,
        params: {
          target: this.$route.params.uId,
          user: this.userInfo.uId
        }
      }).then(res => {
        if (res.data.status) {
          if (res.data.status === 1) {
            this.info.praise = 1
          } else if (res.data.status === 2) {
            this.info.praise = 0
          }
          this.getInfo()
        }
      })
    }
  },
  watch: {
    '$route': 'getInfo'
  }
}
</script>
<style lang="scss">
.article{
  img{
    max-width:100%;
  }
  .raise{
    text-align:center;
    display:inline-block;
    margin:0 5px;
    .cover{
      display:inline-block;
      vertical-align: middle;
      width:30px;
      height:30px;
      border-radius:50%;
      overflow:hidden;
      border:1px solid #eee;
    }
    b{
      display:inline-block;
      vertical-align: middle;
      font-weight:normal;
      font-size:14px;
      padding:5px 0;
    }
  }
  .thumb-button{
    display:inline-block;
    width:90px;
    height:90px;
    background:#F56C6C;
    border-radius:50%;
    text-align:center;
    font-size:14px;
    color:#fff;
    cursor: pointer;
    transition:0.3s;
    &.active{
      background:none;
      color:#F56C6C;
      border:1px solid #F56C6C;
    }
    .iconfont{
      display:block;
      height:50px;
      line-height:65px;
      font-size:26px;
    }
  }
  p{
    font-size:14px;
    line-height:1.8;
    text-indent:2em;
  }
  .title{
    font-weight:normal;
    font-size:18px;
    color:#333;
    border-bottom:1px solid #eee;
    padding:0 10px 10px 10px;
    margin-bottom:20px;
    position: relative;
    .count{
      position: absolute;
      right:0;
      top:50%;
      transform:translate(0, -50%);
      font-size:14px;
      color:#999;
      i{
        font-style:normal;
        font-size:24px;
        margin-right:5px;
        color:#F56C6C;
      }
    }
  }
  .router{
    padding:10px 0;
    border-bottom:1px solid #eee;
    margin-bottom:20px;
  }
}
.article-info{
  .title{
    font-weight:normal;
    font-size:14px;
    color:#666;
    margin-bottom:10px;
    padding: 8px 10px;
    background:#f5f5f5;
  }
  .el-form-item{
    margin-bottom:0;
    font-size:14px;
    padding:0 10px;
  }
}
.list{
  li{
    display:table;
    width:100%;
    font-size:14px;
    border-bottom:1px dashed #eee;
    a,span{
      display:table-cell;
      padding:10px;
      color:#666;
      .tag{
        display:inline-block;
        margin-right:5px;
        font-style:normal;
        width:16px;
        height:16px;
        background:#ccc;
        color:#fff;
        text-align:center;
        line-height:16px;
        vertical-align: middle;
        border-radius:50%;
        font-size:12px;
      }
    }
    &:nth-child(1) .tag{
      background:#F56C6C;
    }
    &:nth-child(2) .tag{
      background:#E6A23C;
    }
    &:nth-child(3) .tag{
      background:#909399;
    }
    span{
      text-align:right;
      font-size:12px;
      color:#999;
    }
  }
}
.comments{
  font-size:14px;
  .sub{
    padding:10px 0 10px 30px;
  }
  .comment-item{
    h2{
      font-size:12px;
      font-weight:normal;
      color:#999;
      position: relative;
      background:#fdfdfd;
      padding:5px 10px;
      img{
        width:24px;
        height:24px;
        border-radius:50%;
        vertical-align: middle;
        margin-right:5px;
        border:none;
      }
      span{
        display:inline-block;
        vertical-align: middle;
      }
      .time{
        position: absolute;
        right:10px;
        top:50%;
        transform:translate(0,-50%);
        font-style:normal;
      }
    }
  }
  p{
    font-size:14px;
    color:#666;
    line-height:1.8;
    padding:10px;
    text-indent:2em;
  }
}
</style>
