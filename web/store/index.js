import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  access_token: '', // token
  hasLogin: false, // 是否已登录
  userInfo: { // 用户信息
    _id: 'ObjectId',
    username: '',
    avatar: '',
    introduce: '',
    createTime: '',
    updateTime: ''
  },
  currentArticle: null,
  routeInfo: {} // 当前激活的路由信息
})

export const mutations = {
  // 设置登录状态
  hasLogin(state, hasLogin) {
    state.hasLogin = hasLogin
  },
  // 设置用户信息
  userInfo(state, userInfo) {
    state.userInfo = userInfo
    localStorage.setItem('userInfo', state.userInfo)
  },
  // 保存路由信息
  routeInfo(state, routeInfo) {
    state.routeInfo = routeInfo
  },
  // 登录成功
  login(state, data) {
    // 重置vuex相关数据
    state.access_token = data.token
    state.hasLogin = true
    state.userInfo = data.user
    localStorage.setItem('access_token', state.access_token)
  },
  // 退出登录
  logout(state) {
    // 重置vuex相关数据
    state.access_token = ''
    state.hasLogin = false
    state.userInfo = {
      _id: 'ObjectId',
      username: '',
      avatar: '',
      introduce: '',
      createTime: '',
      updateTime: ''
    }
    localStorage.setItem('access_token', state.access_token)
  },
  // 设置当前文章
  SET_CURRENT_ARTICLE(state, article) {
    state.currentArticle = article
  }
}

export const actions = {
  // 重新登录
  reLogin({ commit }) {
    Vue.prototype.$message({ type: 'error', message: '登录过期 请重新登录！' })
    // 退出登录
    commit('logout')
    router.push({
      path: '/login',
      // 将当前路由携带过去，方便登录成功后跳转回去
      query: { redirect: router.currentRoute.fullPath }
    })
  }
}
