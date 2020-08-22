<template>
  <div class="footer">
      <a @click="$emit('menuClk',0)">
        <img v-if="getFootFlag==0" src="./../assets/img/src/foot_home_w.png">
        <img v-else src="./../assets/img/src/foot_home.png" alt="">
        <div :style="{color: getFootFlag==0 ?'#fff' : null}">首页</div>
      </a>
      <a @click="$emit('menuClk',1)">
        <img v-if="getFootFlag==1" src="./../assets/img/src/foot_dingche_w.png">
        <img v-else src="./../assets/img/src/foot_dingche.png" alt="">
        <div :style="{color: getFootFlag==1 ?'#fff' : null}">订车</div>
      </a>
      <a @click="$emit('menuClk',2)">
        <img v-if="getFootFlag==2" src="./../assets/img/src/foot_jinrong_w.png">
        <img v-else src="./../assets/img/src/foot_jinrong.png" alt="">
        <div :style="{color: getFootFlag==2 ?'#fff' : null}">金融</div>
      </a>
      <a @click="$emit('menuClk',3)">
        <img v-if="getFootFlag==3" src="./../assets/img/src/foot_query_w.png">
        <img v-else src="./../assets/img/src/foot_query.png" alt="">
        <div :style="{color: getFootFlag==3 ?'#fff' : null}">查询</div>
      </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name:'footerMenu',
  methods: {
  },
  computed: {
    ...mapGetters(['getFootFlag'])
  }
}
</script>

<style lang="less">
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #450f0f;
    box-shadow: 0 0 15px -5px #333;
    padding-top:0.2rem;
    >a {
      float: left;
      width: 25%;
      text-align: center;
      font-size: 0;
      padding-bottom: 0.2rem;
      >img {
        height: 0.5rem;
        display: inline-block;
      }
      >div {
        color: #be3932;
        font-size: 0.28rem;
        padding-top: 0.1rem;
      }
    }
  }
</style>
