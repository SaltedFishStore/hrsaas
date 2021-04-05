import { constantRoutes, asyncRoutes } from '@/router' // 引入静态路由

const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  // 负责筛选路由 action 功能是 通过menu的数据和动态路由进行匹配，得到筛选后的路由
  async filterRoutes(context, menus) {
    const routes = []
    menus.forEach(item => {
      if (asyncRoutes.some(route => route.name === item)) {
        routes.push(...asyncRoutes.filter(route => route.name === item))
      }
    })
    // 执行到这里时，routes已经和menus关联了
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
