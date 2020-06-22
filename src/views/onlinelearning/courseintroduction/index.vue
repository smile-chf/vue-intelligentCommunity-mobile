<template>
  <div class="courseintroduction">
    <div class="top">
      <img :src="jjdata.pic" alt srcset />
    </div>
    <van-tabs
      v-model="active"
      title-active-color="#F54133"
      title-inactive-color="#333333"
      color="#F54133"
    >
      <van-tab title="课程简介">
        <div class="main">
          <div class="kcname">{{jjdata.title}}</div>
          <div class="stazt">
            <div v-if="jjdata.isStudied==0">未学习</div>
            <div v-if="jjdata.isStudied==1">已学习</div>
            <div>{{jjdata.deadline}} 完成</div>
          </div>
          <div class="contenttext">{{jjdata.brief}}</div>
        </div>
        <div class="btn">
          <div @click="gobeginpage">开始学习</div>
        </div>
      </van-tab>
      <van-tab :title="titlenum">
        <div class="plbigbody">
          <div class="plbody" v-for="(item, index) in pldata" :key="index">
            <div class="itempl">
              <div class="icostyle">
                <img src="../../../img/xmimg/icopl.png" alt />
              </div>
              <div class="ncstyle">
                <div class="pltop">
                  <div>{{item.name}}</div>
                  <div>{{item.createTime}}</div>
                </div>
                <div
                  class="plbtm"
                >{{item.content}}</div>
              </div>
            </div>
          </div>
            <div class="btn">
          <div @click="gobeginpage">开始学习</div>
        </div>
          <!-- <div class="searchsome">
            <van-search v-model="somedata" shape="round" :left-icon="icourl" placeholder="说点什么吧"  show-action  >
              <div slot="action" class="btnss" @click="onCancel">确定</div>
            </van-search>
          </div> -->

          <!-- 弹出层 -->
          <!-- <van-popup v-model="show">
            <div class="tccenter">
              <van-field
                v-model="somedata"
                rows="4"
                type="textarea"
                maxlength="500"
                placeholder="请输入留言"
                show-word-limit
              />
               <div class="btnanniu">
                 <div style="width:70%"></div>
                 <van-button type="default" size="mini"  @click="show=false">取消</van-button>
                 <van-button color="#F54133" size="mini" @click="show=false">确定</van-button>
               </div>
            </div>
          </van-popup>-->
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { lesson, reviews,reviewss } from "../../../api/http";
export default {
  data() {
    return {
      titlenum:"评论 （ 1 ）",
      pldata: [],
      jjdata: {},
      id: "",
      show: false,
      active: 0,
      somedata: "",
      icourl: require("../../../img/xmimg/searchico.png")
    };
  },
  methods: {
   async onCancel(){
     if (this.somedata.trim()=="") {
        this.$toast.fail({ message: "请填写评论内容", duration: 500 });
     } else {
         let res =await reviewss(this.id,this.somedata.trim())
          if (res.code == 200) {
        this.$toast.success({ message: "评论成功", duration: 500 });
        this.getlesson();
        this.somedata=""
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }if(res.code == 400){
        this.$toast.fail({ message: "请填写评论内容", duration: 500 });
      }
     }
    
      
    },

       gobeginpage(){
        this.$router.push({path:"/beginstu",query:{id:this.id}})
    },
    async getlesson() {
      let res = await lesson(this.id);
      this.jjdata = res.details.data;
      let ress = await reviews(this.id);
      this.pldata = ress.details.list;
      this.titlenum="评论（"+this.pldata.length+"）"
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getlesson();
  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 10.55rem;
  img {
    width: 100%;
    height: 100%;
  }
}

.main {
  box-sizing: border-box;
  padding: 0.45rem 0.8rem 0 0.8rem;
  width: 100%;
}
.kcname {
  font-size: 17px;
  font-weight: 400;
  line-height: 1rem;
  margin-bottom: 0.4rem;
}
.stazt {
  width: 100%;
  height: 1.65rem;
  display: flex;
  div {
    width: 50%;
    height: 1.65rem;
    line-height: 1.65rem;
  }
  div:nth-child(1) {
    color: #f54133;
  }
  div:nth-child(2) {
    text-align: right;
    color: #8e8e93;
  }
}
.contenttext {
  width: 343px;
  height: 194px;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(142, 142, 147, 1);
  opacity: 1;
  text-indent: 1.5rem;
}
.btn {
  width: 100%;
  height: 2.2rem;
  padding: 0 0.8rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
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

.plbody {
  width: 100%;
  padding: 0 0.8rem;
  box-sizing: border-box;
  .itempl {
    width: 100%;
    height: 6.25rem;
    border-bottom: 1px solid #f6f6f6;
    box-sizing: border-box;
    padding: 0.8rem 0;
    display: flex;
    .icostyle {
      width: 2rem;
      height: 100%;
      img {
        width: 100%;
      }
    }
    .ncstyle {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding: 0 0.5rem;
      .pltop {
        width: 100%;
        height: 1.35rem;
        display: flex;
        div {
          width: 50%;
          line-height: 1.35rem;
        }
        div:nth-child(1) {
          color: #f54133;
        }
        div:nth-child(2) {
          font-size: 12px;
          color: #8e8e93;
          text-align: right;
        }
      }
      .plbtm {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-top: 0.5rem;
      }
    }
  }
}

.plbigbody {
  // margin-bottom: 54px;
}

.searchsome {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.tccenter {
  width: 18.75rem;
  height: 9rem;
  background-color: #ffffff;
}
.btnanniu {
  display: flex;
  width: 100%;
  height: 30px;
  margin-top: 10px;
  // background-color: red;
}
.btnss{
  width: 2.6rem;

  background-color: #F54133;
  text-align: center;
  color: #FFF;
  border-radius: 4px;

}
</style>