<template>
  <div class="onlinelearning">
    <van-tabs
      sticky
      title-active-color="#F54133"
      title-inactive-color="#333333"
      color="#F54133"
      @change="oncahnge"
    >
      <van-tab title="全部">
        <div class="centent">
          <div
            class="left"
            v-for="(item, index) in alldata"
            :key="index"
            @click="gonextpage(item.id,item.form)"
          >
            <div class="imgsize">
              <img v-if="item.form==1" :src="item.pic" alt srcset style="width:100% ;height:100%" />
              <img
                v-if="item.form==0"
                src="@/img/xmimg/zw1-1.png"
                alt
                srcset
                style="width:100% ;height:100%"
              />
            </div>
            <div class="textstyle">{{item.title}}</div>
            <div class="threecss">
              <div>
                <img src="../../img/xmimg/icoyan.png" alt srcset style="width:100%" />
              </div>
              <div>{{item.studies}}</div>
              <div>{{item.deadline}} 完成</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="补课">
        <div class="centent">
          <div
            class="left"
            v-for="(item, index) in bkdata"
            :key="index"
            @click="gonextbkpage(item.id)"
          >
            <div class="imgsize">
              <img src="@/img/xmimg/zw1-1.png" alt srcset style="width:100% " />
            </div>
            <div class="textstyle">{{item.title}}</div>
            <div class="bqsh">三会一课</div>
            <div class="threecss">
              <div>
                <img src="../../img/xmimg/icoyan.png" alt srcset style="width:100%" />
              </div>
              <div>{{item.studies}}</div>
              <div>{{item.deadline}} 完成</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab
        :title="item.name"
        :name="item.id"
        v-for="(item, index) in tabbarlistdata"
        :key="index"
      >
        <div class="centent" >
          <div class="left" v-for="(itemkey, index) in bkdatalist " :key="index" @click="gonextpage(itemkey.id)">
            <div class="imgsize">
              <img :src="itemkey.pic" alt srcset style="width:100%;height:100% " />
            </div>
            <div class="textstyle">{{itemkey.title}}</div>
            <div class="threecss">
              <div>
                <img src="../../img/xmimg/icoyan.png" alt srcset style="width:100%" />
              </div>
              <div>{{itemkey.studies}}</div>
              <div>{{itemkey.deadline}} 完成</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { lessonTypes, lessons, makeUps, bklessons } from "../../api/http";
export default {
  data() {
    return {
      tabbarlistdata: [],
      alldata: [],
      bkdata: [],
      bkdatalist: []
    };
  },
  methods: {
    oncahnge(name, title) {
      if (name == 1) {
        this.getmakeUps();
      }
      // console.log(name);

      if (name !== 0 && name !== 1) {
        this.getbklessons(name);
      }
    },
    gonextpage(id,type) {
      if (type!=0) {
        this.$router.push({ path: "/courseintroduction", query: { id } });
      }
      if (type==0) {
        this.$router.push({ path: "/catchuplearning", query: { id } });
      }
    
      
    },
    gonextbkpage(id) {
      this.$router.push({ path: "/catchuplearning", query: { id } });
    },
    async getlessonTypes() {
      let res = await lessonTypes();
      this.tabbarlistdata = res.details.list;
    },
    async getlessons() {
      let res = await lessons();
      this.alldata = res.details.lessons;
      let arr = res.details.makeUps;
      for (let index = 0; index < arr.length; index++) {
        this.alldata.push(arr[index]);
      }
      console.log(this.alldata);
    },
    async getmakeUps() {
      let res = await makeUps();
      this.bkdata = res.details.list;
    },
    async getbklessons(typeid) {
      let res = await bklessons(typeid);
      this.bkdatalist = res.details.list;
    }
  },
  mounted() {
    this.getlessonTypes();
    this.getlessons();
  }
};
</script>

<style lang="less" scoped>
.centent {
  width: 100%;
  padding: 0.5rem 0.8rem 0 0.8rem;
  //   height: 100vh;
  //   background-color: aqua;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .left:nth-child(2n) {
    padding-left: 0.2rem;
  }
  .left:nth-child(2n + 1) {
    padding-right: 0.2rem;
  }
  .left {
    width: 50%;
    box-sizing: border-box;
    margin-bottom: 0.8rem;
  }
  .right {
    width: 50%;
    height: 7.05rem;
    // background-color: aliceblue;
    box-sizing: border-box;
    margin-bottom: 0.8rem;
    // padding-left: 0.2rem;
  }
  .imgsize {
    width: 100%;
    height: 4.7rem;
    margin-bottom: 0.3rem;
  }
  .textstyle {
    width: 100%;
    height: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    margin-bottom: 0.25rem;
  }
  .threecss {
    width: 100%;
    height: 0.8rem;
    font-size: 12px;
    color: #8e8e93;
    display: flex;
    div:nth-child(1) {
      flex: 0.3;
    }
    div:nth-child(2) {
      flex: 1;
    }
    div:nth-child(3) {
      flex: 1.5;
    }
  }
  .bqsh {
    width: 2.5rem;
    height: 0.7rem;
    background-color: #fff0ef;
    //   opacity:0.08;
    color: #f54133;
    font-size: 10px;
    margin-bottom: 0.4rem;
  }
}
</style>