<template>
  <div class="info">
    <h2 class="page-title">个人信息</h2>
    <div class="page-view">
      <ul class="form inline" style="margin-top:20px;" v-if="userInfo">
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">名字：</span>
            </div>
            <div class="col v-m g-9">
              <Input v-if="editable" v-model="form.name" placeholder="请填写真实姓名！" style="width: 300px"/>
              <span class="value" v-if="!editable">{{userInfo.name}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">请填写真实姓名，切勿随意填写！</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">性别：</span>
            </div>
            <div class="col v-m g-9">
              <RadioGroup v-model="form.sex" v-if="editable">
                <Radio label="0">男</Radio>
                <Radio label="1">女</Radio>
                <Radio label="-1">私密</Radio>
              </RadioGroup>
              <span class="value" v-if="!editable">{{plugins.filterSex(userInfo.sex)}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">如果不想公开性别，也可以选择私密！</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">生日：</span>
            </div>
            <div class="col v-m g-9">
              <DatePicker @on-change="time" v-if="editable" v-model="form.birthday" format="yyyy年MM月dd日" type="date" placeholder="请选择出生日期" style="width: 200px"></DatePicker>
              <span class="value" v-if="!editable">{{userInfo.birthday}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">日期格式（xxxx年xx月xx日）</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">QQ：</span>
            </div>
            <div class="col v-m g-9">
              <Input v-if="editable" v-model="form.qq" placeholder="QQ号码" style="width: 300px"/>
              <span class="value" v-if="!editable">{{userInfo.qq}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">QQ格式（6-12位纯数字）</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">微信：</span>
            </div>
            <div class="col v-m g-9">
              <Input v-if="editable" v-model="form.wechat" placeholder="微信号" style="width: 300px"/>
              <span class="value" v-if="!editable">{{userInfo.wechat}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">格式（不能包含特殊字符）</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">微博：</span>
            </div>
            <div class="col v-m g-9">
              <Input v-if="editable" v-model="form.weibo" placeholder="微博主页链接" style="width: 300px"/>
              <span class="value" v-if="!editable">{{userInfo.weibo || '尚未填写'}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">填写你的新浪微博主页，例如（https://weibo.com/xx/profile）</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">邮箱：</span>
            </div>
            <div class="col v-m g-9">
              <span class="value">{{userInfo.email || '尚未绑定'}}</span>
              <router-link v-if="!userInfo.email && editable" to="/personer/email?action=0">前往绑定</router-link>
              <router-link v-if="userInfo.email && editable" to="/personer/email">前往更改</router-link>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">填写你常用的邮箱，例如（xxxxx@xxx.com）</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">手机号码：</span>
            </div>
            <div class="col v-m g-9">
              <span class="value">{{userInfo.phone || '尚未绑定'}}</span>
              <router-link v-if="!userInfo.phone && editable" to="/personer/phone?action=0">前往绑定</router-link>
              <router-link v-if="userInfo.phone && editable" to="/personer/phone">前往更换</router-link>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">填写你常用的手机号码，例如（1xx xxxx xxxx）</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">github：</span>
            </div>
            <div class="col v-m g-9">
              <Input v-if="editable" v-model="form.github" placeholder="github主页" style="width: 300px"/>
              <span class="value" v-if="!editable">{{userInfo.github}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">填写你github账号名称，例如（swimly）</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">出生地：</span>
            </div>
            <div class="col v-m g-9">
              <Input v-if="editable" v-model="form.hometown" placeholder="出生地址" style="width: 300px"/>
              <span class="value" v-if="!editable">{{userInfo.hometown}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">填写你出生地，详细到门牌号</div>
            </div>
          </div>
        </li>
        <li class="form-item">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">现居地：</span>
            </div>
            <div class="col v-m g-9">
              <Input v-if="editable" v-model="form.living" placeholder="现在居住地址" style="width: 300px"/>
              <span class="value" v-if="!editable">{{userInfo.living}}</span>
            </div>
            <div class="col g-12 v-m">
              <div class="tip" v-if="editable">填写你现在居住的住所，详细到门牌号</div>
            </div>
          </div>
        </li>
        <li class="form-item" v-if="!editable">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">注册时间：</span>
            </div>
            <div class="col v-m g-9">
              <span class="value">{{new Date(parseInt(userInfo.created_at) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}}</span>
            </div>
            <div class="col g-12"></div>
          </div>
        </li>
        <li class="form-item" v-if="!editable">
          <div class="row w">
            <div class="col v-m g-3 t-r">
              <span class="label">上次修改时间：</span>
            </div>
            <div class="col v-m g-9">
              <span class="value">{{new Date(parseInt(userInfo.updated_at) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}}</span>
            </div>
            <div class="col g-12"></div>
          </div>
        </li>
      </ul>
      <div class="btn-area t-c">
        <Button type="primary" size="large" v-if="!editable" @click="editable = !editable">修改资料</Button>
        <Button type="warning" size="large" v-if="editable" @click="submit">确认修改</Button>
      </div>
    </div>
  </div>
</template>
<script>
import plugins from '@/plugins'
import axios from 'axios'
import {updateUserInfo} from '@/config'
export default {
  name: 'info',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '个人信息',
      editable: false,
      userInfo: null,
      form: null,
      plugins: plugins
    }
  },
  created () {
    this.userInfo = JSON.parse(this.$localStorage.get('userInfo'))
    this.form = JSON.parse(this.$localStorage.get('userInfo'))
    this.form = plugins.delObj(this.form, ['id', 'username', 'password', 'uId', 'phone', 'email', 'updated_at', 'created_at'])
  },
  methods: {
    submit () {
      const param = {
        uId: this.userInfo.uId,
        userInfo: JSON.stringify(this.form)
      }
      console.log(this.form)
      axios({
        method: 'get',
        url: updateUserInfo,
        params: param
      }).then(res => {
        console.log(res.data)
        if (res.data.status) {
          this.$Message.success(res.data.msg)
          this.userInfo = res.data.data
          this.editable = !this.editable
          this.$localStorage.set('userInfo', JSON.stringify(this.userInfo))
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    time (v) {
      this.form.birthday = new Date(v).valueOf() / 1000
    }
  }
}
</script>
<style lang="scss" scoped type="text/css">
.form{
  .g-9{
    padding-left:10px;
  }
}
</style>
