<template>
    <div class="wrap">
        <van-search v-model="search" placeholder="请输入姓名"  @search="onSearch" input-align="center"/>
        <van-grid :column-num="3">
            <van-grid-item><p class="p_num">{{data.count}}</p>
                <p class="p_title">应考</p></van-grid-item>
            <van-grid-item><p class="p_num">{{data.attend}}</p>
                <p class="p_title">已考</p></van-grid-item>
            <van-grid-item><p class="p_num">{{data.didntAttend}}</p>
                <p class="p_title">未考</p></van-grid-item>
            <van-grid-item><p class="p_num">{{data.pass}}</p>
                <p class="p_title">已通过</p></van-grid-item>
            <van-grid-item><p class="p_num">{{data.didntPass}}</p>
                <p class="p_title">未通过</p></van-grid-item>
            <van-grid-item><p class="p_num">{{data.absent}}</p>
                <p class="p_title">缺考</p></van-grid-item>
        </van-grid>
        <div class="list">
            <div class="list_title">
                <p>姓名</p>
                <p>分数</p>
                <p>状态</p>
            </div>
            <div class="list_main">
                <div class="list_unit" v-for="item of data.list">
                    <p>{{item.name}}</p>
                    <p>{{item.score}}</p>
                    <p :class="item.status=='已通过'?'pass':'nopass'">{{item.status}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "exam_manage_detail",
        data() {
            return {
                id:'',
                search: '',
                data:[]
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.$axios.get('/intelligentCommunity/mobile/exam/detail/'+this.id).then( res =>{
                if(res.status==200){
                    this.data=res.data.details.data;
                }
            })
        },
        methods:{
            onSearch(val){
                this.$axios.get('/intelligentCommunity/mobile/exam/detail/'+this.id,{
                    params:{search: val}
                }).then( res =>{
                    if(res.status==200){
                        this.data=res.data.details.data;
                        console.log(this.data)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .pass{
        color: #333333;
    }
    .nopass{
        color: #F54133;
    }

    .wrap{
        background: #F6F6F6;
        width: 100%;
        height: 100%;
    }
    .van-grid-item {
        height: 4.25rem;
    }

    .p_num {
        color: #F54133;
        font-size: 1rem;
    }

    .p_title {
        color: #8E8E93;
        font-size: .7rem;
    }
    .list{
        width: 100%;
        margin-top: .5rem;
        background: #ffffff;
        box-sizing: border-box;
        padding: 0 1.6rem;
    }
    .list .list_title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2rem;
        border-bottom: 1px solid #F6F6F6;
        font-size: .75rem;
        color: #333333;
        font-weight: 800;
    }
    .list .list_main .list_unit{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2rem;
        font-size: .75rem;
        color: #333333;
    }
</style>