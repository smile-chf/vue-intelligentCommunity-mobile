<template>
  <div class="qunimade">
       <div class="top">
      <div class="textcolor">主题</div>
      <div>{{formdatas.subject}}</div>
    </div>
     <div class="bgcstylecolor"></div>
    <div class="center">
      <div class="textcolor">议题</div>
      <div>{{formdatas.topic}}</div>
      <div class="imgdiv">
        <div class="imgurldiv" v-for="(item, index) in formdatas.topicPic" :key="index">
          <img :src="item" alt srcset style="width:100%;height:100%" />
          <!-- <van-uploader disabled  v-model="picurl" :deletable="false" max-count="1"/> -->
        </div>
      </div>
    </div>
     <div class="bgcstylecolor"></div>
      <div class="">
           <van-field v-model="formdatas.conferenceDate" label="会议日期" disabled input-align="right" />
      <van-field v-model="formdatas.location" label="会议地点" disabled input-align="right" />
      <van-field v-model="formdatas.attendRate" label="参会率 (%)" disabled input-align="right" />
      <van-field v-model="formdatas.punchType" label="会议签到" disabled input-align="right" />
   

      <van-field v-model="formdatas.hostNames" label="主持人" disabled input-align="right" />
      <!-- <van-field v-model="formdatas.attendNames" label="参会人" disabled input-align="right" /> -->
      <van-field v-model="formdatas.noteTakerNames" label="记录人" disabled input-align="right" />
      <div class="top">
        <div class="textcolor">会议要求</div>
        <div>{{formdatas.require}}</div>
      </div>
      </div>
      <div style="height:3rem"></div>

       <div class="sure">
                <p @click="ok" >立即签到</p>
            </div>
  </div>

</template>

<script>
import {EventDayconference,EventDayupdateSignIn} from '../../api/http'
export default {
data() {
    return {
        formdatas:{showtime:"22222"},
        id:"",
        position:{}
    }
},
methods: {
      getLocation() {
      this.geolocation.getLocation(this.savePosition);
    },
    savePosition(position) {
      this.position=position
      console.log(this.position);
      
    },
   async ok(){
         let a=this.position.lng+ ","+this.position.lat
        console.log(a);
         if (a == "" || a == undefined || a == "undefined,undefined") {
          this.$notify({
            message: "请打开您的位置授权",
            duration: 1000
          });
          setTimeout(() => {
            history.go(0);
          }, 1000);
        } else {
             let res = await EventDayupdateSignIn(this.id,a);
        if (res.code == 200) {
          this.$toast.success({ message: "签到成功", duration: 1000 });
          setTimeout(() => {
            this.$router.push({path:"/punchSuccess"})
          }, 1000);
        }
        if (res.code == 500) {
          this.$notify("服务器错误");
        }
        if (res.code == 302) {
          this.$notify("登录失效，请重新登录");
        }

        }



        // let res = await EventDayupdateSignIn(this.id,a);
        // if (res.code == 200) {
        //   this.$toast.success({ message: "签到成功", duration: 1000 });
        //   setTimeout(() => {
        //     this.$router.push({path:"/punchSuccess"})
        //   }, 1000);
        // }
        // if (res.code == 500) {
        //   this.$notify("服务器错误");
        // }
        // if (res.code == 302) {
        //   this.$notify("登录失效，请重新登录");
        // }
    },
  async  getsomedata(){
        let res= await EventDayconference(this.id)
        this.formdatas=res.details.conference
        this.formdatas.topicPic=JSON.parse(this.formdatas.topicPic)
      if(this.formdatas.punchType==0){
        this.formdatas.punchType="不签到"
      }
      if(this.formdatas.punchType==1){
        this.formdatas.punchType="扫码签到"
      }
      if(this.formdatas.punchType==2){
        this.formdatas.punchType="定位签到"
      }
      if(this.formdatas.punchType==3){
        this.formdatas.punchType="电子签名"
      }
      if(this.formdatas.punchType==4){
        this.formdatas.punchType="扫码签到、电子签名"
      }
      if(this.formdatas.punchType==5){
        this.formdatas.punchType="定位签到、电子签名"
      }
    }
},
mounted() {
     this.geolocation = new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp")
    this.getLocation();
    this.id=this.$route.query.id
    console.log(this.id);
    this.getsomedata()
    
},
}
</script>

<style lang="less" scoped>
.dosome{
    span{
        display: block;
        width: 200px;
    }
}
.qunimade {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
  font-size: 14px;
}

.bgcstylecolor {
  width: 100%;
  height: 10px;
  background-color: #f6f6f6;
}
.top {
  width: 100%;
//   height: 12.7vh;
  min-height: 12.7vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.center {
  width: 100%;
  height: 178px;
  background-color: #ffffff;
  padding: 16px 16px;
  box-sizing: border-box;
}
.botton {
  margin-bottom: 60px;
}
.botton1 {
  margin-bottom: 60px;
}
.btnclick {
  // position: fixed;

  bottom: 0%;
  width: 100%;
  padding: 10px 30px 10px 30px;
  box-sizing: border-box;
  background-color: #fff;
  .btnclickflex {
    display: flex;
    justify-content: center;
    .btncolor {
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      //    background-color: red;
      border-radius: 30px;
      box-sizing: border-box;
      color: #f54133;
      border: 1px solid #f54133;
    }
  }
}
.textcolor {
  width: 100%;
  font-size: 14px;
  color: #8e8e93;
  margin-bottom: 6px;
}
.imgdiv {
  width: 100%;
  height: 60%;
  //    background-color: red;
  margin-top: 16px;
  box-sizing: border-box;
  display: flex;
}
.imgurldiv {
  // border: 1px solid red;
  height: 100%;
  width: 28%;
  margin-right: 20px;
}
.tleft {
  width: 90%;
}
.tright {
  height: 10%;
  text-align: right;
}
.tflex {
  display: flex;
}
.starstyle {
  display: flex;
  padding: 0 16px;
  background-color: #ffffff;
  height: 40px;
  align-items: center;
}
.goodstar {
  margin-left: 30px;
}

.bigxdthtk {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.xdthtk {
  display: flex;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  line-height: 50px;
  border-bottom: 1px solid #f6f6f6;
  text-align: center;
  font-size: 16px;
  .quxiao {
    flex: 1;
    font-size: 14px;
    text-align: left;
  }
  .hytitle {
    flex: 1;
  }
  .hybc {
    flex: 1;
    text-align: right;
    display: flex;
    align-items: center;
    .btnbcright {
      font-size: 14px;
      width: 44px;
      height: 30px;
      background-color: #f54133;
      line-height: 30px;
      color: #ffffff;
      text-align: center;
      margin-left: auto;
    }
  }
}
.bigbtnbc {
  width: 100%;
  display: flex;
  justify-content: center;
  .btnbc {
    width: 60%;
    background-color: #f54133;
    color: #ffffff;
    height: 30px;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
  }
}
.btnline {
  width: 100%;
  height: 10px;
  background-color: #f6f6f6;
}

.gdfixed {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.16);
  width: 100%;
  height: 50px;
  background-color: red;
  position: fixed;
  bottom: 0%;
  display: flex;
  // border-top: 1px solid #8E8E93;
  .qjbtn {
    flex: 1;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #fdfdfd;
    color: #f54133;
    img {
      width: 18px;
    }
  }
  .fxbtn {
    flex: 1;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f54133;
    img {
      width: 18px;
    }
  }
  .jsbtn {
    flex: 1;
    background-color: #f54133;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }
}
  .sure {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 -.025rem .05rem rgba(0, 0, 0, .16);
        background: #fff;
    }

    .sure p {
        width: 91.5%;
        height: 2.2rem;
        background: #F54133;
        border-radius: .3rem;
        font-size: .85rem;
        color: #FFFFFF;
        line-height: 2.2rem;
        text-align: center;
    }
</style>

<style lang="less" >
.qunimade{

 .van-field__label{
 span{
     color: #8e8e93;
 }
}
.van-field__control:disabled {
  color: #333333;
}
}

</style>