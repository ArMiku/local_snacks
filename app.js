//本程序使用ColorUI，且本程序为仅参加2021年微信小程序开发大赛使用
//app.js
App({
  login: function (userId) {
    wx.request({
      url: 'https://www.qhpersonal.top/userLogin.php',
      method: 'GET',
      data: { userId: userId }
    })
  },
  onLaunch: function () {
    this.globalData.userInfo = wx.getStorageSync('userInfo')
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     wx.request({
    //       //获取openid接口  
    //       url: 'https://www.qhpersonal.top/getOpenId.php',
    //       data: {
    //         code: res.code
    //       },
    //       method: 'GET',
    //       success: function (res) {
    //         that.login(res.data);
    //         that.globalData.userId = res.data;
    //       }
    //     })
    //     this.globalData.userId = res.code;
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           //console.log("本程序使用ColorUI，且本程序为仅参加2020年微信小程序开发大赛使用")
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: null,
    host: 'http://localhost:5000'
  }
})