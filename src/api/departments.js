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
 * @param {*}
 */
export function delDepartementsById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
