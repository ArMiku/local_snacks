const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    content: [],
    headPortrait: [],
    name: [],
    avNum: [],
    id: '1',
    foodName: '',
    detail: '',
    date: '',
    littleName: '',
    littleNum: ''
  },
  showModal(e) {
    let tempId = e.currentTarget.id;
    let tempNum = this.data.avNum[tempId];
    let tempName = this.data.content[tempId];
    this.setData({
      modalName: e.currentTarget.dataset.target,
      littleName: tempName,
      littleNum: tempNum
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  onLoad() {
    var that = this;
    wx.request({
      url: 'https://www.qhpersonal.top/dailyRecommend.php',
      data: {},
      method: 'GET',
      success(res) {
        let temp1 = String(res.data);
        let temp2 = temp1.split('@');
        let tempId = temp2[0];
        let tempHeadPortrait = temp2[1];
        let tempAvNum = temp2[2];
        let tempContent = temp2[3];
        let tempName = temp2[4];
        let setHeadPortrait = tempHeadPortrait.split(';');
        let setAvnum = tempAvNum.split(';');
        let setContent = tempContent.split(';');
        let setName = tempName.split(';');
        let tempFoodName = temp2[5];
        let tempDetail = temp2[6];
        let tempDate = temp2[7];
        that.setData({ name: setName, headPortrait: setHeadPortrait, id: tempId, avNum: setAvnum, content: setContent, foodName: tempFoodName, detail: tempDetail, date: tempDate });
      }
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
  }
});