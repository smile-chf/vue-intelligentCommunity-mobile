<template>
  <div class="oppenissue">
    <van-form @submit="onSubmit">
           <div class="">
        <van-field
          :readonly="true"
          clickable
          v-model="formsomedata.okjian"
          label="可见范围"
          placeholder="全体党员 >"
          input-align="right"
          error-message-align="right"
          @click="gockeckpage"
        />
      </div>
      <van-cell-group>
        <van-field
          v-validate="'required'"
          name="title"
          required
          :error-message="errors.first('title')"
          v-model="title"
          placeholder="请输入标题"
        />
        <van-field
          v-validate="'required'"
          name="content"
          required
          :error-message="errors.first('content')"
          v-model="content"
          rows="5"
          type="textarea"
          placeholder="请输入内容"
          :border="false"
        ></van-field>
        <van-uploader style="margin-left:16px" v-model="imgurl" multiple :max-count="3" />
      </van-cell-group>
      <div class="line"></div>
      <!-- 选择器分类-->
      <div class="stylepad">
        <van-field
          :readonly="true"
          v-validate="'required'"
          clickable
          name="type"
          v-model="formsomedata.typedata"
          label="分类"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showPicker = true"
          required
          :error-message="errors.first('type')"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>
 
      <div class="stylepad">
        <van-field name="switch" label="允许成员评论" width="10px" input-align="right">
          <template #input>
            <van-switch v-model="formsomedata.switchChecked" size="20" />
          </template>
        </van-field>
      </div>
     
      <van-button  round block color="#F54133" native-type="submit" class="btnbtm">提交 </van-button>
       
    </van-form>
    <van-overlay :show="show" >
      <van-loading type="spinner" style="width:100%;height:100%" class="zzc" color="#f54133" />
    </van-overlay>
  </div>
</template>
<script>
import {
  membersGroupByDepartName,
  getPartyWorkTypeList,
  commonsFileUpload,
  savePartyWork
} from "../../../api/http";
export default {
  data() {
    return {
      show:false,
      allpartyid: "",
      ids: "",
      title: "",
      content: "",
      formsomedata: {
        okjian: "全体党员 >",
        switchChecked: false
      },
      showPicker: false,
      columns: ["支部委员会", "党员活动日", "组织生活会", "党课"],
      type: "",
      memberIds: "",
      imgurl: [],
      upimgurl: [],
      switchChecked: "0"
    };
  },
  methods: {
    onConfirm(value) {
      // console.log(value.id);
      this.formsomedata.typedata = value.text;
      this.type = value.id;
      this.showPicker = false;
    },
    setMyRule() {
      const dict = {
        custom: {
          type: {
            required: "分类为必填项"
          },
          title: {
            required: "标题为必填项"
          },
          content: {
            required: "内容为必填项"
          }
        }
      };
      this.$validator.localize("zh_CN", dict);
    },
    async onSubmit() {
      this.show=true
      let valid = await this.$validator.validate();
      if (!valid) {
        this.$toast.fail("必填项未填写");
        this.show=false
      } else {
        this.upimgurl = [];
        for (let index = 0; index < this.imgurl.length; index++) {
          const element = this.imgurl[index].file;
          let res = await commonsFileUpload(element);
          this.upimgurl.push(res.details.path);
        }
         if (this.formsomedata.switchChecked) {
        this.switchChecked = "1";
      } else {
        this.switchCheckedt = "0";
      }
      let abc = await savePartyWork({
        title: this.title,
        content: this.content,
        type: this.type,
        isComment: this.switchChecked,
        filePath: this.upimgurl.toString(),
        memberIds: this.memberIds
      });

           if (abc.code == 200) {
             this.show=false
        this.$toast.success({ message: "提交成功", duration: 1000 });
        setTimeout(() => {
          this.$router.push({ path: "/partyoppen" });
        }, 1000);
      }
      if (abc.code == 500) {
        this.show=false
        this.$notify("服务器错误");
      }
      if (abc.code == 302) {
        this.show=false
        this.$notify("登录失效，请重新登录");
      }
  
      }

     

    },
    gockeckpage() {
      if (this.ids != "") {
        this.$router.push({ path: "/checkparty", query: { ids: this.ids } });
      } else {
        this.$router.push({ path: "/checkparty" });
      }
    },
    async getmembersGroupByDepartName() {
      let res = await membersGroupByDepartName();
      this.memberIds = res.details.data;
    },
    async getPartyWorkTypeListvue() {
      let res = await getPartyWorkTypeList();
      this.columns = JSON.parse(
        JSON.stringify(res.details.typeList).replace(/title/g, "text")
      );
      // console.log(this.columns);
    }
  },
  mounted() {
    // if (this.$route.query.start == 1) {
    //   let obj = JSON.parse(localStorage.getItem("obj"));
    //   //  console.log(obj);
    //   //  this.title=obj.title
    //   //  this.content=obj.content,
    //   //  this.upimgurl=obj.filePath
    //   (this.title = obj.title);
    //     (this.content = obj.content);
    //     (this.type = obj.type);
    //     (this.switchChecked = obj.isComment);
    //     (this.upimgurl = obj.filePath);
    //     (this.memberIds = obj.memberIds);
    //   this.imgurl = obj.imgurl;
    //   this.formsomedata.typedata=obj.typedata
    //   this.formsomedata.okjian=obj.okjian;
    //   this.formsomedata.switchChecked=obj.switchChecked
    //   this.upimgurl=upobj.imgurl

    // }
    this.setMyRule();

    this.ids = this.$route.query.ids;
    // console.log(this.ids);
    if (this.ids == undefined) {
    } else {
      this.ids = this.$route.query.ids.substr(
        0,
        this.$route.query.ids.length - 1
      );
    }

    this.getmembersGroupByDepartName();
    this.getPartyWorkTypeListvue();
    setTimeout(() => {
      if (this.memberIds == this.ids || this.ids == undefined) {
        this.formsomedata.okjian = "全体党员 >";
      } else {
        this.formsomedata.okjian = "部分党员 >";
        this.memberIds = this.$route.query.ids.substr(
          0,
          this.$route.query.ids.length - 1
        );
      }
      console.log(this.memberIds);
    }, 500);
  },
  // beforeDestroy() {
  //   let obj = {
  //     title: this.title,
  //     content: this.content,
  //     type: this.type,
  //     isComment: this.switchChecked,
  //     filePath: this.upimgurl,
  //     memberIds: this.memberIds,
  //     imgurl: this.imgurl,
  //      typedata:this.formsomedata.typedata,
  //    okjian:this.formsomedata.okjian,
  //    switchChecked:this.formsomedata.switchChecked,
  //    upimgurl:this.upimgurl
  //   };
  //   localStorage.setItem("obj", JSON.stringify(obj));
  // }
};
</script>

<style lang="less" scoped>
.line {
  width: 100%;
  height: 0.5rem;
  background-color: #f6f6f6;
}
.stylepad {
  padding: 0 0.8rem;
}
.btnbtm {
  position: fixed;
  bottom: 0;
}
.zzc{
 display: flex;
 align-items: center;
 justify-content: center;
}
</style>
<style lang="less">
.oppenissue {
  .van-switch--on {
    background-color: #f54133;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    color: #f54133;
  }
}
</style>