// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
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
    loadMore() {
      // if (!this.data.q) {
      //   return
      // }
      // if (this.isLocked()) {
      //   return
      // }
      // if (this.hasMore()) {
      //   this.locked()
      //   bookModel.search(this.getCurrentStart(), this.data.q)
      //     .then(res => {
      //       this.setMoreData(res.books)
      //       this.unLocked()
      //     }, () => {
      //       this.unLocked()
      //     })
      //   // 死锁
      // }
    },

    onCancel() {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete() {
      this.initialize()
      this._closeResult()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text

      this.setData({
        q
      })
      bookModel.search(q).then(res => {
        keywordModel.addToHistory(q)
        this.setMoreData(res.data.data)
        this.setTotal(res.data.data.length)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }

  }
})
