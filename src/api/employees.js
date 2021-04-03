import request from '@/utils/request'

/**
 * 获取员工简单列表
 */
export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工列表
 */
export function getEmployeesList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工
 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 新增员工
 */
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 * 导入员工信息
 */
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
