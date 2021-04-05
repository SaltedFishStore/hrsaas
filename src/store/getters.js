const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userName: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto, // 头像
  companyId: state => state.user.userInfo.companyId, // 企业id
  routes: state => state.permission.routes // 动态获取路由
}
export default getters
