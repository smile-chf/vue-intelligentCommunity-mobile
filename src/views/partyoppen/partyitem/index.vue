<template>
  <div class="partyitem">
    <div class="partytop">
      <div class="toptitle">{{topdata.title}}</div>
      <div class="topthree">
        <div class="topdata">{{topdata.createDate}}</div>
        <div class="topname">{{topdata.name}}</div>
        <div class="topico">
          <img src="../../../img/xmimg/icoliulan.png" alt />
          <div>{{topdata.watchCount}}</div>
        </div>
      </div>
      <div class="topcenter">{{topdata.content}}</div>
      <div class="topimg" v-for="(item, index) in imglist" :key="index">
        <img :src="item" style="width:100%;height:100%" alt />
      </div>
    </div>
    <div class="reand">
      <van-tabs v-model="active" title-active-color="#f54133" color="#f54133">
        <van-tab :title="okred">
          <div class="manicoitem">
            <div class="icoitem" v-for="(item, index) in centerdata.isWatchList" :key="index">
              <div class="icotop">
                <img src="static/img/default_head.7043e7be.png" alt />
              </div>
              <div class="icotext">{{item.name}}</div>
            </div>

            <div class="icoitem">
              <div class="icotop">
                <img src="../../../img/xmimg/threedian.png" alt @click="golistpage(1)" />
              </div>
              <div class="icotext"></div>
            </div>
          </div>
        </van-tab>
        <van-tab :title="nored">
          <div class="manicoitem">
            <div class="icoitem" v-for="(item, index) in nolistred" :key="index">
              <div class="icotop">
                <img src="static/img/default_head.7043e7be.png" alt />
              </div>
              <div class="icotext">{{item.name}}</div>
            </div>

            <div class="icoitem">
              <div class="icotop">
                <img src="../../../img/xmimg/threedian.png"   @click="golistpage(0)" alt />
              </div>
              <div class="icotext"></div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="observer">
      <div class="obtop">
        <div>评论（{{centerdata.commentCount}}）</div>
        <div>赞（{{topdata.likeCount}}）</div>
      </div>
      <div class="obitem" v-for="(item, index) in centerdata.commentList" :key="index">
        <div class="obitemtop">
          <div class="obico">
            <img src="static/img/default_head.7043e7be.png" alt />
          </div>
          <div class="obname">
            <div class="obnametop">
              <div class="obnick">{{item.name}}</div>
              <div class="oborg">{{item.departName}}</div>
            </div>
            <div class="obnameday">{{item.createDate}}</div>
          </div>
        </div>
        <div class="obitembottom"> {{item.content}} </div>
      </div>
     
    </div>
    <div class="zhanwei"></div>
    <div data-v-06cafdd2 class="sure">
      <!-- <van-search v-model="searchdata" shape="round" :left-icon="icourl" placeholder="说点什么吧..." /> -->
      <van-search
        v-model="searchdata"
        shape="round"
        :left-icon="icourl"
        placeholder="说点什么吧"
        show-action
         @search="onSearch"
         :disabled="showdis"
      >
        <div slot="action" class="btnss">
           <img src="../../../img/xmimg/starticon.png" alt srcset=""  v-if="centerdata.isCollect==='false'" style="margin:0 0.5rem" @click="collectPartyWorkvue(1)">
           <img src="../../../img/xmimg/starticoy.png" alt srcset=""  v-if="centerdata.isCollect==='true'" style="margin: 0 0.5rem" @click="collectPartyWorkvue(0)">
          <img src="../../../img/xmimg/goodno.png" v-if="centerdata.isLike==='false'" alt srcset @click="likePartyWorkvue(1)" />
          <img src="../../../img/xmimg/goodnoyes.png" v-if="centerdata.isLike==='true'" alt srcset=""  @click="likePartyWorkvue(0)">
         
        </div>
        
      </van-search>
    </div>
  </div>
</template>

<script>
import { getPartyWorkDetail,likePartyWork,savePartyWorkComment,collectPartyWork } from "../../../api/http";
export default {
  data() {
    return {
      nolistred: [],
      centerdata: [],
      okred: "",
      nored: "",
      topdata: "",
      imglist: "",
      id: "",
      active: 0,
      searchdata: "",
      icourl: require("../../../img/xmimg/searchico.png"),
      showdis:""
    };
  },
  methods: {
    golistpage(stat) {
      this.$router.push({ path: "/partyitemmorelist",query:{id:this.id,flag:stat} });
    },

    async getPartyWorkDetailvue(id) {
      let res = await getPartyWorkDetail(id);
      this.topdata = res.details.detail.partyWork;
      this.imglist = res.details.detail.filePathList;
      this.centerdata = res.details.detail.watchAndComment;
      this.okred = "已读人数  " + "( " + this.centerdata.isWatchCount + " )";
      this.nored = "未读人数  " + "( " + this.centerdata.notWatchCount + " )";
       if (this.topdata.isComment==0) {
         this.showdis=true
       } else {
          this.showdis=false
       }
      if (this.centerdata.notWatchList.length > 5) {
        this.nolistred = this.centerdata.notWatchList.slice(0, 5);
      } else {
        this.nolistred = this.centerdata.notWatchList;
      }
    },
    async likePartyWorkvue(flag){
      let res= await likePartyWork(this.id,flag)
          if (res.code == 200) {
      if (flag==1) {
          this.$toast.success({ message: "点赞成功", duration: 500 });
          this.centerdata.isLike="true"
          this.getPartyWorkDetailvue(this.id)
      }else{
      this.$toast.success({ message: "已取消点赞", duration: 500 });
      this.centerdata.isLike="false"
      this.getPartyWorkDetailvue(this.id)
      }
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
    },
    async collectPartyWorkvue(flag){
      let res= await collectPartyWork(this.id,flag)
          if (res.code == 200) {
      if (flag==1) {
          this.$toast.success({ message: "收藏成功", duration: 500 });
          this.centerdata.isCollect="true"
          this.getPartyWorkDetailvue(this.id)
      }else{
      this.$toast.success({ message: "已取消收藏", duration: 500 });
      this.centerdata.isCollect="false"
      this.getPartyWorkDetailvue(this.id)
      }
      }
      if (res.code == 500) {
        this.$notify("服务器错误");
      }
      if (res.code == 302) {
        this.$notify("登录失效，请重新登录");
      }
    },
  async  onSearch(){
   
      let res = await savePartyWorkComment(this.id,this.searchdata)
       if (res.code == 200) {
        this.$toast.success({ message: "评论成功", duration: 500 });
        this.getPartyWorkDetailvue(this.id)
           this.searchdata=""
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
    this.getPartyWorkDetailvue(this.id);
       
    
  }
};
</script>

<style lang="less" scoped>
.partytop {
  width: 100%;
  padding: 0.6rem 1rem 0.8rem 0.8rem;
  box-sizing: border-box;
}
.toptitle {
  width: 100%;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: Alibaba PuHuiTi;
  margin-bottom: 0.5rem;
}
.topthree {
  display: flex;
  margin-bottom: 0.8rem;
  div {
    font-size: 0.65rem;
    color: #8e8e93;
  }
  .topdata {
    margin-right: 1rem;
    box-sizing: border-box;
    padding-top: 0.1rem;
  }
  .topname {
    margin-right: 5rem;
  }
  .topico {
    display: flex;
    box-sizing: border-box;
    padding-top: 0.1rem;
    img {
      width: 1rem;
      height: 1rem;
    }
    div {
      margin-top: 0.15rem;
    }
  }
  .topcenter {
    width: 17.15rem;
    height: 8.25rem;
    font-size: 0.75rem;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    line-height: 1.2rem;
    letter-spacing: 2.6rem;
  }
}

.topimg {
  margin-top: 0.5rem;
  width: 5.45rem;
  height: 5.45rem;
  // background-color: red;
}
.manicoitem {
  padding: 0.6rem 0.8rem 0.8rem;
  box-sizing: border-box;
  display: flex;
}
.icoitem {
  flex: 1;
  height: 4rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // background-color: red;
}
.icotop {
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
  }
}
.icotext {
  font-size: 0.6rem;
  padding-top: 0.2rem;
}
.observer {
  width: 100%;
  padding: 0.8rem 0.8rem 0.8rem 0.95rem;
  box-sizing: border-box;
}
.obtop {
  width: 100%;
  display: flex;
  margin-bottom: 0.8rem;
  div:nth-child(1) {
    font-size: 0.75rem;
    width: 50%;
  }
  div:nth-child(2) {
    font-size: 0.7rem;
    color: #8e8e93;
    width: 50%;
    text-align: right;
  }
}
.obitem {
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  margin-bottom: 1rem;
}

.obitemtop {
  display: flex;
  .obname {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }
}
.obico {
  margin-right: 0.5rem;
  img {
    width: 2rem;
    height: 2rem;
  }
}

.obnametop {
  width: 100%;
  display: flex;
  .obnick {
    width: 50%;
    color: #f54133;
    font-size: 0.75rem;
  }
  .oborg {
    width: 50%;
    text-align: right;
    color: #8e8e93;
    font-size: 0.6rem;
  }
}
.obnameday {
  width: 100%;
  color: #8e8e93;
  font-size: 0.6rem;
}
.obitembottom {
  margin-bottom: 0.8rem;
}
.sure {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;

  align-items: center;
  justify-content: center;
  box-shadow: 0 -0.025rem 0.05rem rgba(0, 0, 0, 0.16);
  background: #fff;
}
.btnss {
  display: flex;
  img {
    width: 1rem;
    height: 1rem;
  }
}
.zhanwei {
  width: 100%;
  height: 2rem;
}
</style>