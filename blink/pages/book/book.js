// pages/book/book.js
import {
  BookModel
} from '../../models/book'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
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
  }

})
