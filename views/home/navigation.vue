<template>
  <div class="navbar navbar-default navbar-fixed-top">
    <div class="container-fulid navbar-padding">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
          <span class="sr-only"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a href="javascript:" class="navbar-brand image" @click="goHome">
          <img src="/assets/images/logo-brand.png" alt="Brand"/>
        </a>
        <a href="javascript:" class="navbar-brand" @click="goHome">BookMarks</a>
      </div>
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <form class="navbar-form navbar-left" role="search" @submit.prevent="open">
          <div class="form-group">
            <input type="text" class="form-control" v-focus="focus" @input="search" @click="goHome" placeholder="从这里搜索书签...">
          </div>
        </form>
        <router-link to="/site/create" class="btn btn-add"> + </router-link>
        <div class="nav navbar-nav navbar-right">
          <li class="dropdown" title="设置">
            <span class="dropdown-toggle btn-setting glyphicon glyphicon-cog" data-toggle="dropdown" role="button" aria-expanded="false"></span>
            <ul class="dropdown-menu" role="menu">
              <li><router-link to="/user/profile">个人资料</router-link></li>
              <li><router-link to="/user/password">修改密码</router-link></li>
              <li><router-link to="/feedback">意见反馈</router-link></li>
              <li><router-link to="/support">赞助支持</router-link></li>
              <li><a href="javascript:" @click="refresh">刷新缓存</a></li>
              <li><a href="javascript:" @click="logout">退出登录</a></li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from 'App/Middleware/Auth'

  export default {
    data() {
      return {
        focus : this.$route.path == '/'
      }
    },
    directives: {
      focus: {
        inserted(el, binding) {
          if (binding.value) el.focus()
        }
      }
    },
    methods: {
      logout() {
        Auth.logout()
      },
      refresh() {
        app.$emit('refresh')
        router.push('/')
      },
      search(event) {
        let keywords = event.target.value.replace(/^\s+|\s+$/g,"")
        app.$emit('search', keywords)
      },
      open() {
        app.$emit('open-link')
      },
      goHome(event) {
        event.target.value = ''
        router.push('/')
      },
    }
  }
</script>

<style lang="less">
  .nav>.open>a {background: inherit !important}
  .navbar {
    background: white;
    .navbar-header {padding: 0 30px}
    .navbar-brand.image {padding-right: 0}
    .navbar-right {
      padding: 14px 53px;
      >li>span {
        padding: 0;
        margin-left: 10px;
        cursor: pointer;
      }
      .glyphicon-pencil {
        font-size: 16px;
        padding-top: 2px;
        color: #333;
      }
      .dropdown {line-height: 18px; color: #333}
    }
    .btn-setting {font-size: 18px}
    .btn-add {
      background: white;
      color: #4285f4;
      font-size: 24px;
      padding: 0px 5px;
      line-height: 24px;
      margin-top: 12px;
      border-radius: 20px;
      box-shadow: none;
      &:hover {color: #4285f4}
      &:active {box-shadow: none}
      &:visited {box-shadow: none}
    }
  }
  @media (min-width: 768px) {
    .navbar-form .form-control {
      width: 500px;
      margin-left: 26px;
      border-radius: 0;
      box-shadow: none;
    }
  }
  @media (max-width: 600px) {
    .navbar-form {
      border: 0;
      padding: 0 10px;
    }
    .navbar .navbar-header {padding: 0}
    .btn-add, .navbar-right {
      display: none;
    }
  }
</style>


