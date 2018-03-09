<template>
  <div class="info">
    <h2 class="page-title">修改密码</h2>
    <div class="page-view">
      <Alert banner closable show-icon type="warning">温馨提示：以下操作涉及到用户安全性，请谨慎操作！</Alert>
      <ul class="form" style="width:65%;margin-top:40px;">
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-4">
              <h3 class="label">旧密码：</h3>
            </li>
            <li class="col v-m g-16">
              <Input v-model="form.old" size="large" placeholder="请输入旧密码"/>
            </li>
            <li class="col v-m g-4"></li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-4">
              <h3 class="label">新密码：</h3>
            </li>
            <li class="col v-m g-16">
              <Input v-model="password1" size="large" placeholder="请输入新密码"/>
            </li>
            <li class="col v-m g-4"></li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-4">
              <h3 class="label">重复新密码：</h3>
            </li>
            <li class="col v-m g-16">
              <Input v-model="password2" size="large" placeholder="请重复新密码"/>
            </li>
            <li class="col v-m g-4"></li>
          </ul>
        </li>
        <li class="form-item" style="padding:5px 0;">
          <ul class="row w">
            <li class="col v-m g-4">
              <h3 class="label">验证码：</h3>
            </li>
            <li class="col v-m g-10 t-l">
              <Input v-model="form.captcha" size="large" placeholder="请重复新密码"/>
            </li>
            <li class="col v-m g-10" style="padding-left:20px;">
              <img class="v-m captcha" @click="getcaptcha" :src="captcha" alt="" style="cursor:pointer;">
            </li>
          </ul>
        </li>
        <li class="form-item" style="padding-top:20px;">
          <ul class="row w">
            <li class="col v-m g-4"></li>
            <li class="col v-m">
              <Button @click="submit" type="primary" size="large">确认修改</Button>
            </li>
            <li class="col v-m"></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {password, captcha} from '@/config'
import axios from 'axios'
export default {
  name: 'password',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '修改密码',
      password1: '',
      password2: '',
      captcha: captcha,
      form: {
        uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
        old: '',
        new: '',
        captcha: ''
      }
    }
  },
  created () {
    this.getcaptcha()
  },
  methods: {
    getcaptcha () {
      this.captcha = this.captcha + '?' + new Date()
    },
    submit () {
      if (!this.form.old) {
        this.$Message.warning('请填写旧密码！')
      } else if (!this.password1 || !this.password2) {
        this.$Message.warning('请填写新密码！')
      } else if (!this.form.captcha) {
        this.$Message.warning('请填写验证码！')
      } else {
        if (this.password1 !== this.password2) {
          this.$Message.warning('两次输入的密码不同！')
        } else if (this.form.old === this.password1) {
          this.$Message.warning('新密码不能与旧密码相同！')
        } else {
          this.form.new = this.password1
          axios({
            method: 'get',
            url: password,
            params: this.form
          }).then(res => {
            if (res.data.status) {
              this.$Message.success(res.data.msg)
              this.$localStorage.set('userInfo', null)
              this.$parent.$parent.$refs.header.userInfo = null
              this.$router.replace('/author')
            } else {
              this.$Message.error(res.data.msg)
            }
          })
        }
      }
    }
  }
}
</script>
