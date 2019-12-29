export const state = {
  //采用了数据返回的结构
  token: '',
  userInof: {}
}

//同步
export const mutations = {
  //第一个参数必须是state 第二个参数是传进来的值
  setUserInof(state, data) {
    state.userInof = data
  }
}

//异步
export const actions = {
  //封装可能复用多次的登录方法 同时要修改userInof 只有这样才能利用this.$store渲染子组件
  login(store, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    }).then(res => {
      // console.log(res)
      //登录成功 调用同步方法 更新state下的userInof的值
      store.commit('setUserInof', res.data)
      //返回的这个值 用于判断作用 提示用户登录成功
      return true;
    })
  }
}
