//历史记录-搜索 vuex
//因为点击历史记录可以进行跳转到对应页面
//而跳转到对应页面需要5个参数 所以都要保存起来
export const state = () =>({
  lishijilu: []
})

export const mutations = {
  setlishijilu(state, data) {
    state.lishijilu.unshift(data);
  }
}
