// pages/login/index.js
//获取应用实例
const { request } = require("../../utils/request.js")
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
    let codeP = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          this.setData({
            code: res.code
          })
          resolve(res.code)
        }
      })
    })
    // let userInfoP = new Promise((resolve, reject) => {
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //       resolve(1)
    //     }
    //   })
    // })
    codeP.then((res) => {
      console.log(res)
      this.setData({
        canLogin: true
      })
    }).catch(err => {
      wx.showToast({
        title: '系统异常',
      })
    })

    //   if (app.globalData.userInfo) {
    //     this.setData({
    //       userInfo: app.globalData.userInfo,
    //       hasUserInfo: true
    //     })
    //   } else if (this.data.canIUse){
    //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //     // 所以此处加入 callback 以防止这种情况
    //     app.userInfoReadyCallback = res => {
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   } else {
    //     // 在没有 open-type=getUserInfo 版本的兼容处理
    //     wx.getUserInfo({
    //       success: res => {
    //         app.globalData.userInfo = res.userInfo
    //         this.setData({
    //           userInfo: res.userInfo,
    //           hasUserInfo: true
    //         })
    //       }
    //     })
    //   }
  },
  userLogin: function () {
    console.log("111")
    const { code } = this.data
    console.log(this.data.code)
    const { nickName, gender, city, province, country, avatarUrl } = this.data.userInfo
    wx.request({
      url: 'https://wxhelper.itrover.cn/api/login',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      data: { code, nickName, gender, city, province, country, avatarUrl },
      success: res => {
        console.log(res)
        if (res.data.code !== 200) return
        wx.showToast({
          title: '登陆成功'
        })
        wx.setStorage({
          key: 'token',
          data: res.data.data.token,
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/tabbar_index/travel_index',
          })
        }, 1000)
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
