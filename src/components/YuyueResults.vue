<template>
  <!-- 预约试驾查询结果页 -->
  <div class="userQuery">
      <!-- 头部 -->
    <header-page></header-page>
    <div class="giftContentBox">
      <div class="inBannerBox">
        <img src="./../assets/img/banner_sel.jpg">
      </div>
    </div>
    <!-- 查询的分类 -->
    <div class="queryList">
      <div class="queryBox" v-for="(item,ind) in contlist" :key="ind">
        
        <div class="queryItem yyQuery">
          <span class="txt">真实姓名</span>
          <i>{{item.realname}}</i>
        </div>
        <div class="queryItem yyQuery">
          <span class="txt">手机号</span>
          <i>{{item.phone}}</i>
        </div>
        <div class="queryItem yyQuery">
          <span class="txt">身份证号</span>
          <i>{{item.idCard}}</i>
        </div>
        <div class="queryItem yyQuery">
          <span class="txt">省份</span>
          <i>{{item.provinces}}</i>
        </div>
        <div class="queryItem yyQuery">
          <span class="txt">城市</span>
          <i>{{item.city}}</i>
        </div>
        <div class="queryItem yyQuery">
          <span class="txt">销售店</span>
          <i>{{item.dealername}}</i>
        </div>
        <div class="queryItem yyQuery">
          <span class="txt">销售店地址</span>
          <i>{{item.address}}</i>
        </div>
        <div class="queryItem yyQuery">
          <span class="txt">车型</span>
          <i>{{item.carcategory}}</i>
        </div>
        <div class="queryItem yyQuery">
          <span class="txt">创建时间</span>
          <i>{{new Date(item.createtime).toLocaleString()}}</i>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import HeaderPage from './HeaderPage'
import { RequestAxios, RequestGet } from "./../assets/js/server.js";
import {mapActions, mapGetters} from 'vuex'
export default {
  name:'UserQuery',
  components: {
    HeaderPage,
  },
  data () {
    return{
      contlist: []
    }
  },
  methods:{
    //预约试驾查询
     getDetailReques(){
        let url = "/gsys/leiling/selectTestDrive";

        let param = {
          phoneNo:this.getStateData.phone || localStorage.phoneNumber
        }
        RequestGet(url,param)
          .then(
            res => {
              console.log('getDetailReques',res)
              if (res.code === "200") {
                this.contlist = res.content.testdriveList
              }
            },
            err => {
              console.log("err:", err);
            }
          )
          .catch(err => {
            console.log("catch err:>", err);
          });
     }
  },
  computed: {
		...mapGetters(['getStateData'])
	},
  mounted(){
  },
  activated() {
    //查询预约试驾
     this.getDetailReques();
  }
}
</script>

<style lang="less"> 
    .userQuery {
      width:100%;
      overflow: hidden;
      padding-bottom: 0.4rem;
      .btnBox{
        margin-top: 1.16rem;
        text-align: center;
        >button{
          width:3.41rem;
          height: .6rem;
          background: #be3932;
          font-size: .28rem;
          color: #fff;
          border-radius: .3rem;
        }
      }
    }
    .userInformation {
        display: flex;
        background:#be3932;
        padding:.2rem .3rem .37rem;
        .userImg {
            width:1.26rem;
            height:1.26rem;
            background:#fff;
            margin-right:.3rem;
            margin-left:0.08rem;
            border-radius: .12rem;
            >img{
              width:100%;
              height:100%;
            }
        }
        .namePhone {
            flex:1;
            text-align:left;
            padding: .22rem 0;
            >p{
              color:#fff;
            }
            .name{
              font-size:.38rem;
              margin-bottom: .16rem;
            }
            .phone{
              font-size: .28rem;
            }
        }
    }
    .queryList {
      padding: 0 .3rem;
      .queryBox{
        .queryItem{
          display: flex;
          align-items: center;
          height:.94rem;
          border-bottom: 1px solid #ebebeb;
           >span{
             display: inline-block;
             font-size: .28rem; 
           }
           .txt{
                margin-right:.16rem;
            }
        }
      }
    }
</style>
