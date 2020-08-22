<template>
  <!-- 2.2-1-首页-金融机构选择-置优享金融留资 -->
  <div class="bankSelectIpt">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="cardBox">
      <img class="card" src="./../assets/img/src/card_newleiling.jpg" alt="">
    </div>
    <div class="formGlobal">
      <form-input label="真实姓名" placeholder="请输入真实姓名" maxlength="5"/>
      <form-input label="手机号" placeholder="请输入手机号" maxlength="11"/>
      <form-input label="身份证号" placeholder="请输入身份证号" maxlength="18"/>
      <div class="grayLine"></div>
      <form-select  label="省份" v-model="val3" :data-list="cityData" name-key="name1" code-key="code1" placeholder="请选择省份"/>
      <form-select  label="城市" v-model="val3" :data-list="cityData" name-key="name1" code-key="code1" placeholder="请选择城市"/>
      <form-select  label="销售店" v-model="val3" :data-list="cityData" name-key="name1" code-key="code1" placeholder="请选择销售店"/>
      <form-input label="店面地址" placeholder="请输入店面地址"/>
      <div class="grayLine"></div>
      <form-select  label="车型" v-model="val3" :data-list="cityData" name-key="name1" code-key="code1" placeholder="请选择车型"/>
      <form-select  label="颜色" v-model="val3" :data-list="cityData" name-key="name1" code-key="code1" placeholder="请选择颜色"/>
      <div class="grayLine"></div>
      <form-submit-btn @submit="submitClk">立即申请</form-submit-btn>
    </div>
    
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import FormInput from './formList/FormInput'
import FormSelect from './formList/FormSelect'
import FormSubmitBtn from './formList/FormSubmitBtn'
export default {
  name:'bankSelectIpt',
  components: {
    HeaderPage,
    FormInput,
    FormSelect,
    FormSubmitBtn,
  },
  data () {
    return {
      cityData: [
        {name1: '苏州' ,code1: '001'},
        {name1: '南京' ,code1: '002'},
        {name1: '北京' ,code1: '003'},
        {name1: '天津' ,code1: '004'},
      ]
    }
  },
  methods: {
    submitClk() {
        
    }
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
</style>
