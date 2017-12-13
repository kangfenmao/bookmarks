<template>
  <div>
    <navigation></navigation>
    <nav-menu></nav-menu>
    <div class="setting-content">
      <form class="form-horizontal" id="profile-form">
        <div class="form-group">
          <div class="col-sm-5">
            <input type="email" class="form-control" id="email-now" v-model="email" placeholder="email" disabled>
          </div>
        </div>
        <div class="form-group has-feedback">
          <div class="col-sm-5">
            <input type="email" class="form-control" id="email" v-model="new_email" placeholder="请输入新的邮箱地址" required>
            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
          </div>
        </div>
        <div class="form-group has-feedback">
          <div class="col-sm-5">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="请输入密码" autocomplete="new-password" required>
            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-danger">更改邮箱</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import User from 'App/Models/User'

  export default {
    data() {
      return {
        email: User.info().email,
        new_email: '',
        password: ''
      }
    },
    components: {
      'nav-menu' : require('./menu').default,
    },
    mounted() {
      $('#profile-form').validator().on('submit', this.submit)
    },
    methods: {
      submit(e) {
        if (!e.isDefaultPrevented()) {
          e.preventDefault()

          if (this.new_email == this.email) {
            return alert('新的邮箱不能和当前邮箱相同！')
          }

          let data = {
            email: this.new_email,
            password: this.password
          }

          this.$http.post('user/change-email', data).then((response) => {
            this.email = User.cache(response.body.user).email
            this.new_email = ''
            this.password = ''
            alert('更改成功！')
          }, (response) => {
            switch (response.status) {
              case 422:
                alert('该邮箱已经被注册！')
                break
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
