
export const state = ()=>({
  //储存写游记草稿数据 
  caogao:[]
})

export const mutations= {
  //增加文章
  setcaogao(state,data){
    state.caogao.unshift(data);
  },
  //删除文章数据
  removevuex(state,index){
    state.caogao.splice(index,1)
  }
}