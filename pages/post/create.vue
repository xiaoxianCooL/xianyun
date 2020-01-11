<template>
  <div class="create">
    <el-container>
      <el-aside width="750px">
        <CreateWenbenyu/>
      </el-aside>
      <el-main width="200px">Main</el-main>
    </el-container>
  </div>
</template>

<script>
import CreateWenbenyu from "@/components/post/createWenbenyu.vue";

export default {
  components:{
    CreateWenbenyu
  }
}
</script>

<style lang="less" scoped>
.create {
  width: 1000px;
  margin: 20px auto;
}
</style>