<template>
  <div class="info">
    <h2 class="page-title">更换邮箱</h2>
    <div class="page-view">
      <Alert banner closable show-icon type="warning" v-if="!bingding">温馨提示：您尚未绑定邮箱，请绑定邮箱！</Alert>
      <Alert banner closable show-icon type="warning" v-if="bingding">温馨提示：以下操作涉及到用户安全性，请谨慎操作！</Alert>
      <ul class="form" style="width:65%;margin-top:30px;" v-if="!bingding">
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <div class="label">新邮箱：</div>
            </li>
            <li class="col v-m">
              <Input v-model="form.new" size="large" placeholder="请填写新邮箱"/>
            </li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <div class="label">验证码：</div>
            </li>
            <li class="col v-m">
              <Input v-model="form.captcha" size="large" placeholder="填写右侧验证码！"/>
            </li>
            <li class="col v-m g-6" style="padding-left:10px;">
              <img @click="getcaptcha" class="v-m captcha" :src="captcha" alt="">
            </li>
            <li class="col v-m">
              <Button :loading="sending" @click="sendMail" type="success" :disabled="form.captcha.length < 5"  v-if="!send" size="large">发送邮件</Button>
              <Button type="ghost" disabled v-if="send"  size="large">{{time}}s重新获取</Button>
            </li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <div class="label">验证码：</div>
            </li>
            <li class="col v-m g-12">
              <Input v-model="form.code" size="large" placeholder="请填写邮箱收到的数字验证码！"/>
            </li>
            <li class="col g-9"></li>
          </ul>
        </li>
        <li class="form-item" style="padding-top:20px;">
          <ul class="row w">
            <li class="col v-m g-3"></li>
            <li class="col v-m">
              <Button @click="submit" type="primary" size="large" style="width:150px;">确认更换</Button>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="form" style="width:65%;margin-top:30px;" v-if="bingding">
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <div class="label">旧邮箱：</div>
            </li>
            <li class="col v-m">
              <Input v-model="form.old" size="large" placeholder="请填写旧邮箱！"/>
            </li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <div class="label">新邮箱：</div>
            </li>
            <li class="col v-m">
              <Input v-model="form.new" size="large" placeholder="请填写新邮箱"/>
            </li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <div class="label">验证码：</div>
            </li>
            <li class="col v-m">
              <Input v-model="form.captcha" size="large" placeholder="填写右侧验证码！"/>
            </li>
            <li class="col v-m g-6" style="padding-left:10px;">
              <img @click="getcaptcha" class="v-m captcha" :src="captcha" alt="">
            </li>
            <li class="col v-m">
              <Button :loading="sending" @click="sendMail" type="success" :disabled="form.captcha.length < 5"  v-if="!send" size="large">发送邮件</Button>
              <Button type="ghost" disabled v-if="send"  size="large">{{time}}s重新获取</Button>
            </li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <div class="label">验证码：</div>
            </li>
            <li class="col v-m g-12">
              <Input v-model="form.code" size="large" placeholder="请填写邮箱收到的数字验证码！"/>
            </li>
            <li class="col g-9"></li>
          </ul>
        </li>
        <li class="form-item" style="padding-top:20px;">
          <ul class="row w">
            <li class="col v-m g-3"></li>
            <li class="col v-m">
              <Button @click="submit" type="primary" size="large" style="width:150px;">确认更换</Button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {captcha, email, sendMail, bindingEmail} from '@/config'
import axios from 'axios'
import {setInterval} from 'timers'
export default {
  name: 'email',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '更换邮箱',
      captcha: captcha,
      sending: false,
      send: false,
      time: 30,
      userInfo: JSON.parse(this.$localStorage.get('userInfo')),
      bingding: JSON.parse(this.$localStorage.get('userInfo')).email,
      form: {
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
        old: '',
        new: '',
        code: '',
        captcha: ''
      }
    }
  },
  methods: {
    getcaptcha () {
      this.captcha = this.captcha + '?' + new Date()
    },
    submit () {
      if (!this.bingding) {
        axios({
          method: 'get',
          url: bindingEmail,
          params: {
            uId: this.form.uId,
            email: this.form.new,
            code: this.form.code,
            captcha: this.form.captcha
          }
        }).then(res => {
          if (res.data.status) {
            this.$Message.success(res.data.msg)
            this.userInfo.email = this.form.new
            this.$localStorage.set('userInfo', JSON.stringify(this.userInfo))
            this.$router.replace('/personer')
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      } else {
        axios({
          method: 'get',
          url: email,
          params: this.form
        }).then(res => {
          if (res.data.status) {
            this.$Message.success(res.data.msg)
            this.userInfo.email = this.form.new
            this.$localStorage.set('userInfo', JSON.stringify(this.userInfo))
            this.$router.replace('/personer')
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      }
    },
    sendMail () {
      if (!this.form.new) {
        this.$Message.warning('请填写接收验证码的邮箱！')
      } else if (!this.form.captcha) {
        this.$Message.warning('请填写验证码！')
      } else {
        this.sending = !this.sending
        axios({
          method: 'get',
          url: sendMail,
          params: {
            uId: this.form.uId,
            type: 1,
            email: this.form.new,
            captcha: this.form.captcha
          }
        }).then(res => {
          console.log(res)
          if (res.data.status) {
            this.$Message.success(res.data.msg)
            this.send = !this.send
            this.sending = !this.sending
            this.countdown()
          } else {
            this.$Message.error(res.data.msg)
            this.sending = !this.sending
          }
        })
      }
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
