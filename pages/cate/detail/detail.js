const app = getApp();
const host = app.globalData.host
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    favor: 'favor',
    sty: 0,
    checked: false,
    cardCur: 0,
    swiperList: [],
    food: {}
  },
  getFavor: function() {
    let that = this;
    wx.request({
      url: host + '/user/getFavor',
      data: {
        'foodId': that.data.food.id
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'sessionId=' + wx.getStorageSync('sessionId')
      },
      success: function(res){
        if(res.data.favor == true){
          that.setData({favor: 'favorfill'})
        }
      }
    })
  },
  favor: function (e) {
    //点击按钮，样式改变,传递数据
    let that = this;
    let sty = this.data.sty;
    if (sty == 0) {
      that.setData({
        sty: 1,
        favor: 'favorfill'
      })
      wx.request({
        url: host + '/user/setFavor',
        data: {
          'foodId': that.data.food.id,
          'favor': 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'sessionId=' + wx.getStorageSync('sessionId')
        },
        method: 'POST',
        success: function(res){
          console.log(res)
        }
      })
    }
    else {
      that.setData({
        sty: 0,
        favor: 'favor'
      })
      wx.request({
        url: host + '/user/setFavor',
        data: {
          'foodId': that.data.food.id,
          'favor': 0
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'sessionId=' + wx.getStorageSync('sessionId')
        },
        method: 'POST',
        success: function(res){
          console.log(res)
        }
      })
    }
  },
  toComment(){
    wx.navigateTo({
      url: '/pages/cate/comment/comment',
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  onLoad(options) {
    this.setData({food: options})
    console.log(options)
    this.getFavor()
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  //转发
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    return {
      title: '转发',
      path: '/pages/about/home/home',
      success: function (res) { }
    }
  }
})