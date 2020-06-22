<template>
    <div class="wrap error_list">
        <div class="unit" v-for="(item,index) of list">
            <div class="unit_name">
                <p class="num">{{index+1}}、</p>
                <p class="line">{{item.type==0?'单选':'多选'}}</p>
                <p class="name">{{item.title}}</p>
            </div>
            <van-radio-group v-model="item.answer" v-if="item.type==0" disabled>
                <van-radio :name="unit.optionKey" v-for="(unit,i) of item.options">{{unit.optionDescribe}}</van-radio>
            </van-radio-group>
            <van-checkbox-group v-model="item.answerArr" v-if="item.type==1" disabled>
                <van-checkbox :name="unit.optionKey" v-for="(unit,i) of item.options">{{unit.optionDescribe}}</van-checkbox>
            </van-checkbox-group>
            <div class="answer">
                <p>正确答案：</p>
                <p class="p1">{{item.correctAnswer}}</p>
            </div>
        </div>
        <van-overlay :show="show">
            <van-loading type="spinner" style="width:100%;height:100%" class="zzc" color="#f54133" />
        </van-overlay>
    </div>
</template>

<script>

    export default {
        name: "error_list",
        data() {
            return {
                show: false,
                list: [],
            };
        },
        created() {
            this.show=true;
            this.id = this.$route.query.id;
            this.$axios({
                method: 'get',
                url: '/intelligentCommunity/mobile/exam/answers/' + this.id,
            }).then(res => {
                if (res.data.code === 200) {
                    let list = res.data.details.list;
                    for (let i = 0; i < list.length; i++) {
                        list[i].answerArr = [];
                        let arr = list[i].answer;
                        for (let j=0;j<arr.length;j++){
                            list[i].answerArr.push(arr.charAt(j));
                        }
                    }
                    this.list = list;
                    this.show=false;
                }
            });
        },

    }
</script>

<style scoped>
    .wrap .unit .van-radio__label--disabled{
        color: #333333!important;
    }
    .wrap {
        width: 100%;
        height: 100%;
        background: #F6F6F6;
    }

    .unit {
        background: #ffffff;
    }

    .unit_name {
        display: flex;
        align-items: center;
        height: 3rem;
        line-height: 3rem;
        font-size: .75rem;
        color: #333333;
        padding-left: .8rem;
    }

    .unit_name .line {
        width: 1.6rem;
        height: .85rem;
        background: #F54133;
        color: #ffffff;
        font-size: .6rem;
        line-height: .85rem;
        text-align: center;
        margin-right: .1rem;
    }


    .van-radio-group {
        padding: 0 1.2rem;
        box-sizing: border-box;
    }

    .van-checkbox-group {
        padding: 0 1.2rem;
        box-sizing: border-box;
    }

    .van-checkbox {
        height: 2.65rem;
        width: 100%;
        border-top: 1px solid #F6F6F6;
    }

    .van-radio {
        height: 2.65rem;
        width: 100%;
        border-top: 1px solid #F6F6F6;
    }

    .answer {
        width: 100%;
        height: 2.45rem;
        background: rgba(245, 65, 51, 0.02);
        display: flex;
        align-items: center;
        padding-left: 1.3rem;
        box-sizing: border-box;
    }

    .answer .p1 {
        color: #F54133;
    }

</style>