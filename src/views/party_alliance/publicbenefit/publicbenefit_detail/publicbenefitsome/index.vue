<template>
  <!-- 提供资源 -->
  <div class="provideresources">
    <div class="unit">
      <div class="kzheight">
        <p class="title">资源名称</p>
        <van-field  v-model="need_name" type="textarea" rows="1"  placeholder="教育（含亲子阅读、读书分享）" />
      </div>

      <p class="title">资源内容</p>
      <van-field  v-model="need_content" type="textarea" rows="2" placeholder="单位名称单位名称单位名称单位名称单位名称" />
    </div>
    <div class="line"></div>
    <van-field v-model="tel"  class="linebtm"  input-align="right" label="联系方式"  placeholder="如：李先生 15568457832"/>
     <div class="foot">
        <div class="btn">
            申请加入
        </div>
     </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            need_name:"",
            need_content:"",
            tel:"",
        }
    },
};
</script>

<style lang="less" scoped>
.unit {
  border-bottom: 1px solid #f6f6f6;
  background: #fff;
}
.title {
  font-size: 0.75rem;
  padding-left: 0.8rem;
  padding-top: 0.6rem;
  color: #8e8e93;
}
.kzheight{
 border-bottom:1px solid #f6f6f6;
}
.line{
  width: 100%;
  height: 0.5rem;
  background-color: #f6f6f6;

}
.provideresources{
    width: 100%;
    min-height: 100vh;
    background-color: #f6f6f6;
}
.linebtm{
    margin-bottom: 1.5rem;
}
.foot{
    width: 100%;
    height: 2.2rem;
    padding: 0 0.8rem;
    box-sizing: border-box;
    .btn{
        width: 100%;
        height: 100%;
        background-color: #F54133;
        border-radius:0.3rem;
        text-align: center;
        line-height: 2.2rem;
        color: #FFFFFF;
        font-size: 0.85rem;
    }
}
</style>
<style lang="less">
.provideresources{
   .kzheight{
       
     .van-field--min-height .van-field__control {
    min-height: 0px;
}
 }
}

</style>