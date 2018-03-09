<template>
  <div></div>
</template>
<script>
export default {
  name: 'logout',
  created () {
    this.$localStorage.set('userInfo', null)
    this.$router.replace('/login')
    this.$Message.success('成功退出登录！')
    this.$parent.$refs.header.userInfo = null
    this.$parent.$refs.header.message = []
  }
}
</script>
