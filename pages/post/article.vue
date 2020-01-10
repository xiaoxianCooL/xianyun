<template>
  <div class="article">
    <el-container>
      <!-- left结构 -->
      <el-aside width="700px">
        <!-- 页眉部分 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <articleWenzhang />
      </el-aside>
      <el-main>
        <articleXiangguan />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import articleWenzhang from "@/components/post/articleWenzhang.vue";
import articleXiangguan from "@/components/post/articleXiangguan.vue";
export default {
  data() {
    return {};
  },
  components: {
    articleWenzhang,
    articleXiangguan
  }
};
</script>

<style lang="less" scoped>
.article {
  width: 1000px;
  margin: 20px auto;
}
/deep/ .el-main {
  padding: 0px 0px 0px 20px !important;
}
</style>