import request from "../utils/request";

function login() {
  return request({
    url: "/intelligentCommunity/mobile/user/testLogin",
    method: "POST",
  });
}

//获取组织
function departsFromOwnerKey() {
  return request({
    url: "/intelligentCommunity/mobile/party/departsFromOwnerKey",
    method: "GET",

  });
}
//获取组织中的人员
function membersFromDepart() {
  return request({
    url: "/intelligentCommunity/mobile/party/membersFromDepart",
    method: "GET",

  });
}

//获取会议地点
function locationsFromUser() {
  return request({
    url: "/intelligentCommunity/mobile/party/locationsFromUser",
    method: "GET",

  });
}
//获取会议地点
function conferenceTypes() {
  return request({
    url: "/intelligentCommunity/mobile/party/conferenceTypes",
    method: "GET",

  });
}
//上传图片
function commonsFileUpload(file) {
  let fd = new FormData()
  fd.append('file', file)
  //   
  return request({
    url: "/intelligentCommunity/ftp/commonsFileUpload",
    method: "POST",
    data: fd
  });
}
//多张上传图片
// function commonsMultiFileUpload(file) {


//   let fd = new FormData()


//   fd.append('files', file)
//   return request({

//   timeout:5000,

//     url: "/intelligentCommunity/ftp/commonsMultiFileUpload",
//     method: "POST",
//     data: fd,

//   });
// }
//发起会议提交
function lunchConference(value) {
  return request({
    url: "/intelligentCommunity/mobile/party/lunchConference",
    method: "POST",
    data: {
      ...value
    }
  });
}


//获取会议地点
function experienceConferences(status) {
  return request({
    url: `/intelligentCommunity/mobile/party/experienceConferences/${status}`,
    method: "GET",

  });
}
//根据id获取会议信息id
function conference(id) {
  return request({
    url: `/intelligentCommunity/mobile/party/conference/${id}`,
    method: "GET",

  });
}

//提交心得体会
function uploadExperience(id, content) {
  return request({
    url: `/intelligentCommunity/mobile/party/uploadExperience/${id}`,
    method: "POST",
    data: {
      content
    }
  });
}
//提交会议记录
function uploadConferenceSummary(id, content) {
  return request({
    url: `/intelligentCommunity/mobile/party/uploadConferenceSummary/${id}`,
    method: "POST",
    data: {
      ...content
    }
  });
}

//会议纪要列表
function conferences(state) {
  return request({
    url: `/intelligentCommunity/mobile/party/summary/conferences/${state}`,
    method: "GET",

  });
}
//我的会议列表
function fourconferences(state) {
  return request({
    url: `/intelligentCommunity/mobile/party/conferences/${state}`,
    method: "GET",

  });
}


// 接受会议接口
//提交会议记录
function accept(id) {
  return request({
    url: `/intelligentCommunity/mobile/party/accept/${id}`,
    method: "POST",

  });
}

//评分
function review(id, reviewContent, effectEvaluation) {
  return request({
    url: "/intelligentCommunity/mobile/party/review",
    method: "POST",
    data: {
      conferenceId: id,
      reviewContent,
      effectEvaluation,
    }

  });
}
//申请请假

function askLeave(conferenceId, reason) {
  return request({
    url: "/intelligentCommunity/mobile/party/askLeave",
    method: "POST",
    data: {
      conferenceId,
      reason
    }

  });
}


//请假列表
function askLeaves(state) {
  return request({
    url: `/intelligentCommunity/mobile/party/askLeaves/${state}`,
    method: "GET",

  });
}
//修改表单
function updateConference(id, data) {
  return request({
    url: `/intelligentCommunity/mobile/party/updateConference/${id}`,
    method: "POST",
    data: {
      ...data
    }

  });
}
//修改表单
function askLeavexq(id) {
  return request({
    url: `/intelligentCommunity/mobile/party/askLeave/${id}`,
    method: "GET",


  });
}
//搜索接口
function search(status, value) {
  return request({
    url: `/intelligentCommunity/mobile/party/conferences/${status}?search=${value}`,
    method: "GET",
  });
}

//查询党员信息
function memberVerify(idCardNum, name) {
  return request({
    url: "/intelligentCommunity/mobile/party/memberVerify",
    method: "POST",
    data: {
      idCardNum,
      name
    }
  });
}

//修改电话号码
function membercellNum(cellNum) {
  return request({
    url: "/intelligentCommunity/mobile/party/member/cellNum",
    method: "PUT",
    data: {
      cellNum
    }
  });
}
//获取导航栏列表信息
function lessonTypes() {
  return request({
    url: "/intelligentCommunity/mobile/education/lessonTypes",
    method: "GET",

  });
}
//查询全部列表
function lessons() {
  return request({
    url: "/intelligentCommunity/mobile/education/lessons",
    method: "GET",

  });
}
//三会一课分类接口
function getAllTypeList() {
  return request({
    url: "/intelligentCommunity/mobile/party/getAllTypeList",
    method: "GET",

  });
}
//按照id查询内容
function lesson(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/lesson/${id}`,
    method: "GET",

  });
}
//按照id查询内容
function lessonsss(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/lesson/${id}?startStudy=1`,
    method: "GET",

  });
}
//按照id查询评论列表
function reviews(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/lesson/reviews?lessonId=${id}`,
    method: "GET",

  });
}

//评论接口
function reviewss(lessonId, content) {
  return request({
    url: "/intelligentCommunity/mobile/education/lesson/review",
    method: "POST",
    data: {
      lessonId,
      content
    }
  });
}

function reviewsss(makeUpId, content) {
  return request({
    url: "/intelligentCommunity/mobile/education/lesson/review",
    method: "POST",
    data: {
      makeUpId,
      content
    }
  });
}

//查询评论列表(补课)
function makeUps() {
  return request({
    url: "/intelligentCommunity/mobile/education/makeUps",
    method: "GET",

  });
}

//按照id查询评论列表(补课)
function bkconference(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/makeUp/conference/${id}`,
    method: "GET",

  });
}

function bkconferences(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/makeUp/conference/summary/${id}`,
    method: "GET",

  });
}
//按照id查询列表(补课)
function bklessons(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/lessons/${id}`,
    method: "GET",

  });
}
//按照id查询评论列表(补课)
function bkreviews(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/makeUp/reviews?makeUpId=${id}`,
    method: "GET",

  });
}
//计时记录学习时间
function incrementDuration(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/lesson/incrementDuration?lessonId=${id}`,
    method: "POST",
  });
}

function incrementDurationbk(id) {
  return request({
    url: `/intelligentCommunity/mobile/education/makeUp/conference/incrementDuration?makeUpId=${id}`,
    method: "POST",
  });
}

//按照id查询评论列表(补课)
function getOpinionList(state) {
  return request({
    url: `/intelligentCommunity/mobile/opinion/getOpinionList/${state}`,
    method: "GET",

  });
}

//提建议接口
function opinion(content) {
  return request({
    url: "/intelligentCommunity/mobile/opinion/saveAdvice",
    method: "POST",
    data: {

      content
    }
  });
}
//按照id查询党务公开
function getOpinionDetail(id) {
  return request({
    url: `/intelligentCommunity/mobile/opinion/getOpinionDetail/${id}`,
    method: "GET",

  });
}

//提建议接口
function saveAnswer(opinionId, answer) {
  return request({
    url: "/intelligentCommunity/mobile/opinion/saveAnswer",
    method: "POST",
    data: {
      opinionId,
      answer: JSON.stringify(answer)
    }
  });
}
// 获取所有党员
function membersGroupByDepartName() {
  return request({
    url: "/intelligentCommunity/mobile/party/memberIds",
    method: "GET",

  });
}

//党员公开首页列表搜索接口
function getPartyWorkList(title, type) {
  return request({
    url: "/intelligentCommunity/mobile/publicPartyWork/getPartyWorkList",
    method: "POST",
    data: {
      title,
      type
    }
  });
}

// 党务公开类型列表
function getPartyWorkTypeList() {
  return request({
    url: "/intelligentCommunity/mobile/publicPartyWork/getPartyWorkTypeList",
    method: "GET",

  });
}

//党员公开首页新建
function savePartyWork(somedata) {
  return request({
    url: "/intelligentCommunity/mobile/publicPartyWork/savePartyWork",
    method: "POST",
    data: {
    ...somedata
    }
  });
}


//id查询党务公开详情
//按照id查询党务公开
function getPartyWorkDetail(id) {
  return request({
    url: `/intelligentCommunity/mobile/publicPartyWork/getPartyWorkDetail/${id}`,
    method: "GET",

  });
}
// 已读未读列表查询
function getWatchList(id,flag) {
  return request({
    url: `/intelligentCommunity/mobile/publicPartyWork/getWatchList/${id}/${flag}`,
    method: "GET",

  });
}
// 点赞
function likePartyWork(id,flag) {
  return request({
    url: `/intelligentCommunity/mobile/publicPartyWork/likePartyWork/${id}/${flag}`,
    method: "GET",

  });
}
// 收藏
function collectPartyWork(id,flag) {
  return request({
    url: `/intelligentCommunity/mobile/publicPartyWork/collectPartyWork/${id}/${flag}`,
    method: "GET",

  });
}

//评论接口
function savePartyWorkComment(partyWorkId, content) {
  return request({
    url: "/intelligentCommunity/mobile/publicPartyWork/savePartyWorkComment",
    method: "POST",
    data: {
      partyWorkId,
      content
    }
  });
}
//党建相册 首页列表
function getPartyPhotosList({title, status,type}) {
  return request({
    url: "/intelligentCommunity/mobile/partyPhotos/getPartyPhotosList",
    method: "POST",
    data: {
      title,
      status,
      type
    }
  });
}
// 获取党建相册的分类
function getPartyPhotosTypeList() {
  return request({
    url:"/intelligentCommunity/mobile/partyPhotos/getPartyPhotosTypeList",
    method: "GET",
  });
}

//党建相册 创建
function savePartyPhotos(title, type,filesPath,memberIds) {
  return request({
    url: "/intelligentCommunity/mobile/partyPhotos/savePartyPhotos",
    method: "POST",
    data: {
      title, type,filesPath,memberIds
    }
  });
}


// 党建相册 详情页面
function getPartyPhotosDetail(id) {
  return request({
    url: `/intelligentCommunity/mobile/partyPhotos/getPartyPhotosDetail/${id}`,
    method: "GET",
  });
}

//党建相册 相册详情修改
function updatePartyPhotos(id,filesPath) {
  return request({
    url: "/intelligentCommunity/mobile/partyPhotos/updatePartyPhotos",
    method: "POST",
    data: {
      id,
      filesPath
    }
  });
}

//志愿服务首页列表展示
function getActivityList(type, title) {
  return request({
    url: `/intelligentCommunity/mobile/charitableActivity/getActivityList?type=${type}&title=${title}`,
    method: "GET",
  });
}
//志愿服务活动类型接口
function getActivityTypeList() {
  return request({
    url: '/intelligentCommunity/mobile/charitableActivity/getActivityTypeList',
    method: "GET",
  });
}

//志愿服务创建接口
function saveActivity(data) {
  return request({
    url: "/intelligentCommunity/mobile/charitableActivity/saveActivity",
    method: "POST",
    data: {
     ...data
    }
  });
}
// 党建相册 详情页面
function getActivityDetail(id) {
  return request({
    url: `/intelligentCommunity/mobile/charitableActivity/getActivityDetail/${id}`,
    method: "GET",
  });
}
// 党建相册 详情页面人员列表
function getJoinActivityPeopleList(id) {
  return request({
    url: `/intelligentCommunity/mobile/charitableActivity/getJoinActivityPeopleList/${id}`,
    method: "GET",
  });
}
// 党建相册 立即报名
function joinActivity(id) {
  return request({
    url: `/intelligentCommunity/mobile/charitableActivity/joinActivity/${id}`,
    method: "GET",
  });
}

function quickSignIn(id) {
  return request({
    url: `/intelligentCommunity/mobile/index/quickSignIn/${id}`,
    method: "GET",
  });
}
// 签到页面详情
function signInDetail(id) {
  return request({
    url: `/intelligentCommunity/mobile/party/signInDetail/${id}`,
    method: "GET",
  });
}
// 签到页面详情党员活动日
function EventDaysignInDetail(id) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/signInDetail/${id}`,
    method: "GET",
  });
}
// 签到页面立即签到
function updateSignIn(id,some) {
  return request({
    url: `/intelligentCommunity/mobile/party/updateSignIn/${id}/${some}`,
    method: "GET",
  });
}
// 签到页面立即签到
function EventDayupdateSignIn(id,some) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/updateSignIn/${id}/${some}`,
    method: "GET",
  });
}
// 签到页面立即签到
function signInPersonList(id) {
  return request({
    url: `/intelligentCommunity/mobile/party/signInPersonList/${id}`,
    method: "GET",
  });
}
//党员活动日签到
function EventDaysignInPersonList(id) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/signInPersonList/${id}`,
    method: "GET",
  });
}

//注册接口
function entrance_register(data) {
  return request({
    url: "/intelligentCommunity/mobile/user/entrance_register",
    method: "POST",
    data: {
      ...data
    }
  });
}
function testWxUse() {
  return request({
    url: "/intelligentCommunity/mobile/user/testWxUser",
    method: "POST",
  });
}
function getWxUserInSession() {
  return request({
    url: "/intelligentCommunity/mobile/user/getWxUserInSession",
    method: "POST",
  });
}
function getUserInSession() {
  return request({
    url: "/intelligentCommunity/mobile/user/getUserInSession",
    method: "POST",
  });
}
function entranceRegister(data) {
  console.log(data);
  return request({
    url: "/intelligentCommunity/mobile/user/entranceRegister",
    method: "POST",
    data: {
      ...data
    }
  });
}
function dictionary(data) {
  return request({
    url: `/hfcx_multi_project/manage/dictionary/search?key=${data}`,
    method: "POST",
    // data: {
    //   key:"qu"
    // }
  });
}
//党建联盟首页列表
function getAllianceActivities(start,search) {
  console.log(search);
  return request({
    url: `/intelligentCommunity//mobile/activity/getAllianceActivities/${start}`,
    method: "GET",
    params:{
      search
    }
  });
}
//home页首页列表
function getTodoList() {
  return request({
    url: "/intelligentCommunity/mobile/index/getTodoList",
    method: "GET",
  
  });
}
//home页首页列表
function getMemberIsAdministrator() {
  return request({
    url: "/intelligentCommunity/mobile/party/getMemberIsAdministrator",
    method: "GET",
  
  });
}
//home页首页列表
function getIsAdministrator() {
  return request({
    url: "/intelligentCommunity/mobile/party/getIsAdministrator",
    method: "GET",
  
  });
}


//党员活动新增
function EventDaylunchConference(value) {
  return request({
    url: "/intelligentCommunity/mobile/partyEventDay/lunchConference",
    method: "POST",
    data: {
      ...value
    }
  });
}

//党员活动日列表首页
function EventDayfourconferences(state) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/conferences/${state}`,
    method: "GET",

  });
}
//党员活动活动总结
function EventDayexperienceConferences(status) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/experienceConferences/${status}`,
    method: "GET",

  });
}
//党员活动日请假列表
function EventDayaskLeaves(state) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/askLeaves/${state}`,
    method: "GET",

  });
}

//党员活动日修改表单
function EventDayaskLeavexq(id) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/askLeave/${id}`,
    method: "GET",


  });
}

//党员活动日搜索接口
function EventDaysearch(status, value) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/conferences/${status}?search=${value}`,
    method: "GET",
  });
}

//根据id获取党员活动日信息id
function EventDayconference(id) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/conference/${id}`,
    method: "GET",

  });
}

// 接受会议接口
//提交会议记录
function EventDayaccept(id) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/accept/${id}`,
    method: "POST",

  });
}

//修改表单
function EventDayupdateConference(id, data) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/updateConference/${id}`,
    method: "POST",
    data: {
      ...data
    }

  });
}

function EventDayaskLeave(conferenceId, reason) {
  return request({
    url: "/intelligentCommunity/mobile/partyEventDay/askLeave",
    method: "POST",
    data: {
      conferenceId,
      reason
    }

  });
}

//提交心得体会
function EventDayuploadExperience(id, content,pic) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/uploadExperience/${id}`,
    method: "POST",
    data: {
      content,
      pic
    }
  });
}

// 快捷签到
function EventDayquickSignIn(id) {
  return request({
    url: `/intelligentCommunity/mobile/partyEventDay/quickSignIn/${id}`,
    method: "GET",
  });
}


export {
  EventDayquickSignIn,
  EventDayuploadExperience,
  EventDayupdateConference,
  EventDayaskLeave,
  EventDayaccept,
  EventDayconference,
  EventDaysearch,
  EventDayaskLeavexq,
  EventDayaskLeaves,
  EventDayexperienceConferences,
  EventDayfourconferences,
  getMemberIsAdministrator,
  getTodoList,
  departsFromOwnerKey,
  login,
  membersFromDepart,
  locationsFromUser,
  conferenceTypes,
  commonsFileUpload,
  lunchConference,
  experienceConferences,
  conference,
  uploadExperience,
  uploadConferenceSummary,
  conferences,
  fourconferences,
  accept,
  review,
  askLeave,
  askLeaves,
  updateConference,
  askLeavexq,
  search,
  memberVerify,
  membercellNum,
  lessonTypes,
  lessons,
  lesson,
  reviews,
  reviewss,
  makeUps,
  bkconference,
  bklessons,
  bkreviews,
  reviewsss,
  lessonsss,
  incrementDuration,
  bkconferences,
  incrementDurationbk,
  getOpinionList,
  opinion,
  getOpinionDetail,
  saveAnswer,
  membersGroupByDepartName,
  getPartyWorkList,
  getPartyWorkTypeList,
  savePartyWork,
  getPartyWorkDetail,
  getWatchList,
  likePartyWork,
  savePartyWorkComment,
  getPartyPhotosList,
  getPartyPhotosTypeList,
  savePartyPhotos,
  getPartyPhotosDetail,
  updatePartyPhotos,getActivityList,getActivityTypeList,
  saveActivity,getActivityDetail,getJoinActivityPeopleList,joinActivity,collectPartyWork,quickSignIn,signInDetail,EventDaysignInDetail,
  updateSignIn,signInPersonList,EventDaysignInPersonList,entrance_register,
  testWxUse,getWxUserInSession,entranceRegister,
  dictionary,getAllianceActivities,getAllTypeList,
  getIsAdministrator,getUserInSession,
  EventDaylunchConference,EventDayupdateSignIn
};