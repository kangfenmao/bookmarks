<template>
  <div class="tag-list">
    <ul class="list-group">
      <router-link to="/user/profile" class="list-group-item">个人资料</router-link>
      <router-link to="/user/password" class="list-group-item">修改密码</router-link>
      <router-link to="/feedback" class="list-group-item">意见反馈</router-link>
      <router-link to="/support" class="list-group-item">赞助支持</router-link>
      <router-link to="/version" class="list-group-item">版本更新</router-link>
      <router-link to="/user/delete" class="list-group-item">删除用户</router-link>
    </ul>
  </div>
</template>

<style scoped>
  .list-group-item a { color: #444 }
</style>
