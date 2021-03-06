//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

    var me = this;
    wx.getLocation({
      // type:'wgs84',
      altitude:true,
      success: function(res) {
        console.log(res)
        var long = res.longitude
        var lat = res.latitude
        me.loadCity(long, lat)
      },
    })


  },


    loadCity: function(long, lat){
        var me = this;
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=CktTRenmdTUMPgXhCKDNQuzwZ9hWDcfW&location=' + lat + ',' + long + '&output=json',
          data:{},
          header:{
            'Content-Type':'application/json'
          },
          success:function(res){
            if(res && res.data){
              var city = res.data.result.addressComponent.city;
              console.log(res)
              me.setData({
                city:city.indexOf('市') >-1? city.substr(0,city.indexOf('市')) :city
              });
            }else{
              me.setData({
                city:'获取失败'
              })
            }
          }
        })
    },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
