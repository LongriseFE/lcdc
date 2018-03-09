<template>
  <div></div>
</template>
<script>
export default {
  name: 'author',
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      title: '身份设置'
    }
  }
}
</script>
