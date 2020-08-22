<template>
  <div class="iptBox_code">
    <div class="label">{{label}}</div>
    <div class="btnBox">
      <button @click="getMsg($event)" :disabled="false">{{btnTxt}}</button>
    </div>
    <input :value="value" @input="modelVal($event)" :placeholder="placeholder" class="cont" maxlength="6">
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {RequestAxios,RequestGet} from './../../assets/js/server.js'
  import _global from "./../../assets/js/global.js"; //校验表单
  export default { // 秒后重发
    name:'formMsgCode',
    mixins: [_global],
    props:['value','label','placeholder','phoneNumber','phoneType'],
    data () {
      return {
        btnTxt: '获取验证码',
        sNum: 60,
        Interval: null
      }
    },
    methods: {
      modelVal(ev) {
        // 限制只能输入数字
        ev.target.value = ev.target.value.replace(/[^\d]/g,'')
        this.$emit('input', ev.target.value)
      },
      getMsg (ev) {
        console.log(this.phoneNumber)
        var _isPhone = this.isTypeExp('phone',this.phoneNumber)
        if(!_isPhone) {return false}
        
        if(this.phoneType == '-1') { // 丰云行 外部验证码接口
          let l_url = '/information/sendcouponverifycode'
          let l_params = {
            "phone": this.phoneNumber,
          }
          RequestAxios.post(l_url,l_params).then((res) => {
            if(res.resultCode == '1') {
              this.CountDown(ev)
            } else {

            }
              
            console.log('res:',res)
          }, (err) => {
            console.log('err:',err)
          })
          return false
        }
        let url = '/sms/sendVerificationcode'
        let params = {
          "phoneNumber": this.phoneNumber,
          "type": this.phoneType || ''
        }
        // console.log('params',params);
        RequestAxios.post(url,params).then((res) => {
          // 倒计时
          console.log('submitCilk',res);
          if (res.code == '200' && res.isError === false) {
            this.CountDown(ev)
          }else if(res.code !== '200' && res.isError === true) {
            Toast(res.message)
          }else {
            Toast('网络异常，请检查网络')
          }
          
          console.log('res:',res)
        }, (err) => {
          console.log('err:',err)
        }).catch((err) => {
          console.log('catch err:>', err)
        })
      },
      CountDown (ev) {
        Toast('已发送验证码短信，请注意查收')
        ev.target.disabled = true
        console.log('CountDown:',ev.target)
        clearInterval(this.Interval);
        this.Interval = setInterval(()=> {
          this.sNum -= 1
          this.btnTxt = this.sNum +'秒后重发'
          if(this.sNum <= 0) {
            console.log('stop1')
            clearInterval(this.Interval)
            console.log('stop2')
            this.sNum = 60
            this.btnTxt = '获取验证码'
            ev.target.disabled = false
          }
        }, 1000)
      }
    },
    mounted () {
      
    }
  }
</script>

<style lang="less" scope>
  .iptBox_code {
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
    margin: 0 0.2rem;
    .label {
      float: left;
      height: 0.6rem;
      line-height: 0.6rem;
      width: 1rem;
      text-align: justify;
      font-size: 0.16rem;
    }
    .label:after {
      display: inline-block;
      width: 100%;
      content: '';
    }
    .cont {
      float: right;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.16rem;
      text-align: right;
      padding-right: 0.1rem;
    }
    .btnBox {
      float: right;
      height: 0.6rem;
      line-height: 0.62rem;
      text-align: center;
      button {
        padding: 0 0.2rem;
        color: #fff;
        background: #be3932;
        min-width: 1rem;
      }
    }
  }

</style>
