<template>
  <div class="smartparty">
    <!-- 智慧党建首页 -->
    <div class="hometop"></div>
    <div class="nav">
      <div class="navitem">
        <div class="study">学习教育</div>
        <van-grid icon-size="30">
          <van-grid-item
            icon="https://img.yzcdn.cn/vant/apple-3.jpg"
            to="/threemeeting"
            text="三会一课"
          />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="思想汇报" />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="在线学习" />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="教育考试" />
        </van-grid>
      </div>
      <div class="navitem">
        <div class="study">党建联盟</div>
        <van-grid icon-size="30">
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="三会一课" />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="思想汇报" />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="在线学习" />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="教育考试" />
        </van-grid>
      </div>
      <div class="navitem">
        <div class="study">组织管理</div>
        <van-grid icon-size="30">
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="三会一课" />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="思想汇报" />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="在线学习" />
          <van-grid-item icon="https://img.yzcdn.cn/vant/apple-3.jpg" text="教育考试" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    dopage(idpage) {
      if (idpage == 1) {
        this.$router.push({ path: "../threemeeting" });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hometop {
  width: 100%;
  height: 26vh;
  background-color: red;
}
.nav {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  // height: 50vh;
//   background-color: aqua;
}
.navitem {
  width: 100%;
  height: 33.33%;
  margin-bottom: 8px;
}
.study {
  width: 100%;
  height: 20px;
  line-height: 20px;
  border-left: 2px solid red;
  padding-left: 10px;
  box-sizing: border-box;
  margin-bottom: 8px;
}

.icoclickitem {
  width: 25%;
  height: 100%;
}
</style>