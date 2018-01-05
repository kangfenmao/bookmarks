<template>
  <div>
    <navigation></navigation>
    <nav-menu></nav-menu>
    <div class="setting-content">
      <img src="/assets/images/wechat_support.jpg" alt="微信赞助">
    </div>
  </div>
</template>

<style scoped>
  .text {margin-left: 20px}
  .row {margin-top: 8px}
  .bold {font-weight: bold}
</style>

<script>
  export default {
    components: {
      'nav-menu' : require('./menu').default,
    }
  }
</script>
