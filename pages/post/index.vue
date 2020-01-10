<template>
  <div class="contianer1">
    <el-container>
      <el-aside width="250px">
        <!-- 侧边栏菜单组件 -->
        <StrategyCaidan />
        <!-- 侧边栏推荐城市组件 -->
      </el-aside>
      <el-main>
        <!-- 内容部分搜索攻略组件 -->
        <StrategyNeiron />
        <!-- 推荐攻略组件 -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import StrategyCaidan from "@/components/post/strategyCaidan.vue";
import StrategyNeiron from "@/components/post/strategyNeiron.vue";
export default {
  data() {
    return {};
  },
  components: {
    StrategyCaidan,
    StrategyNeiron
  }
};
</script>

<style lang="less" scoped>
.contianer1 {
  position: relative;
  width: 1000px;
  margin: 20px auto;
}
/deep/ .el-main {
  padding: 0px 0px 0px 30px !important;
}
</style>