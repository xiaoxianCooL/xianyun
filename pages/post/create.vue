<template>
  <div class="create">
    <el-container>
      <el-aside width="750px">
        <CreateWenbenyu ref="CreateWenbenyu" :data="indexof" />
      </el-aside>
      <el-main width="200px">
        <div class="caogao">
          <h3>草稿箱({{vuexcaogao.length}})</h3>
          <div class="caogaos" v-for="(item,index) in vuexcaogao" :key="index" @click="duquvuex(index)">
            <span>
              {{item.title}}
              <i class="el-icon-edit"></i>
               <i class="el-icon-close" @click.stop="removevuex(index)"></i>
               </span>
            <p>{{item.time}}</p>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import CreateWenbenyu from "@/components/post/createWenbenyu.vue";
export default {
  data () {
    return {
    vuexcaogao:[], //vuex中的草稿箱数据
    arrlength:0,
    indexof:0
    }
  },
  mounted(){
    //获取vuex的数据 保存到空数组中渲染页面
    this.vuexcaogao = this.$store.state.post.caogao;
    // console.log(this.vuexcaogao);
  },
  components: {
    CreateWenbenyu
  },
  methods:{
    duquvuex(index){
      // 点击父盒子的时候把索引传给子组件 渲染对应的vuex组件到文本域中
      // this.$emit('clicktype',index) 好像不可以
      // this.indexof = index;
      // console.log(this.indexof);
      //调用子组件的事件 把索引传过去
      this.$refs.CreateWenbenyu.vuexuanran(index);
      // console.log(this.$store.state.post.caogao);
      
    },
    removevuex(index){
      // console.log(index);
      this.$confirm('此操作将永久删除该草稿, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除数据
          this.$store.commit('post/removevuex',index)
          //提示用户
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.create {
  width: 1000px;
  margin: 20px auto;
  .caogao{
    border: 1px solid #ccc;
    cursor:pointer;
    h3{
      font-weight: normal;
      font-size: 18px;
      color: #666;
      padding: 10px;
    }
    .caogaos{
      padding: 5px 15px;
      p{
        color: #666;
      }
    }
  }
}
</style>