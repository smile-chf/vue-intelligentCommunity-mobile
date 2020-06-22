<template>
  <div class="signin_det">
    <div class="centerbox">
      <div class="top">{{datalist.subject}}</div>
      <div class="centerbg">
        <div>{{datatime}}</div>
        <div>{{week}}</div>
        <div>{{datalist.beginTime}}~{{datalist.end_time}}</div>
      </div>
      <div class="ewm">
        <div id="qrcode"></div>
      </div>
    </div>

    <div class="btn" v-if="datalist.status==0">
      <div class="tj">
        <img src="../../../img/xmimg/tj.png" alt srcset />
        <div @click="golistman">签到统计</div>
      </div>
      <div class="qiandao" @click="marstqd">立即签到</div>
    </div>

    <div class="btn" v-if="datalist.status==1">
      <div class="tj" style="width:100%">
        <img src="../../../img/xmimg/tj.png" alt srcset />
        <div @click="golistman">签到统计</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import QRCode from "qrcodejs2";
import {
  signInDetail,
  updateSignIn,
  EventDayupdateSignIn,
  EventDaysignInDetail
} from "../../../api/http";
export default {
  data() {
    return {
      geolocation: {},
      lat: "",
      lng: "",
      codeurl: "",
      id: "",
      datalist: {},
      week: "",
      datatime: "",
      statetype: "",
      position: {}
    };
  },
  methods: {
    getLocation() {
      this.geolocation.getLocation(this.savePosition);
    },
    savePosition(position) {
      this.position = position;
    },

    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 170,
        height: 170,
        text: this.codeurl
      });
    },
    async signInDetailvue() {
      if (this.statetype == 1) {
        let res = await signInDetail(this.id);
        this.datalist = res.details.data;
        this.codeurl = res.details.data.qrCode;
        this.week = this.datalist.conferenceDate.split(" ")[1];
        this.datatime = this.datalist.conferenceDate.split(" ")[0];

        if (res.details.data != null && res.details.data != {}) {
          this.qrcode();
        }
      } else {
        let res = await EventDaysignInDetail(this.id);
        this.datalist = res.details.data;
        this.codeurl = res.details.data.qrCode;
        this.week = this.datalist.conferenceDate.split(" ")[1];
        this.datatime = this.datalist.conferenceDate.split(" ")[0];

        if (res.details.data != null && res.details.data != {}) {
          this.qrcode();
        }
      }
    },
    //   getPosition () {
    //   return new Promise((resolve, reject) => {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(function (position) {
    //         let latitude = position.coords.latitude
    //         let longitude = position.coords.longitude
    //         let data = {
    //           latitude: latitude,
    //           longitude: longitude
    //         }
    //         resolve(data)
    //       }, function () {
    //         reject(arguments)
    //       })
    //     } else {
    //       reject('你的浏览器不支持当前地理位置信息获取')
    //     }
    //   })
    // },
    async marstqd() {
      // 获取当前经纬度坐标
      // this.getPosition().then(result => {
      //   // 返回结果示例：
      //   // {latitude: 30.318030999999998, longitude: 120.05561639999999}
      //   // 一般小数点后只取六位，所以用以下代码搞定
      //   let queryData = {
      //     longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
      //     latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
      //     channelType: '00'
      //   }
      //   console.log(queryData)
      //   // 以下放置获取坐标后你要执行的代码:
      //   // ...
      // }).catch(err => {
      //   console.log(err)
      // })
      let a = this.position.lng + "," + this.position.lat;
      if (this.statetype == 1) {
        if (a == "" || a == undefined || a == "undefined,undefined") {
          this.$toast.fail({
            message: "请打开您的位置授权",
            duration: 1000
          });
          setTimeout(() => {
            history.go(0);
          }, 1000);
        } else {
          console.log(a);
          let res = await updateSignIn(this.id, a);
          if (res.code == 200) {
            this.$toast.success({ message: "签到成功", duration: 1000 });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          }
          if (res.code == 500) {
            this.$notify("服务器错误");
          }
          if (res.code == 302) {
            this.$notify("登录失效，请重新登录");
          }
        }
      } else {
        // console.log(a);

        if (a == "" || a == undefined || a == "undefined,undefined") {
          this.$toast.fail({
            message: "请打开您的位置授权",
            duration: 1000
          });
          setTimeout(() => {
            history.go(0);
          }, 1000);
        } else {
          console.log(a);
          
          let res = await EventDayupdateSignIn(this.id, a);
          if (res.code == 200) {
            this.$toast.success({ message: "签到成功", duration: 1000 });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          }
          if (res.code == 500) {
            this.$notify("服务器错误");
          }
          if (res.code == 302) {
            this.$notify("登录失效，请重新登录");
          }
        }
      }
    },
    golistman() {
      this.$router.push({
        path: "/signin_list",
        query: { id: this.id, statetype: this.statetype }
      });
    }
    // getLocation() {
    //   let _this = this;
    //   AMap.plugin("AMap.Geolocation", function() {
    //     var geolocation = new AMap.Geolocation({
    //       // 是否使用高精度定位，默认：true
    //       enableHighAccuracy: true,
    //       // 设置定位超时时间，默认：无穷大
    //       timeout: 5000
    //     });
    //     geolocation.getCurrentPosition();
    //     AMap.event.addListener(geolocation, "complete", onComplete);
    //     AMap.event.addListener(geolocation, "error", onError);
    //     // data是具体的定位信息
    //     function onComplete(data) {
    //       console.log("具体的定位信息", data);
    //     }
    //     function onError(data) {
    //       // 失败 启用 ip定位
    //       AMap.plugin("AMap.CitySearch", function() {
    //         var citySearch = new AMap.CitySearch();
    //         citySearch.getLocalCity(function(status, result) {
    //           if (status === "complete" && result.info === "OK") {
    //             // 查询成功，result即为当前所在城市信息
    //             console.log("通过ip获取当前城市：", result);
    //             alert(result.rectangle);
    //           }
    //         });
    //       });
    //     }
    //   });
    // }
    // getLocation() {
    //   const self = this;
    //   AMap.plugin("AMap.Geolocation", function() {
    //     var geolocation = new AMap.Geolocation({
    //       // 是否使用高精度定位，默认：true
    //       enableHighAccuracy: true,
    //       // 设置定位超时时间，默认：无穷大
    //       timeout: 10000
    //     });

    //     geolocation.getCurrentPosition();
    //     AMap.event.addListener(geolocation, "complete", onComplete);
    //     AMap.event.addListener(geolocation, "error", onError);

    //     function onComplete(data) {
    //       // data是具体的定位信息

    //       console.log("定位成功信息：", data);
    //       alert("定位成功信息：" + JSON.stringify(data));
    //     }

    //     function onError(data) {
    //       // 定位出错
    //       console.log("定位失败信息：", data);
    //       alert("定位失败信息：" + JSON.stringify(data));
    //       self.getLngLatLocation();
    //     }
    //   });
    // },
    // getLngLatLocation() {
    //   AMap.plugin("AMap.CitySearch", function() {
    //     var citySearch = new AMap.CitySearch();
    //     citySearch.getLocalCity(function(status, result) {
    //       if (status === "complete" && result.info === "OK") {
    //         // 查询成功，result即为当前所在城市信息
    //         console.log("通过ip获取当前城市：", result);
    //         //逆向地理编码
    //         AMap.plugin("AMap.Geocoder", function() {
    //           var geocoder = new AMap.Geocoder({
    //             // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    //             city: result.adcode
    //           });

    //           var lnglat = result.rectangle.split(";")[0].split(",");

    //           geocoder.getAddress(lnglat, function(status, data) {
    //             if (status === "complete" && data.info === "OK") {
    //               // result为对应的地理位置详细信息
    //               alert("通过ip获取当前城市：" + JSON.stringify(data));
    //             }
    //           });
    //         });
    //       }
    //     });
    //   });
    // }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.statetype = this.$route.query.statetype;

    this.signInDetailvue();

    setTimeout(() => {}, 500);
  },
  created() {
    // this.getLocation();
    this.geolocation = new qq.maps.Geolocation(
      "OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77",
      "myapp"
    );
    this.getLocation();
  }
};
</script>

<style lang="less" scoped>
.signin_det {
  width: 100%;
  height: 100%;
  background-image: url("../../../img/xmimg/bgimg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 2.8rem 0 0 0;
  box-sizing: border-box;
}
.centerbox {
  width: 17.15rem;
  height: 20.95rem;
  background-color: #ffffff;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  opacity: 1;
  border-radius: 0.3rem;
}
.top {
  height: 2.65rem;
  width: 100%;
  line-height: 2.65rem;
  text-align: center;
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.centerbg {
  color: #f54133;
  height: 1.7rem;
  width: 100%;
  background-color: #fff4f3;
  display: flex;
  box-sizing: border-box;
  padding: 0 1.5rem;
  div {
    height: 100%;
    line-height: 1.7rem;
    flex: 1;
    text-align: center;
  }
  margin-bottom: 3.2rem;
}

.ewm {
  width: 8.5rem;
  height: 8.5rem;
  //   background-color: red;
  margin: 0 auto;
}

.btn {
  position: fixed;
  height: 2.2rem;
  width: 100%;
  bottom: 0;
  display: flex;
  // background-color: red;
  .tj {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f6f6f6;
    div:nth-child(2) {
      color: #f54133;
      font-size: 0.75rem;
      line-height: 2.2rem;
    }
    img {
      width: 1rem;
      height: 1rem;
    }
  }
  .qiandao {
    width: 50%;
    height: 100%;
    background-color: #f54133;
    color: #fff;
    font-size: 0.75rem;
    line-height: 2.2rem;
    text-align: center;
  }
}
</style>