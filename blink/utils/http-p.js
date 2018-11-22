import {
  config
} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}

class HTTP {
  request({url, data = {}, method = "get"}) {
    return new Promise((resolve, reject) => {
      this._request({url, resolve, reject, data, method})
    })
  }

  _request({url, resolve, reject, data = {}, method = 'get'}) {
    wx.request({
      url: `${config.apiBaseUrl}${url}`,
      data: data,
      header: {
        'content-type': 'application/json',
        // 'content-type': 'application/x-www-form-urlencoded',
        'appkey': config.appkey
      },
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: res => {
        let code = res.statusCode.toString()

        if (code.startsWith('2')) {
          resolve(res)
        } else {
          reject()
          let msg = res.data.msg
          this._showError(msg)
        }
      },
      fail: err => {
        reject(err)
        this._showError(1)
      },
      complete: function (res) {
      },
    })
  }

  _showError(errorCode) {
    if (!errorCode) {
      errorCode = 1
    }

    const tip = tips[errorCode]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}
