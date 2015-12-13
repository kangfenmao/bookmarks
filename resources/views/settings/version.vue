<template>
  <div>
    <navigation></navigation>
    <nav-menu></nav-menu>
    <div class="setting-content">
      <h4>v1.01</h4>
      <ul>
        <li>移动界面简单适配</li>
        <li>搜索关键词不再区分大小写</li>
        <li>标签按照首字母顺序进行排序</li>
        <li>标签结果显示条目数</li>
        <li>网址列表默认显示标签</li>
        <li>增加刷新缓存功能，解决多处编辑后内容不一致问题</li>
        <li>优化登录注册流程，点击邮箱验证后自动登录</li>
        <li>未完待续...</li>
      </ul>
      <h4>v1.0</h4>
      <ul>
        <li>多用户</li>
        <li>左右排列的主界面、点击标签可快速查看站点</li>
        <li>即时搜索功能，最快速度定位网站</li>
        <li>更加快速的网站解析，可选择标签或输入标签进行分类</li>
        <li>可再次编辑标签、站点等信息</li>
        <li>个人中心，可更改账号、密码、删除账户、提交反馈等</li>
        <li>站点页面跳转无需刷新，速度大幅提高</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      'nav-menu' : require('./menu')
    }
  }
</script>

