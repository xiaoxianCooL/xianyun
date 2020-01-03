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
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
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
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      // console.log(value)// 白云机场
      // console.log(this.data);

      // console.log(this.data.flights, "123"); //航班列表数据
      // if(!this.data.flights) return [];
      const arr = this.data.flights.filter(v => {
        // console.log(v);是数组的每一个元素
        return value === v.org_airport_name;
      });
      //发射事件 告诉父组件 数据被改了 并把数据传过去
      this.$emit("zitype", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // console.log(value);// 6,12
      let time = value.split(","); //用户选择的规则
      // console.log(time); // ["6","12"]
      const arr = this.data.flights.filter(v => {
        let timeA = v.dep_time.split(":")[0]; /// ["06"]
        return +time[0] <= +timeA && +time[1] > +timeA;
      }); //6          06           12      06

      //传值
      this.$emit("zitype", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // console.log(value);
      const arr = this.data.flights.filter(v=>{
        return value === v.airline_name
      })
      this.$emit("zitype",arr)
    },

    // 选择机型时候触发
    handleAirSize(value) {
      console.log(value);
      const arr = this.feiji.filter(v=>{
        return value === v.value
      })

      this.$emit("zitype",arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {}
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