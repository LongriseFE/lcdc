<template>
  <div class="h grid">
    <div class="grid-item h aside">
      <el-menu
        background-color="rgba(0,0,0,0)"
        text-color="#fff"
        active-text-color="#D94447"
        @select="jump"
        :default-active="activePage">
        <el-menu-item index="/admin/welcome">
          <i class="el-icon-menu"></i>
          <span slot="title">欢迎页</span>
        </el-menu-item>
        <el-menu-item index="/admin/user">
          <i class="el-icon-setting"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/project">
          <i class="el-icon-setting"></i>
          <span slot="title">项目管理</span>
        </el-menu-item>
        <el-submenu index="/admin/setting">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>综合设置</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分类设置</template>
            <el-menu-item index="/admin/setting/department">部门</el-menu-item>
            <el-menu-item index="/admin/setting/project">项目</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="其他">
            <el-menu-item index="/admin/setting/theme">主题设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="grid-item h admin-content">
      <transition name="fade">
        <router-view name="admin"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'admin',
  data () {
    return {
      activePage: '/admin/welcome'
    }
  },
  created () {
    this.activePage = this.$route.name
  },
  methods: {
    jump (index, path) {
      this.$router.replace(index)
    }
  }
}
</script>
<style lang="scss" type="text/css">
.el-menu{
  border:none;
}
.admin{
  padding-top:60px;
  .view{
    padding-left: 220px;
    .aside{
      width:220px;
      background:#495060;
      margin-left:-220px;
    }
    .admin-content{
      width:100%;
      overflow:hidden;
      .page-view{
        width:100%;
        height:100%;
        font-size:14px;
        padding:0;
        padding-top:55px;
        padding-bottom:45px;
        box-sizing:border-box;
        .page-title{
          margin-top:-55px;
          padding:10px 10px 10px 25px;
          &:before{
            left:10px;
          }
        }
        .admin-main{
          height:100%;
          padding:10px;
          box-sizing:border-box;
        }
        .page-area{
          width:100%;
          height:45px;
          background:#f6f7f7;
          .col{padding:0 10px;}
        }
      }
    }
  }
  .header{
    background:#363E4F;
    height:60px;
    margin-top:-60px;
    position:static;
  }
}
.el-menu-item-group__title{
  color:rgba(255,255,255,0.8) !important;
}
.el-menu-item i,.el-submenu__title i{
  color:rgba(255,255,255,0.8) !important;
}
</style>
