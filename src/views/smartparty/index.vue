<template>
    <div class="smartpartyindex">
        <div class="banner">
            <img src="@/img/party_alliance/party_banner.png" alt="">
        </div>
        <div class="module">
            <div class="title">
                <p class="line"></p>
                <p class="text">教育学习</p>
            </div>
            <div class="module_main">
                <router-link tag="div" to="/threemeeting" class="unit">
                    <img src="@/img/party_alliance/party_icon1.png" alt/>
                    <p class="textstyle">三会一课</p>
                </router-link>
                <router-link tag="div" to="/exam_list" class="unit">
                    <img src="@/img/party_alliance/party_icon2.png" alt/>
                    <p class="textstyle">在线考试</p>
                </router-link>
                <router-link tag="div" to="/onlinelearning" class="unit">
                    <img src="@/img/party_alliance/party_icon3.png" alt/>
                    <p class="textstyle">在线学习</p>
                </router-link>
                <router-link tag="div" to="/partyActivityDay" class="unit">
                    <img src="@/img/xmimg/activityday.png" alt/>
                    <p class="textstyle">党员活动日</p>
                </router-link>
            </div>

        </div>
       <div class="module cut" v-if="false">
           <div class="title">
               <p class="line"></p>
               <p class="text">党建联盟</p>
           </div>
           <div class="module_main">
               <router-link tag="div" to="/party" class="unit">
                   <img src="@/img/party_alliance/party_icon4.png" alt/>
                   <p class="textstyle">联盟活动</p>
               </router-link>
               <router-link tag="div" to="/service_need_list" class="unit">
                   <img src="@/img/party_alliance/party_icon5.png" alt/>
                   <p class="textstyle">服务需求</p>
               </router-link>
               <router-link tag="div" to="/resourcesharing" class="unit">
                   <img src="@/img/party_alliance/party_icon6.png" alt/>
                   <p class="textstyle">资源共享</p>
               </router-link>
               <router-link tag="div" to="/publicbenefit" class="unit">
                   <img src="@/img/party_alliance/party_icon7.png" alt/>
                   <p class="textstyle">公益项目</p>
               </router-link>
               <router-link tag="div" to="/map" class="unit">
                   <img src="@/img/party_alliance/party_icon8.png" alt/>
                   <p class="textstyle">组织分布</p>
               </router-link>
           </div>
       </div>
       <div class="module cut" v-if="false">
           <div class="title">
               <p class="line"></p>
               <p class="text">志愿服务</p>
           </div>
           <div class="module_main">
               <router-link tag="div" to="/volunteerserve" class="unit">
                   <img src="@/img/party_alliance/party_icon9.png" alt/>
                   <p class="textstyle">志愿服务</p>
               </router-link>
               <router-link tag="div" to="/openserve" class="unit">
                   <img src="@/img/party_alliance/party_icon10.png" alt/>
                   <p class="textstyle">发起服务</p>
               </router-link>
           </div>
       </div>
        <div class="module cut">
            <div class="title">
                <p class="line"></p>
                <p class="text">组织管理</p>
            </div>
            <div class="module_main">
                <router-link tag="div" to="/democratic_comment" class="unit">
                    <img src="@/img/party_alliance/party_icon11.png" alt/>
                    <p class="textstyle">民主评议</p>
                </router-link>
                <router-link tag="div" to="/opinioncollection" class="unit">
                    <img src="@/img/party_alliance/party_icon12.png" alt/>
                    <p class="textstyle">意见征集</p>
                </router-link>
                <router-link tag="div" to="/partyoppen" class="unit">
                    <img src="@/img/party_alliance/party_icon13.png" alt/>
                    <p class="textstyle">党务公开</p>
                </router-link>
                <router-link tag="div" to="/party_photo" class="unit">
                    <img src="@/img/party_alliance/party_icon14.png" alt/>
                    <p class="textstyle">党建相册</p>
                </router-link>
<!--                <router-link tag="div" to="" class="unit">-->
<!--                    <img src="@/img/party_alliance/party_icon15.png" alt/>-->
<!--                    <p class="textstyle">组织结构</p>-->
<!--                </router-link>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            gopage() {
                this.$router.push({path: '/threemeeting'})
            },
            goparty() {
                this.$router.push({path: '/party'})
            }
        },
    };
</script>

<style lang="less" scoped>
    .smartpartyindex {
        background: #F6F6F6;
        width: 100%;
        height: 100%;
    }

    .banner {
        width: 100%;
        height: 22.5vh;
    }

    .banner img {
        width: 100%;
        height: 100%;
    }

    .cut {
        margin-top: .5rem;
    }

    .module {
        width: 100%;
        background: #FFFFFF;
    }

    .title {
        width: 100%;
        height: 1.1rem;
        display: flex;
        align-items: center;
        padding: .8rem 0 .6rem 0;
    }

    .title .line {
        width: .1rem;
        height: .7rem;
        background: #F54133;
        margin-left: .8rem;
        margin-right: .6rem;
    }

    .title .text {
        font-size: .75rem;
        color: #333333;
    }

    .module_main {
        display: flex;
        flex-wrap: wrap;
    }

    .module_main .unit {
        width: 25%;
        height: 4.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .module_main .unit img {
        width: 2.2rem;
        height: 2.2rem;
    }

    .module_main .unit p {
        width: 100%;
        text-align: center;
        font-size: .6rem;
        color: #333333;
    }

    .submain {

    }

</style>