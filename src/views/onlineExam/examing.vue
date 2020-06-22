<template>
    <div>
        <div class="head">
            <p class="p1">剩余时间：</p>
            <van-count-down class="p2" :time="time"/>
        </div>
        <div class="content">
            <form id="form1" runat="server">
                <div class="main-list clearfix">
                    <transition-group :name="transitionName">
                        <div class="problemList" v-show="dataIndex === index" v-for="(item, index) in data"
                             :key="index">
                            <div class="subject">
                                <p class="title">{{index+1}}、 <span class="choose_kind">{{item.multiSelect == 0?'单选':'多选'}}</span>
                                    {{item.subject.title}}</p>
                            </div>
                            <div class="option">
                                <ul class="clearfix">
                                    <!-- 单选 -->
                                    <li v-if="item.multiSelect == 0" v-for="(li, liIndex) in item.subject.option"
                                        :key="liIndex" @click="choiceRadio(index,liIndex)">
                                        <input type="radio" :value="dealwithAnswer(li,0)" v-model="item.checkbox"/>
                                        <span>{{dealwithAnswer(li,1)}}</span>
                                    </li>
                                    <!-- 多选 -->
                                    <li v-if="item.multiSelect == 1" v-for="(li, liIndex) in item.subject.option"
                                        :key="liIndex" @click="choiceCheck(index,liIndex)">
                                        <input type="checkbox" :value="dealwithAnswer(li,0)" v-model="item.checkbox"/>
                                        <span>{{dealwithAnswer(li,1)}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </transition-group>
                </div>
                <div class="btn-groups" v-if="isIf">
                    <p v-show="isPrev" class="submit"><span class="prev" @click="prev">上一题</span></p>
                    <p v-show="isNext" class="submit"><span class="next" @click="next">下一题</span></p>
                    <p v-show="isSubmit" class="submit"><span class="save" @click="save">提交</span></p>
                </div>
            </form>
        </div>
        <div class="popup" v-if="isshow">
            <div class="pop_box">
                <div class="pop_title">
                    提交试卷
                </div>
                <div class="pop_main">
                    <p class="p1" @click="cancel">取消</p>
                    <p class="p2" @click.once="sure">确定</p>
                </div>
            </div>
        </div>
        <van-overlay :show="show">
            <van-loading type="spinner" style="width:100%;height:100%" class="zzc" color="#f54133" />
        </van-overlay>
    </div>
</template>

<script>
    export default {
        name: "examimg",
        data() {
            return {
                show: false,
                id: '',
                isshow: false,
                isIf: false,
                transitionName: 'slide',
                time: '',
                data: [],
                dataIndex: 0,//问题索引
                isPrev: false,//上一题是否显示
                isNext: false,//下一题是否显示
                isSubmit: false,//提交是否显示
            }
        },
        created() {
            this.show=true;
            this.id = this.$route.query.id;
            let endTime = window.localStorage.getItem("question" + this.id);
            this.time = endTime - new Date().getTime() ;
            if(this.time < 0){
                window.localStorage.setItem("question" + this.id, '');
            }
            this.$axios({
                method: 'get',
                url: '/intelligentCommunity/mobile/exam/questions/' + this.id
            }).then(res => {
                if (res.data.code === 200) {
                    let arr = [];
                    let tempData = res.data.details.list;
                    for (let i = 0; i < tempData.length; i++) {
                        let subject = {};
                        let o = {};
                        subject.title = tempData[i].question;
                        subject.option = tempData[i].option;
                        o.checkbox = [];
                        o.multiSelect = tempData[i].type;
                        o.isSelect = false;
                        o.isFirst = true;
                        o.isAddData = false;
                        o.subject = subject;
                        o.id = tempData[i].id;
                        arr.push(o);
                    }
                    this.data = arr;
                    this.show=false;
                }else{
                    this.$toast("网络错误");
                    this.show=false;
                }
            });
        },
        methods: {
            dealwithAnswer(answer, index) {
                return answer.split("&&")[index];
            },
            choiceRadio(index, liIndex) {//单选操作
                this.choice(index, liIndex, 0, null);
                this.isIf = true
            },
            choiceCheck(index, liIndex) {//多选操作
                this.choice(index, liIndex, 1, null);
                this.isIf = true
            },
            choice(index, liIndex, choiceStyle, liChildIndex) {
                setTimeout(() => {
                    if (this.data[index].checkbox.length > 0) {
                        this.isNext = true;
                        this.data[index].isSelect = true;
                    } else {
                        this.isNext = false;
                        this.data[index].isSelect = false;
                    }

                    if (this.dataIndex === (this.data.length - 1)) {//判断是否是最后一题，并隐藏下一题按钮
                        this.isNext = false;
                        this.isSubmit = true;
                    }
                })
            },

            prev() {//上一题
                this.dataIndex -= 1;
                if (this.dataIndex <= 0) {
                    this.isPrev = false;
                }
                this.isNext = true;
                this.isSubmit = false;
            },
            next() {//下一题
                this.dataIndex += 1;
                if (this.dataIndex > 0) {
                    this.isPrev = true;
                    if (this.data[this.dataIndex].isSelect) {
                        this.isNext = true;
                    } else {
                        this.isNext = false;
                    }
                }
                if (this.data.length - 1 == this.dataIndex) {
                    this.isNext = false;
                    this.isSubmit = true;
                }
            },
            save() {//保存数据---这是完成按钮
                if (this.data[this.dataIndex].isSelect) {
                    this.isshow = true
                } else {
                    alert('请回答完所有题目');
                }
            },
            cancel() {
                this.isshow = false
            },
            sure() {
                let arr=[];
                for (let i = 0; i < this.data.length; i++) {
                    let json={};
                    json.questionId=this.data[i].id;
                    json.answer=this.data[i].checkbox.toString().replace(/,/g, "");
                    arr.push(json)
                }
                this.$axios({
                    method: 'post',
                    url: '/intelligentCommunity/mobile/exam/answering/'+this.id,
                    data:arr
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$router.push({
                            name: 'end_exam',
                                query: {
                                    id: this.id
                                }
                            }
                        )
                    }
                    if(res.data.code === 400){
                        this.$toast("您已提交过答案");
                        this.$router.push('/exam_list')
                    }
                });

            }
        },
        watch: {
            dataIndex(news, olds) {//动画切换
                this.transitionName = news < olds ? 'slide_back' : 'slide';
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .popup {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 99;
        width: 100%;
        height: 100%;
    }

    .popup .pop_box {
        width: 72%;
        height: 7rem;
        background: #ffffff;
        border-radius: .7rem;
        margin-top: 50%;
        margin-left: 50%;
        transform: translateX(-50%) translateY(-20%);
    }

    .popup .pop_box .pop_title {
        height: 4.8rem;
        width: 100%;
        text-align: center;
        line-height: 4.8rem;
        font-size: .85rem;
        color: #333333;
        font-weight: 700;
        border-bottom: .05rem solid #F6F6F6;
    }

    .popup .pop_box .pop_main {
        height: 2.2rem;
        width: 100%;
        display: flex;
        align-items: center;
    }

    .popup .pop_box .pop_main p {
        width: 50%;
        text-align: center;
        line-height: 2.2rem;
    }

    .popup .pop_box .pop_main .p1 {
        border-right: .05rem solid #F6F6F6;
        color: #F54133;
    }

    .popup .pop_box .pop_main .p2 {
        color: #333333;
    }

    .head {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 2rem;
        color: #F54133;
        background: rgba(245, 65, 51, .06);
    }

    .head .p1 {
        font-size: .65rem;
    }

    .head .p2 {
        color: #F54133;
        font-size: .7rem;
    }

    .problemList {
        box-sizing: border-box;
        padding: 0 .8rem;
    }

    .problemList .subject {
        width: 100%;
        font-size: .75rem;
        color: #333333;
        padding: 1rem 0;
    }

    .problemList .subject .title {
        display: flex;
        align-items: center;
    }

    .problemList .subject .title .choose_kind {
        display: block;
        width: 1.6rem;
        height: .85rem;
        font-size: .6rem;
        color: #fff;
        background: #F54133;
        text-align: center;
        line-height: .85rem;
        margin-right: .4rem;
    }

    .problemList .option li {
        width: 100%;
        padding: .8rem 0;
        border-top: 1px solid #F6F6F6;
        font-size: .75rem;
        color: #333333;
    }

    .btn-groups {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3rem;
        box-shadow: 0 -.025rem .05rem rgba(0, 0, 0, .16);
        display: flex;
        align-items: center;
    }

    .btn-groups .submit {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .btn-groups .submit span {
        width: 8.4rem;
        height: 2.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .75rem;
    }

    .btn-groups .submit .prev {
        border: 1px solid #C7C7CC;
        border-radius: .3rem;
        color: #C7C7CC;

        position: absolute;
        left: 4%;
    }

    .btn-groups .submit .next {
        background: #F54133;
        border-radius: .3rem;
        color: #ffffff;

        position: absolute;
        right: 4%;
    }

    .btn-groups .submit .save {
        background: #F54133;
        border-radius: .3rem;
        color: #ffffff;
        position: absolute;
        right: 4%;
    }

    /*动画*/
    .slide-enter, .slide_back-enter {
        position: absolute;
        width: 100%;
    }

    .slide-leave, .slide_back-leave {
        position: absolute;
        width: 100%;
    }

    .slide-enter-active, .slide_back-enter-active {
        transition: all 0.3s linear;
    }

    .slide-leave-active {
        position: absolute;
        transition: all 0.3s linear;
        transform: translate(-100%);
    }

    .slide-enter {
        transform: translateX(100%);
    }

    .slide_back-leave-active {
        position: absolute;
        transition: all 0.3s linear;
        transform: translate(100%);
    }

    .slide_back-enter {
        transform: translateX(-100%);
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

    input[type='checkbox'] {
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

    input[type='checkbox']:checked {
        background: #F54133;
    }

    input[type='checkbox']:checked:after {
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