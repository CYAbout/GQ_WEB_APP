<template>
  <!-- 2.0首页-授信结果查询 -->
  <div class="CreditResult">
    <!-- 头部 -->
    <header-page :isRed="false"></header-page>
    <!-- banner -->
    <!-- <div class="bannerBox">
       <div class="bannerText">
           <p class="congrats">恭喜您</p>
           <p class="text">您的新雷凌专属贷款（中国工商银行）授信评测结果为：</p>
           <p class="number">2.4<span>万元</span></p>
       </div>
    </div> -->
    <!-- 查询相关结果 -->
    <div class="resultCont">
        <div class="rsBox" v-for="(item,ind) in this.rsList" :key="ind" style="margin-top:1rem">
            <DisabledInput label="授信编号" :placeholder="item.applycreditrecord.id"/>
            <DisabledInput label="手机号" :placeholder="item.applycreditrecord.phone"/>
            <DisabledInput label="授信额度" :placeholder="item.expectMoney"/>
        </div>
    </div>
  </div>
</template>
<script>
import HeaderPage from "./HeaderPage";
import DisabledInput from './formList/DisabledInput'
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import _global from './../assets/js/global.js'
import {MessageBox, Toast} from 'mint-ui'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "CreditResult",
  pageName: "授信结果查询",
  components: {
    HeaderPage,
    DisabledInput,
  },
  mixins: [_global],
    data() {
        return {
            rsList: []
        };
    },
    computed: {
        ...mapGetters(['getStateData']),
    },
    methods: {
        resultQuery () {
            let _param = {
                "phone": this.getStateData.phone || localStorage.phoneNumber
            }
			console.log(_param)
			let _url = '/finance/getcreditresult'
			RequestAxios.post(_url, _param).then((res) => {
                console.log(res)
                if(res.statusCode != '200') {
                    Toast('' + res.message)
                    return false
                }
                this.rsList = res.data
            }, (err) => {
                console.log('err:',err)
            }).catch((err) => {
                console.log('catch err:>', err)
            })
        }
    },
    activated () {
        // 授信结果查询
        this.resultQuery()
    }
};
</script>

<style lang="less">
   .bannerBox{
       height: 3.82rem;
       padding: 0 .3rem;
       background: url("./../assets/img/bannerResult.jpg") no-repeat;
       background-size: 100%;
       .bannerText{
           width:4.5rem;
           color:#fff;
           text-align: left;
           padding-top: .3rem;
           padding-left: .26rem;
           .congrats{
               font-size: .54rem;
               margin-bottom: .16rem;
           }
           .text{
               font-size:.24rem;
               line-height: .34rem;
               margin-bottom:.32rem;
           }
           .number{
               font-size:1rem;
               color:#fff;
               >span{
                   font-size:.91rem;
               }
           }
       }
   }

</style>
