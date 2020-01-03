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
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
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
      ListA:{
        info: {},
        options: {},
        flights:[]
      },
      //因为要遍历生成返回的机票列表数组 所以要定义一个数组接收 单独定义出来 是因为需要给数据分页
      // ListB:[],
      pageIndex:1,//页
      pageSize:5,  //显示条数
      total:0
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
      // this.ListB=this.ListA.flights
      // console.log(this.ListB);
      this.total=this.ListA.total
      // console.log(this.ListA.total);
    })
  },
  computed:{
    //只要函数中引用的实例发生了变化 就会触发此函数
    ListB(){
      // console.log(this.ListA.flights)
      //计算分页的数据 截取数据
      return this.ListA.flights.slice( (this.pageIndex-1) * this.pageSize , this.pageIndex * this.pageSize)
    }
  },
  methods:{
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageIndex=val
      }
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