<template>
  <div>
    <navigation></navigation>
    <nav-menu></nav-menu>
    <div class="setting-content">
      <form class="form-horizontal" id="delete-user">
        <div class="form-group">
          <div class="col-sm-5">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="请输入当前密码" autocomplete="new-password" required>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-danger">删除我的所有信息</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Auth from 'App/Middleware/Auth'

  export default {
    data() {
      return {
        password: ''
      }
    },
    components: {
      'nav-menu' : require('./menu')
    },
    mounted() {
      $('#delete-user').validator().on('submit', this.submit)
    },
    methods: {
      submit(e) {
        if (!e.isDefaultPrevented()) {
          e.preventDefault()
          if (!confirm("危险！删除当前用户将删除您所有信息！删除后无法恢复！")) return
          this.$http.post('user/delete', {password: this.password}).then((response) => {
            alert('用户删除成功！')
            Auth.logout()
          }, (response) => {
            if (response.status == 401) alert('密码错误！')
          })
        }
      }
    }
  }
</script>
