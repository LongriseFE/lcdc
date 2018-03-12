<template>
  <div class="info">
    <h2 class="page-title">{{binding ? '更换手机' : '绑定手机'}}</h2>
    <div class="page-view">
      <Alert banner closable show-icon type="warning" v-if="!binding">温馨提示：您尚未绑定任何手机，请先绑定手机</Alert>
      <Alert banner closable show-icon type="warning" v-if="binding">温馨提示：以下操作涉及到账户安全性，请谨慎操作！</Alert>
      <ul class="form" style="width:70%;margin-top:30px;" v-if="!binding">
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <h3 class="label">新手机：</h3>
            </li>
            <li class="col v-m g-18">
              <Input v-model="form.new" size="large" placeholder="请填写您要绑定的手机号！"/>
            </li>
            <li class="col g-3"></li>
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
              <Button :loading="sending" @click="sendsms" type="success" :disabled="form.captcha.length < 5"  v-if="!send" size="large">发送短信</Button>
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
              <Input v-model="form.code" size="large" placeholder="请填写手机收到的数字验证码！"/>
            </li>
            <li class="col g-9"></li>
          </ul>
        </li>
        <li class="form-item" style="padding-top:20px;">
          <ul class="row w">
            <li class="col v-m g-3"></li>
            <li class="col v-m">
              <Button @click="submit" type="primary" size="large" style="width:150px;">确认绑定</Button>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="form" style="width:70%;margin-top:30px;" v-if="binding">
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <h3 class="label">旧手机：</h3>
            </li>
            <li class="col v-m g-18">
              <Input v-model="form.old" size="large" placeholder="请填写旧手机"/>
            </li>
            <li class="col g-3"></li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-3">
              <h3 class="label">新手机：</h3>
            </li>
            <li class="col v-m g-18">
              <Input v-model="form.new" size="large" placeholder="请填写新手机"/>
            </li>
            <li class="col g-3"></li>
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
              <Button :loading="sending" @click="sendsms" type="success" :disabled="form.captcha.length < 5"  v-if="!send" size="large">发送短信</Button>
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
import {captcha, sms, updatePhone, bindingPhone} from '@/config'
import axios from 'axios'
export default {
  name: 'phone',
  data () {
    return {
      sending: false,
      send: false,
      binding: JSON.parse(this.$localStorage.get('userInfo')).phone,
      userInfo: JSON.parse(this.$localStorage.get('userInfo')),
      captcha: captcha,
      time: 60,
      form: {
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
        old: '',
        new: '',
        captcha: '',
        code: ''
      }
    }
  },
  methods: {
    getcaptcha () {
      this.captcha = this.captcha + '?' + new Date()
    },
    submit () {
      if (!this.binding) {
        axios({
          method: 'get',
          url: bindingPhone,
          params: {
            uId: this.form.uId,
            captcha: this.form.captcha,
            code: this.form.code,
            phone: this.form.new
          }
        }).then(res => {
          if (res.data.status) {
            this.$Message.success(res.data.msg)
            this.userInfo.phone = this.form.new
            this.$localStorage.set('userInfo', JSON.stringify(this.userInfo))
            this.$router.replace('/personer')
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      } else {
        axios({
          method: 'get',
          url: updatePhone,
          params: this.form
        }).then(res => {
          if (res.data.status) {
            this.$Message.success(res.data.msg)
            this.userInfo.phone = this.form.new
            this.$localStorage.set('userInfo', JSON.stringify(this.userInfo))
            this.$router.replace('/personer')
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      }
    },
    sendsms () {
      if (!this.form.new) {
        this.$Message.warning('请填写新手机号！')
      } else if (!this.form.captcha) {
        this.$Message.warning('请填写验证码！')
      } else {
        this.sending = !this.sending
        axios({
          method: 'get',
          url: sms,
          params: {
            type: 2,
            phone: this.form.new,
            captcha: this.form.captcha
          }
        }).then(res => {
          console.log(res.data)
          this.sending = !this.sending
          if (res.data.status) {
            this.$Message.success(res.data.msg)
            this.send = !this.send
            this.countdown()
          } else {
            this.$Message.error(res.data.msg)
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
