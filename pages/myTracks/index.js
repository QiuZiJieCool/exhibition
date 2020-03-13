// pages/myTracks/index.js
var template = require("../../tabbar-template/index.js");
const { request, toScan } = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      current:1,
      list0: [],
    list1: [],
    list2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this) //0表示第一个tabbar，这里1表示第二个 tabbar 的 icon
    request('api/user/getHistory','get',{
     sign:2
    },res=>{
      console.log(res)
      if(res.code == 200){
        this.setData({
          list0:res.data.item
        })
      }
    })
  },
  star(){
    this.setData({
      current: 2
    })
    request('api/user/getHistory', 'get', {
      sign: 3
    }, res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          list1:res.data.item
        })
      }
    })

  },
  click(){
    this.setData({
      current: 3
    })
    request('api/user/getHistory', 'get', {
      sign: 1
    }, res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          list2: res.data.item
        })
      }
    })
  },
  message() {
    this.setData({
      current: 1
  })
  },
  toScan,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})