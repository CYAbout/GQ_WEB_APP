<template>
  <!-- 1.1首页-预约试驾 -->
  <div class="AppointDrive">
    <!-- 头部 -->
    <header-page></header-page>
    <div class="cardBox">
			<img class="card" src="./../assets/img/appointDrive_banner.png">
      <img class="button" @click="ruleClk" src="./../assets/img/banner_sel_btn.png"/>
	  </div>
    <div class="appointCont formGlobal">
      <!-- 表单 -->
      <div class="formBox">
        <form-input label="真实姓名" v-model="form.name" placeholder="请输入真实姓名" maxlength="16" type="text"/>
        <form-input label="手机号" v-model="form.phone" placeholder="请输入手机号" maxlength="11" @blur="phoneBlur"/>
        <form-msg-code
          label="验证码"
          :phone-type="phoneType"
          :phone-number="form.phone"
          v-model="form.msgCode"
          placeholder="请输入验证码"
        />
        <!-- <form-input label="身份证号" v-model="form.id_card" placeholder="请输入身份证号" maxlength="18"/> -->
        <div class="lineBox"></div>
        <form-select
          @shoupup="getProvince"
          label="省份"
          v-model="form.province"
          :data-list="provinceData"
          name-key="provincename"
          code-key="provincecode"
          placeholder="请选择"
        />
        <form-select
          @shoupup="getCity"
          label="城市"
          v-model="form.city"
          :data-list="cityData"
          ref="city"
          name-key="cityname"
          code-key="citycode"
          placeholder="请选择"
        />
        <form-select
          @shoupup="getDealer"
          @input="changeDealer"
          label="销售店"
          v-model="form.dealer"
          :data-list="dealerData"
          ref="dealer"
          name-key="dealer_name"
          code-key="dealer_code"
          placeholder="请选择销售店"
        />
        <form-input style="display:none;" label="店面地址" v-model="form.address" placeholder="" readonly="readonly"/>
        <form-select
          label="车型"
          v-model="form.carModle"
          :data-list="carModleData"
          placeholder="请选择"
        />
        <form-checkbox
          v-model="form.checkVal"
          class="agreement"
        >我已阅读并同意<span @click="routerLink('PersonalInformation')">《保护消费者个人信息基本方针》</span>及<span @click="routerLink('PrivacyPolicy')">《广汽丰田汽车有限公司隐私政策》</span>的规定；并允许广汽丰田及其销售店向本人发送相关商业信息。</form-checkbox>
        <form-submit-btn @submit="submitCilk" :background="nextflag ? '#999' : null" :disabled="nextflag">预约试驾领好礼</form-submit-btn>
      </div>
    </div>
    <!-- 活动规则弹窗-->
    <rule-page ref="rp" closeType="none" clickType="none">
      <img src="./../assets/img/appointDrive_txt.gif">
      <div class="goFYX" @click.stop="goFYX($event)"></div>
      <div class="goFYXClose" @click="ruleClkClose()"></div>
    </rule-page>
    <!-- 抽奖中 -->
    <rule-page ref="load" closeType='bottom'>
      <img src="./../assets/img/AppointDrive_loading.png" style="margin-top:0">
      <div style="position:absolute;bottom:2.8rem;color:#ffb5af;width:100%;letter-spacing: 0.06rem;">
        正在为您抽取试驾豪礼 <span style="display: inline-block;width: 1rem;">{{getDot}}</span>
      </div>
    </rule-page>
  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import HeaderPage from "./HeaderPage";
import FormInput from "./formList/FormInput";
import FormMsgCode from "./formList/FormMsgCode";
import FormSelect from "./formList/FormSelect";
import FormCheckbox from "./formList/FormCheckbox";
import FormSubmitBtn from "./formList/FormSubmitBtn";
import {mapActions, mapGetters} from 'vuex'
import { RequestAxios, RequestGet } from "./../assets/js/server.js";
import RulePage from './RulePage'
import _global from "./../assets/js/global.js"; //校验表单
export default {
  name: "AppointDrive",
  pageName: '预约试驾',
  footFlag: 0,
  mixins: [_global],
  components: {
    HeaderPage,
    FormInput,
    FormMsgCode,
    FormSelect,
    RulePage,
    FormCheckbox,
    FormSubmitBtn,
  },
  data() {
    return {
      form: {
        //    name:'',//姓名
        //    phone:'',//手机号
        //    msgCode:'',//验证码
        //    id_card:'',//身份证
        //    address:'',//销售店地址
        //    province:{},//选中的省份
        //    city:{},//选中的城市
        //    dealer:{},//选中的销售店铺
        //    carModle:{},//选中的车型

        name: "", //姓名
        phone: "", //手机号
        msgCode: "", //验证码
        // id_card: "", //身份证
        address: "", //销售店地址
        province: {}, //选中的省份
        city: {}, //选中的城市
        dealer: {}, //选中的销售店铺
        carModle: {}, //选中的车型
        checkVal: 0
      },
      provinceData: [], //所有省份
      cityData: [], //所在省份的所有城市
      dealerData: [], //销售店铺
      carModleData: [
        {code: '004036',name: '全新换代雷凌'},
        {code: '004038',name: '全新换代雷凌双擎'},
        {code: '004028',name: '2018款全新汉兰达'},
        {code: '004027',name: 'C-HR'},
        {code: '004033',name: '2019款凯美瑞'},
        {code: '004034',name: '2019款凯美瑞运动'},
        {code: '004035',name: '2019款凯美瑞双擎'},
        {code: '004031',name: '雷凌双擎E+'},
        {code: '004022',name: '雷凌'},
        {code: '004023',name: '雷凌双擎'},
        {code: '004020',name: '致炫'},
        {code: '004021',name: '致享'},
        {code: '004037',name: '埃尔法双擎'},
        {code: '004029',name: '广汽ix4'},
      ], //车型
      phoneType: "1", //验证码类型
      getDot: ' . . .', // 等待状态
      nextflag: false,
    };
  },
  methods: {
    ...mapActions(['setStateData']),
    phoneBlur() {
      var _isPhone = this.isTypeExp('phone',this.form.phone)
      if(!_isPhone) {return false}
      let _url = '/gsys/leiling/checkOnlyByPhone'
      let _param = {
        whichInterface: '1',
        phone: this.form.phone,
      }
      RequestGet(_url,_param).then(res => {
        let _code = res.code
        if (_code == '202') {
          this.form.phone = ''
          // MessageBox.alert(res.message).then(()=>{
          //   console.log('确定')
          // })
          this.phoneErrAlert(res.message)
          this.nextflag = true
          return
        }
        this.nextflag = false
        console.log(res)
      },err => {
            console.log("err:", err);
          }
        )
      
    },
    goFYX (e) {
      window.location.href = 'https://mall.gac-toyota.com.cn/zh-CN/Mobile/Register'
    },
    phoneErrAlert (msg) {
       this.IS_SHIJIA_err()
    },
    IS_SHIJIA_err () {
      MessageBox({
          title: '',
          message: 
            `<div class="seccessBack">
              <img src="${this.SHIJIA_error()}" style="width:100%;">
            </div>`,
          showConfirmButton:true,
          showCancelButton: false, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'TYTErrPopConfirmBtn SHIJIA_BTN',
          confirmButtonText:'关闭',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{
        if(ev == 'confirm') {
        }
      });
    },
    SHIJIA_error () {
      return require('./../assets/img/shijia_yiyuyue.png')
    },
    getProvince() {
      // 清空城市
      this.$refs['city'].message = ''
      this.form.city = {}
      // 清空销售店
      this.$refs['dealer'].message = ''
      this.form.dealer = {}
    },
    //获取省份
    getProvinceInit() {
      let that = this;
      let url = "/gsys/leiling/proviceList";
      // let url = 'https://mall.ftms.devbmsoft.cn/product/api/getProCatalogByParentId/1'
      RequestGet(url)
        .then(
          res => {
            console.log(res);
            if (res.statusCode === 200) {
              res.content = res.content || {};
              res.content.provinceList = res.content.provinceList || [];
              that.provinceData = res.content.provinceList;
            }
          },
          err => {
            console.log("err:", err);
          }
        )
        .catch(err => {
          console.log("catch err:>", err);
        });
    },
    //获取城市
    getCity() {
      // 清空销售店
      this.$refs['dealer'].message = ''
      this.form.dealer = {}

      this.cityData = []
      let url = "/gsys/leiling/cityList";
      let param = {
        provinceCode: this.form.province.code
      };
      // console.log('getCity',this.form.province);
      RequestGet(url, param)
        .then(
          res => {
            if (res.statusCode === 200) {
              res.content = res.content || {};
              res.content.cityList = res.content.cityList || [];
              this.cityData = res.content.cityList;
              console.log("getCity", this.cityData);
            }
          },
          err => {
            console.log("err:", err);
          }
        )
        .catch(err => {
          console.log("catch err:>", err);
        });
    },
    //获取店铺
    getDealer() {
      this.dealerData = []
      let url = "/gsys/leiling/dealerList";
      let param = {
        dealerProvinceCode: this.form.province.code,
        dealerCityCode: this.form.city.code
      };

      RequestGet(url, param)
        .then(
          res => {
            if (res.statusCode === 200) {
              console.log("getDealer", res);
              res.content = res.content || {};
              res.content.dealerList = res.content.dealerList || [];
              this.dealerData = res.content.dealerList;
            }
          },
          err => {
            console.log("err:", err);
          }
        )
        .catch(err => {
          console.log("catch err:>", err);
        });
    },

    //改变店铺获取店铺地址
    changeDealer() {
      console.log("getDealer", this.form.dealer.address);
      this.form.address = this.form.dealer.address
        ? this.form.dealer.address
        : "";
    },
    //获取车型
    // getCarModleInit() {
    //   let url = "/gsys/leiling/carModelList";

    //   RequestGet(url)
    //     .then(
    //       res => {
    //         if (res.statusCode === 200) {
    //           res.content = res.content || {};
    //           res.content.carModelList = res.content.carModelList || [];
    //           this.carModleData = res.content.carModelList;
    //         }
    //       },
    //       err => {
    //         console.log("err:", err);
    //       }
    //     )
    //     .catch(err => {
    //       console.log("catch err:>", err);
    //     });
    // },
    submitCilk() {
      // 非空校验
      let apply = {
        idCardName: this.form.name,
        phone: this.form.phone,
        // idCard: this.form.id_card,
        phonecode: this.form.msgCode,
        provinceName: this.form.province.name,
        cityName: this.form.city.name,
        dealerName: this.form.dealer.name,
        modleCarName: this.form.carModle.name,
        address: this.form.address
      };
      var _isName = this.isTypeExp('name',apply.idCardName)
      if(!_isName) {return false}
      var _isPhone = this.isTypeExp('phone',apply.phone)
      if(!_isPhone) {return false}
			if(apply.phonecode.length !=6) {
				Toast('请输入6位验证码')
        return false
			}
      let _exp = this.hasValExp(apply);
      if (!_exp) {
        return false;
      }
      if (this.form.checkVal === 1) {
        let url = "/gsys/leiling/clueTestDrive";
        let param = {
          // ...this.form,
          address: this.form.address,
          customer_name: this.form.name,
          phone: this.form.phone,
          city_code: this.form.city.code,
          city_name: this.form.city.name,
          province_code: this.form.province.code,
          province_name: this.form.province.name,
          dealer_code: this.form.dealer.code,
          dealer_name: this.form.dealer.name,
          modle_code: this.form.carModle.code,
          modle_name: this.form.carModle.name,
          communication_time: "",
          pre_fetch_time: "",
          pre_time: "",
          source: "1",
          // id_card: this.form.id_card,
          phonecode: this.form.msgCode
        };
        //   console.log('submitCilk',param);
        RequestAxios.post(url, param).then(res => {
          console.log(res.code)
          console.log(typeof res.code)
          if(res.code !== '200') {
            Toast('' + res.message)
            return false
          }
          localStorage.phoneNumber = this.form.phone
          localStorage.islogin = true
          let _apply = { 
            idCardName: this.form.name,
            phone: this.form.phone,
            provinceName: this.form.province.name,
            province_code: this.form.province.code,
            cityName: this.form.city.name,
            city_code: this.form.city.code,
            dealerName: this.form.dealer.name,
            dealer_code: this.form.dealer.code,
            modleCarName: this.form.carModle.name,
            modle_code: this.form.carModle.code,
          }
          this.setStateData(_apply)

          // 抽奖弹窗
          this.getDotFun(()=> {
            let _gift = res.content.gift
            if (_gift){ // 中奖
              let _item = {
                name: _gift.name,
                code: _gift.code,
                id: _gift.id,
                gifttype: '0', // 0试驾礼，1购车礼
              }
              this.$router.push({'path': '/PrizePage',query: {item: _item}})
              
            } else { // 未中奖
              this.TYTWinClk_err(()=> {
                this.$router.push({path: '/OrderCarForm'})
              })
              
            }
          })
        },
        err => {
          console.log("err:", err);
        }).catch(err => {
          console.log("catch err:>", err);
        });
      }else {
        Toast('请阅读并同意相关协议')
      }
    },
    //查看活动详情
    btnDetail() {
      MessageBox({
        title: "",
        message:
          '<div class="popContentBox popContentBox8">' +
          '<div class="popBoxRed">' +
          '<h2 class="popTitle">活动说明<i class="popBlock"></i></h2>' +
          '<p class="popTxt">活动时间：<br>2019年5月10日—2019年6月10日</p>' +
          '<p class="popTxt8">活动奖励：试驾礼<br>（车造型抱枕被、雨伞收纳、车钥匙包、<br>车载手机支架，随机抽取其中一种）</p>' +
          '<p class="popTxt8_1">活动说明：<p>' +
          '<p class="popTxt8_2">1、在活动期间在线预约新雷凌车型试驾后可参与抽奖，即有机会获得试驾礼品<p>' +
          '<p class="popTxt8_2">2、中奖用户可到店参与试驾后向经销店索取奖品<p>' +
          '<p class="popTxt8_2">3、本次活动最终解释权归广汽丰田所有<p>' +
          '<p class="popTxt8_2">4、咨询电话：400 830 8888 转 2<p>' +
          "</div>" +
          "</div>",
        showCancelButton: true,
        showConfirmButton: false,
        className: "vinWidthBox",
        cancelButtonClass: "popCloseBtn",
        cancelButtonText: ""
      });
    },
    ruleClk() {
      this.$refs.rp.ruleClk();
    },
    ruleClkClose() {
      this.$refs.rp.ruleClkClose();
    },
    destroyed() {
      clearTimeout(this.timer);
    },
    //跳转
    routerLink(url) {
      this.$router.push({ path:url });
    },
    getDotFun (_callback) { // 抽奖中动态触发
      this.$refs.load.ruleClk()
      let inte = null
      let ind = 0
      inte = setInterval(()=>{
        if(ind>3){
          ind = 0
        }
        ind==0 && (this.getDot=' ')
        ind==1 && (this.getDot=' . ')
        ind==2 && (this.getDot=' . . ')
        ind==3 && (this.getDot=' . . .')
        ind++ 
      },500)
      setTimeout(()=> { // 最多3秒后停止
        clearInterval(inte)
        this.$refs.load.ruleClkClose()
        _callback()
      },3000)
    },
    TYTWinClk_err (callback) {
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
          confirmButtonText:'在线预定抽大奖',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{
        if(ev == 'confirm') {
          callback()
        }
      });
    },
    TYT_error () {
      return require('./../assets/img/AppointDrive_noPrize.png')
    },
  },
  activated () {
    // this.$refs.load.ruleClk()
    this.getProvinceInit()
    // this.getCarModleInit()
  }
};
</script>

<style lang="less">
.AppointDrive {
  width: 100%;
}
.appointCont {
  margin-top: 0.15rem;
  background: #fafafa;
  //banner
  .topBanner {
    width: 6.9rem;
    height: 2.92rem;
    background: #fff;
    margin: 0 0.3rem;
    border-radius: 0.12rem;
    position: relative;
    > img {
      width: 100%;
      box-shadow: 1px 6px 8px 0px #c2c3c4;
    }
    .activityDetailBtn {
      position: absolute;
      bottom: 0.1rem;
      left: 0.2rem;
      width: 1.96rem;
      height: 0.44rem;
      line-height: 0.44rem;
      background: #fff;
      color: #be3932;
      font-size: 0.24rem;
      border-radius: 0.22rem;
      padding-right: 0.12rem;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0.13rem;
        margin-top: -0.1rem;
        width: 0.12rem;
        height: 0.2rem;
        background: url("./../assets/img/src/jiantou.png") no-repeat 100%;
      }
    }
  }
  .formBox {
    padding: 0 0.1rem;
    background: #fff;
    .agreement {
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
  .lineBox {
    height: 0.39rem;
    margin-top: -1px;
  }
}
//抽奖中的遮罩层
.AppointDriveMark {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.8;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .markImgBox {
    width: 100%;
    height: 100%;
    background: url("./../assets/img/抽奖.png") no-repeat center center;
    background-size: 100%;
    .waitBox {
      position: absolute;
      top: 7.98rem;
      left: 50%;
      width: 3.6rem;
      margin-left: -1.8rem;
      height: 0.7rem;
      padding-bottom: 0.1rem;
      border-bottom: 1px solid #f3bc41;
      > p {
        color: #fff;
        font-size: 0.24rem;
        height: 0.6rem;
        line-height: 0.6rem;
        // text-align:center;
      }
      .line {
        height: 1px;
        background: #f3bc41;
        position: relative;
        left: 0.18rem;
      }
    }
  }
}
  .cardBox {
    border-radius: 0.2rem;
    overflow: hidden;
    box-shadow: 0 5px 10px -4px #333;
    position: relative;
    margin: 0.4rem 0.2rem 0.6rem;
    .card {
      width:100%;
      margin-bottom: -1px;
    }
    .button {
      position: absolute;
      top: 1.94rem;
      left: 1.1rem;
      background: none;
      color: #f8f8f8;
      font-size: 0.22rem;
      height: 0.66rem;
    }
  }
  .TYTErrPopConfirmBtn {
    position: absolute;
    top: 4.8rem;
    left: 50%;
    margin-left: -2rem;
    width: 4rem;
    height: .7rem;
    line-height: .7rem;
    background: #fff;
    color: #be3932;
    border-radius: 20px;
    font-size: .28rem;
    letter-spacing: 5px;
  }
 .TYTErrPopConfirmBtn.SHIJIA_BTN{
    top: 3.9rem;
 }
</style>
<style>
  /* .mint-msgbox {
    background: #fff;
  }
  .mint-msgbox .mint-msgbox-message {
    color: #333;
  } */
  .goFYX{
    position:absolute;
    top:22rem;
    right:1.2rem;
    width:1.6rem;
    height:0.7rem;
  }
  .goFYXClose{
    position:absolute;
    top: 1rem;
    right: 0rem;
    width: 1.6rem;
    height: 1.2rem;
  }
</style>
