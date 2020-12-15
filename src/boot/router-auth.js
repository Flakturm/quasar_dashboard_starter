import { LocalStorage } from 'quasar'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loginPath = '/login',
      loggedIn = LocalStorage.getItem('user.loggedIn'),
      guestRoutes = [loginPath, '/register']

    if (!loggedIn && !guestRoutes.includes(to.path)) {
      next(loginPath)
    } else {
      next()
    }
  })
}
