<template>
  <div class="footer">
    <ul class="mid-layout row">
      <li class="col v-t g-12">
        <h2 class="title">LCDC</h2>
        <p class="text">阿里妈妈MUX倾力打造的矢量图标管理、交流平台。设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。</p>
        <p class="text">©ALIMAMA MUX, powered by alimama THX.法律声明<br/>转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源，商业媒体及纸媒请先联系：sangxing@taobao.com</p>
      </li>
      <li class="col v-t g-12">
        <h2 class="title">友情链接：</h2>
        <ul class="grid link">
          <li class="grid-item">
            <p class="item"><a href="#">阿里巴巴（中文站）UED</a></p>
            <p class="item"><a href="#">支付宝UED</a></p>
            <p class="item"><a href="#">阿里妈妈MUX</a></p>
            <p class="item"><a href="#">淘宝UED淘宝UED</a></p>
            <p class="item"><a href="#">腾讯游戏TGIDEAS</a></p>
          </li>
          <li class="grid-item">
            <p class="item"><a href="#">阿里巴巴（中文站）UED</a></p>
            <p class="item"><a href="#">支付宝UED</a></p>
            <p class="item"><a href="#">阿里妈妈MUX</a></p>
            <p class="item"><a href="#">淘宝UED淘宝UED</a></p>
            <p class="item"><a href="#">腾讯游戏TGIDEAS</a></p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'footers',
  data () {
    return {
    }
  }
}
</script>
<style>
.footer{padding:50px;background:#f5f5f5;box-sizing:border-box;}
.footer .col{padding-right:50px;}
.footer .title{font-size:16px;font-weight:200;color:rgba(0,0,0,0.8);padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid rgba(0,0,0,0.04);}
.footer .item a{text-decoration:none;color:rgba(0,0,0,0.5);font-size:14px;margin:5px 0;display:block;transition:0.3s;}
.footer .item a:hover{color:rgba(0,0,0,0.9);}
.footer .link .grid-item{padding-right:50px;box-sizing:border-box;}
.footer .text{font-size:14px;color:rgba(0,0,0,0.5);line-height:1.8;margin-bottom:10px;}
</style>
