<template>
    <div>
        <van-tabs v-model="active" @click="changeActive">
            <van-tab title="待考">
                <div class="one" v-for="item of list" @click="goexam(item.id)">
                    <div class="one_top">
                        <p>{{item.title}}</p>
                    </div>
                    <div class="one_foot">
                        <div class="one_foot_top">
                            <p>{{item.deadline}} 截止 | </p>
                            <p class="p1">{{item.attendCount}}/{{item.count}}</p>
                        </div>
                        <p class="one_foot_foot">{{item.isBegin?'进行中':'已开始'}}</p>
                    </div>
                </div>
            </van-tab>
            <van-tab title="缺考">
                <div class="one" v-for="item of list">
                    <div class="one_top">
                        <p>{{item.title}}</p>
                    </div>
                    <div class="one_foot">
                        <div class="one_foot_top">
                            <p>{{item.deadline}} 截止 | </p>
                            <p class="p1">{{item.attendCount}}/{{item.count}}</p>
                        </div>
<!--                        <p class="one_foot_foot">已结束</p>-->
                    </div>
                </div>
            </van-tab>
            <van-tab title="已考">
                <div class="three" v-for="item of list" @click="alreadyexam(item.id)">
                    <div class="three_left">
                        <div class="three_left_top">
                            <p>{{item.title}}</p>
                        </div>
                        <div class="three_left_foot">
                            <p class="p1">{{item.deadline}} 截止 | </p>
                            <p class="p2"><span class="sp">{{item.attendCount}}</span>/<span>{{item.count}}</span></p>
                        </div>
                    </div>
                    <div class="three_right">
                        <p class="p1" :class="item.isPass=='true'?'pass':'unpass'">{{item.score}}</p>
                        <p class="p2">{{item.isPass=='true'?'已通过':'未通过'}}</p>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <div class="toexam" @click="gomanage">
            <img src="@/img/exam/exam.png" alt="">
        </div>
        <van-overlay :show="show">
            <van-loading type="spinner" style="width:100%;height:100%" class="zzc" color="#f54133" />
        </van-overlay>
    </div>
</template>

<script>
    export default {
        name: "exam_list",
        data() {
            return {
                show: false,
                active: 0,
                list:[],
            }
        },
        created(){
            this.getList(1)
        },
        methods:{
            getList(type){
                this.show=true;
                this.$axios({
                    method: 'get',
                    url: '/intelligentCommunity/mobile/exam/exams/' + type
                }).then(res => {
                    if (res.data.code === 200) {
                        this.list=res.data.details.list;
                    }
                    this.show=false;
                });
            },
            changeActive(val){
                if(val==0){
                    this.getList(1)
                }else if(val==1){
                    this.getList(2)
                }else if(val==2){
                    this.getList(3)
                }
            },
            goexam(id){
                this.$router.push({
                    path:'/plan_exam',
                    query:{
                        id:id
                    }
                })
            },
            gomanage(){
                this.$router.push({
                    path:'/exam_manage'
                })
            },
            //已考
            alreadyexam(id){
                this.$router.push({
                    path:'/end_exam',
                    query:{
                        id:id
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .pass{
        color: #FFCC00!important;
    }
    .unpass{
        color: #F54133!important;
    }
    .one {
        height: 4rem;
        width: 100%;
        border-bottom: 1px solid #F6F6F6;
        box-sizing: border-box;
        padding: 0 .8rem;
    }

    .one .one_top {
        width: 100%;
        font-size: .75rem;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: .8rem;
    }

    .one .one_foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: .7rem;
    }

    .one .one_foot .one_foot_top {
        display: flex;
        align-items: center;
        font-size: .65rem;
        color: #8E8E93;
    }

    .one .one_foot .one_foot_top .p1 {
        margin-left: .3rem;
        position: relative;
        top: .08rem;
    }

    .one .one_foot .one_foot_foot {
        font-size: .65rem;
        color: #F54133;
    }

    .three {
        height: 4rem;
        width: 100%;
        border-bottom: 1px solid #F6F6F6;
        box-sizing: border-box;
        padding: 0 .8rem;
        display: flex;
        justify-content: space-between;
    }

    .three .three_left {
        width: 80%;
        height: 100%;
    }

    .three .three_left .three_left_top p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: .75rem;
        color: #333333;
        margin-top: 6%;
    }

    .three .three_left .three_left_foot {
        width: 100%;
        display: flex;
        margin-top: 3%;
    }

    .three_left_foot .p1 {
        font-size: .65rem;

    }

    .three_left_foot .p2 {
        font-size: .65rem;
        color: #8E8E93;
        position: relative;
        top: .15rem;
        margin-left: .3rem;
    }

    .three_left_foot .p2 .sp {
        color: #F54133;
    }

    .three .three_right {
        width: 20%;
        height: 100%;
    }

    .three_right {
        display: flex;
        flex-wrap: wrap;
    }

    .three_right .p1 {
        width: 100%;
        font-size: .9rem;
        color: #F54133;
        font-weight: bold;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15%;
    }

    .three_right .p2 {
        width: 100%;
        font-size: .6rem;
        color: #8E8E93;
        text-align: center;
    }
    .toexam{
        position: fixed;
        right: 3.2%;
        bottom: 11.2%;
        width: 3.9rem;
        height: 3.9rem;
    }
    .toexam img{
        width: 3.9rem;
        height: 3.9rem;
    }
</style>