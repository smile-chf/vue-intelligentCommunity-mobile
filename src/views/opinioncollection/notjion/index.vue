<template>
  <div class="notjion">
    <div class="toptitle">
      <div class="toptitletext">{{bigdata.title}}</div>
      <div class="unit">
        <div class="p2">
          <div>{{bigdata.endDate}} 截止</div>
          <div>|</div>
          <div>参与人数 {{bigdata.joinCount}}</div>
        </div>
      </div>
    </div>
    <div class="itemti" v-for="(item, index) in list">
      <div class="itemtitle">
        <div>{{index+1}}、</div>
        <div class="redbox">单选</div>
        <div>{{item.content}}</div>
      </div>
      <van-radio-group v-model="somelist[index]">
        <div class="itemcontent">
          <van-radio
            checked-color="#F54133"
            :name="otheritem.value"
            v-for="(otheritem, index) in item.optionList"
            :key="index"
          >{{otheritem.title}}</van-radio>
        </div>
      </van-radio-group>
    </div>

    <div class="itemti" v-for="(item, index) in listduo">
      <div class="itemtitle">
        <div>{{index+1}}、</div>
        <div class="redbox">多选</div>
        <div>{{item.content}}</div>
      </div>
      <van-checkbox-group v-model="somelistduo[index]">
        <div class="itemcontent">
          <van-checkbox
            checked-color="#F54133"
            :name="otheritem.value"
            v-for="(otheritem, index) in item.optionList"
            :key="index"
          >{{otheritem.title}}</van-checkbox>
        </div>
      </van-checkbox-group>
    </div>

    <div class="xunhuan" v-for="(item, index) in askList" :key="index">
      <div class="itemtitle">
        <div>{{index+1}}、</div>
        <div class="redbox">填空</div>
        <div>{{item.content}}</div>
      </div>
      <van-cell-group>
        <van-field v-model="asklistshuchu[item.id]" placeholder="请输入内容" />
      </van-cell-group>
    </div>
    <!-- <div class="xunhuan">
          <div class="itemtitle ">
          <div>4</div>
          <div class="redbox">填空</div>
          <div>填空名称</div>
        </div>
        <van-cell-group>
          <van-field v-model="value" placeholder="请输入内容" />
        </van-cell-group>
    </div>-->
     <div class="ok"></div>
    <div class="btn">
      <div @click="dosome">提交</div>
    </div>
  </div>
</template>

<script>
import { getOpinionDetail,saveAnswer } from "../../../api/http";
export default {
  data() {
    return {
      asklistshuchu: {},
      askList: {},
      bigdata: {},
      id: "",
      value: "",
      somelist: [],
      list: [
        {
          name: "小明",
          id: 1,
          timu: [
            { val: "题目选项1", ask: 1 + "A" },
            { val: "题目选项2", ask: 1 + "B" },
            { val: "题目选项3", ask: 1 + "C" },
            { val: "题目选项4", ask: 1 + "D" }
          ]
        }
      ],
      somelistduo: [],
      listduo: [
        {
          name: "小明",
          id: 1,
          timu: [
            { val: "题目选项1", ask: 1 + "A" },
            { val: "题目选项2", ask: 1 + "B" },
            { val: "题目选项3", ask: 1 + "C" },
            { val: "题目选项4", ask: 1 + "D" }
          ]
        }
      ]
    };
  },
  methods: {
    async getOpinionDetailvue() {
      let res = await getOpinionDetail(this.id);
      this.bigdata = res.details.detail;
      this.list = res.details.detail.radioList;
      this.listduo = res.details.detail.multipleList;
      this.askList = res.details.detail.askList;
    },

   async dosome() {
      // console.log(this.somelist);
      // console.log(this.somelistduo);
      // let arr = [];
      // for (let i = 0; i < this.somelistduo.length; i++) {
      //   for (let j = 0; j < this.somelistduo[i].length; j++) {
      //     arr.push(this.somelistduo[i][j]);
      //   }
      // }
      // console.log(arr.join(","));
      // console.log(this.asklistshuchu);

      // for (const key in this.asklistshuchu) {
      //   if (this.asklistshuchu.hasOwnProperty(key)) {
      //     const element = this.asklistshuchu[key];
      //     console.log(element);
      //   }
      // }

         console.log(this.asklistshuchu);
         console.log(this.somelist);
         console.log(this.somelistduo);
         let answer={}
         answer.asklistshuchu=this.asklistshuchu
         answer.somelist=this.somelist
         answer.somelistduo=this.somelistduo
         let res =await saveAnswer(this.id,answer)
            if (res.code == 200) {
        this.$toast.success({ message: "提交成功", duration: 1000 });
        setTimeout(() => {
          this.$router.push({ path: "/opinioncollection" });
        }, 1000);
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }

    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getOpinionDetailvue();
  }
};
</script>

<style lang="less" scoped>
.notjion  {
  min-height: 100vh;
  background-color: #f6f6f6;
}

.toptitle  {
  width: 100%;
  height: 5.3rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px #e5e5ea dotted;
}
.toptitletext {
  font-size: 0.85rem;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 0.5rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.unit {
  display: block;
  width: 100%;
  box-sizing: border-box;
}
.unit .p1  {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  color: #333333;
}
.unit  .p2 {
  font-size: 0.65rem;
  color: #8e8e93;
  display: flex;
  div  {
    font-size: 0.65rem;
    color: #8e8e93;
  }

  div:nth-child(1)  {
    width: 8rem;
  }
  div:nth-child(2)  {
    width: 1.2rem;
    text-align: center;
  }
  div:nth-child(3)  {
    width: 7.05rem;
  }
  div:nth-child(4)  {
    flex: 1;
    color: #f54133;
    text-align: right;
  }
}

.itemti  {
  width: 100%;
  background-color: #fff;
  padding: 0 0.8rem;
  box-sizing: border-box;
}

.itemtitle  {
  height: 3.05rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
  .redbox  {
    width: 1.6rem;
    height: 1rem;
    background-color: #f54133;
    color: #fff;
    text-align: center;

    margin: 0 8px;
    font-size: 0.6rem;
    line-height: 1rem;
  }
}
.itemcontent {
  width: 100%;

  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
.van-radio {
  height: 3.05rem;
}
.van-checkbox {
  height: 3.05rem;
}
.btn {
  width: 100%;
  height: 2.2rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  //   margin: 1rem 0;
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
.tktstyle {
  padding: 0 0.8rem;
  background-color: #fff;
}
.notjion {
  background-color: #ffffff;
}
.xunhuan {
  padding: 0 0.8rem;
}
.ok{
  height: 2.4rem;
}
</style>

