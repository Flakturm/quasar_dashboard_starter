import { LocalStorage } from 'quasar'
import { mainAxios } from 'boot/axios'

const sanctum = '/sanctum/csrf-cookie'

function login({ commit, dispatch }, payload) {
  return new Promise((resolve, reject) => {
    mainAxios
      .get(sanctum)
      .then(() => {
        mainAxios
          .post('/api/login', payload)
          .then(() => {
            commit('setLoggedIn', true)

            mainAxios
              .get('/api/me')
              .then(({ data }) => {
                commit('setDetails', data)
                commit('setRoles', data)
                commit('setPermissions', data)

                resolve()

                this.$router.replace({ name: 'dashboard' })
              })
              .catch((error) => {
                console.log(error)
                commit('resetState')
                reject(error)
              })
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function updatePassword({}, payload) {
  return new Promise((resolve, reject) => {
    mainAxios
      .post(
        `${process.env.DASHBOARD_API_PREFIX}/users/update-password`,
        payload
      )
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function logout({ commit }) {
  const reset = () => {
    commit('resetState')
    commit('permission/resetState', null, { root: true })
    location.href = '/login'
  }

  mainAxios
    .post('/api/logout')
    .then(() => {
      reset()
    })
    .catch(() => {
      reset()
    })
}

function getState({ commit, dispatch }) {
  const loggedIn = LocalStorage.getItem('user.loggedIn') || false

  if (loggedIn) {
    mainAxios
      .get(sanctum)
      .then(() => {
        mainAxios
          .get('/api/me')
          .then(({ data }) => {
            commit('setLoggedIn', true)
            commit('setDetails', data)
            commit('setRoles', data)
            commit('setPermissions', data)

            dispatch('permission/setRoutes', data, { root: true })
          })
          .catch((error) => {
            commit('resetState')
            this.$router.replace({ name: 'login' })
          })
      })
      .catch((error) => {
        commit('resetState')
        this.$router.replace({ name: 'login' })
      })
  } else {
    commit('resetState')
    commit('permission/resetState', null, { root: true })
    this.$router.replace({ name: 'login' })
  }
}

export { login, logout, updatePassword, getState }
