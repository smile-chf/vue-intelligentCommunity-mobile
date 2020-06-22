<template>
  <div class="listbiaoge">
    <van-popup v-model="tcleft" position="top">
      <div class="tcitemlast" @click="checksomeapi(-1)">全部</div>
      <div
        class="tcitemlast"
        v-for="(item, index) in listliebiao"
        :key="index"
        @click="checksomeapi(item.id)"
      >{{item.title}}</div>
    </van-popup>
    <van-search
      v-model="searchvalue"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      input-align="center"
    >
      <template #left>
        <div class="icostyle" @click="xiala">
          <van-icon name="descending" />
        </div>
      </template>
    </van-search>
    <div class="switch">
      <p :class="isswitch?'':'active'" @click="change(0)">未建相册</p>
      <p :class="isswitch?'active':''" @click="change(1)">已建相册</p>
    </div>
    <div class="no_list" v-if="isswitch==0">
      <div
        class="one_unit"
        @click="goUpdateImg(0,item.id)"
        v-for="(item, index) in wjdata"
        :key="index"
      >
        <p class="one_p1">{{item.title}}</p>
        <p class="one_p2">{{item.type}}</p>
        <p class="one_p3">{{item.createDate}}</p>
      </div>
    </div>
    <div class="have_list" v-if="isswitch==1">
      <div
        class="two_unit"
        @click="goUpdateImg(1,item.id)"
        v-for="(item, index) in wjdata"
        :key="index"
      >
        <p class="two_p1">{{item.title}}</p>
        <p class="two_p2">{{item.type}}</p>
        <p class="two_p3">{{item.createDate}}</p>
        <div class="img_box" v-if="item.zhang==3">
          <div class="img_left">
            <img class="img1" :src="item.fileList[0]" alt />
          </div>
          <div class="img_right">
            <img class="img2" :src="item.fileList[0]" alt />
            <img class="img3" :src="item.fileList[1]" alt />
          </div>
        </div>

        <div class="imgstyle" v-if="item.zhang==2">
          <img :src="item.fileList[0]" alt />
          <img :src="item.fileList[1]" alt />
        </div>
        <div class="imgstyle" v-if="item.zhang==1">
          <img :src="item.fileList[0]" alt />
        </div>
      </div>
    </div>
    <div class="add" @click="add">
      <img src="@/img/party_alliance/add.png" alt />
    </div>
  </div>
</template>

<script>
import { getPartyPhotosList, getPartyPhotosTypeList,getMemberIsAdministrator } from "../../api/http";
export default {
  name: "list",
  data() {
    return {
      listliebiao: [],
      tcleft: false,
      wjdata: [],
      searchvalue: "",
      isswitch: 0,
      pdtupian: "",
      type: ""
    };
  },
  methods: {
    change(type) {
      if (type == 0) {
        this.isswitch = 0;
        this.getPartyPhotosListvue({
          title: this.searchvalue,
          status: this.isswitch,
          type: this.type
        });
      } else {
        this.isswitch = 1;
        this.getPartyPhotosListvue({
          title: this.searchvalue,
          status: this.isswitch,
          type: this.type
        });
      }
      console.log(this.isswitch);
    },
   async add() {
       let res = await getMemberIsAdministrator();
      let show = res.details.data;
      // this.$router.push("/sponsormeeting")
      if (show == "是") {
        this.$router.push("/create_photo");
      } else {
        this.$toast.fail({ message: "该用户无此权限", duration: 3000 });
      }

     
    },

    onSearch() {
      this.getPartyPhotosListvue({
        title: this.searchvalue,
        status: this.isswitch,
        type: this.type
      });
    },

    //上传相册图片
    goUpdateImg(type, id) {
      if (type == 0) {
        //上传
        this.$router.push({
          path: "/update_img",
          query: {
            id,
            type
          }
        });
      } else if (type == 1) {
        //修改
        this.$router.push({
          path: "/update_img",
          query: {
            id,
            type
          }
        });
      }
    },
    async getPartyPhotosListvue({ title, status, type }) {
      let res = await getPartyPhotosList({ title, status, type });
      this.wjdata = res.details.list;
      for (let index = 0; index < this.wjdata.length; index++) {
        this.wjdata[index].zhang = this.wjdata[index].fileList.length;
      }
    },
    xiala() {
      console.log(1111);
      this.tcleft = true;
    },
    checksomeapi(id) {
      if (id == -1) {
           this.getPartyPhotosListvue({
          title: this.searchvalue,
          status: this.isswitch,
          type: this.type
        });
        this.tcleft = false;
      } else {
            this.type = id;
        this.getPartyPhotosListvue({
          title: this.searchvalue,
          status: this.isswitch,
          type: this.type
        });
        this.tcleft = false;
      }
    }
  },
  async mounted() {
    this.getPartyPhotosListvue({ status: this.isswitch });

    let res = await getPartyPhotosTypeList();
    this.listliebiao = res.details.typeList;
  }
};
</script>

<style scoped >
.switch {
  width: 100%;
  height: 2rem;
  background: #fff;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
}

.switch p {
  width: 50%;
  height: 100%;
  text-align: center;
  line-height: 2rem;
  font-size: 0.75rem;
  color: #333333;
  position: relative;
}

.switch .active:after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.1rem;
  background: #f54133;
}

.no_list {
  width: 100%;
  /* height: 4.9rem; */
}

.no_list .one_unit {
  box-sizing: border-box;
  padding: 0 0.8rem;

  border-bottom: 1px solid #f6f6f6;
}

.no_list .one_unit .one_p1 {
  font-size: 0.75rem;
  color: #333333;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.8rem;
}

.no_list .one_unit .one_p2 {
  font-size: 0.65rem;
  color: #f54133;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
  overflow: hidden;
  width: 4rem;
  /* max-width: 8rem; */
  height: 0.95rem;
  background: rgba(245, 65, 51, 0.08);
  text-align: center;
  line-height: 0.95rem;
}

.no_list .one_unit .one_p3 {
  font-size: 0.65rem;
  color: #8e8e93;
  margin-bottom: 0.8rem;
}

.have_list {
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
}

.have_list .two_unit {
  box-sizing: border-box;
  padding: 0 0.8rem;
  width: 100%;
}

.have_list .two_unit .two_p1 {
  font-size: 0.75rem;
  color: #333333;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.8rem;
}

.have_list .two_unit .two_p2 {
  font-size: 0.65rem;
  color: #f54133;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
  width: 4rem;
  overflow: hidden;
  /* max-width: 6rem; */
  height: 0.95rem;
  background: rgba(245, 65, 51, 0.08);
  text-align: center;
  line-height: 0.95rem;
}

.have_list .two_unit .two_p3 {
  font-size: 0.65rem;
  color: #8e8e93;
}

.have_list .two_unit .img_box {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.8rem;
}

.have_list .two_unit img {
  width: 100%;
  height: 100%;
}

.have_list .two_unit .img_left {
  width: 58.67%;
  height: 7.75rem;
}

.have_list .two_unit .img_right {
  width: 39.47%;
  height: 3.75rem;
}

.add {
  width: 3.9rem;
  height: 3.9rem;
  position: fixed;
  bottom: 11%;
  right: 3%;
}

.add img {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less" scoped>
.tcitemlast {
  width: 100%;
  height: 2rem;
  font-size: 0.7rem;
  text-align: center;
  line-height: 2rem;
  border-bottom: 1px solid #f6f6f6;
}

.imgstyle {
  display: flex;
  margin: 0.5rem 0;
  img {
    width: 4rem !important;
    height: 4rem !important;
    margin-right: 1rem;
  }
}
.icostyle {
  width: 1rem;
  margin-right: 0.4rem;
  font-size: 1rem;
}
</style>


<style lang="less">
.listbiaoge {
  .van-popup--top {
    top: 2.3rem;
    left: 0;
    width: 100%;
  }
  .van-overlay {
    position: fixed;
    // top:2.3rem;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>