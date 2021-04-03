// const app = getApp();
// Page({
//   data: {
//     StatusBar: app.globalData.StatusBar,
//     CustomBar: app.globalData.CustomBar,
//     ColorList: app.globalData.ColorList,
//   },
//   onLoad: function () { },
//   pageBack() {
//     wx.navigateBack({
//       delta: 1
//     });
//   },
//   //转发
//   onShareAppMessage: function () {
//     let users = wx.getStorageSync('user');
//     return {
//       title: '转发',
//       path: '/pages/about/home/home',
//       success: function (res) { }
//     }
//   }
// });
// pages/wrongPage/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { "id": 0, "letter": "Michael", "statu": true, "nickname": "适北", "nickname2": "路高用" },
       { "id": 1, "letter": "Michael", "statu": false, "nickname": "统常方你", "nickname2": "况土达主" },
        { "id": 2, "letter": "Michael", "statu": true, "nickname": "国照而本", "nickname2": "温量" },
        { "id": 3, "letter": "Michael", "statu": true, "nickname": "省全广", "nickname2": "正关水" },
        { "id": 4, "letter": "Michael", "statu": false, "nickname": "十性位化", "nickname2": "选低离" },
        { "id": 5, "letter": "Michael", "statu": true, "nickname": "织起", "nickname2": "叫意" },
        { "id": 6, "letter": "Michael", "statu": true, "nickname": "已太边", "nickname2": "与今压" },
        { "id": 7, "letter": "Michael", "statu": true, "nickname": "石情声", "nickname2": "马法该无" },
        { "id": 8, "letter": "Michael", "statu": true, "nickname": "青例气", "nickname2": "先素有" },
        { "id": 9, "letter": "Michael", "statu": true, "nickname": "或少", "nickname2": "无格历何" },
        { "id": 10, "letter": "Michael", "statu": true, "nickname": "命构近九", "nickname2": "几被非外" },
        { "id": 11, "letter": "Michael", "statu": true, "nickname": "拉物采", "nickname2": "价分斗" },
        { "id": 12, "letter": "Michael", "statu": true, "nickname": "教斗适立", "nickname2": "算非音" },
        { "id": 13, "letter": "Michael", "statu": true, "nickname": "历治", "nickname2": "相五" },
        { "id": 14, "letter": "Michael", "statu": true, "nickname": "是治际", "nickname2": "你表手" },
        ] ,
    selColor: '#999',
    selList: [],
    iconStatu: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataList = this.data.list;
    dataList.map(function (value) {
      value.selStatu = false;
    })
  },
  // 选中
  toggleSel(e) {
    if (this.data.iconStatu) {
      let selArr = this.data.selList;
      let selId = e.target.dataset.id || e.currentTarget.dataset.id;
      let dataList = this.data.list;
      let index = this.data.selList.indexOf(selId);
      if (index < 0) {
        selArr.push(e.target.dataset.id);
        dataList.map((value) => {
          if (value.id == selId) {
            value.selStatu = true
           }
        })
      } else {
        dataList.map((value) => {
          if (value.id == selId) {
            value.selStatu = false
          }
        })
        selArr.splice(index, 1)
      }
      this.setData({
        selList: selArr,
        list: dataList
      })
    }
  },
   showSelIcon() {
     this.setData({
       iconStatu: !this.data.iconStatu
     })
   },
   // 删除错题
   delItem() {
     let arr = this.data.list;
     let selArr = this.data.selList;
     for (let i = 0; i < selArr.length; i++) {
       arr = arr.filter((value,index) => {
         return value.id != selArr[i]
       })
     }
     for (let i = 0; i < arr.length; i++) {
       arr[i].selStatu = false
     }
     this.setData({
       list: arr,
       selList: [],
     })
   }
 })