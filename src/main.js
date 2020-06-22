import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/static/css/cssreset.css'
import VeeValidate, {
  Validator
} from 'vee-validate'

// const config = {
//   errorBagName: 'errorBags', // change if property conflicts.
//   fieldsBagName: 'fieldBags',
//   events:""
// };
// Vue.use(VeeValidate, config);

import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.prototype.domain = "http://www.ahshequ.cn";
// Vue.prototype.domain = "https://www.0551cx.com";

//veevalidatey 语言包
import zh_CN from "vee-validate/dist/locale/zh_CN.js";
import dayjs from "dayjs";
// 导入 dayjs 的语言包
import "dayjs/locale/zh-cn";
dayjs.locale('zh-cn')

Vue.use(Vant);
Vue.config.productionTip = false

Vue.use(VeeValidate, {
  events: ""
});


 

Vue.filter('addstar', (str) => {
  var len = str.length - 2;
  var xing = '';
  if (len == 0) {
    xing = '*';
    return str.substring(0, 1) + xing;
  } else if (len == 1) {
    for (var i = 0; i < len; i++) {
      xing = '*';
    }
    return str.substring(0, 1) + xing + str.substring(str.length - 1);
  } else if (len > 1) {
    for (var i = 0; i < len; i++) {
      xing = '**';
    }
    return str.substring(0, 1) + xing + str.substring(str.length - 1);
  } else if (len < 0) {
    return str
  }
});
//中国标准时间转年月日
Vue.filter('timechange', (str) => {
  var d = new Date(str);
  // return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
});
Vue.filter('some', (str) => {
  if(str==0){
    return "不签到"
  }
});

//使用语言包
Validator.localize('zh_CN', zh_CN)
//dayjs 加载原型
Vue.prototype.$d = dayjs
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

import AMap from 'vue-amap'

Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '	f712022942b6bb78a85728c7abf9a0e4',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')