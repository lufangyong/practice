// pages/book/book.js
import {
  BookModel
} from '../../models/book'
import {
  random
} from '../../utils/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList().then(res => {
      this.setData({
        books: res.data.data
      })
    })
  },

  onSearching() {
    this.setData({
      searching: true
    })
  },

  onCancel() {
    this.setData({
      searching: false
    })
  },

  onReachBottom() {
    // console.log('触底')
    this.setData({
      more: random(16)
    })
  }

})
