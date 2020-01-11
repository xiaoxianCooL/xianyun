<template>
  <div class="create">
    <el-container>
      <el-aside width="750px">
        <CreateWenbenyu />
      </el-aside>
      <el-main width="200px">
        <div class="caogao">
          <h3>草稿箱(0)</h3>
          <div></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import CreateWenbenyu from "@/components/post/createWenbenyu.vue";
export default {
  components: {
    CreateWenbenyu
  }
};
</script>

<style lang="less" scoped>
.create {
  width: 1000px;
  margin: 20px auto;
  .caogao{
    border: 1px solid #ccc;
    h3{
      font-weight: normal;
      font-size: 18px;
      color: #666;
      padding: 10px;
    }
  }
}
</style>