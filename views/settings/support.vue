<template>
  <div>
    <navigation></navigation>
    <nav-menu></nav-menu>
    <div class="setting-content">
      <img src="/assets/images/wechat_support.png" alt="微信赞助">
      <div class="text">
        <div class="row">如果您觉得这个网站有所帮助</div>
        <div class="row bold">不妨小额支持一下... \(^o^)/</div>
      </div>
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
