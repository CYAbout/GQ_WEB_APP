<template>
  <!-- 1.0-在线预订 -->
  <div class="OrderCarForm">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="cardBox">
			<img class="card" src="./../assets/img/SubstriBuy_banner.png">
      <img class="button" @click="ruleClk" src="./../assets/img/orderCarForm_btn.png" style="left:1rem"/>
	  </div>
    <div class="formGlobal">
      <form-input label="真实姓名" v-model="apply.customer_name" placeholder="请输入真实姓名" maxlength="16" type="text"/>
		  <form-input label="手机号" v-model="apply.phone" placeholder="请输入手机号" maxlength="11"/>
      <form-input v-model="apply.id_card" label="身份证号" placeholder="请输入身份证号" maxlength="18"/>
      <form-select @shoupup="getProvince" label="省份" v-model="province_obj" :data-list="provinceData" name-key="provincename" code-key="provincecode" placeholder="请选择省份"/>
      <form-select @shoupup="getCity"  label="城市" v-model="city_obj" :data-list="cityData" name-key="cityname" placeholder="请选择城市"/>
      <form-select @shoupup="getDealer" label="销售店" v-model="dealer_obj" :data-list="dealerData" name-key="dealer_name" code-key="dealer_code" placeholder="请选择销售店"/>
      <div class="grayLine"></div>
      <form-select @shoupup="getModle" label="车型" v-model="modle_obj" :data-list="modleData" name-key="modle_name" placeholder="请选择车型"/>
      <form-input label="车架号" v-model="apply.vin" placeholder="请输入车架号" maxlength="17" type="text"/>
      <form-input label="行驶里程" v-model="apply.mileage" placeholder="请输入行驶里程" maxlength="20"/>
      <form-input label="拍卖底价" v-model="apply.price" placeholder="请输入手拍卖金额" maxlength="20"/>
      <form-checkbox v-model="checkVal" class="agreement">我已阅读并同意<span @click="routerLink('ReplacementDeal')">《广汽丰田保值换购车辆拍卖底价协议》</span></form-checkbox> 
      <form-submit-btn @submit="subBtn">立即申请</form-submit-btn>
    </div>
    <!-- 活动规则弹窗-->
    <rule-page ref="rp">
      <img src="./../assets/img/保值换购活动.jpg">
    </rule-page>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import FormInput from './formList/FormInput'
import FormSelect from './formList/FormSelect'
import FormMsgCode from './formList/FormMsgCode'
import FormCheckbox from './formList/FormCheckbox'
import FormSlot from './formList/FormSlot'
import FormSubmitBtn from './formList/FormSubmitBtn'
import {Toast,MessageBox} from 'mint-ui'
import {mapActions, mapGetters} from 'vuex'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import _global from './../assets/js/global.js'
import RulePage from './RulePage'
export default {
  name:'substriBuy',
  pageName: '保值换购',
  footFlag: 0,
  mixins: [_global],
  watch: {
  },
  components: {
    HeaderPage,
    FormInput,
    FormSelect,
    FormMsgCode,
    FormSlot,
    RulePage,
    FormCheckbox,
    FormSubmitBtn,
  },
  data () {
    return {
      apply : {
        customer_name: '', //
        phone: '', //
        id_card: '', //
        province_code: '',
        city_code: '',
        dealer_code: '',
        modle_code: '',
        vin: '', // 车架号 
        mileage: '', // 行驶里程 
        price: '', // 拍卖底价
      },
      checkVal: 0,
      province_obj: {},
      city_obj: {},
      dealer_obj: {},
      modle_obj: {},
      provinceData: [],
      cityData: [],
      dealerData: [],
      modleData: [],
    }
  },
  methods: {
    subBtn() { // 立即申请
      this.apply.province_code = this.province_obj.provincecode
      this.apply.city_code = this.city_obj.citycode
      this.apply.dealer_code = this.dealer_obj.dealer_code
      this.apply.modle_code = this.modle_obj.modle_code
      console.log(this.apply)

      var _isName = this.isTypeExp('name',this.apply.customer_name)
      if(!_isName) {return false}
      var _isPhone = this.isTypeExp('phone',this.apply.phone)
      if(!_isPhone) {return false}
      var _isCard = this.isTypeExp('card',this.apply.id_card)
      if(!_isCard) {return false}
      var _exp = this.hasValExp(this.apply)
      if(!_exp) {return false}
      if(this.checkVal == 0) {
        Toast('请阅读并同意相关协议')
        return false
      }
      let _param = {
        "customer_name": this.apply.customer_name,
        "phone": this.apply.phone, 
        "id_card": this.apply.id_card,
        "province_code": this.province_obj.provincecode,
        "province_name": this.province_obj.provincename,
        "city_code": this.city_obj.citycode,	
        "city_name": this.city_obj.cityname,	
        "dealer_code": this.dealer_obj.dealer_code,
        "dealer_name": this.dealer_obj.dealer_name,
        "modle_name": this.modle_obj.modle_name,
        "modle_code": this.modle_obj.modle_code,
        "vin": this.apply.vin,
        "mileage": this.apply.mileage,
        "price": this.apply.price,
      }
      let url = '/gsys/leiling/clueValueForBuy'
      RequestAxios.post(url,_param).then((res)=>{
        console.log('res:',res)
        if(res.code != '200') {
          Toast(res.message)
          return false
        }
        // 成功弹窗
        this.subSuccess(res)
        
      })


    },
    subSuccess(res) {
      MessageBox({
          title: '',
          message: 
            `<div class="seccessBack">
              <img src="${this.TYT_seccess()}" style="width:100%;">
            </div>`,
          showConfirmButton:true,
          showCancelButton: false, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'TYTPopConfirmBtn',
          confirmButtonText:'立即去丰云惠',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{
        if(ev == 'confirm'){
          window.location.href = 'https://mall.gac-toyota.com.cn/Activities?ID=a4205ece-8c0f-4983-84cd-a91100ef72ca'
        }
        console.log(ev)
      });
    },
    TYT_seccess () {
      return require('./../assets/img/alert_FENGYUNHUI.png')
    },
    //获取省份
		getProvince () {
			let that = this;
			let url = '/gsys/leiling/proviceList'
			RequestGet(url).then((res) => {
					console.log(res);
			if(res.statusCode===200){
					res.content = res.content || {};
					res.content.provinceList = res.content.provinceList || [];
					that.provinceData = res.content.provinceList;
			}
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
		},
		//获取城市
		getCity () {
			let that = this;
			console.log(this.province_obj)
			let _param = {
				provinceCode: this.province_obj.code
			}
			let url = '/gsys/leiling/cityList'
			RequestGet(url,_param).then((res) => {
					console.log(res);
			if(res.statusCode===200){
					res.content = res.content || {};
					res.content.cityList = res.content.cityList || [];
					that.cityData = res.content.cityList;
			}
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
		},
		//获取销售店
		getDealer () {
			let that = this;
			let url = '/gsys/leiling/dealerList'
			let _param = {
				dealerProvinceCode: this.province_obj.provincecode,
        dealerCityCode: this.city_obj.citycode,
			}
			RequestGet(url,_param).then((res) => {
					console.log(res);
			if(res.statusCode===200){
					res.content = res.content || {};
					res.content.dealerList = res.content.dealerList || [];
					that.dealerData = res.content.dealerList;
			}
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
		},
		//获取车型
		getModle () {
			let that = this;
			let url = '/gsys/leiling/carModelList'
			RequestGet(url).then((res) => {
					console.log(res);
			if(res.statusCode===200){
					res.content = res.content || {};
					res.content.carModelList = res.content.carModelList || [];
					that.modleData = res.content.carModelList;
			}
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
    },
    //活动详情
     ruleClk() {
      this.$refs.rp.ruleClk()
    },
    //跳转
    routerLink(url) {
      this.$router.push({ path:url });
    }
  },
  activated() {
  }
}

</script>

<style lang="less"> 
  .grayLine {
    background: #fafafa;
    height: 0.41rem;
    margin-top: -1px;
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
      top: 1.86rem;
      left: 1.7rem;
      background: none;
      color: #f8f8f8;
      font-size: 0.22rem;
      height: 0.66rem;
    }
  }
  .moneyBox {
    position: relative;
    .yuan {
      position: absolute;
      right: 0.16rem;
      bottom: 0.29rem;
      font-size: 0.12rem;
      color: #999;
    }
  }
  .checkList {
    .iptBox_check {
      display: inline-block;
    }
  }
  .formGlobal .agreement {
    margin-top: 0.2rem;
  }
  .TYTPopConfirmBtn {
    position: absolute;
    top: 4rem;
    left: 50%;
    margin-left: -1.8rem;
    width: 3.6rem;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #fff;
    color: #be3932;
    border-radius: 20px;
    font-size: 0.28rem;
    letter-spacing: 5px;
  }
</style>
<style>
  .OrderCarForm .close {
    display: none;
  }
</style>
