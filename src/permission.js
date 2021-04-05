import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404'] // 白名单

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断是否有token
  if (store.getters.token) {
    if (to.path === '/login') { // 有token跳转登录页
      next('/') // 跳转到首页
    } else {
      // 只有在用户拥有token，并且直接放行的情况下
      // 先判断之前有没有获取资料
      if (!store.getters.userId) {
        // 如果没有userId，调用vuex获取用户资料的action
        const { roles } = await store.dispatch('user/getUserInfo')
        // roles.menus  权限标识，需要和路由模块对应，进行筛选，筛选得到的权限进行 addRouters 并写入 vuex 中
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        // 404 page must be placed at the end !!!
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 将得到的动态路由添加到路由表
        // 如果使用了addRoutes，应该使用next(to.path)，否则页面刷新会导致路由权限失效
        next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next() // 在白名单中，直接放行
    } else {
      next('/login') // 跳到登录页
    }
  }
  NProgress.done() // 关闭进度条
})

// 路由后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
