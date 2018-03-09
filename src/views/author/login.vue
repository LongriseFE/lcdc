<template>
  <div class="author page-view">
    <ul class="form" style="width:50%;padding-top:50px;">
      <li class="form-item">
        <h2 class="label">用户名</h2>
        <div class="form-row">
          <input v-model="user" type="text" placeholder="请填写用户名\邮箱\手机号!">
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">密码</h2>
        <div class="form-row">
          <input v-model="form.password" type="password" placeholder="请填写密码!">
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">验证码</h2>
        <div class="row w">
          <div class="col v-m">
            <div class="form-row">
              <input v-model="form.captcha" type="text" placeholder="请填写5位验证码！">
            </div>
          </div>
          <div class="col v-m" style="padding-left:20px;">
            <img style="cursor:pointer;" @click="getcaptcha" class="v-m" :src="captcha" alt="">
            <span class="tip v-m">点击验证码刷新！</span>
          </div>
        </div>
      </li>
      <li class="form-item" style="margin-top:50px;">
        <button class="button primary"
          :class="{
            'loading': loading
          }"
          style="width:100%;"
          @click="submit"
        ><span class="iconfont icon-loading"></span><span>登录</span></button>
      </li>
      <li class="form-item">
        <ul class="form-info row w">
          <li class="col v-m">
            还没有账号？前往<router-link to="/register">注册</router-link>
          </li>
          <li class="col v-m t-r">
            <router-link to="/remember">忘记密码？</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import {login, captcha} from '@/config'
export default {
  name: 'login',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '用户登录',
      loading: false,
      prev: '',
      captcha: captcha,
      user: 'swimly',
      form: {
        password: '122514',
        captcha: ''
      }
    }
  },
  created () {
    this.prev = this.$route.query.prev
  },
  methods: {
    getcaptcha () {
      this.captcha = this.captcha + '?' + new Date()
    },
    submit () {
      const phone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      const email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (!this.user) {
        this.$Message.warning('请填写用户名、邮箱或者手机号！')
      } else if (!this.form.password) {
        this.$Message.warning('请填写登录密码！')
      } else if (!this.form.captcha) {
        this.$Message.warning('请填写图片验证码！')
      } else {
        if (email.test(this.user)) {
          this.form.email = this.user
        } else if (phone.test(this.user)) {
          this.form.phone = this.user
        } else {
          this.form.username = this.user
        }
        this.loading = true
        axios({
          url: login,
          method: 'get',
          params: this.form
        }).then(res => {
          console.log(res)
          if (res.data.status) {
            this.$Message.success(res.data.msg)
            this.loading = false
            this.$parent.$refs.header.userInfo = res.data.data
            this.$localStorage.set('userInfo', JSON.stringify(res.data.data))
            if (this.prev) {
              this.$router.replace(this.prev)
            } else {
              this.$router.replace('/')
            }
          } else {
            this.getcaptcha()
            this.$Message.error(res.data.msg)
            this.loading = false
          }
        })
      }
    }
  }
}
</script>
<style>

</style>
