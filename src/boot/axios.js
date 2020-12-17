import axios from 'axios'

export default ({ Vue, router }) => {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = process.env.API_BASE_URL

  Vue.prototype.$axios = axios

  // ... (your request interceptor here)

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        router.push({ name: 'login' })
        return
      }
      return Promise.reject(error)
    }
  )
}
