//因为这不是一个组件 所以查询文档得知引入方法才可以调用
import {
  Message
} from 'element-ui';
// 这个回调函数一般返回一个nuxt顶级对象 只要在nuxt.config.js中引入 都可以在这个对象调用
export default (nuxt) => {
//   console.log(nuxt)
  // console.log($axios);
  //axios它有一个文档没有说明的错误拦截方法.onError错误拦截方法
  //该方法返回一个结果res
  nuxt.$axios.onError(res => {
    //response下还有一个js原生Error对象属性
    // console.log(res.response);
    const {
      statusCode,
      message
    } = res.response.data
    // console.log(statusCode);
    // console.log(message);
    if (statusCode === 400) {
      Message.error(message)
    }
    if (statusCode === 401) {
      Message.error("登录信息已过期,请重新登录!")
      //调用顶级对象nuxt中的重定向方法
      //参数1状态码
      //参数2跳转路由
      nuxt.redirect(200, "/user/login")
    }
  })
  // console.log(onError);
}
