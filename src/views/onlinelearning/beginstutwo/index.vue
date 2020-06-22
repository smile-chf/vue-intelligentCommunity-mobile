<template>
  <!-- 补课学习模块 -->
  <div class="beginstutwo">
    <div class="top">会议纪要</div>
    <div v-for="(item, index) in datalist" :key="index" class="btom">
      <div class="topconten">{{item.content}}</div>
      <div style="width:80px; height:80px">
        <img :src="item.imgPath" alt srcset style="width:100%;height:100%" />
      </div>
    </div>
    <div class="btn">
      <div @click="show=true">发表评论</div>
    </div>
    <van-popup v-model="show">
      <div class="tccenter">
        <van-field
          v-model="somedata"
          rows="6"
          type="textarea"
          maxlength="500"
          placeholder
          show-word-limit
        />
        <div class="btnanniu">
          <div style="width:70%"></div>
          <van-button type="default" size="mini" @click="show=false">取消</van-button>
          <van-button color="#F54133" size="mini" @click="updatapl">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { bkconferences, reviewsss ,incrementDurationbk} from "../../../api/http";
export default {
  data() {
    return {
      t:"",
      datalist: [],
      id: "",
      somedata: "",
      show: false,
      fileList: ""
    };
  },
  methods: {
    gobeginpage() {},
    async updatapl() {
      // let res =await reviewsss(this.id,this.pldata)
      if (this.somedata.trim() == "") {
        this.$toast.fail({ message: "请填写评论内容", duration: 500 });
      } else {
        let res = await reviewsss(this.id, this.somedata.trim());
        if (res.code == 200) {
          this.$toast.success({ message: "评论成功", duration: 500 });
          this.somedata = "";
          this.show=false
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
  async mounted() {
    this.id = this.$route.query.id;
       this.t = setInterval(async () => {
      let res = await incrementDurationbk(this.id);
    }, 1000*60*3);
    let res = await bkconferences(this.id);
    this.datalist = res.details.data;
  },
  
  beforeDestroy() {
    clearTimeout(this.t);
  }
};
</script>

<style lang="less" scoped>
.beginstutwo {
  // width: 100%;
  padding: 0.8rem;
  .top {
    margin-bottom: 10px;
  }
  .topconten {
    margin-bottom: 20px;
  }
  .btn {
    width: 100%;
    height: 2.2rem;
    padding: 0 0.8rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    div {
      width: 90%;
      height: 100%;
      background-color: #f54133;
      border-radius: 0.3rem;
      line-height: 2.2rem;
      text-align: center;
      color: #ffffff;
      font-size: 16px;
    }
  }
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
.btom{
  margin-bottom: 20px;
}
</style>