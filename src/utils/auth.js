import Cookies from 'js-cookie'

const TokenKey = 'token'
const TimeKey = 'timestamp' // 设定一个时间戳

// 读取缓存中的token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 将token写入缓存
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除缓存中的token
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 读取时间戳
export function getTimestamp(params) {
  return Cookies.get(TimeKey)
}

// 设置时间戳
export function SetTimestamp() {
  // 设置当前最新时间
  return Cookies.set(TimeKey, new Date().getTime())
}
