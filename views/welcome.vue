<template>
  <div class="box">
    <div class="col-md-4 col-md-offset-4 content animated fadeInUp">
      <div class="title">BookMarks</div>
      <div class="subtitle">轻松收藏你喜欢的网站 :)</div>
      <div class="btn-box col-md-8 col-md-offset-2">
        <a class="btn-login" href="" data-toggle="modal" data-target="#login-box">开始使用</a>
      </div>
    </div>
    <div class="modal fade" id="login-box">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">登录或注册</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal" role="form">
              <div class="form-group has-feedback">
                <label class="col-md-2 control-label">邮箱</label>
                <div class="col-md-9">
                  <input type="email" class="form-control" v-model="email" required>
                  <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                </div>
              </div>
              <div class="form-group has-feedback">
                <label class="col-md-2 control-label">密码</label>
                <div class="col-md-9">
                  <input type="password" class="form-control" v-model="password" required>
                  <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-9 col-md-offset-2">
                  <button type="submit" class="btn btn-primary" id="btn-next" data-loading-text="正在处理...">开始使用</button>
                  <a class="btn btn-link" href="javascript:alert('请联系 elekids@qq.com')">忘记密码？</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tag from 'App/Models/Tag'
  import Site from 'App/Models/Site'
  import User from 'App/Models/User'

  export default {
    data() {
      return {
        email: '',
        password: '',
        cache_count: 0
      }
    },
    mounted() {
      $('form').validator().on('submit', this.submit)
      let token = this.getQueryString('api_token')
      if (token) this.post('auth/token', {token})
    },
    methods: {
      submit(e) {
        if (!e.isDefaultPrevented()) {
          e.preventDefault()
          $('#btn-next').button('loading')
          this.post('auth/login', {
            email: this.email,
            password: this.password
          })
        }
      },
      post(url, data) {
        this.$http.post(url, data).then((response) => {
            localStorage.setItem('token', response.body.token)
            User.cache(response.body.user)
            this.getAllSites(response.body.token)
            this.getAllTags(response.body.token)
          }, (response) => {
            $('#btn-next').button('reset')
            if(response.status == 412) alert('请登录您的邮箱点击验证后继续...');
            if(response.status == 422) alert('账户名或密码错误...');
          });
      },
      getAllSites(token) {
        app.$http.get('sites', {params: {api_token : token}}).then((response) => {
          this.sites = Site.cache(response.body)
          this.goHome()
        })
      },
      getAllTags(token) {
        app.$http.get('tags', {params: {api_token : token}}).then((response) => {
          this.tags = Tag.cache(response.body)
          this.goHome()
        })
      },
      goHome() {
        if (++this.cache_count != 2) return
        $('#btn-next').button('reset')
        $('#login-box').modal('hide')
        location.href = '/'
      },
      getQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return unescape(r[2]); return null;
      }
    }
  }
</script>

<style scoped lang="less">
  .box {
    padding-top: 250px;
    position: absolute;
    width: 100%;
    height: 100%;
    background: currentColor;
    .content {
      text-align: center;
      color: white;
      font-family: Lato;
    }
  }

  .modal {
    top: 150px;
  }

  @media (min-width: 768px) {
    .modal-dialog {
      width: 400px;
    }
  }

  .title {
    font-size: 66px;
    margin-top: -50px;
  }

  .subtitle {font-size: 26px}

  .btn-box {
    margin-top: 20px;
    a:hover {
      text-decoration: none;
      color: #fff;
    }
  }

  .btn-login {
    padding: 10px 50px;
    margin: 0 2px;
    display: inline-block;
    color: #fff;
    border-radius: 3px;
    background: inherit;
    border: 1px solid white;
    &:focus {text-decoration: none; outline: 0}
  }

  .btn-register {
    background: #1fa67a;
    &:hover {background: #0e9569; color: white}
    &:visited {color: white}
  }
</style>



