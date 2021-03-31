import request from '@/utils/request'

/**
 * 查询企业的部门列表
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
