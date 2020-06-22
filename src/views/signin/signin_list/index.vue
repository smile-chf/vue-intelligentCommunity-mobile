<template>
    <div>
        <div class="itemstyle"> 已签到人员 ({{yd}})</div>
        <div class="unit" v-for="(item, index) in data.signInList"  @click="gomap(item.coordinate)">
            <div class="left">
                <img src="@/img/party_alliance/default_head.png" alt="">
                <p>{{item.name}}</p>
            </div>
            <p class="right">
               {{item.departName}}
            </p>
        </div>
        <div class="itemstyle"> 未签到人员 ({{wd}})</div>
        <div class="unit" v-for="(item, index) in data.notSignInList " >
             <div class="left">
                <img src="@/img/party_alliance/default_head.png" alt="">
                <p>{{item.name}}</p>
            </div>
            <p class="right">
               {{item.departName}}
            </p>
        </div>
        <div class="itemstyle"> 请假人员 ({{qj}})</div>
        <div class="unit" v-for="(item, index) in data.lateList" >
            <div class="left">
                <img src="@/img/party_alliance/default_head.png" alt="">
                <p>{{item.name}}</p>
            </div>
            <p class="right">
               {{item.departName}}
            </p>
        </div>
       
      
    </div>
</template>
<script>
     import {signInPersonList,EventDaysignInPersonList} from "../../../api/http.js"
    export default {
        data() {
            return {
                id:"",
                name:'张晓',
                data:{},
                yd:"",
                wd:"",
                qj:"",
                statetype:""
            };
        },

        methods: {
          gomap(val){
              console.log(val);
              if(val==undefined||val=="undefined,undefined"){
                   this.$notify("未获取到定位信息");
              }else{
                  this.$router.push({path:"/map",query:{location:val}})
              }
              
          }
        },
     async  mounted() {
         
         this.statetype=this.$route.query.statetype
          this.id=this.$route.query.id

          if (this.statetype==1) {
              console.log(1);
               let res  = await  signInPersonList(this.id)
            this.data=res.details.data
            this.qj=this.data.lateList.length
            this.wd=this.data.notSignInList.length
            this.yd=this.data.signInList.length
          } else {
              console.log(2);
              
               let res  = await  EventDaysignInPersonList(this.id)
            this.data=res.details.data
            this.qj=this.data.lateList.length
            this.wd=this.data.notSignInList.length
            this.yd=this.data.signInList.length
              
          }
         
        },
    }
</script>
<style scoped>
.unit{
    width: 100%;
    height: 3.2rem;
    box-sizing: border-box;
    padding: .6rem .8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #F6F6F6;
    font-size: .65rem;
}
.unit .left{
    display: flex;
    align-items: center;
}
.unit .left img{
    width: 2rem;
    height: 2rem;
    color: #333333;
    margin-right: .5rem;
}
.unit .right{
    color: #8E8E93;
}
</style>
<style lang="less" scoped>
.itemstyle{
    width: 100%;
    height: 2rem;
    background-color: #F6F6F6;
    line-height: 2rem;
    padding:0 1rem;
    box-sizing: border-box;
}
</style>
