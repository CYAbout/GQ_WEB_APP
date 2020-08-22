<template>
  <!-- 2.1-首页-查询页-礼品查询 -->
  <div class="giftQuery">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="formGlobal">
        <form-input label="手机号码" placeholder="请输入手机号码" v-model='phoneNumber' maxlength="11"/>
        <form-msg-code label="验证码" placeholder="请输入验证码" :phone-type="type" v-model='code' :phone-number="phoneNumber"/>
        <form-submit-btn @submit="submitClk">查询</form-submit-btn>
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
export default {
  name:'giftQuery',
  pageName: '查询',
  footFlag: 3,
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
      type:'3',
    }
  },

  methods: {
    ...mapActions(['setStateData']),
    submitClk() {
      let url1 = '/sms/verificationCode'
      let param = {
        phoneNumber: this.phoneNumber,
        code:this.code,
        type:this.type
      };
      // 校验空值 
      var _isPhone = this.isTypeExp('phone',param.phoneNumber)
      if(!_isPhone) {return false}
			if(param.code.length !=6) {
				Toast('请输入6位验证码')
        return false
      }
			var _exp = this.hasValExp(param)
			if(!_exp) {return false}
      RequestAxios.post(url1, param).then((res) => {
        console.log('submitClk',param,res);
        if(res.code==="200"){
           localStorage.phoneNumber=this.phoneNumber
           localStorage.islogin=true
           this.setStateData({phone: this.phoneNumber}) 
          //  localStorage.phoneNumber=this.phoneNumber
           this.$router.push({path:'UserQuery'});
           this.code = ''
        } else {
          Toast(res.message)
        }
      }, (err) => {

        console.log('err:',err)

      }).catch((err) => {

        console.log('catch err:>', err)

      })
        
    }
  },
  activated() {
    this.phoneNumber =  this.getStateData.phone || ''
  }
}
</script>

<style lang="less"> 
</style>
