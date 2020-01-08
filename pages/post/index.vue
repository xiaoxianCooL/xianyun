<template>
  <div class="contianer">
    <el-container>
      <el-aside width="250px">
        <!-- 侧边栏菜单组件 -->
        <StrategyCaidan/>
        <!-- 侧边栏推荐城市组件 -->
        
      </el-aside>
      <el-main>
        <!-- 内容部分搜索攻略组件 -->
        <!-- 推荐攻略组件 -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import StrategyCaidan from "@/components/post/strategyCaidan.vue"
  export default {
    data() {
      return {
      }
    },
    components:{
      StrategyCaidan
    }
  };
</script>

<style>
.contianer{
  width: 1000px;
  margin: 20px auto;
}
</style>