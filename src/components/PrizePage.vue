<template>
<!-- 预约试驾礼品奖励页 -->
<div class="PrizePage">
     <!-- 头部 -->
    <header-page></header-page>
    <div class="prize-cont">
        <div class="top-prize">
            <div class="prize-img"><img :src="getImg(item)" alt="" srcset=""></div>
            <div class="txt">
                <h1>{{item.name}}</h1>
                <span>核销码：{{item.code}}</span>
                <div class="instructions">
                    <span class="tit">兑奖说明</span>
                    <p>请凭核销码于2019年6月17日-7月30日期间前往</P>
                    <p>所选广汽丰田汽车销售店试驾兑奖</p>
                    <p>礼品将于2019年9月1日-9月30日期间</p>
                    <p>寄往客户留资地址如有疑问,请联系丰云惠客服:400-830-8888转2</p>
                </div>
            </div>
        </div>
        <div class="form-box">
            <div class="form-title">
                <span>请填写收件人信息</span>
            </div>
            <form-input label="收件人" v-model="form.customername"  placeholder="请输入姓名" maxlength="16" type="text"/>
            <form-input label="联系电话" v-model="form.phone" placeholder="请输入电话" maxlength="11"/>
            <form-select
                @shoupup="getProvince"
                label="省份"
                v-model="form.province"
                :data-list="provinceData"
                name-key="name"
                placeholder="请选择"
                />
            <form-select
                @shoupup="getCity"
                label="城市"
                v-model="form.city"
                :data-list="cityData"
                name-key="cityname"
                placeholder="请选择"
                />
            <form-input label="区/县" v-model="form.address" placeholder="请填写详细地址" />
            <div class="btn">
                <button @click="clkSub">提交</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import * as city from './../assets/js/city.js'
import {MessageBox, Toast} from 'mint-ui'
import { RequestAxios, RequestGet } from "./../assets/js/server.js";
import HeaderPage from "./HeaderPage";
import FormInput from "./formList/FormInput";
import FormSelect from "./formList/FormSelect";
import _global from "./../assets/js/global.js"; //校验表单
import { setTimeout } from 'timers';
import { mapActions } from 'vuex';
export default {
    name:'PrizePage',
    pageName: '添加邮寄地址',
    // footFlag: 3,
    mixins: [_global],
    components: {
      HeaderPage,
      FormInput,
      FormSelect,
    },
	data () {
		return {
            item: {},
            params: {},
            form: {
                customername: '',
                phone: '',
                province: {}, //选中的省份
                city: {}, //选中的城市
                address: '',
            },
            provinceData: [], //所有省份
            cityData: [], //所在省份的所有城市
		}
	},
	methods: {
        ...mapActions(['setFootFlag']),
        clkSub() {
            let _url = '/gsys/leiling/addMailAddress'
            let _param = {
                customername: this.form.customername,
                phone: this.form.phone,
                province: this.form.province.name,
                city: this.form.city.name,
                address: this.form.address, // 详细地址
                giftid: this.item.id, // 礼品ID
                gifttype:  this.item.gifttype, // 0试驾礼，1购车礼
            }
            let _isName = this.isTypeExp('name',_param.customername)
            if(!_isName) {return false}
            let _isPhone = this.isTypeExp('phone',_param.phone)
            if(!_isPhone) {return false}
            let _exp = this.hasValExp(_param);
            if (!_exp) {return false}
            RequestAxios.post(_url,_param).then((res)=>{
                if(res.code == '200') {
                    this.subSuccess(()=>{
                        if(this.item.gifttype == '0') { // 试驾
                            this.$router.push({path: '/OrderCarForm'})
                        } else if (this.item.gifttype == '1') { // 购车
                            this.pickWhere(this.params)
                        }
                        
                    })
                }else {
                    Toast(res.message)
                }
            })
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
        //获取省份
        getProvince() {
            this.provinceData = city.cityList;
        },
        //获取城市
        getCity() {
            this.cityData = this.form.province.city
        },
        // 提交成功
        subSuccess (callback) {
            let _this = this
            MessageBox({
                title: '',
                message: 
                    `<div class="seccessBack">
                    <img src="${this.TYT_scc()}" style="width:100%;">
                    </div>`,
                showConfirmButton:true,
                showCancelButton: true, // cancelButtonText显示
                className: 'vinWidthBox',
                confirmButtonClass: 'TYTErrPopConfirmBtn',
                confirmButtonText: _this.item.gifttype == '0' ? '在线预定抽大奖' : '马上支付',
                cancelButtonClass:'TYTErrPopCancelBtn',
                cancelButtonText:'返回',

            }).then((ev)=>{
                console.log(ev)
                if(ev == 'confirm') {
                callback()
                }else if (ev == 'cancel') {
                    this.$router.go(-1)
                }
            });
        },
        TYT_scc () {
            return require('./../assets/img/AppointDrive_subSuccess.png')
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
                "carcolorid": _res.id, // 车型颜色表主键 Number
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
    },
    activated () {
        
        this.item = this.$route.query.item
        this.params = this.$route.query.params
        // 设置底部菜单状态
        let _gifttype = this.item.gifttype
        this.setFootFlag(_gifttype)
    }
}
</script>
<style lang="less">
  .PrizePage {
    width:100%;
    overflow: hidden;
    .prize-cont {
        padding: .15rem .3rem 0;
        .top-prize {
            width: 100%;
            height: 6.42rem;
            background: url("./../assets/img/bg_05.png") no-repeat;
            background-size: 100%;
            position: relative;
            .prize-img {
                width: 6.28rem;
                height:3.79rem;
                margin: 0 auto;
                >img {
                    width: 100%;
                }
            }
            .txt {
                margin-top: -.5rem;
                >h1{
                    font-size: .50rem;
                    color: #fff;
                    margin-bottom: .14rem;
                }
                >span{
                    font-size: .18rem;
                    color:#fff;
                }
            .instructions {
                padding: 0 .3rem;
                margin-top: .34rem;
                .tit {
                    width: 1.78rem;
                    margin: 0 auto;
                    color: #fff;
                    opacity: .6;
                    text-align: center;
                    font-size: .23rem;
                    margin-bottom: .1rem;
                    display: inline-block;
                }
                >p{
                    font-size: .18rem;
                    color:#fff;
                    opacity: .6;
                    line-height: .32rem;
                    text-align: center;
                }
            }
            }
        
        }
        .form-box {
            margin: 0 .3rem;
            margin-top: .54rem;
            .form-title {
                margin-bottom: .4rem;
                >span{
                    font-size: .32rem;
                    position: relative;
                    color: #8e8e8e;
                    &::before {
                        content:'';
                        position: absolute;
                        top:50%;
                        left:-.28rem;
                        width: .14rem;
                        height: 1px;
                        background: #8e8e8e;
                    }
                    &::after {
                        content:'';
                        position: absolute;
                        width: .14rem;
                        height: 1px;
                        background: #8e8e8e;
                        top: 50%;
                        right:-.28rem;
                    }
                }
            }
            .iptBox,.iptBox_select {
                margin: 0;
                padding: 0 .36rem;
                border: 1px solid #d1d1d1;
                border-radius: .31rem;
                margin-bottom: .26rem;
                background-position: 97%;
                background-size: auto 30%;
                text-align: right;
                display: flex;
                .label {
                    font-size: .26rem;
                    width: 1.2rem;
                    flex-shrink: 0;
                }
                .cont {
                    width: 100%;
                    font-size: .26rem;
                }
                .my-content-list {
                    width: 100%;
                }
            }
              .btn {
                width: 100%;
                text-align: center;
                margin-top: 0.6rem;
                margin-bottom: 0.6rem;
                >button{
                    width:4.16rem;
                    height: .78rem;
                    background: #be3932;
                    border: none;
                    border-radius: .39rem;
                    color: #fff;
                    font-size: .28rem;
                }
            }
              ::-webkit-input-placeholder { /* WebKit browsers */
                    color: #999;
                    font-size: 0.26rem;
                }
                :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #999;
                    font-size: 0.26rem;
                }
                ::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #999;
                    font-size: 0.26rem;
                }
                :-ms-input-placeholder { /* Internet Explorer 10+ */
                    color: #999;
                    font-size: 0.26rem;
                }
        }
    }
  }
 .TYTErrPopConfirmBtn {
    position: absolute;
    top: 4.2rem;
    left: 50%;
    margin-left: -2rem;
    width: 4rem;
    height: .7rem;
    line-height: .7rem;
    background: #fff;
    color: #be3932;
    border-radius: 20px;
    font-size: .28rem;
    letter-spacing: 5px;
  }
   .TYTErrPopCancelBtn {
    position: absolute;
    top: 5.3rem;
    left: 50%;
    margin-left: -2rem;
    width: 4rem;
    height: .7rem;
    line-height: .7rem;
    background:transparent;
    color: #fff;
    border-radius: 20px;
    font-size: .28rem;
    letter-spacing: 5px;
    border: 1px solid #fff;
  }
</style>
