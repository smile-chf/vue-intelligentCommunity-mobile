<template>
  <div>
    <div class="itemstyle" v-for="(item, index) in datasome" :key="index">
      <div @click="gopage(item.type,item.id,item.conferenceDate,item.beginTime)">
        <div class="itemtop">{{item.title}}</div>
        <div class="itemcenter">
          <div>{{item.type}}</div>
        </div>
        <div class="itembottm">{{item.endDate}} 截止</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTodoList } from "../../../api/http";
export default {
  data() {
    return {
      datasome: []
    };
  },
  methods: {
       gopage(type, id, conferenceDate, beginTime) {
      console.log(type, id);

      if (type == "三会一课") {
        console.log(conferenceDate, beginTime);
        console.log(new Date().getTime());
        console.log(
          new Date(conferenceDate.split(" ")[0] + " " + beginTime).getTime()
        );
        //   console.log();
        let showchange = false;
        if (
          new Date().getTime() <
          new Date(conferenceDate.split(" ")[0] + " " + beginTime).getTime()
        ) {
          showchange = true;
        } else {
          showchange = false;
        }
        this.$router.push({
          path: "/detailedmetting",
          query: { val: 0, id, showchange }
        });
      }

      if (type == "意见征集") {
        this.$router.push({ path: "/notjion", query: { id } });
      }
      if (type == "在线考试") {
        this.$router.push({ path: "/plan_exam", query: { id } });
      }
      if (type == "民主评议") {
        this.$router.push({ path: "/comment_detail", query: { id, type: 1 } });
      }
      if (type == "党员活动日") {
        this.$router.push({ path: "/detailsMyActivityDay", query: { id, val: 0 } });
      }
    },
  },
  async mounted() {
    let res = await getTodoList();
     this.datasome = res.details.list;
  }
};
</script>
<style lang="less" scoped>
.itemstyle {
  margin-top: 0.8rem;

  padding: 0 1rem;
  width: 100%;
  height: 4.3rem;
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
  .itemtop {
    font-size: 0.75rem;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .itemcenter {
    height: 1.7rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    div {
      //   line-height: 1.7rem;

      font-size: 13px;
      // width: 3.15rem;
      padding: 1px 6px;
      border: 1px solid #f54133;
      color: #f5473a;
      background-color: #fff0ef;
      overflow: hidden;
      text-align: center;
    }
  }
  .itembottm {
    font-size: 13px;
    color: #8e8e93;
  }
}
</style>