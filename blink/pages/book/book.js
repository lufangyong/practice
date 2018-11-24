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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList().then(res => {
      console.log(res.data);
      this.setData({
        books: res.data.data
      })
    })
  },

})
