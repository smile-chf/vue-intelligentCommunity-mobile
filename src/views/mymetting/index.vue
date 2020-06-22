<template>
  <div class="mymetting">
    <van-sticky>
      <form action="/">
        <van-search
          v-model="searchvalue"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </van-sticky>

    <van-tabs
      v-model="active"
      title-inactive-color="#8E8E93"
      title-active-color="#F54133"
      @click="onClick"
    >
      <van-tab title="待接收">
        <div class="dcjbody">
          <div
            class="centeritem"
            v-for="(item, index) in datalist"
            :key="index"
            @click="gonextpage(0,item.id,item.showchange)"
          >
            <div class="bottomline ">
              <div :class="['cleft',!item.showchange? 'end':'']">
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
      </van-tab>
      <van-tab title="待参加">
        <div class="dcjbody">
          <div

            class="centeritem "
            v-for="(item, index) in datalist"
            :key="index"
            @click="gonextpage(1,item.id)"
          >
            <div class="bottomline ">
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
      </van-tab>
      <van-tab title="已结束">
        <div class="dcjbody">
          <div
            class="centeritem"
            v-for="(item, index) in datalist"
            :key="index"
            @click="gonextpage(2,item.id)"
          >
            <div class="bottomline">
              <div class="cleft end">
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
      </van-tab>
      <van-tab title="我的发布">
        <div class="dcjbody">
          <div
            class="centeritem"
            v-for="(item, index) in datalist"
            :key="index"
            @click="gonextpage(3,item.id,item.showchange)"
          >
            <div class="bottomline">
              <div :class="['cleft',!item.showchange? 'end':'']">
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
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { fourconferences, search } from "../../api/http";
export default {
  data() {
    return {
      timestamp: 0,
      datalist: {},
      searchvalue: "",
      active: 0,
      status: "",
      sesrchdata: ""
    };
  },
  methods: {
    async onSearch(val) {
      this.sesrchdata = val;
      let res = await search(this.status, this.sesrchdata);
      this.datalist = res.details.list;
    },
    onCancel() {
      console.log("取消");
    },
    async onClick(val) {
      console.log(val);
      this.status = val;
      if (this.sesrchdata == "") {
        this.getfourconferences(val);
      } else {
        let res = await search(this.status, this.sesrchdata);
        this.datalist = res.details.list;
      }
    },
    // 路由跳转
    gonextpage(val, id,gonextpage) {
      // if (gonextpage) {
        console.log("待参加");

           this.$router.push({
        path: "/detailedmetting",
        query: {
          val,
          id,
          showchange:gonextpage
        }
      });
      // }else{
      //     this.$toast.fail({ message: "该会议已失效", duration: 1000 });
      // }
    
    },

    async getfourconferences(val) {
      let res = await fourconferences(val);
      console.log(res);
      this.datalist = res.details.list;
      this.datalist.forEach(item => {
        item.sometime =
          item.conferenceDate.split(" ")[0] + " " + item.beginTime;
          // console.log((new Date(item.sometime).getTime())

        item.sometime= item.sometime.replace(/-/g, "/")
           console.log(item.sometime);
           
          console.log(new Date(item.sometime).getTime());
          if(new Date(item.sometime).getTime()>this.timestamp){
              item.showchange=true
              
          }else{
            item.showchange=false
            

          }
        
         
      });
    }
  },
  created() {
    this.timestamp = new Date().getTime();
    console.log(this.timestamp);
    this.getfourconferences(0);
    
    // alert(this.timestamp)
  }
};
</script>

<style lang="less" scoped>
.dcjbody {
  padding: 5px 0 10px 0;
  box-sizing: border-box;
}

.centeritem {
  width: 100%;
  height: 80px;
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
  width: 20%;
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
.end {
  background-color: #8e8e93 !important;
}
.ontclick{
  pointer-events: none;
}
</style>