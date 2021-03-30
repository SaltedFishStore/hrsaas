import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

const state = {
  token: getToken(), // token初始状态
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token) // 设置缓存
  },
  removeToken(state) {
    state.token = null
    removeToken() // 清除token
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 使用浅拷贝的方式赋值对象
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 登录
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  },
  // 获取用户信息
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    return result
  },
  // 退出登录
  lgout(context) {
    context.commit('removeToken') // 删除token
    context.commit('removeUserInfo') // 删除用户信息
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
