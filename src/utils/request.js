import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置baseURL
  timeout: 5000 // 超时时间设置
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 如果token存在，则注入token
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data // 成功直接返回数据
    } else {
      Message(message) // 提示错误
      return Promise.reject(new Error(message)) // 返回错误
    }
  },
  error => {
    Message(error.message) // 提示错误
    return Promise.reject(error) // 返回错误
  }
)

export default service
