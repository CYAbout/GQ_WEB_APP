<template>
  <!-- 1.0-在线预订  -->
  <div class="OrderCarForm">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="cardBox">
			<img class="card" src="./../assets/img/orderCarForm_banner.png">
      <img class="button" @click="ruleClk" src="./../assets/img/orderCarForm_btn.png"/>
	  </div>
    <div class="formGlobal">
      <form-input label="真实姓名" v-model="apply.customer_name" placeholder="请输入真实姓名" maxlength="16" type="text" :readonly="getOrderId ? 'readonly' : null"/>
		  <form-input label="手机号" v-model="apply.phone" placeholder="请输入手机号" maxlength="11" :readonly="getOrderId ? 'readonly' : null"/>
      <form-msg-code v-model="apply.phonecode" :phone-number="apply.phone" phone-type="2" label="验证码" placeholder="请输入验证码"/>
      <form-input v-model="apply.id_card" label="身份证号" placeholder="请输入身份证号" maxlength="18" :readonly="getOrderId ? 'readonly' : null"/>
      <form-input v-model="apply.userAddress" label="详细地址" placeholder="请输入详细地址" :readonly="getOrderId ? 'readonly' : null"/>
      <div class="grayLine"></div>
      <form-select @shoupup="getProvince" label="省份" v-model="province_obj" :data-list="provinceData" name-key="province" placeholder="请选择省份"/>
      <form-select @shoupup="getCity"  label="城市" v-model="city_obj" :data-list="cityData" ref="city" name-key="city" placeholder="请选择城市"/>
      <form-select @shoupup="getDealer" label="销售店" v-model="dealer_obj" :data-list="dealerData" ref="dealer" name-key="newName" placeholder="请选择销售店"/>
      <!-- <form-input v-model="apply.address1" label="店面地址" placeholder="" readonly="readonly"/> -->
      <div class="grayLine">
        <span v-if="dealer_obj.isOpenPay == '1'">
          *以上销售店支持在线订购
        </span>
        <span v-if="dealer_obj.isOpenPay == '0'">
          *以上销售店不支持在线订购
        </span>
      </div>
      <form-select @shoupup="getModle" :init-val="listItem ? listItem.carmodelname : ''" label="车型" v-model="modle_obj" :data-list="modleData" name-key="carModelName" placeholder="请选择车型"/>
      <form-select @shoupup="getModle1" :init-val="listItem ? listItem.carversionname: ''" label="型号" v-model="modle_obj1" :data-list="modleData1" ref="modle1" name-key="carVersionName" placeholder="请选择型号"/>
      <form-select @shoupup="getColor" label="颜色" v-model="color_obj" :data-list="colorData" name-key="carColorName" ref="color" placeholder="请选择颜色"/>
      <!-- <div class="grayLine"></div>
      <div class="moneyBox">
        <form-input v-model="fristMoney" label="支付金额" placeholder="" readonly="readonly"/>
        <div class="yuan">元</div>
      </div> -->
      <!-- <form-slot label="支付方式">
        <div class="checkList">
          <form-checkbox v-model="payFlag_w">
            微信支付
          </form-checkbox>
          <form-checkbox v-model="payFlag_z">
            支付宝支付
          </form-checkbox>
        </div>
      </form-slot> -->
      
      <div class="grayLine"></div>
      <form-submit-btn @submit="subBtn">提交</form-submit-btn>
    </div>
    <!-- 活动规则弹窗-->
    <rule-page ref="rp" closeType="none">
      <img src="./../assets/img/orderCarForm_txt.gif">
    </rule-page>
    <!-- 抽奖中 -->
    <rule-page ref="load" closeType='bottom'>
      <img src="./../assets/img/AppointDrive_loading.png" style="margin-top:0">
      <div style="position:absolute;bottom:3.5rem;color:#ffb5af;width:100%;letter-spacing: 0.06rem;">
        正在为您抽取购车豪礼 <span style="display: inline-block;width: 1rem;">{{getDot}}</span>
      </div>
    </rule-page>
    <!-- 微信打开提示-->
    <rule-page ref="wxOut" closeType="none">
      <img src="./../assets/img/wxOutAlert.png">
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
import {Toast, MessageBox} from 'mint-ui'
import {mapActions, mapGetters} from 'vuex'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import _global from './../assets/js/global.js'
import RulePage from './RulePage'
export default {
  name:'OrderCarForm',
  pageName: '在线预订',
  footFlag: 1,
  mixins: [_global],
  watch: {
    payFlag_w: { // 微信
      handler(newData,oldData){
        console.log('==wexin:',newData,oldData);
        this.payFlag = newData
        this.payFlag_z = newData == 1 ? 0 : 1
			},
			deep: true, // 对象监听
			immediate: true, // 初始化监听
    },
    payFlag_z: { // 支付宝
      handler(newData,oldData){
        console.log('==zhifubao:',newData,oldData);
        this.payFlag = this.payFlag_w = newData == 1 ? 0 : 1
			},
			deep: true, // 对象监听
			immediate: true, // 初始化监听
    },
    payFlag: { // 支付方式选择 1:微信 0:支付宝
      handler(newData,oldData){
        console.log('==xuanze:',newData,oldData);
        this.payTxt = newData == 1 ? '微信' : '支付宝'
			},
			deep: true, // 对象监听
			immediate: true, // 初始化监听
    },
		// dealer_obj: { // 给地址赋值
    //   handler(newName,oldName){
    //     console.log(newName,oldName)
    //     this.apply.address1 = newName.address || ''
		// 	},
		// 	deep: true, // 对象监听
		// 	immediate: false, // 初始化监听
    // },
    modle_obj: {
      handler(newName,oldName){
        console.log('modle_obj',newName,oldName)
        this.fristMoney = newName.payPrice
			},
			deep: true, // 对象监听
			immediate: false, // 初始化监听
    },
		modle_obj1: { // 型号计算
      handler(newName,oldName){
        console.log('modle_obj1',newName,oldName)
        this.versionPrice = newName.versionPrice
			},
			deep: true, // 对象监听
			immediate: false, // 初始化监听
    },
    color_obj: { // 颜色计算
      handler(newName,oldName){
        console.log('color_obj1',newName,oldName)
        console.log('carColorPrice:',newName.carColorPrice)
        this.carColorPrice = newName.carColorPrice
        this.apply.loan = parseInt(this.versionPrice) + parseInt(this.carColorPrice)
        console.log(this.apply.loan,this.versionPrice,this.carColorPrice)
			},
			deep: true, // 对象监听
			immediate: false, // 初始化监听
    },
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
        phonecode: '',
        id_card: '', // 身份证号
        userAddress: '', // 用户详细地址
        // address1: '', // 地址

        provinceName: '',
        cityName: '',
        dealerName: '',
        modleCarName:'',
        modleCarName1:'',
        carColorName: '',
        loan: 0, // 金额
      },
      payTxt: '微信',
      payFlag: 1, // 支付方式选择 1:微信 0:支付宝
      payFlag_w: 1,
      payFlag_z: 0,
      province_obj: {},
      city_obj: {},
      dealer_obj: {},
      modle_obj: {},
      modle_obj1: {},
      color_obj: {},
      provinceData: [],
      cityData: [],
      dealerData: [],
      modleData: [],
      modleData1: [],
      colorData: [],
      versionPrice: 0, // 车型价格
      carColorPrice: 0, // 颜色价格
      fristMoney: 0, // 99
      getDot: ' . . .', // 等待状态
      listItem: {}, // 上页传来的数据
    }
  },
  computed: {
    ...mapGetters(['getOrderId','getStateData'])
  },
  methods: {
    ...mapActions(['setOrderId','setStateData']),
    subBtn() {
        this.apply.provinceName = this.province_obj.province;
        this.apply.cityName = this.city_obj.city;
        this.apply.dealerName = this.dealer_obj.dealerName;
        this.apply.modleCarName = this.modle_obj.carModelName;
        this.apply.carVersionName = this.modle_obj1.carVersionName;
        this.apply.carColorName = this.color_obj.carColorName;
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
      var _exp = this.hasValExp(this.apply)
      if(!_exp) {return false}
      
      let url = null 
      console.log(this.getOrderId)
      if (this.getOrderId) { // 新增
        url = '/order/updateorder'
      } else { // 修改
        url = '/order/commitorder'
      }
      
      let _param = {
        "applicationid": 0,
        "userName": this.apply.customer_name, // 用户名
        "phone": this.apply.phone, // 手机
        "code": this.apply.phonecode, // 手机验证码
        "idcard": this.apply.id_card, // 身份证号
        "province": this.province_obj.province, // 省份
        "city": this.city_obj.city, // 城市
        "dealerId": this.dealer_obj.dealerCode,
        "dealerName": this.dealer_obj.dealerName,
        "dealeraddress": '无',
        "carmodelname": this.color_obj.carModelName, // 车型名称
        "color": this.color_obj.carColorName,
        "orderAmount": this.fristMoney, // 支付金额
        "payChannel": '0', // 支付方式
        "receivingaddress": this.apply.userAddress, // 用户收货地址
        "carversionname": this.modle_obj1.carVersionName,   // 车型版本名称
        "imagesurl": this.modle_obj.demoImg, // 车型图片
        "payprice": this.fristMoney,  // 意向金金
        "officialprice": this.modle_obj1.versionPrice,  // 官方指导价格 Number 0.00
        "colorprice": this.color_obj.carColorPrice,       // 颜色价格 Number 0.00
        "sumprice": this.apply.loan,  // 总价
        "carcolorid": this.color_obj.id, // 车型颜色表主键 Number
        "carcolorcode": '' + this.color_obj.carColorCode,   // 车型颜色code
        "carcolorname": '' + this.color_obj.carColorName,     // 车型颜色名称
        "carmodelid": this.color_obj.carModelId,       // 车系id Number
        "carmodelcode": '' + this.modle_obj.carModelCode,     // 车系code String
        "carmodelname": '' + this.modle_obj.carModelName,     // 车系名称 String
        "carversioncode": '' + this.modle_obj1.carVersionCode,   // 车型版本code String
        "carversioname": '' + this.modle_obj1.carVersionName,   // 车型版本名称
      }
      console.log(_param)
      this.getOrderId ? _param['id'] = this.getOrderId : null
      RequestAxios.post(url,_param).then((res)=>{
        if (res.flag) {
          // 保存值
          this.setStateData({
            idCardName: this.apply.customer_name,
            phone: this.apply.phone,
            idCard: this.apply.id_card,
            userAddress: this.apply.userAddress,
          })
          let _item = {
              name: res.name,
              code: res.code,
              id: res.id, // 订单号
              gifttype: '1', // 0试驾礼，1购车礼
              isprize: res.isprize, // 是否中奖
              isOpenPay: this.dealer_obj.isOpenPay, // 是否支持付款 0不支持 1支持
            }
            let _params = Object.assign(_param,{orderno:res.orderno})
          // 抽奖弹窗 
          if(this.getOrderId){
            this.$router.push({'path': '/PrizeResultPage',query: {item: _item,params: _params}})
          } else {
            this.setOrderId(res.id) // 保存订单ID状态
            this.getDotFun(()=> {
              this.$router.push({'path': '/PrizeResultPage',query: {item: _item,params: _params}})
            })
          }
          

        } else {
          Toast(''+ res.message)
        }
        console.log(res)
      })
    },
    pickWhere(res) {
      window.getmsg = (ev)=> {
        console.log(ev,res.orderno)
        this.getGtmc(ev,res.orderno)
      }
      // 判断平台
      this.GTMC.getEnvironment('getmsg')
    },
    getGtmc(ev,_orderno) {
      let _payState = {
        "payType":0,
        "buyType":0,
        "userId":0,
        "phone": '' + this.apply.phone, // 用户手机号
        "userName": '' + this.apply.customer_name, // 用户名称
        "cardId": '' + this.apply.id_card, // 身份证号 String
        "buyerPhone":"",
        "buyerName":"",
        "provinceCountry": '' + this.province_obj.province + '' + this.city_obj.city,  // 省市
        "address": this.apply.userAddress,
        "enterpriseName":null,
        "enterpriseCode":null,
        "payPrice": this.fristMoney.toFixed(2),  // 意向金金
        "officialPrice": this.modle_obj1.versionPrice.toFixed(2),  // 官方指导价格 Number 0.00
        "colorPrice": this.color_obj.carColorPrice.toFixed(2),       // 颜色价格 Number 0.00
        "sumPrice": this.apply.loan.toFixed(2),  // 总价
        "carColorId": this.color_obj.id, // 车型颜色表主键 Number
        "carColorCode": '' + this.color_obj.carColorCode,   // 车型颜色code
        "carColorName": '' + this.color_obj.carColorName,     // 车型颜色名称
        "vhcCode":null,
        "sfxCode":"",
        "carModelId": this.color_obj.carModelId,       // 车系id Number
        "carModelCode": '' + this.modle_obj.carModelCode,     // 车系code String
        "carModelName": '' + this.modle_obj.carModelName,     // 车系名称 String
        "carVersionId":null,
        "carVersionCode": '' + this.modle_obj1.carVersionCode,   // 车型版本code String
        "carVersionName": '' + this.modle_obj1.carVersionName,   // 车型版本名称
        "orderStatus":1,
        "dealerCode": '' + this.dealer_obj.dealerCode, // 销售店码
        "dealerName": '' + this.dealer_obj.dealerName, // 销售店名
        "demoImg": '' + this.modle_obj.demoImg,          // 车型默认图片
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
      // that.provinceData = []
			let url = '/fyxsys/getFyxProvinceAndCity'
			RequestGet(url).then((res) => {
					console.log(res);
			if(res.statusCode===200){
        console.log(res.content.provinceList)
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
			console.log(this.province_obj)
			let _param = {
				provinceName: this.province_obj.province
			}
			let url = '/fyxsys/getFyxProvinceAndCity'
			RequestGet(url,_param).then((res) => {
					console.log(res);
			if(res.statusCode===200){
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
      console.log(this.province_obj,this.city_obj)
      let that = this;
      that.dealerData = []
			let url = '/fyxsys/getFyxDealer'
			let _param = {
				provinceName: this.province_obj.province,
        cityName: this.city_obj.city,
			}
			RequestGet(url,_param).then((res) => {
					console.log(res);
			if(res.statusCode===200){
          let _dealerList = res.content.dealerList
          let _newDealerList = []
          _dealerList.forEach((obj,ind) => {
            let _obj = obj
            _obj['newName'] = (obj.isOpenPay == '1' ? '*' : '') + obj.dealerName
            _newDealerList.push(obj)
          });
          that.dealerData = _newDealerList
          // that.dealerData = res.content.dealerList;
			}
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
    },
    getModle() {
      // 清空型号
      this.$refs['modle1'].message = ''
      this.modle_obj1 = {}
      // 清空颜色
      this.$refs['color'].message = ''
      this.color_obj = {}
    },
		//获取车型
		getModleInit () {
      let that = this;
      that.modleData = []
			let url = '/information/carmodelwithversions'
			RequestAxios.post(url).then((res) => {
					console.log(res);
			if(res.statusCode===200){
          console.log(res.data)
					that.modleData = res.data;
			}
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
    },
    //获取型号
		getModle1 () {
      // 清空颜色
      this.$refs['color'].message = ''
      this.color_obj = {}
      
      console.log(this.modle_obj);
      console.log(this.modle_obj.carVersions)
      this.modleData1 = this.modle_obj.carVersions
    },
    // 获取颜色
    getColor () {
      console.log(this.modle_obj)
      let that = this;
      that.colorData = []
      let url = '/information/colorwithimages'
      let _Param = {
        carModelCode: this.modle_obj.carModelCode,
        carVersionCode: this.modle_obj1.carVersionCode,
      }
			RequestAxios.post(url,_Param).then((res) => {
					console.log(res);
			if(res.statusCode===200){
          console.log(res.data)
					that.colorData = res.data.data;
			}
			}, (err) => {
			console.log('err:',err)
			}).catch((err) => {
			console.log('catch err:>', err)
			})
    },
    ruleClk() { // 金融活动规则
			this.$refs.rp.ruleClk()
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
          showCancelButton: true, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'TYTErrPopConfirmBtn',
          confirmButtonText:'马上支付',
          cancelButtonClass:'TYTErrPopCancelBtn',
          cancelButtonText:'返回'

      }).then((ev)=>{
        if(ev == 'confirm') {
          callback()
        }else if (ev == 'cancel') {
            this.$router.go(-1)
        }
      });
    },
    TYT_error () {
      return require('./../assets/img/OrderCarForm_noPrize.png')
    },
    isWX() { // 判断微信环境
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    }
  },
  activated() {
    // this.$refs.wxOut.ruleClk()
    // 微信打开提示
    this.isWX() && this.$refs.wxOut.ruleClk()
    // 赋值缓存
    let _StData = this.getStateData
    this.apply.customer_name = _StData.idCardName
    this.apply.phone = _StData.phone
    this.apply.id_card = _StData.idCard
    this.apply.userAddress = _StData.userAddress
    console.log('getOrderId',this.getOrderId)
    // this.$router.push({'path': '/PrizeResultPage',query: {item: {},params: {}}})
    console.log(this.$route) 
    this.listItem = this.$route.query.item
    if (this.listItem) { // 库存设置默认值
      this.modle_obj.carModelCode = this.listItem.carmodelcode
      this.modle_obj.carModelName = this.listItem.carmodelname
      this.modle_obj1.carVersionCode = this.listItem.carversioncode
      this.modle_obj1.carVersionName = this.listItem.carversionname
      this.modle_obj1.versionPrice = this.listItem.versionprice
      this.modle_obj.demoImg = this.listItem.imageurl
      this.fristMoney = this.listItem.payprice
    }
    this.getProvinceInit()
    this.getModleInit()
  }
}

</script>

<style lang="less"> 
.OrderCarForm {

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
      top: 2.6rem;
      left: 1.2rem;
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
   .TYTErrPopConfirmBtn {
    position: absolute;
    top: 5rem;
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
  .TYTErrPopCancelBtn {
    position: absolute;
    top: 6.1rem;
    left: 50%;
    margin-left: -2rem;
    width: 4rem;
    height: .7rem;
    line-height: .7rem;
    background:transparent;
    color: #fff;
    border-radius: 20px;
    font-size: .28rem;
    letter-spacing: 5px;
    border: 1px solid #fff;
  }

}
</style>
