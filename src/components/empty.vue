<template>
  <div class="empty">
    <slot name="icon"></slot>
    <p class="text"><slot name="text"></slot></p>
  </div>
</template>
<style lang="scss" scoped>
.empty{
  text-align:center;
  padding:50px 0;
  img{
    height:100px;
  }
  .text{
    margin-top:10px;
    font-size:14px;
    color:#999;
  }
}
</style>
