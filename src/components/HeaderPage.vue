<template>
  <div class="header" :style="{background: (!isRed && '#fff')}">
    <div v-if="isRed">
      <img class="logo logo_left" src="./../assets/img/logo/logo_left.png" alt="" srcset="">
      <img class="logo logo_right" src="./../assets/img/logo/logo_right.png" alt="" srcset="">
    </div>
    <div v-else>
      <!-- <div @click="goBack" class="logo_left" style="height:0.46rem;line-height:0.46rem;padding:0 0.1rem 0 0;font-size:0.28rem;">返回</div> -->
      <img class="logo logo_left" src="./../assets/img/logo/logo_left_w.png" alt="" srcset="">
      <img class="logo logo_right" src="./../assets/img/logo/logo_right_w.png" alt="" srcset="">
    </div>
  </div>
</template>

<script>
export default {
  name:'headerPage',
  props:{
    'isRed': { // 判断头部是否为红色背景
      type: Boolean,
      default: false
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    is_weixn(){ // 判断是不是微信内打开
      var ua = navigator.userAgent.toLowerCase();  
      if(ua.match(/MicroMessenger/i)=="micromessenger") {  
          return true;  
      } else {  
          return false;  
      }  
    }  
  }
}
</script>

<style lang="less">
  .header {
    /* height: .40rem; */
    background: #be3932;
    font-size: .16rem;
    overflow: hidden;
    margin-bottom: -1px;
    padding: 0.2rem;
    position: sticky;
    top: 0px;
    z-index: 99999;
    .logo_left {
      float: left;
    }
    .logo_right {
      float: right;
    }
    .logo {
      height: 0.46rem;
    }
  }
</style>
