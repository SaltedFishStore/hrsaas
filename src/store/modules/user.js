import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() // token初始状态
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token) // 设置缓存
  },

  removeToken(state) {
    state.token = null
    removeToken() // 清除token
  }
}

const actions = {
  async login(context, data) {
    const response = await login(data)
    if (response.data.success) {
      context.commit('setToken', response.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
