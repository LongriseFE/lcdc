<template>
  <div class="author page-view">
    <div class="t-c" style="margin-top:20px;">
      <RadioGroup v-model="type" type="button" size="large">
        <Radio label="邮箱注册">邮箱注册</Radio>
        <Radio label="手机注册">手机注册</Radio>
      </RadioGroup>
    </div>
    <ul class="form" style="width:50%;padding-top:20px;" v-if="type === '邮箱注册'">
      <li class="form-item">
        <h2 class="label">用户名</h2>
        <div class="form-row">
          <input v-model="form.username" type="text" placeholder="请填写用户名\邮箱\手机号!">
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">邮箱</h2>
        <div class="form-row">
          <input v-model="form.email" type="text" placeholder="请填写密码!">
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">图片验证码</h2>
        <div class="row w">
          <div class="col v-m g-8">
            <div class="form-row">
              <input v-model="form.captcha" type="text" placeholder="请填写5位验证码！">
            </div>
          </div>
          <div class="col v-m g-6" style="padding-left:10px;">
            <img style="cursor:pointer;" @click="getcaptcha" class="v-m" :src="captcha" alt="">
          </div>
          <div class="col v-m g-10">
            <Button @click="sendMail" :loading="sending" type="success" :disabled="form.captcha.length < 5"  v-if="!send" size="large">发送邮件验证码</Button>
            <Button type="ghost" disabled v-if="send"  size="large">{{time}}s重新获取</Button>
          </div>
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">邮箱验证码</h2>
        <div class="form-row">
          <input v-model="form.code" type="text" placeholder="请填写密码!">
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">密码</h2>
        <div class="form-row">
          <input v-model="form.password" type="password" placeholder="请填写密码!">
        </div>
      </li>
      <li class="form-item" style="margin-top:50px;">
        <button class="button primary"
          :class="{
            'loading': loading
          }"
          style="width:100%;"
          @click="submit"
        ><span class="iconfont icon-loading"></span><span>注册</span></button>
      </li>
      <li class="form-item">
        <ul class="form-info row w">
          <li class="col v-m">
            已经有账号？前往<router-link to="/login">登录</router-link>
          </li>
          <li class="col v-m t-r">
            <router-link to="/remember">忘记密码？</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="form" style="width:50%;padding-top:20px;" v-if="type === '手机注册'">
      <li class="form-item">
        <h2 class="label">用户名</h2>
        <div class="form-row">
          <input v-model="form.username" type="text" placeholder="请填写用户名\邮箱\手机号!">
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">手机号</h2>
        <div class="form-row">
          <input v-model="form.phone" type="text" placeholder="请填写密码!">
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">图片验证码</h2>
        <div class="row w">
          <div class="col v-m g-8">
            <div class="form-row">
              <input v-model="form.captcha" type="text" placeholder="请填写5位验证码！">
            </div>
          </div>
          <div class="col v-m g-6" style="padding-left:10px;">
            <img style="cursor:pointer;" @click="getcaptcha" class="v-m" :src="captcha" alt="">
          </div>
          <div class="col v-m g-10">
            <Button @click="sendsms" :loading="sending" type="success" :disabled="form.captcha.length < 5"  v-if="!send" size="large">发送手机验证码</Button>
            <Button type="ghost" disabled v-if="send"  size="large">{{time}}s重新获取</Button>
          </div>
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">手机验证码</h2>
        <div class="form-row">
          <input v-model="form.code" type="text" placeholder="请填写密码!">
        </div>
      </li>
      <li class="form-item">
        <h2 class="label">密码</h2>
        <div class="form-row">
          <input v-model="form.password" type="password" placeholder="请填写密码!">
        </div>
      </li>
      <li class="form-item" style="margin-top:50px;">
        <button class="button primary"
          :class="{
            'loading': loading
          }"
          style="width:100%;"
          @click="submit"
        ><span class="iconfont icon-loading"></span><span>注册</span></button>
      </li>
      <li class="form-item">
        <ul class="form-info row w">
          <li class="col v-m">
            已经有账号？前往<router-link to="/login">登录</router-link>
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
import {register, sendMail, sms, captcha} from '@/config'
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
      type: '手机注册',
      sending: false,
      send: false,
      loading: false,
      time: 60,
      captcha: captcha,
      user: 'swimly',
      form: {
        username: '',
        phone: '13000000000',
        code: '',
        email: '1719904000@qq.com',
        password: '',
        captcha: ''
      }
    }
  },
  methods: {
    getcaptcha () {
      this.captcha = this.captcha + '?' + new Date()
    },
    submit () {
      console.log(this.form)
      this.loading = !this.loading
      if (this.type === '邮箱注册') {
        delete this.form.phone
      } else {
        delete this.form.email
      }
      axios({
        method: 'get',
        url: register,
        params: this.form
      }).then(res => {
        console.log(res)
        this.loading = !this.loading
        if (res.data.status) {
          this.$localStorage.set('userInfo', JSON.stringify(res.data.data))
          this.$Message.success(res.data.msg)
          this.$parent.$refs.header.userInfo = res.data.data
          this.$router.replace('/')
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    sendMail () {
      this.sending = !this.sending
      axios({
        method: 'get',
        url: sendMail,
        params: {
          email: this.form.email,
          captcha: this.form.captcha,
          type: 0
        }
      }).then(res => {
        this.sending = !this.sending
        if (res.data.status) {
          this.$Message.success(res.data.msg)
          this.send = !this.send
          this.countdown()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    sendsms () {
      this.sending = !this.sending
      axios({
        method: 'get',
        url: sms,
        params: {
          type: 0,
          phone: this.form.phone,
          captcha: this.form.captcha
        }
      }).then(res => {
        console.log(res)
        this.sending = !this.sending
        if (res.data.status) {
          this.$Message.success(res.data.msg)
          this.countdown()
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    countdown () {
      console.log('开始倒计时')
      setInterval(() => {
        if (this.time === 0) {
          this.send = !this.send
          this.time = 180
        } else {
          this.time--
        }
      }, 1000)
    }
  }
}
</script>
<style>

</style>
