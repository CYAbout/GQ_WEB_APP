<template>
  <!-- 1.1首页-预约试驾-未能获取礼品 -->
  <div class="AppointNoGift">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="appointCont">
        <!-- banner -->
        <div class="topBanner">
            <img src="./../assets/img/src/banner3.jpg" alt="" srcset="">
        </div>
    </div>
    <!-- 文字说明 -->
    <div class="appointText">
        <p>您好，</p>
        <p class="txt">您已成功预约<span>雷凌 1.8H GS-V尊贵版</span>，稍后会有工作人员与您联系，请保持电话畅通。</p>
    </div>
    <div class="TinksImg">
        <h2 class="TinksTitle">谢谢参与</h2>
        <!-- <img src="./../assets/img/预约未中奖.jpg" alt="" srcset=""> -->
        <p>很遗憾，您未能抽中本次预约试驾好礼感谢您的参与。</p>
        <p>咨询电话：400 830 8888 转 2</p>
    </div>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
export default {
//   name:'AppointDrive',
  components: {
    HeaderPage,
  },
  data () {
      return {
      }
  },
  mounted () {
  },
  methods:{
  },
}
</script>

<style lang="less"> 
    .AppointNoGift {
        width:100%;
        overflow: hidden;
    }
    .appointCont{
        margin-top:.15rem;
        //banner
        .topBanner{
            width:6.9rem;
            // height:2.92rem;
            margin: 0 auto;
            border-radius: .12rem;
            box-shadow: 1px 6px 8px 0px #c2c3c4;
            position: relative;
            >img{
               width:100%;
            }
        }
    }
    .appointText {
        margin-top: .45rem;
        padding: 0 .3rem;
        >p{
            text-align: left;
            font-size: .26rem;
            line-height: .32rem;
            color: #999;
            &.txt{
               text-indent:2em;
            }
            >span{
                color:#be3932;
                text-decoration:underline
            }
        }
    }
    .TinksImg {
        margin:0 .3rem;
        margin-top:.68rem;
        width:6.9rem;
        height:2.92rem;
        background: url('./../assets/img/预约未中奖-bg.jpg') no-repeat;
        background-size: 100%;
        padding-top: .4rem;
        position: relative;
        .TinksTitle{
            font-size: .42rem;
            color:#fee2b2;
            margin-bottom:.68rem;
            &::before{
                content:'';
                position: absolute;
                top:21%;
                left:2.2rem;
                width:.18rem;
                height: 1px;
                background:#fee2b2;
            }
            &::after{
                content:'';
                position: absolute;
                top:21%;
                left: 4.5rem;
                width:.18rem;
                height: 1px;
                background:#fee2b2;
            }
        }
        >p{
            font-size: .26rem;
            color:#fff;
            line-height:.34rem;
            padding: 0 1.2rem;
        }
    }
</style>
