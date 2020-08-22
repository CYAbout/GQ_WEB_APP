<template>
  <!-- 首页-评测结果及订单查询 -->
  <div class="submitLimitQuery ">
    <header-page></header-page>
    <div class="giftContentBox">
      <!-- 标题 -->
      <h2 class="titleH2">
        <span class="titSpan">雷凌 ></span>
        <img src="@/assets/img/tit_limit.png" class="titImg">
      </h2>
    </div>
    <mt-swipe :auto="4000" :showIndicators="true">
      <mt-swipe-item v-for="(_obj,ind) in itemList" :key="ind">
        <img :src="_obj.imagesurl" class="carImg"/>
        <h3 class="carTitle">{{_obj.carmodelname}} {{_obj.carversioncode}} {{_obj.carversioname}}</h3>
        <div class="formGlobal">
          <!-- <form-input label="订单号" v-model="_obj.thirdpartyorderno" placeholder="" readonly="readonly"/> -->
          <form-input label="购车店" v-model="_obj.dealerName" placeholder="" readonly="readonly"/>
          <form-input label="地址" v-model="_obj.dealeraddress" placeholder="" readonly="readonly"/>
        </div>
        <!-- <form-submit-btn @submit="submitClk">立即支付</form-submit-btn> -->
        <div class="flagBox" v-if="_obj">
          <div>{{orderPay(_obj.orderPayState)}}</div>
        </div>
        <div v-if="_obj.orderPayState != 0" style="color:#be3932;text-align:right;padding: 0.2rem;margin-top: 1rem;font-size: 0.2rem;">*以上订单信息以丰云行APP为准</div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  import HeaderPage from './HeaderPage'
  import { RequestAxios, RequestGet } from "./../assets/js/server.js"
  import FormSubmitBtn from './formList/FormSubmitBtn'
  import FormInput from './formList/FormInput'
  import {mapActions, mapGetters} from 'vuex'
  import {MessageBox, Toast} from 'mint-ui'
  import _global from './../assets/js/global.js'
  export default {
    name:'UserQuery',
    pageName: "订车订单查询",
    footFlag: 3,
    mixins: [_global],
    components: {
      HeaderPage,
      FormSubmitBtn,
      FormInput,
    },
    data() {
      return {
        item: {},
        itemList: [],
      }
    },
    computed: {
      ...mapGetters(['getStateData']),
    },
    methods: {
      submitClk() {
        window.getmsg = (ev)=> {
          console.log(ev,this.item.thirdpartyorderno)
          this.getGtmc(ev,this.item.thirdpartyorderno)
        }
        // 判断平台
        this.GTMC.getEnvironment('getmsg')
      },
      getGtmc(ev,_orderno) {
        let _payState = {
          "payType":0,
          "buyType":0,
          "userId":0,
          "phone": this.item.phone, // 用户手机号
          "userName": this.item.userName, // 用户名称
          "cardId": this.item.iDcard, // 身份证号 String
          "buyerPhone":"",
          "buyerName":"",
          "provinceCountry": this.item.province + '' + this.item.city,  // 省市
          "address": this.item.receivingaddress, // 收货地址
          "enterpriseName":null,
          "enterpriseCode":null,
          "payPrice": this.item.payprice.toFixed(2),  // 意向金金
          "officialPrice": this.item.officialprice.toFixed(2),  // 官方指导价格 Number 0.00
          "colorPrice": this.item.colorprice.toFixed(2),       // 颜色价格 Number 0.00
          "sumPrice": this.item.sumprice.toFixed(2),  // 总价
          "carColorId": this.item.carcolorid, // 车型颜色表主键 Number
          "carColorCode": this.item.carcolorcode,   // 车型颜色code
          "carColorName": this.item.carcolorname,     // 车型颜色名称
          "vhcCode":null,
          "sfxCode":"",
          "carModelId": this.item.carmodelid,       // 车系id Number
          "carModelCode": this.item.carmodelcode,     // 车系code String
          "carModelName": this.item.carmodelname,     // 车系名称 String
          "carVersionId":null,
          "carVersionCode": this.item.carversioncode,   // 车型版本code String
          "carVersionName": this.item.carversioname,   // 车型版本名称
          "orderStatus":1,
          "dealerCode": this.item.dealerId, // 销售店码
          "dealerName": this.item.dealerName, // 销售店名
          "demoImg": this.item.imagesurl,          // 车型默认图片
          "exhaust":"",
          "eipModelId":"",
          "payDate":null,
          "sendMsgFlag":null,
          // "createDate":1556266960203,
          "createBy":"",
          // "updateDate":1556266960203,
          "thirdPartyOrderNo": _orderno, // Number
          // "updateBy":"",
          "sourceFrom":"0",
        }
        console.log('_payState:',_payState)
        // return
        if (ev.resultCode == '2') { // 移动web页面
          console.log('resultCode2:',ev.resultCode)

          this.GTMC.WebToApp({
              "fType":"5",
              "code":"10171001",
              "payState":_payState,

            // "payState":{"payType":0,"buyType":0,"userId":209132,"phone":"13764771940","userName":"得","cardId":"366646466666465465","buyerPhone":"13764771940","buyerName":"","provinceCountry":"贵州省黔东南州","address":"3呃呃呃得得得","enterpriseName":null,"enterpriseCode":null,"payPrice":1.00,"officialPrice":144800.00,"colorPrice":0.00,"sumPrice":144800.00,"carColorId":25,"carColorCode":"6W9","carColorName":"碧玉蓝","vhcCode":null,"sfxCode":"R0EA","carModelId":26,"carModelCode":"C-HR","carModelName":"C-HR","carVersionId":null,"carVersionCode":"2.0Ent FA20 G5","carVersionName":"精英版 黑内色","orderStatus":1,"dealerCode":"44A10","dealerName":"广汽丰田第一店","demoImg":"https://carapptest.gtmc.com.cn/fs01/20190228/4f79476e4d5b0e81112c863639b262c6.png","exhaust":"2.0L","eipModelId":"MAXA10L-EHXDHC","payDate":null,"sendMsgFlag":null,"createDate":1556266960203,"createBy":"209132","updateDate":1556266960203,"thirdPartyOrderNo":123456789,"updateBy":"209132","sourceFrom":"0"
            // }


          });


        }else if (ev.resultCode == '3') { // APP页面
          console.log('resultCode3:',ev.resultCode)

          // 丰云能量首页
          this.GTMC.toPage({
            "code": "10171001",
            "payState":_payState,

            // "payState":{"payType":0,"buyType":0,"userId":209132,"phone":"13764771940","userName":"得","cardId":"366646466666465465","buyerPhone":"13764771940","buyerName":"","provinceCountry":"贵州省黔东南州","address":"3呃呃呃得得得","enterpriseName":null,"enterpriseCode":null,"payPrice":1.00,"officialPrice":144800.00,"colorPrice":0.00,"sumPrice":144800.00,"carColorId":25,"carColorCode":"6W9","carColorName":"碧玉蓝","vhcCode":null,"sfxCode":"R0EA","carModelId":26,"carModelCode":"C-HR","carModelName":"C-HR","carVersionId":null,"carVersionCode":"2.0Ent FA20 G5","carVersionName":"精英版 黑内色","orderStatus":1,"dealerCode":"44A10","dealerName":"广汽丰田第一店","demoImg":"https://carapptest.gtmc.com.cn/fs01/20190228/4f79476e4d5b0e81112c863639b262c6.png","exhaust":"2.0L","eipModelId":"MAXA10L-EHXDHC","payDate":null,"sendMsgFlag":null,"createDate":1556266960203,"createBy":"209132","updateDate":1556266960203,"thirdPartyOrderNo":123456789,"updateBy":"209132","sourceFrom":"0"
            // }
            
          });

        }

      },
      orderPay(ev) {
        let _json = {
          0: '报名成功',
          1: '待支付',
          2: '支付处理中',
          3: '支付成功',
          4: '已取消',
          5: '已转销售订单',
          6: '退款中',
          7: '退款成功',
          8: '删除',
        }
        return _json[ev]
      }
    },
    activated () {
      this.item = this.$route.query._item
      this.itemList = this.$route.query.itemList
    }
  }
</script>

<style lang="less">
  .submitLimitQuery {
    .carImg {
      width: 100%;
    }
    .carTitle {
      color: #be3932;
      margin: 0.3rem 0;
    }
    .formGlobal {
      .iptBox {
        border-bottom: none;
        border-top: 1px solid #ebebeb;
      }
      .cont {
        text-align: left;
        text-indent: 0.6rem;
      }

    }
    // 轮播
    .mint-swipe {
      height:9.5rem;
      .mint-swipe-indicators {
        width:100%;
        bottom:1rem;
      }
       .mint-swipe-indicator {
        background:#be3932;
        opacity: 1;
        border-radius: 4px;
        transition: width 0.3s;
      }
      .mint-swipe-indicator.is-active {
        width: 25px;
        transition: width 0.3s;
      }
    }
   
  }
  .flagBox{
    border-bottom: 2px solid #be3932;
    color: #be3932;
    height: 0.16rem;
    font-weight: bold;
    width: 2.3rem;
    display: inline-block;
    margin-top: 0.3rem;
    >div {
      width:1.8rem;
      background: #fff;
      font-size: 0.32rem;
      height: 0.32rem;
      display: inline-block;
    }
  }
</style>
