<template>
  <div class="about">
      <div class="top">
        <div class="imgstyle">
          <img class="imgurl" :src="data.headimg" alt="">
        </div>
        <div class="textstyle">{{data.username}}</div>
      </div>
  </div>
</template>

<script>
import {getUserInSession} from '../../api/http'
export default {
  data() {
    return {
      data:{}
    }
  },
 async mounted() {
    let res  = await getUserInSession()
     this.data=res.details.data
  },
}
</script>

<style lang="less" scoped>
.about{
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
}
.top{
width: 100%;
height: 90px;
background-color: #FFF;
display: flex;
align-items: center;

}
.imgstyle{
  margin-right: 15px;
  width: 24%;
  display: flex;
justify-content: flex-end;
}
.imgurl{
  width: 60px;
  height: 60px;
  border-radius: 60px;
  
}
.textstyle{
  font-size: 16px;
  font-weight: 700;
}
</style>