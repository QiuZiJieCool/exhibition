// components/exList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listSrc:String,
    listName:String,
    hot:String,
    iconNum:Number,
    listId:Number,
    showIcon:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tolistInfo(){
      console.log(this.properties.listId)
      console.log(this.properties.showIcon)
      wx.navigateTo({
        url: `/pages/listInfo/index?id=${this.properties.listId}`,
      })
    }
  }
})
