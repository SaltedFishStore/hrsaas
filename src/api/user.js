import request from '@/utils/request'

/**
 * 登录
 * @param data：登录数据
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
