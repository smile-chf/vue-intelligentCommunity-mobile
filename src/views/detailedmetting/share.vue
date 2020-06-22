<template>
    <div style="width: 100%;text-align: center;font-size: 36px">
        点击右上角按钮分享到微信朋友和朋友圈
    </div>
</template>

<script>
    export default {
        mounted() {
            let id = this.$route.query.id;
            // let type=this.$route.query.type
            let domain = this.domain;
            let timeStamp = new Date().getTime();
            let url = window.location.href;
            let _this = this;
            let meetingInfo = JSON.parse(window.localStorage.getItem("meetingInfo"));
            this.$axios.get("/intelligentCommunity/mobile/user/getSign?url=" + url).then(function (res) {
                wx.config({
                    debug: false,
                    appId: res.data.appid,
                    timestamp: res.data.timestamp,
                    nonceStr: res.data.nonce_str,
                    signature: res.data.signature,
                    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'updateAppMessageShareData']
                });
                _this.$axios.get("/intelligentCommunity/mobile/user/getUserInSession").then(function (res1) {
                    let parentArea = res1.data.details.data.parentarea;
                    let area = res1.data.details.data.area;
                    let areaLevel = res1.data.details.data.areaLevel;
                    wx.ready(function () {
                        //公共方法
                        var shareData = {
                            title: "会议主题："+meetingInfo.subject,
                            desc: "会议时间："+meetingInfo.conferenceDate,
                            link: domain + "/intelligentCommunity/mobile/user/skip?type=conferenceSharing&timeStamp=" + timeStamp + "&id=" + id + "&parentArea="+parentArea+"&area="+area+"&areaLevel="+areaLevel,
                            imgUrl: "https://www.0551cx.com/publicFileUpload/publicFiles/meeting.png",
                            success: function (res2) {
                                // alert("分享成功");
                            },
                            cancel: function (res2) {

                            }
                        };
                        //分享给朋友接口
                        wx.updateAppMessageShareData({
                            title: "会议主题："+meetingInfo.subject,
                            desc: "会议时间："+meetingInfo.conferenceDate,
                            link: domain + "/intelligentCommunity/mobile/user/skip?type=conferenceSharing&timeStamp=" + timeStamp + "&id=" + id + "&parentArea="+parentArea+"&area="+area+"&areaLevel="+areaLevel,
                            imgUrl: "https://www.0551cx.com/publicFileUpload/publicFiles/meeting.png",
                            trigger: function (res3) {

                            },
                            success: function (res3) {
                                // alert("分享成功");
                            },
                            cancel: function (res3) {

                            },
                            fail: function (res3) {

                            }
                        });
                        //分享到朋友圈接口
                        wx.onMenuShareTimeline(shareData);
                    });
                    //处理失败验证
                    wx.error(function (res4) {
                        // alert(JSON.stringify(res4));
                    });
                }).catch(function (err) {

                })

            }).catch(function (err) {

            });

        }
    }
</script>

<style>

</style>