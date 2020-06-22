<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html body{
  width: 100%;
  height: 100vh;
  
}
#app{
  height: 100vh;
  
}
.party_active .van-field__label{
  font-size: .75rem;
  color: #8E8E93;
}
.error_list .unit .van-radio__label--disabled{
  color: #333333!important;
}.error_list .unit .van-checkbox__label--disabled{
  color: #333333!important;
}
</style>
