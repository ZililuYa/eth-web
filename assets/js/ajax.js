import axios from 'axios'

const app = {
  post (url, data, callback) {
    app.ajax(url, 'POST', data, callback)
  },
  get () {
  },
  ajax (url, method, data, callback) {
    console.log('请求接口：')
    axios({
      method,
      url,
      data
    }).then(function (retData) {
      callback(retData)
    });
  }
}

export default app
