<template>
  <div class="wenzhang">
    <div class="haha">
      <h1 id="biaoti">{{shuju.title}}</h1>
      <div class="yitiaoxian"></div>
      <div class="yuedu">
        <span>攻略: {{shuju.city&&shuju.city.created_at}}</span>
        <span>阅读: {{shuju.watch}}</span>
      </div>
      <div class="neiron" v-html="shuju.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shuju: {}
    };
  },
  mounted() {
    const id = this.$route.query.id;
    console.log(this.$route.query.id);

    this.$axios({
      url: "/posts",
      params: {
        id: id
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      const arr = data;
      console.log(arr);
      arr.forEach(item => {
        this.shuju = item;
      });
      console.log(this.shuju);
    });
  }
};
</script>

<style lang="less" scoped>
// .wenzhang {
//   height: 1500px;
//   background: pink;
// }
.haha {
  #biaoti {
    font-size: 32px;
    margin: 20px 0px;
  }
  .yitiaoxian {
    border-top: 1px solid #ccc;
  }
.yuedu {
    padding: 20px 20px;
    // justify-content: flex-end;
    text-align: right;
    color: #666;
  }
  /deep/ .neiron {
    p {
      // text-indent: 2em;
      span {
        img {
          width: 700px;
          margin: 10px 0px;
        }
      }
    }
  }
}
</style>