<template>
  <div class="neiron">
    <el-row>
      <el-col :span="24">
        <div class="sousuo">
          &nbsp;
          <input type="text" placeholder="请输入你要去的城市!" />
          <span>
            <i class="el-icon-search"></i>
          </span>
        </div>
      </el-col>
    </el-row>

    <el-row class="tuijian" :gutter="3">
      <el-col class="tuijian-item" :span="1">推荐:</el-col>
      <el-col class="tuijian-item" :span="1">
        <a href="#">广州</a>
      </el-col>
      <el-col class="tuijian-item" :span="1">
        <a href="#">上海</a>
      </el-col>
      <el-col class="tuijian-item" :span="1">
        <a href="#">北京</a>
      </el-col>
      <el-col class="tuijian-item" :span="20">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

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

    <!-- 结构一 -->
    <div class="wenzhang">
      <h3>
        <a href="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</a>
      </h3>
      <p>
        <a
          href="#"
        >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</a>
      </p>

      <el-row type="flex" class="row-bg haha4" justify="space-between">
        <el-col :span="8" class="haha4_item">
          <a href="#">
            <img
              width="230em"
              height="150px"
              src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              alt
            />
          </a>
        </el-col>
        <el-col :span="8" class="haha4_item">
          <a href="#">
            <img
              width="230em"
              height="150px"
              src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              alt
            />
          </a>
        </el-col>
        <el-col :span="8" class="haha4_item">
          <a href="#">
            <img
              width="230em"
              height="150px"
              src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              alt
            />
          </a>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg yonhu" justify="space-between">
        <el-col :span="22">
          <div class="fudon1">
            <i class="el-icon-location-outline"></i>
            <span>北京市</span>
            <span>&nbsp;&nbsp;by</span>
            <a href>
              <img
                width="16px"
                height="16px"
                src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                alt
              />
              <span>地球发动机</span>
            </a>
            <i class="el-icon-view"></i>
            <span>12959</span>
          </div>
        </el-col>
        <el-col :span="1.5">
          <span class="dianzan1">73赞</span>
        </el-col>
      </el-row>
    </div>

    <!-- 结构二 -->
    <div class="wenzhang1">
      <el-row type="flex" class="row-bg haha4" justify="space-between">
        <el-col :span="8" class="haha4_item">
          <a href="#">
            <img
              width="220em"
              height="150px"
              src="https://p3-q.mafengwo.net/s13/M00/41/C4/wKgEaVyaOs2AA9IKAAj8Lg2YzaU64.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90"
              alt
            />
          </a>
        </el-col>

        <el-col :span="16">
          <el-row type="flex" class="row-bg yonhu3">
            <el-col :span="24">
              <h3>
                <a href="#">远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略</a>
              </h3>
              <p>
                <a
                  href="#"
                >想象一下一个距离 北京 只有2.5小时飞行距离的城市：身处 亚洲 却能感受到十足的欧陆风情——欧式建筑和街道，金发碧眼的路人，正宗的西餐外加只有国内一半售价的帝王蟹可以敞开吃——更难能可贵的是，这里对国人（实质）免签，有直飞航班，低廉的物价，且尚未有太多的游客涉足还保留着原汁原味的传统风情！</a>
              </p>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg yonhu2" justify="space-between">
            <el-col :span="22">
              <div class="fudon">
                <i class="el-icon-location-outline"></i>
                <span>北京市</span>
                <span>&nbsp;&nbsp;by</span>
                <a href>
                  <img
                    width="16px"
                    height="16px"
                    src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                    alt
                  />
                  <span>地球发动机</span>
                </a>
                <i class="el-icon-view"></i>
                <span>12959</span>
              </div>
            </el-col>
            <el-col :span="1.5">
              <span class="dianzan">73赞</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

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
    span {
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
    &:hover{
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
</style>