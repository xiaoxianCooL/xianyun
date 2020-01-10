<template>
  <div class="neiron">
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <div class="sousuo">
          &nbsp;
          <input type="text" placeholder="请输入你要去的城市!" v-model="city" />
          <a href="JavaScript:void(0)">
            <i class="el-icon-search" @click="sousuo_btn"></i>
          </a>
        </div>
      </el-col>
    </el-row>
    <!-- 推荐城市 -->
    <el-row class="tuijian" :gutter="3">
      <el-col class="tuijian-item" :span="1">推荐:</el-col>
      <el-col class="tuijian-item" :span="1" v-for="(item,index) in morenchengshi" :key="index">
        <a href="JavaScript:void(0)" @click="tuijian_btn(item)">{{item}}</a>
      </el-col>
      <el-col class="tuijian-item" :span="20">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <!-- 写游记 -->
    <el-row type="flex" class="row-bg haha3" justify="space-between">
      <el-col :span="3" class="h1">
        <span class="gonlue">推荐攻略</span>
      </el-col>
      <el-col :span="17" class="h2"></el-col>
      <el-col :span="4" class="h3">
        <el-button type="primary" class="btn" @click="$router.push({path:'/post/create'})">
          <i class="el-icon-edit"></i> 写游记
        </el-button>
      </el-col>
    </el-row>

    <div v-for="(item,index) in Lsit" :key="index">
      <!-- 结构一 -->
      <div class="wenzhang" v-if="item.images.length >=3">
        <!-- 标题 -->
        <h3>
          <router-link :to="{path:'/post/article', query: {id:item.id}}">{{item.title}}</router-link>
        </h3>
        <!-- 文章内容 -->
        <p>
          <router-link :to="{path:'/post/article', query: {id:item.id}}">{{item.summary}}</router-link>
        </p>
        <!-- 图片 -->
        <el-row type="flex" class="row-bg haha4" justify="space-between">
          <el-col :span="8" class="haha4_item" v-for="(itemA,indexA) in item.images" :key="indexA">
            <router-link :to="{path:'/post/article', query: {id:item.id}}">
              <img width="230em" height="150px" :src="`${itemA}`" alt />
            </router-link>
          </el-col>
        </el-row>
        <!-- 用户信息 -->
        <el-row type="flex" class="row-bg yonhu" justify="space-between">
          <el-col :span="22">
            <div class="fudon1">
              <i class="el-icon-location-outline"></i>
              <span>{{item.cityName}}</span>
              <span>&nbsp;&nbsp;by</span>
              <router-link :to="{path:'/user/personal'}">
                <img
                  width="16px"
                  height="16px"
                  :src="`${$axios.defaults.baseURL+item.account.defaultAvatar}`"
                  alt
                />
                <span>{{item.account.nickname}}</span>
              </router-link>
              <i class="el-icon-view"></i>
              <span>{{item.watch}}</span>
            </div>
          </el-col>
          <el-col :span="1.5">
            <span class="dianzan1">{{item.like}}赞</span>
          </el-col>
        </el-row>
      </div>

      <!-- 结构二 -->
      <div class="wenzhang1" v-if="item.images.length<3">
        <el-row type="flex" class="row-bg haha4" justify="space-between">
          <!-- 图片 -->
          <el-col :span="8" class="haha4_item imgborder">
            <router-link
              :to="{path:'/post/article', query: {id:item.id}}"
              style="width:230em;height:150px"
            >
              <img width="100%" height="100%" :src="`${item.images[0]}`" alt />
            </router-link>
          </el-col>
          <!-- ------------------- -->
          <el-col :span="16">
            <!-- 标题文章 -->
            <el-row type="flex" class="row-bg yonhu3">
              <el-col :span="24">
                <h3>
                  <router-link :to="{path:'/post/article', query: {id:item.id}}">{{item.title}}</router-link>
                </h3>
                <p>
                  <router-link :to="{path:'/post/article', query: {id:item.id}}">{{item.summary}}</router-link>
                </p>
              </el-col>
            </el-row>
            <!-- 用户信息 -->
            <el-row type="flex" class="row-bg yonhu2" justify="space-between">
              <el-col :span="22">
                <div class="fudon">
                  <i class="el-icon-location-outline"></i>
                  <span>{{item.cityName}}</span>
                  <span>&nbsp;&nbsp;by</span>
                  <router-link :to="{path:'/user/personal'}">
                    <img
                      width="16px"
                      height="16px"
                      :src="`${$axios.defaults.baseURL+item.account.defaultAvatar}`"
                      alt
                    />
                    <span>{{item.account.nickname}}</span>
                  </router-link>
                  <i class="el-icon-view"></i>
                  <span>{{item.watch}}</span>
                </div>
              </el-col>
              <el-col :span="1.5">
                <span class="dianzan">{{item.like}}赞</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[1, 2, 3, 4, 5]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //总数据
      shuju: [],
      //推荐城市
      morenchengshi: ["广州", "上海", "北京"],
      //城市名称
      city: "",
      pageIndex: 1,
      pageSize: 3,
      total: 0
    };
  },
  computed: {
    //计算页码
    Lsit() {
      return this.shuju.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  watch: {
    $route(from, to) {
      console.log(from.query.city);
      console.log(to.query.city);
      this.city = from.query.city;
      // console.log(this.city);
      this.getdata();
    }
  },
  mounted() {
    this.$axios({
      url: "/posts"
    }).then(res => {
      // console.log(res);
      const { data, total } = res.data;
      this.shuju = data;
      this.total = total;
    });
  },
  methods: {
    //封装请求数据函数
    getdata() {
      this.$axios({
        url: "/posts",
        params: {
          city: this.city
        }
      }).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        this.shuju = data;
        this.total = total;
      });
    },
    //推荐城市
    tuijian_btn(chengshi) {
      // console.log(this.city);
      //有值的时候才发送请求 空不发送请求
      if (chengshi) this.city = chengshi;
      // console.log(this.city);
      this.getdata();
    },
    //搜索城市
    sousuo_btn() {
      this.getdata();
    },
    //选择数据条数时
    handleSizeChange(v) {
      // console.log(v);
      this.pageSize = v;
    },
    //选择页码时
    handleCurrentChange(v) {
      // console.log(v);
      this.pageIndex = v;
    }
  }
};
</script>

<style lang="less" scoped>
.neiron {
  z-index: 1;
  // min-width: 1000px;
  overflow: hidden;
  // margin-left: 20px;
  .sousuo {
    display: flex;
    width: 100%;
    height: 40px;
    border: 3px solid #ffa500;
    box-sizing: border-box;
    input {
      // height: 100%;
      // width: 89%;
      flex: 1;
      margin: 0px;
      height: 34px;
      // line-height: 34px;
      padding: 0px 20px 0px 20px;
      border: none;
      outline: none;
    }
    a {
      i {
        line-height: 34px;
        font-size: 24px;
        color: #ffa500;
        padding-right: 10px;
        font-weight: bold;
      }
    }
  }
}
.tuijian {
  margin: 10px 0px;
  .tuijian-item {
    font-size: 12px;
    color: #666;
    &:hover {
      color: orange;
      text-decoration: underline;
    }
  }
}
.haha3 {
  margin-top: 20px;
  display: flex;
  .h1 {
    border-bottom: 1px solid orange;
    .gonlue {
      flex: 1;
      text-align: center;
      color: orange;
      // width: 100%;
      font-size: 18px;
    }
  }
  .h2 {
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
  }
  .h3 {
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
    .btn {
      height: 40px;
      width: 100%;
      padding-bottom: 5px;
      text-align: center;
      // line-height: 40px;
      // margin-bottom: 5px;
    }
  }
}
.haha4 {
  overflow: hidden;
  margin: 15px 0;
  .haha4_item {
    // flex: 0 0 80px;
    margin-left: 15px;
  }
  .haha4_item:nth-child(1) {
    margin-left: 0px;
  }
}
.wenzhang {
  border-bottom: 1px solid #ccc;
  h3 {
    margin: 15px 0;
    font-weight: normal;
    a:hover {
      color: orange;
    }
  }
  p {
    font-size: 14px;
    color: #666;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*设置省略号在容器第3行文本后*/
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .fudon1 {
    color: #666;
    font-size: 12px;
    margin-bottom: 15px;
    &::after {
      clear: both;
      content: "";
      display: block;
      width: 0;
      height: 0;
      visibility: hidden;
    }
    i {
      float: left;
      padding: 10px 5px 8px 5px;
    }
    span {
      float: left;
      height: 30px;
      line-height: 30px;
    }
    a {
      float: left;
      &::after {
        clear: both;
        content: "";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      img {
        float: left;
        margin: 7px 5px;
      }
      span {
        color: orange;
        float: left;
      }
    }
  }
  .dianzan1 {
    margin: 15px 0;
    color: orange;
  }
}
.wenzhang1 {
  margin-top: 30px;
  border-bottom: 1px solid #ccc;
  .yonhu2 {
    // height: 30px;
    // line-height: 30px;
    font-size: 12px;
    color: #666;
    margin: 15px 0;
    .fudon {
      &::after {
        clear: both;
        content: "";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      i {
        float: left;
        padding: 10px 5px 8px 5px;
      }
      span {
        float: left;
        height: 30px;
        line-height: 30px;
      }
      a {
        float: left;
        &::after {
          clear: both;
          content: "";
          display: block;
          width: 0;
          height: 0;
          visibility: hidden;
        }
        img {
          float: left;
          margin: 7px 5px;
        }
        span {
          color: orange;
          float: left;
        }
      }
    }
    .dianzan {
      font-size: 16px;
      color: orange;
    }
  }
  .yonhu3 {
    h3 {
      margin: 5px 0px 15px 0px;
      font-weight: normal;
      a {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        /*设置省略号在容器第3行文本后*/
        -webkit-line-clamp: 1;
        overflow: hidden;
        &:hover {
          color: orange;
        }
      }
    }
    p {
      font-size: 14px;
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      /*设置省略号在容器第3行文本后*/
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
.imgborder {
  display: inline-block;
  border: 1px solid #ccc !important;
  margin-right: 10px;
}
</style>