<template>
  <div>
    <div class="btns">
      <span :class="{btn:id===0}" @click="id=0">上课</span> 
      <span :class="{btn:id===1}" @click="id=1">摸鱼</span> 
      <span :class="{btn:id===2}" @click="id=2">下课</span>
    </div>

  <div v-show="id===0">
    <ul>
      <li>普通新闻1</li>
      <li>普通新闻2</li>
      <li>普通新闻3</li>
    </ul>
  </div>

<div v-show="id===1">
  <ul>
    <li>体育新闻1</li>
    <li>体育新闻2</li>
    <li>体育新闻3</li>
  </ul>
</div>

<div v-show="id===2">
  <ul>
    <li>娱乐新闻1</li>
    <li>娱乐新闻2</li>
    <li>娱乐新闻3</li>
  </ul>
</div>
  </div>
</template>

<script>
export default {
data(){
  return{
    arr:['上课','摸鱼','下课'],
    id:0
  }
},
methods:{
    add(id){
      // console.log('我被点击了');
      console.log(id);
      console.log(this.id);
    }
}
}
</script>

<style>
  span{
    width: 100px;
    height: 25px;
    text-align: center;
    display: inline-block;
    border: 1px solid #000;
  }
  .btn{
    width: 100px;
    height: 25px;
    text-align: center;
    display: inline-block;
    border: 1px solid red;
  }
  .btn1{
    width: 100px;
    height: 20px;
    display: none;
  }
  .btn2{
    width: 100px;
    height: 20px;
    border: 1px solid #000;
  }
</style>