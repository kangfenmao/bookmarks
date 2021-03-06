module.exports = [
  {path: '/welcome', component: require('views/welcome').default},
  {path: '/verify/email', component: require('views/welcome').default},
  {path: '/', component: require('views/home').default},
  {path: '/tag/:id', component: require('views/home').default},
  {path: '/site/create', component: require('views/website/create').default},
  {path: '/site/:id/edit', component: require('views/website/create').default},
  {path: '/user/profile', component: require('views/settings/profile').default},
  {path: '/user/password', component: require('views/settings/password').default},
  {path: '/feedback', component: require('views/settings/feedback').default},
  {path: '/user/delete', component: require('views/settings/delete').default},
  {path: '/support', component: require('views/settings/support').default},
  {path: '/version', component: require('views/settings/version').default},
  {path: '*', component: require('views/errors/not-found').default},
]
