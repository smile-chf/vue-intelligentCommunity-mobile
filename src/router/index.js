import Vue from 'vue'
import VueRouter from 'vue-router'
import party from './party'

Vue.use(VueRouter)

  const routes = [
    ...party,
    {
      path: "/",
      component: () => import("../views/tabbar"),
      redirect:"home",
      children: [
        {
          path: "home",
          component: () => import("../views/home")
        },
        {
          path: "about",
          component: () => import("../views/my")
        }
      ]
    },
    //智慧党建首页
    {
      path: "/smartparty",
      component: () => import("../views/smartparty"),

    },
    //三会一课
    {
      path: "/threemeeting",
      component: () => import("../views/threemeeting"),
    },
    //发起会议
    {
      path: "/sponsormeeting",
      component: () => import("../views/sponsormeeting"),
    },
    //会议记录
    {
      path: "/meetingrecord",
      component: () => import("../views/meetingrecord"),
    },
    //心得体会
    {
      path: "/moodrealize",
      component: () => import("../views/moodrealize"),
    },
    //填写心得体会
    {
      path: "/fillinmoodrealize",
      component: () => import("../views/fillinmoodrealize"),
    },
    //填写会议纪要
    {
      path: "/summary",
      component: () => import("../views/summary"),
    },
    //会议详情
    {
      path: "/detailedmetting",
      component: () => import("../views/detailedmetting"),
    },
    //请假页面
    {
      path: "/leave",
      component: () => import("../views/leave"),
    },
    //我的会议
    {
      path: "/mymetting",
      component: () => import("../views/mymetting"),
    },
    //发起请假页面
    {
      path: "/sponsorleave",
      component: () => import("../views/sponsorleave"),
    },
    //修改详情页面
    {
      path: "/detailedmettingchange",
      component: () => import("../views/detailedmettingchange"),
    },
    //身份验证页面
    {
      path: "/authentication",
      component: () => import("../views/authentication"),
    },
    //身份验证页面
    {
      path: "/checkinfo",
      component: () => import("../views/checkinfo"),
    },
    //在线学习
    {
      path: "/onlinelearning",
      component: () => import("../views/onlinelearning/index.vue"),
    },
    //课程简介页面
    {
      path: "/courseintroduction",
      component: () => import("../views/onlinelearning/courseintroduction/index.vue"),
    },
    //补课详情页面
    {
      path: "/catchuplearning",
      component: () => import("../views/onlinelearning/catchuplearning/index.vue"),
    },
    //开始学习页面
    {
      path: "/beginstu",
      component: () => import("../views/onlinelearning/beginstu/index.vue"),
    },
    
    {
      path: "/beginstutwo",
      component: () => import("../views/onlinelearning/beginstutwo/index.vue"),
    },
    //意见征集首页
    {
      path: "/opinioncollection",
      component: () => import("../views/opinioncollection/index.vue"),
    },
    //未参加详情答题
    {
      path: "/notjion",
      component: () => import("../views/opinioncollection/notjion/index.vue"),
    },
    //已参加详情答题
    {
      path: "/yesjion",
      component: () => import("../views/opinioncollection/yesjion/index.vue"),
    },
    //党务公开模块首页
    {
      path: "/partyoppen",
      component: () => import("../views/partyoppen/index.vue"),
    },
    //党务公开模块发布
    {
      path: "/oppenissue",
      component: () => import("../views/partyoppen/oppenissue/index.vue"),
    },
    //选择党员页面
    {
      path: "/checkparty",
      component: () => import("../views/partyoppen/oppenissue/checkparty.vue/index.vue"),
    },
    //党务公开 列表详情页面
    {
      path: "/partyitem",
      component: () => import("../views/partyoppen/partyitem/index.vue"),
    },
    
    //党务公开 人员列表查看
    {
      path: "/partyitemmorelist",
      component: () => import("../views/partyoppen/partyitem/partyitemmorelist"),
    },
    
    //党务公开 党员查看
    {
      path: "/checkphoto",
      component: () => import("../views/partyPhoto/checkphoto.vue"),
    },
    //志愿服务首页
    {
      path: "/volunteerserve",
      component: () => import("../views/volunteer/volunteerserve"),
    },
    //志愿服务详情页
    {
      path: "/volunteerserve_detial",
      component: () => import("../views/volunteer/volunteerserve/volunteerserve_detial/index.vue"),
    },
    //志愿服务发布活动
    {
      path: "/openserve",
      component: () => import("../views/volunteer/openserve/index.vue"),
    },
    //志愿服务活动人数
    {
      path: "/volpeoplist",
      component: () => import("../views/volunteer/volunteerserve/volunteerserve_detial/volpeoplist"),
    },
    {
      path: "/share",
      component: () => import("../views/detailedmetting/share.vue"),
    },
    {
      path: "/signin",
      component: () => import("../views/signin/index.vue"),
    },
    {
      path: "/signin_det",
      component: () => import("../views/signin/signin_det/index.vue"),
    },
    {
      path: "/signin_list",
      component: () => import("../views/signin/signin_list/index.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/register/index.vue"),
    },
    {
      path: "/punchSuccess",
      component: () => import("../views/punchSuccess/index.vue"),
    },
      // 资源共享
    {
      path: "/resourcesharing",
      component: () => import("../views/party_alliance/resourcesharing/index.vue"),
    },
      // 资源共享详情页
    {
      path: "/resourcesharing_detail",
      component: () => import("../views/party_alliance/resourcesharing/resourcesharing_detail/index.vue"),
    },
      //资源共享详情页 提供资源
    {
      path: "/provideresources",
      component: () => import("../views/party_alliance/resourcesharing/resourcesharing_detail/provideresources/index.vue"),
    },
      // 公益项目
    {
      path: "/publicbenefit",
      component: () => import("../views/party_alliance/publicbenefit/index.vue"),
    },
      // 公益项目详情页
    {
      path: "/publicbenefit_detail",
      component: () => import("../views/party_alliance/publicbenefit/publicbenefit_detail/index.vue"),
    },
      //公益项目详情页 提供资源
    {
      path: "/publicbenefitsome",
      component: () => import("../views/party_alliance/publicbenefit/publicbenefit_detail/publicbenefitsome/index.vue"),
    },
      //地图
    {
      path: "/map",
      component: () => import("../views/map/index.vue"),
    },
    
      //未注册
    {
      path: "/unregistered",
      component: () => import("../views/unregistered/index.vue"),
    },
    {
      path: "/backloglist",
      component: () => import("../views/home/backloglist"),
    },
     //党员活动日首页
    {
      path: "/partyActivityDay",
      component: () => import("../views/partyActivityDay/index.vue"),
    },
     //新增党员活动日
    {
      path: "/addActivityDaay",
      component: () => import("../views/partyActivityDay/addActivityDaay"),
    },
     //党员活动日活动总结
    {
      path: "/activityDaySummarize",
      component: () => import("../views/partyActivityDay/activityDaySummarize"),
    },
     //党员活动日活动总结未提交
    {
      path: "/notSummarize",
      component: () => import("../views/partyActivityDay/activityDaySummarize/notSummarize"),
    },
     //党员活动日活动总结已提交
    {
      path: "/alreadySummarize",
      component: () => import("../views/partyActivityDay/activityDaySummarize/alreadySummarize"),
    },
     //党员活动日活动请假
    {
      path: "/activityDayLeave",
      component: () => import("../views/partyActivityDay/activityDayLeave"),
    },
     //党员活动日活动请假
    {
      path: "/myActivityDay",
      component: () => import("../views/partyActivityDay/myActivityDay/index.vue"),
    },
     //党员活动日活动详情页
    {
      path: "/detailsMyActivityDay",
      component: () => import("../views/partyActivityDay/myActivityDay/detailsMyActivityDay"),
    },
     //党员活动日所有请假页面
    {
      path: "/allLeave",
      component: () => import("../views/partyActivityDay/allLeave"),
    },
    
    {
      path: "/shareActivity",
      component: () => import("../views/partyActivityDay/myActivityDay/detailsMyActivityDay/share.vue"),
    },
    {
      path: "/conferenceDetail",
      component: () => import("../views/conferenceDetail/index.vue"),
    },
    {
      path: "/partyEventDayDetail",
      component: () => import("../views/partyEventDayDetail/index.vue"),
    },
    

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
