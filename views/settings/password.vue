<template>
  <div>
    <navigation></navigation>
    <nav-menu></nav-menu>
    <div class="setting-content">
      <form class="form-horizontal" id="password-form">
        <div class="form-group">
          <div class="col-sm-5">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="请输入当前密码" required>
          </div>
        </div>
        <div class="form-group has-feedback">
          <div class="col-sm-5">
            <input type="password" class="form-control" id="new-password" v-model="new_password" placeholder="请输入新密码" autocomplete="new-password" data-minlength="6" required>
            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
          </div>
        </div>
        <div class="form-group  has-feedback">
          <div class="col-sm-5">
            <input type="password" class="form-control" id="password-confirm" v-model="password_confirm" placeholder="重复输入新密码" data-match="#new-password" autocomplete="new-password" required>
            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-danger">更改密码</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        password: '',
        new_password: '',
        password_confirm: ''
      }
    },
    components: {
      'nav-menu' : require('./menu').default,
    },
    mounted() {
      $('#password-form').validator().on('submit', this.submit)
    },
    methods: {
      submit(e) {
        if (!e.isDefaultPrevented()) {
          e.preventDefault()

          if (this.password == this.new_password) {
            return alert('新的密码不能和当前密码重复！')
          }

          let data = {
            password: this.password,
            new_password: this.new_password
          }

          this.$http.post('user/change-password', data).then((response) => {
            this.password = ''
            this.new_password = ''
            this.password_confirm = ''
            alert('密码更改成功！')
          }, (response) => {
            switch (response.status) {
              case 401:
                alert('密码错误！')
                break
              default:
                alert('更改失败！')
                break
            }
          });
        }
      }
    }
  }
</script>
