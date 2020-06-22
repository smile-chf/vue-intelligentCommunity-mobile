<template>
  <!-- 活动总结未提交 -->

  <div class="fillinmoodrealize">
    <van-overlay :show="showloding">
      <van-loading type="spinner" color="#f54133" style="top:50%;color:#f54133" :vertical="true">
        <div style="color:#f54133">拼命加载中...</div>
      </van-loading>
    </van-overlay>
    <div class="top">
      <div class="textcolor">主题</div>
      <div>{{somedata.subject}}</div>
    </div>
    <div class="bgcstylecolor"></div>
    <div class="center">
      <div class="textcolor">详情</div>
      <div>{{somedata.topic}}</div>
      <div class="imgdiv">
        <div class="imgurldiv">
          <img
            v-for="(item, index) in somedata.topicPic"
            :key="index"
            :src="item"
            alt
            style="width:4rem;height:4rem"
            @click="showimg(item)"
          />
        </div>
      </div>
    </div>
    <div class="bgcstylecolor"></div>
    <div class="bottonbotton">
      <div style="margin:0 0 0.7rem 0">活动图片</div>
      <van-uploader v-model="upimg" multiple />
    </div>
    <div class="botton" style="margin:0 0 3rem 0">
      <div style="margin:0 0 6px 0">活动总结</div>

      <van-field v-model="content" type="textarea" rows="5" placeholder="请输入" />
    </div>

    <div class="btnclick">
      <van-button color="#F54133" size="large" @click="gosomepage">提交</van-button>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import {
  EventDayconference,
  EventDayuploadExperience,
  login
} from "@/api/http";
import { commonsFileUpload } from "@/api/http"; //图片上传
export default {
  data() {
    return {
      showloding: false,
      somedata: "",
      content: "",
      id: "",
      upimg: [],
      giveupimg: []
    };
  },
  methods: {
    //图片预览
    showimg(img) {
      ImagePreview({
        images: [img],
        closeable: true
      });
    },

    gosomepage() {
      this.showloding = true;
      this.giveupimg = [];
      //   console.log(this.upimg);
      this.upimg.forEach(async element => {
        let res = await commonsFileUpload(element.file);
        this.giveupimg.push(res.details.path);
      });

      let i = setInterval(async () => {
        if (this.giveupimg.length == this.upimg.length) {
          clearInterval(i);
          //在这里发送请求
          console.log(this.content);
          console.log(this.giveupimg);
          this.giveupimg = JSON.stringify(this.giveupimg);
          let res = await EventDayuploadExperience(
            this.id,
            this.content,
            this.giveupimg
          );
          if (this.content.trim() == "") {
            this.$toast.fail("未填写");
          } else {
            if (res.code == 200) {
              this.$toast.success("发布成功");
              setTimeout(() => {
                this.$router.push({
                  path: "/activityDaySummarize"
                  // query: { id: this.id }
                });
              }, 1000);
            }
          }
          this.showloding = false;
        }
      }, 100);
    },
    async getconference() {
      let res = await EventDayconference(this.id);
      this.somedata = res.details.conference;
      this.somedata.topicPic = JSON.parse(this.somedata.topicPic);
      //   let a=[...JSON.parse(this.somedata.topicPic)]
      //    this.somedata.topicPic=[]
      //    a.forEach(element => {
      //      this.somedata.topicPic.push({url:element})
      // });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getconference();
  }
};
</script>

<style lang="less" scoped>
.fillinmoodrealize {
  width: 100%;
  height: 100vh;
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
  height: 12.7vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.center {
  width: 100%;
  background-color: #ffffff;
  padding: 16px 16px;
  box-sizing: border-box;
}
.botton {
  width: 100%;
  //   height: 38.9vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px;
}
.bottonbotton {
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px;
  margin-bottom: 0.5rem;
}
.btnclick {
  position: fixed;
  bottom: 0%;
  width: 100%;
  height: 3rem;
  padding: 0 30px;
  background-color: #fff;
  box-sizing: border-box;
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
  //  border: 1px solid red;
  display: flex;
  height: 100%;
  // width: 28%;
  margin-right: 20px;
  img {
    margin-right: 0.5rem;
  }
}
</style>

<style lang="less">
.fillinmoodrealize {
  .van-cell {
    padding: 0;
  }
}
</style>