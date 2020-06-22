<template>
  <div class="amap-wrapper">
    <div id="container"></div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  data() {
    return {
      m:0
,
n:0    };
  },
  mounted() {

    this.init();
  },
  methods: {
    init() {
      let location= this.$route.query.location
      let a=location.split(",")
    // console.log(location);
    console.log(parseFloat(a[0]),parseFloat(a[1]));
    //  parseFloat(a[0]),parseFloat(a[1])
  this.m=parseFloat(a[0])
   this.n=parseFloat(a[1])
      var marker = new AMap.Marker({
        position: new AMap.LngLat(this.m,this.n), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });

      let map = new AMap.Map("container", {
        center: [this.m, this.n],
        resizeEnable: true,
        zoom: 15
      });
      map.add(marker);
    }
  }
};
</script>


 <style lang="less" scoped>
.amap-wrapper {
  width: 100%;
  height: 100vh;
  #container {
    width: 100%;
    height: 100vh;
  }
}
</style>

<style lang="less">
.amap-logo {
  opacity: 0;
}
.amap-copyright {
  opacity: 0;
}
</style>