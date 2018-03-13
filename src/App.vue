<template>
  <div id="app"
    :class="{
      'admin': admin
    }"
  >
    <app-header ref="header" :admin="admin"></app-header>
    <div class="content">
      <router-view class="mid-layout view"></router-view>
    </div>
    <app-footer v-if="!admin"></app-footer>
    <BackTop
      v-if="!admin"
      :height="0"
    ></BackTop>
  </div>
</template>

<script>
import AppHeader from './components/header'
import AppFooter from './components/footer'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
      admin: false
    }
  },
  methods: {
    change () {
      const path = this.$route.path.split('/')[1]
      this.admin = path === 'admin'
      this.$localStorage.set('admin', this.admin)
    }
  },
  watch: {
    '$route': 'change'
  }
}
</script>

<style>
html,body{margin:0;font-family:"PingFang SC";height:100%;}
.mid-layout{width:1200px;margin:0 auto;transition:0.3s;}
.admin .mid-layout{width:100%;}
.grid{font-size: 0;}
.grid-item{display: inline-block; vertical-align: top; height: 100%;}
.row{display: table; table-layout: fixed; border-collapse: collapse;}
.col{display: table-cell;}
.v-t{vertical-align: top;}
.v-m{vertical-align: middle;}
.v-b{vertical-align: bottom;}
.t-l{text-align: left;}
.t-c{text-align: center;}
.t-r{text-align: right;}
.g-24{width: 100%;}
.g-23{width: 95.8%;}
.g-22{width: 91.6%;}
.g-21{width: 87.5%;}
.g-20{width: 83.3%;}
.g-19{width: 79.1%;}
.g-18{width: 75%;}
.g-17{width: 70.8%;}
.g-16{width: 66.6%;}
.g-15{width: 62.5%;}
.g-14{width: 58.3%;}
.g-13{width: 54.1%;}
.g-12{width: 50%;}
.g-11{width: 45.8%;}
.g-10{width: 41.6%;}
.g-8{width: 37.5%;}
.g-8{width: 33.3%;}
.g-7{width: 29.1%;}
.g-6{width: 25%;}
.g-5{width: 20.8%;}
.g-4{width: 16.6%;}
.g-3{width: 12.5%;}
.g-2{width: 8.3%;}
.g-1{width: 4.2%;}
.w{width:100%;}.h{height:100%;}
.content{padding:70px 0 20px 0;min-height:100px;box-sizing:border-box;}
h1,h2,h3,h4,h5,h6,p,ul{margin:0;padding:0;list-style:none;}
input:focus,button:focus{outline:none;}
.view{background:#fff;min-height:700px;}
.form{margin:0 auto;}
.form.more{border:1px solid #F0F0F0;}
.form.more .form-item{height:45px;border-top:1px solid #F0F0F0;margin:0;}
.form.more .form-item:first-child{border-top:none;}
.form.more .form-item .col{padding:0 10px;}
.ivu-poptip-body{padding:16px;}
.form.more .form-item .col:first-child{background:#f9f9f9;}
.form-row input{display:inline-block;width:100%;border:1px solid #f0f0f0;font-size:14px;padding:8px 10px;box-sizing:border-box;transition:0.3s;font-family:"PingFang SC";}
.form-row input::-webkit-input-placeholder{color:#999;}
.form-row input:focus{box-shadow:0 1px 5px #ccc;}
.form-item .label{font-size:14px;color:#303133;display:inline-block;font-weight:Normal;padding:5px 0;}
.form-item .value{font-size:14px;color:#666;display:inline-block;vertical-align: middle;}
.form-item{margin-bottom:10px;}
.inline .form-item{height:40px;}
.form-item .row{height:100%;}
.form-item .tip{font-size:14px;color:#999;display:inline-block;vertical-align: middle;}
.button{display:inline-block;border:none;font-size:16px;font-family:"PingFang SC";padding:10px 40px;color:#fff;border-radius:3px;cursor:pointer;transition:0.3s;}
.button span{display:inline-block;vertical-align:middle;}
.button .iconfont{margin-right:10px;}
.button .icon-loading{display:none;}
.loading .icon-loading{display:inline-block;animation:loading 1s infinite;-webkit-animation:loading 1s infinite;}
.button:hover{opacity:0.8;filter:alpha(opacity=80);}
.button:active{opacity:1;filter:alpha(opacity=100);}
.button.primary{background:#2D86D8;}
.form-info{font-size:14px;margin-top:30px;}
.form-info a{color:#2D86D8;margin:0 0.5em;}
.page-title{font-size:16px;padding:10px;border-bottom:1px solid #f0f0f0;margin-top:-10px;position:relative;color:#2C8EDB;}
.page-title:before{content:"";display:inline-block;width:3px;height:18px;background:#2C8EDB;position:absolute;left:0;top:50%;margin-top:-9px;}
.btn-area{border-top:1px solid #f5f5f5;padding:20px;margin-top:40px;margin-bottom:20px;}
.page-view{padding:20px;}
.captcha:hover{cursor:pointer;}
.banner{width:100%;margin-bottom:10px;}
.ivu-input{border-color:#F0F0F0;transition:0.3s;}
.ivu-input:hover{border-color:#f0f0f0;}
.ivu-input:focus{box-shadow:0 1px 5px #ccc;border-color:#f0f0f0}
.admin{padding-top:50px;box-sizing:border-box;height:100%;}
.admin .content{height:100%;padding:0;}
.admin .header{margin:-50px 0 0 0;}
.el-menu-item{color:rgba(255,255,255,0.7) !important;}
.el-menu-item:hover,.el-submenu__title:hover{background:none !important;}
.el-menu-item.is-active{background:rgba(0,0,0,0.2) !important;}
.el-submenu__title{color:rgba(255,255,255,0.7) !important;}
.el-menu-item i,.el-submenu__title i{color:rgba(255,255,255,0.7);}
.el-menu-item-group__title{color:rgba(255,255,255,0.6)}
@keyframes loading {
  form {
    transform:rotate(0deg)
  }
  to {
    transform:rotate(360deg)
  }
}
.el-upload-dragger,.el-upload{
  width:100% !important;
}
</style>
