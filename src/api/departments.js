import request from '@/utils/request'

/**
 * 查询企业的部门列表
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * 根据id删除部门
 * @param {*} id
 */
export function delDepartementsById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/**
 * 新增部门
 * @param {*} data
 */
export function addDepartements(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
