<template>
  <!-- 2.3首页-查询页-用户查询页 -->
  <div class="userQuery">
      <!-- 头部 -->
    <header-page :isRed="true"></header-page>
    <!-- 用户信息 -->
    <div class="userBox">
      <img class="head" src="./../assets/img/userQuery_head.png" alt="">
      <!-- 注销 -->
      <img class="button" @click="logOut" src="./../assets/img/userQuery_btn.png" alt="">
    </div>
    <p class="phone">{{phoneNumber}}</p>
    <!-- 查询的分类 -->
    <div class="queryList">
      <div class="queryBox">
        <div class="queryItem" @click='GiftListBtn'>
          <img class="titleImg" src="./../assets/img/UserQuery_lp.jpg" alt="">
          <span class="txt">礼品查询</span><span class="icon"></span>
        </div>
        <div class="queryItem" @click='SubmitLimitQuery'>
          <img class="titleImg" src="./../assets/img/UserQuery_dd.jpg" alt="">
          <span class="txt">订单查询</span><span class="icon"></span>
        </div>
        <!-- <div class="queryItem">
          <img class="titleImg" src="./../assets/img/UserQuery_lp.jpg" alt="">
          <span class="txt">保值换购申请查询</span><span class="icon"></span>
        </div> -->
        <div class="queryItem" @click="alert_creditQuery">
          <img class="titleImg" src="./../assets/img/UserQuery_ed.jpg" alt="">
          <span class="txt">额度查询</span><span class="icon"></span>
        </div>
        
        <!-- <div class="queryItem" @click='yuyueBtn'>
          <span class="txt">预约试驾查询</span><span class="icon">>></span>
        </div> -->
      </div>
    </div>
    <!-- 查询无订单 -->
    <rule-page ref="orderErr" closeType='bottom'>
      <img src="./../assets/img/OderNoneAlert.png" style="margin-top:0">
    </rule-page>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import RulePage from './RulePage'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import {mapActions, mapGetters} from 'vuex'
import {MessageBox, Toast} from 'mint-ui'
import _global from './../assets/js/global.js'
export default {
  name:'UserQuery',
  pageName: "查询",
  footFlag: 3,
  mixins: [_global],
  components: {
    HeaderPage,
    RulePage,
  },
  data () {
    return{
      name: '',
      phoneNumber: '',
    }
  },
  computed: {
		...mapGetters(['getStateData']),
	},
  mounted () {
    
  },
  methods:{
    GiftListBtn:function(){ // 礼品查询
      this.$router.push({path:'GiftList2_4'});
    },
    SubmitLimitQuery() {
      // this.$router.push({path:'/SubmitLimitQuery'});
      this.queryQrder()
    },
    ResultBtn:function(){ // 授信结果查询 old
      this.$router.push({path:'CreditResult'});
    },
    yuyueBtn:function(){ // 试驾查询
      this.$router.push({path:'YuyueResults'});
    },
    logOut:function(){
      localStorage.removeItem('islogin');
      localStorage.removeItem('phoneNumber');
      this.$router.push({path:'GiftQuery'});
    },
    alert_creditQuery() { // 授信结果查询
      this.resultQuery()
    },
    resultQuery () {
      let _param = {
          "phone": this.getStateData.phone || localStorage.phoneNumber
      }
      console.log(_param)
      let _url = '/finance/getcreditresult'
      RequestAxios.post(_url, _param).then((res) => {
        console.log(res)
        if(!res.flag) {
          Toast('' + res.message)
          return false
        }
        let _dt = res.data[0]
        if(parseInt(_dt.expectMoney) > 0){
          this.TYTWinClk(res)
        }else {
          this.TYTWinClk_err()
        }
      }, (err) => {
          console.log('err:',err)
      }).catch((err) => {
          console.log('catch err:>', err)
      })
    },
    // 丰田金融成功窗
    TYTWinClk (ev) {
      MessageBox({
          title: '',
          message: 
            `<div class="seccessBack">
              <img src="${this.TYT_seccess()}" style="width:100%;">
              <div class="moneyTxt">
                <span>${ev.data[0].expectMoney}</span>
                <sub>元</sub>
              </div>
            </div>`,
          showConfirmButton:true,
          showCancelButton: false, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'TYTPopConfirmBtn',
          confirmButtonText:'在线预订抽大奖',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{// /OrderCarForm
        if(ev == 'confirm') {
          this.$router.push({path:'/OrderCarForm'})
        }
      });
    },
    TYT_seccess () {
      return require('./../assets/img/TYT_seccess.png')
    },
    TYTWinClk_err () {
      MessageBox({
          title: '',
          message: 
            `<div class="seccessBack">
              <img src="${this.TYT_error()}" style="width:100%;">
            </div>`,
          showConfirmButton:true,
          showCancelButton: false, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'TYTErrPopConfirmBtn',
          confirmButtonText:'在线预订抽大奖',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{
        if(ev == 'confirm') {
          this.$router.push({path:'/OrderCarForm'})
        }
      });
    },
    TYT_error () {
      return require('./../assets/img/TYT_error.png')
    },
    queryQrder() {
        let _param = {
          "phone": this.getStateData.phone || localStorage.phoneNumber
          // 'phone': '18210130237'
        }
        console.log(_param)
        let _url = '/order/getorders'
        RequestAxios.post(_url, _param).then((res) => {
          if(res.flag) { // 有订单
            this.$router.push({path:'/SubmitLimitQuery',query: {_item: res.data[0],itemList: res.data}});
          }else { // 无订单
            this.$refs.orderErr.ruleClk()
          }
        }, (err) => {
            console.log('err:',err)
        }).catch((err) => {
            console.log('catch err:>', err)
        })
      },
  },
  activated() {
    // this.$refs.orderErr.ruleClk()
    this.phoneNumber=this.getStateData.phone || localStorage.phoneNumber
  }
}
</script>

<style lang="less"> 
    .userQuery {
      width:100%;
      overflow: hidden;
      padding-bottom: 0.4rem;
      .btnBox{
        margin-top: 1.16rem;
        text-align: center;
        >button{
          width:3.41rem;
          height: .6rem;
          background: #be3932;
          font-size: .28rem;
          color: #fff;
          border-radius: .3rem;
        }
      }
      .userBox {
        background: url('./../assets/img/userQuery_back.jpg');
        background-size: contain;
        position: relative;
        .head {
          display: inline-block;
          height: 2rem;
          position: relative;
          top: 0.02rem;
        }
        .button {
          position: absolute;
          right: 0.6rem;
          bottom: 0.5rem;
          height:0.2rem;
        }
      }
      .phone {
        font-size: 0.4rem;
        margin: 0.4rem 0 1rem;
      }
    }
    .queryList {
      padding: 0 .3rem;
      .queryBox{
        .queryItem{
          display: flex;
          align-items: center;
          height:.94rem;
          border-bottom: 1px solid #ebebeb;
          background: url('./../assets/img/UserQuery_right.jpg') right center no-repeat;
          background-size: 2.5%;
           >span{
             display: inline-block;
             font-size: .28rem; 
           }
           .txt{
                margin-right:.16rem;
            }
            .titleImg {
              width: 0.3rem;
              margin-right: 0.1rem;
            }
        }
        .queryItem:active {
          color: #999;
        }
      }
    }
    .TYTPopConfirmBtn {
      position: absolute;
      top: 6.4rem;
      left: 50%;
      margin-left: -1.7rem;
      width: 3.4rem;
      height: .7rem;
      line-height: .7rem;
      background: #fff;
      color: #be3932;
      border-radius: 20px;
      font-size: .28rem;
      letter-spacing: 5px;
    }
    .TYTErrPopConfirmBtn {
      position: absolute;
      top: 4.5rem;
      left: 50%;
      margin-left: -1.7rem;
      width: 3.4rem;
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
</style>
