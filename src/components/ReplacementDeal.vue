<template>
  <!-- 隐私政策 -->
  <div class="replacementDeal">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="imagesBox">
    <img src="./../assets/img/置换拍卖协议.jpg" alt="" srcset="">
    </div>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
export default {
  name:'replacementDeal',
  pageName: "置换拍卖协议",
  components: {
    HeaderPage,
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
   .replacementDeal {
       width: 100%;
       .imagesBox {
         width:100%;
          >img{
           width: 100%;
         }
       }
   }
</style>
