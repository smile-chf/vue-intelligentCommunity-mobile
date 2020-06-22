<template>
  <div class="sponsormeeting">
    <van-form @submit="onSubmit">
      <!-- 分类 -->
      <div class="somepadding">
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
      <div class="somepadding">
        <!-- 会议日期 -->
        <van-field
          v-validate="'required'"
          readonly
          clickable
          name="datetimePicker"
          v-model="transmitdata.conferenceDate"
          label="会议日期"
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
          label="会议地点"
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
          label="参会率"
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
          label="议题"
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
        <!-- <van-field name="uploaderimg" label="图片上传">
        <template #input>-->
        <div class="stylebgc">
          <van-uploader
            v-model="formsomedata.uploaderimgurl"
            :after-read="afterRead"
            :max-count="1"
          />
        </div>
        <!-- </template>
        </van-field>-->
      </div>

      <!-- 会议要求 -->
      <div class="somepadding">
        <van-field
          name="demand"
          label="会议要求"
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
            </div>-->

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
        <!-- <van-popup v-model="showconferee" position="bottom"> -->
        <!-- <van-picker
            show-toolbar
            :columns="columnsconferee"
            @confirm="onConfirmconferee"
            @cancel="showconferee = false"
        />-->
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

        <!-- </van-popup> -->
        <!-- 记录人 -->
        <van-field
          :readonly="true"
          v-validate="'required'"
          clickable
          name="notekeeper"
          v-model="formsomedata.notekeeperdata"
          label="记录人"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="shownotekeeper = true"
          required
          :error-message="errors.first('notekeeper')"
        />
        <!-- <van-popup v-model="shownotekeeper" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsnotekeeper"
            @confirm="onConfirmnotekeeper"
            @cancel="shownotekeeper = false"
          />
        </van-popup>-->
        <van-popup v-model="shownotekeeper" position="bottom" :style="{ height: '60%' }">
          <div class="bigxdthtk">
            <div class="xdthtk">
              <div class="quxiao" @click="shownotekeeper=false">取消</div>
              <div class="hytitle">记录人</div>
              <div class="hybc">
                <div class="btnbcright" @click="servejlrdata">保存</div>
              </div>
            </div>

            <div class="bigbtnbc">
              <van-checkbox v-model="alljlr" checked-color="#F54133" @change="checkjlrqx">全选</van-checkbox>
              <div class="testtwo">已选择{{mannumjlr}}人</div>
            </div>

            <van-checkbox-group
              v-model="resultjlr"
              ref="checkboxGroupjlr"
              checked-color="#F54133"
              @change="checkjlr"
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
          label="会议签到"
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

      <div class="somepadding">
        <van-field name="switch" label="提交心得体会" input-align="right">
          <template #input>
            <van-switch v-model="formsomedata.submitfeeldata" size="20" />
          </template>
        </van-field>
        <!-- <van-field
          :readonly="true"
          clickable
          name="submitfeel"
          v-model="formsomedata.submitfeeldata"
          label="提交心得体会"
          placeholder="请选择 >"
          input-align="right"
          error-message-align="right"
          @click="showsubmitfeel = true"
        />
        <van-popup v-model="showsubmitfeel" position="bottom">
          <van-picker
            show-toolbar
            :columns="columnssubmitfeel"
            @confirm="onConfirmsubmitfeel"
            @cancel="showsubmitfeel = false"
          />
        </van-popup>-->
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
  // conferenceTypes,
  getAllTypeList,
  commonsFileUpload,
  lunchConference,
  conference,
  updateConference
  // commonsMultiFileUpload
} from "../../api/http.js";
export default {
  data() {
    return {
      mannum: 0,
      mannumchr: 0,
      mannumjlr: 0,
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
        noteTakerIds: [],
        topicPic: ""
      },
      formsomedata: {
        uploaderimgurl: [],
        comperedata: "",
        confereedata: "",
        notekeeperdata: "",
        submitfeeldata:false,
      },
      times: "",
      showtiens: false,
      typedata: "",
      columns: ["支部委员会", "党员活动日", "组织生活会", "党课"],
      showPicker: false,
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
      // uploaderimgurl:[{}],
      showcompere: false,
      // columnscompere: ["主持人1", "主持人2"],
      showconferee: false,
      // columnsconferee: ["参会人1", "参会人2"],
      shownotekeeper: false,
      // columnsnotekeeper: ["记录人1", "记录人2"],
      showsignin: false,
      columnssignin: [
        { text: "不签到", id: 0 },
        { text: "扫码签到", id: 1 },
        { text: "定位签到", id: 2 },
        { text: "电子签名", id: 3 },
        { text: "扫码签到、电子签名", id: 4 },
        { text: "定位签到、电子签名", id: 5 }
      ],
      showsubmitfeel: false,
      columnssubmitfeel: [
        { text: "否", isSubmitNote: "false" },
        { text: "是", isSubmitNote: "true" }
      ],
      showinput: 2
    };
  },
  methods: {
    //上传图片
    async afterRead(file) {
      let res = await commonsFileUpload(file.file);
      // console.log(res);
      this.transmitdata.topicPic = res.details.path;
      // console.log(file.file);
    },

    onConfirm(value) {
      this.formsomedata.typedata = value.text;
      this.transmitdata.type = value.text;
      // console.log(this.transmitdata.type);

      this.showPicker = false;
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
      // console.log(this.transmitdata.locationId);
      // console.log(this.transmitdata.location);

      this.showmettingsite = false;
    },
    onConfirmdepartment(value) {
      this.transmitdata.partyDepart = value.text;
      this.transmitdata.partyDepartId = value.id;
      this.formsomedata.departmentdata = value.text;

      this.showdepartment = false;
    },
    // onConfirmcompere(value) {
    //   this.formsomedata.comperedata.push(value.text);
    //   this.formsomedata.comperedata = [
    //     ...new Set(this.formsomedata.comperedata)
    //   ];
    //   this.transmitdata.hostIds.push(value.id);
    //   this.transmitdata.hostIds = [...new Set(this.transmitdata.hostIds)];
    //   // console.log(this.transmitdata.columnscompere);

    //   this.showcompere = false;
    // },
    // onConfirmconferee(value) {
    //   this.formsomedata.confereedata.push(value.text);
    //   this.formsomedata.confereedata = [
    //     ...new Set(this.formsomedata.confereedata)
    //   ];
    //   this.transmitdata.attendIds.push(value.id);
    //   this.transmitdata.attendIds = [...new Set(this.transmitdata.attendIds)];
    //   // console.log(this.transmitdata.columnsconferee);
    //   this.showconferee = false;
    // },
    // onConfirmnotekeeper(value) {
    //   this.formsomedata.notekeeperdata.push(value.text);
    //   this.formsomedata.notekeeperdata = [
    //     ...new Set(this.formsomedata.notekeeperdata)
    //   ];
    //   this.transmitdata.noteTakerIds.push(value.id);
    //   this.transmitdata.noteTakerIds = [
    //     ...new Set(this.transmitdata.noteTakerIds)
    //   ];
    //   // console.log(this.transmitdata.columnsnotekeeper);
    //   this.shownotekeeper = false;
    // },
    onConfirmsignin(value) {
      this.formsomedata.signindata = value.text;
      this.transmitdata.punchType = value.id;

      this.showsignin = false;
    },
    // onConfirmsubmitfeel(value) {
    //   this.formsomedata.submitfeeldata = value.text;
    //   this.transmitdata.isSubmitNote = value.isSubmitNote;
    //   this.showsubmitfeel = false;
    // },

    async onSubmit(values) {
  
      this.transmitdata.isSubmitNote = this.formsomedata.submitfeeldata
      console.log(this.transmitdata.isSubmitNote);
      // debugger
      if (
        this.$d("2020-2-20 " + this.transmitdata.endTime).valueOf() <
        this.$d("2020-2-20 " + this.transmitdata.beginTime).valueOf()
      ) {
        this.$toast("开始时间不能大于结束时间");
        return false;
      }

      let valid = await this.$validator.validate();
      if (!valid) {
        this.$toast.fail("必填项未填写");
        // let arr=[]
        // for (let index = 0; index < this.formsomedata.uploaderimgurl.length; index++) {
        // arr.push(this.formsomedata.uploaderimgurl[index].file);

        // }
        // console.log(arr);
        // this.formsomedata.uploaderimgurl
        // let abc =await commonsMultiFileUpload(arr)
        // console.log(abc);
      } else {
        this.transmitdata.hostIds = this.transmitdata.hostIds.toString();
        this.transmitdata.attendIds = this.transmitdata.attendIds.toString();
        this.transmitdata.noteTakerIds = this.transmitdata.noteTakerIds.toString();
        // console.log(this.transmitdata);
        if (this.id == "") {
          // let abc =await commonsMultiFileUpload(this.formsomedata.uploaderimgurl)
          // console.log(abc);

          //提交表单
          let res = await lunchConference(this.transmitdata);
          // console.log(res);
          if (res.code == 200) {
            this.$toast.success("提交成功");
            this.$router.push({ path: "/threemeeting" });
          }
          if (res.code == 500) {
            this.$toast.fail("服务器错误");
          }
          if (res.code == 302) {
            this.$toast.fail("登录失效，请重新登录");
            //  this.$router.push({path:"/login"})
          }
        } else {
          //修改表单
          delete this.transmitdata.createTime;
          delete this.transmitdata.updateTime;
          let res = await updateConference(this.id, this.transmitdata);
          if (res.code == 200) {
            this.$toast.success("修改成功");
            this.$router.push({ path: "/mymetting" });
          }
          if (res.code == 500) {
            this.$toast.fail("服务器错误");
          }
          if (res.code == 302) {
            this.$toast.fail("登录失效，请重新登录");
            //  this.$router.push({path:"/login"})
          }
        }
      }
    },

    setMyRule() {
      const dict = {
        custom: {
          theme: {
            required: "会议主题为必填项"
          },
          type: {
            required: "分类为必填项"
          },
          datetimePicker: {
            required: "会议日期为必填项"
          },
          begintime: {
            required: "开始时间为必填项"
          },
          endtime: {
            required: "结束时间为必填项"
          },
          mettingsite: {
            required: "会议地点为必填项"
          },
          department: {
            required: "所属组织为必填项"
          },
          issue: {
            required: "会议议题为必填项"
          },
          demand: {
            required: "会议要求为必填项"
          },
          compere: {
            required: "主持人为必填项"
          },
          conferee: {
            required: "参会人为必填项"
          },
          notekeeper: {
            required: "记录人为必填项"
          },
          signin: {
            required: "会议签到为必填项"
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

      // console.log(this.mettingsetlist);
    },
    //获取会议分类
    async getconferenceTypes() {
      let res = await getAllTypeList();
      console.log(res);
      this.columns = JSON.parse(
        JSON.stringify(res.details.data).replace(/title/g, "text")
      );
    },
    //查看详情回显
    async getconferenceasync() {
      if (this.id != "") {
        let res = await conference(this.id);
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
        this.formsomedata.typedata = res.details.conference.type;
        this.formsomedata.mettingsitedata = res.details.conference.location;
        this.formsomedata.departmentdata = res.details.conference.partyDepart;
        // this.formsomedata.comperedata = res.details.conference.hostIds;
        if (res.details.conference.hostIds) {
          this.formsomedata.comperedata = "已选择主持人点击查看";
          if (res.details.conference.hostIds.length == 1) {
            // this.result.push(
            //   parseInt(res.details.conference.hostIds.split("")[0])
            // );
            this.result = parseInt(res.details.conference.hostIds);
          } else {
            this.result = parseInt(res.details.conference.hostIds);
          }
          //  console.log(this.result);
        }
        // this.formsomedata.confereedata = res.details.conference.attendIds;
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
          // console.log(this.resultchr);
        }
        // this.formsomedata.notekeeperdata = res.details.conference.noteTakerIds;

        if (res.details.conference.noteTakerIds) {
          this.formsomedata.notekeeperdata = "已选择参会人点击查看";
          if (res.details.conference.noteTakerIds.length == 1) {
            this.resultjlr.push(
              parseInt(res.details.conference.noteTakerIds.split("")[0])
            );
          } else {
            let arr = res.details.conference.noteTakerIds.split(",");
            for (let index = 0; index < arr.length; index++) {
              this.resultjlr.push(parseInt(arr[index]));
            }
          }
          // console.log(this.resultchr);
        }
        this.$set(
          this.formsomedata.uploaderimgurl[0],
          "url",
          res.details.conference.topicPic
        );
        console.log(this.formsomedata.uploaderimgurl);

        // this.formsomedata.uploaderimgurl[0].url =
        //   res.details.conference.topicPic;
        if (res.details.conference.isSubmitNote=="true") {
          this.formsomedata.submitfeeldata = true;
        } else {
          this.formsomedata.submitfeeldata = false;
        }
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
      // console.log(val);
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
      // console.log(val);
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
    },
    checkjlr(val) {
      // console.log(val);
      this.transmitdata.noteTakerIds = val;
      this.mannumjlr = val.length;
    },
    servejlrdata() {
      if (this.transmitdata.noteTakerIds != "") {
        this.formsomedata.notekeeperdata = "已选择参会人点击查看";
      }
      this.shownotekeeper = false;
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
    // console.log(this.id);

    this.setMyRule();

    this.getdepartsFromOwnerKey();
    this.getmembersFromDepart();
    this.getlocationsFromUser();
    this.getconferenceTypes();
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
  margin-bottom: 10px;
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
    background: url("../../img/xmimg/ree1.png") no-repeat center;
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
  .van-checkbox {
    margin: 10px 0;
  }
  .van-radio {
    margin: 10px 0;
  }
  .van-switch--on {
    background-color: #f54133;
}
}
</style>