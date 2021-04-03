const app = getApp();
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    favor: 'favor',
    sty: 0,
    checked: false,
    cardCur: 0,
    swiperList: [],
    id: 0,
    name: '',
    detail: '',
    recommend: []
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
        url: 'https://www.qhpersonal.top/favorite.php',
        method: 'GET',
        data: { userId: app.globalData.userId, favorite: this.data.id, sign: 1 }
      })
    }
    else {
      that.setData({
        sty: 0,
        favor: 'favor'
      })
      wx.request({
        url: 'https://www.qhpersonal.top/favorite.php',
        method: 'GET',
        data: { userId: app.globalData.userId, favorite: this.data.id, sign: 0 }
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
    console.log(options.id);
    this.setData({ detail: options.detail });
    this.setData({ name: options.name });
    this.towerSwiper('swiperList');
    var lb = [{ id: 0, url: 'https://www.qhpersonal.top/images/slide/' + options.id + '/1.jpg' }, { id: 1, url: 'https://www.qhpersonal.top/images/slide/' + options.id + '/2.jpg' }, { id: 2, url: 'https://www.qhpersonal.top/images/slide/' + options.id + '/3.jpg' }];
    this.setData({ id: options.id, swiperList: lb });
    var that = this;
    wx.request({
      url: 'https://www.qhpersonal.top/favorTest.php',
      method: 'GET',
      data: { userId: app.globalData.userId, favorite: this.data.id },
      success(res) {
        if (res.data == '1')
          that.setData({
            sty: 1,
            favor: 'favorfill'
          })
      }
    })
    wx.request({
      url: 'https://www.qhpersonal.top/history.php',
      method: 'GET',
      data: {
        userId: app.globalData.userId,
        history: options.id
      }
    })
    wx.request({
      url: 'https://www.qhpersonal.top/recommend.php',
      data: { id: options.id },
      method: 'GET',
      success(res) {
        if (res.data == 0) {
          that.setData({ recommend: ['暂无推荐信息'] });
        } else {
          var temp = String(res.data);
          var temp1 = temp.split(';');
          that.setData({ recommend: temp1 });
        }
      }
    })
    // 初始化towerSwiper 传已有的数组名即可
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