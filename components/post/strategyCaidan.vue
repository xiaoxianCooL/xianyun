<template>
  <div>
    <div class="haha">
      <div class="List" @mouseenter="enter" @mouseleave="leave">
        <span>热门城市</span>
        <i class="el-icon-arrow-right"></i>
      </div>

      <div class="List" @mouseenter="enter" @mouseleave="leave">
        <span>热门城市</span>
        <i class="el-icon-arrow-right"></i>
      </div>

      <div class="List" @mouseenter="enter" @mouseleave="leave">
        <span>热门城市</span>
        <i class="el-icon-arrow-right"></i>
      </div>

      <div class="List" @mouseenter="enter" @mouseleave="leave">
        <span>热门城市</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>

    <div class="List_s" v-show="anpai" @mouseenter="enter" @mouseleave="leave">
      <div class="List_s_item">
        <a href="#">
          <i>1</i>
          <span class="span1">北京</span>
          <span class="span2">世界著名古都和现代化国际城市</span>
        </a>
      </div>
      <div class="List_s_item">
        <a href="#">
          <i>2</i>
          <span class="span1">广州</span>
          <span class="span2">世界著名古都和现代化国际城市</span>
        </a>
      </div>
      <div class="List_s_item">
        <a href="#">
          <i>3</i>
          <span class="span1">上海</span>
          <span class="span2">世界著名古都和现代化国际城市</span>
        </a>
      </div>
      <div class="List_s_item">
        <a href="#">
          <i>4</i>
          <span class="span1">成都</span>
          <span class="span2">世界著名古都和现代化国际城市</span>
        </a>
      </div>
      <div class="List_s_item">
        <a href="#">
          <i>5</i>
          <span class="span1">西安</span>
          <span class="span2">世界著名古都和现代化国际城市</span>
        </a>
      </div>
    </div>

    <div class="haha2">
      <h3>推荐城市</h3>
      <a href="#">
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt width="100%" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anpai: false
    };
  },
  methods: {
    enter() {
      this.anpai = true;
    },
    leave() {
      this.anpai = false;
    }
  }
};
</script>

<style lang="less" scoped>
.haha {
  position: relative;
  border: 1px solid #ccc;
  border-right: none;
  border-bottom: none;
  // padding: 0 20px;
  .List {
    // width: 100%;
    flex: 1;
    height: 40px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    box-shadow: 0 0 1px #f5f5f5;

    span {
      line-height: 40px;
      box-sizing: border-box;
      font-size: 14px;
      display: inline-block;
      text-align: center;
      // margin: 0px 40px 0px 20px;
      padding: 0px 133px 0px 20px;
    }
    i {
      font-size: 24px;
      line-height: 38px;
      // text-align: center;
      display: inline-block;
      // width: 20px;
      // height: 20px;
      color: #ccc;
      // margin-left: 10px;
    }
  }
}
//右侧二级菜单
.List_s {
  position: absolute;
  top: 80px;
  left: 509px;
  width: 300px;
  border: 1px solid #ccc;
  // background-color: red;
  z-index: 999;
  .List_s_item {
    height: 40px;
    line-height: 40px;
    a {
      text-decoration: none;
      i {
        color: #ffa500;
        font-size: 20px;
        font-style: oblique;
        padding-left: 15px;
      }
      .span1{
        font-size: 14px;
        color: #ffa500;
        padding-left: 8px;
        padding-right: 8px;
      }
      .span2{
        font-size: 14px;
        color: #999;
      }
    }
  }
}
.haha2 {
  h3 {
    // height: 40px;
    margin-top: 15px;
    font-size: 18px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    font-weight: normal;
  }
  a {
    display: block;
    padding-top: 10px;
  }
}
</style>