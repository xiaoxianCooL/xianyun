//历史记录-搜索 vuex
//因为点击历史记录可以进行跳转到对应页面
//而跳转到对应页面需要5个参数 所以都要保存起来
export const state = () =>({
  //机票历史搜索记录
  lishijilu: [],
  //订单总金额
  jiage:0
})

export const mutations = {
  //存储机票历史搜索记录的方法
  setlishijilu(state, data) {
    state.lishijilu.unshift(data);
  },
  //存储订单总金额的方法
  setdingdanjine(state,data){
    state.jiage=data;
  }
}
