<template>
  <div class="page-view full-screen luck">
    <div class="w h row">
      <div class="col v-m t-c">
        <button @click="start">开始</button>
        <button @click="stop">停止</button>
        <ul class="luck-list">
          <li v-for="(item, index) in list" :key="index">
            <span class="cover">
              <img :src="file + item.cover" alt="">
            </span>
            <h2>{{item.name}}</h2>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {getlucker, file} from '@/config'
import {clearInterval, setInterval} from 'timers'
export default {
  name: 'luck',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '抽奖',
      interval: null,
      list: [],
      file: file,
      form: {
        area: '武汉',
        pagesize: 3,
        year: 2018,
        grade: 0,
        open: 0
      }
    }
  },
  mounted () {
  },
  created () {
    this.getUsers()
  },
  methods: {
    start () {
      this.interval = setInterval(this.getUsers, 500)
    },
    stop () {
      clearInterval(this.interval)
      this.list = []
      this.form.open = 1
      this.getUsers()
    },
    getUsers () {
      axios({
        method: 'get',
        url: getlucker,
        params: {
          area: '武汉'
        }
      }).then(res => {
        this.list = res.data.data
        console.log(this.list)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.full-screen{
  position:fixed;
  width:auto;
  height:auto;
  right:0;
  bottom:0;
  left:0;
  top:0;
  &.luck{
    background:url(../../assets/bg.jpg) no-repeat center center #CF0B15;
  }
}
.luck-list{
  width:1000px;
  font-size:0;
  text-align:center;
  li{
    display:inline-block;
    width:20%;
    .cover{
      img{
        width:100px;
        height:100px;
        border-radius:50%;
      }
    }
    h2{
      font-size:16px;
      color:#fff;
    }
  }
}
</style>
