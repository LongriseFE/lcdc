<template>
  <div class="face-view">
    <h2 class="page-title">修改头像</h2>
    <div class="page-view">
      <ul class="row w">
        <li class="col v-t g-12">
          <croppa
            v-model="croppa"
            :width="300"
            :height="300"
            :canvas-color="'default'"
            :placeholder="'选择一张图片'"
            :placeholder-font-size="16"
            :placeholder-color="'#999'"
            :accept="'image/*'"
            :quality="2"
            :zoom-speed="3"
            :show-remove-button="true"
            :remove-button-color="'red'"
            :remove-button-size="18"
          ></croppa>
        </li>
        <li class="col v-t g-6" v-if="laststep">
          <h3 class="sub-title">大头像</h3>
          <div class="face normal">
            <img :src="dataUrl" alt="">
          </div>
        </li>
        <li class="col v-t g-6" v-if="laststep">
          <h3 class="sub-title">小头像</h3>
          <div class="face small">
            <img :src="dataUrl" alt="">
          </div>
        </li>
      </ul>
      <div class="crop">
        <Button size="small" @click='croppa.zoomIn()' type="text"><span class="iconfont icon-fangda"></span></Button>
        <Button size="small" @click='croppa.zoomOut()' type="text"><span class="iconfont icon-suoxiao"></span></Button>
        <Button size="small" @click='croppa.moveUpwards(10)' type="text"><span class="iconfont icon-xiangshang"></span></Button>
        <Button size="small" @click='croppa.moveDownwards(10)' type="text"><span class="iconfont icon-xiangxia"></span></Button>
        <Button size="small" @click='croppa.moveLeftwards(10)' type="text"><span class="iconfont icon-zhixiangzuo"></span></Button>
        <Button size="small" @click='croppa.moveRightwards(10)' type="text"><span class="iconfont icon-xiangyou"></span></Button>
        <Button size="small" @click='croppa.rotate(2)' type="text"><span class="iconfont icon-xuanzhuan1"></span></Button>
        <Button size="small" @click='croppa.rotate()' type="text"><span class="iconfont icon-xuanzhuan"></span></Button>
        <Button size="small" @click='croppa.flipY()' type="text"><span class="iconfont icon-chuizhifanzhuan"></span></Button>
        <Button size="small" @click='croppa.flipX()' type="text"><span class="iconfont icon-shuipingjuzhongduiqi"></span></Button>
      </div>
      <p class="tip">提示：请选择一张个人正面照片作为头像，让其他成员更容易认识你。</p>
      <p class="tip">注意：请选择一张清晰的图片作为头像，大小不能超过2M，并且您可以通过拖拽图片到上面的框框中进行头像上传！</p>
      <div class="btn-area">
        <Button @click="crop" type="primary" v-if="!laststep" size="large">裁剪</Button>
        <Button @click="submit" type="primary" v-if="laststep" size="large">确认修改</Button>
        <Button @click="back" type="error" v-if="laststep" size="large">重新选择</Button>
      </div>
    </div>
  </div>
</template>
<script>
import {face} from '@/config'
import axios from 'axios'
export default {
  name: 'face',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '修改头像',
      croppa: null,
      dataUrl: {},
      laststep: false
    }
  },
  created () {
  },
  methods: {
    back () {
      this.laststep = !this.laststep
      this.croppa.refresh()
    },
    crop () {
      this.dataUrl = this.croppa.generateDataUrl('image/jpeg', 0.8)
      if (!this.dataUrl) {
        this.$Message.error('您尚未选择任何图片，请选择后再裁剪！')
      } else {
        this.laststep = !this.laststep
      }
    },
    submit () {
      axios({
        method: 'post',
        url: face,
        data: {
          uId: JSON.parse(this.$localStorage.get('userInfo')).uId,
          data: this.dataUrl
        }
      }).then(res => {
        console.log(res)
        if (res.data.status) {
          // 头像修改成功同时改变页面中的头像和localstorage中的用户信息
          var userInfo = JSON.parse(this.$localStorage.get('userInfo'))
          this.$parent.userInfo.cover = res.data.data.file
          this.$parent.$parent.$refs.header.userInfo.cover = res.data.data.file
          userInfo.cover = res.data.data.file
          this.$localStorage.set('userInfo', JSON.stringify(userInfo))
          this.$Message.success(res.data.msg)
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped type="text/css">
.crop{
  .ivu-btn{
    span{
      margin:0;
      .ifoncont{
        margin:0;font-size:18px;
      }
    }
  }
}
.tip{
  font-size:14px;
  color:#666;
  margin-top:10px;
}
.btn-area{
  padding:20px 0;
  margin-top:20px;
}
.sub-title{
  font-size:16px;
  padding:10px 0;
  margin-bottom:30px;
}
.face{
  display:block;
  border-radius:50%;
  overflow:hidden;
  border:1px solid #E6E6E6;
  background:#eee;
  &.normal{
    width:120px;
    height:120px;
  }
  &.small{
    width:60px;
    height:60px;
  }
  img{
    width:100%;
    height:100%;
  }
}
</style>
