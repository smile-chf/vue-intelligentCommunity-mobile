<template>
    <div class="wrap">
        <div class="times">
            <p class="p1">剩余时间</p>
            <van-count-down class="p2" :time="time"/>
        </div>
        <div class="msg_box">
            <div class="msg_top">
                <p class="line"></p>
                <p class="p_title">{{title}}</p>
            </div>
            <div class="msg_main">
                <div class="unit">
                    <p class="p1">{{data.totalPoints}}</p>
                    <p class="p2">试卷总分</p>
                </div>
                <div class="unit">
                    <p class="p1">{{data.passingScore}}</p>
                    <p class="p2">及格分</p>
                </div>
                <div class="unit">
                    <p class="p1">{{data.questionSize}}</p>
                    <p class="p2">总题数</p>
                </div>
                <div class="unit">
                    <p class="p1">{{data.duration}}</p>
                    <p class="p2">考试时长(分)</p>
                </div>
            </div>
        </div>
        <div class="time_list">
            <div class="list_head">
                <p class="across"></p>
                <p>考试时间</p>
                <p class="across"></p>
            </div>
            <div class="list_main">
                <p>{{data.beginTime}} ~ {{data.deadline}}</p>
            </div>
        </div>
        <div class="sure">
            <p @click="submit">开始考试</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "plan_exam",
        data() {
            return {
                time: '',
                data: '',
                id: '',
                deadline:'',
                duration: '',
                title:''
            }
        },
        created: function () {
            this.id = this.$route.query.id;
            this.$axios({
                method: 'get',
                url: '/intelligentCommunity/mobile/exam/exam/' + this.id
            }).then(res => {
                if (res.data.code === 200) {
                    this.data = res.data.details.data;
                    this.title = this.data.title;
                    this.time = new Date(this.data.deadline.replace(/-/g,'/')).getTime() - new Date().getTime();
                    this.deadline = this.data.deadline;
                    this.duration = this.data.duration;
                }
            });
        },
        methods: {
            submit() {
                if (new Date().getTime() > new Date(this.deadline).getTime()) {
                    this.$toast("考试时间已结束");
                    return false
                }
                let t = window.localStorage.getItem('question' + this.id);
                if(t == ''){
                    window.localStorage.setItem('question' + this.id, new Date().getTime() + this.duration * 60 * 1000);
                }

                this.$router.push({
                    path: '/examing',
                    query: {
                        id: this.id
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .wrap {
        width: 100%;
        height: 100%;
        background-image: url("../../img/exam/plan_exam.png");
        background-repeat: no-repeat;
        background-size: 100%;
        background-color: #F6F6F6;
    }

    .wrap:before {
        content: '';
        display: table;
    }

    .head_img img {
        width: 100%;
    }

    .times {
        margin-top: 1.2rem;
        height: 3.2rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        z-index: 99;
    }

    .times .p1 {
        width: 100%;
        font-size: .7rem;
        color: rgba(255, 255, 255, .8);
        text-align: center;
    }

    .times .p2 {
        width: 100%;
        font-size: 1.2rem;
        color: #ffffff;
        text-align: center;
    }

    .msg_box {
        width: 91.5%;
        height: 11.2rem;
        background: #ffffff;
        border-radius: .3rem;
        box-shadow: 0 .1rem .4rem rgba(0, 0, 0, .08);
        margin-left: 4.25%;
        margin-top: 1.2rem;
    }

    .msg_box .msg_top {
        height: 20%;
        width: 100%;
        border-bottom: 1px solid #F6F6F6;
        display: flex;
        align-items: center;
    }

    .msg_box .msg_top .line {
        width: .1rem;
        height: .6rem;
        background: #F54133;
        margin: 0 .8rem;
    }

    .msg_box .msg_top .p_title {
        width: 78%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .msg_box .msg_main {
        width: 100%;
        height: 80%;
        display: flex;
        flex-wrap: wrap;
    }

    .msg_box .msg_main .unit {
        width: 50%;
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
    }

    .msg_box .msg_main .unit .p1 {
        width: 100%;
        font-size: 1rem;
        color: #F54133;
        margin-top: 12%;
    }

    .msg_box .msg_main .unit .p2 {
        width: 100%;
        font-size: .7rem;
        color: #8E8E93;
    }

    .time_list {
        width: 91.5%;
        background: #ffffff;
        border-radius: .3rem;
        box-shadow: 0 .1rem .4rem rgba(0, 0, 0, .08);
        margin-left: 4.25%;
        margin-top: 1.2rem;
    }

    .time_list .list_head {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .8rem 0;
        font-size: .7rem;
        color: #333333;
    }

    .list_head .across {
        width: 2.2rem;
        height: .05rem;
        background: #E5E5EA;
        margin: .4rem;
    }

    .time_list .list_main {
        text-align: center;
    }

    .time_list .list_main p {
        padding-bottom: 1.2rem;
        font-size: .7rem;
        color: #333333;
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
        box-shadow: 0 -.025rem .05rem rgba(0, 0, 0, .16);
        background: #fff;
    }

    .sure p {
        width: 91.5%;
        height: 2.2rem;
        background: #F54133;
        border-radius: .3rem;
        font-size: .85rem;
        color: #FFFFFF;
        line-height: 2.2rem;
        text-align: center;
    }
</style>