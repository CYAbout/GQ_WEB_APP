<template>
  <!-- 3.1-2-首页-金融机构选择-活动详情说明（工行） -->
  <div class="activityDetailTOYOTA">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="cardBox">
			<img class="card" src="./../assets/img/ActivityDetailTOYOTA_banner.png">
	  </div>
    <div class="AppointTitleBox">
			<h3 class="title">丰田金融</h3>
			<span class="titIcon">
				<img class="line_daikuan" src="./../assets/img/src/form_right.png" alt="">
			</span>
	  </div>
    <div class="formGlobal">
      <form-input v-model="apply.customer_name" label="真实姓名" placeholder="请输入真实姓名" maxlength="16" type="text"/>
      <form-input v-model="apply.phone" label="手机号" placeholder="请输入手机号" maxlength="11"/>
      <form-msg-code v-model="apply.phonecode" :phone-number="apply.phone" phone-type="4" label="验证码" placeholder="请输入验证码"/>
      <div class="grayLine"></div>
      <form-input v-model="apply.id_card" label="身份证号" placeholder="请输入身份证号" maxlength="18"/>
      <form-select label="婚姻状况" v-model="married_obj" :data-list="marriedData" name-key="name" code-key="code" placeholder="请选择婚姻状况"/>
      <form-input v-model="apply.bankcardnumber" label="银联卡号" placeholder="请输入银联卡号" maxlength="21"/>
      <div class="grayLine"></div>
      <form-select @shoupup="getProvince" label="省份" v-model="province_obj" :data-list="provinceData" name-key="statenme" code-key="statecde" placeholder="请选择省份"/>
      <form-select @shoupup="getCity"  label="城市" v-model="city_obj" :data-list="cityData" ref="city" name-key="citynme" code-key="citycde" placeholder="请选择城市"/>
      <form-select @shoupup="getDealer" label="销售店" v-model="dealer_obj" :data-list="dealerData" ref="dealer" name-key="dealer_name" code-key="dealer_code" placeholder="请选择销售店"/>
      <form-select label="车型" v-model="modle_obj" :data-list="modleData" name-key="name" placeholder="请选择车型"/>
      <form-input v-model="apply.address" label="详细地址" placeholder="请输入地址"/>
      <form-select label="地址类型" v-model="addresstype_obj" :data-list="addresstypeData" name-key="name" code-key="code" placeholder="请选择地址类型"/>
      <div class="grayLine"></div>
      <form-input v-model="apply.employer" label="工作单位" placeholder="请输入工作单位"/>
      <form-select label="教育程度" v-model="education_obj" :data-list="educationData" name-key="name" code-key="code" placeholder="请选择教育程度"/>
      <div class="moneyBox">
        <form-input v-model="apply.monthsalary" label="月收入" placeholder="请输入金额"  maxlength="20"/>
        <div class="yuan">元</div>
      </div>
      <!-- <form-select  label="颜色" v-model="val3" :data-list="cityData" name-key="name1" code-key="code1" placeholder="请选择颜色"/> -->
      <!-- <div class="moneyBox">
        <form-input v-model="downpayment" label="首付金额" placeholder="请输入首付金额"/>
        <div class="yuan">万</div>
      </div>
      <div class="moneyBox">
        <form-input v-model="loan" label="贷款金额" placeholder="请输入贷款金额"/>
        <div class="yuan">万</div>
      </div> -->
      <form-checkbox v-model="checkVal" class="agreement">我已阅读并同意<span @click="routerLink('AuthorizationBook')">《丰田汽车金融（中国）有限公司零售信贷预审电子授权书》</span>的规定，并允许广汽丰田及其销售店向本人发送相关商业信息。</form-checkbox> 
      <form-submit-btn @submit="submitClk">立即申请</form-submit-btn>
    </div>
    <!-- 查询授信等待 -->
    <rule-page ref="load" closeType='bottom'>
      <img src="./../assets/img/ActivityDetailTOYOTA_load.png" style="margin-top:0rem">
      <div class="radiu">
        <img class="loadImg" src="./../assets/img/load_radiu.png" alt="">
        <div class="rcont">
          <span>{{setTimer}}s</span>
        </div>
      </div>
    </rule-page>
    <!-- 授信查询失败弹超时 -->
    <rule-page ref="shouxinErr" closeType='bottom'>
      <img src="./../assets/img/shouxinErr.png" style="margin-top:0rem">
      <div class="radiu">
        <img class="loadImg" src="./../assets/img/load_radiu.png" alt="">
        <div class="rcont">
          <span>--s</span>
        </div>
      </div>
    </rule-page>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import FormInput from './formList/FormInput'
import FormSelect from './formList/FormSelect'
import FormMsgCode from './formList/FormMsgCode'
import FormSubmitBtn from './formList/FormSubmitBtn'
import FormCheckbox from './formList/FormCheckbox'
import RulePage from './RulePage'
import {Toast, MessageBox} from 'mint-ui'
import {mapActions, mapGetters} from 'vuex'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import _global from './../assets/js/global.js'
import { setTimeout } from 'timers';
export default {
  name:'activityDetailTOYOTA',
  pageName: '授信评测',
  footFlag: 2,
  mixins: [_global],
  components: {
    HeaderPage,
    FormInput,
    FormSelect,
    FormMsgCode,
    FormCheckbox,
    FormSubmitBtn,
    RulePage,
  },
  computed: {
		...mapGetters(['getStateData'])
	},
  data () {
    return {
      _inter: null,
      setTimer: 60,
      apply : {
        customer_name: '', //
        phone: '', //
        phonecode: '', // 手机验证码
        id_card: '', // 身份证号
        bankcardnumber: '', // 银行卡号
        province_code: '', // 省份
        province_name: '', //
        city_code: '', // 城市
        city_name: '', //
        dealer_code: '', // 销售店 dealername
        dealername: '', //
        modle_code: '', // 车型
        modle_name: '', //
        address: '', // 地址
        classification: '3', // 分类 1.六大行 2.直租 3.回租
        source: '2', // 具体来源
        channel: '2', // 申请授信的渠道，1工行，2丰金
        addresstype: '', // 地址类型 1家庭 2工作单位
        married: '', // 婚姻状况：1已婚2单身3 离异4丧偶
        employer: '', // 工作单位
        education: '', // 教育程度  9  专科 10 高中，中专，技校11 高中以下12 国内本科13 海外本科14 国内本科以上15海外本科以上
        monthsalary: '', // 月收入
      },
      checkVal: 0,
      province_obj: {},
      city_obj: {},
      dealer_obj: {},
      modle_obj: {},
      addresstype_obj: {},
      married_obj: {},
      education_obj: {},
      provinceData: [],
      cityData: [],
      dealerData: [],
      modleData: [
        {name: '全新换代雷凌',code: '004036'}
      ],
      addresstypeData: [
        {'name': '家庭','code': '1'},
        {'name': '单位','code': '2'},
      ],
      marriedData: [
        {name: '已婚',code: '00001'},
        {name: '单身',code: '00002'},
        {name: '离异',code: '00003'},
        {name: '丧偶',code: '00004'},
      ],
      educationData: [
        {name: '专科',code: '00009'},
        {name: '高中，中专，技校',code: '00010'},
        {name: '高中以下',code: '00011'},
        {name: '国内本科',code: '00012'},
        {name: '海外本科',code: '00013'},
        {name: '国内本科以上',code: '00014'},
        {name: '海外本科以上',code: '00015'},
      ],
    }
  },
  methods: {
    ...mapActions(['setStateData']),
    submitClk() {
        console.log(this.addresstype_obj)
			this.apply.province_code = this.province_obj.code
			this.apply.province_name = this.province_obj.name
			this.apply.city_code = this.city_obj.citycde
			this.apply.city_name = this.city_obj.citynme
			this.apply.dealer_code = this.dealer_obj.code
			this.apply.dealername = this.dealer_obj.name
			this.apply.modle_code = this.modle_obj.code
			this.apply.modle_name = this.modle_obj.name
      this.apply.addresstype = this.addresstype_obj.code
      this.apply.married = this.married_obj.code
      this.apply.education = this.education_obj.code

      var _isName = this.isTypeExp('name',this.apply.customer_name)
      if(!_isName) {return false}
      var _isPhone = this.isTypeExp('phone',this.apply.phone)
      if(!_isPhone) {return false}
			if(this.apply.phonecode.length !=6) {
				Toast('请输入6位验证码')
        return false
      }
      var _isCard = this.isTypeExp('card',this.apply.id_card)
      if(!_isCard) {return false}
			// 校验空值
			var _exp = this.hasValExp(this.apply)
			if(!_exp) {return false}
			if(this.checkVal == 0) {
        Toast('请阅读并同意相关协议')
        return false
      }
			let _param = this.apply
      console.log(_param)
			let _url = '/gsys/leiling/clueCredit'
			RequestAxios.post(_url, _param).then((res) => {
        if(res.code != '200') {
					Toast('' + res.message)
        	return false
        }

        let _apply = { 
          idCardName: this.apply.customer_name,
          phone: this.apply.phone,
          idCard: this.apply.id_card,
          bankCard: this.apply.bankcardnumber,
        }
        this.setStateData(_apply)

        // 打开等待计时
        this.getDotFun((_tm)=>{
          this.shouxin()
        }) 
        localStorage.phoneNumber = this.apply.phone
        localStorage.islogin = true
        console.log('res:',res)
			}, (err) => {
				console.log('err:',err)
			}).catch((err) => {
				console.log('catch err:>', err)
			})
    },
    shouxin() {
      let _param = {
        phone: this.apply.phone
      }
      let _url = '/finance/getcreditresult'
			RequestAxios.post(_url, _param).then((res) => {
        this.$refs.load.ruleClkClose() // 关闭等待计时
        if(!res.flag) {
					Toast('' + res.message)
        	return false
        }
        console.log('res:',res)
        let _dt = res.data[0]
        if(parseInt(_dt.expectMoney) > 0) {
          // 成功弹窗
          this.TYTWinClk(_dt)
        }else if(parseInt(_dt.expectMoney) == 0) {
          // 失败弹窗
          this.TYTWinClk_err() 
        } else if(_dt.expectMoney == -1) {
          this.$refs.shouxinErr.ruleClk()
        }
			}, (err) => {
				console.log('err:',err)
			}).catch((err) => {
				console.log('catch err:>', err)
			})
    },
    // 丰田金融成功窗
    TYTWinClk (_data) {
      MessageBox({
          title: '',
          message: 
            `<div class="seccessBack">
              <img src="${this.TYT_seccess()}" style="width:100%;">
              <div class="moneyTxt">
                <span>${_data.expectMoney}</span>
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

      }).then((ev)=>{
        console.log(ev)
        if(ev == 'confirm'){
          this.$router.push({path: '/OrderCarForm'})
        }
      });
    },
    TYT_seccess () {
      return require('./../assets/img/TYT_seccess.png')
    },
    // 丰田金融失败窗
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
        if(ev == 'confirm'){
          this.$router.push({path: '/OrderCarForm'})
        }
        console.log(ev)
      });
    },
    TYT_error () {
      return require('./../assets/img/TYT_error.png')
    },
    // 提交等待
    getDotFun (_callback) { // 抽奖中动态触发
      this.$refs.load.ruleClk()
      // this.$refs.load.ruleClkClose()
      var timer = 60
      this._inter = setInterval(()=> {
        timer -- 
        if(timer<1) {
          clearInterval(this._inter)
          this.$refs.load.ruleClkClose()
          _callback(timer)
          // Toast('请检查网络!');
        }
        this.setTimer = timer
      },1000)
      
      
    },
    getProvince() {
      // 清空城市
      this.$refs['city'].message = ''
      this.city_obj = {}
      // 清空销售店
      this.$refs['dealer'].message = ''
      this.dealer_obj = {}
    },
    //获取省份
		getProvinceInit () {
			let that = this;
			let url = '/fjandgsync/getprovincelist'
			RequestAxios.post(url).then((res) => {
					console.log(res);
			if(res.statusCode===200){
					that.provinceData = res.data;
			}
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
		},
		//获取城市
		getCity () {
      // 清空销售店
      this.$refs['dealer'].message = ''
      this.dealer_obj = {}

      let that = this;
      that.cityData = []
			console.log(this.province_obj.code)
			let _param = {
				statecde: this.province_obj.code
			}
			let url = '/fjandgsync/getcitylistbyprovinceid'
			RequestAxios.post(url,_param).then((res) => {
					console.log(res);
			if(res.statusCode===200){
					that.cityData = res.data;
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
      that.dealerData = []
      let url = '/gsys/leiling/dealerList'
      console.log(this.province_obj)
      console.log(this.city_obj)
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
			// let that = this;
			// let url = '/gsys/leiling/carModelList'
			// RequestGet(url).then((res) => {
			// 		console.log(res);
			// if(res.statusCode===200){
			// 		res.content = res.content || {};
			// 		res.content.carModelList = res.content.carModelList || [];
			// 		that.modleData = res.content.carModelList;
			// }
			// }, (err) => {
			// console.log('err:',err)
			// }).catch((err) => {
			// console.log('catch err:>', err)
			// })
    },
    getAddresstype() {
			// let that = this;
			// let url = '/gsys/leiling/carModelList'
			// RequestGet(url).then((res) => {
			// 		console.log(res);
			// if(res.statusCode===200){
			// 		res.content = res.content || {};
			// 		res.content.carModelList = res.content.carModelList || [];
			// 		that.modleData = res.content.carModelList;
			// }
			// }, (err) => {
			// console.log('err:',err)
			// }).catch((err) => {
			// console.log('catch err:>', err)
			// })
    },
     //跳转
    routerLink(url) {
      this.$router.push({ path:url });
    }
  },
  activated () {
    // this.$refs.load.ruleClk()
    this.getStateData.phone ? this.apply.phone =  this.getStateData.phone : null
    this.getStateData.idCardName ? this.apply.customer_name =  this.getStateData.idCardName : null
    this.getProvinceInit()
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
    .iptBox {
      justify-content: space-between;
      .cont {
        width: 1.5rem;
        border-bottom: 1px solid #999;
        border-radius: 0;
      }
    }
    
  }
  .formGlobal>.agreement {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .TYTPopConfirmBtn {
    position: absolute;
    top: 6.4rem;
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
.TYTErrPopConfirmBtn {
  position: absolute;
  top: 4.5rem;
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
</style>
<style>
  .radiu {
    position: absolute;
    top: 1.6rem;
    left: 50%;
    width: 2rem;
    height: 2rem;
    margin-left: -1rem;
    margin-top: -1rem;
    background: #f14e47;
    border-radius: 50%;
  }
  .radiu>.loadImg {
    position: relative;
    padding: 0;
    margin: 0;
    width: 100%;
    height:100%;
    z-index: 1;
    animation-name:myLoad;
    animation-duration:2s;
     /* 无限播放 */
    animation-iteration-count:infinite;
    /* 匀速 */
    animation-timing-function: linear;
  }
  /* 执行 */
  @keyframes myLoad
  {
  0%   {transform: rotate(0deg);}
  100%  {transform: rotate(360deg);}
  }
  .radiu>.rcont {
    position: absolute;
    z-index: 2;
    width: 100%;
    height:100%;
    top: 0;
    left: 0;
    color: #fff;
    font-size: 0.4rem;
    line-height: 2rem;
  }
  .radiu>.rcont>span {
    font-size: 1rem;
  }
</style>
