<template>
  <div class="moodrealize">
    <div class="bignav">
      <div class="navbar">
        <div
          :class="['submitok', actievstate ? 'activestyle': 'activetext']"
          @click="changestate(1)"
        >未提交</div>
        <div
          :class="['submitno', actievstate ?  'activetext':'activestyle']"
          @click="changestate(2)"
        >已提交</div>
      </div>
    </div>
    <!-- 未提交 -->
    <div class="centeritem" v-if="actievstate" >
      <div :class="['bottomline',item.showchange? 'notclick':'']" v-for="(item, index) in listdata" :key="index" @click="gofillin(item.id)">
        <div  :class="['cleft',item.showchange? 'end':'']">
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
    <!-- 已提交 -->
    <div class="centeritem" v-if="!actievstate">
      <div :class="['bottomline',item.showchange? '':'']" v-for="(item, index) in listdata" :key="index" @click="gosomepage(item.id)">
        <div  :class="['cleft',item.showchange? 'end':'']">
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
</template>

<script>
import {EventDayexperienceConferences} from "@/api/http"
export default {
  data() {
    return {
      status:1,
      actievstate: true,
      listdata:[]
    };
  },
  methods: {
    changestate(val) {
      if (val == 1) {
        this.actievstate = true;
        this.status=1
        this.getexperienceConferences()
      }
      if (val == 2) {
        this.actievstate = false;
        this.status=2
        this.getexperienceConferences()
      }
    },
    gofillin(id) {
      // console.log(id);
      
      this.$router.push({ path: "/notSummarize",query:{id} });
    },
    gosomepage(id) {
      this.$router.push({ path: "/alreadySummarize",query:{id,form:'moodrealize'} });
    },
   async getexperienceConferences (){
        let res =await EventDayexperienceConferences (this.status)
        // console.log(res);
        this.listdata=res.details.list

            this.listdata.forEach(item => {
        item.sometime =
          item.conferenceDate.split(" ")[0] + " " + item.beginTime;
          // console.log((new Date(item.sometime).getTime())
          // console.log(new Date(item.sometime).getTime());
          if(new Date(item.sometime).getTime()>this.timestamp){
              item.showchange=true
          }else{
            item.showchange=false

          }
         console.log(item.showchange);
         
      });
    }
  },
  mounted() {
    this.getexperienceConferences()
    // console.log( this.$d("2020-05-01").get('month')+1)
 this.timestamp = new Date().getTime();
    console.log(this.timestamp);
   


  },
};
</script>

<style lang="less" scoped>
.end {
  background-color: #8e8e93 !important;
  
}
.notclick{
  pointer-events: none;
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
  background-color: #ffcc00;
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
.yeardata {
  width: 100%;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
}
.daydata {
  width: 100%;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
}
.weekdata {
  width: 100%;
  font-size: 12px;
  text-align: center;
  color: #ffffff;
}

.bignav {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 0 20px 0;
}
.navbar {
  display: flex;
  width: 100%;
  height: 6.5vh;
  box-sizing: border-box;

  overflow: hidden;
  .submitok {
    width: 50%;
    text-align: center;
    line-height: 6.5vh;
    font-size: 14px;
  }
  .submitno {
    width: 50%;
    text-align: center;
    line-height: 6.5vh;
    font-size: 14px;
  }
}

.activestyle {
  color: #f54133;
  border-bottom: 2px #f54133 solid;
}
.activetext {
  color: #8e8e93;
  border-bottom: 1px #d4d3d3 solid;
}
</style>

