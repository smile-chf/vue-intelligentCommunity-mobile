<template>
  <div class="resourcesharing">
    <van-search
      v-model="serchdata"
      shape="round"
      input-align="center"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <van-tabs v-model="active" title-active-color="#F54133" color="#F54133">
      <van-tab title="全部">
        <div class="allitem">
          <div class="listitem" @click="gonextpage">
            <div class="itemleft">
                <img src="../../../img/xmimg/otherzy.png" alt="" srcset="" style="width:100%;height:100%">
            </div>
            <div class="itemright">
              <div class="texttop">教育（含亲子阅读、读书分享）</div>
              <div class="textbottom">资源内容资源内容资源内容资源内资 源内容资源内容资源内容资源内内容 资源内容资源内容资源内容资源...</div>
            </div>
          </div>
          <div class="listitem">
            <div class="itemleft">
                <img src="../../../img/xmimg/otherzy.png" alt="" srcset="" style="width:100%;height:100%">
            </div>
            <div class="itemright">
              <div class="texttop">教育（含亲子阅读、读书分享）</div>
              <div class="textbottom">资源内容资源内容资源内容资源内资 源内容资源内容资源内容资源内内容 资源内容资源内容资源内容资源...</div>
            </div>
          </div>
          <div class="listitem">
            <div class="itemleft">
                <img src="../../../img/xmimg/otherzy.png" alt="" srcset="" style="width:100%;height:100%">
            </div>
            <div class="itemright">
              <div class="texttop">教育（含亲子阅读、读书分享）</div>
              <div class="textbottom">资源内容资源内容资源内容资源内资 源内容资源内容资源内容资源内内容 资源内容资源内容资源内容资源...</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serchdata: "",
      active: 0
    };
  },
  methods: {
    onSearch(val) {
      console.log(val);
    },
    gonextpage(){
        this.$router.push({path:"/publicbenefit_detail"})
    }
  }
};
</script>

<style lang="less" scoped>
.allitem {
  width: 100%;

  box-sizing: border-box;
  padding: 0 0.8rem;
  .listitem {
    width: 100%;
    height: 5.55rem;
    box-sizing: border-box;
    padding: 0.6rem 0 0.8rem 0;
    border-bottom: 1px solid #f6f6f6;
    display: flex;

    .itemleft {
      width: 6.9rem;
      height: 3.9rem;
      box-sizing: border-box;
      padding-right: 0.4rem;
    }
    .itemright {
      flex: 1;
      .texttop {
        font-size: 0.75rem;
        line-height: 1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .textbottom{
          font-size:0.65rem ;
          color: #8E8E93;
          line-height: 1rem;
           display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}
</style>
