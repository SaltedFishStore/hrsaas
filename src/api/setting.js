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
