<template>
    <div>
        <div class="unit" v-for="item of data" @click="godetail(item.id)">
            <div class="left">
                <p class="left_top">{{item.title}}</p>
                <div class="left_foot">
                    <div class="time">
                        <p>{{item.deadline}} 截止 | </p>
                    </div>
                    <div class="num">
                        <p><span class="sp">{{item.attendCount}}</span>/<span>{{item.count}}</span></p>
                    </div>
                </div>
            </div>
            <div class="right">
                <p>未答提醒</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "exam_manage",
        data(){
            return{
                data:[]
            }
        },
        created(){
            this.$axios({
                method: 'get',
                url: '/intelligentCommunity/mobile/exam/exams/0',
            }).then(res => {
                if (res.data.code === 200) {
                    this.data=res.data.details.list
                }
            });
        },
        methods:{
            godetail(id){
                this.$router.push({
                    path:'exam_manage_detail',
                    query:{
                        id:id
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .unit {
        display: flex;
        width: 100%;
        height: 4rem;
        border-bottom: 1px solid #F6F6F6;
        box-sizing: border-box;
        padding: 0 .8rem;
    }

    .unit .left {
        width: 72%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .unit .left .left_top {
        width: 100%;
        font-size: .75rem;
        color: #333333;
        margin-top: .8rem;
    }
    .unit .left .left_foot{
        display: flex;
        align-items: center;
        margin-top: .5rem;
        font-size: .65rem;
        color: #8E8E93;
    }
    .unit .left .left_foot .num{
        margin-left: .5rem;
        position: relative;
        top: .1rem;
    }
    .unit .left .left_foot .num .sp{
        color: #F54133;
    }
    .unit .right {
        width: 28%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .unit .right p{
        /*width: 3.4rem;*/
        width: 82%;
        height: 1.2rem;
        border-radius: 1.2rem;
        border: 1px solid #F54133;
        color: #F54133;
        text-align: center;
        font-size: .6rem;
        line-height: 1.2rem;
    }
</style>