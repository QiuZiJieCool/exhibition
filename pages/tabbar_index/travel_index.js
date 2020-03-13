// pages/travel_index/travel_index.js
var template = require("../../tabbar-template/index.js");
const {
  request,
  toScan
} = require("../../utils/request.js")
//index.js
//获取应用实例
// const { request } = require("../../utils/request.js")
const app = getApp()
Page({
  data: {
    itemname: '',
    eraname: null,
    rankBy: '',
    typename: null,
    currentIndex: 0,
    selectArray1: [],
    selectArray2: [],
    list0: [],
    list1: [],
    list2: [],
    list3: [],
    sortType: null,
    show: true,
    hasMore: true,
    rankList: ["默认", "收藏量", "点赞量", "评论量"]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // 请求所有年代
    request('api/index/getAllEra', 'get', {}, res => {
      console.log(res)
      if (res.code !== 200) return console.log('获取年代失败')
      // 处理获取的数据，将eras改成text
      // const arr = this.convertKey(res.data.eras,['id','text'])
      // console.log(arr)
      this.setData({
        selectArray1: res.data.eras
      })
    })
    // 请求所有类别
    request('api/index/getAllType', 'get', {}, res => {
      console.log(res)
      if (res.code !== 200) return console.log('获取类别失败')
      // 处理获取的数据，将eras改成text
      // const arr = this.convertKey(res.data.types, ['id', 'text'])
      // console.log(arr)
      this.setData({
        selectArray2: res.data.types
      })
    })
    // 请求默认数据
    request("api/index", "post", {
      pageRequest: {
        pageSize: 5,
        pageNum: 1
      }
    }, res => {
      console.log(res)
      this.setData({
        list0: res.data.item.content
      })
    })
    template.tabbar("tabBar", 0, this) //0表示第一个tabbar，这里1表示第二个 tabbar 的 icon
  },
  // loadMore(){
  //   let str= ''
  //   if(this.data.currentIndex ==1){
  //     str ='getItemsByCollection'
  //     request(`api/index/${str}`,'post',{
  //       pageRequest:{
  //         pageNum:2,
  //         pageSize:5
  //       }
  //     },res=>{
  //       console.log(res)
  //     })
  //   }
  // },

  // 改变key值函数
  convertKey(arr, key) {
    let newArr = [];
    arr.forEach((item, index) => {
      let newObj = {};
      for (var i = 0; i < key.length; i++) {
        newObj[key[i]] = item[Object.keys(item)[i]]
      }
      newArr.push(newObj);
    })
    console.log(newArr)
    return newArr;
  },

  selectEvent: function (e) {
    console.log(e)
    if (e.detail.eraname) {
      this.setData({
        eraname: e.detail.eraname
      })
    } else if (e.detail.type) {
      this.setData({
        typename: e.detail.type
      })
    }
    this.setData({
      sortType: e.detail.selectedID,
      pageIndex: 1
    })
    request('api/index/mutiQuery', 'post', {
      eraname: this.data.eraname,
      typename: this.data.typename
    }, res => {
      console.log(res)
      this.setData({
        list0: res.data.item.content
      })
    })
    // this.Get();
  },
  toItem(e) {
    var index = e.currentTarget.dataset.index
    if (index == "1") {
      request("api/index/getItemsByCollection", "post", {}, res => {
        console.log(res)
        this.setData({
          list1: res.data.item.content
        })
      })
    } else if (index == "2") {
      request("api/index/getItemsByClick", "post", {}, res => {
        console.log(res)
        this.setData({
          list2: res.data.item.content
        })
      })
    } else if (index == "3") {
      request("api/index/getItemsByComment", "post", {}, res => {
        console.log(res)
        this.setData({
          list3: res.data.item.content
        })
      })
    } else {
      request("api/index", "post", {}, res => {
        console.log(res)
        this.setData({
          list0: res.data.item.content
        })
      })
    }
    this.setData({
      currentIndex: index
    })
  },
  bindInput(e) {
    console.log(!e.detail.value)
    if (this.data.currentIndex == 1) {
      if (e.detail.value) {
        request(`api/index/mutiQuery`, 'post', {
          itemname: e.detail.value
        }, res => {
          if (res.code !== 200) return console.log('查询失败')
          this.setData({
            itemname: e.detail.value,
            list1: res.data.item.content,
            sortType: null
          })
        })
      } else {
        request("api/index/getItemsByCollection", "post", {}, res => {
          console.log(res)
          this.setData({
            list1: res.data.item.content
          })
        })
      }
    } else if (this.data.currentIndex == 2) {
      if (e.detail.value) {
        request(`api/index/mutiQuery`, 'post', {
          itemname: e.detail.value
        }, res => {
          if (res.code !== 200) return console.log('查询失败')
          this.setData({
            itemname: e.detail.value,
            list2: res.data.item.content,
            sortType: null
          })
        })
      } else {
        request("api/index/getItemsByClick", "post", {}, res => {
          console.log(res)
          this.setData({
            list2: res.data.item.content
          })
        })
      }
    } else if (this.data.currentIndex == 3) {
      if (e.detail.value) {
        request(`api/index/mutiQuery`, 'post', {
          itemname: e.detail.value
        }, res => {
          if (res.code !== 200) return console.log('查询失败')
          this.setData({
            itemname: e.detail.value,
            list3: res.data.item.content,
            sortType: null
          })
        })
      } else {
        request("api/index/getItemsByComment", "post", {}, res => {
          console.log(res)
          this.setData({
            list3: res.data.item.content
          })
        })
      }
    } else {
      request(`api/index/mutiQuery`, 'post', {
        itemname: e.detail.value
      }, res => {
        if (res.code !== 200) return console.log('查询失败')
        this.setData({
          itemname: e.detail.value,
          list0: res.data.item.content,
          sortType: null
        })
      })
    }

  },
  // 底部扫一扫方法
  toScan,
  onReachBottom: function () {
    //  this.loadMore()
  },
})


// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//       template.tabbar("tabBar", 0, this) //0表示第一个tabbar，这里1表示第二个 tabbar 的 icon

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })