<template>
  <div class="message">
    <Tabs size="small">
        <TabPane label="全部">
          <ul class="message-list">
            <li v-for="(item, index) in message" :key="index" class="row w">
              <span class="col v-m">

                <b class="title"><Badge dot>{{item.title}}</Badge></b>
                <span class="info">{{item.content}}</span>
              </span>
              <span class="col v-m t-r">
                <span class="time">{{item.updated_at}}</span>
              </span>
            </li>
          </ul>
          <div class="load-more">
            <span class="hasmore">点击加载更多！</span>
            <span class="nomore">没有更多！</span>
          </div>
        </TabPane>
        <TabPane label="接收">
          <ul class="message-list">
            <li v-for="(item, index) in message" :key="index" class="row w">
              <span class="col v-m">
                <b class="title">{{item.title}}</b>
                <span class="info">{{item.content}}</span>
              </span>
              <span class="col v-m t-r">
                <span class="time">{{item.updated_at}}</span>
              </span>
            </li>
          </ul>
        </TabPane>
        <TabPane label="发送">
          <ul class="message-list">
            <li v-for="(item, index) in message" :key="index" class="row w">
              <span class="col v-m">
                <b class="title">{{item.title}}</b>
                <span class="info">{{item.content}}</span>
              </span>
              <span class="col v-m t-r">
                <span class="time">{{item.updated_at}}</span>
              </span>
            </li>
          </ul>
        </TabPane>
    </Tabs>
  </div>
</template>
<script>
import {message} from '@/config'
import axios from 'axios'
export default {
  name: 'message',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '消息',
      message: []
    }
  },
  created () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      axios({
        method: 'get',
        url: message,
        params: {
          uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
          pagesize: 10
        }
      }).then(res => {
        this.message = res.data.data.data
      })
    }
  }
}
</script>
<style>
.message{padding:20px;}
.message-list{padding:0 20px;}
.message-list li{height:60px;border-bottom:1px dashed #f0f0f0;}
.message-list .title{display:block;font-size:16px;font-weight:600;color:#333;}
.message-list .info{font-size:14px;color:#666;}
.message-list .ivu-badge-dot{right:-12px;top:-1px;width:6px;height:6px;}
</style>
