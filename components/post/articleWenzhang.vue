<template>
  <div class="wenzhang">
    <!-- 文章部分 -->
    <div class="haha">
      <h1 id="biaoti">{{shuju.title}}</h1>
      <div class="yitiaoxian"></div>
      <div class="yuedu">
        <span>攻略: {{shuju.city&&shuju.city.created_at}}</span>
        <span>阅读: {{shuju.watch}}</span>
      </div>
      <div class="neiron" v-html="shuju.content"></div>
    </div>
    <!-- 功能部分 -->
    <div class="haha1">
      <div class="function">
        <!-- 评论 -->
        <div>
          <i class="iconfont">&#xe61c;</i>
          <p>评论(100)</p>
        </div>
        <!-- 未收藏 -->
        <div v-if="shoucan===false">
          <i class="iconfont">&#xe62a;</i>
          <p>收藏</p>
        </div>
        <!-- //成功收藏 -->
        <div v-if="shoucan===true">
          <i class="iconfont">&#xe618;</i>
          <p>已收藏</p>
        </div>
        <!-- 分享(暂无接口) -->
        <div>
          <i class="iconfont">&#xe60b;</i>
          <p>分享</p>
        </div>
        <!-- 未点赞 -->
        <div v-if="dianzan===false">
          <i class="iconfont">&#xe617;</i>
          <p>点赞(100)</p>
        </div>
        <!-- 成功点赞 -->
        <div v-if="dianzan===true">
          <i class="iconfont">&#xe609;</i>
          <p>已点赞</p>
        </div>
      </div>
    </div>
    <!-- 评论弹窗 -->
  </div>
</template>

<script>
// import "../../assets/icont.css";
export default {
  data() {
    return {
      shuju: {},
      shoucan: false,//是否收藏状态
      dianzan: false //是否点赞状态
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
.haha1 {
  padding: 40px 0px;
  width: 100%;
  // display: flex;
  .function {
    margin: 0 auto;
    display: flex;
    // flex: 1;
    // display: inline-block;
    width: 352px;
    div {
      display: flex;
      margin: 0px 20px;
      flex-direction: column;
      align-items: center;
      i {
        // flex: 0.25;
        color: orange;
        font-size: 28px;
        // display:
        // text-align: center;
        // padding: 0 auto;
      }
      p {
        font-size: 14px;
        color: #666;
        // text-align: center;
      }
    }
  }
}
</style>