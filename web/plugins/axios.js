import Vue from 'vue'

export default function ({ $axios }) {
  $axios.onRequest(config => {
    const token = localStorage.getItem('access_token')
    config.headers['Authorization'] = 'Bearer ' + token
    return config
  })


  $axios.onRequestError(error => {
    return Promise.reject(error)
  })

  $axios.onResponse(response => {
    const res = response.data
    if (res.code === 1) {
      Vue.prototype.$notify({ type: 'error', title: '错误', message: res.msg })
    }
  })

  $axios.onRequestError(error => {
    // 对响应错误做些什么
    const { code, message } = error
    // 请求超时处理
    if (code === 'ECONNABORTED' || message === 'Network Error' || message.includes('timeout')) {
      Vue.prototype.$message({ type: 'error', title: '错误', message: '网络错误' })
      return Promise.reject(message)
    }

    // http错误处理
    const { status, data } = error.response
    switch (status) {
      // 401 未登录(无token/token无效/过期) -跳转登录页面，并携带当前页面的路径
      case 401:
        this.$store.dispatch('reLogin')
        break
      // 403 验证是通过的, 但没权限访问该接口
      case 403:
        Vue.prototype.$message({ type: 'error', message: '你没有权限执行此操作！' })
        break
      // 404 请求资源不存在
      case 404:
        Vue.prototype.$message({ type: 'error', message: '404 Not Found' })
        break
      // 500 服务器错误
      case 500:
        Vue.prototype.$message({ type: 'error', message: '服务器繁忙~' })
        break
      // 其它错误码 (405, 422......)
      default:
        console.log(data.msg || data.message || data || 'Unknown Error')
    }
    return Promise.reject(data)
  })
}
