<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item,index) in feiji"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <!-- 随便丢一个标签 让计算属性渲染页面 -->
    <div>{{shaixuan}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      // flight: [],
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      feiji: [
        { label: "歼20", value: "L" },
        { label: "歼15", value: "M" },
        { label: "轰炸机", value: "S" }
      ]
    };
  },
  computed: {
    shaixuan() {
      // if (!this.data.flights) return [];
      const arr = this.data.flights.filter(item => {
        //默认所有的机票都符合条件 然后通过判断筛选出符合条件的数据渲染到机票列表
        let valid = true;
        //判断选择了机场的时候 机场数据有 且遍历的数据中机场与之相同
        if (this.airport && item.org_airport_name !== this.airport) valid = false;
        //起飞时间
        if (this.flightTimes) {
          const [from,to] = this.flightTimes.split(',');
          let start = item.dep_time.split(':');
          if(start < from && start >= to) valid = false;
        }
        if (this.company && item.airline_name !== this.company) valid = false;
        if (this.airSize && item.plane_size !== this.airSize) valid = false;
          //返回 valid经过判断为false的数据
          return valid;
      });
        // 发射事件到父组件 并把参数带过去
        this.$emit("zitype",arr);
        //在页面调用的时候显示一个空字符
        return "";
    }
  },
  methods: {
    // // 选择机场时候触发
    // handleAirport(value) {
    //   // console.log(value)// 白云机场
    //   // console.log(this.data);

    //   // console.log(this.data.flights, "123"); //航班列表数据
    //   // if(!this.data.flights) return [];
    //   const arr = this.data.flights.filter(v => {
    //     // console.log(v);是数组的每一个元素
    //     return value === v.org_airport_name;
    //   });
    //   //发射事件 告诉父组件 数据被改了 并把数据传过去
    //   this.$emit("zitype", arr);
    // },

    // // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //   // console.log(value);// 6,12
    //   let time = value.split(","); //用户选择的规则
    //   // console.log(time); // ["6","12"]
    //   const arr = this.data.flights.filter(v => {
    //     let timeA = v.dep_time.split(":")[0]; /// ["06"]
    //     return +time[0] <= +timeA && +time[1] > +timeA;
    //   }); //6          06           12      06

    //   //传值
    //   this.$emit("zitype", arr);
    // },

    // // 选择航空公司时候触发
    // handleCompany(value) {
    //   // console.log(value);
    //   const arr = this.data.flights.filter(v=>{
    //     return value === v.airline_name
    //   })
    //   this.$emit("zitype",arr)
    // },

    // // 选择机型时候触发
    // handleAirSize(value) {
    //   console.log(value);
    //   const arr = this.feiji.filter(v=>{
    //     return value === v.value
    //   })

    //   this.$emit("zitype",arr)
    // },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>