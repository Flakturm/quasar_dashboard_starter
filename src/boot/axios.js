import Vue from 'vue'
import axios from 'axios'
import { LocalStorage } from 'quasar'

const mainAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.API_BASE_URL
})

Vue.prototype.$axios = mainAxios

const mediaAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

Vue.prototype.$mediaAxios = mediaAxios

export default ({ urlPath }) => {
  mainAxios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 419) {
        LocalStorage.set('user.loggedIn', false)
        if (!urlPath.includes('login')) {
          location.href = '/login'
        }
      }
      return Promise.reject(error)
    }
  )

  mediaAxios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 419) {
        location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}

export { mainAxios, mediaAxios }
