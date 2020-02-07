function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/tabbar_index/travel_index",
      "iconPath": "/assets/shouye.png",
      "selectedIconPath": "/assets/shouye-active.png",
      "text": "首页"
    },
    {
      "current": 0,
      // "pagePath": "/pages/tabbar-scan/travel_car",
      "iconPath": "/icon/saoyisao1.png",
      "selectedIconPath": "/icon/saoyisao1.png",
    },
    {
      "current": 0,
      "pagePath": "/pages/tabbar_my/travel_my",
      "iconPath": "/assets/yonghu.png",
      "selectedIconPath": "/assets/yonghu-active.png",
      "text": "个人中心"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']   //换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}
function toScan(){
  console.log("111")
}
module.exports = {
  tabbar: tabbarmain
}