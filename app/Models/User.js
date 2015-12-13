function info() {
  return JSON.parse(localStorage.getItem('user'))
}

function cache(user) {
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

module.exports = { info, cache }
