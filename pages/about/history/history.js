const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    content: [],
    iconStatu:false
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://www.qhpersonal.top/findHistory.php',
      method: 'GET',
      data: {
        userId: app.globalData.userId
      },
      success(res) {
        if (res.data == '@@@@') return;
        var temp1 = String(res.data);
        var row = temp1.split('#');
        var temp2 = [];
        for (let i = 0; i < row.length; i++) {
          let mem = row[i].split('@');
          temp2 = temp2.concat({ id: mem[0], name: mem[1], detail: mem[2], img: mem[3], date: mem[4] });
        }
        that.setData({ content: temp2 });
      }
    })
  },
  onShow() {
    this.onLoad();
  },
  pageBack() {
    wx.navigateBack({
      delta: '../home/home'
    });
  },
  showSelIcon() {
    this.setData({
      iconStatu: !this.data.iconStatu
    })
  },
  showEdit() {
    this.setData({
      iconStatu: true
    })
  },
  showCancel() {
    this.setData({
      iconStatu: false
    })
  },
  //转发
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    return {
      title: '转发',
      path: '/pages/about/home/home',
      success: function (res) { }
    }
  },
    // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },
  
    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },
  
    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection =='left'){
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          modalName: null
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },
});
