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
            <a href="javascript:void(0)" @click="baocuncaogao">保存到草稿</a>
          </span>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import moment from "moment";
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
      quanbuchengshi: [], //全部城市列表
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
      url: "/cities",
      params: {
        name
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.quanbuchengshi = data.map(obj => {
        obj.value = obj.name;
        return obj;
      });
      // console.log(this.quanbuchengshi);
    });
  },
  methods: {
    //发布游记
    fabubtn() {
      // console.log(this.form);
      //获取富文本内容
      var quill = this.$refs.vueEditor.editor.root.innerHTML;
      // console.log(quill.root.innerHTML);
      //赋值到表单content
      this.form.content = quill;
      //发送请求
      this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInof.token
        },
        data: this.form
      }).then(res => {
        // console.log(res);
        this.$message.success("文章新增成功!!!");
        //文章新增成功时候 清空表单
        // for(let item in this.form){
        //   item='';
        // }
        this.form.title = "";
        this.form.content = "";
        this.form.city = "";
      });
    },
    // 监听输入建议时触发
    querySearchAsync(value, cb) {
      // console.log(123);
      const arr = value ? this.quanbuchengshi.filter(item => {
            return item.value.indexOf(value) >= 0;
          }) : this.quanbuchengshi;
      // console.log(arr);
      cb(arr);
    },
    //点击选中建议时触发
    handleSelect(item) {
      // console.log('啊啊啊',item);
      this.city = item.name;
    },
    //把文章保存到草稿箱
    baocuncaogao() {
      //获取富文本内容
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      // 使用moment插件格式化时间
      var time = moment(new Date()).format("YYYY-MM-DD");
      var data = this.form;
      data.time = time;
      // console.log(data);
      // console.log(this.$refs.vueEditor.editor);
      // 遍历对象 判断数据是否为空
      for (const key in this.form) {
        if (this.form[key].trim() === "") return this.$message.error("标题或城市不能为空!");
        //已知BUG 文本域不输入内容 依然可以保存到草稿箱中 (已解决)
      }
      //判断富文本域是否有内容 没有内容不允许储存到草稿箱内
      if(this.$refs.vueEditor.editor.root.innerHTML!="" || this.$refs.vueEditor.editor.root.innerText!="") return this.$message.error("内容不能为空!");
      //把数据保存到vuex中
      this.$store.commit("post/setcaogao", data);
      this.$message.success("保存到草稿箱成功!");
    },
    //被父组件触发的事件 接收父组件传过来的index 渲染对应数组中对应的数据对象到表单域
    vuexuanran(index) {
      this.$confirm("此操作原本内容将被草稿覆盖, 是否继续?", "请注意!", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log('子组件事件被父组件触发了',index);
          const vuexshuju = this.$store.state.post.caogao[index];
          // console.log(this.$store.state.post.caogao);
          // console.log(vuexshuju);
          //由于数据中储存了时间 form表单不需要这个属性 数据结构 安排!
          const { time, ...vuestr } = vuexshuju;
          //渲染页面
          this.form = vuestr;
          // console.log(this.form);
          // 把内容赋值到富文本域
          var quill = this.$refs.vueEditor.editor;
          quill.clipboard.dangerouslyPasteHTML(`${this.form.content}`);
          //提示用户
          this.$message({
            type: "success",
            message: "草稿已载入!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消!"
          });
        });
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