// pages/listInfo/index.js
var template = require("../../tabbar-template/index.js");
const { request, toScan } = require("../../utils/request.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    current: 0,
    userInfo: null,
    listId: '',
    value: null,
    list2: [
      { name: "越王勾践剑", src: "/assets/timg1.png", hot: "2132w" },
      { name: "富春山居图", src: "/assets/timg3.png", hot: "845w" },
      { name: "九龙鼎", src: "/assets/timg2.png", hot: "8845w" },
      { name: "溪山行旅图", src: "/assets/timg4.png", hot: "8845w" },
      { name: "马踏飞燕", src: "/assets/timg5.png", hot: "8845w" }
    ],
    showInput: false,
    listInfo: null,
    inputMessage: '',
    comentInfo: [],
    isLike:true,
    isCollected:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request(`api/index/getItemById/${options.id}`, "get", {}, res => {
      console.log(res)
      this.setData({
        listInfo: res.data.item,
        userInfo: app.globalData.userInfo,
        listId: options.id
      })
      this.getComments()
    })
    console.log(options)
    template.tabbar("tabBar", 0, this)
  },
  toComment() {
    this.setData({
      showInput: true
    })
  },
  handBlur(){
    this.setData({
      showInput:false
    })
  },
  confirm() {
    console.log(this.data.listId)
    wx.getStorage({
      key: 'token',
      success: res=> {
        console.log(res)
        wx.request({
          url: 'https://wxhelper.itrover.cn/api/comment/publishComment',
          data: {
            content: this.data.inputMessage,
            itemid: this.data.listId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': res.data
          },
          method: 'post',
          success: res=> {
            console.log(res)
            if (res.data.code === 200) {
              wx.showToast({
                title: '评论成功',
                icon: 'success'
              })
              this.setData({
                showInput: false,
                value: ''
              })
              this.getComments()
            }
          }
        })
      },
    })

  },
  message(e) {
    var message = e.detail.value
    this.setData({
      inputMessage: message
    })
  },
  getComments() {
    request('api/comment/getCommentByItemId', 'get', { itemid: this.data.listId }, res => {
      console.log(res)
      this.setData({
        comentInfo: res.data.comments
      })
    })
  },
  addLike(){
    request(`api/user/likeItem?itemid=${this.data.listId}`,'get',{
      like:this.data.isLike
    },res=>{
      
      this.setData({
        isLike: !this.data.isLike
      })
    })
  },
  addCollected(){
    request(`api/user/collectItem?itemid=${this.data.listId}`, 'get', {
      collect: this.data.isCollected
    }, res => {
      this.setData({
        isCollected: !this.data.isCollected
      })
    })
  },
  toScan,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
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
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})