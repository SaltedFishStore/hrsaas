import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimestamp } from '@/utils/auth'
import router from '@/router'

const TimeOut = 7200 // 定义2个小时的有效时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置baseURL
  timeout: 5000 // 超时时间设置
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 如果token存在，则检查是否超时
      if (checkTimeOut()) {
        // 超时了，调用登出action，跳转到登录页
        store.dispatch('user/lgout')
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
      }
      // 没有超时，则注入token
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
      Message.error(message) // 提示错误
      return Promise.reject(new Error(message)) // 返回错误
    }
  },
  error => {
    if (error.response.data.code === 10002) {
      //  当状态码为10002时 表示后端告诉我 超时了
      store.dispatch('user/lgout') // 调用登出的action
      router.push('/login') // 回到登录页
      return Promise.reject(new Error('超时了')) // 返回错误
    } else {
      Message.error(error.message) // 提示错误
      return Promise.reject(error) // 返回错误
    }
  }
)

const checkTimeOut = () => {
  const currentTime = new Date().getTime() // 获取当前时间
  const timestamp = getTimestamp() ? getTimestamp() : 0 // 如果没有设置时间戳，则认为超时

  return (currentTime - timestamp) / 1000 > TimeOut
}

export default service
