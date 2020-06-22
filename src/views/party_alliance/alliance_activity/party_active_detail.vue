<template>
    <div style="background: #F6F6F6;width: 100%;height: 100%">
        <div class="party_active">
            <div class="unit">
                <p class="title">活动名称</p>
                <van-field v-model="formdata.active_name" type="textarea" rows="2"/>
            </div>
            <div class="unit">
                <van-field label="获取积分" v-model="formdata.getintegral" error input-align="right" readonly/>
            </div>
            <div class="unit">
                <van-field label="报名倒计时" v-model="formdata.countDown" error input-align="right" readonly/>
            </div>
            <div class="unit module">
                <van-field label="活动地址" v-model="formdata.site" input-align="right" readonly/>
            </div>
            <div class="unit module">
                <van-field label="举办单位" v-model="formdata.unit" input-align="right" readonly/>
            </div>
            <div class="unit">
                <p class="title">活动时间</p>
                <van-field v-model="formdata.times" readonly/>
            </div>
            <div class="unit">
                <van-field label="报名截止时间" v-model="formdata.end_time" input-align="right" readonly/>
            </div>
            <div class="unit module more">
                <div class="top_title">
                    <p>报名人员</p>
                    <router-link to="/people_list">
                        <p class="p2">更多 <img src="../../../img/party_alliance/right.png" alt=""></p>
                    </router-link>

                </div>
                <div class="foot_main">
                    <div class="single">
                        <img src="../../../img/party_alliance/default_head.png" alt="">
                        <p>{{formdata.name | addstar}}</p>
                    </div>
                    <div class="single">
                        <img src="../../../img/party_alliance/default_head.png" alt="">
                        <p>{{formdata.name | addstar}}</p>
                    </div>
                    <div class="single">
                        <img src="../../../img/party_alliance/default_head.png" alt="">
                        <p>{{formdata.name | addstar}}</p>
                    </div>
                    <div class="single">
                        <img src="../../../img/party_alliance/default_head.png" alt="">
                        <p>{{formdata.name | addstar}}</p>
                    </div>
                </div>
            </div>

            <div class="active_content">
                <p class="title">活动内容</p>
                <van-field v-model="formdata.content" type="textarea" rows="2" placeholder="请输入联盟活动标题"/>
            </div>

            <div class="unit_upload">
                <van-uploader
                        v-model="formdata.uploaderimgurl"
                        :max-count="3"
                />
            </div>

        </div>
        <div class="bottom">
            <div class="btn btn_1" @click="leave">
                <img src="@/img/party_alliance/leave.png" alt="">
                <p>请假</p>
            </div>
            <div class="btn btn_2" @click="show = true">
                <p>立即报名</p>
            </div>
        </div>

        <van-overlay :show="show" @click="show = false">
            <div class="wrapper">
                <div class="content" @click.stop>
                    <van-icon name="cross" class="close" @click="show=false"/>
                    <p class="p1">参加此次活动</p>
                    <p class="p2">开始时间：2020/03/15 15:00</p>
                    <p class="p2">结束时间：2020/03/15 16:00</p>
                    <p class="p3" @click="apply">立即报名</p>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                formdata: {
                    active_name: '',
                    getintegral: '5分',
                    countDown: '1天12时20分30秒',
                    site: '青阳路',
                    unit: '市政府',
                    times: '2020/03/15  15:00 ~ 2020/03/15  16:00',
                    end_time: '2020/03/15  15:00',
                    name: '小名'
                }
            };
        },

        methods: {
            leave() {
                this.$router.push({ path: "/sponsorleave", query: { id: '1' } });
            },
            apply() {
                console.log("报名了")
            }
        }
    };
</script>

<style scoped>

    .unit {
        border-bottom: 1px solid #F6F6F6;
        background: #fff;
    }

    .title {
        font-size: .75rem;
        padding-left: .8rem;
        padding-top: .6rem;
        color: #8E8E93;
    }

    .module {
        margin-top: .5rem;
    }

    .top_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .75rem;
        color: #8E8E93;
        padding-top: .6rem;
        padding-bottom: .4rem;
    }

    .active_content {
        background: #fff;
        margin-top: .5rem;
    }

    .party_active {
        padding-bottom: 2.2rem;
    }

    .party_active .active_content .title {
        color: #333;
    }

    .top_title .p2 {
        font-size: .65rem;
    }

    .more {
        box-sizing: border-box;
        padding: 0 .8rem;
    }

    .top_title img {
        width: .6rem;
        height: .6rem;
    }

    .foot_main {
        display: flex;
    }

    .foot_main .single {
        width: 12%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .foot_main .single:not(:last-child) {
        margin-right: 6%;
    }

    .foot_main .single img {
        width: 2rem;
        height: 2rem;

    }

    .foot_main .single p {
        width: 100%;
        color: #333333;
        font-size: .6rem;
        text-align: center;
        margin-top: .2rem;
        margin-bottom: .7rem;
    }

    .unit_upload {
        box-sizing: border-box;
        padding: 0 .8rem;
        background: #fff;
    }

    .van-uploader__upload {
        width: 5rem;
        height: 5rem;
    }

    .van-uploader__preview-image {
        width: 5rem;
        height: 5rem;
    }

    .van-uploader {
        width: 100%;
    }

    .bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        display: flex;
        box-shadow: 0 -0.5px 1px rgba(0, 0, 0, .16);
    }

    .bottom .btn {
        width: 50%;
        height: 2.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .75rem;
    }

    .bottom .btn_1 {
        color: #F54133;
    }

    .bottom .btn_1 img {
        width: 0.95rem;
        height: 0.95rem;
    }

    .bottom .btn_2 {
        background: #F54133;
        color: #FFFFFF;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .content {
        width: 75%;
        height: 31%;
        background-color: #fff;
        border-radius: .7rem;
        text-align: center;
        font-size: .75rem;
        position: relative;
    }

    .content .p1 {
        font-size: .85rem;
        color: #333333;
        font-weight: 700;
        margin-top: 10%;
        margin-bottom: 2.2%;
    }

    .content .p2 {
        color: #333333;
        margin-top: 1%;
    }

    .content .p3 {
        margin-top: 12%;
        width: 74%;
        height: 2rem;
        background: #F54133;
        color: #FFFFFF;
        line-height: 2rem;
        text-align: center;
        border-radius: .3rem;
        margin-left: 13%;
    }

    .content .close {
        position: absolute;
      top: 5%;
      right: 8%;
    }
</style>