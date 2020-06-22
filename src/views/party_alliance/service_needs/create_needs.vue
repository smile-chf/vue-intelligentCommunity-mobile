<template>
  <div style="background: #F6F6F6;width: 100%;height: 100%">
    <van-form @submit="onSubmit" style="background: #fff">
      <div class="unit">
        <p class="title">需求名称</p>
        <van-field v-model="formdata.title" type="textarea" rows="2" placeholder="请输入服务需求标题" />
      </div>
      <div class="unit">
        <van-field
          disabled
          label="需求类型"
          v-model="formdata.active_type"
          input-align="right"
          placeholder="请选择 >"
          @click="showPicker1 = true"
        />
        <van-popup v-model="showPicker1" position="bottom">
          <van-picker
            show-toolbar
            @confirm="onConfirm1"
            @cancel="showPicker1 = false"
            :columns="activeType"
          />
        </van-popup>
      </div>
      <div class="unit">
        <van-field label="服务地址" v-model="formdata.site" input-align="right" placeholder="请输入" />
      </div>

      <div class="unit">
        <van-field
          label="联系方式"
          v-model="formdata.unit"
          input-align="right"
          placeholder="例：李先生   151448865489"
        />
      </div>
      <div class="unit interval">
        <van-field
          label="认领截止时间"
          disabled
          v-model="formdata.cut_time"
          input-align="right"
          placeholder="请选择 >"
          @click="showPicker3 = true"
        />
        <van-popup v-model="showPicker3" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            @confirm="onConfirm3"
            @cancel="showPicker3 = false"
          />
        </van-popup>
      </div>
      <div class="unit">
        <van-field
          label="服务开始时间"
          disabled
          v-model="formdata.start_time"
          input-align="right"
          placeholder="请选择 >"
          @click="showPicker4 = true"
        />
        <van-popup v-model="showPicker4" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            @confirm="onConfirm4"
            @cancel="showPicker4 = false"
          />
        </van-popup>
      </div>
      <div class="unit">
        <van-field
          label="服务结束时间"
          disabled
          v-model="formdata.end_time"
          input-align="right"
          placeholder="请选择 >"
          @click="showPicker5 = true"
        />
        <van-popup v-model="showPicker5" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            @confirm="onConfirm5"
            @cancel="showPicker5 = false"
          />
        </van-popup>
      </div>
      <div class="interval">
        <p class="title">需求内容</p>
        <van-field v-model="formdata.content" type="textarea" rows="2" placeholder="请输入需求内容" />
      </div>

      <div class="unit_upload">
        <van-uploader v-model="formdata.uploaderimgurl" :after-read="afterRead" :max-count="1" />
      </div>
      <div class="submit">
        <van-button round block native-type="submit">发布</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { commonsFileUpload } from "@/api/http.js";
export default {
  data() {
    return {
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      activeType: [],
      signType: [
        { text: "不签到", id: 0 },
        { text: "扫码签到", id: 1 },
        { text: "定位签到", id: 2 },
        { text: "电子签名", id: 3 },
        { text: "扫码签到、电子签名", id: 4 },
        { text: "定位签到、电子签名", id: 5 }
      ],
      currentDate: new Date(),
      formdata: {
        title: "",
        active_id: "",
        sign_id: "",
        active_type: "",
        sign_type: "",
        site: "",
        unit: "",
        points: "",
        cut_time: "",
        start_time: "",
        end_time: "",
        content: "",
        uploaderimgurl: [],
        topicPic: []
      }
    };
  },
  created() {
    this.$axios
      .get("/intelligentCommunity/mobile/activity/projects")
      .then(data => {
        if (data.data.code == 200) {
          var res = data.data.details.data;
          for (var i in res) {
            this.activeType.push({
              text: res[i].name,
              id: res[i].id
            });
          }
        }
      });
  },
  methods: {
    async afterRead(file) {
      let res = await commonsFileUpload(file.file);
      // console.log(res);
      this.formdata.topicPic = res.details.path;
      // console.log(file.file);
    },
    onSubmit(values) {
      if (!this.formdata.title) {
        this.$toast.fail("请输入活动名称");
        return false;
      }
      if (!this.formdata.active_id) {
        this.$toast.fail("请选择活动类型");
        return false;
      }
      if (!this.formdata.sign_id) {
        if (this.formdata.sign_id !== 0) {
          this.$toast.fail("请选择签到类型");
          return false;
        }
      }
      if (!this.formdata.site) {
        this.$toast.fail("请输入活动地址");
        return false;
      }
      if (!this.formdata.points) {
        this.$toast.fail("请输入活动积分");
        return false;
      }
      if (!this.formdata.unit) {
        this.$toast.fail("请输入举办单位");
        return false;
      }
      if (!this.formdata.cut_time) {
        this.$toast.fail("请选择报名截止时间");
        return false;
      }
      if (!this.formdata.start_time) {
        this.$toast.fail("请选择报名开始时间");
        return false;
      }
      if (!this.formdata.end_time) {
        this.$toast.fail("请选择报名结束时间");
        return false;
      }

      if (
        this.$d(this.formdata.start_time).valueOf() >
        this.$d(this.formdata.end_time).valueOf()
      ) {
        this.$toast("开始时间不能大于结束时间");
        return false;
      }
      if (!this.formdata.content) {
        this.$toast.fail("请输入活动内容");
        return false;
      }
      if (!this.formdata.uploaderimgurl.length) {
        this.$toast.fail("请最少上传一张照片");
        return false;
      }
      this.$axios
        .post("/intelligentCommunity/mobile/activity/allianceActivity", {
          title: this.formdata.title,
          projectId: this.formdata.active_id,
          location: this.formdata.site,
          beginTime: this.formdata.start_time,
          endTime: this.formdata.end_time,
          deadLine: this.formdata.cut_time,
          departId: this.formdata.unit,
          points: this.formdata.points,
          content: this.formdata.content,
          punchType: this.formdata.sign_id,
          contentImg: this.formdata.topicPic
        })
        .then(data => {
          if (data.status == 200) {
            this.$toast.success("发布成功");
            var that = this;
            setTimeout(function() {
              that.$router.push("/party");
            }, 1000);
          }
        });
    },
    onConfirm1(val) {
      this.formdata.active_type = val.text;
      this.formdata.active_id = val.id;
      this.showPicker1 = false;
    },
    onConfirm2(val) {
      this.formdata.sign_type = val.text;
      this.formdata.sign_id = val.id;
      this.showPicker2 = false;
    },
    onConfirm3(val) {
      this.formdata.cut_time = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker3 = false;
    },
    onConfirm4(val) {
      this.formdata.start_time = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker4 = false;
    },
    onConfirm5(val) {
      this.formdata.end_time = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker5 = false;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.unit {
  border-bottom: 1px solid #f6f6f6;
}

.title {
  font-size: 0.75rem;
  color: #333333;
  padding-left: 0.8rem;
  padding-top: 0.6rem;
}

.interval {
  border-top: 0.5rem solid #f6f6f6;
}

.unit_upload {
  box-sizing: border-box;
  padding: 0 0.8rem;
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

.submit {
  height: 4.4rem;
  width: 100%;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit button {
  height: 50%;
  width: 91.47%;
  background: #f54133;
  color: #ffffff;
  font-size: 0.85rem;
  border-radius: 0.3rem;
  border: none;
}
</style>