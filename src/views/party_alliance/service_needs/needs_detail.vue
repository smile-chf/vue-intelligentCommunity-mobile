<template>
  <div class="needs">
    <div class="banner">
      <img src="@/img/party_alliance/party_banner.png" alt />
    </div>
    <div class="needs_box">
      <div class="unit">
        <p class="title">需求名称</p>
        <van-field disabled v-model="need_name" type="textarea" rows="2" />
      </div>
      <div class="unit">
        <van-field disabled label="服务地址" v-model="site" error input-align="right" readonly />
      </div>
      <div class="unit">
        <van-field disabled label="需求单位" v-model="unit" error input-align="right" readonly />
      </div>
      <div class="unit">
        <p class="title">服务时间</p>
        <van-field disabled v-model="times" readonly />
      </div>
      <div class="unit">
        <van-field disabled label="联系方式" v-model="contactWay" error input-align="right" readonly />
      </div>
      <div class="unit">
        <p class="title">活动内容</p>
        <van-field disabled v-model="content" type="textarea" rows="2" />

        <div class="imgbox">
          <van-image :src="uploaderimgurl" />
          <van-image :src="uploaderimgurl" />
          <van-image :src="uploaderimgurl" />
        </div>
      </div>
      <div class="unit" style="margin-top: .5rem;padding-bottom: .5rem">
        <p class="title">认领单位</p>
        <div class="people_list">
          <div class="list_unit">
            <p class="p1">单位名称单位名称单位名称单位名称</p>
            <p class="p2">李先生 123456789101</p>
          </div>
          <div class="list_unit">
            <p class="p1">单位名称单位名称单位名称单位名称</p>
            <p class="p2">李先生 123456789101</p>
          </div>
          <div class="list_unit">
            <p class="p1">单位名称单位名称单位名称单位名称</p>
            <p class="p2">李先生 123456789101</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="foot">
            <p @click="show=true">我要认领</p>
    </div>-->
    <div class="foot">
      <p @click="serveunit">选择单位</p>
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="content" @click.stop>
          <van-icon name="cross" class="close" @click="show=false" />
          <p class="p1">认领次需求</p>
          <p class="p2">开始时间：2020/03/15 15:00</p>
          <p class="p2">结束时间：2020/03/15 16:00</p>
          <p class="p3" @click="apply">确定认领</p>
        </div>
      </div>
    </van-overlay>

    <van-popup v-model="showcompere" position="bottom" :style="{ height: '60%' }">
      <div class="bigxdthtk">
        <div class="xdthtk">
          <div class="quxiao" @click="showcompere=false">取消</div>
          <div class="hytitle">认领单位</div>
          <div class="hybc">
            <div class="btnbcright" @click="servezcrdata">保存</div>
          </div>
        </div>

        <div class="bigbtnbc">
          <van-checkbox v-model="alldv" checked-color="#F54133" @change="checkzcrqx">全选</van-checkbox>
          <div class="testtwo">已选择单位</div>
        </div>

        <van-checkbox-group
          v-model="result"
          ref="checkboxGroup"
          checked-color="#F54133"
          @change="checkzcr"
        >
          <van-checkbox :name="item.id" v-for="(item, index) in zcrdata" :key="index">
            <div class="setdisplay">
              <!-- <div class="setimg"></div> -->
              <!-- <img src="@/img/xmimg/icpidnum2.png" alt srcset class="setimg" /> -->
              <div>{{item.name}}</div>
            </div>
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      need_name: "党支部第一次大会",
      site: "合肥市经开区繁华大道",
      unit: "党组织名称",
      times: "2020/03/15  15:00 ~ 2020/03/15  16:00",
      contactWay: "李先生   151448865489",
      content:
        "有须儿接铁标头山口学专才治正和通确做有须儿接铁标头山口学专才治正和通确做有须儿接铁标头山口学专才治正和通确做",
      uploaderimgurl: "https://img.yzcdn.cn/vant/cat.jpeg",
      show: false,
      showcompere: false,
      alldv: false,
      result: [],
      zcrdata: [
        {
          id: "1",
          name: "lalla"
        },
        {
          id: "2",
          name: "haha"
        }
      ]
    };
  },
  methods: {
    apply() {
      console.log("认领");
    },
    serveunit() {
      this.showcompere = true;
    },
    servezcrdata() {
      console.log("保存");

      this.showcompere = false;
    },
    //全选单位
    checkzcrqx() {
      if (this.alldv) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    checkzcr(val) {
      // console.log(val);
      console.log(val);
    }
  }
};
</script>


<style lang="less" scoped>
.needs {
  background: #f6f6f6;
  padding-bottom: 3rem;
}

.banner {
  width: 100%;
  height: 22.5vh;
}

.banner img {
  width: 100%;
  height: 100%;
}

.unit {
  border-bottom: 1px solid #f6f6f6;
  background: #fff;
}

.title {
  font-size: 0.75rem;
  padding-left: 0.8rem;
  padding-top: 0.6rem;
  color: #8e8e93;
}

.imgbox {
  box-sizing: border-box;
  /*padding: 0 5%;*/
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1rem;
}

.imgbox .van-image {
  padding-left: 5%;
  width: 25%;
}

.people_list {
  margin-top: 0.3rem;
  width: 91%;
  border-radius: 0.3rem;
  margin-left: 4.5%;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 0 0 0 0.6rem;
}

.people_list .list_unit {
  padding: 0.5rem 0;
}

.people_list .list_unit:not(:first-child) {
  border-top: 1px solid #e5e5ea;
}

.people_list .list_unit .p1 {
  font-size: 0.75rem;
  color: #333333;
}

.people_list .list_unit .p2 {
  font-size: 0.65rem;
  color: #8e8e93;
  margin-top: 0.1rem;
}

.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.foot p {
  width: 91.5%;
  height: 2.2rem;
  background: #f54133;
  border-radius: 0.3rem;
  text-align: center;
  line-height: 2.2rem;
  color: #ffffff;
  font-size: 0.85rem;
}

.van-field__body textarea,
input {
  color: #333333 !important;
  font-size: 0.75rem !important;
}

.van-field__label {
  color: #8e8e93;
  font-size: 0.75rem;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.content {
  width: 75%;
  height: 31%;
  background-color: #fff;
  border-radius: 0.7rem;
  text-align: center;
  font-size: 0.75rem;
  position: relative;
}

.content .p1 {
  font-size: 0.85rem;
  color: #333333;
  font-weight: 700;
  margin-top: 10%;
  margin-bottom: 2.2%;
}

.content .p2 {
  color: #333333;
  margin-top: 1%;
}

.content .p3 {
  margin-top: 12%;
  width: 74%;
  height: 2rem;
  background: #f54133;
  color: #ffffff;
  line-height: 2rem;
  text-align: center;
  border-radius: 0.3rem;
  margin-left: 13%;
}

.content .close {
  position: absolute;
  top: 5%;
  right: 8%;
}
.bigxdthtk {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.xdthtk {
  display: flex;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  line-height: 50px;
  border-bottom: 1px solid #f6f6f6;
  text-align: center;
  font-size: 16px;
  .quxiao {
    flex: 1;
    font-size: 14px;
    text-align: left;
  }
  .hytitle {
    flex: 1;
  }
  .hybc {
    flex: 1;
    text-align: right;
    display: flex;
    align-items: center;
    .btnbcright {
      font-size: 14px;
      width: 44px;
      height: 30px;
      background-color: #f54133;
      line-height: 30px;
      color: #ffffff;
      text-align: center;
      margin-left: auto;
    }
  }
}
.bigbtnbc {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  // .btnbc {
  //   width: 60%;
  //   background-color: #f54133;
  //   color: #ffffff;
  //   height: 30px;
  //   border-radius: 30px;
  //   text-align: center;
  //   line-height: 30px;
  // }
  div {
    width: 50%;
  }
  .testtwo {
    line-height: 40px;
    text-align: right;
    color: #8e8e93;
  }
}
.setdisplay {
  display: flex;
  align-items: center;
  justify-content: center;
  //   margin-bottom: 10px;
  .setimg {
    width: 40px;
    height: 40px;
    // background-color: red;
    margin: 0 20px;
  }
}
</style>
<style lang="less">
.needs {
  .van-checkbox-group {
    .van-checkbox {
      margin-bottom: 10px;
    }
  }
  .van-field--error .van-field__control, .van-field--error .van-field__control::placeholder {
    color: #969799;
    -webkit-text-fill-color: currentColor;
}
   .van-checkbox{
    margin:  10px 0;
  }
}
</style>