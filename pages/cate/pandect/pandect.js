const app = getApp();
const host = app.globalData.host;
Page({
  details: function (e) {
    console.log(e);
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    list: [],
    content: [],
    pageContent: [],
    provinces: []
  },
  sort(that) {
    let result = [];
    let totalId = that.data.content.length;
    let provinceNum = that.data.list.length;
    let temp = {};
    for (let i = 0; i < provinceNum; i++) {
      for (let j = 0; j < totalId; j++) {
        if (that.data.content[j].num == i) {
          result = result.concat(that.data.content[j]);
        }
      }
    }
    that.setData({ content: result });
  },
  getContent: function (that, area, num) {
    wx.request({
      url: host + '/food/getContent',
      data: area,
      method: 'GET',
      success(res) {
        let temp = String(res.data);
        let temp1 = temp.split('#');
        var total = [];
        for (let i = 0; i < temp1.length; i++) {
          let temp2 = temp1[i].split('@');
          total[i] = {};
          total[i].img = temp2[0];
          total[i].name = temp2[1];
          total[i].id = temp2[2];
          total[i].details = temp2[3];
          total[i].area = area.area;
          total[i].num = num;
        }
        let temp3 = that.data.content.concat(total);
        that.setData({ content: temp3 });
        that.sort(that);
        wx.hideLoading()
      }
    })
  },
  getProvince: function(){
    let that = this
    wx.request({
      url: host + '/food/getProvinces',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'sessionId=' + wx.getStorageSync('sessionId')
      },
      success: function(res){
        that.setData({provinces: res.data})
      }
    })
  },
  getContent: function(){
    let that = this
    wx.request({
      url: host + '/food/getContent',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'sessionId=' + wx.getStorageSync('sessionId')
      },
      success: function(res){
        that.setData({content: res.data})
      }
    })
  },
  loadOver(e) {
    if (e.target.dataset.dedtailid == 'img-70') {
      wx.hideLoading();
    }
  },
  onLoad() {
    this.getProvince()
    this.getContent()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        provinceList: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
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