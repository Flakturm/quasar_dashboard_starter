import { LocalStorage } from 'quasar'
import axios from 'axios'

const sanctum = '/sanctum/csrf-cookie'

function login({ commit, dispatch }, payload) {
  return new Promise((resolve, reject) => {
    axios
      .get(sanctum)
      .then(() => {
        axios
          .post('/api/login', payload)
          .then(() => {
            commit('setLoggedIn', true)

            axios
              .get('/api/me')
              .then((response) => {
                const data = response.data.data
                commit('setDetails', data)
                commit('setRoles', data)
                commit('setPermissions', data)

                resolve()

                this.$router.replace({ name: 'dashboard' })
              })
              .catch((error) => {
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

function logout({ commit }) {
  const reset = () => {
    commit('resetState')
    commit('permission/resetState', null, { root: true })
    location.href = '/login'
  }

  axios
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
    axios
      .get(sanctum)
      .then(() => {
        axios
          .get('/api/me')
          .then((response) => {
            const data = response.data.data
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

export { login, logout, getState }
