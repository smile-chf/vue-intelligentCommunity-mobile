<template>
  <div class="fillinmoodrealize">
    <div class="top">
      <div class="textcolor">主题</div>
      <div>{{somedata.topic}}</div>
    </div>
    <div class="bgcstylecolor"></div>
    <div class="center">
      <div class="textcolor">议题</div>
      <div>{{somedata.subject}}</div>
      <div class="imgdiv">
        <div class="imgurldiv">
          <img :src="somedata.topicPic" alt style="width:100%" />
        </div>
      </div>
    </div>
    <div class="bgcstylecolor"></div>
    <div class="botton">
      <div style="margin:0 0 6px 0">心得体会</div>

      <van-field autosize v-model="content" type="textarea" rows="8" placeholder="请输入" />
    </div>

    <div class="btnclick">
      <van-button color="#F54133" size="large" @click="gosomepage">提交</van-button>
    </div>
  </div>
</template>

<script>
import { conference, uploadExperience, login } from "../../api/http";
export default {
  data() {
    return {
      somedata: "",
      content: "",
      id: ""
    };
  },
  methods: {
    async gosomepage() {
      let res = await uploadExperience(this.id, this.content);
       
      if (this.content.trim()=="") {
        this.$toast.fail("心得体会未填写");
      } else {
        if (res.code == 200) {
          this.$toast.success("发布成功");

          setTimeout(() => {
            this.$router.push({
              path: "/detailedmetting",
              query: { id: this.id }
            });
          }, 1000);
        }
      }
    },
    async getconference() {
      let res = await conference(this.id);

      this.somedata = res.details.conference;
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
  // height: 12.7vh;
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
  width: 100%;
  height: 38.9vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px;
}
.btnclick {
  position: fixed;
  bottom: 2.2%;
  width: 100%;
  padding: 0 30px;
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
  height: 100%;
  width: 28%;
  margin-right: 20px;
}
</style>

<style lang="less">
.fillinmoodrealize {
  .van-cell {
    padding: 0;
  }
}
</style>