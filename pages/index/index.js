var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var wuwu;
var click = 1;
Page({
  data:{
      whatfood:'',
      isShow:true,
    
  },
  modalcnt: function () {
    wx.showModal({
      title: '警告',
      showCancel:false,
      content: '不许再点我了！说好的让我决定的！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },  

  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'EISBZ-35NKX-M7D4I-7JL7G-JLKT6-AMBF5'
    });
    click=1;
    this.whatthetime()
  },
  whatthetime: function () {
    var myDate = new Date();
    var mytime = myDate.getHours();
    console.log(mytime);
    if(mytime>5&&mytime<10){
      this.setData({ whatfood:'早饭'})
    }
    if (mytime < 16 && mytime >= 10) { 
      this.setData({ whatfood: '中午饭' })
      }
    if (mytime < 21 && mytime >= 16){
      this.setData({ whatfood: '晚饭' })
    }
    if ( mytime >= 21) {
      this.setData({ whatfood: '夜宵' })
    }
    console.log(this.data.whatfood)
     
  },
dianwo:function(){
 this.setData({
   isShow:false
 })
 var that = this;
 // 调用接口
 qqmapsdk.search({
   keyword: '餐饮',

   success: function (res) {

     var newArr = []
     for (var i = 0; i < 10; i++) {
       newArr.push(i)
     }
     // console.log(newArr, "666666666666666")

     wuwu = Math.floor((Math.random() * newArr.length))
     // console.log(wuwu)


     that.setData({ eatcount: res.count })
     console.log("12345679", res.data);
     console.log(wuwu)
     that.setData({ container: res.data[wuwu] });
     that.setData({ lyzlat: res.data[wuwu].location.lat})
     that.setData({ lyzlng: res.data[wuwu].location.lng })

    

   },
   fail: function (res) {
     console.log(res);
   },
   complete: function (res) {
     console.log(res);
   }
 });


},
caidan:function(){
click++;
if(click==8){
  this.dianwo()
}
if(click===16){
  this.modalcnt()
}
console.log(click)
},
  onShow: function () {
    var that = this;

    qqmapsdk.reverseGeocoder({

      success: function (res) {
        that.setData({useradxq: res.result})
        // console.log("999999999999999999999999999999", res.result);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });

  },

  clickme: function () {
    var that = this;
    wx.openLocation({
      latitude: that.data.lyzlat ,
      longitude: that.data.lyzlng,
      scale: 18
  
    })
console.log(that.data.lyzlat)
    console.log(that.data.lyzlng)
  },
  
  })






