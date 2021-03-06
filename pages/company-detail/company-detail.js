// pages/company-detail/company-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      pid: app.globalData.pid
    });
    wx.setNavigationBarTitle({
      title: '公司详情'
    });

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    });
    wx.request({
      url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_company',
      method: 'GET',
      data: {
        id: app.globalData.pid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        // use res.data
        that.setData({
          company_info: res['data']
        });
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })

    // setTimeout(function () {
    //   wx.request({
    //     url: 'https://www.ecosports.cn/Home/Enterprise/wxapp_company',
    //     method: 'GET',
    //     data: {
    //       id: app.globalData.pid
    //     },
    //     header: {
    //       'Content-Type': 'application/json'
    //     },
    //     success: function (res) {
          
    //       // use res.data
    //       that.setData({
    //         company_info: res['data']
    //       });
    //     },
    //     fail: function (res) {

    //     },
    //     complete: function (res) {

    //     }
    //   })
    // }, 2000);
  },
  //跳到公司的其它职位
  positionDetailTap: function(event){
    var id = event.currentTarget.dataset.id; // 当前id
    var position = null;
    // 找出当时点击的那一项的详细信息
    for (var d of this.data.company_info.position) {
      if (d.id == id) {
        position = d;
        break;
      }
    }
    if (!position) {
      console.log('系统出错');
      return;
    }
    console.log(position);
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.curPosition = position;
    // 切换页面
    wx.redirectTo({
      url: '../position-detail/position-detail',
    })
  },
  
})