<template>
    <div>
        <div class="unit" v-for="(item, index) in datalist" :key="index">
            <div class="left">
                <img src="@/img/party_alliance/default_head.png" alt="">
                <p>{{item.name}}</p>
            </div>
            <p class="right">
                {{item.departName}}
            </p>
        </div>
     
     
    </div>
</template>
<script>
import {getJoinActivityPeopleList} from '@/api/http'
    export default {
        data() {
            return {
                name:'张晓',
                datalist:[]
            };
        },

        methods: {

        },
      async mounted() {
            let res = await getJoinActivityPeopleList(this.$route.query.id)
           this.datalist=res.details.data
        },
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
