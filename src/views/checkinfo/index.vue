<template>
  <div class="checkinfo">
    <div class="bgc">
      <div class="itemlist">
        <div>姓名</div>
        <div>{{datalist.name}}</div>
      </div>
      <div class="itemlist">
        <div>身份证号</div>
        <div>{{datalist.idCardNum}}</div>
      </div>
      <div class="itemlist">
        <div>年龄</div>
        <div>{{datalist.age}}</div>
      </div>
      <div class="itemlist">
        <div>性别</div>
        <div>{{datalist.gender}}</div>
      </div>
      <div class="itemlist">
        <div>籍贯</div>
        <div>{{datalist.hometown}}</div>
      </div>
      <div class="itemlist">
        <div>民族</div>
        <div>{{datalist.nationality}}</div>
      </div>
      <div class="itemlist">
        <div>学历</div>
        <div>{{datalist.education}}</div>
      </div>
    </div>
    <div class="bgc">
      <div class="tsitem">
        <div class="textph">手机号</div>
        <div class="textwz">
          <input type="text" v-model="cellNum" />
          <div class="fontsize">若手机号已更换请输入新的手机号</div>
        </div>
      </div>
      <div class="itemlist">
        <div>联系电话</div>
        <div>{{datalist.tel}}</div>
      </div>
      <div class="itemlist">
        <div>现居住地</div>
        <div>{{datalist.liveLocation}}</div>
      </div>
    </div>
    <div class="bgc">
      <div class="itemlist">
        <div>出生日期</div>
        <div>{{datalist.birthDate}}</div>
      </div>
      <div class="itemlist">
        <div>入党时间</div>
        <div>{{datalist.joinPartyDate}}</div>
      </div>
      <div class="itemlist">
        <div>转正日期</div>
        <div>{{datalist.probationCompleteDate}}</div>
      </div>
    </div>
    <div class="bgc">
      <div class="itemlist">
        <div>工作岗位</div>
        <div>{{datalist.job}}</div>
      </div>
      <div class="itemlist">
        <div>人员类别</div>
        <div>{{datalist.memberType}}</div>
      </div>
      <div class="itemlist">
        <div>所在党支部</div>
        <div>{{datalist.depart}}</div>
      </div>
    </div>

    <div class="btn">
      <div @click="gonextpage">提交</div>
    </div>
  </div>
</template>

<script>
import { memberVerify, membercellNum } from "../../api/http";
export default {
  data() {
    return {
      cellNum: "",
      name: "",
      idCardNum: "",
      datalist: {}
    };
  },
  methods: {
    getinfo() {
      this.name = this.$route.query.name;
      this.idCardNum = this.$route.query.idCardNum;
      console.log(this.name, this.idCardNum);
    },
    async gonextpage() {
      if (!/^1[3456789]\d{9}$/.test(this.cellNum)) {
        this.$toast.fail({ message: "手机号格式错误", duration: 1000 });
      } else {
        let res = await membercellNum(this.cellNum);
        console.log(res);
        if (res.code == 200) {
          this.$toast.success({ message: "修改成功", duration: 1000 });
           this.$router.push("/smartparty")
          setTimeout(() => {
            this.$router.push({ path: window.localStorage.getItem("authenticationTo") });
          }, 2000);
        }
        if (res.code == 500) {
          this.$notify("服务器错误");
        }
        if (res.code == 302) {
          this.$notify("登录失效，请重新登录");
        }
        if (res.code == 400) {
          this.$toast.fail({ message: "手机号格式错误", duration: 500 });
        }
      }

      // this.$router.push({path:"/smartparty"})
    },
    async getdata() {
      let res = await memberVerify(this.idCardNum.trim(), this.name.trim());
      this.datalist = res.details.data;
      this.cellNum = this.datalist.cellNum;
      if ((this.datalist.gender == 1)) {
        this.datalist.gender = "男";
      } else {
        this.datalist.gender = "女";
      }
    }
  },
  mounted() {
    this.getinfo();
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
.checkinfo {
  background-color: #f6f6f6;
  min-height: 100vh;
}
.itemlist {
  width: 100%;
  height: 2.3rem;
  box-sizing: border-box;
  border: 1px solid #f6f6f6;
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  div {
    height: 100%;
    line-height: 2.3rem;
  }
  div:nth-child(2) {
    font-size: 14px;
    width: 80%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  div:nth-child(1) {
    width: 40%;
    color: #8e8e93;
  }
}
.bgc {
  background-color: #ffffff;
  margin-bottom: 0.5rem;
}
.tsitem {
  width: 100%;
  height: 2.3rem;
  box-sizing: border-box;
  border: 1px solid #f6f6f6;
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
}
input {
  border: none;
  text-align: right;
  height: 60%;
}
.fontsize {
  font-size: 12px;
  color: #f54133;
}
.textwz {
  width: 70%;
  height: 100%;
  text-align: right;
}
.textph {
  width: 30%;
  height: 100%;
  height: 40%;
  color: #8e8e93;
}
.btn {
  width: 100%;
  height: 2.2rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  margin: 1rem 0;
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