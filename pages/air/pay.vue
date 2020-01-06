<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{data.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      //订单详情数据
      data: {},
      //定时器
      timer:false
    };
  },
  methods:{
    jiancha(){
    this.timer = setInterval(() => {
       this.$axios({
          url: "/airorders/checkpay",
          method: "POST",
          data: {
            id: this.data.id, //订单id
            nonce_str: this.data.price, //订单金额
            out_trade_no: this.data.orderNo //订单编号
          },
          headers: {
            Authorization: "Bearer " + this.$store.state.user.userInof.token
          }
        }).then(res=>{
          console.log(res)
          if(res.data.statusTxt !== "订单未支付"){
            //提示用户
            this.$message.success("支付成功!")
            console.log("支付成功");
            //停止定时器
            clearInterval(this.timer)
          }
        })
      }, 10000);
    }
  },
  mounted() {
    setTimeout(() => {
      const { id } = this.$route.query;
      // console.log(id);
      // console.log(this.$store.state.user.userInof.token);
      //请求二维码 和价格
      this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInof.token
        }
      }).then(res => {
        // console.log(res);
        this.data = res.data;
        // console.log(this.data);
        //生成二维码
        const erweima = document.getElementById("qrcode-stage");
        // console.log(erweima);
        //第一个参数为二维码dom元素
        //第二个参数为数据返回的二维码img的url
        //第三个参数为二维码图形配置
        QRCode.toCanvas(erweima, this.data.payInfo.code_url, {
          // this.$message.success("请付款!")
          width: 250
        });
        //检查支付状态
        this.jiancha()
      });
    }, 1);
  },
  //由于还没支付 就跳转别的页面 还在轮循请求 调用销毁钩子 销毁定时器 
  deactivated () {
    clearInterval(this.timer)
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>