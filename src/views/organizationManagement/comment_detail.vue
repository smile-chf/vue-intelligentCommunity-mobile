<template>
    <div class="box">
        <div class="head">
            <div class="title">
                <p>评议说明</p>
            </div>
            <div class="title">
                <p>优秀比例:{{ratio}}%   人数:{{mannum}}</p>
            </div>
            <div class="intro">
                <p>{{content}}</p>
            </div>
        </div>
        <div class="main">
            <div class="unit" v-for="(item,index) of list" :key="index">
                <div class="unit_name">
                    <p class="line"></p>
                    <p class="name">{{item.name}}</p>
                </div>
                <van-radio-group class="radio_unit" v-model="answer[index]">
                    <van-radio
                            @click="chooseradio($event,index)"
                            checked-color="#F54133"
                            :name="item.id+','+unit.ask"
                            v-for="(unit, answerIndex) in timu"
                            :key="answerIndex"
                            :disabled="type==0"
                    >{{unit.val}}
                    </van-radio>
                </van-radio-group>
            </div>
        </div>
        <div class="sure" v-if="type!==0">
            <p @click="submit">提交</p>
        </div>
        <van-overlay :show="show">
            <van-loading type="spinner" style="width:100%;height:100%" class="zzc" color="#f54133" />
        </van-overlay>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mannum:"",
                show: false,
                id: '',
                type: '',
                ratio: '',
                content: '',
                answer: [],
                allnum: '',
                timu: [
                    {val: "优秀", ask: "1"},
                    {val: "合格", ask: "2"},
                    {val: "基本合格", ask: "3"},
                    {val: "不合格", ask: "4"}
                ],
                list: []
            }
        },
        created() {
            this.show=true;
            this.id = this.$route.query.id;
            this.type = this.$route.query.type;
            if (this.type == 1) {
                this.$axios.get('/intelligentCommunity/mobile/evaluate/results/' + this.id).then(res => {
                    if (res.data.code === 200) {
                        this.list = res.data.details.list;
                        this.ratio = res.data.details.evaluateRecord.ratio;
                        this.content = res.data.details.evaluateRecord.content;
                        this.allnum = res.data.details.list.length
                        this.mannum= res.data.details.goodCount
                 
                    }
                    this.show=false;
                });
            } else {
                this.$axios.get('/intelligentCommunity/mobile/evaluate/results/' + this.id + '?status=1').then(res => {
                     this.mannum= res.data.details.goodCount
                     this.ratio = res.data.details.evaluateRecord.ratio;
                    if (res.data.code === 200) {
                        this.list = res.data.details.list;
                        this.content = res.data.details.evaluateRecord.content;
                        let d = res.data.details.list;
                        let e = [];
                        for (let i = 0; i < d.length; i++) {
                            e.push(d[i].evaluatedMemberId + ',' + d[i].status);
                        }
                        this.answer = e
                    }
                    this.show=false;
                });
            }
        },
        methods: {
            submit() {
                var flag=true
                for (let i = 0; i < this.answer.length; i++) {
                    if(!this.answer[i]){
                        flag=false
                    }
                }
                if(this.answer.length!==this.list.length || !flag){
                    this.$toast("有党员未被评议");
                    return false
                }
                this.$axios({
                    method: 'post',
                    url: '/intelligentCommunity/mobile/evaluate/evaluation/' + this.id,
                    data: this.answer
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$toast("评议成功");
                        this.$router.push('/democratic_comment')
                    }
                });
            },
            chooseradio(event,index) {
                let goodCount = 0;
                for (let i in this.answer){
                    if(parseInt(this.answer[i])){
                        if(this.answer[i].split(",")[1]==1){
                            goodCount++;
                        }
                    }
                }
                if((goodCount/this.allnum)*100>this.ratio){
                    this.answer.splice(index,1,"empty");
                    this.$toast('优秀率超出了');
                }
            }
        }
    }
</script>
<style scoped>
    .van-radio {
        width: 50%;
        margin-top: 1rem;
    }

    .box {
        background: #F6F6F6;
        width: 100%;
        height: 100%;
    }

    .head {
        width: 100%;
        box-sizing: border-box;
        padding: 0 .8rem;
        background: #ffffff;
    }

    .head .title {
        height: 2rem;
        border-bottom: 1px solid #F6F6F6;
        font-size: .65rem;
        color: #8E8E93;
        line-height: 2rem;
    }

    .head .intro {
        box-sizing: border-box;
        padding-top: .5rem;
        padding-bottom: .8rem;
        font-size: .75rem;
        color: #333333;
    }

    .main {
        background: #ffffff;
        width: 100%;
        margin-top: .5rem;
        margin-bottom: 3.5rem;
    }

    .main .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        height: 2rem;
        padding: 0 .8rem;
    }

    .main .top select {
        font-size: .75rem;
        color: #333333;
        border: none;
        height: 100%;
    }

    .main .top p {
        font-size: .7rem;
        color: #8E8E93;
    }

    .unit {
        background: #ffffff;
        border-bottom: 1px solid #F6F6F6;
        padding: 1.2rem 0;
    }

    .unit_name {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .unit_name .line {
        width: .1rem;
        height: .6rem;
        background: #F54133;
        margin-left: 1.7rem;
        margin-right: .5rem;
    }

    .unit_name .name {
        font-size: .75rem;
        color: #333333;
    }

    .radio_unit {
        width: 100%;
    }

    .van-radio-group {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 0 10%;
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

    input[type='radio'] {
        width: 1rem;
        height: 1rem;
        margin-right: .8rem;
        border-radius: 18px;
        position: relative;
        background: #f6f6f6;
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: .05rem solid #ddd;
    }

    input[type='radio']:checked {
        background: #F54133;
    }

    input[type='radio']:checked:after {
        content: '';
        position: absolute;
        top: 14%;
        left: 50%;
        background: transparent;
        border: #fff solid 2px;
        border-top: none;
        border-right: none;
        height: 26%;
        width: 50%;
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg) translateX(-50%) translateY(-50%);
    }
</style>
