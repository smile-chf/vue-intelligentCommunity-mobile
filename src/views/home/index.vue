<template>
  <div class="home">
    <div class="hometop">
      <img src="@/img/xmimg/index-home.png" alt srcset style="width:100%;height:100%" />
      <div class="imgbgc"></div>
    </div>
    <!-- <div class="homebuttonico">
          <div @click="gonextoage(1)"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
    </div>-->

    <van-grid icon-size="53" :border="false">
      <van-grid-item :icon="imgurl"  @click="setAuthenticationToParty" text="智慧党建" />
      <van-grid-item :icon="imgurlq"  @click="setAuthenticationToSign(1)" text="快捷签到" />
      <!-- <van-grid-item :icon="imgurlq"  @click="setAuthenticationToSign(2)" text="活动日签到" /> -->
    </van-grid>
    <div class="title" @click="gopagelist"  v-if="datalist.count>0">
      <p class="line"></p>
      <div class="text">待办提醒</div>
      <div class="lastadd">
        <div>{{datalist.count}}</div>>
      </div>
    </div>

    <div class="somestyle">
      <div class="itemstyle" v-for="(item, index) in length" :key="index">
        <div
          @click="gopage(datasome[index].type,datasome[index].id,datasome[index].conferenceDate,datasome[index].beginTime)"
        >
          <div class="itemtop">{{datasome[index].title}}</div>
          <div class="itemcenter">
            <div>{{datasome[index].type}}</div>
          </div>
          <div class="itembottm">{{datasome[index].endDate}} 截止</div>
        </div>
      </div>
    </div>
    <div style="height:50px"></div>
    <van-overlay :show="zc" class="zcstyle">
      <van-loading type="spinner" color="red" />
    </van-overlay>
  </div>
  
</template>


<script>
import { login, getTodoList, getIsAdministrator } from "../../api/http";

export default {
  data() {
    return {
      zc:true,
      imgurl: require("../../img/xmimg/zu6-2x.png"),
      imgurlq: require("../../img/xmimg/icoqueryqiandao.png"),
      partyUrl: "/authentication",
      signInUrl: "/authentication",
      code: "",
      datalist: {},
      datasome: [],
      length: ""
    };
  },

  methods: {
    gopagelist() {
      this.$router.push({ path: "/backloglist" });
    },
    gopage(type, id, conferenceDate, beginTime) {
      // console.log(type, id);

      if (type == "三会一课") {
        // console.log(conferenceDate, beginTime);
        // console.log(new Date().getTime());
        // console.log(
        //   new Date(conferenceDate.split(" ")[0] + " " + beginTime).getTime()
        // );
        //   console.log();
        let showchange = false;
        if (
          new Date().getTime() <
          new Date(conferenceDate.split(" ")[0] + " " + beginTime).getTime()
        ) {
          showchange = true;
        } else {
          showchange = false;
        }
        this.$router.push({
          path: "/detailedmetting",
          query: { val: 0, id, showchange }
        });
      }

      if (type == "意见征集") {
        this.$router.push({ path: "/notjion", query: { id } });
      }
      if (type == "在线考试") {
        this.$router.push({ path: "/plan_exam", query: { id } });
      }
      if (type == "民主评议") {
        this.$router.push({ path: "/comment_detail", query: { id, type: 1 } });
      }
      if (type == "党员活动日") {
        this.$router.push({ path: "/detailsMyActivityDay", query: { id, val: 0 } });
      }
    },

    gonextoage(idpage) {
      if (idpage == 1) {
        this.$router.push({ path: "../smartparty" });
      }
    },
    loginsomen() {
      let res = login();
    },
   async setAuthenticationToSign(statetype) {
       if (this.code=="") {
         return
      }
      if (this.code === 1) {
        window.localStorage.setItem("authenticationTo", "/signin");
      }
       let res  = await getIsAdministrator()
       if (res.details.data=="是") {
         this.$router.push({path:this.signInUrl,query:{statetype}})
       }else{
            this.$toast.fail({ message: "无此操作权限", duration: 1000 });
       }
       
      //  
    },
    setAuthenticationToParty() {
      if (this.code=="") {
         return
      }
      if (this.code === 1) {
        window.localStorage.setItem("authenticationTo", "/smartparty");
      }
      this.$router.push({path:this.partyUrl})
    }
  },
  created() {
    this.loginsomen();
  },
  async mounted() {
    let res = await getTodoList();
    this.datalist = res.details;
    this.datasome = res.details.list;
    if(this.datasome != null&&res.code == 200){
      if (this.datasome.length == 0) {
        this.length = 0;
      }
      if (this.datasome.length == 1) {
        this.length = 1;
      }
      if (this.datasome.length == 2) {
        this.length = 2;
      }
      if (this.datasome.length >= 3) {
        this.length = 3;
      }
    }

    // console.log(this.datasome.length);
    //   console.log(this.length);
  
    this.$axios
      .post("/intelligentCommunity/mobile/user/testMember")
      .then(res => {
        this.code = res.data.code;
        if (res.data.code === 1) {
          // 需要跳到验证页面
          window.localStorage.setItem(
            "idCard",
            res.data.details.entranceUser.idCard
          );
          window.localStorage.setItem(
            "username",
            res.data.details.entranceUser.username
          );
        } else if (res.data.code === 2) {
          // 无需跳到验证页面
          this.partyUrl = "/smartparty";
          this.signInUrl = "/signin";
        }
         this.zc=false
      }).catch((e)=>{
       this.zc=false
      });
  }
};
</script>

<style lang="less" scoped>
.itemstyle {
  margin-top: 0.8rem;

  padding: 0 1rem;
  width: 100%;
  height: 4.3rem;
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
  .itemtop {
    font-size: 0.75rem;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .itemcenter {
    height: 1.7rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    div {
      //   line-height: 1.7rem;

      font-size: 13px;
      // width: 3.15rem;
      padding: 1px 6px;
      border: 1px solid #f54133;
      color: #f5473a;
      background-color: #fff0ef;
      overflow: hidden;
      text-align: center;
    }
  }
  .itembottm {
    font-size: 13px;
    color: #8e8e93;
  }
}
.lastadd {
  text-align: right;
  display: flex;
  align-items: center;
  padding-left: 10rem;
  box-sizing: border-box;
  div {
    width: 20px;
    height: 20px;
    margin-right: 0.4rem;
    border-radius: 18px;
    background-color: #ff7171;
    right: 0;
    text-align: center;
    color: #fff;

    line-height: 20px;
    box-sizing: border-box;
    font-size: 12px;
  
  }
}
.hometop {
  width: 100%;
  padding: 10px 20px 0 20px;
  box-sizing: border-box;
  // background-color: red;
}

.homebuttonico {
  display: flex;
  width: 100%;
  height: 13vh;
  background-color: green;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    width: 25%;
    height: 100%;
  }
}

.title {
  width: 100%;
  height: 1.1rem;
  display: flex;
  align-items: center;
  padding: 0rem 0 0.6rem 0;
}

.title .line {
  width: 0.1rem;
  height: 0.7rem;
  background: #f54133;
  margin-left: 0.8rem;
  margin-right: 0.6rem;
}

.title .text {
  font-size: 0.75rem;
  color: #333333;
  width: 4rem;
}

.zcstyle{
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.1;
  background-color:#FFF;
}

</style>