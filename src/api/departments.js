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

/**
 * 获取部门详情
 * @param {*} id
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'put'
  })
}

/**
 * 编辑部门
 * @param {*} data
 */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
