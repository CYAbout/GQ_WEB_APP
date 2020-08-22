<template>
  <!-- demo 页 -->
  <div class="formGlobal">
    <header-page></header-page>
    <div class="formBox">
      <!-- 
        注意：以下组件必须依赖 formGlobal 样式
        属性解释：
        v-model:返回参数
        lable:表单项目名
        placeholder:input提示
        --- form-select 组件 ---
        data-list:选择框需要传入的对象列表
        name-key:对象列表中回显到选择框的数据key
        code-key:对象列表中回传给 v-model 的数据key
        --- form-submit-btn 组件 ---
        color:设置字体颜色
        width:设置宽度
        background:设置背景
        border:设置边框
        --- form-msg-code 组件 ---
        phone-number:发验证码的手机号
        phone-type:验证码类型
        v-model:输入的验证码
       -->
      <form-input label="真实姓名" v-model="val" placeholder="请输入真实姓名" maxlength="5"/>
      <div class="grayLine"></div>
      <form-msg-code label="验证码" v-model="val2" phone-number="13920099999" phone-type="4" placeholder="请输入验证码"/>
      <form-select @shoupup="getProvince" label="省份" v-model="val3" :data-list="provinceData" name-key="provincename" code-key="provincecode" placeholder="请选择省份"/>
      <form-checkbox v-model="val4">
        我已阅读并同意我已阅读并同意我已阅读并同意我已阅读并同意我已阅读并同意我已阅读并同意
      </form-checkbox>
      <div class="checkList">
        <form-checkbox v-model="val5" color='#666'>
          我已阅读并同意
        </form-checkbox>
        <form-checkbox v-model="val6" color='blue'>
          我已阅读并同意
        </form-checkbox>
      </div>
      <form-submit-btn @submit="submitClk">提交</form-submit-btn>
      <form-submit-btn @submit="submitClk" width="2rem">提交</form-submit-btn>
      <form-submit-btn @submit="submitClk" width="2rem" color="#333" background="#fff" border="1px solid #ccc">提交</form-submit-btn>
    </div>
    <div class="popBtn"  @click="LogonForm">注册</div>
    <div class="popBtn"  @click="OrderCarForm">1.0-在线预订</div>
    <div class="popBtn" @click="TYTWinClk">丰田金融成功弹窗</div>
    <div class="popBtn" @click="TYTWinClk_err">丰田金融失败弹窗</div>
    <div class="popBtn" @click="nullWinClk">5大行成功弹窗</div>
    <div class="popBtn" @click="submitClk">2.2-金融机构选择-置优享金融留资（成功）弹窗</div>
    <div class="popBtn"  @click="submitClk2">预约试驾失败弹窗</div>
    <div class="popBtn"  @click="submitClk3">3.1-首页-金融机构选择-活动详情说明（审核中)</div>
    <div class="popBtn"  @click="submitClk4">3.1-首页-金融机构选择-活动详情说明（未能通过）</div>
    <div class="popBtn"  @click="submitClk5">3.1-首页-金融机构选择-活动详情说明（指导下载）</div>
    <div class="popBtn"  @click="submitClk6">3.3-首页-意向金支付（重新支付）</div>
    <div class="popBtn"  @click="submitClk7">3.5-首页-意向金支付(提示)</div>
    <div class="popBtn"  @click="gitftQuery">2.1-首页-查询页-礼品查询</div>
    <div class="popBtn"  @click="BankSelectIpt">2.2-1-首页-金融机构选择-置优享金融留资</div>
    
    <br>
    <div class="popBtn"  @click="submitClk8">预约试驾弹窗</div>


  </div>
</template>
<style scoped>
.popBtn{margin: .2rem auto; width: 4rem; padding: .1rem; line-height:.3rem;border: 1px solid #ccc; background: #efefef; border-radius: 20px;}
</style>

<script>
import {MessageBox} from 'mint-ui'
import HeaderPage from './HeaderPage'
import FormInput from './formList/FormInput'
import FormMsgCode from './formList/FormMsgCode'
import FormSelect from './formList/FormSelect'
import FormCheckbox from './formList/FormCheckbox'
import FormSubmitBtn from './formList/FormSubmitBtn'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
export default {
  name:'demo',
  components: {
    HeaderPage,
    FormInput,
    FormMsgCode,
    FormSelect,
    FormCheckbox,
    FormSubmitBtn,
  },
  data () {
    return {
      val: "",
      val2: '',
      val3: '',
      val4: '',
      val5: '',
      val6: '',
      provinceData: [
          {name1: '苏州' ,code1: '001'},
          {name1: '南京' ,code1: '002'},
          {name1: '北京' ,code1: '003'},
          {name1: '天津' ,code1: '004'},
        ]
    }
  },
  methods: {
    LogonForm() {
      this.$router.push('/LogonForm')
    },
    //获取省份
     getProvince () {
        let that = this;
        let url = '/gsys/leiling/proviceList'
        // let url = 'https://mall.ftms.devbmsoft.cn/product/api/getProCatalogByParentId/1'
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
      // 丰田金融成功窗
    TYTWinClk () {
      MessageBox({
          title: '',
          message: 
            `<div class="seccessBack">
              <img src="${this.TYT_seccess()}" style="width:100%;">
              <div class="moneyTxt">
                <span>24,000</span>
                <sub>元</sub>
              </div>
            </div>`,
          showConfirmButton:true,
          showCancelButton: false, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'TYTPopConfirmBtn',
          confirmButtonText:'在线预订',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{
        console.log(ev)
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
          confirmButtonText:'在线预订',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{
        console.log(ev)
      });
    },
    TYT_error () {
      return require('./../assets/img/TYT_error.png')
    },
    // 五大行成功窗
    nullWinClk() {
      MessageBox({
          title: '',
          message: 
            `<div class="seccessBack">
              <img src="${this.getbank5_seccess()}" style="width:100%;">
            </div>`,
          showConfirmButton:true,
          showCancelButton: false, // 底部圆close
          className: 'vinWidthBox',
          confirmButtonClass: 'bank5PopConfirmBtn',
          confirmButtonText:'在线预订',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      }).then((ev)=>{
        console.log(ev)
      });
    },
    getbank5_seccess () {
      return require('./../assets/img/bank5_seccess.png')
    },
    submitClk () {
      MessageBox({
          title: '',
          message: 
            '<div class="popContentBox">'+
              '<div class="popBoxRed">'+
                '<h2 class="popTitle">申请成功<i class="popBlock"></i></h2>'+
                '<p class="popTxt">非常感谢您的宝贵时间<br/>我们将会安排金融顾问与您尽快联系～<br/>请您保持手机畅通</p>'+
              '</div>'+
            '</div>',
          showCancelButton: true,
          className: 'vinWidthBox',
          confirmButtonClass: 'popConfirmBtn',
          cancelButtonClass:'popCloseBtn',
          confirmButtonText:'返　回',
          cancelButtonText:''

      }).then((ev)=>{
        console.log(ev)
      })
    },
    //预约试驾失败弹窗
    submitClk2 () {
      MessageBox({
          title: '',
          message: 
            '<div class="popContentBox popContentBox2">'+
              '<div class="popBoxRed">'+
                '<h2 class="popTitle">真遗憾<i class="popBlock"></i></h2>'+
                '<p class="popTxt">差一点就中奖了呢</p>'+
              '</div>'+
            '</div>',
          showCancelButton: true,
          className: 'vinWidthBox',
          confirmButtonClass: 'popConfirmBtn_yy',
          cancelButtonClass:'popCloseBtn_yy',
          confirmButtonText:'立即订车夺好礼',
          cancelButtonText:'参与额度测评'

      }).then(action => { 

        if (action == 'confirm') {     //确认的回调
          console.log(1); 
        }else{ //取消的回调
          console.log(3); 
        }
      });
    },
    //3.1-首页-金融机构选择-活动详情说明（审核中)
    submitClk3 () {
      MessageBox({
          title: '',
          message: 
            '<div class="popContentBox popContentBox3">'+
              '<div class="popBoxRed">'+
                '<h2 class="popTitle">审核中</h2>'+
                '<p class="popTxtArrow">您提交的授信评测正在处理中，请稍后</p>'+
              '</div>'+
            '</div>',
          showConfirmButton:false,
          showCancelButton: true,
          className: 'vinWidthBox',
          cancelButtonClass:'false',
          cancelButtonText:''

      });
    },
    //3.1-首页-金融机构选择-活动详情说明（未能通过）
    submitClk4 () {
      MessageBox({
          title: '',
          message: 
            '<div class="popContentBox popContentBox4">'+
              '<div class="popBoxRed">'+
                '<h2 class="popTitle">未能通过审核<i class="popBlock"></i></h2>'+
                '<p class="popTxt">您好，非常抱歉<br/>您提交的资料未能通过授信审核<br/>您可致电010-xxxxxxxx了解详情<br/>感谢您的参与～</p>'+
              '</div>'+
            '</div>',
          showConfirmButton:false,
          showCancelButton: true,
          className: 'vinWidthBox',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      });
    },

    //3.1-首页-金融机构选择-活动详情说明（指导下载）
    submitClk5 () {
      MessageBox({
          title: '',
          message: 
            '<div class="popContentBox popContentBox5">'+
              '<div class="popBoxRed">'+
                '<h2 class="popTitle">丰云行APP在线订车</h2>'+
                '<p class="popTxtArrow">让您随时随地看车、选车，预订爱车</p>'+
                '<p class="popTxt">1、在线支付订金<br>2、在规定时限内可无理由退款</p>'+
              '</div>'+
            '</div>',
          showCancelButton: true,
          className: 'vinWidthBox',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:'',
          confirmButtonClass: 'popConfirmBtn',
          confirmButtonText:'下载丰云行APP',
      }).then( action => {
        if(action == 'confirm'){
          console.log('下载丰云行APP')
        }
      });
    },

    //3.3-首页-意向金支付（重新支付）
    submitClk6 () {
      MessageBox({
          title: '',
          message: 
            '<div class="popContentBox popContentBox6">'+
              '<div class="popBoxRed">'+
                '<h2 class="popTitle">支付失败</h2>'+
                '<p class="popTxt">失败原因......</p>'+
              '</div>'+
            '</div>',
          showCancelButton: true,
          className: 'vinWidthBox',
          confirmButtonClass: 'popConfirmBtn',
          cancelButtonClass:'popCloseBtn',
          confirmButtonText:'重新支付',
          cancelButtonText:''

      }).then( action => {
        if(action == 'confirm'){
          console.log('重新支付')
        }
      });
    },

    //3.5-首页-意向金支付(提示)
    submitClk7 () {
      MessageBox({
          title: '',
          message: 
            '<div class="popContentBox popContentBox7">'+
              '<div class="popBoxRed">'+
                '<h2 class="popTitle">提 示<i class="popBlock"></i></h2>'+
                '<p class="popTxt">您选择的经销点不支持在线支付意向金<br/>请到店参与金融购车。</p>'+
                '<p class="popTxt7">经销店地址：<br/>北京市海淀区杏石口路78号</p>'+
              '</div>'+
            '</div>',
          showCancelButton: true,
          showConfirmButton:false,
          className: 'vinWidthBox',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      });
    },
    gitftQuery () {
      this.$router.push('/giftQuery')
    },
    BankSelectIpt () {
      this.$router.push('/BankSelectIpt')
    },
    OrderCarForm () {
      this.$router.push('/OrderCarForm')
    },
    //3.5-首页-意向金支付(提示)
    submitClk8 () {
      MessageBox({
          title: '',
          message: 
            '<div class="popContentBox popContentBox8">'+
              '<div class="popBoxRed">'+
                '<h2 class="popTitle">活动说明<i class="popBlock"></i></h2>'+
                '<p class="popTxt">活动时间：<br>2019年5月10日—2019年6月10日</p>'+
                '<p class="popTxt8">活动奖励：试驾礼<br>（空调被、雨具收纳包、钥匙包、<br>车载手机支架，随机抽取其中一种）</p>'+
                '<p class="popTxt8_1">活动说明：<p>'+
                '<p class="popTxt8_2">1、在活动期间在线预约新雷凌车型试驾后可参与抽奖，即有机会获得试驾礼品<p>'+
                '<p class="popTxt8_2">2、中奖用户可到店参与试驾后向经销店索取奖品<p>'+
                '<p class="popTxt8_2">3、本次活动最终解释权归广汽丰田所有<p>'+
                '<p class="popTxt8_2">4、咨询电话：400 830 8888 转 2<p>'+
              '</div>'+
            '</div>',
          showCancelButton: true,
          showConfirmButton:false,
          className: 'vinWidthBox',
          cancelButtonClass:'popCloseBtn',
          cancelButtonText:''

      });
    },
  }
}
</script>

<style lang="less">
  .checkList {
    .iptBox_check {
      display: inline-block;
    }
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
