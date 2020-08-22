<template>
  <!-- 2.1-首页-查询页-礼品查询 -->
  <div class="logonForm">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="formGlobal">
        <form-input label="手机号码" placeholder="请输入手机号码" v-model='phoneNumber' maxlength="11"/>
        <form-msg-code label="验证码" placeholder="请输入验证码" :phone-type="type" v-model='code' :phone-number="phoneNumber"/>
        <div class="grayLine"></div>
        <div class="gqTxt">*新用户点击登录即完成注册,代表已同意<a @click="gqInte('1')">广汽丰田会员网络协议</a>及<a @click="gqInte('2')">广汽丰田汽车有限公司隐私政策</a></div>
        <form-submit-btn @submit="submitClk">登录</form-submit-btn>
    </div>
  </div>
</template>

<script>
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import HeaderPage from './HeaderPage'
import FormInput from './formList/FormInput'
import FormMsgCode from './formList/FormMsgCode'
import FormSubmitBtn from './formList/FormSubmitBtn'
import {Toast, MessageBox} from 'mint-ui'
import _global from './../assets/js/global.js'
import {mapActions, mapGetters} from 'vuex'
import { setTimeout } from 'timers';
export default {
  name:'logonForm',
  pageName: '注册',
  footFlag: 1,
  mixins: [_global],
  components: {
    HeaderPage,
    FormInput,
    FormMsgCode,
    FormSubmitBtn,
  },
  computed: {
		...mapGetters(['getStateData'])
	},
  data(){
    return{
      phoneNumber:'',
      code:'',
      type:'-1',
    }
  },

  methods: {
    ...mapActions(['setStateData']),
    submitClk() {
      let url1 = '/information/userregister'
      let param = {
        phone: this.phoneNumber,
        verifyCode:this.code,
      };
      // 校验空值 
      var _isPhone = this.isTypeExp('phone',param.phone)
      if(!_isPhone) {return false}
			if(param.verifyCode.length !=6) {
				Toast('请输入6位验证码')
        return false
      }
			var _exp = this.hasValExp(param)
			if(!_exp) {return false}
      RequestAxios.post(url1, param).then((res) => {
        if(res.resultCode=="1"){
           localStorage.phoneNumber=this.phoneNumber
           localStorage.islogin=true
           this.setStateData({phone: this.phoneNumber})
           Toast('注册成功!')
           setTimeout(()=>{
            this.code = ''
            this.$router.push({'path': '/PrizeResultPage',query: {item: this.$route.query.item,params: this.$route.query.params,pageFrom:'logon'}})
           },1000)
           
        } else {
          Toast(res.errMsg)
        }
      }, (err) => {

        console.log('err:',err)

      }).catch((err) => {

        console.log('catch err:>', err)

      })
        
    },
    gqInte (ev) {
      this.$router.push({path:'/LogonAgree',query: {type:ev}})
    }
  },
  activated() {
    this.phoneNumber =  this.getStateData.phone || ''
  }
}
</script>

<style lang="less"> 
  .logonForm {
    .gqTxt {
      font-size: 0.24rem;
      padding:0.2rem;
      color: #999;
      line-height: 0.3rem;
      margin-top:0.4rem;
      >a {
        color: #be3932;
        text-decoration: underline;
      }
    }
  }
</style>
