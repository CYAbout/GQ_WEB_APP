<template>
<div>
	<!-- 2.2 首页-金融机构选择-置优享金融留资 -->
	<!-- 头部 -->
	<HeaderPage></HeaderPage>

	<div class="cardBox">
			<img v-if="apply.classification == '1'" class="card" src="./../assets/img/InsLeaveInfor_5bank_banner.png">
			<img v-else class="card" src="./../assets/img/InsLeaveInfor_zu_banner.png">
	</div>
	<div class="AppointTitleBox">
			<h3 class="title" v-if="apply.classification == '1'">五大银行</h3>
			<h3 class="title" v-if="apply.classification == '2'">直租</h3>
			<h3 class="title" v-if="apply.classification == '3'">回租</h3>
			<span class="titIcon">
				<img class="line_daikuan" src="./../assets/img/src/form_right.png" alt="">
			</span>
	</div>
	<div class="formGlobal">
		<form-input label="真实姓名" v-model="apply.customer_name" placeholder="请输入真实姓名" maxlength="16" type="text"/>
		<form-input label="手机号" v-model="apply.phone" placeholder="请输入手机号" maxlength="11"/>
		<form-msg-code v-model="apply.phonecode" :phone-number="apply.phone" phone-type="3" label="验证码" placeholder="请输入验证码"/>
		<div class="grayLine"></div>
		<form-select @shoupup="getProvince" label="省份" v-model="province_obj" :data-list="provinceData" name-key="provincename" code-key="provincecode" placeholder="请选择省份"/>
		<form-select @shoupup="getCity"  label="城市" v-model="city_obj" :data-list="cityData" ref="city" name-key="cityname" code-key="citycode" placeholder="请选择城市"/>
		<form-select @shoupup="getDealer" label="销售店" v-model="dealer_obj" :data-list="dealerData" ref="dealer" name-key="dealer_name" code-key="dealer_code" placeholder="请选择销售店"/>
		<!-- <form-input  label="--销售地址" v-model="apply.address" placeholder="请输入销售店地址"/> -->
		<form-select label="车型" v-model="modle_obj" :data-list="modleData" name-key="name" placeholder="请选择车型"/>
		<form-checkbox v-model="checkVal" class="agreement">我已阅读并同意<span @click="routerLink('PersonalInformation')">《保护消费者个人信息基本方针》</span>及<span @click="routerLink('PrivacyPolicy')">《广汽丰田汽车有限公司隐私政策》</span>的规定；并允许广汽丰田及其销售店向本人发送相关商业信息。</form-checkbox> 
		<form-submit-btn @submit="submitClk">立即申请</form-submit-btn>
		
	</div>

</div>
</template>


<script>
import HeaderPage from './HeaderPage'
import {Toast, MessageBox} from 'mint-ui'
import FormInput from './formList/FormInput'
import FormSelect from './formList/FormSelect'
import FormMsgCode from './formList/FormMsgCode'
import FormCheckbox from './formList/FormCheckbox'
import FormSubmitBtn from './formList/FormSubmitBtn'
import {mapActions, mapGetters} from 'vuex'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import _global from './../assets/js/global.js'
export default{
	name:'VideoPlay',
  pageName: '快速申请',
	footFlag: 2,
	mixins: [_global],
	components:{
		HeaderPage,
		FormInput,
		FormSelect,
		FormSubmitBtn,
		FormMsgCode,
		FormCheckbox,
	},
	data () {
	    return {
				apply : {
					customer_name: '', //
					phone: '', //
					phonecode: '', // 验证码
					province_code: '', // 省份
					province_name: '', //
					city_code: '', // 城市
					city_name: '', //
					dealer_code: '', // 销售店
					dealer_name: '', //
					// address: '', // 销售地址
					modle_code: '', // 车型
					modle_name: '', //
					classification: '', // 分类 1.五大行 2.直租 3.回租
					source: '3', // 具体来源
				},
				checkVal: 0,
				province_obj: {},
				city_obj: {},
				dealer_obj: {},
				modle_obj: {},
				provinceData: [],
				cityData: [],
				dealerData: [],
				modleData: [
					{name: '全新换代雷凌',code: '004036'}
				],
	    }
	},
	computed: {
		...mapGetters(['getStateData'])
	},
	watch: {
		dealer_obj: {
      handler(newName,oldName){
				console.log(newName,oldName)
			},
			deep: true, // 对象监听
			immediate: false, // 初始化监听
    }
	},
	methods:{
		...mapActions(['setStateData']),
		submitClk:function(){
			console.log(this.province_obj)
			this.apply.province_code = this.province_obj.code
			this.apply.province_name = this.province_obj.name
			this.apply.city_code = this.city_obj.code
			this.apply.city_name = this.city_obj.name
			this.apply.dealer_code = this.dealer_obj.code
			this.apply.dealer_name = this.dealer_obj.name
			this.apply.modle_code = this.modle_obj.code
			this.apply.modle_name = this.modle_obj.name

			var _isName = this.isTypeExp('name',this.apply.customer_name)
      if(!_isName) {return false}
      var _isPhone = this.isTypeExp('phone',this.apply.phone)
      if(!_isPhone) {return false}
			if(this.apply.phonecode.length !=6) {
				Toast('请输入6位验证码')
        return false
			}
			// 校验空值
			var _exp = this.hasValExp(this.apply)
			if(!_exp) {return false}
			if(this.checkVal == 0) {
        Toast('请阅读并同意相关协议')
        return false
      }
			let _param = this.apply
			console.log(_param)
			let _url = '/gsys/leiling/clueEnjoy'
			RequestAxios.post(_url, _param).then((res) => {
				if(res.code != '200') {
					Toast('' + res.message)
        	return false
				}
				let _apply = {
          idCardName: this.apply.customer_name,
          phone: this.apply.phone,
        }
        this.setStateData(_apply)
				localStorage.phoneNumber = this.apply.phone
				localStorage.islogin = true
				this.SuccessWin()
				console.log('res:',res)
			}, (err) => {
				this.$router.back()
				Toast('申请失败')
				console.log('err:',err)
			}).catch((err) => {
				this.$router.back()
				Toast('申请失败')
				console.log('catch err:>', err)
			})
		},
		// 申请成功弹窗
		SuccessWin () {
			MessageBox({
          title: '',
          message: 
            '<div>'+
              '<img src="'+ this.getImg() +'" style="width:100%;">'+
            '</div>',
          showConfirmButton:true,
          showCancelButton: false, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'bank5PopConfirmBtn',
          confirmButtonText:'在线预订抽大奖',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{
				if (ev == 'confirm') {
					this.$router.push({path: '/OrderCarForm'})
				}
				
			});
		},
		getImg () {
      return require('./../assets/img/bank5_seccess.png')
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
			// 清空销售店
      this.$refs['dealer'].message = ''
      this.dealer_obj = {}
			let that = this;
			that.cityData = []
			console.log(this.province_obj.code)
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
			that.dealerData = []
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
		this.apply.classification = this.$route.query.bankFlag // 申请类型
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
	.formGlobal>.agreement {
		margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
	}
.bank5PopConfirmBtn {
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
</style>
<style>
</style>

