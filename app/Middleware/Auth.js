const except = [
  '/welcome',
  '/register',
  '/verify/email',
  '/login'
]

/**
 * 处理未登录请求
 * @param to
 * @param next
 */
function guard(to, next) {
  if (loggedIn()) {
    except.includes(to.path) ? next('/') : next()
  } else {
    except.includes(to.path) ? next() : next('/welcome')
  }
}

/**
 * 判断用户是否登陆
 * @returns {boolean}
 */
function loggedIn()  {
  return localStorage.getItem('token') != null
}

/*
 * 退出登录
 */
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('tags')
  localStorage.removeItem('sites')
  router.push('/welcome')
}

module.exports = { guard, loggedIn, logout }
