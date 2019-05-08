// components/HomeNine/HomeNine.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    dianji:function(){
      var me = this;
      wx.getLocation({
        type: 'wgs84',
        altitude:true,
        success: function(res) {
          console.log(res)
          var latitude = res.latitude
          var longitude = res.longitude

          me.loadCity(longitude, latitude);

          // wx.showModal({
          //   title: '当前位置',
          //   content: '纬度:' + latitude + '经度' + longitude,
          // })
        },
        // loadCity:function(lo,la){
        //   console.log(la,lo)
        // }
      })

  }

  }
 
})


// 16205384