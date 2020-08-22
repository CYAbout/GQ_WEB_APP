<template>
<div class="PrizeAlert">
	<!-- 活动规则弹窗-->
	<div class="coverBox" @click="ruleClkClose" :class="{coverBox_trs:ruleTop}" v-show="ruleTop" style="z-index:100000">
		<div class="coverBack">
            <div class="contBox">
                <img :src="getImg(items.name)" alt="" class="alertImg">
                <div class="bg-box">
                    <div class="txt">
                        <h1>{{items.name}}</h1>
                        <span>核销码：{{items.code}}</span>
                        <div class="instructions">
                            <span class="tit">
                                <span style="display:inline-block;width: 0.2rem;border-top: 2px solid #fff;height: 0.1rem;margin-right: 0.1rem;"></span>
                                    兑奖说明
                                <span style="display:inline-block;width: 0.2rem;border-top: 2px solid #fff;height: 0.1rem;margin-left: 0.1rem;"></span>
                            </span>
                            <p>请凭核销码于2019年6月17日-7月30日期间前往</P>
                            <p>所选<span>广汽丰田汽车销售店试驾车兑奖</span></p>
                            <p>礼品将于2019年9月1日-9月30日期间</p>
                            <p>寄往客户留资地址</p>
                            <p>如有疑问,请联系丰云惠客服: 400-830-8888转2</p>
                        </div>
                        <div class="btn">
                            <button @click="_submit">返回</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
		
	</div>

</div>
</template>

<script>
export default{
    name:'PrizeAlert',
	data () {
		return {
            ruleTop: false,
            items: {},
		}
	},
	methods: {
        _submit() {
            console.log('_submit')
            this.$emit('clickSub')
        },
		ruleClk(ev) {
			this.ruleTop = true
            document.body.style.position = 'fixed'
            ev && (this.items = ev)
		},
		ruleClkClose() {
			this.ruleTop = false;
			document.body.style.position = 'relative'
        },
        getImg (ev) {
			switch(ev) {
				case '飞利浦剃须刀':
					return require('./../assets/img/gift_alert_TXD.png')
				break;
				case '华为P30手机':
					return require('./../assets/img/gift_alert_PHONE.png')
				break;
				case '车造型抱枕被':
					return require('./../assets/img/gift_alert_KTB.png')
				break;
				case '戴森空气净化循环扇':
					return require('./../assets/img/gift_alert_XCQ.png')
				break;
				case '大疆无人机':
					return require('./../assets/img/gift_alert_WRJ.png')
				break;
				case '车钥匙包':
					return require('./../assets/img/gift_alert_YS.png')
				break;
				case '雨伞收纳':
					return require('./../assets/img/gift_alert_YZ.png')
				break;
				case '索尼微单套机':
					return require('./../assets/img/gift_alert_XJ.png')
				break;
				case '300元京东E卡':
					return require('./../assets/img/gift_alert_300JD.png')
                break;
                case '500元京东E卡':
					return require('./../assets/img/gift_alert_500JD.png')
				break;
				case '车载手机支架':
					return require('./../assets/img/gift_alert_ZJ.png')
				break;
				// case '3000元换购补贴':
				// 	return require('./../assets/img/gift_alert_3000.png')
				// break;
				// case '5000元换购补贴':
				// 	return require('./../assets/img/gift_alert_5000.png')
				// break;
			}
			
		},
	},
}
</script>
<style lang="less">
  .PrizeAlert {
      .coverBox {
          .coverBack {
              padding: 1rem .57rem 0;
                .contBox {
                    position: relative;
                    left: 0.2rem;
                    top: 50%;
                    transform: translateY(-55%);
                }
                .alertImg {
                    width: 100%;
                    position: absolute;
                    top: 3.5rem;
                    left: -0.7rem;
                    transform: translateY(-100%);
                }
              .bg-box {
                    width: 100%;
                    height: 11.08rem;
                    background: url("./../assets/img/WOW_alert.png") no-repeat;
                    background-size: 100%;
                    position: relative;
                    background-position: center 2.5rem;
                  .txt {
                      position: absolute;
                      top:4.62rem;
                      width: 92%;
                      text-align: center;
                      >h1{
                          font-size: .65rem;
                          color: #fff;
                          margin-bottom: .14rem;
                      }
                      >span{
                          font-size: .24rem;
                          color:#fff;
                          opacity: .6;
                      }
                    .instructions {
                        padding: 0 .1rem;
                        margin-top: .34rem;
                        .tit {
                            // width: 1.78rem;
                            margin: 0 auto;
                            color: #fff;
                            text-align: center;
                            font-size: .28rem;
                            margin-bottom: .2rem;
                            display: inline-block;
                        }
                        >p{
                            font-size: .24rem;
                            color:rgba(255,255,255,.6);
                            // opacity: .6;
                            line-height: .32rem;
                            text-align: center;
                            >span{
                                color:rgba(255,255,255,1);
                            }
                        }
                    }
                    .btn {
                        width: 100%;
                        text-align: center;
                        margin-top: .38rem;
                        >button{
                            width:4.16rem;
                            height: .78rem;
                            background: #fff;
                            border: none;
                            border-radius: .39rem;
                            color: #be3932;
                            font-size: .28rem;
                        }
                    }
                  }
             
              }
          }
      }
  }
</style>
