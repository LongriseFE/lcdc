<template>
  <div class="loading">
    <div class="wrap">
      <p>
        <img :style="'height:' + size + 'px'" :src="'static/' + theme + '/' + name + '.svg'"/>
      </p>
      <h3 class="text">
        <slot name="text">加载中！</slot>
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'blue'
    },
    name: {
      type: String,
      default: 'spinning-circles'
    },
    size: {
      type: Number,
      default: 32
    }
  }
}
</script>
<style lang="scss" scoped>
.loading{
  text-align:center;
  vertical-align: middle;
  &:before{
    content:"";
    display:inline-block;
    vertical-align: middle;
    height:100%;
  }
  .wrap{
    display:inline-block;
    vertical-align: middle;
    .text{
      font-weight:normal;
      font-size:12px;
      color:#999;
      margin-top:10px;
    }
  }
}
</style>
