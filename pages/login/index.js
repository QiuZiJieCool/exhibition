// pages/login/index.js
//获取应用实例
const {
  request
} = require("../../utils/request.js")
const app = getApp()

Page({
  data: {
    motto: '欢迎使用展览助手',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canLogin: false,
    code: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let loginP = new Promise((resolve, rej) => {
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          resolve(res.userInfo)
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    })
    let codeP = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          this.setData({
            code: res.code,
            canLogin: true
          })
          resolve(res.code)
        }
      })
    })
   Promise.all([codeP,loginP]).then(res=>{
     console.log(res)
     this.userLogin()
   }).catch(err=>{
     wx.showToast({
       title: '登陆异常，请重新登陆',
     })
   })
  },
  userLogin: function () {
    const {
      code
    } = this.data
    const {
      nickName,
      gender,
      city,
      province,
      country,
      avatarUrl
    } = this.data.userInfo
    wx.request({
      url: 'https://wxhelper.itrover.cn/api/login',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      data: {
        code,
        nickName,
        gender,
        city,
        province,
        country,
        avatarUrl
      },
      success: res => {
        console.log(res)
        if (res.data.code == 200) {
          wx.setStorage({
            key: 'token',
            data: res.data.data.token,
            success: res => {
              wx.showToast({
                title: '登陆成功',
                success: res => {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: '/pages/tabbar_index/travel_index',
                    })
                  }, 1000)
                }
              })
            }
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })

  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    if (this.data.canLogin) {
      this.userLogin()
    }
  }
})