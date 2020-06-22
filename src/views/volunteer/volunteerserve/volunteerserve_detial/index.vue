<template>
  <div class="volpeoplist" style="background: #F6F6F6;width: 100%;height: 100%">
    <div class="party_active">
      <div class="unit">
        <p class="title">活动名称</p>
        <van-field v-model="formdata.title" type="textarea" rows="2" disabled />
      </div>
      <div class="unit">
        <van-field label="获取积分" v-model="formdata.points" error input-align="right" readonly />
      </div>
      <div class="unit flexstyle">
        <!-- <van-field label="报名倒计时" v-model="formdata.countDown" error input-align="right" readonly/> -->
        <div class="styleleft">报名倒计时</div>
        <div class="styleright">
          <van-count-down
            color="#ee0a24"
            :time="formdata.joinEndDateMS"
            format="DD 天 HH 时 mm 分 ss 秒"
          />
        </div>
      </div>

      <div class="unit module" v-if="formdata.flag=='false'">
        <p class="title">签到记录</p>
        <div class="actnum" >
          <div class="itemstyle">
            <div>{{formdata.signRecord.joinCount}}</div>
            <div>报名人数</div>
          </div>
          <div class="itemstyle">
            <div>{{formdata.signRecord.signInCount}}</div>
            <div>签到人数</div>
          </div>
          <div class="itemstyle">
            <div>{{formdata.signRecord.notSignInCount}}</div>
            <div>未到人数</div>
          </div>
          <div class="itemstyle">
            <div>{{formdata.signRecord.leaveCount}}</div>
            <div>请假人数</div>
          </div>
        </div>
      </div>

      <div class="unit module">
        <van-field label="活动地址" v-model="formdata.location" input-align="right" readonly />
        <van-field label="举办单位" v-model="formdata.company" input-align="right" readonly />
        <van-field label="联系方式" v-model="formdata.tel" input-align="right" readonly />
      </div>

      <div class="unit module">
        <p class="title">活动时间</p>
        <van-field v-model="formdata.activityDate" readonly />
      </div>
      <div class="unit">
        <van-field label="报名截止时间" v-model="formdata.joinEndDate" input-align="right" readonly />
      </div>

      <div class="unit module">
        <p class="title">活动人数</p>
        <div class="actnum">
          <div class="itemstyle">
            <div>{{formdata.peopleCount}}</div>
            <div>招募人数</div>
          </div>
          <div class="itemstyle">
            <div>{{formdata.joinCount}}</div>
            <div>已报名人数</div>
          </div>
          <div class="itemstyle">
            <div>{{formdata.lastCount}}</div>
            <div>剩余人数</div>
          </div>
        </div>
      </div>

      <div class="unit module more">
        <div class="top_title">
          <p>报名人员</p>

          <p class="p2" @click="gopeoplistpage">
            查看更多
            <img src="@/img/party_alliance/right.png" alt />
          </p>
        </div>
        <div class="foot_main">
          <div class="single" v-for="(item, index) in formdata.joinPeopleList" :key="index">
            <img src="@/img/party_alliance/default_head.png" alt />
            <p>{{item.name }}</p>
          </div>
          <!-- <div class="single">
                        <img src="@/img/party_alliance/default_head.png" alt="">
                        <p>{{formdata.name | addstar}}</p>
                    </div>
                    <div class="single">
                        <img src="@/img/party_alliance/default_head.png" alt="">
                        <p>{{formdata.name | addstar}}</p>
                    </div>
                    <div class="single">
                        <img src="@/img/party_alliance/default_head.png" alt="">
                        <p>{{formdata.name | addstar}}</p>
          </div>-->
        </div>
      </div>

      <div class="unit module">
        <p class="title">招募要求</p>
        <van-field v-model="formdata.require" readonly />
      </div>

      <div class="active_content">
        <p class="title">活动内容</p>
        <van-field v-model="formdata.content" type="textarea" rows="2" placeholder="请输入联盟活动标题" />
      </div>

      <div class="unit_upload">
        <!-- <van-uploader
                        v-model="formdata.uploaderimgurl"
                        :max-count="1"
        />-->
        <div class="imgurlstyle">
          <img :src="formdata.picPath" alt srcset />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="btn btn_2" @click="isshowpd">
        <p>{{formdata.joinMsg}}</p>
      </div>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="content" @click.stop>
          <van-icon name="cross" class="close" @click="show=false" />
          <p class="p1">参加此次活动</p>
          <p class="p2">开始时间：{{formdata.activityDate.substr(0,16)}}</p>
          <p class="p2">结束时间：{{formdata.activityDate.substr(19,35)}}</p>
          <p class="p3" @click="apply">立即报名</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getActivityDetail, joinActivity } from "@/api/http";
export default {
  data() {
    return {
      timestamp: 0,
      datalist: {},
      id: "",
      show: false,
      formdata: {
        require: "招募要求啦啦啦",
        tel: "15922332548",
        title: "",
        points: "5分",
        joinEndDateMS: "10000000",
        location: "青阳路",
        company: "市政府",
        activityDate: "2020/03/15  15:00 ~ 2020/03/15  16:00",
        joinEndDate: "2020/03/15  15:00",
        joinPeopleList: []
      }
    };
  },

  methods: {
    isshowpd() {
      if (this.formdata.joinMsg == "立即报名") {
        this.show = true;
      }
    },

    leave() {
      this.$router.push({ path: "/sponsorleave", query: { id: "1" } });
    },
    async apply() {
      let res = await joinActivity(this.id);
      if (res.code == 200) {
        this.$toast.success({ message: "参加成功", duration: 500 });
          
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
      this.getActivityDetailvue();
      this.show=false
    },
    gopeoplistpage() {
      this.$router.push({ path: "/volpeoplist", query: { id: this.id } });
    },
    async getActivityDetailvue() {
      let res = await getActivityDetail(this.id);
      // this.datalist=res.details.data
      this.formdata = res.details.data;
      this.formdata.joinEndDateMS =
        this.formdata.joinEndDateMS - this.timestamp;
    }
  },

  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.timestamp = Date.parse(new Date());
    console.log(this.timestamp);

    this.getActivityDetailvue();
  }
  // created() {

  // },
};
</script>

<style lang="less" scoped>
.actnum {
  width: 100%;
  height: 100%;
  display: flex;
  .itemstyle {
    height: 3.2rem;
    flex: 1;
    text-align: center;
    margin-top: 1rem;
    div:nth-child(1) {
      height: 1.5rem;
      font-size: 0.85rem;
    }
    div:nth-child(2) {
      height: 1rem;
    }
  }
}

.imgurlstyle {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}

.flexstyle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 16px;
  display: flex;
  .styleleft {
    width: 50%;
  }
  .styleright {
    width: 50%;
    text-align: right;
    color: #ee0a24;
  }
}
</style>

<style scoped >
.unit {
  border-bottom: 1px solid #f6f6f6;
  background: #fff;
}

.title {
  font-size: 0.75rem;
  padding-left: 0.8rem;
  padding-top: 0.6rem;
  color: #8e8e93;
}

.module {
  margin-top: 0.5rem;
}

.top_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #8e8e93;
  padding-top: 0.6rem;
  padding-bottom: 0.4rem;
}

.active_content {
  background: #fff;
  margin-top: 0.5rem;
}

.party_active {
  padding-bottom: 2.2rem;
}

.party_active .active_content .title {
  color: #333;
}

.top_title .p2 {
  font-size: 0.65rem;
}

.more {
  box-sizing: border-box;
  padding: 0 0.8rem;
}

.top_title img {
  width: 0.6rem;
  height: 0.6rem;
}

.foot_main {
  display: flex;
}

.foot_main .single {
  width: 12%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.foot_main .single:not(:last-child) {
  margin-right: 6%;
}

.foot_main .single img {
  width: 2rem;
  height: 2rem;
}

.foot_main .single p {
  width: 100%;
  color: #333333;
  font-size: 0.6rem;
  text-align: center;
  margin-top: 0.2rem;
  margin-bottom: 0.7rem;
}

.unit_upload {
  box-sizing: border-box;
  padding: 0 0.8rem;
  background: #fff;
}

.van-uploader__upload {
  width: 5rem;
  height: 5rem;
}

.van-uploader__preview-image {
  width: 5rem;
  height: 5rem;
}

.van-uploader {
  width: 100%;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  display: flex;
  box-shadow: 0 -0.5px 1px rgba(0, 0, 0, 0.16);
}

.bottom .btn {
  width: 100%;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.bottom .btn_1 {
  color: #f54133;
}

.bottom .btn_1 img {
  width: 0.95rem;
  height: 0.95rem;
}

.bottom .btn_2 {
  background: #f54133;
  color: #ffffff;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.content {
  width: 75%;
  height: 31%;
  background-color: #fff;
  border-radius: 0.7rem;
  text-align: center;
  font-size: 0.75rem;
  position: relative;
}

.content .p1 {
  font-size: 0.85rem;
  color: #333333;
  font-weight: 700;
  margin-top: 10%;
  margin-bottom: 2.2%;
}

.content .p2 {
  color: #333333;
  margin-top: 1%;
}

.content .p3 {
  margin-top: 12%;
  width: 74%;
  height: 2rem;
  background: #f54133;
  color: #ffffff;
  line-height: 2rem;
  text-align: center;
  border-radius: 0.3rem;
  margin-left: 13%;
}

.content .close {
  position: absolute;
  top: 5%;
  right: 8%;
}
</style>

<style lang="less">
.volpeoplist {
  .van-count-down {
    color: #ee0a24;
    font-size: 14px;
    line-height: 20px;
  }
  .van-field__label{
      width: 100px;
  }
}
</style>