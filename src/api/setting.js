import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} params
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 根据id获取企业信息
 * @param {*} companyId
 */
export function getCompanyInfoById(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 * 删除角色
 * @param {*} id
 */
export function deleteRoleById(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 修改角色
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
/**
 * 获取角色详情
 */
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 新增角色
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}