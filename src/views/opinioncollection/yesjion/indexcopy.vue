<template>
  <div>
    <ul>
      <li v-for="(items, indexs) in radioDatalist" :key="indexs">
        <label class="mui-col-xs-3 mui-col-sm-3">{{ items.name }}：</label>
        <div class="list flex-row mui-col-xs-9 mui-col-sm-9" style="flex-wrap: wrap;">
          <div
            class="mui-input-row mui-radio mui-left"
            v-for="(item, index) in items.data"
            :key="index"
          >
            <label>{{ item.name }}</label>
            <!-- v-model的值按循环来讲我是要用 items.val的值，但是这样写不会生效，不会关联到Vue里设置的那三个值 zaobanwanban，abcban，productModel-->
            <!-- 仔细想想这样设置也不合理，要不然有很多类型的单选框那就要在vue里定义很多变量，所以想到使用数组形式，这样是最合理的（自己的推想） -->
            <!-- <input type="radio" :value="item.val" v-model="items.val" :name="items.val"> -->
            <input type="radio" :value="item.val" v-model="list[indexs]" :name="items.val" />
          </div>
        </div>
      </li>
    </ul>
    <div @click="get">lalal </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioDatalist: [
        {
          name: "白晚班",
          val: "zaobanwanban",
          data: [
            { name: "白班", val: 0 },
            { name: "晚班", val: 1 }
          ]
        },
        {
          name: "班次",
          val: "abcban",
          data: [
            { val: "A", name: "A班" },
            { val: "B", name: "B班" },
            { val: "C", name: "C班" }
          ]
        },
        {
          name: "产品型号",
          val: "productModel",
          data: [
            { name: "φ19", val: 19 },
            { name: "φ22", val: 22 },
            { name: "φ25", val: 25 },
            { name: "φ28", val: 28 },
            { name: "φ32", val: 32 }
          ]
        }
      ],
     
      list:[]
    };
  },
  methods: {
     get(){
        console.log( this.list);
        
     } 
  },
};
</script>

<style>
</style>