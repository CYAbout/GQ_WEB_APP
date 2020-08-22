<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
      <HomePage/>
    </keep-alive>
    <footer-menu @menuClk='menuClk'></footer-menu>
  </div>
</template>

<script>

import './assets/css/base.less'
import 'mint-ui/lib/style.css'
import './assets/css/zsy.css'
import "./assets/js/common.js";
import FooterMenu from './components/FooterMenu'
import HomePage from './components/HomePage.vue'

export default {
  name: 'app',
  components: {
    HomePage,
    FooterMenu,
  },
  methods: {
    // 点击底部菜单
    menuClk (ev) {
      console.log(ev)
      console.log(this.$options.name)
      switch (ev) {
        case 0:
          this.$router.push({path:'/HomePage'})
        break;
        case 1:
          this.$router.push({path:'/OrderCarForm'})
        break;
        case 2:
          this.$router.push({path:'/InstitutionsSel2_0'})
        break;
        case 3:
          if(localStorage.islogin){
            this.$router.push({path:'/UserQuery'})
          }else{
            this.$router.push({path:'/GiftQuery'})
          }
        break;
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  margin: 0;
}
#app>div:first-child {
  padding-bottom: 1.3rem;
}
</style>
