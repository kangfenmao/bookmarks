import Vue         from 'vue'
import VueRouter   from 'vue-router'
import VueResource from 'vue-resource'
import Auth   from 'App/Middleware/Auth'
import routes from 'routes/web'

// require library
require('bootstrap-validator')
require('bootstrap-sass')

// vue use
Vue.use(VueRouter)
Vue.use(VueResource)

// configuration
Vue.config.debug = true
Vue.http.options.root = 'https://api.shuqian.pro'
Vue.http.options.params = {'api_token' : localStorage.getItem('token')}

// register components
Vue.component('app', require('views/app').default)
Vue.component('navigation', require('views/home/navigation').default)

// init vue-router
window.router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});

// middleware
router.beforeEach((to, from, next) => {
  Auth.guard(to, next)
})

// run application
window.app = new Vue({router})
window.app.$mount('#app')
