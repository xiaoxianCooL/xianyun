<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="huanCun" @zitype="zitype" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in ListB" :key="index" :data="item" />
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      //航班的总数据
      ListA: {
        //初始化数据 传值给子组件
        info: {},
        options: {},
        flights: []
      },
      //缓存总航班的数据 即使总航班数据被过滤修改后 也不影响总数据
      huanCun: {
        info: {},
        options: {},
        flights: []
      },
      //因为要遍历生成返回的机票列表数组 所以要定义一个数组接收 单独定义出来 是因为需要给数据分页
      // ListB:[],
      pageIndex: 1, //页
      pageSize: 5, //显示条数
      total: 0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  watch:{
    $route (){
      this.huoqu()
    }
  },
  mounted() {
    // console.log(this.$route.query);

  this.huoqu();
  },
  computed: {
    //只要函数中引用的实例发生了变化 就会触发此函数
    ListB() {
      // if (arr) {

      // }
      // console.log(this.ListA.flights)
      //计算分页的数据 截取数据
      return this.ListA.flights.slice(
        (this.pageIndex - 1) * this.pageSize, //(1-1)X5 (2-1)X5
        this.pageIndex * this.pageSize //1X5   2X5
      );
    }
  },
  methods: {
    //封装获取信息
    huoqu(){
      this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      //因为接口一次性返回所有数据 我们用一个对象去接收他 再把数据渲染
      this.ListA = res.data;
      //把返回的数据对象 中的数组储存到这个空数组中 循环遍历动态生成组件
      // this.ListB=this.ListA.flights
      // 把总航班数据赋值给缓存数据保存 因为res赋值给了可以被过滤的ListA对象 因为是直接的地址的赋值  所以res.data改变 或者 ListA对象改变都会影响缓存的数据 所以我们要新建一个对象来保存 而不是保存地址
      this.huanCun = { ...res.data }; //解构数据给空对象 而不是赋值地址
      this.total = this.ListA.total;
      console.log(this.ListA);
    });
    },
    //接收子组件传过来的事件
    zitype(arr) {
      // console.log(arr);
      this.pageIndex = 1;  //输入用户选择筛选 应该从第一页开始浏览 而不是用户所在的当前页
      this.ListA.flights = arr;
      this.total = arr.length;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
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