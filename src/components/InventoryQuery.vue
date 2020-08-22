<template>
  <!-- 2.0首页库存查询 -->
  <div class="InventoryQuery">
      <!-- 头部 -->
    <header-page></header-page>
    <!-- 车型图片区域 -->
    <!-- <car-pic-cont background="#fff"></car-pic-cont> -->
    <car-swipe style="background:#fff;"></car-swipe>
    <div class="InventoryBox">
        <div class="carItem" v-for="(item,ind) in dataList" :key="ind">
            <h3>{{item.carmodelname}} {{item.carversioncode}}</h3>
            <div class="leftImg">
                <img src="./../assets/img/src/carpic1.jpg" alt="" srcset="">
            </div>
            <div class="rightTxt">
                <span style="color:#333">{{item.carversionname}}</span>
                <p>官方指导价 {{item.versionprice}}元</p>
                <span>库存：{{item.stock}}辆</span>
                <div class="btn">
                    <button @click="getPage(item)">立即抢订</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import CarPicCont from './../components/CarPicCont'
import CarSwipe from './../components/CarSwipe'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import _global from './../assets/js/global.js'
export default {
  name:'InventoryQuery',
  pageName: '在线订车库存',
  footFlag: 1,
  mixins: [_global],
  components: {
    HeaderPage,
    CarPicCont,
    CarSwipe,
  },
  data () {
    return {
      dataList: []
    }
  },
  methods: {
    queryList() {
      let _url = '/information/getallcar'
			RequestAxios.post(_url).then((res) => {
        console.log(res)
				if(res.data) {
					this.dataList = res.data
				}
			}, (err) => {
				console.log('err:',err)
			}).catch((err) => {
				console.log('catch err:>', err)
			})
    },
    getPage(ev) { 
      this.$router.push({path: '/OrderCarForm',query: {item: ev}})
    }
  },
  activated() {
    this.queryList()
  }
}
</script>

<style lang="less"> 
    .InventoryQuery {
        width:100%;
        overflow: hidden;
        .mint-swipe {
          .mint-swipe-indicators {
            .mint-swipe-indicator.is-active {
              border: 2px solid #333;
            }
          }
        }
        
    }
    .InventoryBox{
      padding:.2rem .3rem;
      padding-top:.6rem;
    }
    .carItem{
      padding: 0.6rem 0.15rem 0.15rem;
      display: flex;
      box-shadow: 0px 0px 8px 2px #ececec;
      border-radius: .12rem;
      margin-bottom: .2rem;
      position: relative;
      .leftImg{
        //  flex:1;
         >img{
           width:2.6rem;
          //  height:1.76rem;
         }
      }
      .rightTxt{
        flex:1;
        text-align: left;
        padding-left:.16rem;
        >h3{
          font-size: .28rem;
          margin-bottom: .1rem;
        }
        >p{
          font-size: .28rem;
          color:#be3932;
          margin-bottom: .08rem;
        }
        >span{
          font-size: .24rem;
          color:#999;
          display: inline-block;
          margin-bottom: 0.1rem;
        }
        .btn{
          margin-top: .12rem;
          >button{
             width:1.8rem;
             height: .4rem;
             line-height: .4rem;
             background:#be3932;
             border-radius: .2rem;
             color:#fff;
             font-size: .22rem;
          }
        }
      }
      >h3 {
        position: absolute;
        top: 0.15rem;
        left: 0.15rem;
        width: 98%;
      }
    }
</style>
<style>
</style>
