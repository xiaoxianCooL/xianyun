<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="jipiaodata" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="jipiaodata" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue"
import OrderAside from "@/components/air/orderAside.vue"
export default {
  components:{
    OrderForm,
    OrderAside
  },
  data () {
    return {
      jipiaodata:{
        // airport_tax_audlet:"",
        seat_infos:{}
      }
    }
  },
  mounted(){
    //从机票页面跳转过来时 已经把id 和seat_xid 带过来了
    const {id,seat_xid} = this.$route.query;
    // console.log(id,"-----",seat_xid);
    //由于侧边栏计算组件 和 表单组件同时用到这个接口的数据 所以在父组件调接口最好
    this.$axios({
      url:'/airs/'+id,
      params:{
        seat_xid
      }
    }).then(res=>{
      // console.log(res);
      this.jipiaodata =res.data;
      console.log(this.jipiaodata)
    })
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>