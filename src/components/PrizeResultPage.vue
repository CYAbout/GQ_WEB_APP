<template>
<!-- 预约试驾礼品奖励页  -->
<div class="PrizeResult">
     <!-- 头部 -->
    <header-page></header-page>
    <!-- 中奖 -->
    <div class="cardBox" v-if="item.isprize">
        <img class="card" src="./../assets/img/PrizeResult_has.png">
        <img class="prizeImg" :src="getImg({name:item.name})" alt="" srcset="">
        <div class="prizeTxt">
            <h2>恭喜您抽中</h2>
            <h1>{{item.name}}</h1>
            <span>核销码:{{item.code}}</span>
            <ul>
                <li>现前往<span>丰云行APP</span>支付{{params.payprice}}元购车意向金</li>
                <li><span>更有机会赢取万元无人机哦</span></li>
                <li style="font-size: 0.2rem;">*在线支付<span>前1000名</span>客户,赠送惊喜大礼包</li>
            </ul>
        </div>
        <button class="subBtn" style="bottom:0.4rem" @click="subClk">马上支付</button>
    </div>
    <!-- 未中奖 -->
    <div class="cardBox" v-else>
        <img class="card" src="./../assets/img/PrizeResult_none.jpg">
        <div class="prizeTxt">
            <h1 style="font-size: 0.7rem;margin-top: 0;">很遗憾</h1>
            <span></span>
            <ul>
                <li><span>和500元京东卡擦肩而过了!</span></li>
                <li><span>别气馁,前往</span>丰云行APP<span>支付{{params.payprice}}元购车意向金</span></li>
                <li>更有机会赢取万元无人机哦</li>
                <li style="font-size: 0.18rem;"><span style="color:#f2f2f2">*在线支付</span><a style="font-weight:bold;color:#fff;">前1000名</a><span style="color:#f2f2f2">客户,赠送惊喜大礼包</span></li>
            </ul>
        </div>
        <button class="subBtn" @click="subClk">马上支付</button>
    </div>
</div>
</template>

<script>
import {MessageBox, Toast} from 'mint-ui'
import { RequestAxios, RequestGet } from "./../assets/js/server.js";
import HeaderPage from "./HeaderPage";
import _global from "./../assets/js/global.js"; //校验表单
import { setTimeout } from 'timers';
import { mapActions } from 'vuex';
export default {
    name:'PrizeResult',
    pageName: '在线预订',
    footFlag: 1,
    mixins: [_global],
    components: {
      HeaderPage,
    },
	data () {
		return {
            params: {},
            item: {},
		}
	},
	methods: {
        ...mapActions(['setOrderId']),
        // 点击马上支付
        subClk() {

            if (this.item.isOpenPay == '1') { // 支持在线支付
                this.ifLogon(()=>{ // 判断是否注册
                    this.TYTWinClk()
                })
            } else if(this.item.isOpenPay == '0'){
                this.TYTWinClk_err()
            }
        },
        ifLogon(_callback) {
            let l_url = '/information/getuserinfo'
            let l_params = {
                "phone": this.params.phone,
            }
            RequestAxios.post(l_url,l_params).then((res) => {
                if(res.resultCode == '1') {
                    // 测试
                    // if(this.$route.query.pageFrom == 'logon') {
                    //     console.log('is logon')
                    //     res.isRegister = '1'
                    // }else {
                    //     console.log('not logon')
                    //     res.isRegister = '0'
                    // }
                    if(res.isRegister == '1') { // 判断是否已注册
                        _callback(res)
                    } else {
                        this.$router.push({path:'/LogonForm',query: {item: this.item,params: this.params}})
                    }
                
                }
                
                console.log('res:',res)
            }, (err) => {
                console.log('err:',err)
            })
        },
        // 跳转丰云行App弹窗
        TYTWinClk () {
            MessageBox({
                title: '',
                message: 
                    `<div class="seccessBack">
                    <img src="${this.TYT_seccess()}" style="width:100%;">
                    </div>`,
                showConfirmButton:true,
                showCancelButton: true, // 底部圆close
                className: 'vinWidthBox',
                confirmButtonClass: 'TYTPopConfirmBtn',
                confirmButtonText:'前往丰云行',
                cancelButtonClass:'popCloseBtn',
                cancelButtonText:'',

            }).then((ev)=>{
                if (ev == 'confirm') {
                    this.setOrderId(null) // 订单ID清空
                    this.pickWhere(this.params)
                }
            });
        },
        TYT_seccess () {
            return require('./../assets/img/load_app.png')
        },
        TYTWinClk_err () {
            MessageBox({
                title: '',
                message: 
                    `<div class="seccessBack">
                    <img src="${this.TYT_err()}" style="width:100%;">
                    </div>`,
                showConfirmButton:true,
                showCancelButton: false, // 底部圆close
                className: 'vinWidthBox',
                confirmButtonClass: 'TYTPopErrBtn',
                confirmButtonText:'返回',
                cancelButtonClass:'popCloseBtn',
                cancelButtonText:'',

            }).then((ev)=>{
                if (ev == 'confirm') {
                    this.$router.back()
                }
            });
        },
        TYT_err () {
            return require('./../assets/img/cantBuyCarAlert.png')
        },
        pickWhere(res) {
            window.getmsg = (ev)=> {
                console.log(ev,res.orderno)
                this.getGtmc(ev,res)
            }
            // 判断平台
            this.GTMC.getEnvironment('getmsg')
            },
            getGtmc(ev,_res) {
            let _payState = {
                "payType":0,
                "buyType":0,
                "userId":0,
                "phone": _res.phone, // 用户手机号
                "userName": _res.userName, // 用户名称
                "cardId": _res.idcard, // 身份证号 String
                "buyerPhone":"",
                "buyerName":"",
                "provinceCountry": _res.province + '' + _res.city,  // 省市
                "address": _res.receivingaddress,
                "enterpriseName":null,
                "enterpriseCode":null,
                "payPrice": _res.payprice.toFixed(2),  // 意向金金
                "officialPrice": _res.officialprice.toFixed(2),  // 官方指导价格 Number 0.00
                "colorPrice": _res.colorprice.toFixed(2),       // 颜色价格 Number 0.00
                "sumPrice": _res.sumprice.toFixed(2),  // 总价
                "carColorId": _res.carcolorid, // 车型颜色表主键 Number
                "carColorCode": _res.carcolorcode,   // 车型颜色code
                "carColorName": _res.carcolorname,     // 车型颜色名称
                "vhcCode":null,
                "sfxCode":"",
                "carModelId": _res.carmodelid,       // 车系id Number
                "carModelCode": _res.carmodelcode,     // 车系code String
                "carModelName": _res.carmodelname,     // 车系名称 String
                "carVersionId":null,
                "carVersionCode": _res.carversioncode,   // 车型版本code String
                "carVersionName": _res.carversioname,   // 车型版本名称
                "orderStatus":1,
                "dealerCode": _res.dealerId, // 销售店码
                "dealerName": _res.dealerName, // 销售店名
                "demoImg": _res.imagesurl,          // 车型默认图片
                "exhaust":"",
                "eipModelId":"",
                "payDate":null,
                "sendMsgFlag":null,
                // "createDate":1556266960203,
                "createBy":"",
                // "updateDate":1556266960203,
                "thirdPartyOrderNo": _res.orderno, // Number
                // "updateBy":"",
                "sourceFrom":"0",
            }
            console.log('_payState:',_payState)
            // return
            if (ev.resultCode == '2') { // 移动web页面
                console.log('resultCode2:',ev.resultCode)

                this.GTMC.WebToApp({
                    "fType":"5",
                    "code":"10171001",
                    "payState":_payState,

                // "payState":{"payType":0,"buyType":0,"userId":209132,"phone":"13764771940","userName":"得","cardId":"366646466666465465","buyerPhone":"13764771940","buyerName":"","provinceCountry":"贵州省黔东南州","address":"3呃呃呃得得得","enterpriseName":null,"enterpriseCode":null,"payPrice":1.00,"officialPrice":144800.00,"colorPrice":0.00,"sumPrice":144800.00,"carColorId":25,"carColorCode":"6W9","carColorName":"碧玉蓝","vhcCode":null,"sfxCode":"R0EA","carModelId":26,"carModelCode":"C-HR","carModelName":"C-HR","carVersionId":null,"carVersionCode":"2.0Ent FA20 G5","carVersionName":"精英版 黑内色","orderStatus":1,"dealerCode":"44A10","dealerName":"广汽丰田第一店","demoImg":"https://carapptest.gtmc.com.cn/fs01/20190228/4f79476e4d5b0e81112c863639b262c6.png","exhaust":"2.0L","eipModelId":"MAXA10L-EHXDHC","payDate":null,"sendMsgFlag":null,"createDate":1556266960203,"createBy":"209132","updateDate":1556266960203,"thirdPartyOrderNo":123456789,"updateBy":"209132","sourceFrom":"0"
                // }


                });


            }else if (ev.resultCode == '3') { // APP页面
                console.log('resultCode3:',ev.resultCode)

                // 丰云能量首页
                this.GTMC.toPage({
                "code": "10171001",
                "payState":_payState,

                // "payState":{"payType":0,"buyType":0,"userId":209132,"phone":"13764771940","userName":"得","cardId":"366646466666465465","buyerPhone":"13764771940","buyerName":"","provinceCountry":"贵州省黔东南州","address":"3呃呃呃得得得","enterpriseName":null,"enterpriseCode":null,"payPrice":1.00,"officialPrice":144800.00,"colorPrice":0.00,"sumPrice":144800.00,"carColorId":25,"carColorCode":"6W9","carColorName":"碧玉蓝","vhcCode":null,"sfxCode":"R0EA","carModelId":26,"carModelCode":"C-HR","carModelName":"C-HR","carVersionId":null,"carVersionCode":"2.0Ent FA20 G5","carVersionName":"精英版 黑内色","orderStatus":1,"dealerCode":"44A10","dealerName":"广汽丰田第一店","demoImg":"https://carapptest.gtmc.com.cn/fs01/20190228/4f79476e4d5b0e81112c863639b262c6.png","exhaust":"2.0L","eipModelId":"MAXA10L-EHXDHC","payDate":null,"sendMsgFlag":null,"createDate":1556266960203,"createBy":"209132","updateDate":1556266960203,"thirdPartyOrderNo":123456789,"updateBy":"209132","sourceFrom":"0"
                // }
                
                });

            }

        },
        getImg (ev) {
			switch(ev.name) {
				case '飞利浦剃须刀':
					return require('./../assets/img/gift_form_TXD.png')
				break;
				case '华为P30手机':
					return require('./../assets/img/gift_form_PHONE.png')
				break;
				case '车造型抱枕被':
					return require('./../assets/img/gift_form_KTB.png')
				break;
				case '戴森空气净化循环扇':
					return require('./../assets/img/gift_form_XCQ.png')
				break;
				case '大疆无人机':
					return require('./../assets/img/gift_form_WRJ.png')
				break;
				case '车钥匙包':
					return require('./../assets/img/gift_form_YS.png')
				break;
				case '雨伞收纳':
					return require('./../assets/img/gift_form_YZ.png')
				break;
				case '索尼微单套机':
					return require('./../assets/img/gift_form_XJ.png')
				break;
				case '300元京东E卡':
					return require('./../assets/img/gift_form_300JD.png')
                break;
                case '500元京东E卡':
					return require('./../assets/img/gift_form_500JD.png')
				break;
				case '车载手机支架':
					return require('./../assets/img/gift_form_ZJ.png')
				break;
				// case '3000元换购补贴':
				// 	return require('./../assets/img/gift_form_3000.png')
				// break;
				// case '5000元换购补贴':
				// 	return require('./../assets/img/gift_form_5000.png')
				// break;
			}
			
        },
    },
    activated () {
        
        let _item = this.$route.query.item
        if(_item) {
            this.item = _item
        }
        let _params = this.$route.query.params
        if(_params) {
            this.params = _params
        }
        if (this.$route.query.pageFrom == 'logon') { // 如果从注册页过来就弹窗
            console.log(this.params)
            this.TYTWinClk()
        }
    },
}
</script>
<style lang="less">
.PrizeResult {
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
        .prizeImg {
            position: absolute;
            width:70%;
            transform: translateX(-50%);
            left: 50%;
            top: 0;
        }
        .prizeTxt {
            text-align: center;
            width: 100%;
            color: #fff;
            position: absolute;
            top: 28%;
            >h1 {
                margin-top: 0.15rem;  
            }
            >span {
                margin-top: 0.15rem;
                display: inline-block;
            }
            >ul {
                margin-top: 0.5rem;
                font-size: 0.28rem;
                >li {
                    // font-weight: bold;
                    color: #fff;
                    margin-top: 0.1rem; 
                    >span {
                        color: #fea19c;
                    }
                }
            }
        }
    }
    .subBtn {
        height: 0.8rem;
        border-radius: 0.4rem;
        width: 5rem;
        background: #fff;
        color: #be3932;
        letter-spacing: 0.1rem;
        position: absolute;
        bottom: 0.7rem;
        left: 50%;
        transform: translateX(-50%)
    }
}
.TYTPopConfirmBtn {
  position: absolute;
  top: 6.3rem;
  left: 50%;
  margin-left: -1.5rem;
  width: 3rem;
  height: .7rem;
  line-height: .7rem;
  background: #fff;
  color: #be3932;
  border-radius: 20px;
  font-size: .28rem;
  letter-spacing: 5px;
}
.TYTPopErrBtn {
    position: absolute;
    top: 5rem;
    left: 50%;
    margin-left: -1.5rem;
    width: 3rem;
    height: .7rem;
    line-height: .7rem;
    background: #fff;
    color: #be3932;
    border-radius: 20px;
    font-size: .28rem;
    letter-spacing: 5px;
}
.popCloseBtn {
    top: 0;
    right: 0;
    left: auto;
}
</style>