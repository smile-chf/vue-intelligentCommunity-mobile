<template>
  <div class="wrap">
    <div class="head">
      <p class="p1">{{datalist.title}}</p>
      <p class="p2">{{datalist.type}}</p>
    </div>
    <van-uploader class="Update" v-model="fileList" multiple />
    <div class="sure">
      <p @click="submit">上传照片</p>
    </div>
    <van-overlay :show="show">
      <van-loading type="spinner"  style="width:100%;height:100%" class="zzc" color="#f54133" />
    </van-overlay>
  </div>
</template>

<script>
import {
  getPartyPhotosDetail,
  commonsFileUpload,
  updatePartyPhotos
} from "../../api/http";
export default {
  name: "update_img",
  data() {
    return {
      pushurllist: [],
      show: false,
      datalist: {},
      imgurllist: [],
      type: "",
      id: "",
      fileList: [],
      oldurl: [],
      newurl: [],
      lasturl: []
    };
  },
  methods: {
    async submit() {
      if (this.type == 0) {
        this.show = true;
        console.log(this.fileList);
        this.imgurllist = [];
        // console.log(this.fileList);
        for (let index = 0; index < this.fileList.length; index++) {
          const element = this.fileList[index].file;
          let res = await commonsFileUpload(element);
          this.imgurllist.push(res.details.path);
        }
        let abc = await updatePartyPhotos(this.id, this.imgurllist.toString());
        if (abc.code == 200) {
          this.$toast.success({ message: "上传成功", duration: 100 });
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
        this.show = false;
      } else {
        this.show = true;
        // console.log(this.fileList);
        this.oldurl = [];
        this.newurl = [];
        for (let index = 0; index < this.fileList.length; index++) {
          const element = this.fileList[index];
          //   console.log(element.id==undefined);

          if (element.url == undefined) {
            this.newurl.push(element);
          } else {
            this.oldurl.push(element);
          }
        }
        this.lasturl = [];
        this.pushurllist = [];
        for (let a = 0; a < this.newurl.length; a++) {
          let ccc = await commonsFileUpload(this.newurl[a].file);
          this.lasturl.push(ccc.details.path);
        }
        for (let m = 0; m < this.oldurl.length; m++) {
          this.pushurllist.push(this.oldurl[m].url);
        }
        for (let n = 0; n < this.lasturl.length; n++) {
          this.pushurllist.push(this.lasturl[n]);
        }
        let abc = await updatePartyPhotos(this.id, this.pushurllist.toString());
        if (abc.code == 200) {
          this.$toast.success({ message: "上传成功", duration: 100 });
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

        this.show = false;
      }
    },
    async getPartyPhotosDetailvue(id) {
      let res = await getPartyPhotosDetail(id);
      this.datalist = res.details.detail;
      if (this.datalist.fileList != "") {
        this.fileList = this.datalist.fileList;
        this.fileList = JSON.parse(
          JSON.stringify(this.fileList).replace(/path/g, "url")
        );
      }
    },

    unique(arr) {
      return arr.filter(function(item, index, arr) {
        return arr.indexOf(item, 0) === index;
      });
    }
  },

  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.getPartyPhotosDetailvue(this.id);
  }
};
</script>

<style scoped>
.wrap {
  box-sizing: border-box;
  padding: 0.8rem 0.8rem 0 0.8rem;
}
.head {
  font-size: 0.75rem;
  color: #333333;
  width: 100%;
}
.head .p2 {
  width: 4rem;
  height: 0.95rem;
  background: rgba(245, 65, 51, 0.08);
  font-size: 0.65rem;
  color: #f54133;
  text-align: center;
  line-height: 0.95rem;
  margin-top: 0.2rem;
  margin-bottom: 1.2rem;
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
.zzc {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style lang="less">
  .somebtn {
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

.somebtn p {
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