<template>
  <div>
    <h2>发表新攻略</h2>
    <p>分享你的个人游记，让更多人看到哦！</p>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.title" placeholder="请输入标题" class="biaoti"></el-input>
      </el-form-item>
      <el-form-item>
        <VueEditor :config="config" ref="vueEditor" />
      </el-form-item>
      <el-form-item>
        <div class="xuanzechengshi">
          <span>请选择城市</span>
          <el-autocomplete
            v-model="form.city"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="fabu">
          <el-button type="primary" class="btn" @click="fabubtn">发布</el-button>
          <span>
            或者
            <a href="javascript:void(0)">保存到草稿</a>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import "quill/dist/quill.snow.css";
// let VueEditor;

// if (process.browser) {
//   VueEditor = require("vue-word-editor").default;
// }
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  data() {
    return {
      form: {
        content: "",
        title: "",
        city: ""
      },
      quanbuchengshi: [],
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://157.122.54.189:9095/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            // console.log(res);
            insert("http://157.122.54.189:9095" + res.data[0].url);
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: "http://157.122.54.189:9095/upload",
          name: "files",
          uploadSuccess(res, insert) {
            insert("http://157.122.54.189:9095" + res.data[0].url);
          }
        }
      }
    };
  },
  mounted() {
    // 点击写游记的时候 立即获取全部城市列表
      this.$axios({
        url:"/cities",
        params:{
          name
        }
      }).then(res=>{
        // console.log(res);
        const {data}=res.data;
        this.quanbuchengshi =data.map(obj=>{
          obj.value = obj.name;
          return obj;
        })
        console.log(this.quanbuchengshi);
      })
  },
  methods: {
    //发布游记
    fabubtn() {
      console.log(this.form);
      //获取富文本内容 
      var quill = this.$refs.vueEditor.editor.root.innerHTML;
      // console.log(quill.root.innerHTML);
      //赋值到表单content
      this.form.content = quill;
    },
    // 监听输入建议时触发
    querySearchAsync(value, cb) {
      // console.log(123);
      const arr = value ? this.quanbuchengshi.filter(item=>{
        return item.value.indexOf(value)>=0;
      }) :this.quanbuchengshi;
      cb(arr)
    },
    //点击选中建议时触发
    handleSelect(item) {
      // console.log('啊啊啊',item);
      this.city = item.name;
    }
  },
  components: {
    VueEditor
  }
};
</script>

<style lang="less" scoped>
/deep/.ql-editor {
  height: 400px;
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
.fabu {
  .btn {
    height: 32px;
    font-size: 12px;
  }
  span {
    margin-left: 10px;
    font-size: 14px;
    color: #444;
  }
  a {
    color: orange;
  }
}
</style>