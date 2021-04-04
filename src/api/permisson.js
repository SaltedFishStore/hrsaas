import request from '@/utils/request'

// 获取所有员工权限
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

// 添加员工权限
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 根据ID更新权限点详情
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

// 删除员工权限
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
// 根据ID获取权限点详情
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
