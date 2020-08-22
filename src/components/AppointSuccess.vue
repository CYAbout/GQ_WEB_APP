<template>
  <!-- 1.2首页-预约试驾-预约成功 -->
  <div class="AppointSuccess">
      <!-- 头部 -->
    <header-page :isRed="true"></header-page>
    <!-- banner -->
    <div class="topBanner">
        <img src="./../assets/img/src/banner2.jpg" alt="" srcset="">
    </div>
    <!-- 悬浮快 -->
    <div class="suspendBox">
       <div class="topImg"><img src="./../assets/img/gift_p2.png" alt="" srcset=""></div>
       <p>{{$route.query.message}}</p>
    </div>
    <!-- 兑奖说明 -->
    <div class="instructionsBox">
        <div class="title">兑奖说明</div>
        <p>请凭核销码于2019年5月23日-6月30日期间前往所选广汽丰田汽车销售门店试驾兑奖</p>
        <p>礼品将于2019年7月1日-7月30日期间寄往客户留资地址如有疑问，请联系丰云惠客服：400-830-8888转2</p>
    </div>
    <div class="lineBox"></div>
    <div class="partGiftBox">
        <h3 class="title">参与授信评测并在线订车后您还将获得购车大礼一份</h3>
        <div class="giftImg">
            <img src="./../assets/img/gift_p3.png" alt="" srcset="">
        </div>
        <p>“新雷凌车模”一部</p>
        <div class="partBtn">
            <form-submit-btn @submit="submitClk" width='2.82rem' color="#be3932" background="#fff" border="1px solid #be3932">参与额度测评</form-submit-btn>
            <form-submit-btn @submit="submitClk" width='2.82rem'>立即订车赢豪礼</form-submit-btn>
        </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import FormSubmitBtn from './formList/FormSubmitBtn'
export default {
  name:'AppointSuccess',
  components: {
    HeaderPage,
    FormSubmitBtn
  },
  data () {
      return {}
  },
   methods: {
    submitClk () {
    }
  },
  mounted(){
      console.log('message',this.$route,this.$route.query.message);
  }
}
</script>

<style lang="less"> 
    .AppointSuccess {
        width:100%;
        overflow: hidden;
         //banner
        .topBanner{
            width:100%;
            height:3.07rem;
            >img{
                width:100%;
                height:100%;
            }
        }
        //悬浮块
        .suspendBox{
            width:6.9rem;
            height:3.54rem;
            margin: 0 auto;
            position:relative;
            top:-1.05rem;
            padding: .2rem;
            border-radius: .14rem;
            box-shadow: 1px 6px 8px 0px #c2c3c4;
            background:url('./../assets/img/src/back.jpg') no-repeat center center;
            .topImg{
                width: 4.8rem;
                // height:1.62rem;
                margin:0 auto;
                >img{
                    width:100%;
                    // height:100%;
                }
            }
            p{
                font-size:.26rem;
                color:#be3932;
            }
        }
         //兑奖说明
        .instructionsBox{
            margin-top: -.47rem;
            padding: 0 .3rem;
            padding-bottom:.62rem;
            .title{
                font-size: .3rem;
                color: #be3932;
                position: relative;
                &::before{
                content:'';
                position: absolute;
                top: 50%;
                margin-top:-1px;
                left:2.52rem;
                width:.14rem;
                height: 2px;
                background:#be3932;
                }
                &::after{
                content:'';
                position: absolute;
                top:50%;
                margin-top: -1px;
                left:4.23rem;
                width:.14rem;
                height: 2px;
                background:#be3932;
                }
            }
            >p{
                font-size: .26rem;
                color: #808080;
                margin-Top: .3rem;
                padding:0 .3rem;
                line-height: .34rem;
            }
        }
        .lineBox{
            height:.39rem;
            background:#fafafa;
        }
        .partGiftBox{
            padding:.58rem .5rem .4rem;
            .title{
                font-size: .34rem;
                color: #be3932;
                width:4.40rem;
                margin: 0 auto;
                position: relative;
                line-height: .46rem;
                &::before {
                    content: "";
                    position: absolute;
                    left:-.09rem;
                    top:.08rem;
                    width:.06rem;
                    height:.3rem;
                    background: #be3932;
                    
                }
            }
            .giftImg{
                width:5.40rem;
                // height:1.62rem;
                margin: 0 auto;
                >img{
                    width:100%;
                    // height:100%;
                }
            }
            >p{
                font-size: .26rem;
                color:#be3932;
            }
            .partBtn{
                display: flex;
                justify-content: space-between;
                .submit{
                    letter-spacing: 0;
                }
            }
        }

    }
</style>
