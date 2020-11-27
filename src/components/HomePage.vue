<template>
  <div class="homePage">
    <!-- 头部 -->
    <header-page :isRed="true"></header-page>
    <div class="banner_txt">
      <img src="./../assets/img/banner_txt.png" alt="">
    </div>
    <!-- 车型图片区域 -->
    <!-- <car-pic-cont></car-pic-cont> -->
    <car-swipe></car-swipe>
    <!-- 了解 预约 -->
    <div class="readMsg">
      <div class="btn1" @click="query('/VideoPlay')">
        <i></i>
        <span>
          了解新雷凌
        </span>
        <i></i>
      </div>
      <div class="btn2" @click="query('/AppointDrive')">
        <i></i>
        <span>
          预约试驾
        </span>
        <i></i>
      </div>
    </div>
    <div class="readTxt">*具体金融政策请以当地销售店为准</div>
    <!-- 快速授信 -->
    <div class="module" style="margin-top:-1px;">
      <img class="title" src="./../assets/img/src/title_shouxin.png" alt="">
      <!-- 新雷凌最高可贷款 -->
      <!-- <div class="md_box">
        <div class="md_title">
          <div>
            新雷凌最高可贷款
          </div>
        </div>
        <div class="money">
          15,000
        </div>
        <div class="rate">
          <ul>
            <li class="li1">0.01%</li>
            <li class="li2">日利率低至</li>
          </ul>
          <ul>
            <li class="li1">1分钟</li>
            <li class="li2">快速放贷</li>
          </ul>
        </div>
      </div> -->
      <!-- 快速免费在线申请 -->
      <div class="md_box">
        <div class="md_title">
          <div>
            快速免费在线申请
          </div>
        </div>
        <form-input-home v-model="apply.idCardName" placeholder="请输入真实姓名" maxlength="16" type="text"></form-input-home>
        <form-input-home v-model="apply.phone" placeholder="请输入手机号码" maxlength="11"></form-input-home>
        <form-checkbox v-model="apply.checkVal" class="agreement">已阅读并同意<span @click="$router.push('/PrivacyPolicy')">《广汽丰田汽车有限公司隐私政策》</span></form-checkbox>
        <button @click="applyNow">马上申请</button>
        <!-- <div class="queryToest">
          *订单及授权结果查询
        </div> -->
      </div>
      <!-- <div class="md_title_rb">
        <div>
          快速贷款
        </div>
      </div> -->
      <img class="line_daikuan" src="./../assets/img/src/line_daikuan.png" alt="">
    </div>
    <div class="module">
      <img class="title" src="./../assets/img/src/title_gouche.png" alt="">
      <!-- 下载卡片 -->
      <div class="cardBox">
        <!-- <img class="card" src="./../assets/img/src/card_load.jpg" alt=""> -->
        <!-- <button>立即订车</button> -->
        <img class="button" @click="query('/OrderCarForm')" src="./../assets/img/src/buy_btn.png" alt="">
        <div class="divCard">
          <img src="./../assets/img/src/buy_back.png" alt="" class="card">
          <ul class="buy_car">
            <li @click="query('/InventoryQuery')">
              <img src="./../assets/img/src/buy_kucun.png" alt="">
              <span>车辆库存</span>
            </li>
            <li class="li_line"></li>
            <li @click="query('/OrderCarForm')">
              <img src="./../assets/img/src/buy_zaixian.png" alt="">
              <span>在线报名</span>
            </li>
            <li class="li_line"></li>
            <li @click="CarQuery">
              <img src="./../assets/img/src/buy_query.png" alt="">
              <span>收车查询</span>
              <span class="APP">（丰云行APP）</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="module">
      <img class="title" src="./../assets/img/src/title_huangou.png" alt="">
      <div class="cardBox">
        <img class="card" src="./../assets/img/src/card_zhihuan.png" alt="">
        <!-- 按钮 -->
        <img class="button"  @click="huangouFun" style="left:1rem;top:2.4rem;" src="./../assets/img/src/card_btn_shenqing.png" alt="">
        <img class="button"  @click="guizeFun" style="left:auto;top:0.3rem;right:0.2rem;height:0.3rem" src="./../assets/img/home_newold_txtBtn.png" alt="">
      </div>
    </div>
    <!-- 底部菜单 -->
    <!-- <footer-menu @menuClk='menuClk'></footer-menu> -->
    <!-- demobox -->
    <div v-if="this.getENV === 'development'" @click="query('/Demo')" style="position:fixed;right:0;top:3rem;background:#fff;padding:0.2rem;border:1px solid @redBack;z-index:999999">
      表单
      <br/>
      demo
    </div>
    <!-- 活动规则弹窗-->
    <rule-page ref="rp" closeType="none">
      <img src="./../assets/img/huangou_guize.png">
    </rule-page>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import HeaderPage from './HeaderPage'
import FooterMenu from './FooterMenu'
import FormInputHome from './FormInputHome'
// import CarPicCont from './../components/CarPicCont'
import CarSwipe from './../components/CarSwipe'
import FormCheckbox from './formList/FormCheckbox'
import RulePage from './RulePage'
import _global from './../assets/js/global.js'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import {MessageBox, Toast} from 'mint-ui'

export default {
  name: 'homePage',
  pageName: '新雷凌 梦想贷',
  footFlag: 0,
  mixins: [_global],
  components: {
    HeaderPage,
    // CarPicCont,
    CarSwipe,
    FooterMenu,
    FormCheckbox,
    FormInputHome,
    RulePage,
  },
  data() {
    return {
      checkBool: true,
      apply: {
        idCardName: '',
        phone: '',
        checkVal: 0,
      },
      getENV: ''
    }
  },
  computed: {
    ...mapGetters(['getStateData']),
  },
  methods: {
    ...mapActions(['setStateData']),
    checkon() {
  		console.log(this.value)
    },
    //跳转页面
    query(url) {
      if (url === '/Demo') {
        let _url = '/api1'
        let _param = {
          flag: 1,
          type: 'get1',
        }
        RequestGet(_url,_param).then((res) => {
            console.log('======get api1:',res)
        }, (err) => {
        console.log('err:',err)
        }).catch((err) => {
        console.log('catch err:>', err)
        })



        let l_url = '/api3'
            let l_params = {
              flag: 2,
              type: 'post2',
            }
            RequestAxios.post(l_url,l_params).then((res) => {
                console.log('======post api3:',res)
            }, (err) => {
                console.log('err:',err)
            })





      } else {
        this.$router.push({path:url})
      }
      
    },
    huangouFun () { // 换购跳转 
      window.location.href = 'https://mall.gac-toyota.com.cn/Mobile/activity/activityMobile?ID=a4205ece-8c0f-4983-84cd-a91100ef72ca'
    },
    guizeFun () {
      this.$refs.rp.ruleClk()
    },
    // 点击底部菜单
    menuClk (ev) {
      console.log(ev)
      switch (ev) {
        case 0:

        break;
        case 1:
          this.$router.push({path:'/OrderCarForm'})
        break;
        case 2:
          this.$router.push({path:'/InstitutionsSel2_0'})
        break;
        case 3:
          if(localStorage.islogin){
            this.$router.push({path:'/UserQuery'})
          }else{
            this.$router.push({path:'/GiftQuery'})
          }
        break;
      }
    },
    CarQuery:function(){
      this.TYTWinClk()
    },
    getGtmc(ev) {
      if (ev.resultCode == '2') { // 移动web页面
        console.log('resultCode2:',ev.resultCode)
        this.GTMC.WebToApp({
            "fType":"0",
        });
      }else if (ev.resultCode == '3') { // APP页面
        Toast('暂不能从APP端打开!')
      }
    },
    // 跳转丰云行App弹窗
    TYTWinClk () {
      MessageBox({
          title: '',
          message: 
            `<div class="seccessBack">
              <img src="${this.TYT_seccess()}" style="width:100%;">
            </div>`,
          showConfirmButton:true,
          showCancelButton: true, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'TYTPopConfirmBtn',
          confirmButtonText:'前往丰云行',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:'',

      }).then((ev)=>{
        if (ev == 'confirm') {
          console.log('下载丰云行APP')
          window.getmsg = (ev)=> {
            console.log(ev)
            this.getGtmc(ev)
          }
          // 判断平台
          this.GTMC.getEnvironment('getmsg')
        }
      });
    },
    TYT_seccess () {
      return require('./../assets/img/load_app.png')
    },
    applyNow () { // 金融机构选择
      var _isName = this.isTypeExp('name',this.apply.idCardName)
      if(!_isName) {return false}
      var _isPhone = this.isTypeExp('phone',this.apply.phone)
      if(!_isPhone) {return false}
      if(this.apply.checkVal == 0) {
        Toast('请阅读并同意相关协议')
        return false
      }
      let _apply = { 
            idCardName: this.apply.idCardName,
            phone: this.apply.phone,
          }
      this.setStateData(_apply)
      this.$router.push({path:'/InstitutionsSel2_0'})
      
    },
    btnToast() {
      Toast('敬请期待！')
    },
    getWXShare() {
      let _url = '/api1'
      let _param = null
      RequestGet(_url,_param).then((res) => {
          console.log('getWXShare:',res)
          this.GoWXapi(res.content)
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
    },
    GoWXapi(cont) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx962e54f1d1188d50', // 必填，公众号的唯一标识
        timestamp: cont.sign.timestamp, // 必填，生成签名的时间戳
        nonceStr: cont.sign.nonceStr, // 必填，生成签名的随机串
        signature: cont.sign.signature,// 必填，签名
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
        // jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
      });

      wx.ready(function(){
        let wxList = {
          title: '新雷凌 梦想贷', // 分享标题
          desc: '0首付起开新车 0利息省钱购车', // 分享描述
          link:'https://gtmc201906.cheyinnet.com/dist/index.html#/',// window.location.href.split('?')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/792c75014d314f1194a86a17584322287ab39285dc18a497e81decb3c381bd7062f1f47d2fd656d0e3ea3450f569b407?pictype=scale&from=30113&version=3.3.3.3&uin=791134282&fname=QQ%E6%88%AA%E5%9B%BE20170524164037.png&size=750', // 分享图标
        }
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
        wx.onMenuShareTimeline({
          title: wxList.title,
          link: wxList.link,
          imgUrl: wxList.imgUrl,
          success: function (ev) {
            // 设置成功
            cosnole.log('onMenuShareTimeline:',ev)
          }
        })
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
        wx.onMenuShareAppMessage({
          title: wxList.title,
          desc: wxList.desc,
          link: wxList.link,
          imgUrl: wxList.imgUrl,
          success: function (ev) {
            // 设置成功
            cosnole.log('onMenuShareAppMessage:',ev)
          }
        })
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
        // wx.updateTimelineShareData({
        //   title: wxList.title,
        //   link: wxList.link,
        //   imgUrl: wxList.imgUrl,
        //   success: function () {
        //     // 设置成功
        //     cosnole.log('updateTimelineShareData:',ev)
        //   }
        // })
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        // wx.updateAppMessageShareData({
        //     title: wxList.title,
        //     desc: wxList.desc,
        //     link: wxList.link,
        //     imgUrl: wxList.imgUrl,
        //     success: function () {
        //       // 设置成功
        //       cosnole.log('updateTimelineShareData:',ev)
        //     }
        // })
        

      })
    },
    isWX() { // 判断微信环境
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    }
  },
  mounted () {
    // this.getWXShare()
  },
  activated() {
    console.log(window.location.href)
    this.getWXShare()
    // this.isWX() ? Toast('微信打开') : Toast('非微信打开')
    // 获取环境变量
    this.getENV = process.env.NODE_ENV
    // 设置缓存状态
    this.apply.phone =  this.getStateData.phone || ''
    this.apply.idCardName =  this.getStateData.idCardName || ''
  }

}
</script>

<style lang="less">
@redBack:#be3932;
.homePage {
  // height: 100vh;
  width:100%;
  // overflow: hidden;
  background:#852e25;
  padding-bottom: 1.2rem;
}
.TYTPopConfirmBtn {
  position: absolute;
  top: 6.3rem;
  left: 50%;
  margin-left: -1.5rem;
  width: 3rem;
  height: .7rem;
  line-height: .7rem;
  background: #fff;
  color: #be3932;
  border-radius: 20px;
  font-size: .28rem;
  letter-spacing: 5px;
}
.seccessBack {
  .moneyTxt {
    position: absolute;
    top: 4.1rem;
    width: 86%;
    color: #fff;
    span {
      font-size: 1rem;
    }
    sub {
      font-size: 0.4rem;
    }
  }
}
.carPicCont,.readMsg {
  background:@redBack;
}
.readMsg {
  display: flex;
  justify-content:center;
  padding: 0.2rem 0 0.4rem 0;
  margin-bottom: -1px;
  >[class^=btn] {
    display: flex;
    justify-content: center;
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0 0.3rem;
    border-radius: 0.2rem;
    font-size: 0.28rem;
    border: 1px solid #fff;
    width: 2.52rem;
  }
  >[class^=btn]:active {
    opacity: 0.8;
  }
  .btn1 {
    color: #fff;
    margin-right: 0.6rem;
    i {
      background:url('./../assets/img/src/line_small_wht.png') center center no-repeat;
      width: 0.2rem;
      height: 100%;
      display: block;
      float: left;
      background-size: 70%;
    }
    span {
      display: block;
      float: left;
    }
  }
  .btn2 {
    background: #fff;
    color: @redBack;
    i {
      background:url('./../assets/img/src/line_small_red.png') center center no-repeat;
      width: 0.2rem;
      height: 100%;
      display: block;
      float: left;
      background-size: 70%;
    }
    span {
      display: block;
      float: left;
      letter-spacing: 0.02rem;
    }
  }
}
.readTxt {
  padding: 0 0.2rem;
  background: #be3932;
  text-align: right;
  color: #fff;
}
.module {
  padding: 0.6rem 0.2rem 0.6rem;
  background: @redBack;
  margin-top: 0.16rem;
  font-size: 0;
  >.title {
    height: 0.56rem;
  }
  .md_box {
    background: #fff;
    border-radius: 10px;
    font-size: 0;
    padding:0.6rem;
    margin-top: 0.4rem;
    box-shadow: 0 5px 20px -10px #333;
    .md_title {
      display: inline-block;
      font-size: 0.36rem;
      color: #c2726b;
      border-bottom: 1px solid #c2726b;
      padding: 0 0.26rem;
      height: 0.18rem;
      margin-bottom: 0.6rem;
      >div {
        background: #fff;
        padding: 0 0.1rem;
      }
    }
    .money {
      background: url("./../assets/img/src/line_money.png") 0 0 repeat-x;
      background-size: 100% 100%;
      height: 0.8rem;
      display: inline-block;
      min-width: 1rem;
      line-height: 0.8rem;
      font-size: 0.8rem;
      color: @redBack;
      text-shadow: -3px 5px 5px #c8c8c8;
    }
    .rate {
      display: inline-block;
      margin-top: 0.1rem;
      >ul {
        float: left;
        font-size: 0.1rem;
        padding: 0 0.3rem;
        color: #c2726b;
        >.li1 {
          font-size: 0.18rem;
          font-weight: bold;
        }
      }
      >ul:first-child {
        border-right: 1px solid #c2726b;
      }
    }
    .agreement {
      display: inline-block;
    }
    button {
      height: 0.6rem;
      line-height: 0.6rem;
      border-radius: 0.3rem;
      text-align: center;
      font-size: 0.26rem;
      padding: 0 1rem;
      margin-top: 0.2rem;
      background: @redBack;
      color: #fff;
    }
    button:active {
      opacity: 0.8;
    }
    .queryToest {
      display: inline-block;
      text-align: center;
      font-size: 0.24rem;
      width: 100%;
      margin-top: 0.2rem;
      color: @redBack;
    }
  }
  .md_title_rb {
    display: inline-block;
    font-size: 0.36rem;
    color: #fff;
    border-bottom: 1px solid #fff;
    padding: 0 0.26rem;
    height: 0.18rem;
    margin: 0.4rem 0;
    >div {
      background: @redBack;
      padding: 0 0.1rem;
    }
  }
  .line_daikuan {
    width: 80%;
    display: inline-block;
    margin-top: 0.6rem;
  }
  .buy_car {
    margin-top: 0.4rem;
    color: #fff;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #651612;
    padding-top: 0.6rem;
    >li {
      float: left;
      font-size: 0.28rem;
      width: 2rem;
      position: relative;
      padding-bottom: 0.8rem;
      >img {
        // height: 0.7rem;
        width: 60%;
        display: inline-block;
      }
      >img:active {
        opacity: 0.8;
      }
      >span{
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-top: 0.1rem;
        position: absolute;
        left: 0;
        bottom: 0;
        bottom: 0.36rem;
        color: #fff;
      }
      .APP {
        bottom: 0.1rem;
        font-size: 0.19rem;
      }
    }
    >.li_line {
      border-left: 1px solid #651612;
      height: 1.9rem;
      margin-top: -0.1rem;
      width: 0;
    }
  }
  .cardBox {
    border-radius: 0.2rem;
    overflow: hidden;
    box-shadow: 0 5px 10px -4px #333;
    position: relative;
    margin-top: 0.4rem;
    .card {
      width:100%;
      margin-bottom: -1px;
    }
    .button {
      position: absolute;
      top: 2.3rem;
      left: 1.3rem;
      background: none;
      color: #f8f8f8;
      font-size: 0.22rem;
      height: 0.66rem;
    }
    .divCard {
      background: #96231e;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      >.card {
        width: 92%;
        margin: 0 auto;
      }
    }
  }
  .line_gouche {
    width:90%;
    margin: 0.5rem auto;
  }
}
.banner_txt {
  background: @redBack;
  padding-top: 0.6rem;
  margin-bottom: -1rem;
  position: relative;
  z-index: 2;
  img {
    width: 86%;
    display: inline-block;
  }
}
</style>
<style>
  .popCloseBtn {
    top: 0;
    right: 0;
    left: auto;
  }
</style>
