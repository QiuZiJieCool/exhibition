// pages/museum/index.js
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
    // 测试数据
    newsInfos: [
      [{
        desc: "这是关于长江三峡的一条新闻",
          src: "/assets/museum_img.png"
        },
        {
          desc: "这是关于长江三峡的一条新闻，欢迎收看",
          src: "/assets/museum_img.png"
        }
      ],
      [{
        desc: "这是关于长江三峡的一条新闻",
        src: "/assets/museum_img.png"
      },
        {
          desc: "这是关于长江三峡的一条新闻，欢迎收看",
          src: "/assets/museum_img.png"
        }
      ],
      [{
          desc: "这是关于长江三峡的一条新闻，欢迎收看",
          src: "/assets/museum_img.png"
        },
        {
          desc: "这是关于长江三峡的一条新闻，欢迎收看",
          src: "/assets/museum_img.png"
        }
      ]
    ],
    borderLine: true,
    value: null,
    publishTime:'',
    newsInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 2, this) //0表示第一个tabbar，这里1表示第二个 tabbar 的 icon
    request('api/news', 'get', {}, res => {
      if (res.code === 200) {
       console.log(res)
        var publishTime = new Date(parseInt(res.data.list[0][0].publishTime))
        publishTime = `${publishTime.getHours()}:${publishTime.getMinutes()}`
        this.setData({
          newsInfo: res.data.list,
          publishTime:publishTime
        })
        //完整的时间格式
        // var y = dataTime.getFullYear()
        // var m = dataTime.getMonth()+1
        // var d= dataTime.getDate()
        // var h = dataTime.getHours()
        // var mm = dataTime.getMinutes()
        // firseNew.publishTime = `${dataTime.getFullYear()}-${dataTime.getMonth() + 1}-${dataTime.getDate()} ${dataTime.getHours()}:${dataTime.getMinutes()}`
      }
    })
  },
  toScan,
  museum() {
    this.setData({
      borderLine: true
    })

  },
  idea() {
    this.setData({
      borderLine: false
    })
  },
  send() {
    request('api/advice', 'post', {
      advice: this.data.value
    }, res => {
      console.log(res)
    })

  },
  messageInfo(e) {
    var value = e.detail.value
    this.setData({
      value: value
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