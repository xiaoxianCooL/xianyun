<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // value 表单值
    //callback 回调函数
    const validatePass= (rule,value,callback) => {
      const rel=/^1[3-9][0-9]{9}$/;
      if(rel.test(value)){
        callback()
      }else{
        callback('手机号码格式错误了')
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted(){
// console.log(process)
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      // console.log(this.form);
      //表单二次验证
      // validate方法是elementui给el-form表单提供验证的函数
      // valid代表验证是否通过
      this.$refs["form"].validate(value=>{
        if(!value) return this.$message.error('必填项不能为空!请重新输入!');
        this.$store.dispatch("user/login",this.form).then(res=>{
          // console.log(res);
          if(res===true){
            this.$message.success('登录成功!返回上一个页面!')
            this.$router.back()
          }
        })
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