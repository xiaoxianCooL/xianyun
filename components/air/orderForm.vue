<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="baoxianid(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
      <!-- <div>{{data}}</div> -->
    </div>
    <span>{{jine}}</span>
  </div>
</template>

<script>
export default {
  //接收父组件传过来这个机票的数据
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ], //用户列表
      insurances: [], //保险id
      contactName: "", //联系人名字
      contactPhone: "", //联系人电话
      captcha: "", //手机验证码
      invoice: false, //是否需要发票
      seat_xid: "", //座位id
      air: 0, //航班id
    }

  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users = [
        //往数组里push也可以
        ...this.users,
        {
          username: "",
          id: ""
        }
      ];
      // console.log(this.users)
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    //保险id处理
    baoxianid(id) {
      // console.log(id)
      //获取保险id
      //判断这个数组是否已经有这个id了
      const index = this.insurances.indexOf(id);
      if (index > -1) {
        //返回-1证明没有这个元素 大于-1证明存在这个元素 那就将这个元素删除 因为同一个保险不能买多份
        this.insurances.splice(index, 1);
      } else {
        //没有该元素点击就应该添加(id)
        this.insurances.push(id);
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      //判断手机号码是否为空,为空不能发送验证码
      if (!this.contactPhone)
        return this.$message.error("手机号码为空,请重新输入!");

      this.$store.dispatch("user/yanzhengma", this.contactPhone).then(res => {
        this.$message.success("手机验证码发送成功:000000");
      });
    },

    // 提交订单
    handleSubmit() {

      
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        invoice: this.invoice,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      // console.log(data)
      //模拟提示用户 订单正在生成中
      this.$message({
        type: "success",
        message: "正在生成订单请稍后!"
      });
      //参数凑齐  调取接口提交订单
      // console.log(this.$store.state.user.token);
      this.$axios({
        url: "/airorders",
        method: "POST",
        data,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInof.token
        }
      }).then(res => {
        // console.log(res);
        this.$message.success(res.data.message);
        //解构res中的data中的data对象的订单id属性
        const {data:{id}}=res.data;
        this.$message.success("正在为您跳转付款页面,请稍后!")
        //跳转页面 把订单id带过去
        this.$router.push({
          path:'/air/pay',
          query:{
            id
          }
        })
      });
    },
  },
  //计算订单金额 并传到vux给侧边栏读取渲染
  computed:{
    jine(){
      if(!this.data.seat_infos.par_price) return;
      //机票价格
      let jiage = 0;
      //乘机人 数量
      let chengjiren = this.users.length;
      //机票价格
      jiage += this.data.seat_infos.par_price;
      // 机建燃油费
      jiage += this.data.airport_tax_audlet;
      //保险
      jiage += this.insurances.length*30
      //+上乘机人人数
      jiage *= chengjiren;
      //储存到vuex中 让侧边栏读取渲染
      this.$store.commit('air/setdingdanjine',jiage)
      return ""
    }
  },
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>