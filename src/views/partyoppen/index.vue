<template>
  <div class="partyoppen">
    <!-- <van-sticky> -->
    <van-search
      v-model="searchvalue"
      placeholder="请输入搜索关键词"
      input-align="center"
      @search="onSearch"
    />
    <!-- </van-sticky> -->
    <van-tabs
      v-model="active"
      sticky
      title-active-color="#f54133"
      color="#f54133"
      @click="getstate"
    >
      <van-tab title="全部" :name="beginstate">
        <div class="tabbody">
          <div
            class="itemlist"
            @click="gopage(item.id)"
            v-for="(item, index) in contentlist"
            :key="index"
          >
            <div>{{item.title}}</div>
            <div>{{item.type}}</div>
            <div>{{item.createDate}} 截止</div>
          </div>
          <!-- <div class="itemlist">
            <div>标题内容标题内容标题内容标题内容标题内容标题内标题内容标题内容标题内容标题内容标题内容标题内</div>
            <div>三会一课</div>
            <div>2020/04/16 截止</div>
          </div>-->
        </div>
      </van-tab>
      <van-tab :title="item.title" :name="item.id" v-for="(item, index) in tablist" :key="index">
        <div class="tabbody">
          <div
            class="itemlist"
            @click="gopage(items.id)"
            v-for="(items, index) in contentlist"
            :key="index"
          >
            <div>{{items.title}}</div>
            <div>{{items.type}}</div>
            <div>{{items.createDate}} 截止</div>
          </div>
        </div>
      </van-tab>
      <!-- <van-tab title="标签 3" name="1">内容 3</van-tab>
      <van-tab title="标签 4" name="1">内容 4</van-tab>
      <van-tab title="标签 4" name="1">内容 4</van-tab>-->
    </van-tabs>
    <div class="floating" @click="nextpage">
      <img src="@/img/party_alliance/add.png" alt />
    </div>
  </div>
</template>

<script>
import {
  getPartyWorkList,
  getPartyWorkTypeList,
  getMemberIsAdministrator
} from "@/api/http";
export default {
  data() {
    return {
      beginstate: "",
      searchvalue: "",
      active: "",
      tablist: [],
      contentlist: []
    };
  },
  methods: {
    getstate(name) {
      this.getPartyWorkListvue(this.searchvalue, name);
    },
    async nextpage() {
      let res = await getMemberIsAdministrator();
      let show = res.details.data;
      // this.$router.push("/sponsormeeting")
      if (show == "是") {
       this.$router.push({ path: "/oppenissue" });
      } else {
        this.$toast.fail({ message: "该用户无此权限", duration: 3000 });
      }

      
    },
    gopage(id) {
      this.$router.push({ path: "/partyitem", query: { id } });
    },
    async getPartyWorkListvue(title, type) {
      let res = await getPartyWorkList(title, type);
      this.tablist = res.details.typeList;
      this.contentlist = res.details.list;
    },
    onSearch() {
      this.getPartyWorkListvue(this.searchvalue);
    }
  },
  mounted() {
    this.getPartyWorkListvue();
  }
};
</script>

<style lang="less" scoped>
.tabbody {
  width: 100%;

  padding: 0 0.8rem;
  box-sizing: border-box;
}
.itemlist {
  width: 100%;
  height: 4.9rem;
  box-sizing: border-box;
  padding: 0.8rem 0 0.6rem 0;
  border-bottom: 1px solid #f6f6f6;

  div:nth-child(1) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 0.75rem;
    color: #333333;
    margin-bottom: 0.2rem;
  }
  div:nth-child(2) {
    width: 3.15rem;
    height: 0.95rem;
    background-color: #fff0ef;
    color: #f54133;
    font-size: 0.65rem;
    text-align: center;
    line-height: 0.95rem;
    margin-bottom: 0.4rem;
  }
  div:nth-child(3) {
    color: #8e8e93;
    font-size: 0.65rem;
  }
}
.floating {
  position: fixed;
  right: 3.2%;
  bottom: 11.6%;
  width: 3.9rem;
  height: 3.9rem;
}
.floating img {
  width: 100%;
  height: 100%;
}
</style>