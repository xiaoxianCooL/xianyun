<template>
  <div class="caidan">
    <!-- 一级菜单 -->
    <div class="haha">
      <div
        class="List"
        @mouseenter="enter(index)"
        @mouseleave="leave(index)"
        v-for="(item,index) in chengshiliebiao" :key="index"
        :class="{haha3:id===index}"
      >
        <span>{{item.type}}</span>
        <i class="el-icon-arrow-right"></i>
        <!-- 二级菜单 -->
        <!-- <div class="List_s" v-show="anpai" @mouseenter="enter1" @mouseleave="leave1">
          <div class="List_s_item" v-for="(itemA,indexA) in item.children" :key="indexA">
            <a href="#">
              <i>{{indexA+1}}1111</i>
              <span class="span1">{{itemA.city}}11111</span>
              <span class="span2">{{itemA.desc}}11111</span>
            </a>
          </div>
        </div>-->
      </div>
    </div>
    <!-- 二级菜单 -->

    <div class="List_s" v-show="anpai" @mouseenter="enter1" @mouseleave="leave1">
      <div class="List_s_item" v-for="(item,index) in chengshicaidan" :key="index" :class="{haha4:id===index}" >
        <a href="#">
          <i>{{index+1}}</i>
          <span class="span1">{{item.city}}</span>
          <span class="span2">{{item.desc}}</span>
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
      anpai: false,
      //城市列表
      chengshiliebiao: [],
      //城市列表二级菜单
      chengshicaidan: [],
      id:999
    };
  },
  methods: {
    enter(index) {
      this.anpai = true;
      this.id=index;
      //获取当前城市的二级菜单
      // if(this.chengshicaidan) return {};
      this.chengshicaidan = this.chengshiliebiao[index].children;
      // console.log(this.chengshicaidan);
    },
    leave(index) {
      this.anpai = false;
      this.id=999;
    },
    enter1() {
      this.anpai = true;
    },
    leave1() {
      this.anpai = false;
    }
  },
  mounted() {
    //获取城市列表数据
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.chengshiliebiao = res.data.data;
      console.log(this.chengshiliebiao);

      // setTimeout(() => {
      // res.data.data.forEach((item,index)=>{
      // console.log(item[index]);
      // this.chengshicaidan = item[index].children
      // console.log(this.chengshicaidan);
      // })
      // }, 1);
      // console.log(this.chengshicaidan);
    });
  }
};
</script>

<style lang="less" scoped>
.caidan {
  .haha {
    // position: relative;
    border: 1px solid #ccc;
    border-right: none;
    border-bottom: none;
    z-index: 999;
    .List {
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
        padding: 0px 133px 0px 20px;
      }
      i {
        font-size: 24px;
        line-height: 38px;
        display: inline-block;
        color: #ccc;
      }
    }
  }
  //右侧二级菜单
  .List_s {
    position: absolute;
    top: 0px;
    left: 248px;
    width: 350px;
    // border: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: white;
    z-index: 9;
    .List_s_item {
      height: 40px;
      line-height: 40px;
      border-left: 1px solid #ccc;
      a {
        text-decoration: none;
        i {
          color: #ffa500;
          font-size: 20px;
          font-style: oblique;
          padding-left: 15px;
        }
        .span1 {
          font-size: 14px;
          color: #ffa500;
          padding-left: 8px;
          padding-right: 8px;
        }
        .span2 {
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
  .haha3{
    color: orange;
    border-right: none !important;
    i{
      color: orange !important;
    }
  }
  .haha4{
    border-left: none !important;
  }
}
</style>