import {
  HTTP
} from '../utils/http'

export default class ClassicModel extends HTTP {
  getLatest(cb) {
    this.request({
      url: '/classic/latest',
      success: res => {
        cb(res)
        this._setLatestIndex(res.data.index)
        let key = this._getKey(res.data.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index, nextOrPrevious, cb) {
    // 添加缓存机制
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)

    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.data.index), res)
          cb(res)
        }
      })
    } else {
      cb(classic)
    }

  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index === latestIndex ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }

  _getKey(index) {
    return `classic-${index}`
  }

}
