<template>
  <div class="wrap">
    <div class="title">
      <input type="text" v-model="title" placeholder="请输入标题" />
    </div>
    <div class="content">
      <textarea v-model="content" placeholder="请输入评议说明"></textarea>
    </div>
    <div class="cut">
      <van-field
        style="border-bottom: 1px solid #F6F6F6"
        label="开始时间"
        disabled
        v-model="startTime"
        input-align="right"
        placeholder="请选择 >"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
        />
      </van-popup>
      <van-field
        label="结束时间"
        disabled
        v-model="endTime"
        input-align="right"
        placeholder="请选择 >"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          @confirm="onConfirm2"
          @cancel="showPicker2 = false"
        />
      </van-popup>
    </div>
    <div class="cut">
      <van-field
        label="优秀比例"
        @input="youxiu"
        maxlength="3"
        type="number"
        v-model="ratio"
        input-align="right"
        placeholder="请输入0~100的数字"
      />
    </div>
    <div class="cut">
      <van-field
        disabled
        label="互评方式"
        v-model="way"
        input-align="right"
        placeholder="请选择 >"
        @click="showPicker3 = true"
      />
      <van-popup v-model="showPicker3" position="bottom">
        <van-picker
          show-toolbar
          @confirm="onConfirm3"
          @cancel="showPicker3 = false"
          :columns="look_range"
        />
      </van-popup>
      <van-field
        disabled
        label="可见范围"
        v-model="memberIds"
        input-align="right"
        placeholder="全部党员>"
        @click="choose_range"
      />
    </div>
    <div class="btn">
      <p @click="issue">发布</p>
    </div>
    <van-overlay :show="show">
      <van-loading type="spinner" style="width:100%;height:100%" class="zzc" color="#f54133" />
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: "comment_issue",
  data() {
    return {
      show: false,
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      currentDate: new Date(),
      look_range: [
        { text: "按组织", id: 0 },
        { text: "按人员", id: 1 }
      ],
      way: "",
      title: "",
      content: "",
      startTime: "",
      endTime: "",
      ratio: "",
      type: "",
      memberIds: "",
      ids: ""
    };
  },
  created() {
    this.ids = this.$route.query.ids;
  },
  mounted() {
    this.title = window.localStorage.getItem("title");
    this.content = window.localStorage.getItem("content");
    this.startTime = window.localStorage.getItem("startTime");
    this.endTime = window.localStorage.getItem("endTime");
    this.ratio = window.localStorage.getItem("ratio");
    this.way = window.localStorage.getItem("way");
    if (this.way == "按组织") {
      this.type = 0;
    } else if (this.way == "按人员") {
      this.type = 1;
    }
    if (this.ids) {
      this.memberIds = "部分党员";
    }
  },
  methods: {
    youxiu(val) {
      if (val && val > 100) {
        this.ratio = this.ratio.slice(0, this.ratio.length - 1);
      }
    },
    onConfirm1(val) {
      this.startTime = this.$d(val).format("YYYY-MM-DD hh:mm");
      this.showPicker1 = false;
    },
    onConfirm2(val) {
      this.endTime = this.$d(val).format("YYYY-MM-DD hh:mm");
      this.showPicker2 = false;
    },
    onConfirm3(val) {
      this.way = val.text;
      this.type = val.id;
      this.showPicker3 = false;
    },
    choose_range() {
      if (this.title) {
        window.localStorage.setItem("title", this.title);
      }
      if (this.content) {
        window.localStorage.setItem("content", this.content);
      }
      if (this.startTime) {
        window.localStorage.setItem("startTime", this.startTime);
      }
      if (this.endTime) {
        window.localStorage.setItem("endTime", this.endTime);
      }
      if (this.ratio) {
        window.localStorage.setItem("ratio", this.ratio);
      }
      if (this.way) {
        window.localStorage.setItem("way", this.way);
      }
      this.$router.push({
        path: "/choose_range",
        query: {
          ids: this.ids
        }
      });
    },
    issue() {
      if (this.$d(this.startTime).valueOf() > this.$d(this.endTime).valueOf()) {
        this.$toast("开始时间不能大于结束时间");
        return false;
      }
      if (!this.title) {
        this.$toast("请输入标题");
        return false;
      }
      if (!this.content) {
        this.$toast("请输入评议说明");
        return false;
      }
      if (!this.startTime) {
        this.$toast("请选择开始时间");
        return false;
      }
      if (!this.endTime) {
        this.$toast("请选择结束");
        return false;
      }
      if (!this.ratio) {
        this.$toast("请输入优秀率");
        return false;
      }
      if (!this.way) {
        this.$toast("请选择互评方式");
        return false;
      }
      this.show = true;
      if (this.ids) {
        this.ids = this.ids.slice(0, this.ids.length - 1);
        this.$axios
          .post("/intelligentCommunity/mobile/evaluate/record/" + this.ids, {
            title: this.title,
            content: this.content,
            startTime: this.startTime,
            endTime: this.endTime,
            ratio: this.ratio,
            type: this.type
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$router.push("/democratic_comment");
            }
            this.show = false;
          });
      } else {
        this.$axios
          .get("/intelligentCommunity/mobile/party/memberIds")
          .then(res => {
            if (res.data.code === 200) {
              this.ids = res.data.details.data;
            }
            this.$axios
              .post(
                "/intelligentCommunity/mobile/evaluate/record/" + this.ids,
                {
                  title: this.title,
                  content: this.content,
                  startTime: this.startTime,
                  endTime: this.endTime,
                  ratio: this.ratio,
                  type: this.type
                }
              )
              .then(res => {
                if (res.data.code === 200) {
                  this.$router.push("/democratic_comment");
                }
                this.show = false;
              });
          });
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
}

.wrap input,
textarea {
  border: none;
  width: 100%;
  height: 100%;
}

input,
textarea::placeholder {
  font-size: 0.75rem;
  color: #8e8e93 !important;
}

.wrap .title {
  width: 100%;
  height: 2.2rem;
  box-sizing: border-box;
  padding-left: 0.2rem;
  background: #fff;
}

.wrap .content {
  width: 100%;
  height: 30vh;
  box-sizing: border-box;
  padding: 0.5rem 0.8rem;
  background: #fff;
}

.wrap .cut {
  margin-top: 0.5rem;
}

.van-cell:not(:last-child)::after {
  border: none;
}

.btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -0.025 0.05rem rgba(0, 0, 0, 0.16);
}

.btn p {
  width: 91.5%;
  height: 2.2rem;
  background: #f54133;
  line-height: 2.2rem;
  font-size: 0.85rem;
  color: #ffffff;
  border-radius: 0.3rem;
  text-align: center;
}
</style>