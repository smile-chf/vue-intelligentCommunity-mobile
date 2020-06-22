<template>
  <div class="wrap">
    <div class="cut">
      <van-field
        disabled
        label="可见范围"
        v-model="memberIdsdata"
        input-align="right"
        placeholder="请选择 >"
        @click="choose_range"
      />
    </div>
    <div class="cut">
      <van-field
        disabled
        label="分类"
        v-model="type"
        input-align="right"
        placeholder="请选择 >"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          @confirm="onConfirm"
          @cancel="showPicker = false"
          :columns="type_choose"
        />
      </van-popup>
    </div>

    <div class="head">
      <textarea class="text" v-model="text" placeholder="请输入主题"></textarea>
      <van-uploader class="Update" v-model="fileList" multiple :max-count="100" />
    </div>

    <div class="sure">
      <p @click="submit">创建</p>
    </div>
    <van-overlay :show="show">
      <van-loading type="spinner" style="width:100%;height:100%" class="zzc" color="#f54133" />
    </van-overlay>
  </div>
</template>

<script>
import {
  commonsFileUpload,
  getPartyPhotosTypeList,
  membersGroupByDepartName,
  savePartyPhotos
} from "../../api/http";
export default {
  name: "create_photo",
  data() {
    return {
      show: false,
      memberIdsdata: "",
      typeid: "",
      imgurllist: [],
      id: "",
      showPicker: false,
      text: "",
      fileList: [],
      type: "",
      memberIds: "",
      type_choose: [
        { text: "按组织", id: 0 },
        { text: "按人员", id: 1 }
      ]
    };
  },
  created() {},
  methods: {
    async submit() {
      if (this.typeid == "" || this.text == "") {
        this.$toast.fail({ message: "主题或分类未填", duration: 1000 });
      } else {
        this.show = true;
        this.imgurllist = [];
        // console.log(this.fileList);
        for (let index = 0; index < this.fileList.length; index++) {
          const element = this.fileList[index].file;
          let res = await commonsFileUpload(element);
          this.imgurllist.push(res.details.path);
        }
        let abc = await savePartyPhotos(
          this.text,
          this.typeid,
          this.imgurllist.toString(),
          this.memberIds
        );
        if (abc.code == 200) {
          this.$toast.success({ message: "创建成功", duration: 1000 });
          setTimeout(() => {
              this.$router.push({ path: "/party_photo" });
          }, 1000);
        }
        if (abc.code == 500) {
          this.$notify("服务器错误");
        }
        if (abc.code == 302) {
          this.$notify("登录失效，请重新登录");
        }
      }

      this.show = false;
    },
    onConfirm(val) {
      this.type = val.text;
      this.typeid = val.id;
      // this.id= val.id;
      this.showPicker = false;
    },
    choose_range() {
      // if(this.title){
      //     window.localStorage.setItem('text', this.title);
      // }
      this.$router.push({
        path: "/checkphoto",
        query: {
          ids: this.ids
        }
      });
    },
    async getPartyPhotosTypeListvue() {
      let res = await getPartyPhotosTypeList();
      this.type_choose = JSON.parse(
        JSON.stringify(res.details.typeList).replace(/title/g, "text")
      );
    },
    async getmembersGroupByDepartName() {
      let res = await membersGroupByDepartName();
      this.memberIds = res.details.data;
    }
  },
  mounted() {
    this.getmembersGroupByDepartName();
    this.getPartyPhotosTypeListvue();
    this.ids = this.$route.query.ids;

    if (this.ids == undefined) {
    } else {
      this.ids = this.$route.query.ids.substr(
        0,
        this.$route.query.ids.length - 1
      );
    }
    //  console.log(this.ids);
    //    console.log(this.memberIds);

    setTimeout(() => {
      if (this.memberIds == this.ids || this.ids == undefined) {
        this.memberIdsdata = "全体党员 >";
      } else {
        this.memberIdsdata = "部分党员 >";
        this.memberIds = this.$route.query.ids.substr(
          0,
          this.$route.query.ids.length - 1
        );
      }
    }, 500);
  }
};
</script>

<style scoped>
.zzc {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrap {
  background: #f6f6f6;
  width: 100%;
  height: 100%;
}
.wrap .head {
  background: #ffffff;
  width: 100%;
}
.wrap .text {
  box-sizing: border-box;
  width: 100%;
  height: 6rem;
  border: none;
  padding: 0.6rem 0.8rem;
  font-size: 0.75rem;
  color: #8e8e93;
}
.wrap .text::-webkit-input-placeholder {
  color: #8e8e93;
  font-size: 0.75rem;
}
.Update {
  margin-top: 0.5rem;
  box-sizing: border-box;
  padding: 0 0.8rem;
}
.cut {
  margin-bottom: 0.5rem;
}
.sure {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -0.025rem 0.05rem rgba(0, 0, 0, 0.16);
  background: #fff;
}

.sure p {
  width: 91.5%;
  height: 2.2rem;
  background: #f54133;
  border-radius: 0.3rem;
  font-size: 0.85rem;
  color: #ffffff;
  line-height: 2.2rem;
  text-align: center;
}
</style>