import axios from 'axios'
import store from '@/store'

// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
  //   timeout: 5000
})

request.interceptors.request.use(
  function (config) {
    const {
      getters: { islogin },
      state: { tokenObj }
    } = store
    if (islogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }

    return config
  },
  function (error) {
    return error
  }
)
export default request
