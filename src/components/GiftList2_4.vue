<template>	
	<div>
	<!-- 2.4-首页-查询页-礼品结果 -->
		<!-- 头部 -->
		<HeaderPage></HeaderPage>
		<div class="giftContentBox">
			<!-- 标题 -->
			<h2 class="titleH2">
				<span class="titSpan">我的礼品 ></span>
				<img src="@/assets/img/tit_gift.png" class="titImg">
			</h2>
			<ul class="dataList">
				<li  v-for="(item,index) in giftListArr" :key="index">
					<div class="imgBox">
						<img :src="getImg(item.name)" alt="">
						<div class="imgCode">核销码: {{item.code}}</div>
					</div>
					<div class="txtBox">
						<h3>{{item.name}}</h3>
						<div>领取方法: {{item.gifttype=='1' ? '到店办理金融购车手续后领取' : '到店试驾后领取'}}</div>
						<div>礼品来源: {{item.gifttype=='1' ? '在线购车' : '预约试驾'}}</div>
						<img @click="detailFun(item)" src="./../assets/img/GiftList_button.png" alt="" class="button">
					</div>
				</li>
			</ul>
		</div>
		<!-- 奖品弹窗 -->
    <prize-alert ref="prize" @clickSub="_clickSub"/>
	</div>
</template>

<script>
import {RequestAxios,RequestGet} from './../assets/js/server.js'
import HeaderPage from './HeaderPage'
import PrizeAlert from './PrizeAlert'
import {MessageBox, Toast} from 'mint-ui'
import _global from './../assets/js/global.js'
import {mapActions, mapGetters} from 'vuex'
export default{
	name:'giftList',
	pageName: '礼品查询',
  footFlag: 3,
	mixins: [_global],
	components: {
			HeaderPage,
			PrizeAlert,
	},
	data(){
		return{
			giftListArr:[				
				// {
				// 	name:'车造型抱枕被',//礼品名称
				// 	code:'GZ99828273',//核销码
				// 	wintype:'0',//领取方法
				// 	imgSrc:''
				// 	//imgSrc:require('../assets/img/gift_p1.png'),//图片src
				// },
			]
		}
	},
	computed: {
		...mapGetters(['getStateData']),
	},
	methods:{
		Getgiftlist(){
      let url1 = '/gift/getgiftlist'
			let param = {
				phone: this.getStateData.phone || localStorage.phoneNumber
				// phone: '18210130237'
			};
			RequestAxios.post(url1, param).then((res) => {
				if (!res.flag) {
					Toast(res.message)
					return false
				}
				this.giftListArr=res.data;
			}, (err) => {
				console.log('err:',err)
			}).catch((err) => {
				console.log('catch err:>', err)
			})
		},
		getImg (ev) {
			switch(ev) {
				case '飞利浦剃须刀':
					return require('./../assets/img/gift_TXD.png')
				break;
				case '华为P30手机':
					return require('./../assets/img/gift_PHONE.png')
				break;
				case '车造型抱枕被':
					return require('./../assets/img/gift_KTB.png')
				break;
				case '戴森空气净化循环扇':
					return require('./../assets/img/gift_XCQ.png')
				break;
				case '大疆无人机':
					return require('./../assets/img/gift_WRJ.png')
				break;
				case '车钥匙包':
					return require('./../assets/img/gift_YS.png')
				break;
				case '雨伞收纳':
					return require('./../assets/img/gift_YZ.png')
				break;
				case '索尼微单套机':
					return require('./../assets/img/gift_XJ.png')
				break;
				case '300元京东E卡':
					return require('./../assets/img/gift_300JD.png')
				break;
				case '500元京东E卡':
					return require('./../assets/img/gift_500JD.png')
				break;
				case '车载手机支架':
					return require('./../assets/img/gift_ZJ.png')
				break;
				case '3000元换购补贴':
					return require('./../assets/img/gift_3000.png')
				break;
				case '5000元换购补贴':
					return require('./../assets/img/gift_5000.png')
				break;
			}
			
		},
		detailFun (_item) { // 查看详情
			if (_item.isaddressnull == '0' && _item.gifttype == '0') { // 填写收货地址
				this.$router.push({'path': '/PrizePage',query: {item: _item}})
			} else { // 礼品弹窗
				this.$refs.prize.ruleClk(_item);
			}
			
		},
		_clickSub() { // 详情弹窗button事件
			console.log('back')
		}
	},
	activated(){
	    this.Getgiftlist();
	},
	
}
</script>
<style lang="less">
	.dataList {
		>li {
			display: flex;
			margin: 0.5rem 0;
			border-radius: 10px;
			box-shadow: 0 0 10px 0px #ccc;
			overflow: hidden;
			.imgBox {
				width: 2.6rem;
				height: 2.6rem;
				background: #be3932;
				border-radius: 10px;
				box-shadow: 0 0 10px -0px #666;
				color: #fff;
				>img {
					width: 100%;
					margin-top: 0.2rem;
				}
				>.imgCode {
					height:0.4rem;
					line-height: 0.4rem;
				}
			}
			.txtBox {
				flex-grow: 1;
				text-align: left;
				margin-left: 10px;
				>h3 {
					border-left: 4px solid #be3932;
					margin-top: 0.4rem;
					margin-bottom: 0.1rem;
					padding-left: 5px;
					font-size: 0.4rem;
				}
				>div {
					color: #676767;
					padding-top:0.1rem;
					padding-left:0.2rem;
				}
				>.button {
					margin-top:0.2rem;
					height: 0.4rem;
				}
			}
		}
	}
</style>

</style>
