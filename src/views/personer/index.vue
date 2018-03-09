<template>
  <div class="personer grid">
    <div class="aside grid-item g-5">
      <div class="face">
        <img :src="file + userInfo.cover" alt="">
      </div>
      <div class="aside-menu">
        <router-link to="/personer/info" class="row w">
          <span class="col v-m">
            <span class="iconfont icon-userinfo" style="background:#2A9BDF;"></span>
          </span>
          <span class="col v-m">个人信息</span>
        </router-link>
        <router-link to="/personer/face" class="row w">
          <span class="col v-m">
            <span class="iconfont icon-face" style="background:#F57905;"></span>
          </span>
          <span class="col v-m">修改头像</span>
        </router-link>
        <router-link to="/personer/message" class="row w">
          <span class="col v-m">
            <span class="iconfont icon-notice" style="background:#62B948;"></span>
          </span>
          <span class="col v-m">消息</span>
        </router-link>
        <router-link to="/personer/collection" class="row w">
          <span class="col v-m">
            <span class="iconfont icon-shoucang" style="background:#F57905;"></span>
          </span>
          <span class="col v-m">收藏</span>
        </router-link>
        <router-link to="/personer/download" class="row w">
          <span class="col v-m">
            <span class="iconfont icon-xiazai" style="background:#F7050F;"></span>
          </span>
          <span class="col v-m">下载记录</span>
        </router-link>
        <router-link to="/personer/phone" class="row w">
          <span class="col v-m">
            <span class="iconfont icon-phone" style="background:#62B948;"></span>
          </span>
          <span class="col v-m">更换手机</span>
        </router-link>
        <router-link to="/personer/email" class="row w">
          <span class="col v-m">
            <span class="iconfont icon-email" style="background:#2A9BDF;"></span>
          </span>
          <span class="col v-m">更换邮箱</span>
        </router-link>
        <router-link to="/personer/password" class="row w">
          <span class="col v-m">
            <span class="iconfont icon-iconfontmima" style="background:#F57905;"></span>
          </span>
          <span class="col v-m">修改密码</span>
        </router-link>
      </div>
    </div>
    <div class="content grid-item g-19">
      <router-view name="content"></router-view>
    </div>
  </div>
</template>
<script>
import {file} from '@/config'
export default {
  name: 'personer',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '个人中心',
      userInfo: null,
      file: file
    }
  },
  created () {
    this.userInfo = JSON.parse(this.$localStorage.get('userInfo'))
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
.personer{
  .face{
    display: block;
    overflow: hidden;
    width:120px;
    height: 120px;
    border-radius:50%;
    margin:20px auto 5px auto;
    img{
      width:100%;
    }
  }
  .aside{
    padding-left:20px;
    box-sizing:border-box;
    .aside-menu{
      margin-top:40px;
      display: block;
      .router-link-active{
        background:#f5f5f5;
      }
      .row{
        font-size:14px;
        color:#333;
        border-bottom:1px solid #f5f5f5;
      }
      .col{
        margin:0;
        padding:15px 10px;
        box-sizing:border-box;
        &:first-child{
          width:30%;text-align:center;
        }
        .iconfont{
          margin:0;
          display:inline-block;
          width:24px;
          height: 24px;
          line-height:24px;
          text-align:center;
          background: #ccc;
          border-radius:50%;
          color:#fff;
          font-size:16px;
        }
      }
    }
  }
  .content{
    font-size:14px;
    padding-left:40px;
    padding-right:20px;
  }
}

</style>
