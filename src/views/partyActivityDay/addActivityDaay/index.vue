<template>
  <div class="sponsormeeting">
    <van-overlay :show="showloding">
      <van-loading type="spinner" color="#f54133" style="top:50%;color:#f54133" :vertical="true">
        <div style="color:#f54133">拼命加载中...</div>
      </van-loading>
    </van-overlay>
    <van-form @submit="onSubmit">
      <div class="somepadding">
        <!-- 会议日期 -->
        <van-field
          v-validate="'required'"
          readonly
          clickable
          name="datetimePicker"
          v-model="transmitdata.conferenceDate"
          label="活动日期"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showtiens = true"
          required
          :error-message="errors.first('datetimePicker')"
        />
        <van-popup v-model="showtiens" position="bottom">
          <van-datetime-picker
            type="date"
            v-model="currentDate"
            @confirm="onConfirmtime"
            @cancel="showtiens = false"
          />
        </van-popup>
        <!-- 开始时间 -->
        <van-field
          v-validate="'required'"
          readonly
          clickable
          name="begintime"
          v-model="transmitdata.beginTime"
          label="开始时间"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showbegintime = true"
          required
          :error-message="errors.first('begintime')"
        />
        <van-popup v-model="showbegintime" position="bottom">
          <van-datetime-picker
            type="time"
            @confirm="onConfirmbegintime"
            @cancel="showbegintime = false"
          />
        </van-popup>

        <!-- 结束时间 -->
        <van-field
          v-validate="'required'"
          readonly
          clickable
          name="endtime"
          v-model="transmitdata.endTime"
          label="结束时间"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showendtime = true"
          required
          :error-message="errors.first('endtime')"
        />
        <van-popup v-model="showendtime" position="bottom">
          <van-datetime-picker
            type="time"
            @confirm="onConfirmendtime"
            @cancel="showendtime = false"
          />
        </van-popup>
      </div>
      <!-- 会议地点 -->
      <div class="somepadding">
        <van-field
          :readonly="true"
          v-validate="'required'"
          clickable
          name="mettingsite"
          v-model="formsomedata.mettingsitedata"
          label="活动地点"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showmettingsite = true"
          required
          :error-message="errors.first('mettingsite')"
        />
        <van-popup v-model="showmettingsite" position="bottom">
          <van-picker
            show-toolbar
            :columns="mettingsetlist"
            @confirm="onConfirmmettingsite"
            @cancel="showmettingsite = false"
          />
        </van-popup>

        <!-- 会议地带你 -->

        <div v-if="showinput==0">
          <van-field
            v-model="transmitdata.location"
            name="rate"
            placeholder="请输入会议地址"
            input-align="left"
          />
        </div>
      </div>

      <!-- 所属组织 -->
      <div class="somepadding">
        <van-field
          :readonly="true"
          v-validate="'required'"
          clickable
          name="department"
          v-model="formsomedata.departmentdata"
          label="所属组织"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showdepartment = true"
          required
          :error-message="errors.first('department')"
        />
        <van-popup v-model="showdepartment" position="bottom">
          <van-picker
            show-toolbar
            :columns="departmentlist"
            @confirm="onConfirmdepartment"
            @cancel="showdepartment = false"
          />
        </van-popup>
      </div>

      <!-- 会议主题 -->
      <div class="somepadding">
        <van-field
          v-model="transmitdata.subject"
          name="theme"
          label="主题"
          placeholder="请输入"
          input-align="right"
          error-message-align="right"
          required
          :error-message="errors.first('theme')"
          v-validate="'required'"
        />
      </div>
      <!-- 参会率 -->
      <div class="somepadding">
        <van-field
          v-model="transmitdata.attendRate"
          name="rate"
          label="参与率"
          type="number"
          placeholder="请输入"
          input-align="right"
          error-message-align="right"
        />
      </div>

      <!-- 议题 -->
      <div class="somepadding">
        <van-field
          name="issue"
          label="详情"
          required
          :error-message="errors.first('issue')"
          v-validate="'required'"
          v-model="transmitdata.topic"
          error-message-align="right"
        >
          <template #input>
            <van-field
              v-model="transmitdata.topic"
              rows="1"
              type="textarea"
              placeholder="请输入"
              input-align="right"
              error-message-align="right"
            />
          </template>
        </van-field>

        <!-- 图片上传 -->

        <div class="stylebgc">
          <van-uploader
            v-model="formsomedata.uploaderimgurl"
            :after-read="afterRead"
            :max-count="3"
          />
        </div>
      </div>

      <!-- 会议要求 -->
      <div class="somepadding">
        <van-field
          name="demand"
          label="要求"
          required
          :error-message="errors.first('demand')"
          v-validate="'required'"
          v-model="transmitdata.require"
          error-message-align="right"
        >
          <template #input>
            <van-field
              v-model="transmitdata.require"
              rows="1"
              type="textarea"
              placeholder="请输入会议要求，如服饰，人数，携带物件等"
            />
          </template>
        </van-field>
      </div>

      <div class="somepadding">
        <!-- 主持人 -->
        <van-field
          :readonly="true"
          v-validate="'required'"
          clickable
          name="compere"
          v-model="formsomedata.comperedata"
          label="主持人"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showcompere = true"
          required
          :error-message="errors.first('compere')"
        />
        <van-popup v-model="showcompere" position="bottom" :style="{ height: '60%' }">
          <div class="bigxdthtk">
            <div class="xdthtk">
              <div class="quxiao" @click="showcompere=false">取消</div>
              <div class="hytitle">主持人</div>
              <div class="hybc">
                <div class="btnbcright" @click="servezcrdata">保存</div>
              </div>
            </div>

            <!-- <div class="bigbtnbc">
              <van-checkbox v-model="allzcr" checked-color="#F54133" @change="checkzcrqx">全选</van-checkbox>
              <div class="testtwo">已选择{{mannum}}人</div>
            </div> -->

            <van-radio-group
              v-model="result"
              ref="checkboxGroup"
              checked-color="#F54133"
              @change="checkzcr"
            >
              <van-radio :name="item.id" v-for="(item, index) in zcrdata" :key="index">
                <div class="setdisplay">
                  <div class="setimg"></div>
                  <div>{{item.name}}</div>
                </div>
              </van-radio>
            </van-radio-group>
          </div>
        </van-popup>

        <!-- 参会人 -->
        <van-field
          :readonly="true"
          v-validate="'required'"
          clickable
          name="conferee"
          v-model="formsomedata.confereedata"
          label="参会人"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showconferee = true"
          required
          :error-message="errors.first('conferee')"
        />
        <van-popup v-model="showconferee" position="bottom" :style="{ height: '60%' }">
          <div class="bigxdthtk">
            <div class="xdthtk">
              <div class="quxiao" @click="showconferee=false">取消</div>
              <div class="hytitle">参会人</div>
              <div class="hybc">
                <div class="btnbcright" @click="servechrdata">保存</div>
              </div>
            </div>
            <div class="bigbtnbc">
              <van-checkbox v-model="allchr" checked-color="#F54133" @change="checkchrqx">全选</van-checkbox>
              <div class="testtwo">已选择{{mannumchr}}人</div>
            </div>
            <van-checkbox-group
              v-model="resultchr"
              ref="checkboxGroupchr"
              checked-color="#F54133"
              @change="checkchr"
            >
              <van-checkbox :name="item.id" v-for="(item, index) in zcrdata" :key="index">
                <div class="setdisplay">
                  <div class="setimg"></div>
                  <div>{{item.name}}</div>
                </div>
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </van-popup>
      </div>
      <div class="somepadding">
        <!-- 会议签到 -->
        <van-field
          :readonly="true"
          v-validate="'required'"
          clickable
          name="signin"
          v-model="formsomedata.signindata"
          label="活动签到"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showsignin = true"
          required
          :error-message="errors.first('signin')"
        />
        <van-popup v-model="showsignin" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnssignin"
            @confirm="onConfirmsignin"
            @cancel="showsignin = false"
          />
        </van-popup>
      </div>

      <van-button round block color="#F54133" native-type="submit" class="btnbtm" v-if="id==''">提交</van-button>
      <van-button round block color="#F54133" native-type="submit" class="btnbtm" v-else>修改</van-button>
    </van-form>
  </div>
</template>

<script>
import {
  departsFromOwnerKey,
  membersFromDepart,
  locationsFromUser,
  commonsFileUpload,
  EventDaylunchConference,
  EventDayconference,
  EventDayupdateConference
} from "@/api/http.js";
export default {
  data() {
    return {
      showloding: false,
      mannum: 0,
      mannumchr: 0,

      zcrdata: [],
      chrdata: [],
      jlrdata: [],
      result: [],
      resultchr: [],
      resultjlr: [],
      allzcr: false,
      allchr: false,
      alljlr: false,
      id: "",
      // currentDate:this.$d(new Date()).format("YYYY-MM-DD"),
      currentDate: new Date(),
      transmitdata: {
        hostIds: [],
        attendIds: [],
        topicPic: []
      },
      formsomedata: {
        uploaderimgurl: [],
        comperedata: "",
        confereedata: ""
      },
      times: "",
      showtiens: false,
      begintime: "",
      showbegintime: false,
      endtime: "",
      showendtime: false,
      mettingsitedata: "",
      showmettingsite: false,
      mettingsetlist: ["地点1", "地点2"],
      departmentdata: "",
      showdepartment: false,
      departmentlist: [
        { text: "111", id: "0" },
        { text: "222", id: "2" }
      ],
      themedata: "",
      ratedata: "2222",
      issuedata: "111",
      showcompere: false,
      showconferee: false,
      shownotekeeper: false,
      showsignin: false,
      columnssignin: [
        { text: "不签到", id: 0 },
        { text: "扫码签到", id: 1 },
        { text: "定位签到", id: 2 },
        { text: "电子签名", id: 3 },
        { text: "扫码签到、电子签名", id: 4 },
        { text: "定位签到、电子签名", id: 5 }
      ],
      showinput: 2
    };
  },
  methods: {
    //上传图片
    async afterRead(file) {
      // let res = await commonsFileUpload(file.file);
      // this.transmitdata.topicPic = res.details.path;
    },
    onConfirmtime(time) {
      this.transmitdata.conferenceDate = this.$d(time).format("YYYY-MM-DD");
      this.showtiens = false;
    },
    onConfirmbegintime(time) {
      this.transmitdata.beginTime = time;
      this.showbegintime = false;
    },
    onConfirmendtime(time) {
      this.transmitdata.endTime = time;
      this.showendtime = false;
    },
    onConfirmmettingsite(value) {
      this.formsomedata.mettingsitedata = value.text;
      if (value.id != 0) {
        this.showinput = value.id;
        this.transmitdata.locationId = value.id;
      } else {
        this.showinput = value.id;
        this.transmitdata.locationId = "";
      }
      this.showmettingsite = false;
    },
    onConfirmdepartment(value) {
      this.transmitdata.partyDepart = value.text;
      this.transmitdata.partyDepartId = value.id;
      this.formsomedata.departmentdata = value.text;

      this.showdepartment = false;
    },
    onConfirmsignin(value) {
      this.formsomedata.signindata = value.text;
      this.transmitdata.punchType = value.id;

      this.showsignin = false;
    },

    async onSubmit(values) {

    if (
        this.$d("2020-2-20 "+this.transmitdata.endTime).valueOf() <
        this.$d("2020-2-20 "+this.transmitdata.beginTime).valueOf()
      ) {
        this.$toast("开始时间不能大于结束时间");
        return false;
      }

      let valid = await this.$validator.validate();

      if (!valid) {
        this.$toast.fail("必填项未填写");
      } else {
        this.showloding = true;
        this.transmitdata.hostIds = this.transmitdata.hostIds.toString();
        this.transmitdata.attendIds = this.transmitdata.attendIds.toString();
        if (this.id == "") {
          this.transmitdata.topicPic = [];
          // console.log(this.formsomedata.uploaderimgurl);
          this.formsomedata.uploaderimgurl.forEach(async element => {
            let res = await commonsFileUpload(element.file);
            this.transmitdata.topicPic.push(res.details.path);
          });

          let ddd = setInterval(async () => {
            if (
              this.formsomedata.uploaderimgurl.length ==
              this.transmitdata.topicPic.length
            ) {
              clearInterval(ddd);
              //提交表单
              this.transmitdata.topicPic = JSON.stringify(
                this.transmitdata.topicPic
              );
              console.log(this.transmitdata);
              this.showloding = false;
              let res = await EventDaylunchConference(this.transmitdata);
              if (res.code == 200) {
                this.$toast.success("提交成功");
                this.$router.push({ path: "/partyActivityDay" });
              }
              if (res.code == 500) {
                this.$toast.fail("服务器错误");
              }
              if (res.code == 302) {
                this.$toast.fail("登录失效，请重新登录");
              }
            }
          }, 100);
        } else {
          // console.log(this.formsomedata.uploaderimgurl);
          // console.log(this.transmitdata.topicPic);
          this.transmitdata.topicPic = [];
          this.formsomedata.uploaderimgurl.forEach(async element => {
            if (element.url == null || element.url == undefined) {
              let res = await commonsFileUpload(element.file);
              this.transmitdata.topicPic.push(res.details.path);
            } else {
              this.transmitdata.topicPic.push(element.url);
            }
          });
          let sometimeds = setInterval(async () => {
            if (
              this.formsomedata.uploaderimgurl.length ==
              this.transmitdata.topicPic.length
            ) {
              clearInterval(sometimeds);
              console.log(this.transmitdata.topicPic);
              delete this.transmitdata.createTime;
              delete this.transmitdata.updateTime;
              this.transmitdata.topicPic = JSON.stringify(
                this.transmitdata.topicPic
              );
              let res = await EventDayupdateConference(this.id, this.transmitdata);
              if (res.code == 200) {
                this.$toast.success("修改成功");
                this.$router.push({ path: "/myActivityDay" });
              }
              if (res.code == 500) {
                this.$toast.fail("服务器错误");
              }
              if (res.code == 302) {
                this.$toast.fail("登录失效，请重新登录");
              }

              this.showloding = false;
            }
          }, 100);
          // });
          //修改表单
        }
      }
    },

    setMyRule() {
      const dict = {
        custom: {
          theme: {
            required: "活动主题为必填项"
          },
          datetimePicker: {
            required: "活动日期为必填项"
          },
          begintime: {
            required: "开始时间为必填项"
          },
          endtime: {
            required: "结束时间为必填项"
          },
          mettingsite: {
            required: "活动地点为必填项"
          },
          department: {
            required: "所属组织为必填项"
          },
          issue: {
            required: "活动详情为必填项"
          },
          demand: {
            required: "活动要求为必填项"
          },
          compere: {
            required: "主持人为必填项"
          },
          conferee: {
            required: "参会人为必填项"
          },
          signin: {
            required: "活动签到为必填项"
          }
        }
      };
      this.$validator.localize("zh_CN", dict);
    },
    //获取组织
    async getdepartsFromOwnerKey() {
      let res = await departsFromOwnerKey();
      this.departmentlist = JSON.parse(
        JSON.stringify(res.details.list).replace(/name/g, "text")
      );
    },
    //获取组织中的人员
    async getmembersFromDepart() {
      let res = await membersFromDepart();
      this.zcrdata = res.details.list;
      this.columnscompere = JSON.parse(
        JSON.stringify(res.details.list).replace(/name/g, "text")
      );
      this.columnsconferee = JSON.parse(
        JSON.stringify(res.details.list).replace(/name/g, "text")
      );
      this.columnsnotekeeper = JSON.parse(
        JSON.stringify(res.details.list).replace(/name/g, "text")
      );
    },

    //获取会议地点
    async getlocationsFromUser() {
      let res = await locationsFromUser();
      let data = { text: "其他", id: "0" };
      this.mettingsetlist = JSON.parse(
        JSON.stringify(res.details.list).replace(/name/g, "text")
      );
      this.mettingsetlist.push(data);
    },
    //查看详情回显
    async getconferenceasync() {
     
      if (this.id != "") {
        let res = await EventDayconference(this.id);
        // console.log(res);

        this.transmitdata = res.details.conference;
        //  this.formsomedata.signindata = this.transmitdata.punchType
        if (this.transmitdata.punchType == 0) {
          this.formsomedata.signindata = "不签到";
        }
        if (this.transmitdata.punchType == 1) {
          this.formsomedata.signindata = "扫码签到";
        }
        if (this.transmitdata.punchType == 2) {
          this.formsomedata.signindata = "定位签到";
        }
        if (this.transmitdata.punchType == 3) {
          this.formsomedata.signindata = "电子签名";
        }
        if (this.transmitdata.punchType == 4) {
          this.formsomedata.signindata = "扫码签到、电子签名";
        }
        if (this.transmitdata.punchType == 5) {
          this.formsomedata.signindata = "定位签到、电子签名";
        }

        this.transmitdata.conferenceDate = this.transmitdata.conferenceDate.split(
          " "
        )[0];
        this.formsomedata.mettingsitedata = res.details.conference.location;
        this.formsomedata.departmentdata = res.details.conference.partyDepart;
        if (res.details.conference.hostIds) {
          this.formsomedata.comperedata = "已选择主持人点击查看";
          if (res.details.conference.hostIds.length == 1) {
            
              
            // this.result.push(
            //   parseInt(res.details.conference.hostIds.split("")[0])
            // );
           
          console.log(res.details.conference.hostIds);
          
            // setTimeout(() => {
               this.result= parseInt(res.details.conference.hostIds)
            // }, 1000);
           
          } else {
            this.result = parseInt(res.details.conference.hostIds);
            console.log(res.details.conference.hostIds);
            
          }
        }
        if (res.details.conference.attendIds) {
          this.formsomedata.confereedata = "已选择参会人点击查看";
          if (res.details.conference.attendIds.length == 1) {
            this.resultchr.push(
              parseInt(res.details.conference.attendIds.split("")[0])
            );
          } else {
            let arr = res.details.conference.attendIds.split(",");
            for (let index = 0; index < arr.length; index++) {
              this.resultchr.push(parseInt(arr[index]));
            }
          }
        }
        // this.$set(
        //   this.formsomedata.uploaderimgurl[0],
        //   "url",
        //   res.details.conference.topicPic
        // );
        this.formsomedata.uploaderimgurl = [];
        JSON.parse(res.details.conference.topicPic).forEach(element => {
          this.formsomedata.uploaderimgurl.push({ url: element });
        });
        console.log(this.formsomedata.uploaderimgurl);
      }
    },
    // 主持人全选
    checkzcrqx() {
      if (this.allzcr) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    checkzcr(val) {
      this.transmitdata.hostIds = val;
      this.mannum = val.length;
    },
    servezcrdata() {
      if (this.transmitdata.hostIds != "") {
        this.formsomedata.comperedata = "已选择主持人点击查看";
      }
      this.showcompere = false;
    },
    // 参会人全选
    checkchrqx() {
      if (this.allchr) {
        this.$refs.checkboxGroupchr.toggleAll(true);
      } else {
        this.$refs.checkboxGroupchr.toggleAll();
      }
    },
    checkchr(val) {
      this.transmitdata.attendIds = val;
      this.mannumchr = val.length;
    },
    servechrdata() {
      if (this.transmitdata.attendIds != "") {
        this.formsomedata.confereedata = "已选择参会人点击查看";
      }
      this.showconferee = false;
    },
    //记录人全选
    checkjlrqx() {
      if (this.alljlr) {
        this.$refs.checkboxGroupjlr.toggleAll(true);
      } else {
        this.$refs.checkboxGroupjlr.toggleAll();
      }
    }
  },
  mounted() {
    if (this.$route.query.id != undefined) {
      this.id = this.$route.query.id;
    }
    // console.log(this.id+"id");

    if (this.id) {
      this.formsomedata.uploaderimgurl = [{}];
    } else {
      this.formsomedata.uploaderimgurl = [];
    }

    this.setMyRule();

    this.getdepartsFromOwnerKey();
    this.getmembersFromDepart();
    this.getlocationsFromUser();
    this.getconferenceasync();
  }
};
</script>

<style lang="less" scoped>
.mb {
  margin-bottom: 50px;
}
.sponsormeeting {
  background-color: #f6f6f6;
}
.btnbtm {
  bottom: 0;
}
.somepadding {
  margin-bottom: 8px;
}
.stylebgc {
  background-color: #ffffff;
  box-sizing: border-box;
  padding-left: 16px;
}

.bigxdthtk {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.xdthtk {
  display: flex;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  line-height: 50px;
  border-bottom: 1px solid #f6f6f6;
  text-align: center;
  font-size: 16px;
  .quxiao {
    flex: 1;
    font-size: 14px;
    text-align: left;
  }
  .hytitle {
    flex: 1;
  }
  .hybc {
    flex: 1;
    text-align: right;
    display: flex;
    align-items: center;
    .btnbcright {
      font-size: 14px;
      width: 44px;
      height: 30px;
      background-color: #f54133;
      line-height: 30px;
      color: #ffffff;
      text-align: center;
      margin-left: auto;
    }
  }
}
.bigbtnbc {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  // .btnbc {
  //   width: 60%;
  //   background-color: #f54133;
  //   color: #ffffff;
  //   height: 30px;
  //   border-radius: 30px;
  //   text-align: center;
  //   line-height: 30px;
  // }
  div {
    width: 50%;
  }
  .testtwo {
    line-height: 40px;
    text-align: right;
    color: #8e8e93;
  }
}

.setdisplay {
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-bottom: 10px;
  .setimg {
    width: 25px;
    height: 25px;
    background: url("../../../img/xmimg/ree1.png") no-repeat center ;
    background-size: cover;
    margin: 0 20px;
  }
}
</style>

<style  lang="less">
.sponsormeeting {
  .van-field--min-height {
    padding: 0;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    color: #f54133;
  }
   .van-checkbox{
    margin:  10px 0;
  }
   .van-radio{
    margin:  10px 0;
  }
}
</style>