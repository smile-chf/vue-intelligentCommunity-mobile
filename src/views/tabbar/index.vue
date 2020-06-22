<template>
  <div class="bar">
    <router-view></router-view>
    <!-- 底部 tabBar -->
    <van-tabbar route v-model="tabBarActive"  inactive-color="#000" style="height:50px">
      <van-tabbar-item to="/home" >
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" style="height:34px"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/about">
       <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon1.active : icon1.inactive" style="height:34px"/>
        </template>
      
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tabBar 的激活
      tabBarActive: 0,
        icon: {
        active: require('../../img/xmimg/zu9-2x-1.png'),
        inactive: require('../../img/xmimg/nohome.png')
      },
        icon1: {
        active: require('../../img/xmimg/okmanico.png'),
        inactive: require('../../img/xmimg/zu12-2x.png')
      }
    };
  }
};
</script>

<style lang="less">
.bar{
  .van-tabbar-item__icon{
    margin-bottom:0
  }
}
</style>
