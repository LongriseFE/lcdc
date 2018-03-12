<template>
  <div class="empty">
    <div class="inner">
      <slot name="icon"></slot>
      <p class="text"><slot name="text"></slot></p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.empty{
  text-align:center;
  padding:50px 0;
  &:before{
    content:"";
    display:inline-block;
    width:0;
    height:100%;
    vertical-align: middle;
  }
  .inner{
    display:inline-block;
    vertical-align: middle;
    img{
      height:100px;
    }
    .text{
      margin-top:10px;
      font-size:14px;
      color:#999;
    }
  }
}
</style>
