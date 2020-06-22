<template>
    <div class="register">
        <img src="@/img/xmimg/ree6.png" alt srcset class="pos"/>
        <div class="wlcom">您好！</div>
        <div class="todangjian">欢迎登录智慧党建平台</div>
        <div class="center">
            <div class="iteminput">
                <div class="textleft">
                    <img src="@/img/xmimg/ree1.png" alt srcset/>
                </div>
                <input type="text" v-model="data.username" placeholder="请输入姓名"/>
            </div>
            <div class="iteminput">
                <div class="textleft">
                    <img src="@/img/xmimg/ree.png" alt srcset/>
                </div>
                <input type="number" v-model="data.tel" placeholder="请输入手机号"/>
            </div>
            <div class="iteminput">
                <div class="textleft">
                    <img src="@/img/xmimg/ree2.png" alt srcset/>
                </div>
                <input type="text" v-model="data.idCard" placeholder="请输入身份证号"/>
            </div>
            <!-- <div class="iteminput">
              <div class="textleft">
                <img src="../../img/xmimg/ree4.png" alt srcset />
              </div>
              <input type="text" v-model="data.area" placeholder="请输入所属区域" />
            </div>-->

            <div class="iteminput">
                <div class="textleft">
                    <img src="../../img/xmimg/ree4.png" alt srcset/>
                </div>
                <!-- <input type="text" v-model="data.area" placeholder="请输入所属区域" />
                -->
                <select
                        class="selstyle"
                        ref="newText"
                        @change="getqu($refs.newText.options[$refs.newText.selectedIndex].text,$refs.newText.options[$refs.newText.selectedIndex].value)"
                >
                    <option value>请选择</option>
                    <option
                            :selected="item.isSelected"
                            :value="item.key"
                            v-for="(item, index) in dictionarylist"
                            :key="index"
                    >{{item.value}}
                    </option>
                </select>
            </div>
            <div class="iteminput">
                <div class="textleft">
                    <img src="../../img/xmimg/ree4.png" alt srcset/>
                </div>
                <!-- <input type="text" v-model="data.area" placeholder="请输入所属区域" />
                -->
                <select
                        class="selstyle"
                        ref="newText1"
                        @change="getqu1($refs.newText1.options[$refs.newText1.selectedIndex].text,$refs.newText1.options[$refs.newText1.selectedIndex].value)"
                >
                    <option value>请选择</option>
                    <option
                            :selected="item.isSelected"
                            :value="item.key"
                            v-for="(item, index) in dictionarylist1"
                            :key="index"
                    >{{item.value}}
                    </option>
                </select>
            </div>
            <div class="iteminput">
                <div class="textleft">
                    <img src="../../img/xmimg/ree4.png" alt srcset/>
                </div>
                <!-- <input type="text" v-model="data.area" placeholder="请输入所属区域" />
                -->
                <select
                        v-model="committeeVal"
                        class="selstyle"
                        ref="newText2"
                        @change="getqu2($refs.newText2.options[$refs.newText2.selectedIndex].text,$refs.newText2.options[$refs.newText2.selectedIndex].value)"
                >
                    <option value>请选择</option>
                    <option
                            :selected="item.isSelected"
                            :value="item.key"
                            v-for="(item, index) in dictionarylist2"
                            :key="index"
                    >{{item.value}}
                    </option>
                </select>
            </div>
        </div>
        <div class="btn" @click="login">注册</div>
    </div>
</template>

<script>
    import {validateIdCard} from "../../static/js/validateIdCardUtil";
    import {
        entrance_register,
        testWxUse,
        getWxUserInSession,
        entranceRegister,
        dictionary
    } from "../../api/http";

    export default {
        data() {
            return {
                committeeVal: "",
                somethingqu: "",
                somethingqu1: "",
                somethingqu2: "",
                data: {
                    username: "",
                    parentarea: "",
                    area: "",
                    committee: ""
                },
                resdata: {
                    openid: "",
                    area_level: "",
                    headimgurl: "",
                    parentarea: "",
                    area: ""
                },
                dictionarylist: [],
                dictionarylist1: [],
                dictionarylist2: []
            };
        },
        methods: {
            async getqu(text, val) {
                // console.log(text, val);
                this.somethingqu = val;
                this.data.parentarea = text;
                let res = await dictionary(this.somethingqu);
                this.dictionarylist1 = res;
            },
            async getqu1(text, val) {
                console.log(text, val);
                // this.somethingqu1 = val;
                this.data.area = text;
                let res = await dictionary(val);
                console.log(res);
                this.committeeVal = "";
                this.dictionarylist2 = res;
                this.data.committee = ""
                this.$refs.newText2.options[this.$refs.newText2.selectedIndex].value = ""
                // console.log(this.$refs.newText2.options[this.$refs.newText2.selectedIndex]);

                // this.$refs.newText2.options[this.$refs.newText2.selectedIndex].text=""
                // this.getqu2(text, val)
            },
            async getqu2(text, val) {
                console.log(text);

                this.somethingqu2 = val;
                this.data.committee = text;
            },
            async login() {
                if (this.data.username.trim() == "") {
                  this.$toast.fail({ message: "请输入您的姓名", duration: 1000 });
                  return false;
                }

                if (!/^1[3456789]\d{9}$/.test(this.data.tel)) {
                  this.$toast.fail({ message: "请输入正确手机号", duration: 1000 });
                  return false;
                }
                if (
                  !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
                    this.data.idCard
                  )
                ) {
                  this.$toast.fail({ message: "请输入正确身份证", duration: 1000 });
                  return false;
                }

                if (this.data.committee.trim() == "") {
                  this.$toast.fail({ message: "请选择您的所属区域", duration: 1000 });
                  return false;
                }
                if (!this.resdata.parentArea == "") {
                    this.data.parentarea = this.resdata.parentArea;
                }
                if (!this.resdata.area == "") {
                    this.data.area = this.resdata.area;
                }

                let res = await entranceRegister({
                    openid: this.resdata.openid,
                    areaLevel: this.resdata.area_level,
                    headimg: this.resdata.headimgurl,
                    ...this.data
                });
                if (res.code == 200) {
                    //成功
                    this.$toast.success({message: "注册成功！", duration: 1000});
                    setTimeout(() => {
                        let query = this.$route.query;
                        if (query && query.type == "conferenceSharing") {
                            //会议分享
                            let id = this.$route.query.id;
                            // let timeStamp = this.$route.query.timeStamp;
                            this.$router.push({
                                path: "/detailedmetting",
                                query: {
                                    val: "0",
                                    id: id
                                }
                            });
                        } else {
                            this.$router.push("/home");
                        }
                    }, 1000);
                } else {
                    this.$toast.fail(data.message);
                }
            },
            async all() {
                //测试微信登录
                // let res = await testWxUse();
                let res1 = await getWxUserInSession();
                this.resdata = res1.details.data;
                // this.somethingqu=this.resdata.parentArea
                // this.somethingqu=this.resdata.area
                // this.somethingqu=this.resdata.committee
            },
            async getdictionary(data) {
                let res = await dictionary(data);
                res.forEach(async (item, index) => {
                    if (item.value == this.resdata.parentArea) {
                        res[index].isSelected = true;
                        console.log(item.key);
                        let abc = await dictionary(item.key);
                        abc.forEach(async (items, indexs) => {
                            if (items.value == this.resdata.area) {
                                abc[indexs].isSelected = true;
                                console.log(items.key);

                                let abcd = await dictionary(items.key);
                                this.dictionarylist2 = abcd;
                            } else {
                                abc[indexs].isSelected = false;
                            }
                        });
                        this.dictionarylist1 = abc;
                        // console.log(this.dictionarylist2);
                    } else {
                        res[index].isSelected = false;
                    }
                });
                // console.log(res);
                this.dictionarylist = res;
            }
        },
        async mounted() {
            this.all();
            this.getdictionary("qu");
        }
    };
</script>

<style lang="less" scoped>
    .register {
        padding: 1.55rem 1.9rem;
        box-sizing: border-box;
    }

    .iteminput {
        display: flex;
        height: 3.1rem;
        border-bottom: 1px solid #e5e5ea;
        align-items: center;
    }

    input {
        border: none;
        width: 70%;
        height: 1.1rem;
        font-size: 0.7rem;
    }

    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: #8e8e93;
    }

    .center {
        margin-bottom: 2rem;
    }

    .btn {
        width: 100%;
        height: 2.4rem;
        background-color: #f54133;
        font-size: 0.85rem;
        border-radius: 1.2rem;
        line-height: 2.4rem;
        color: #ffffff;
        text-align: center;
    }

    .textleft {
        width: 1.1rem;
        height: 1.1rem;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .pos {
        position: absolute;
        right: 0;
        top: 0;
        width: 6.35rem;
        height: 4rem;
    }

    .wlcom {
        width: 100%;
        margin-bottom: 0.4rem;
        font-size: 1.3rem;
        color: #333333;
        font-weight: bold;
    }

    .todangjian {
        height: 100%;
        font-size: 1.3rem;
        color: #333333;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .selstyle {
        width: 100%;
        height: 1.1rem;
        border: none;
    }
</style>

