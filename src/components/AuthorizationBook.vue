<template>
  <!-- 电子授权书 -->
  <div class="AuthorizationBook">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="imagesBox">
      <img src="./../assets/img/电子授权书.jpg" alt="" srcset="">
    </div>
    <form-submit-btn @submit="$router.back()">返回</form-submit-btn>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import FormSubmitBtn from './formList/FormSubmitBtn'
import _global from './../assets/js/global.js'
export default {
  name:'AuthorizationBook',
  pageName: "电子授权书",
  name:'UserQuery',
  footFlag: 2,
  mixins: [_global],
  components: {
    HeaderPage,
    FormSubmitBtn,
  },
  data () {
    return{
     
    }
  },
  mounted () {
  },
  methods:{
  },
}
</script>

<style lang="less"> 
   .AuthorizationBook {
       width: 100%;
       .imagesBox {
         width:100%;
          >img{
           width: 100%;
         }
       }
   }
</style>
