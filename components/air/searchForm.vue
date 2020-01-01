<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 就是监听这个输入框的值 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker type="date" placeholder="请选择日期" style="width: 100%;" @change="handleDate"></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",//出发城市名称
        departCode:"",//出发城市的简写
      },
      chengshixiala: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {},

    // 出发城市输入框获得焦点时触发(监听出发城市的输入框的值的变化 并处触发调函数)
    // value 是选中的值，cb是回调函数，接收要展示的列表
    //cd回调函数中必须传入一个数组.里面必须是对象.并且对象里面一定要有value值.否则不会显示
    queryDepartSearch(value, cb) {
      // console.log(this.form.departCity);
      if (value.trim() === "") {
        cb([]);
        return;
      }
      //发送请求获取城市的实时机票列表
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        console.log(res);
        //结构出来返回的城市数据中的data下的data数组
        const { data } = res.data;
        //由于列表规定 数组中必须有对象,对象中必须有value值 所以
        //循环数组 并给对象都加上一个没有'市'字的value值 并把他储存到实际渲染城市列表的空数组中
        this.chengshixiala = data.map(obj => {
          //再添加的时候 调用字符串替换方法 把市字替换为空
          obj.value = obj.name.replace("市", "");
          //并返回该对象
          return obj;
        });
        cb(this.chengshixiala);
      });
      // console.log(value,cb)
      // cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      //获焦时值为空 不触发下拉列表
      if (value.trim() === "") return;
      // cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    },

    // 出发城市下拉 选择时触发
    handleDepartSelect(item) {
      // console.log(item); 打印出的是当前城市的对象 把sort:CAN 城市代码保存起来 
      //因为我们就是要凑齐5个参数发送请求
      this.form.departCode=item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {},

    // 确认选择日期时触发
    handleDate(value) {},

    // 触发和目标城市切换时触发
    handleReverse() {},

    // 提交表单是触发
    handleSubmit() {
      // $axios({
      //   url:'/airs',
      //   data
      // })
    }
  },
  mounted() {
    // console.log(process)
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>