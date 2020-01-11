<template>
  <div>
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-input v-model="biaoti" placeholder="请输入标题" class="biaoti"></el-input>
        <div class="app">
          <VueEditor :config="config" ref="vueEditor" />
        </div>
        <div class="xuanzechengshi">
          <span>请选择城市</span>
          <el-autocomplete
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="fabu">
          <el-button type="primary" class="btn">发布</el-button>
          <span>或者 <a href="javascript:void(0)">保存到草稿</a></span>
        </div>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  data() {
    return {
      restaurants: [],
      state4: "",
      timeout: null,
      biaoti: "",
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          }
        }
      }
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  components: {
    VueEditor
  }
};
</script>

<style lang="less" scoped>
  /deep/ .ql-blank {
    p {
      height: 400px;
    }
  }
  h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .biaoti {
    margin-bottom: 15px;
  }
  .xuanzechengshi {
    margin: 15px 0px;
    span {
      color: #444;
      font-size: 14px;
    }
  }
  .fabu{
    .btn{
      height: 32px;
      font-size: 12px;
    }
    span{
      margin-left: 10px;
      font-size: 14px;
      color: #444;
    }
    a{
      color: orange;
    }
  }
</style>