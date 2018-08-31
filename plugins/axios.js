// import axios  from 'axios'
//
// export default function ({$axios, redirect}) {
//   $axios.defaults.baseURI = 'https://localhost:4567'
//   $axios.ajax = function (params) {
//     console.log('%c开始请求接口 ====>', 'color:#CD3278', params.url)
//     return axios(params).catch(function (error) {
//       console.log('%c接口出现错误 ====>', 'color:#f00', error)
//     })
//   }
//   $axios.getData = function (response) {
//     console.log('%c接口返回数据 ====>', 'color:#CD3278', response)
//     return response
//   }
// }
import Vue from 'vue'
import Axios from 'axios'
import Cookie from 'js-cookie'

Axios.ajax = function (params, callback = () => {
}, error = (err) => {
  console.info(err)
}, catchError = (err) => {
  console.info(err)
}) {
  console.log('%c开始请求接口 ====>', 'color:#CD3278', params.url)
  params.url = '/api/api/v1' + params.url;

  let token = Cookie.get('token')
  if (token) {
    params.headers = {
      'x-access-token': token
    }
  }

  if (params.async) {
    return Axios(params)
  }

  Axios(params).then(function (res) {
    let data = res.data
    if (data.code === 20000 || data.resultCode === 0) {
      console.log('%c接口成功返回 ====>', 'color:#CD3278', data)
      callback(data)
    } else if (data.code === 42006) {
      console.log('%c接口错误返回 ====>', 'color:#FF0000', '用户未登录')
      Cookie.remove('token')
      Cookie.remove('user')
      location.href = '/login'
    } else {
      console.log('%c接口错误返回 ====>', 'color:#FF0000', data)
      error(data)
    }
  }).catch(function (error) {
    console.log(error)
    error.msg = error.toString()
    catchError(error)
  })
}
Vue.prototype.$axios = Axios;
