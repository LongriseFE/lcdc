<template>
  <div
    class="header"
  >
    <ul
      class="mid-layout row h"
    >
      <li class="col v-m g-6">
        <router-link to="/home" title="返回首页">
          <img class="logo" src="static/logo01.png" alt="">
        </router-link>
      </li>
      <li class="col v-m nav t-l" v-if="!admin">
        <router-link to="/home">首页</router-link>
        <router-link to="/project">项目</router-link>
        <router-link to="/pan">网盘</router-link>
      </li>
      <li class="col v-m user g-8 t-r">
        <!-- <router-link title="抽奖" to="/luck" class="v-m" v-if="userInfo && userInfo.status >= 5 && !admin">
          <span class="iconfont icon-choujiang"></span>
          <span class="drop">奖</span>
        </router-link>
        <Poptip placement="bottom" width="200">
          <span class="v-m iconfont cursor icon-erweima"></span>+
          <div class="code" slot="content"></div>
        </Poptip> -->
        <Poptip placement="bottom" width="80" style="margin: 0 0.05em;">
          <span class="v-m iconfont cursor icon-zhuti"></span>
          <div class="code" slot="content">
            <ul class="theme-list">
              <li class="row w" v-for="(item, index) in theme" :key="index">
                <span class="col v-m">
                  <span class="bar" :style="'background-color:' + item.color1"></span>
                </span>
                <span class="col v-m">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </Poptip>
        <router-link title="网站" to="/" class="v-m" v-if="userInfo && userInfo.status >= 5 && admin">
          <span class="iconfont icon-web3"></span>
        </router-link>
        <router-link title="后台管理" to="/admin" class="v-m" v-if="userInfo && userInfo.status >= 5 && !admin">
          <span class="iconfont icon-guanliyuan"></span>
        </router-link>
        <router-link to="admin/message" class="v-m" v-if="userInfo && admin">
          <span class="iconfont icon-xiaoxi"></span>
          <span class="num" v-if="message.length>0">{{message.length}}</span>
        </router-link>
        <router-link to="/message" class="v-m" v-if="userInfo && !admin">
          <span class="iconfont icon-xiaoxi"></span>
          <span class="num" v-if="message.length>0">{{message.length}}</span>
        </router-link>
        <router-link to="/admin" class="logined v-m" v-if="userInfo && admin">
          <span v-if="userInfo.cover" class="v-m">
            <img :src="file + userInfo.cover" alt="">
          </span>
          <span v-if="!userInfo.cover" class="iconfont icon-denglu v-m"></span>
          <span class="v-m">{{userInfo.username}}</span>
        </router-link>
        <router-link to="/personer" class="logined v-m" v-if="userInfo && !admin">
          <span v-if="userInfo.cover" class="v-m">
            <img :src="file + userInfo.cover" alt="">
          </span>
          <span v-if="!userInfo.cover" class="iconfont icon-denglu v-m"></span>
          <span class="v-m">{{userInfo.name || userInfo.username}}</span>
        </router-link>
        <span class="unlogin v-m" v-if="!userInfo">
          <router-link to="/login" class="iconfont icon-denglu"></router-link>
        </span>
        <router-link to="/logout" class="iconfont icon-tuichu v-m" v-if="userInfo"></router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {file, message, userInfo, themeList} from '@/config'
import axios from 'axios'
export default {
  name: 'headers',
  data () {
    return {
      file: file,
      userInfo: null,
      message: [],
      theme: []
    }
  },
  props: {
    admin: {
      type: Boolean
    }
  },
  created () {
    this.userInfo = JSON.parse(this.$localStorage.get('userInfo'))
    this.getUserInfo()
    this.getMessage()
    this.getTheme()
  },
  methods: {
    getMessage () {
      if (!this.userInfo) {
        this.message = []
        return false
      }
      axios({
        method: 'get',
        url: message,
        params: {
          uId: this.userInfo.uId,
          recieve: -1,
          read: 0,
          pagesize: 100
        }
      }).then(res => {
        if (res.data.status) {
          this.message = res.data.data.data
        }
      })
    },
    getUserInfo () {
      if (this.userInfo) {
        axios({
          method: 'get',
          url: userInfo,
          params: {
            uId: this.userInfo.uId
          }
        }).then(res => {
          if (res.data.status) {
            this.userInfo = res.data.data
            this.$localStorage.set('userInfo', JSON.stringify(this.userInfo))
          }
        })
      }
    },
    getTheme () {
      axios({
        method: 'get',
        url: themeList,
        params: {
          sort: 'asc'
        }
      }).then(res => {
        this.theme = res.data.data
      })
    }
  },
  watch: {
    userInfo (v, o) {
      this.getMessage()
    }
  }
}
</script>
<style>
.header{background:#434B50;color:#fff;height:50px;position:fixed;width:100%;top:0;left:0;z-index:100;}
.logo{width:240px;}
.nav a{display:inline-block;text-decoration:none;color:rgba(255,255,255,0.8);font-size:14px;padding:0 2em;height:50px;line-height:50px;}
.nav .router-link-active{color:rgba(255,255,255,1);background:rgba(0,0,0,0.2);}
.user a{display:inline-block;text-decoration:none;color:rgba(255,255,255,0.8);font-size:18px;padding:0 0.5em;position:relative;}
.user a .drop{position:absolute;display:inline-block;background:#D94447;font-size:10px;width:auto;border-radius:3px;padding:0 3px;box-sizing:border-box;top:-8px;right:0;text-align:center;-webkit-transform:scale(0.85);}
.user span a{padding:0 0.2em;}
.user span{font-size:14px;}
.user .iconfont{font-size:18px;color:rgba(255,255,255,0.8);}
.user img{width:32px;height:32px;vertical-align: middle;border-radius:50%;}
.user .num{display:inline-block;min-width:14px;height:14px;position:absolute;top:-5px;background:#D94447;text-align:center;line-height:14px;border-radius:50%;font-size:12px;right:0;}
.theme-list .col{font-size:14px;color:#666;text-align:left;vertical-align: middle;padding:10px;}
.theme-list .col:first-child{width:30%;text-align:right;padding-right:0;}
.theme-list .bar{display:inline-block;width:14px;height:14px;vertical-align:middle;border-radius:4px;margin-top:-2px;}
.theme-list .row:hover{background:#eee;}
.ivu-poptip-body{padding:0;}
</style>
