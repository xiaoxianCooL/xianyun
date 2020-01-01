//因为这不是一个组件 所以查询文档得知引入方法才可以调用
import { Message } from 'element-ui';
// 这个回调函数一般返回一个nuxt顶级对象 只要在nuxt.config.js中引入 都可以在这个对象调用
export default ({$axios})=>{
    // console.log($axios);
    //axios它有一个文档没有说明的错误拦截方法.onError错误拦截方法
    //该方法返回一个结果res
    $axios.onError(res=>{
        //response下还有一个js原生Error对象属性
        // console.log(res.response);
        const {statusCode,message} =res.response.data
        // console.log(statusCode);
        // console.log(message);
        if(statusCode===400){
            Message.error(message)
        }
    })
    // console.log(onError);
    
}