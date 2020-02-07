// components/select/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray: {
      type: Array,
    },
    defalutSelect: {
      type: String
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false, //初始option不显示
    nowText: "请选择", //初始内容
    animationData: {}, //右边箭头的动画
    num: ''
  },
  attached() {
    // 在组件实例进入页面节点树时执行
    this.initSelect();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initSelect: function () {
      var nowData = this.properties.propArray;
      var seletedID = this.properties.defalutSelect;
      if (seletedID) {
        var nowText = nowData.find(obj => obj.id == seletedID).text 
        this.setData({
          selectShow: false,
          nowText: nowText,
          num: seletedID
        })
      }
    },
    //option的显示与否
    selectToggle: function () {
      var nowShow = this.data.selectShow; //获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function (e) {
      var nowData = this.properties.propArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.id; //当前点击的索引
      var kind = nowData.find(obj=>obj.eraname)
      if(kind){
        var nowText = nowData.find(obj => obj.id == nowIdx).eraname //当前点击的内容
        //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
        this.animation.rotate(0).step();
        this.setData({
          selectShow: false,
          nowText: nowText,
          num: nowIdx,
          animationData: this.animation.export()
        })
        this.triggerEvent('selected', {
          selectedID: e.target.dataset.id,
          eraname: nowText
        });
      }else {
        var nowText = nowData.find(obj => obj.id == nowIdx).typename //当前点击的内容
        //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
        this.animation.rotate(0).step();
        this.setData({
          selectShow: false,
          nowText: nowText,
          num: nowIdx,
          animationData: this.animation.export()
        })
        this.triggerEvent('selected', {
          selectedID: e.target.dataset.id,
          type: nowText
        });
      }

    }
  }
})
