<template>
  <div class="detailedmetting hahha">
    <van-overlay :show="showloding">
      <van-loading type="spinner" color="#f54133" style="top:50%;color:#f54133" :vertical="true">
        <div style="color:#f54133">拼命加载中...</div>
      </van-loading>
    </van-overlay>
    <div class="top">
      <div class="textcolor">主题</div>
      <div>{{datalist.subject}}</div>
    </div>
    <div class="bgcstylecolor"></div>
    <div class="center">
      <div class="textcolor">详情</div>
      <div>{{datalist.topic}}</div>
      <div class="imgdiv">
        <div class="imgurldiv">
          <!-- <img :src="datalist.topicPic" alt srcset style="width:100%" /> -->
          <van-uploader disabled v-model="picurl" :deletable="false" max-count="3" />
        </div>
      </div>
    </div>
    <div class="bgcstylecolor"></div>
    <div :class="[isshowbj!=2 ? 'botton':'']">
      <van-field v-model="showtime" label="活动日期" disabled input-align="right" />
      <van-field v-model="formdatas.location" label="活动地点" disabled input-align="right" />
      <van-field v-model="formdatas.attendRate" label="参会率 (%)" disabled input-align="right" />
      <van-field
        v-model="formdatas.punchType"
        label="会议签到"
        disabled
        input-align="right"
        style="margin:0 0 10px 0"
      />

      <van-field v-model="formdatas.hostNames" label="主持人" disabled input-align="right" />
      <van-field v-model="formdatas.attendNames" label="参会人" disabled input-align="right" />

      <div class="top">
        <div class="textcolor">活动要求</div>
        <div>{{datalist.require}}</div>
      </div>

      <div v-if="isshowbj==2" style="margin:0 0 3rem 0">
        <div class="bgcstylecolor"></div>
        <div class="center">
          <div class="textcolor">活动图片</div>
          <div class="imgdiv">
            <div class="imgurldiv">
              <!-- <img :src="datalist.topicPic" alt srcset style="width:100%" /> -->
              <van-uploader disabled v-model="picurl1" :deletable="false" max-count="3" />
            </div>
          </div>
        </div>
        <div class="top">
          <div class="textcolor">活动总结</div>
          <div>{{bigdata.experience.content}}</div>
        </div>
      </div>
    </div>
    <!-- 待接收固定0 -->
    <div v-if="showsome">
      <div class="gdfixed" v-if="isshowbj==0">
        <div class="qjbtn" @click="gosponsorleave">
          <img src="@/img/xmimg/zu139-2x.png" alt />
          <div>请假</div>
        </div>
        <div class="fxbtn" @click="gosharepage">
          <img src="@/img/xmimg/zu139-2x-1.png" alt />
          <div>分享</div>
        </div>
        <div class="jsbtn" @click="takein">接受</div>
      </div>
    </div>
    <div v-if="!showsome">
      <!-- <div class="gdfixed" style="background0color:#fff">
       <div class="">返回我的活动日</div>
      </div>-->
      <div class="btnclick" style="position: fixed" v-if="isshowbj==0">
        <van-button color="#F54133" size="large" @click="goback">返回我的活动日</van-button>
      </div>
    </div>
    <div class="btnclick" style="position: fixed" v-if="isshowbj==2">
      <van-button color="#F54133" size="large"  @click="goback">返回我的活动日</van-button>
    </div>

    <!-- 待参加固定1 -->
    <div class="gdfixed" v-if="isshowbj==1">
      <div class="qjbtn" @click="gosponsorleave">
        <img src="@/img/xmimg/zu139-2x.png" alt />
        <div>请假</div>
      </div>
      <div class="fxbtn" @click="gosharepage">
        <img src="@/img/xmimg/zu139-2x-1.png" alt />
        <div>分享</div>
      </div>
    </div>
    <!-- 我的发布固定1 -->
    <div v-if="showsome">
      <div class="gdfixed" v-if="isshowbj==3">
        <div class="qjbtn" @click="gochangepage">
          <img src="@/img/xmimg/ico3.png" alt />
          <div>修改</div>
        </div>
        <div class="fxbtn" @click="gosharepage">
          <img src="@/img/xmimg/zu139-2x-1.png" alt />
          <div>分享</div>
        </div>
      </div>
    </div>
    <div v-if="!showsome">
      <div class="btnclick" style="position: fixed" v-if="isshowbj==3">
        <van-button color="#F54133" size="large"  @click="goback">返回我的活动日</van-button>
      </div>
    </div>

    <!-- 分享 -->

    <van-share-sheet v-model="showshare" title="立即至" :options="showsharelist" />
  </div>
</template>

<script>
import {
  EventDayconference,
  membersFromDepart,
  EventDayaccept,
} from "@/api/http";

export default {
  data() {
    return {
      showloding: false,
      timestamp: "",
      showchange: true,
      picurl: [{ url: "" }],
      picurl1: [{ url: "" }],
      showtime: "",
      showsome: "",
      experiencecontent: "",
      bigdata: {},
      jydata: {
        cc: []
      },
      datalist: {},
      id: "",
      isshowbj: "",
      formdatas: {
        conferenceDate: "2020-03-02 10:00~11:00"
      },
      starval: 5,
      showxd: false,
      content: "",
      showjy: false,
      fileList: [],
      manhuibaodata: [],
      showPicker: false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showpj: false,
      reviewContent: "",
      showshare: false,
      sharedata: "",
      showsharelist: [
        { name: "微信", icon: "wechat" },
        { name: "QQ", icon: require("@/img/xmimg/ICOQQ.png") }
      ]
    };
  },
  methods: {
 goback(){
  this.$router.push({path:"/partyActivityDay"})
 },

    showxdth() {
      this.showxd = true;
    },
    showhyjy() {
      this.showjy = true;
    },
    openjypj() {
      this.showpj = true;
    },
    cleardata(val) {
      if (val == 0) {
        this.content = "";
      }
      if (val == 1) {
        this.jydata = { cc: [] };
      }
    },
    // 上传心得体会
  
 

  
    onConfirm(value) {
      this.manhuibaodata.push(value.text);
      this.manhuibaodata = [...new Set(this.manhuibaodata)];
      this.jydata.cc.push(value.id);

      this.jydata.cc = [...new Set(this.jydata.cc)];
      this.showPicker = false;
    },
    gosponsorleave() {
      if (!this.showsome) {
        this.$toast.fail({ message: "该会议已经开始不能请假", duration: 1000 });
      } else {
        if (this.bigdata.askLeaveStatus == 2) {
          this.$toast.fail({ message: "该会议请假已同意", duration: 1000 });
        } else {
          if (this.bigdata.askLeaveStatus == 1) {
            this.$toast.fail({
              message: "该会议请假正在审批中",
              duration: 1000
            });
          } else {
            this.$router.push({
              path: "/allLeave",
              query: { id: this.id }
            });
          }
        }
      }
    },
    async getconference() {
      let res = await EventDayconference(this.id);
      let meetingInfo = {};
    

      meetingInfo.id = res.details.conference.id;
      meetingInfo.subject = res.details.conference.subject;
      meetingInfo.conferenceDate = res.details.conference.conferenceDate;

      window.localStorage.setItem("meetingInfo", JSON.stringify(meetingInfo));
      // this.picurl[0].url = res.details.conference.topicPic;
      // console.log(this.picurl[0].url);
      this.picurl=[]
      this.picurl1=[]
        JSON.parse(res.details.conference.topicPic).forEach(element => {
         this.picurl.push({url:element})
        });
        if (res.details.experience.pic!=null) {
           JSON.parse(res.details.experience.pic).forEach(element => {
         this.picurl1.push({url:element})
        });
        } else {
          
        }
        

      this.experiencecontent = res.details.experience.content;
      this.bigdata = res.details;
      this.datalist = res.details.conference;
      this.formdatas = this.datalist;
      if (this.formdatas.punchType == 0) {
        this.formdatas.punchType = "不签到";
      }
      if (this.formdatas.punchType == 1) {
        this.formdatas.punchType = "扫码签到";
      }
      if (this.formdatas.punchType == 2) {
        this.formdatas.punchType = "定位签到";
      }
      if (this.formdatas.punchType == 3) {
        this.formdatas.punchType = "电子签名";
      }
      if (this.formdatas.punchType == 4) {
        this.formdatas.punchType = "扫码签到、电子签名";
      }
      if (this.formdatas.punchType == 5) {
        this.formdatas.punchType = "定位签到、电子签名";
      }

      this.formdatas.conferenceDate =
        this.datalist.conferenceDate +
        "   " +
        this.datalist.beginTime +
        "-" +
        this.datalist.endTime;
      if (this.bigdata.isShowSummaryEdit) {
        this.formdatas.isSubmitNote = "是";
      } else {
        this.formdatas.isSubmitNote = "否";
      }
    },

    async getmembersFromDepart() {
      let res = await membersFromDepart();
      this.columns = JSON.parse(
        JSON.stringify(res.details.list).replace(/name/g, "text")
      );
    },
    async takein() {
      let res = await EventDayaccept(this.id);
      if (res.code == 200) {
        this.$toast.success({ message: "接受成功", duration: 500 });
        this.$router.push({ path: "/myActivityDay" });
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
    },
    changestart(val) {
      // console.log(val);
      this.starval = val;
    },
    //跳转修改页面
    gochangepage() {
      this.$router.push({ path: "/addActivityDaay", query: { id: this.id } });
    },
    gosharepage() {
      this.$router.push({ path: "/shareActivity", query: { id: this.id} });
    }
  },
  mounted() {
    this.showloding = true;
    this.timestamp = new Date().getTime();
    this.showchange = this.$route.query.showchange;
    this.isshowbj = this.$route.query.val;
    this.id = this.$route.query.id;
    this.getconference();
    this.getmembersFromDepart();

    setTimeout(() => {
      // console.log(this.formdatas.conferenceDate.split(' ')[0]);
      // console.log(this.formdatas.beginTime);
      let timessss =
        this.formdatas.conferenceDate.split(" ")[0] +
        " " +
        this.formdatas.beginTime;

      console.log(timessss);
      console.log(new Date(timessss).getTime());
      console.log(new Date().getTime());
      this.showtime = timessss + " - " + this.formdatas.endTime;

      if (
        this.$route.query.form == "moodrealize" ||
        this.$route.query.form == "meetingrecord"
      ) {
        this.showsome = false;
      } else {
        if (new Date().getTime() > new Date(timessss).getTime()) {
          //已经开始

          this.showsome = false;
        } else {
          this.showsome = true;
        }
        console.log(this.showsome);
        this.showloding = false;
      }
    }, 500);
  }
};
</script>

<style lang="less" scoped>
.detailedmetting {
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
  // height: 12.7vh;
  min-height: 13.7vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.center {
  width: 100%;
  // height: 178px;
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
  // width: 28%;
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
  // background-color: red;
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
</style>

<style lang="less">
.van-uploader__wrapper--disabled {
  opacity: 1;
}
.detailedmetting {
  .cleestyle {
    .van-cell {
      padding: 0;
    }
  }
  .van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    box-sizing: border-box;
    width: 120px;
  }

  .van-cell {
    color: #969799;
  }
  .van-field__control:disabled {
    color: #323233;
  }
}
.hahha {
  .van-uploader__upload {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .van-overlay {
    background-color: rgba(0, 0, 0, 1);
  }
}
</style>