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
          @blur="shijiaoA"
          :autofocus="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
          @blur="shijiaoB"
          @keyup.tab.native="shijiaoA"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
          :picker-options="pickerOptions"
          @keyup.tab.native="shijiaoB"
        ></el-date-picker>
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
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "", //出发城市名称
        departCode: "", //出发城市的简写
        destCity: "", //目标城市的名称
        destCode: "", //目标城市的简写
        departDate: "" //出发时间
      },
      chengshixialaA: [], //出发城市下拉选择列表 之所以储存在这里是因为如果用户不点击下拉列表的话.就拿不到departCode和destCode的值,所以定义了空数组储存 如果用户不点击下拉列表 帮他默认选中第一个 强行拿departCode和destCode的值
      chengshixialaB: [], //目标城市下拉选择列表
      pickerOptions: {
        disabledDate(time) {
          //由于不能使用<= 导致不能选择当天 加入算法 加上一天的时间
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  methods: {
    // tabfc(a){
    // 	console.log(a);

    // 	console.log(123);

    // },
    // tab切换菜单时触发
    handleSearchTab(item, index) {
      // console.log(item, index);
      //由于后台没有往返接口 提示用户
      if(index===1) this.$message.error('功能还在开发中,敬请期待!');
    },

    //当出发城市失去焦点时 默认选中第一个城市
    shijiaoA() {
      // console.log("被tab键触发了");

      //因为用户如果不输入 失去焦点的话 数组0项为 defined
      //defined不能通过打点调用任何属性和方法 否则报错
      //判断只有数组有长度才执行(就是输入框就会选中第一个城市 有内容才执行)
      if (this.chengshixialaA.length > 0) {
        //因为下拉列表里面可能有多个城市 0则是第一个城市 输入框不为空的情况下 强行选择第一个城市 拿departCode和destCode的值 为了凑齐5个参数提交给后台
        this.form.departCity = this.chengshixialaA[0].value;
        this.form.departCode = this.chengshixialaA[0].sort;
      }
    },
    //当目标城市市区焦点时 默认选中第一个城市
    shijiaoB() {
      // console.log("被tab键触发了");
      if (this.chengshixialaB.length > 0) {
        this.form.destCity = this.chengshixialaB[0].value;
        this.form.destCode = this.chengshixialaB[0].sort;
      }
    },
    // 出发城市输入框获得焦点时触发(监听出发城市的输入框的值的变化 并处触发调函数)
    // value 是选中的值，cb是回调函数，接收要展示的列表
    //cd回调函数中必须传入一个数组.里面必须是对象.并且对象里面一定要有value值.否则不会显示
    queryDepartSearch(value, cb) {
      // console.log(this.form.departCity);
      // if (value.trim() === "") {
      //   cb([]);
      //   return;
      // }
      //发送请求获取城市的实时机票列表
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        //解构出来返回的城市数据中的data下的data数组
        const { data } = res.data;
        //由于列表规定 数组中必须有对象,对象中必须有value值 所以
        //循环数组 并给对象都加上一个没有'市'字的value值 并把他储存到实际渲染城市列表的空数组中
        this.chengshixialaA = data.map(obj => {
          //再添加的时候 调用字符串替换方法 把市字替换为空
          obj.value = obj.name.replace("市", "");
          //并返回该对象
          return obj;
        });
        cb(this.chengshixialaA);
      });
      // console.log(value,cb)
      // cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      //获焦时值为空 不触发下拉列表
      // if (value.trim() === "") {
      //   cb([]);
      //   return;
      // }

      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;

        this.chengshixialaB = data.map(obj => {
          obj.value = obj.name.replace("市", "");
          return obj;
        });
      });
      cb(this.chengshixialaB);
    },

    // 出发城市下拉 选择时触发
    handleDepartSelect(item) {
      // console.log(item); 打印出的是当前城市的对象 把sort:CAN 城市代码保存起来
      //因为我们就是要凑齐5个参数发送请求
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      // console.log(value) 打印得知 返回的是原生的时间格式 显然我们后台需要的数据不是这个格式 需要转换格式 在这里我们引用了第三方的momen时间插件的库格式化了时间
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      // console.log('点击测试');
      //当用户点击换 城市名称调换
      const {departCity,departCode,destCity,destCode} = this.form;
      this.form.departCity=destCity;
      this.form.departCode=destCode;
      this.form.destCity=departCity;
      this.form.destCode=departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      // console.log(this.form);
      //自定义验证规则 每一个属性 就是一个规则
      const rules = {
        departCity: {
          value: this.form.departCity,
          err_message: "出发城市不能为空!"
        },
        destCity: {
          value: this.form.destCity,
          err_message: "到达城市不能为空!"
        },
        departDate: {
          value: this.form.departDate,
          err_message: "出发日期不能为空!"
        }
      };
      //定义一个验证变量
      let panduan = true;
      //对象遍历 由于for in对象遍历方法没有forEach方法,所以利用数据对象.keys方法把对象传进去 返回一个数组.再调用数组的forEach方法遍历 obj则是每一个规则
      Object.keys(rules).forEach(obj => {
        //再次循环的时候 如果panduan已经等于false 没必要继续执行下面的判断 再提醒用户
        if (panduan === false) return;
        //判断如果当前的对象的value值为空 则提示用户 跳出函数
        if (rules[obj].value === "") {
          this.$message.error(rules[obj].err_message);
          panduan = false;
          return;
        }
      });
      //再次判断 如果panduan 等于false 肯定是不能跳转页面的 中断事件 不再执行下面的跳转页面代码
      if (panduan === false) return;

      //如果通过了自定义的验证 则认为5项参数 凑齐 跳转页面并把参数带过去 后期提交由后台处理
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
          //点击搜索的同时 把5个参数储存到vuex中
          	// this.$store.commit("air/setHistory", this.form);
          this.$store.commit('air/setlishijilu', this.form)
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