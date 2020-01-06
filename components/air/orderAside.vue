<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{data.dep_date}}</div>
        <div>{{data.org_city_name}} - {{data.dst_city_name}}</div>
      </el-row>
      <el-row type="flex" justify="space-between" align="middle" class="info-step">
        <el-col :span="5" class="flight-airport">
          <strong>{{data.dep_time}}</strong>
          <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>--- {{rankTime}} ---</span>
          <span>{{data.airline_name}}{{data.flight_no}}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{data.arr_time}}</strong>
          <span>浦东机场T2</span>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>成人机票</span>
      <span>￥{{data.seat_infos.org_settle_price}}</span>
      <span>x1</span>
    </el-row>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>机建＋燃油</span>
      <span>¥{{data.airport_tax_audlet}}/人/单程</span>
      <span>x1</span>
    </el-row>
    <el-row type="flex" justify="space-between" align="middle" class="info-bar">
      <span>应付总额：</span>
      <span class="price">￥{{$store.state.air.jiage}}</span>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },

  computed: {
    rankTime() {
      // 数据还未请求回来
      if (!this.data.dep_time) return "";
      // 从对象中取出时间 字符串格式 22:50 20:30
      const arrtime = this.data.arr_time;
      const deptime = this.data.dep_time;
      //分割字符串 返回一个数组
      const arr = arrtime.split(":"); //['22','50']
      const dep = deptime.split(":"); //['20','30']
      // 转为分钟利于比较
      let shi = arr[0] * 60 + +arr[1];
      const fen = dep[0] * 60 + +dep[1];
      //判断如果fen大于shi 则认为到了第二天
      if (shi < fen) {
        shi += 24 * 60;
      }
      // 根据转换来的分钟计算相隔时间
      let xiangge = shi - fen;
      //转换回去
      let H = Math.floor(xiangge / 60);
      let M = xiangge % 60;
      //模板字符串写入
      return `${H}时${M}分`;
    }
  }
};
</script>

<style scoped lang="less">
/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}

.air-info {
  padding: 15px;

  .info-top {
    margin-bottom: 10px;
    > div:last-child {
      font-size: 14px;
    }
  }

  .info-step {
    .flight-airport {
      strong {
        display: block;
        font-size: 22px;
        font-weight: normal;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      text-align: center;
      font-size: 12px;
      color: #999;
      span {
        display: block;
      }
    }
  }
}

.info-bar {
  border-top: 1px #ddd dashed;
  padding: 10px 15px;
  font-size: 14px;
  color: #666;

  .price {
    font-size: 28px;
    color: orange;
  }
}
</style>