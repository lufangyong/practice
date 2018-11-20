// pages/classic/classic.js
import ClassicModel from '../../models/classic'
import LikeModel from '../../models/like'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true,
    latestIndex: null,
    likeCount: 0,
    likeStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res => {
      // console.log(res.data)
      this.setData({
        classicData: res.data,
        latestIndex: res.data.index,
        likeCount: res.data.favNums,
        likeStatus: res.data.likeStatus,
      })
    })
  },
  onLike: function (event) {
    console.log(event)
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id)
  },
  onNext: function (event) {
    this._updateClassic('next')

  },
  onPrevious: function (event) {
    this._updateClassic('previous')

  },
  _updateClassic: function (nextOrPrevious) {
    const index = this.data.classicData.index

    classicModel.getClassic(index, nextOrPrevious, res => {
      this._getLikeStatus(res.data.id, res.data.type)

      this.setData({
        classicData: res.data,
        latest: classicModel.isLatest(res.data.index),
        first: classicModel.isFirst(res.data.index)
      })
    })

  },
  _getLikeStatus: function (id, category) {
    likeModel.getClassicLikeStatus(id, category, res => {
      this.setData({
        likeStatus: res.data.likeStatus,
        likeCount: res.data.favNums
      })
    })
  },
  methods: {

  },

})
