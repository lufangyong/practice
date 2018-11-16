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
      }
    })
  }

  getClassic(index, nextOrPrevious, cb) {
    this.request({
      url: `/classic/${index}/${nextOrPrevious}`,
      success: res => {
        cb(res)
      }
    })
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

}
