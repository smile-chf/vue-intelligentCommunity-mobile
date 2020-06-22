<template>
  <div class="summary">
    <div class="top">
      <div class="textcolor">主题</div>
      <div>{{datalist.subject}}</div>
    </div>
    <div class="bgcstylecolor"></div>
    <div class="center">
      <div class="textcolor" style="color:#333333">记录主题</div>
      <van-field v-model="senddata.subject" type="textarea" rows="4" placeholder="请输入" />
    </div>
    <div class="bgcstylecolor"></div>
    <div class="botton">
      <div style="margin:0 0 6px 0">记录内容</div>

      <van-field v-model="senddata.content" type="textarea" rows="4" placeholder="请输入" />
      <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
    </div>

    <!-- 选择汇报人 -->
<div class="manstyle">
  <van-field
  
  readonly
  clickable
  name="picker"
  :value="manhuibaodata"
  label="汇报给"
  input-align="right"
  placeholder="请选择 >"
  @click="showPicker = true"
/>
</div>
    

<van-popup v-model="showPicker" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="clear"
  />
</van-popup>


 
    <div class="btnclick">
      <van-button color="#F54133" size="large" @click="gonext">提交</van-button>
    </div>
  </div>
</template>

<script>
import {
  conference,
  commonsFileUpload,membersFromDepart,uploadConferenceSummary
} from "../../api/http"
export default {
  data() {
    return {
      senddata:{
        subject:"",
         content:"",
         imgPath:"",
         cc:[]
      },
      datalist:{},
      id:"",
      hyjl: "",
      jlnr: "",
      fileList: [],
        manhuibaodata: [],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
    };
  },
  methods: {
   clear(){
     this.manhuibaodata=[ ]
     this. this.senddata.cc=""
      this.showPicker=false
     console.log("取消");
     
   },

   async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let res =await commonsFileUpload(file.file)
       this.senddata.imgPath=res.details.path
    },

     onConfirm(value) {
      
     this.manhuibaodata.push(value.text);
      this.manhuibaodata = [
        ...new Set(this.manhuibaodata)
      ];
       this.senddata.cc.push(value.id)
      
       this.senddata.cc = [...new Set(this.senddata.cc)];
      this.showPicker = false;
    },

  async  gonext(){
        
           console.log(this.senddata);
           
         this.senddata.cc= this.senddata.cc.toString()
     let res =await  uploadConferenceSummary(this.id,this.senddata)
       if (res.code == 200) {
          this.getconference()
          this.$toast.success({message:"提交成功",duration: 500 });
          setTimeout(() => {
            this.$router.push({ path: '/detailedmetting',query:{id:this.id}})
          }, 2000);

        }if(res.code == 500){
           this.$notify('服务器错误')
        }if (res.code==302) {
          this.$notify('登录失效，请重新登录')
        }

        

        
    },
   async getconference(){
       let res = await conference(this.id)
       this.datalist=res.details.conference
       
    },
    async getmembersFromDepart(){
    let res =await membersFromDepart() 
    this.columns = JSON.parse(
        JSON.stringify(res.details.list).replace(/name/g, "text")
      );

    }
  },
  mounted() {
   this.id= this.$route.query.id
   this.getconference()
   this.getmembersFromDepart()
  },
};
</script>

<style lang="less" scoped>
.summary {
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  font-size: 14px;
}

.bgcstylecolor {
  width: 100%;
  height: 10px;
  background-color: #f6f6f6;
}
.top {
  width: 100%;
  height: 12.7vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.center {
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  padding: 16px 16px;
  box-sizing: border-box;
}
.botton {
  width: 100%;
  height: 38.9vh;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 16px;
}
.btnclick {
  position: fixed;
  bottom: 2.2%;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.textcolor {
  width: 100%;
  font-size: 14px;
  color: #8e8e93;
  margin-bottom: 6px;
}
.imgdiv {
  width: 100%;
  height: 60%;
  //    background-color: red;
  margin-top: 16px;
  box-sizing: border-box;
  display: flex;
}
.imgurldiv {
  border: 1px solid red;
  height: 100%;
  width: 28%;
  margin-right: 20px;
}
.manstyle{
    margin-top: 10px;
    width: 100%;
    padding: 16px 16px;
    box-sizing: border-box;
    background-color: #ffffff;
}
</style>

<style lang="less">
.summary {
  .van-cell {
    padding: 0;
  }
}
</style>