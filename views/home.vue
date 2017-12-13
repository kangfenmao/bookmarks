<template>
  <div class="main">
    <navigation></navigation>
    <tags></tags>
    <bookmarks></bookmarks>
  </div>
</template>

<style scoped lang="less">
  .main {display: flex}
</style>

<script>
  export default {
    components: {
      tags : require('./home/tags').default,
      bookmarks : require('./home/bookmarks').default
    }
  }
</script>
