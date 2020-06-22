<template>
    <div>
        <div class="unit">
            <div class="left">
                <img src="@/img/party_alliance/default_head.png" alt="">
                <p>{{name| addstar}}</p>
            </div>
            <p class="right">
                2020/02/28  15:00
            </p>
        </div>
        <div class="unit">
            <div class="left">
                <img src="@/img/party_alliance/default_head.png" alt="">
                <p>{{name| addstar}}</p>
            </div>
            <p class="right">
                2020/02/28  15:00
            </p>
        </div>
        <div class="unit">
            <div class="left">
                <img src="@/img/party_alliance/default_head.png" alt="">
                <p>{{name| addstar}}</p>
            </div>
            <p class="right">
                2020/02/28  15:00
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name:'张晓'
            };
        },

        methods: {

        }
    }
</script>
<style scoped>
.unit{
    width: 100%;
    height: 3.2rem;
    box-sizing: border-box;
    padding: .6rem .8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #F6F6F6;
    font-size: .65rem;
}
.unit .left{
    display: flex;
    align-items: center;
}
.unit .left img{
    width: 2rem;
    height: 2rem;
    color: #333333;
    margin-right: .5rem;
}
.unit .right{
    color: #8E8E93;
}
</style>
