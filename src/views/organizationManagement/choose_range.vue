<template>
    <div>
        <div class="wrap">
<!--            <van-search v-model="search" placeholder="请输入组织、党员" input-align="center" @search="onSearch"/>-->
            <div class="all">
                <div class="left">
                    <input type="checkbox" :checked="allChecked"
                           @change="changeAllChecked($event)"
                           class="check">
                    <p>全选</p>
                </div>
                <p class="right">已选择{{totalCount}}人</p>
            </div>
            <div class="unit" v-for="data in datas">
                <div class="unit_all">
                    <div class="left">
                        <input type="checkbox" :id="data.title" :checked="data.p_selected"
                               @change="changeTitleChecked(data,$event)">
                        <p class="party_name" @click="unfold(data)">{{data.title}}</p>
                    </div>
                    <p class="right">{{data.selected.length}}/{{data.list.length}}</p>
                </div>
                <div class="unit_unit" v-show="data.show">
                    <div class="one" v-for="(item,index) in data.list">
                        <input type="checkbox" :value="item.id" :name="item.id" :checked="item.sub_selected" @change="unitchangeResult(item.id,data,$event)">
                        <img class="headimg" src="@/img/party_alliance/headimg.png" alt="">
                        <p class="party_name">{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="sure">
            <p @click="submit">确定</p>
        </div>
        <van-overlay :show="show">
            <van-loading type="spinner" style="width:100%;height:100%" class="zzc" color="#f54133" />
        </van-overlay>
    </div>
</template>

<script>

    export default {
        name: "choose_range",
        data() {
            return {
                show: false,
                result: [],
                checked: false,
                checkModel: [],
                datas: [],
                search: '',
                totalCount : 0,
                ids:"",
                allChecked:false
            }
        },
        created() {
            this.ids = this.$route.query.ids;
            let oldArray = [];
            if(this.ids){
                oldArray = this.ids.split(",");
            }
            this.show=true;
            this.$axios.get('/intelligentCommunity/mobile/party/membersGroupByDepartName').then(res => {
                if (res.data.code === 200) {
                    let arr = res.data.details.data;
                    let flag = true;
                    for (let i=0;i<arr.length;i++){
                        let flag1 = true;
                        for (let j=0;j<arr[i].list.length;j++){
                            if(oldArray.indexOf(arr[i].list[j].id+"")>=0){
                                arr[i].list[j].sub_selected = true;
                                arr[i].selected.push(arr[i].list[j].id);
                            }else{
                                arr[i].list[j].sub_selected = false;
                                flag1 = false
                            }
                        }
                        if(flag1){
                            arr[i].p_selected = true;
                        }else{
                            arr[i].p_selected = false;
                            flag = false;
                        }
                    }
                    if(flag){
                        this.allChecked = true;
                    }else{
                        this.allChecked = false;
                    }
                    this.datas = res.data.details.data;
                    this.dealWithTotal();
                    this.show=false;
                }
            })
        },
        watch: {
            checkModel() {
                if (this.checkModel.length == this.data.length) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            }
        },
        methods: {
            onSearch() {

            },
            unfold(item) {
                item.show = !item.show;
            },


            //全选
            changeAllChecked: function (event) {
                if (event.target.checked === true) {
                    this.datas.forEach(function (item,index) {
                        item.selected = [];
                        item.p_selected = true;
                        item.list.forEach(function (item1,index1) {
                            item1.sub_selected = true;
                            item.selected.push(item1.id);
                        })
                    })

                } else {
                    this.datas.forEach(function (item,index) {
                        item.selected = [];
                        item.p_selected = false;
                        item.list.forEach(function (item1,index1) {
                            item1.sub_selected = false;
                        })
                    })
                }
                this.dealWithTotal();
            },
            /*第二层input*/
            changeTitleChecked: function (data, event) {
                if (event.target.checked === true) {
                    data.p_selected = true;
                    data.selected = [];
                    data.list.forEach(function (item) {
                        data.selected.push(item.id);
                        item.sub_selected = true;

                    });

                } else {
                    data.p_selected = false;
                    data.selected = [];
                    data.list.forEach(function (item) {
                        item.sub_selected = false;
                    });
                }
                this.dealWithTotal();
            },

            /*第二层input*/
            isTitleChecked: function (data) {
                // var _selected = data.selected;
                // var _listItem = data.list;
                // return _listItem.every(function (item) {
                //     return _selected.indexOf(item) != -1;
                // });
                // console.log(data);
            },
            //单个input
            unitchangeResult: function (id, data, event) {
                if (event.target.checked === true) {
                    if (data.selected.indexOf(id) < 0) {
                        data.selected.push(id);
                    }
                } else {
                    data.selected.remove(id)
                }
                data.p_selected = data.selected.length === data.list.length;
                this.dealWithTotal();
            },
            dealWithTotal(){
                this.totalCount = 0;
                let _this = this;
                this.datas.forEach(function (item,index) {
                    _this.totalCount+=item.selected.length;
                })
            },
            submit() {
                let ids = "";
                for (let i = 0;i<this.datas.length;i++){
                    if(this.datas[i].selected.length>0){
                        ids+=this.datas[i].selected+",";
                    }
                }
                this.$router.push({
                    path: '/comment_issue',
                    query:{
                        ids:ids
                    }
                });
            },
        }
    }
</script>

<style scoped>
    img {
        width: 1rem;
        height: 1rem;
    }

    .headimg {
        width: 2rem;
        height: 2rem;
    }

    .all {
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #F6F6F6;
        box-sizing: border-box;
        padding: 0 1rem 0 1.2rem;
    }

    .all .left {
        display: flex;
        align-items: center;
        font-size: .75rem;
        color: #333333;
    }

    .all .left .check {
        margin-right: .4rem;
    }

    .all .right {
        font-size: .7rem;
        color: #8E8E93;
    }

    .unit .unit_all {
        width: 100%;
        height: 2.9rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ffffff;
        box-sizing: border-box;
        padding: 0 .8rem 0 1.2rem;
        border-bottom: 1px solid #F6F6F6;
    }

    .unit .unit_all .left {
        width: 84%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: .75rem;
        color: #333333;
    }

    .unit .unit_all .left .party_name {
        width: 84%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 2.9rem;
    }

    .unit .unit_all .left .check {
        margin-right: 1.2rem;
    }

    .unit .unit_all .right {
        font-size: .6rem;
        color: #8E8E93;
    }

    .unit .unit_unit {
        border-bottom: 1px solid #F6F6F6;
        padding: 0 .8rem 0 1.2rem;
        box-sizing: border-box;
    }

    .unit .unit_unit .one {
        display: flex;
        align-items: center;
        margin-top: 1.2rem;
        margin-bottom: 1.2rem;
    }

    .unit .unit_unit .one .check {
        margin: 0 1.2rem;

    }

    .unit .unit_unit .one .headimg {
        margin-right: .6rem;
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
        background: #ffffff;
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

    input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 18px;
        margin-right: 10px;
        position: relative;
    }

    .wrap {
        padding-bottom: 2.5rem;
    }
</style>