<template>
  <!-- 2.0首页-视频播放 -->
  <div class="VideoPlay">
    <!-- 头部 -->
    <header-page></header-page>
    <!-- 视频 -->
    <div class="videoBox">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
      ></video-player>
    </div>
    <!-- 主要相关内容 -->
    <div class="relatedCont">
      <div class="titleBox">
        <h3 class="title">新雷凌活动资讯</h3>
        <span class="titIcon">
          <img class="line_daikuan" src="./../assets/img/src/form_right.png" alt>
        </span>
      </div>
      <!-- 广汽丰田特刊 -->
      <div class="specialBox">
        <div class="specialItem" @click="queryLink('https://mp.weixin.qq.com/s/2hqAf1QnHnpS-Z4QJ1AtRA')">
          <div class="leftImg">
            <img src="./../assets/img/src/sppic1.jpg" alt srcset>
          </div>
          <div class="rightTxt">
            <div class="textBox">
              <h4>11.58万元起! 全新换代雷凌震撼上市</h4>
              <p>&nbsp;</p>
              <sub>2019年5月20日</sub>
            </div>
          </div>
        </div>
        <div class="specialItem" @click="queryLink('https://mp.weixin.qq.com/s/G-g-_3qIkcDaDd9TOHRI2w')">
          <div class="leftImg">
            <img src="./../assets/img/src/sppic2.jpg" alt srcset>
          </div>
          <div class="rightTxt">
            <div class="textBox">
              <h4>Lovin' Levin! 就爱雷凌!</h4>
              <p>&nbsp;</p>
              <sub>2019年5月20日</sub>
            </div>
          </div>
        </div>
        <div class="specialItem" @click="queryLink('https://mp.weixin.qq.com/s/C4IjeF4lAXD2Q2Y3XEuvEA')">
          <div class="leftImg">
            <img src="./../assets/img/src/sppic3.jpg" alt srcset>
          </div>
          <div class="rightTxt">
            <div class="textBox">
              <h4>你的安全,永远是妈妈最在乎的事</h4>
              <p>&nbsp;</p>
              <sub>2019年5月10日</sub>
            </div>
          </div>
        </div>
      </div>
      <div class="titleBox">
        <h3 class="title">车友群</h3>
        <span class="titIcon">
          <img class="line_daikuan" src="./../assets/img/src/form_right.png" alt>
        </span>
      </div>
      <!-- 车友会 -->
      <div class="groupBox">
        <div class="groupItem">
          <p>丰云行</p>
          <button @click="queryLink('https://a.app.qq.com/o/simple.jsp?pkgname=com.yongyou&wxopenid=oWfP8jm8jG3wIQa5RUDGqzavTDR4&from=singlemessage&isappinstalled=0')">点击进入</button>
        </div>
        <div class="groupItem">
          <p>车友会</p>
          <button @click="queryLink('https://iclub.gtmc.com.cn/page/SC0101.html')">点击进入</button>
        </div>
      </div>
      <!-- 试驾报告 -->
      <!-- <div class="titleBox">
        <h3 class="title">试驾报告</h3>
        <span class="titIcon">
          <img class="line_daikuan" src="./../assets/img/src/form_right.png" alt>
        </span>
      </div>
      <div class="driveReport">
        <div class="reportItem">
          <span class="txt">3000公里新雷凌亲测</span>
          <span class="icon">>></span>
        </div>
        <div class="reportItem">
          <span class="txt">3000公里新雷凌亲测</span>
          <span class="icon">>></span>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import HeaderPage from './HeaderPage'
import _global from './../assets/js/global.js'
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
export default {
  name:'VideoPlay',
  pageName: '了解新雷凌',
  footFlag: 0,
  mixins: [_global],
  components: {
    HeaderPage,
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        //   playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: require("./../assets/video/2.mp4") //视频地址
          }
        ],
        poster: require("./../assets/img/video_open.jpg"), //封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // controlBar: {
        //     timeDivider: true,
        //     durationDisplay: true,
        //     remainingTimeDisplay: false,
        //     fullscreenToggle: true  //全屏按钮
        // }
      }
    };
  },
  mounted() {
    console.log("href", navigator.connection.type); //判断是否连接WiFi
    if (navigator.connection.type != "wifi") {
      //Toast('当前没有连接wifi,请谨慎观看视频！');
    }
  },
  methods: {
    onPlayerPause() {},
    onPlayerPlay() {},
    queryLink (ev) {
      window.location.href = ev
    }
  }
};
</script>

<style lang="less">
//顶部视频
.videoBox {
  width: 100%;
  // height: 3.07rem;
  background: #999;
  margin-bottom: 0.4rem;
  .video-player {
    .video-js {
      .vjs-big-play-button {
        width: 2em;
        margin-left: -1em;
        border-radius: 1rem;
        //   height:.6rem;
      }
    }
  }
}
//标题
.titleBox {
  width: 100%;
  height: 0.48rem;
  line-height: 0.48rem;
  background: #f7f7f7;
  text-align: left;
  padding: 0 0.3rem;
  .title {
    font-size: 0.3rem;
    padding-left: 0.2rem;
    display: inline;
    border-left: 0.06rem solid #be3932;
  }
  .titIcon {
    width: 0.11rem;
    height: 0.2rem;
    margin-left: 0.18rem;
    display: inline-block;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
//广汽丰田特刊
.specialBox {
  padding: 0.26rem 0.3rem 0.2rem;
  .specialItem:first-child {
    border-top: 1px solid #fff;
  }
  .specialItem {
    padding: 0.2rem 0;
    display: flex;
    border-top: 1px solid #f2f2f2;
    .leftImg {
      width: 2.08rem;
      height: 1.49rem;
      background: #666;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .rightTxt {
      flex: 1;
      display: flex;
      align-items: center;
      margin-left: 0.2rem;
      .textBox {
        text-align: left;
        > h4 {
          line-height: 0.38rem;
          font-size: 0.3rem;
          margin-bottom: 0.08rem;
          height: 0.6rem;
        }
        > p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 0.22rem;
          line-height: 0.3rem;
        }
      }
    }
  }
}
//车友会
.groupBox {
  padding: 0.12rem 0 0.12rem 0.3rem;
  .groupItem {
    height: 0.84rem;
    padding-left: 0.27rem;
    padding-right: 0.3rem;
    border-top: 1px solid #e5e5e5;
    display: flex;
    text-align: left;
    align-items: center;
    > p {
      flex: 1;
      font-size: 0.3rem;
    }
    > button {
      width: 1.54rem;
      height: 0.44rem;
      background: #fff;
      font-size: 0.24rem;
      color: #be3932;
      border: 1px solid #be3932;
      border-radius: 0.22rem;
      line-height: 0.44em;
    }
  }
  .groupItem:first-child {
    border: none;
  }
}
//试驾报告
.driveReport {
  padding: 0 0.3rem;
  .reportItem {
    display: flex;
    align-items: center;
    height: 0.76rem;
    border-top: 1px solid #ebebeb;
    > span {
      display: inline-block;
      font-size: 0.3rem;
    }
    .icon {
      margin-right: 0.16rem;
    }
  }
  .reportItem:first-child {
    border: none;
  }
}
</style>
