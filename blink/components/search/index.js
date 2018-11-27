// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    books: []
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.data.data
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel', {}, {})
    },

    onDelete() {
      this.setData({
        searching: false,
        q: '',
      })
    },

    onConfirm(event) {
      const q = event.detail.value || event.detail.text

      this.setData({
        searching: true,
        q
      })
      bookModel.search(q).then(res => {
        keywordModel.addToHistory(q)
        this.setData({
          books: res.data.data
        })
      })
    },

  }
})
