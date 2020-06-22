<template>
  <div class="authentication">
    <div class="login">
      <div class="ltop">
        <img style="width:1.2rem" src="../../img/xmimg/icpidnum2.png" alt />
        <van-field v-model="name" placeholder="请输入姓名" />
      </div>
      <div class="line"></div>
      <div class="lbottom">
        <img style="width:1.2rem" src="../../img/xmimg/icpidnum1.png" alt />
        <van-field v-model="idCardNum" placeholder="请输入身份证号" />
      </div>
    </div>

    <div class="btn">
      <div @click="gonextpage">提交</div>
    </div>
  </div>
</template>

<script>
import { memberVerify } from "../../api/http";
export default {
  data() {
    return {
      name: window.localStorage.getItem("username"),
      idCardNum: window.localStorage.getItem("idCard")
    };
  },
  methods: {
    async gonextpage() {
      let res = await memberVerify(this.idCardNum.trim(), this.name.trim());

      if (res.code == 200) {
        if (this.name.trim() != "" && this.idCardNum.trim() != "") {
          this.$router.push({
            path: "/checkinfo",
            query: {
              name: this.name.trim(),
              idCardNum: this.idCardNum.trim()
            }
          });
        } else {
          this.$toast.fail({ message: "姓名或身份证不能为空", duration: 1000 });
        }
      }
      if (res.code == 500) {
        if(res.message=="cannot find the member"){
          this.$notify("此身份证无对应党员信息！");
        }else{
          this.$notify("网络错误，请重试！");
        }
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.authentication {
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
}
.login {
  width: 100%;
  height: 6.45rem;
  // background-color: red;
  padding: 0 0.8rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  background-color: #ffffff;
}
.ltop {
  box-sizing: border-box;
  width: 100%;
  height: 3.2rem;
  padding: 0 1.4rem;
  display: flex;
  align-items: center;
  // justify-content: center;
}
.lbottom {
  box-sizing: border-box;
  width: 100%;
  height: 3.2rem;
  padding: 0 1.4rem;
  display: flex;
  align-items: center;
  // justify-content: center;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #f6f6f6;
}
.btn {
  width: 100%;
  height: 2.2rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  div {
    width: 100%;
    height: 100%;
    background-color: #f54133;
    border-radius: 0.3rem;
    line-height: 2.2rem;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
  }
}
</style>