<template>
  <!-- 补课详情页面 -->
  <div class="catchuplearning">
    <div class="top">
      <img src="../../../img/xmimg/bgkcjj.png" alt srcset />
    </div>
    <van-tabs
      v-model="active"
      title-active-color="#F54133"
      title-inactive-color="#333333"
      color="#F54133"
    >
      <van-tab title="课程简介">
        <div class="main">
          <div class="kcname">{{datalist.subject}}</div>
          <div class="stazt">
            <div>未学习</div>
            <div>三会一课</div>
            <div>|</div>
            <div>2020/04/16 完成</div>
          </div>
        </div>
           <div class="line"></div>
             <div class="formlist">
            <div class="itemleft" >分类</div>
            <div class="itemright" >{{datalist.type}}</div>
          </div>
          <div class="formlist">
            <div class="itemleft" >会议日期</div>
            <div class="itemright" >{{datalist.conferenceDate}}   {{datalist.beginTime}}~{{datalist.endTime}} </div>
          </div>
          <div class="formlist">
            <div class="itemleft" >会议地点</div>
            <div class="itemright" >{{datalist.location}}</div>
          </div>
          <div class="formlist">
            <div class="itemleft" >所属组织</div>
            <div class="itemright" >{{datalist.partyDepart}}</div>
          </div>
          <div class="zhuti">主题</div>
           <div class="zhuticonter">
               {{datalist.subject}}
           </div>
           <div class="line"></div>
            <div class="zhuti">议题</div>
           <div class="zhuticonter">
               {{datalist.topic}}
           </div>
           <div class="imgstyle">
               <img :src="datalist.topicPic" alt="" srcset="" >
           </div>
        <div class="btn">
          <div @click="gobeginpage">开始学习</div>
        </div>
      </van-tab>
      <van-tab :title="titlenum">
        <div class="plbigbody">
          <div class="plbody" v-for="(item, index) in pldatalist" :key="index">
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
      
          <!-- <div class="searchsome">
            <van-search v-model="somedata" shape="round" :left-icon="icourl" placeholder="说点什么吧" show-action>
            <div slot="action" class="btnss" @click="onCancel">确定</div>
            </van-search>
          </div> -->
             <div class="btn">
          <div @click="gobeginpage">开始学习</div>
        </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {bkconference,bkreviews,reviewsss} from '../../../api/http'
export default {
  data() {
    return {
      titlenum:"",
        datalist:{},
      active: 0,
      somedata: "",
      pldatalist:[],
      icourl: require("../../../img/xmimg/searchico.png")
    };
  },
  methods: {
    async getbkconference(){
        let res =await bkconference(this.id)
        this.datalist=res.details.data
        let ress=await bkreviews(this.id )
        this.pldatalist=  ress.details.list
        this.titlenum="评论（"+this.pldatalist.length+")"
        
    },
     async onCancel(){
     if (this.somedata.trim()=="") {
        this.$toast.fail({ message: "请填写评论内容", duration: 500 });
     } else {
         let res =await reviewsss(this.id,this.somedata.trim())
          if (res.code == 200) {
        this.$toast.success({ message: "评论成功", duration: 500 });
        this.getbkconference();
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
        this.$router.push({path:"/beginstutwo",query:{id:this.id}})
    }
  
  },
  mounted() {
      this.id=this.$route.query.id
      this.getbkconference()
  },
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
  
    height: 1.65rem;
    line-height: 1.65rem;
  }
  div:nth-child(1) {
      width: 45%;
    color: #f54133;
  }
  div:nth-child(2) {
      width: 20%;
    text-align: right;
    color: #8e8e93;
  }
  div:nth-child(3) {
      width: 5%;
     color: #8e8e93;
     text-align: center;
  }
  div:nth-child(4) {
      width: 35%;
    text-align: center;
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
  margin-bottom: 54px;
}

.searchsome {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.line{
    width: 100%;
    height: 0.5rem;
    background-color: #F6F6F6;
}
.formlist{
    display: flex;
    height: 2.25rem;
    box-sizing: border-box;
    padding: 0.6rem  0.8rem;
    border: 1px solid #F6F6F6;
    .itemleft{
        flex: 0.5;
       color: #8E8E93;
       font-size: 15px;
    }
    .itemright{
        flex: 1;
        text-align: right;
        font-size: 15px;
    }
}
.zhuti{
    width: 100%;
    height: 1.95rem;
    line-height: 1.95rem;
    box-sizing: border-box;
    padding-left: 0.8rem;
    color: #8E8E93;
}
.zhuticonter{
    height: 2.05rem;
    padding: 0 0.8rem;
    box-sizing: border-box;
}
.imgstyle{
    width: 5.45rem;
    height: 5.45rem;
    margin-bottom: 2.4rem;
    margin-left: 0.8rem;
    img{
    width: 100%;
    height: 100%;
}
}
.btnss{
  width: 2.6rem;

  background-color: #F54133;
  text-align: center;
  color: #FFF;
  border-radius: 4px;

}
</style>