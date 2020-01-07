<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="passwords">
      <el-input placeholder="确认密码" type="password" v-model="form.passwords"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const rule_password=(rule,value,callback)=>{
      // console.log(rule); rule是当前规则 当前不需要用到
      // console.log(value); value 是输入框的值
      // console.log(callback); callback必须调用的回调函数
      //判断是否为空 是否与 密码一致
      if(value.trim() === ''){
        return callback(new Error("请再次输入密码!"))
      }else if(value !== this.form.password){
        return callback(new Error("两次输入的密码不一致!"))
      }else{
       callback()
      }
    }
    return {
      // 表单数据
      form: {
        username:"",
        nickname:"",
        captcha:"",
        password:"",
        passwords:""
      },
      // 表单规则
      rules: {
        username:[{ required:true,message:'请输入注册账号!',trigger:'blur'}],
        nickname:[{required:true,message:'请输入用户名!',trigger:'blur'}],
        captcha:[{required:true,message:'请输入验证码!',trigger:'blur'}],
        password:[{required:true,message:'请设置登录密码!',trigger:'blur'}],
        passwords:[{validator:rule_password,trigger:'blur'}]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // console.log('哎呀,我被点击了');
      //发送验证码前判断手机号码是否为空
      if(this.form.username.trim()==='') return this.$message.error('手机号码不能为空!');
      //发送请求把手机号传过去 获取验证码
      this.$store.dispatch('user/yanzhengma',this.form.username).then(res=>{
        // console.log(res)
        this.$message.success('验证码已经发送到手机上:'+'"'+res.data.code+'"')
      })
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form);
      //由于接口不需要再次输入的密码信息 在发送请求前把表单重新解构
      const {passwords,...newForm} = this.form;
      //
      this.$store.dispatch('user/zhuce',newForm).then(res=>{
        // console.log(res); true
        if(res){
          this.$message.success('注册成功!')
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>