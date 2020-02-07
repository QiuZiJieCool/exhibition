// pages/myTracks/index.js
var template = require("../../tabbar-template/index.js");
const { request, toScan } = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      current:1,
      list0: [{ name: "马踏飞燕", src: "/assets/timg5.png", hot: "8845w" },
          { name: "越王勾践剑", src: "/assets/timg1.png", hot: "2132w" },
          { name: "富春山居图", src: "/assets/timg3.png", hot: "845w" },
          { name: "九龙鼎", src: "/assets/timg2.png", hot: "8845w" },
          { name: "溪山行旅图", src: "/assets/timg4.png", hot: "9445w" }],
    list1: [
    { name: "富春山居图", src: "/assets/timg3.png", hot: "845w" },
      { name: "越王勾践剑", src: "/assets/timg1.png", hot: "2132w" },
    { name: "九龙鼎", src: "/assets/timg2.png", hot: "8845w" },
      { name: "马踏飞燕", src: "/assets/timg5.png", hot: "8845w" },
    { name: "溪山行旅图", src: "/assets/timg4.png", hot: "9445w" }],
    list2: [
    { name: "越王勾践剑", src: "/assets/timg1.png", hot: "2132w" },
      { name: "马踏飞燕", src: "/assets/timg5.png", hot: "8845w" },
    { name: "溪山行旅图", src: "/assets/timg4.png", hot: "9445w" },
      { name: "富春山居图", src: "/assets/timg3.png", hot: "845w" },
      { name: "九龙鼎", src: "/assets/timg2.png", hot: "8845w" }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this) //0表示第一个tabbar，这里1表示第二个 tabbar 的 icon
  },
  star(){
   this.setData({
     current:2
   })
  },
  click(){
    this.setData({
      current: 3
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