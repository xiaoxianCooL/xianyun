<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in ListB" :key="index" :data="item"/>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  data() {
    return {
      //航班的总数据
      ListA:{},
      //因为要遍历生成返回的机票列表数组 所以要定义一个数组接收 单独定义出来 是因为需要给数据分页
      ListB:[]
    };
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted(){
    // console.log(this.$route.query);
    
    this.$axios({
      url:"/airs",
      params:this.$route.query
    }).then(res=>{
      // console.log(res);

      //因为接口一次性返回所有数据 我们用一个对象去接收他 再把数据渲染
      this.ListA=res.data
      //把返回的数据对象 中的数组储存到这个空数组中 循环遍历动态生成组件
      this.ListB=this.ListA.flights
            console.log(this.ListB);
    })
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>