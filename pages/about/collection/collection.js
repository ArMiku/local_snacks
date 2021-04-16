const app = getApp()
const host = app.globalData.host
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    content:[],
    iconStatu:false
  },
  onLoad: function () {
    var that=this;
    wx.request({
      url: host + '/user/getFavor',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'sessionId': wx.setStorageSync('sessionId')
      }
    })
    wx.request({
      url: 'https://www.qhpersonal.top/findFavor.php',
      method: 'GET',
      data: {
        userId:app.globalData.userId
      },
      success(res){
        var temp1=String(res.data);
        var row=temp1.split('#');
        var temp2=[];
        if(res.data=='@@@'){
          return;
        }
        for(let i=0;i<row.length;i++){
          let mem=row[i].split('@');
          temp2=temp2.concat({id:mem[0],name:mem[1],detail:mem[2],img:mem[3]});
        }
        that.setData({content:temp2});
      }
    })
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
  pageBack() {
    wx.navigateBack({
      delta: '../home/home'
    });
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
  onShow() {
    this.onLoad();
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
