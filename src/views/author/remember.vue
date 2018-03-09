<template>
  <div class="remember">
    <div class="page-view">
      <div class="t-c" style="margin-top:20px;">
        <RadioGroup v-model="type" type="button" size="large">
          <Radio label="邮箱找回">邮箱找回</Radio>
          <Radio label="手机找回">手机找回</Radio>
        </RadioGroup>
      </div>
      <ul class="form" style="width:50%;padding-top:20px;" v-if="type === '邮箱找回'">
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
              <Button :loading="sending" type="success" :disabled="form.captcha.length < 5"  v-if="!send" size="large">发送邮件验证码</Button>
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
          <h2 class="label">新密码</h2>
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
      <ul class="form" style="width:50%;padding-top:20px;" v-if="type === '手机找回'">
        <li class="form-item">
          <h2 class="label">手机</h2>
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
              <Button :loading="sending" type="success" :disabled="form.captcha.length < 5"  v-if="!send" size="large">发送邮件验证码</Button>
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
          <h2 class="label">新密码</h2>
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
  </div>
</template>
<script>
import {captcha} from '@/config'
export default {
  name: 'remember',
  data () {
    return {
      type: '邮箱找回',
      sending: false,
      send: false,
      captcha: captcha,
      loading: false,
      form: {
        email: '',
        phone: '',
        captcha: '',
        code: '',
        uId: ''
      }
    }
  },
  methods: {
    getcaptcha () {
      this.captcha = this.captcha + '?' + new Date()
    },
    submit () {}
  }
}
</script>
