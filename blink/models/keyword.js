import {
  HTTP
} from '../utils/http-p';

class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 10

  getHistory() {
    const words = wx.getStorageSync(this.key)

    if (!words) {
      return []
    }
    return words
  }

  getHot() {
    return this.request({
      url: '/book_hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)

    if (!has) {
      const length = words.maxLength

      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }

  }
}

export {
  KeywordModel
}
