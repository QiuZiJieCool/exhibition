// pages/voluntary/index.js
var template = require("../../tabbar-template/index.js");
const {
  request,
  toScan
} = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsInfo: [
      [{
          desc: "XX博物馆A区招募志愿者了！！点击进入",
          src: "/assets/museum_img.png",
          publishTime:'17:59'
        },
        {
          desc: "XX博物馆B区招募志愿者了！！点击进入",
          src: "/assets/museum_img.png"
        }
      ],
      [{
          publishTime: '19:30',
          desc: "XX博物馆A区招募志愿者了！！点击进入",
          src: "/assets/museum_img.png"
        },
        {
          desc: "XX博物馆B区招募志愿者了！！点击进入",
          src: "/assets/museum_img.png"
        }
      ]
    ],
    borderLine: true,
    value: null,
    activity: [{
        name: "子洁",
        location: "YF107",
        phone: '10279647572'
      },
      {
        name: "子洁",
        location: "YF107",
        phone: '123456789111'
      },
      {
        name: "子洁",
        location: "YF107",
        phone: '15523948585'
      },
      {
        name: "子洁",
        location: "YF107",
        phone: '123456789111'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 2, this) //0表示第一个tabbar，这里1表示第二个 tabbar 的 icon
  },
  museum() {
    this.setData({
      borderLine: true
    })

  },
  toScan,
  idea() {
    this.setData({
      borderLine: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})