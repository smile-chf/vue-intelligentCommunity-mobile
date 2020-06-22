<template>
  <div class="leave">
    <div class="bignav">
      <div class="navbar">
        <div
          :class="['submitok', actievstate ? 'activestyle': 'activetext']"
          @click="changestate(1)"
        >待审批</div>
        <div
          :class="['submitno', actievstate ?  'activetext':'activestyle']"
          @click="changestate(2)"
        >已审批</div>
      </div>
    </div>
    <!-- 待审批 -->
    <div class="body" v-if="actievstate">
      <div class="bodyitem" v-for="(item, index) in datalist" :key="index" @click="showtc(0,item.id)">
        <div class="itemtop">
          <div class="itemtime">{{item.subject}}</div>
        </div>
        <div class="itembottom"> {{item.conferenceDate.slice("0","7")}} &nbsp;&nbsp;{{item.beginTime}}~{{item.endTime}} </div>
      </div>
  
    </div>
    <!-- 已审批 -->
    <div class="body" v-if="!actievstate">
      <div class="bodyitem"  v-for="(item, index) in datalist" :key="index" @click="showtc(1,item.id)">
        <div class="itemtop">
          <div class="itemtime">{{item.subject}} </div>
          <div class="btncolor" v-if="item.askLeaveStatus==2">同意</div>
          <div class="btncolor1" v-if="item.askLeaveStatus==3">驳回</div>
        </div>
        <div class="itembottom">{{item.conferenceDate.slice("0","7")}} &nbsp;&nbsp;{{item.beginTime}}~{{item.endTime}}</div>
      </div>
    
    </div>

    <!-- 弹出层 -->
    <van-popup v-model="isshowtc" position="bottom" :style="{ height: '83%' }">
      <div class="tctop">
        <div @click="cleartc">取消</div>
        <div>请假详情</div>
        <div></div>
      </div>
      <div class="itemtext">
        <div>请假人</div>
        <div>{{somedata.member}}</div>
      </div>
      <div class="itemtexttwo">
        <div>请假理由</div>
        <div>{{somedata.reason}}</div>
      </div>
      <div class="linebgc"></div>
      <div class="itemtext">
        <div>审批人</div>
        <div></div>
      </div>
      <div class="spztstyle">
        <div>审批状态</div>
        <div>
          <div v-if="somedata.status==3">可以前往我的会议重新请假</div>
        </div>
        <div v-if="somedata.status==3">驳回</div>
        <div v-if="somedata.status==2" style="color:#000000">同意</div>
        <div v-if="somedata.status==1" style="color:#000000">待审批</div>
      </div>
      <div class="itemtexttwo">
        <div>回复内容</div>
        <div>{{somedata.reply}}</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { EventDayaskLeaves,EventDayaskLeavexq } from "@/api/http";
export default {
  data() {
    return { datalist: [], actievstate: true, isshowtc: false, spstart: "" ,somedata:{}};
  },
  methods: {
    changestate(val) {
      if (val == 1) {

        this.getaskLeaves(1)
        this.actievstate = true;
      }
      if (val == 2) {
        this.getaskLeaves(2)
        this.actievstate = false;
      }
    },
   async showtc(val,id) {
      this.spstart = val;
      this.isshowtc = true;
      // if(val==0){
        let res =await EventDayaskLeavexq(id)
        console.log(res);
        this.somedata=res.details.record
      // }if (val==1) {
      //   let res =await askLeavexq(id)
        
      // } 

      
      
    },
    cleartc() {
      this.isshowtc = false;
    },
    async getaskLeaves(val) {
      let res = await EventDayaskLeaves(val);
      this.datalist = res.details.list;
    }
  },
  mounted() {
    this.getaskLeaves(1);
  }
};
</script>
<style lang="less" scoped>
.body {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
}
.bodyitem {
  padding-top: 15px;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  border-bottom: 1px solid #f6f6f6;
}
.itemtop {
  display: flex;
  width: 100%;

  .itemtime {
    width: 100%;
    font-size: 14px;
         overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .btncolor {
    width: 50%;
    color: #5686d6;
    text-align: right;
  }
  .btncolor1 {
    width: 50%;
    color: #F54133;
    text-align: right;
  }
}
.itembottom {
  padding: 10px 0 0 0;
     color: #8e8e93;
}
.tctop {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f7f4f8;
  div:nth-child(1) {
    width: 14%;
    font-size: 14px;
  }
  div:nth-child(2) {
    flex: 1;
    text-align: center;
  }
  div:nth-child(3) {
    width: 14%;
    font-size: 14px;
  }
}
.itemtext {
  padding: 16px;
  display: flex;
  border-bottom: 1px solid #f7f4f8;
  div:nth-child(1) {
    color: #8e8e93;
    width: 20%;
  }
  div:nth-child(2) {
    text-align: right;
    width: 80%;
  }
}

.itemtexttwo {
  padding: 16px;
  border-bottom: 1px solid #f7f4f8;
  div:nth-child(1) {
    color: #8e8e93;
    margin-bottom: 14px;
  }
  div:nth-child(2) {
    width: 100%;
    height: 90px;
  }
}
.linebgc {
  width: 100%;
  height: 10px;
  background-color: #f7f4f8;
}
.spztstyle {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f7f4f8;
  div:nth-child(1) {
    color: #8e8e93;

    width: 25%;
  }
  div:nth-child(2) {
    width: 55%;
    margin-top: 2px;
    div {
      width: 100%;
      font-size: 14px;
      color: #f54133;
    }
  }
  div:nth-child(3) {
    width: 20%;
    color: #f54133;
    text-align: right;
  }
}

.bignav {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 0 20px 0;
}
.navbar {
  display: flex;
  width: 100%;
  height: 6.5vh;
  box-sizing: border-box;

  overflow: hidden;
  .submitok {
    width: 50%;
    text-align: center;
    line-height: 6.5vh;
    font-size: 14px;
  }
  .submitno {
    width: 50%;
    text-align: center;
    line-height: 6.5vh;
    font-size: 14px;
  }
}

.activestyle {
  color: #f54133;
  border-bottom: 2px #f54133 solid;
}
.activetext {
  color: #8e8e93;
  border-bottom: 1px #d4d3d3 solid;
}
</style>