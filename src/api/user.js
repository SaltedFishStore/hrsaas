import request from '@/utils/request'

/**
 * 登录
 * @param data：登录数据
 */
export function login(data) {
  return request({
    url: '/api/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function logout() {

}
