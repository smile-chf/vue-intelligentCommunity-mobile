<template>
  <div style="background: #F6F6F6;width: 100%;height: 100%">
    <van-form @submit="onSubmit" style="background: #fff">
      <div class="unit">
        <p class="title">活动名称</p>
        <van-field v-model="formdata.title" type="textarea" rows="2" placeholder="请输入志愿活动标题" />
      </div>
      <div class="unit">
        <van-field
          disabled
          label="活动类型"
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
        <van-field label="活动地址" v-model="formdata.location" input-align="right" placeholder="请输入" />
      </div>
      <div class="unit">
        <van-field label="活动积分" v-model="formdata.points" type="number" input-align="right" placeholder="请输入" />
      </div>
      <div class="unit">
        <van-field
          label="联系方式"
          v-model="formdata.tel"
          input-align="right"
          placeholder="例: 李先生  15922333245"
        />
      </div>
      <div class="unit">
        <van-field label="举办单位" v-model="formdata.company" input-align="right" placeholder="请输入" />
      </div>
      <div class="unit">
        <van-field
          disabled
          label="签到类型"
          v-model="formdata.qiandao_type"
          input-align="right"
          placeholder="请选择 >"
          @click="showPicker2 = true"
        />
        <van-popup v-model="showPicker2" position="bottom">
          <van-picker
            show-toolbar
            @confirm="onConfirm2"
            @cancel="showPicker2 = false"
            :columns="qiandaoType"
          />
        </van-popup>
      </div>
      <div class="unit interval">
        <van-field
          label="报名截止时间"
          disabled
          v-model="formdata.joinEndDate"
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
          label="活动开始时间"
          disabled
          v-model="formdata.startDate"
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
          label="活动结束时间"
          disabled
          v-model="formdata.endDate"
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
        <van-field label="招募人数" v-model="formdata.peopleCount" type="number" input-align="right" placeholder="请输入" />
        <p class="title">招募要求</p>
        <van-field v-model="formdata.require" type="textarea" rows="2" placeholder="请输入" />
      </div>
      <div class="interval">
        <p class="title">活动内容</p>
        <van-field v-model="formdata.content" type="textarea" rows="2" placeholder="请输入活动内容" />
      </div>

      <div class="unit_upload">
        <van-uploader v-model="formdata.uploaderimgurl" :after-read="afterRead" :max-count="1" />
      </div>
      <div class="submit">
        <van-button round block native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { commonsFileUpload,getActivityTypeList,saveActivity } from "@/api/http.js";
export default {
  data() {
    return {
      showPicker1: false,
      showPicker2: false,

      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      activeType: [],
      qiandaoType: [
          { text: "不签到", id: 0 },
          { text: "扫码签到", id: 1 },
          { text: "定位签到", id: 2 },
          { text: "电子签名", id: 3 },
          { text: "扫码签到、电子签名", id: 4 },
          { text: "定位签到、电子签名", id: 5 }
        ],
      currentDate: new Date(),
      formdata: {
        company: "",
        title: "",
        type: "",
        signInType: "",
        active_type: "",
        qiandao_type:"",
        peopleCount: "",
        require: "",
        location: "",
        tel: "",
        points: "",
        joinEndDate: "",
        startDate: "",
        endDate: "",
        content: "",
        uploaderimgurl: [],
        picPath: ""
      }
    };
  },
  created() {},
  methods: {
    async afterRead(file) {
      let res = await commonsFileUpload(file.file);
      // console.log(res);
      this.formdata.picPath = res.details.path;
      // console.log(file.file);
    },
   async onSubmit(values) {
        console.log(this.formdata);
        
      if (!this.formdata.title) {
        this.$toast.fail("请输入活动名称");
        return false;
      }
      if (!this.formdata.type) {
        this.$toast.fail("请选择活动类型");
        return false;
      }
      if (!this.formdata.signInType) {
        if (this.formdata.signInType !== 0) {
          this.$toast.fail("请选择签到类型");
          return false;
        }
      }
      if (!this.formdata.location) {
        this.$toast.fail("请输入活动地址");
        return false;
      }
      if (!this.formdata.company) {
        this.$toast.fail("请输入举办单位");
        return false;
      }
      if (!this.formdata.tel) {
        this.$toast.fail("请输入联系方式");
        return false;
      }
      if (!this.formdata.joinEndDate) {
        this.$toast.fail("请选择报名截止时间");
        return false;
      }
      if (!this.formdata.startDate) {
        this.$toast.fail("请选择报名开始时间");
        return false;
      }
      if (!this.formdata.endDate) {
        this.$toast.fail("请选择报名结束时间");
        return false;
      }
      if (!this.formdata.content) {
        this.$toast.fail("请输入活动内容");
        return false;
      }
      if (!this.formdata.uploaderimgurl.length) {
        this.$toast.fail("请上传照片");
        return false;
      }
      if (!this.formdata.points) {
        this.$toast.fail("请输入活动积分");
        return false;
      }
      if (!this.formdata.peopleCount) {
        this.$toast.fail("请输入招募人数");
        return false;
      }
      if (!this.formdata.require) {
        this.$toast.fail("请输入招募要求");
        return false;
      }
       let res =await saveActivity (this.formdata)
           if (res.code == 200) {
        this.$toast.success({ message: "创建成功", duration: 1000 });
        setTimeout(() => {
            this.$router.push({ path: "/volunteerserve" });
        }, 1000);
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
    },
    onConfirm1(val) {
      this.formdata.active_type = val.text;
      this.formdata.type= val.id;
      this.showPicker1 = false;
    },
    onConfirm2(val) {
    this.formdata.qiandao_type=val.text,
    this.formdata.signInType=val.id,


      this.showPicker2 = false;
    },

    onConfirm3(val) {
      this.formdata.joinEndDate = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker3 = false;
    },
    onConfirm4(val) {
      this.formdata.startDate = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker4 = false;
    },
    onConfirm5(val) {
      this.formdata.endDate = this.$d(val).format("YYYY-MM-DD HH:mm");
      this.showPicker5 = false;
    },
   async getActivityTypeListvue(){
        let res = await getActivityTypeList()
        this.activeType=JSON.parse(
        JSON.stringify(res.details.list).replace(/name/g, "text")
      );
    }
  },
  mounted() {
    this.getActivityTypeListvue()

  }
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
