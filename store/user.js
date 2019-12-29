export const state={
    userInof:{}
}

//同步
export const mutations = {
  //第一个参数必须是state 第二个参数是传进来的值
  setUserInof(state,data){
    state.userInof=data
  }
}

//异步
export const actions={
  //封装可能复用多次的登录方法 同时要修改userInof 只有这样才能利用this.$store渲染子组件
  login(state,data){
    return this.$axios({
      url:'/accounts/login',
      method:'POST',
      data
    }).then(res=>{
      console.log(res)
    })
  }
}
