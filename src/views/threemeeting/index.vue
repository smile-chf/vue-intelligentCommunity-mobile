<template>
  <div class="threemeeting">
    <div class="threemeetingbottom">
      <van-grid column-num="5" icon-size="35">
        <van-grid-item :icon="fqhyurl"  text="发起会议" @click="gosponsormeeting"/>
        <van-grid-item :icon="xdthurl" to="/moodrealize" text="心得体会" />
        <van-grid-item :icon="hyjlurl" to="/meetingrecord" text="会议纪要" />
        <van-grid-item :icon="qjurl"  to="/leave" text="请假" />
        <van-grid-item :icon="wdhyurl" to="/mymetting" text="我的会议" />
      </van-grid>
    </div>
    <div class="bgcstylke"></div>
    <div class="study">待参加会议</div>
    <!-- 中 -->
    <div class="threemeetingcenter">
      <div class="centeritem"   
            v-for="(item, index) in datalist"
            :key="index"
            @click="gonextpage(1,item.id)">
        <div class="bottomline">
          <div class="cleft">
             <div class="yeardata">{{item.conferenceDate.slice("0","7")}}</div>
                <div class="daydata">{{item.conferenceDate.slice("8","10")}}</div>
                <div class="weekdata">{{item.conferenceDate.slice("10")}}</div>
          </div>
          <div class="cright">
            <div class="crighttetx">
               <div>{{item.subject}}</div>
            </div>
            <div class="didian">
              <van-icon name="location-o" />
              <div>{{item.location}}</div>
            </div>
            <div class="textsize">
              <van-icon name="underway-o" />
              <div>{{item.beginTime}}-{{item.endTime}}</div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script>
import {fourconferences,getMemberIsAdministrator} from '../../api/http'
export default {
  data() {
    return {
      fqhyurl: require("../../img/xmimg/clock.png"),
      xdthurl: require("../../img/xmimg/zu15-2x-1.png"),
      hyjlurl: require("../../img/xmimg/zu15-2x-2.png"),
      qjurl: require("../../img/xmimg/zu15-2x-4.png"),
      wdhyurl: require("../../img/xmimg/zu15-2x-3.png"),
      datalist:[]
    };
  },

  methods: {
  async  gosponsormeeting(){
       let res = await getMemberIsAdministrator()
       let show = res.details.data
      // this.$router.push("/sponsormeeting")
      if (show=="是") {
          this.$router.push("/sponsormeeting")
      } else {
        this.$toast.fail({ message: "该用户无此权限", duration: 3000 });
      }
    },
     async getfourconferences(val) {
      let res = await fourconferences(val);
      console.log(res);
      this.datalist = res.details.list;
    },
    gonextpage(val,id) {
      this.$router.push({
        path: "/detailedmetting",
        query: {
          val,
          id
        }
      });
    },
  },
  mounted() {
    this.getfourconferences(1)
  },


};
</script>

<style lang="less" scoped>
.threemeeting {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;

  // background-color: #ee725b;
}
.threemeetingtop {
  width: 100%;
  height: 18vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icoclick {
  width: 30%;
  height: 59%;
  // background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.icontext {
  font-size: 12px;
  text-align: center;
  color: #fff;
  // margin: 10px 0 0 0;
}
.threemeetingcenter {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}
.centeritem {
  width: 100%;
  height: 78px;
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
}
.bottomline {
  width: 100%;
  height: 100%;
 
  box-sizing: border-box;
  padding: 8px;
  display: flex;
}
.cleft {
  width: 68px;
  height: 100%;
  background-color: #FFCC00;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 6px;
}
.cright {
  width: 80%;
  height: 100%;
  padding-left: 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.crighttetx {
  font-size: 14px;
  width: 100%;
  display: flex;
  align-items: center;
  div{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.textsize {
  display: flex;
  align-items: center;
  width: 50%;
  font-size: 12px;
  color: #c7c6c6;
}
.btnstyle {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 2px;
  width: 100%;
}
.didian {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #c7c6c6;
  width: 100%;
}
.yeardata{
 width: 100%;
 font-size: 12px;
 color: #FFFFFF;
 text-align: center;

}
.daydata{
    width: 100%;
font-size: 16px;
text-align: center;
color: #FFFFFF;
}
.weekdata{
    width: 100%;
 font-size: 12px;
 text-align: center;
 color: #FFFFFF;
}
.bgcstylke {
  width: 100%;
  height: 10px;
  background-color: #f6f6f6;
}
.study {
  width: 70%;
  height: 20px;
  line-height: 20px;
  // border-left: 2px solid red;
  // padding-left: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333333;
  margin: 10px 20px 0 20px;
}
</style>


<style lang="less">
 .threemeeting{
   .van-grid-item__content--center{
     padding: 16px 0px;
   }
 }
</style>
