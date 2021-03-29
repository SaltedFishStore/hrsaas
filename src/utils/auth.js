import Cookies from 'js-cookie'

const TokenKey = 'token'

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
