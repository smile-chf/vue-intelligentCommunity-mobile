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
    <div class="center" v-if="!condition">
      <div class="textcolor">活动图片</div>
      <div class="imgdiv yihang">
        <div class="imgurldiv">
          <img
            v-for="(item, index) in somedata1.pic"
            :key="index"
            :src="item"
            alt
            style="width:4rem;height:4rem"
            @click="showimg(item)"
          />
        </div>
      </div>
    </div>
    <div class="bottonbotton" v-if="condition">
      <div style="margin:0 0 0.7rem 0">活动图片</div>
      <van-uploader v-model="upimg" multiple />
    </div>
    <div class="botton" style="margin:0 0 3rem 0">
      <div style="margin:0 0 6px 0">活动总结</div>

      <van-field
        v-model="content"
        type="textarea"
        rows="5"
        placeholder="请输入"
        :disabled="!condition"
      />
    </div>

    <div class="btnclick">
      <van-button v-if="!condition" color="#F54133" size="large" @click="changest">修改</van-button>
      <van-button v-else color="#F54133" size="large" @click="gosomepage">提交</van-button>
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
      moni:
        '["https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/7344d7fe-468a-4d9f-8d63-34cc390ef680.png","https://www.0551cx.com/publicFileUpload/test/intelligentCommunity/032a1632-9b2c-4941-9dce-d9cb197a0ba2.png"]',

      condition: false,
      showloding: false,
      somedata: "",
      somedata1: {},
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
    //提交按钮
    gosomepage() {
      this.showloding = true;

      //有图片回显
      this.giveupimg = [];
      this.upimg.forEach(async element => {
        if (element.url == null || element.url == undefined) {
          let res = await commonsFileUpload(element.file);
          this.giveupimg.push(res.details.path);
        } else {
          this.giveupimg.push(element.url);
        }
      });

      let sometimeds = setInterval(async () => {
        console.log(this.upimg.length == this.giveupimg.length);
        if (this.upimg.length == this.giveupimg.length) {
          clearInterval(sometimeds);
          console.log(this.giveupimg);
          console.log(this.content);
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
              this.$toast.success("修改成功");
              setTimeout(() => {
                this.$router.push({
                  path: "/detailsMyActivityDay",
                  query: { id: this.id, val: 2 }
                });
              }, 1000);
            }
          }

          // this.$router.push({path:"/detailsMyActivityDay",query:{id:this.id,val:2}})
          this.showloding = false;
        }
      }, 100);
    },
    //修改状态
    changest() {
      this.condition = true;
    },
    async getconference() {
      let res = await EventDayconference(this.id);

      this.somedata = res.details.conference;
      this.somedata1 = res.details.experience;
      this.somedata.topicPic = JSON.parse(this.somedata.topicPic);
      this.somedata1.pic = JSON.parse(this.somedata1.pic);
      this.content = this.somedata1.content;
      this.somedata1.pic.forEach(element => {
        this.upimg.push({ url: element });
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getconference();
  }
};
</script>

<style lang="less" scoped>
.yihang {
  overflow-x: scroll; /*添加横向滚动条*/
  white-space: nowrap; /*不换行*/
}
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