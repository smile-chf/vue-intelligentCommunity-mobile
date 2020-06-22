<template>
  <div>
    <van-search v-model="search" placeholder="请输入搜索关键词" input-align="center" @search="onSearch" />
    <van-tabs v-model="active">
      <van-tab title="全部" class="box">
       
          <div class="wrap" @click="gonextpage()" v-for="(item, index) in datalist" :key="index">
            <div class="wrap_left">
              <img :src="item.contentImg" alt />
            </div>
            <div class="wrap_right">
              <div class="right_top">
                <p class="p1">{{item.title}}</p>
              </div>
              <div class="right_mid">
                <div class="mid_wrap">
                  <!-- <img src="@/img/party_alliance/bell.png" alt /> -->
                  <p>{{item.deadline}}</p>
                </div>
                
                     <p class="p2" v-if="item.timestart==0">报名中</p>
              <p class="p2" v-if="item.timestart==1">进行中</p>
              <p class="p2" v-if="item.timestart==2">已结束</p>
              </div>
            </div>
          </div>
    

        <div class="wrap">
          <div class="wrap_left">
            <img src="@/img/party_alliance/big_img.png" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">联盟活动名称</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>10:00 ~ 12:00</p>
              </div>
                 <p class="p2">报名中</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="报名中" class="box">
        <div class="wrap">
          <div class="wrap_left">
            <img src="@/img/party_alliance/big_img.png" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">联盟活动名称</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>10:00 ~ 12:00</p>
              </div>
              <p class="p2">报名中</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我参加的" class="box">
        <div class="wrap">
          <div class="wrap_left">
            <img src="@/img/party_alliance/big_img.png" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">联盟活动名称</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>10:00 ~ 12:00</p>
              </div>
              <p class="p2">报名中</p>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我发布的" class="box">
        <div class="wrap">
          <div class="wrap_left">
            <img src="@/img/party_alliance/big_img.png" alt />
          </div>
          <div class="wrap_right">
            <div class="right_top">
              <p class="p1">联盟活动名称</p>
            </div>
            <div class="right_mid">
              <div class="mid_wrap">
                <img src="@/img/party_alliance/bell.png" alt />
                <p>10:00 ~ 12:00</p>
              </div>
              <p class="p2">报名中</p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="floating" @click="publish">
      <img src="@/img/party_alliance/add.png" alt />
    </div>
  </div>
</template>

<script>
import {getAllianceActivities} from '../../../api/http'
export default {
  data() {
    return {
      search: "",
      active: 0,
      datalist:[],
      nowtime:0,
    };
  },

  methods: {
    gonextpage(){
     this.$router.push({path:"/party_active_detail"})
    },
    onSearch(val) {
      console.log(val);
    },
    publish() {
      this.$router.push('/create_active')
    },
   async getAllianceActivitiesvue(start,search){
      let res = await getAllianceActivities(start,search)
      this.datalist=res.details.list
        this.datalist.forEach(item => {
          console.log(this.$d(item.deadline).unix());
          console.log(this.$d(item.beginTime).unix());
          console.log(this.$d(item.endTime).unix());
          if (this.nowtime<this.$d(item.deadline).unix()) {
            //报名中
              item.timestart="0"
          }
          if (this.$d(item.beginTime).unix()<this.nowtime<this.$d(item.endTime).unix()) {
            //进行中
              item.timestart="1"
          }
          if (this.nowtime>this.$d(item.deadline).unix()) {
            //结束
            item.timestart="2"
          } 
      });
    }
  },
mounted() {
   this.getAllianceActivitiesvue(0)
   var myDate = new Date()
   this.nowtime= parseInt(myDate.getTime().toString().slice(0,10));
    
    
},
};
</script>

<style scoped>
.box {
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.8rem;
}
.wrap {
  width: 100%;
  height: 5rem;
  display: flex;
  margin: 0.8rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid #f6f6f6;
}
.wrap_left {
  width: 38%;
  height: 100%;
}
.wrap_left img {
  width: 100%;
  height: 78%;
}
.wrap_right {
  width: 60%;
  height: 78%;
  margin-left: 0.4rem;
  position: relative;
}
.wrap_right .right_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.2rem;
}
.wrap_right .right_top .p1 {
  font-size: 0.75rem;
  color: #333333;
}
.wrap_right .right_top .p2 {
  font-size: 0.65rem;
  color: red;
}
.wrap_right .p3 {
  font-size: 0.7rem;
  color: #8e8e93;
  margin-top: 0.3rem;
}
.wrap_right .right_mid {
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  justify-content: space-between;
}
.wrap_right .right_mid .mid_wrap {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  color: #8e8e93;
}
.wrap_right .right_mid .mid_wrap {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  color: #8e8e93;
}
.wrap_right .right_mid img {
  width: 0.55rem;
  height: 0.55rem;
}
.wrap_right .right_mid p {
  font-size: 0.6rem;
  color: #8e8e93;
  margin-left: 0.2rem;
}

.wrap_right .right_mid .p2 {
  font-size: 0.7rem;
  color: #f54133;
}
.wrap_right .right_foot {
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
}
.wrap_right .right_foot img {
  width: 0.55rem;
  height: 0.55rem;
}
.floating {
  position: fixed;
  right: 3.2%;
  bottom: 11.6%;
  width: 3.9rem;
  height: 3.9rem;
}
.floating img {
  width: 100%;
  height: 100%;
}
</style>
