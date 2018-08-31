import Cookie from 'js-cookie'

let token = Cookie.get('token')
if (!token) token = ''

let user = Cookie.get('user')
if (user) {
  user = JSON.parse(user)
  console.log('当前用户信息：', user)
} else {
  user = {}
}

export const state = () => ({
  token,
  user
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
  // toggle (state, todo) {
  //   todo.done = !todo.done
  // }
}
