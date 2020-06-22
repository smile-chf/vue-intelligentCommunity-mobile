<template>
  <div class="beginstu">
    <div class="top">
      <div>{{bodydata.title}}</div>
      <div>{{bodydata.type}}</div>
    </div>
    <div class="bgcstylecolor"></div>
    <!-- <div class="center">
      <div class="textcolor">分类</div>
      
      <div class="imgdiv">
        <div class="imgurldiv">
          <img :src="somedata.topicPic" alt style="width:100%" />
        </div>
      </div>
    </div>-->
    <div class="bgcstylecolor"></div>
    <div class="botton">
      <div style="margin:0 0 6px 0" class="textcolor">课程内容</div>

      <!-- <van-field v-model="content" type="textarea" rows="12" disabled /> -->

      <div>{{content}}{{content}}</div>
      <div style="height:70px"></div>
    </div>

    <div class="btnclick">
      <van-button color="#F54133" size="large" @click="show=true">发表评论</van-button>
    </div>

    <van-popup v-model="show">
      <div class="tccenter">
        <van-field
          v-model="pldata"
          rows="6"
          type="textarea"
          maxlength="500"
          placeholder
          show-word-limit
        />
        <div class="btnanniu">
          <div style="width:70%"></div>
          <van-button type="default" size="mini" @click="show=false">取消</van-button>
          <van-button color="#F54133" size="mini" @click="onCancel">确定</van-button>
        </div>
        <div class="dang"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { lessonsss, reviewss, incrementDuration } from "../../../api/http";
export default {
  data() {
    return {
      pldata: "",
      show: false,
      somedata: "",
      content: "",
      id: "",
      bodydata: {},
      t: ""
    };
  },
  methods: {
    async getlesson() {
      let res = await lessonsss(this.id);
      this.bodydata = res.details.data;
      this.content = res.details.data.content;
    },
    // endstu(){
    //     this.$router.push({path:"/onlinelearning"})
    // }
    async onCancel() {
      if (this.pldata.trim() == "") {
        this.$toast.fail({ message: "请填写评论内容", duration: 500 });
      } else {
        let res = await reviewss(this.id, this.pldata.trim());
        if (res.code == 200) {
          this.$toast.success({ message: "评论成功", duration: 500 });
          this.getlesson();
          this.pldata = "";
          this.show = false;
        }
        if (res.code == 500) {
          this.$notify("服务器错误");
        }
        if (res.code == 302) {
          this.$notify("登录失效，请重新登录");
        }
        if (res.code == 400) {
          this.$toast.fail({ message: "请填写评论内容", duration: 500 });
        }
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getlesson();
    this.t = setInterval(async () => {
      let res = await incrementDuration(this.id);
    }, 1000 * 60);
  },

  beforeDestroy() {
    clearTimeout(this.t);
  }
};
</script>

<style lang="less" scoped>
.dang{

}
.beginstu {
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
  // display: flex;
  align-items: center;
  flex-wrap: wrap;
  div:nth-child(2) {
    margin-top: 10px;
  }
}
.center {
  width: 100%;
  height: 12.7vh;
  background-color: #ffffff;
  padding: 16px 16px;
  box-sizing: border-box;
}
.botton {
  width: 100%;
  // height: 53.9vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px 16px 0 16px;
}
.btnclick {
  position: fixed;
  bottom: 0%;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #fff;
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
.tccenter {
  width: 375px;
  padding: 10px;
  box-sizing: border-box;
  .btnanniu {
    display: flex;
    margin: 10px 0;
  }
}
</style>

<style lang="less">
.beginstu {
  .van-cell {
    padding: 0;
  }
}
</style>