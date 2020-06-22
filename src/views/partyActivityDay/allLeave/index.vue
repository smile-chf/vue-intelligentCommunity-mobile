<template>
  <div class="sponsorleave">
    <van-field  v-model="reason" type="textarea" rows="8" placeholder="请输入请假理由" />
    <div class="btn">
        <van-button type="primary"  color="#F54133" size="large" @click="submitdata">提交</van-button>
    </div>
  </div>
</template>

<script>
import {EventDayaskLeave} from '@/api/http'
export default {
  data() {
      return {
        id:"",
          reason:''
      }
  },
  methods: {
    async submitdata(){
      let res =await EventDayaskLeave(this.id,this.reason)
         if (res.code == 200) {
        this.$toast.success({ message: "成功提交请假", duration: 1000 });
        setTimeout(() => {
         this.$router.go(-1)
        }, 1000);
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
      if (res.code == 400) {
         this.$toast.fail({ message: "该用户已请假，不能重复请假" });
          this.$router.go(-1)
      }

    }
  },
  mounted() {
    this.id=this.$route.query.id
  },
}
</script>

<style lang="less" scoped>
.sponsorleave{
    width: 100%;
    height: 100vh;
  
    background-color: #F6F6F6;
    
}
.btn{
  margin-top: 20px;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>