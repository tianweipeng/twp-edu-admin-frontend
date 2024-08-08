import { constantRoutes,asyncRoutes } from '@/router'
import { getMenu } from '@/api/login'
import Layout from '@/views/layout/Layout'

function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  try {
    const accessedRouters = asyncRouterMap.filter(route => {
      if (route.component) {
        if (route.component === 'Layout') { // Layout组件特殊处理
          route.component = Layout
        } else {
          const component = route.component
          route.component = resolve => {
            require(['@/views' + component + '.vue'], resolve)
          }
        }
      }
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    })
    return accessedRouters
  } catch (e) {
    console.log(e)
  }
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, roles) {
    // 取后台路由
    const asyncRouter = await getMenu()
    return new Promise(resolve => {
      const tmp = asyncRouter.data.permissionList
      const accessedRoutes = filterAsyncRouter(tmp)

      if ( roles.includes('超级管理员') ){
        commit('SET_ROUTES', asyncRoutes)
      }
      else {
      commit('SET_ROUTES', accessedRoutes)
      console.log('normal')
      }
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
