<template>
    <div class="wrap">
        <div class="msg_box">
            <div class="msg_top">
                <p class="line"></p>
                <p class="p_title">{{data.examTitle}}</p>
            </div>
            <div class="msg_mid">
                <p class="p1">最终成绩(分)</p>
                <p :class="data.isPass?'p2 passcolor':'p2 nopasscolor'">{{data.score}}</p>
                <p class="p3">{{data.isPass?'通过':'未通过'}}</p>
            </div>
            <div class="msg_foot">
                <div class="foot_common">
                    <p>总题数</p>
                    <p class="p_num">{{data.questionCount}}</p>
                </div>
                <div class="foot_common">
                    <p>合格分</p>
                    <p class="p_num">{{data.passingScore}}</p>
                </div>
                <div class="foot_common">
                    <p>总分</p>
                    <p class="p_num">{{data.totalPoints}}</p>
                </div>
            </div>
        </div>
        <div class="topic">
            <div class="topic_top">
                <div class="left">
                    <p class="line"></p>
                    <p class="p_title">题目全览</p>
                </div>
                <div class="right">
                    <div class="right_unit">
                        <p class="p1"></p>
                        <p class="p2">正确</p>
                    </div>
                    <div class="right_unit">
                        <p class="p1" style="background: #F54133"></p>
                        <p class="p2">错误</p>
                    </div>
                </div>
            </div>
            <div class="topic_main">
                <p v-for="(item,index) of answer" :class="item.isCorrect?'correct':'error'">{{index+1}}</p>
            </div>
            <div class="sure">
                <p @click="submit">查看答案</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "end_exam",
        data() {
            return {
                id:'',
                data:'',
                answer:'',
            }
        },
        created() {
            this.id=this.$route.query.id;
            this.$axios({
                method: 'get',
                url: '/intelligentCommunity/mobile/exam/result/' + this.id
            }).then(res => {
                if (res.data.code === 200) {
                    this.data=res.data.details.data;
                    this.answer=this.data.examMemberAnswers
                }
            });
        },
        methods:{
            submit(){
            //    错题本
                this.$router.push({
                    path:'/error_list',
                    query:{
                        id:this.id
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .passcolor{
        color: #FFCC00;
    }
    .nopasscolor{
        color: #F54133;
    }
    .topic .topic_main{
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 0 .4rem;
    }
    .topic .topic_main p{
        width: 1.3rem;
        height: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .75rem;
        color: #FFFFFF;
        margin:.6rem 6%;
        border-radius: .2rem;
    }
    .topic .topic_main .correct{
        background: #FFCC00;
    }
    .topic .topic_main .error{
        background: #F54133;
    }

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

    .msg_box {
        width: 91.5%;
        height: 13.35rem;
        background: #ffffff;
        border-radius: .3rem;
        box-shadow: 0 .1rem .4rem rgba(0, 0, 0, .08);
        margin-left: 4.25%;
        margin-top: 3.9rem;
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

    .msg_box .msg_mid {
        text-align: center;
    }

    .msg_box .msg_mid .p1 {
        font-size: .75rem;
        color: #333333;
        margin-top: 1.2rem;
    }

    .msg_box .msg_mid .p2 {
        font-size: 1.8rem;
        /*color: #F54133;*/
        font-weight: 800;
        margin-top: .35rem;
    }

    .msg_box .msg_mid .p3 {
        width: 3.2rem;
        height: 1.1rem;
        line-height: 1.1rem;
        font-size: .65rem;
        color: #8E8E93;
        border-radius: 1.1rem;
        background: #F6F6F6;
        margin-left: 50%;
        transform: translateX(-50%);
        margin-top: .45rem;
    }

    .msg_box .msg_foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .msg_box .msg_foot .foot_common {
        width: 30%;
        text-align: center;
        font-size: .7rem;
        color: #8E8E93;
    }

    .msg_box .p_num {
        font-size: .85rem;
        color: #333333;
        margin-top: .2rem;
    }

    .topic{
        width: 91.5%;
        background: #ffffff;
        border-radius: .3rem;
        box-shadow: 0 .1rem .4rem rgba(0, 0, 0, .08);
        margin-left: 4.25%;
        margin-top: .5rem;
        padding: .8rem 0;

    }
    .topic .topic_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .topic .topic_top .left {
        height: 20%;
        display: flex;
        align-items: center;
    }

    .topic .topic_top .right {
        display: flex;
    }

    .topic .topic_top .right .right_unit {
        display: flex;
        align-items: center;
        margin-right: 1.35rem;
    }

    .topic .topic_top .right .right_unit .p1 {
        width: .6rem;
        height: .6rem;
        background: #FFCC00;
        margin-right: .3rem;
    }

    .topic .topic_top .right .right_unit .p2 {

    }

    .topic .topic_top .left .line {
        width: .1rem;
        height: .6rem;
        background: #F54133;
        margin: 0 .8rem;
    }

    .topic .topic_top .left .p_title {
        width: 78%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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