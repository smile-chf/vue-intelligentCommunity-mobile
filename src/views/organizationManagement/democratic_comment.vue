<template>
  <div>
    <div class="switch">
      <p :class="isswitch?'active':''" @click="change(0)">未评议</p>
      <p :class="isswitch?'':'active'" @click="change(1)">已评议</p>
    </div>
    <div class="main" v-if="list">
      <div class="unit" v-for="item of list" @click="godetail(item.id)">
        <p class="p1">{{item.title}}</p>
        <p class="p2">{{item.endTime }} 截止</p>
      </div>
    </div>
    <div class="add" @click="issue">
      <img src="@/img/party_alliance/add.png" alt />
    </div>
  </div>
</template>
<script>
import { getMemberIsAdministrator } from "../../api/http";
export default {
  data() {
    return {
      isswitch: 1,
      list: []
    };
  },
  created() {
    this.getlist(0);
  },
  methods: {
    async issue() {
      let res = await getMemberIsAdministrator();
      let show = res.details.data;
      // this.$router.push("/sponsormeeting")
      if (show == "是") {
        window.localStorage.setItem("title", "");
        window.localStorage.setItem("content", "");
        window.localStorage.setItem("startTime", "");
        window.localStorage.setItem("endTime", "");
        window.localStorage.setItem("ratio", "");
        window.localStorage.setItem("way", "");
        this.$router.push("/comment_issue");
      } else {
        this.$toast.fail({ message: "该用户无此权限", duration: 3000 });
      }
    },
    change(type) {
      if (type == 0) {
        this.isswitch = 1;
        this.getlist(0);
      } else {
        this.isswitch = 0;
        this.getlist(1);
      }
    },
    godetail(id) {
      this.$router.push({
        path: "/comment_detail",
        query: {
          id: id,
          type: this.isswitch
        }
      });
    },
    getlist(type) {
      this.$axios
        .get("/intelligentCommunity/mobile/evaluate/records/" + type)
        .then(res => {
          if (res.data.code === 200) {
            this.list = res.data.details.list;
          }
        });
    }
  }
};
</script>
<style scoped>
.switch {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background: #fff;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
}

.switch p {
  width: 50%;
  height: 100%;
  text-align: center;
  line-height: 2rem;
  font-size: 0.75rem;
  color: #333333;
  position: relative;
}

.switch .active:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.1rem;
  background: #f54133;
}

.main {
  padding-top: 2rem;
}

.main .unit {
  display: block;
  height: 3.9rem;
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
  padding: 0.8rem 0;
}

.main .unit .p1 {
  width: 100%;
  box-sizing: border-box;
  padding-left: 0.8rem;
  padding-right: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  color: #333333;
}

.main .unit .p2 {
  padding-left: 0.8rem;
  margin-top: 0.3rem;
  font-size: 0.65rem;
  color: #8e8e93;
}

.add {
  width: 3.9rem;
  height: 3.9rem;
  position: fixed;
  bottom: 11%;
  right: 3%;
}

.add img {
  width: 100%;
  height: 100%;
}
</style>
