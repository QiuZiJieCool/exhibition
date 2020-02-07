const BASE = 'https://wxhelper.itrover.cn/'
const header = {
  'content-type': 'application/json'
  // 'content-type': 'application/x-www-form-urlencoded'
}

/**
 * 
 * @param {string}   url          请求地址: 'api/...'
 * @param {string}   method       'get' or 'post'
 * @param {object}   data         请求参数, {a:"", b:1} 的形式
 * @param {function} callback     数据返回回调函数
 * @param {string}   type         数据提交类型: 如果需要以form形式提交, 传递参数 'form' 即可, json 格式不需要传递此参数
 */

function request(url, method, data, callback, type = 'json') {
  wx.showLoading({ title: '加载中...', icon: 'none' })
  getHeader().then(token => {
    if (token) {
      header.token = token
    } else {
      console.error("token get faild!")
    }
    if (type == 'form') {
      header['content-type'] = 'application/x-www-form-urlencoded'
    }
    wx.request({
      url: BASE + url,
      method: method,
      data: data,
      header: header,
      success: result => {
        wx.hideLoading()
        if (result.statusCode === 200) {
          callback(result.data)
        } else {
          console.log(result)
          wx.showToast({
            title: result.data.message || '请求异常',
            icon: 'none',
            mask: true
          })
        }
      },
      // 防止请求不成功一直 loading
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}


function getHeader() {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'token',
      success: result => {
        resolve(result.data)
      }
    })
  })
}
function toScan(){
    wx.scanCode({
      success: res => {
        console.log(res)
        if (res.path) {
          console.log(res.path)
          wx.navigateTo({
            url: `/${res.path}`,
          })
        }
      }
    })
}
module.exports = {
  getHeader: getHeader,
  request: request,
  toScan: toScan
}

