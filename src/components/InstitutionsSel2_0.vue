<template>
<div :class="fbankShow || ruleTop ? 'overHidden' : ''">
<!-- 2.0-金融机构选择 -->

	<!-- 头部 -->
	<HeaderPage></HeaderPage>
	
	<div class="giftContentBox">
		<div class="inBannerBox">
			<img src="./../assets/img/banner_sel_h.png">
			<!-- 活动规则 -->
			<a class="btn" @click="ruleClk('rp')">
				<img src="./../assets/img/banner_sel_btn.png">
			</a>
		</div>
		<!-- <div class="instSelImgBox">
			<img src="./../assets/img/jr_banner1.png">
		</div> -->
		<!-- <ul class="instSelIconBox">
			<li>
				<img src="./../assets/img/icon_ins1.png">
				<span>
					快熟授信<br/>
					快至1天放款
				</span>
			</li>
			<li>
				<img src="./../assets/img/icon_ins2.png">
				<span>
					月利率0.019%起<br/>
					全渠道最低
				</span>
			</li>
			<li>
				<img src="./../assets/img/icon_ins3.png">
				<span>
					可分12/24/36期<br/>
					归还
				</span>
			</li>
		</ul> -->
	</div>
	<div class="titleH3">
		<span>推荐产品 ></span>
	</div>
	<div class="giftContentBox">
		<div class="insSelCardBox insCardBack1">
			<div class="insSelCardTitle">
				<span class="insCardT"> > <em>丰田金融</em></span>
				<span class="aclass" @click="ruleClk('jr')">*产品详情</span>
			</div>
			<div class="insSelCardCont">
				<span class="insSelCardContL">在线申请&nbsp;秒出额度</span>
				<span class="insSelCardContR">
					<i>门槛低 | 审批快</i>
					<em>1-3年</em>
				</span>
			</div>
			<div class="aclssBox">
				<span @click.stop="linkInforFJ">
					<i></i><i></i>
					<a class="aclass">快速申请</a>
					<i></i><i></i>
				</span>
			</div>
		</div>
		<div class="insSelCardBox insCardBack1">
			<div class="insSelCardTitle">
				<span class="insCardT"> > <em>五大银行</em></span>
				<span class="aclass" @click="ruleClk('yh')">*产品详情</span>
				<!-- <a class="aclass" @click.stop="proApply('1')">快速申请</a> -->
			</div>
			<div class="insSelCardCont">
				<span class="insSelCardContL">梦想贷，真心0息</span>
				<span class="insSelCardContR">
					<i>2成首付 | 3年0利息</i>
					<em>1-3年</em>
				</span>
			</div>
			<div class="aclssBox">
				<span @click.stop="proApply('1')">
					<i></i><i></i>
					<a class="aclass">快速申请</a>
					<i></i><i></i>
				</span>
			</div>
		</div>
<!-- 
		<dl class="insSelCardBox insCardBack1">
			<dt class="insSelCardTitle">
				<span class="insCardT"> > <em>工商银行</em></span>
				<i @click="blockCover">申请</i>
			</dt>
			<dd class="insSelCardCont">
				<span class="insSelCardContL">2成首付 0利息</span>
				<span class="insSelCardContR">
					<i>在线授信 | 3小时放款</i>
					<em>1-5年</em>
				</span>
			</dd>
		</dl> -->

		<div class="insSelCardBox insCardBack1">
			<div class="insSelCardTitle">
				<span class="insCardT"> > <em>丰田租赁-直租</em></span>
				<span class="aclass" @click="ruleClk('zhizu')">*产品详情</span>
				<!-- <a class="aclass" @click.stop="proApply('2')">快速申请</a> -->
			</div>
			<div class="insSelCardCont">
				<div class="insSelCardContL1">
					<p>
						<i class="cardContI1">0首付</i>
						<i class="cardContI2">日供70元起</i>
					</p>
					<p>
						<i class="cardContI3">贷款金额</i>
						<i class="cardContI4">130000</i>
						<i class="cardContI5">元</i>
					</p>
				</div>
				<span class="insSelCardContR">
					<i>个人牌照 | 到期可续租</i>
					<em>1-5年</em>
				</span>
			</div>
			<div class="aclssBox">
				<span @click.stop="proApply('2')">
					<i></i><i></i>
					<a class="aclass">快速申请</a>
					<i></i><i></i>
				</span>
			</div>
		</div>

		<div class="insSelCardBox insCardBack1">
			<div class="insSelCardTitle">
				<span class="insCardT"> > <em>丰田租赁-回租</em></span>
				<span class="aclass" @click="ruleClk('huizu')">*产品详情</span>
				<!-- <a class="aclass" @click.stop="proApply('3')">快速申请</a> -->
			</div>
			<div class="insSelCardCont">
				<div class="insSelCardContL1">
					<p>
						<i class="cardContI1">0首付</i>
						<i class="cardContI2">日供85元起</i>
					</p>
					<p>
						<i class="cardContI3">贷款金额</i>
						<i class="cardContI4">130000</i>
						<i class="cardContI5">元</i>
					</p>
				</div>
				<span class="insSelCardContR">
					<i>公司牌照 | 到期可续租</i>
					<em>1-5年</em>
				</span>
			</div>
			<div class="aclssBox">
				<span @click.stop="proApply('3')">
					<i></i><i></i>
					<a class="aclass">快速申请</a>
					<i></i><i></i>
				</span>
			</div>
		</div>
		<div class="readTxtBtm">
			<p>*以上金融政策仅供参考</p>
			<p>因不同地区可能存在差异,具体政策均以当地销售店为准</p>
		</div>
	</div>
	<!-- 五大银行-->
	<div class="coverBox" :class="{coverBox_trs:fbankShow}" v-show="fbankShow">
		<div class="coverBack" @click="closeFbank()"></div>
		<div class="tableBox">
			<div class="tableBoxBorder">
				<!-- <div class="tableHead">
					广汽丰田携手五大银行为车主在线购车<br>
					提供多种分期金融方案<br>
					让车主花更少的钱开最新的车
				</div> -->
				<table class="insTable" style="width:101%;margin: -1px;left:0;">
					<thead style="background: #fff;">
						<tr>
							<th><div class="">车型</div></th>
							<th><div class="">金融机构</div></th>
							<th><div class="">首付区间</div></th>
							<th><div class="">期限</div></th>
							<th><div class="">万元月供系数</div></th>
							<th><div >备注</div></th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(item,index) in ruleList" :key="index">
							<td>{{item.CarModle}}</td>
							<td>{{item.Finan}}</td>
							<td>{{item.Payment}}</td>
							<td>{{item.Term}}</td>
							<td>{{item.Ratio}}</td>
							<td>{{item.Other}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="tableHead">
				<p>
					*本金融方案支付银行有：工商银行、建设银行、农业银行、中国银行、交通银行。
				</p>
				<p>
					*金融政策受地域影响，请详询当地经销店。
				</p>
			</div>
		</div>
	</div>

	<!-- 活动规则弹窗-->
	<rule-page ref="rp" closeType="none">
		<img src="./../assets/img/ruleCont.png">
	</rule-page>
		<!-- 丰田金融弹窗-->
	<rule-page ref="jr" :isfull="true" button-text="返回" @winClick="ruleClkClose('jr')">
		<img src="./../assets/img/ft-financial.jpg" style="margin-bottom:2rem;margin-top:0.2rem;">
	</rule-page>
		<!-- 五大银行弹窗-->
	<rule-page ref="yh" :isfull="true" button-text="返回" @winClick="ruleClkClose('yh')">
		<img src="./../assets/img/wudayinghang.jpg" style="margin-bottom:2rem;margin-top:0.2rem;">
	</rule-page>
		<!-- 丰田租赁弹窗-->
	<rule-page ref="zhizu" :isfull="true" button-text="返回" @winClick="ruleClkClose('zhizu')">
		<img src="./../assets/img/zhizu.jpg" style="margin-bottom:2rem;margin-top:0.2rem;">
	</rule-page>
		<!-- 丰田租赁弹窗-->
	<rule-page ref="huizu" :isfull="true" button-text="返回" @winClick="ruleClkClose('huizu')">
		<img src="./../assets/img/huizu.jpg" style="margin-bottom:2rem;margin-top:0.2rem;">
	</rule-page>
</div>
</template>

<script>
import HeaderPage from './HeaderPage'
import {mapActions, mapGetters} from 'vuex'
import {MessageBox} from 'mint-ui'
import _global from './../assets/js/global.js'
import RulePage from './RulePage'
export default{
	name:'institutionsSel',
	pageName: '金融',
	footFlag: 2,
	mixins: [_global],
	components: {
		HeaderPage,
		RulePage,
	},
	computed: {
		...mapGetters(['getStateData'])
	},
	methods: {
		//丰田金融 介绍
		blockTOYOTA:function(){
			this.fbankShow=true;
		},
		closeTOYOTA:function(){
			this.fbankShow=false;
		},
		//五大银行 介绍
		blockFbank:function(){
			this.fbankShow=true;
		},
		closeFbank:function(){
			this.fbankShow=false;
		},
		//丰田租赁 个人 介绍
		blockSelf:function(){
			this.fbankShow=true;
		},
		closeSelf:function(){
			this.fbankShow=false;
		},
		//丰田租赁 公司 介绍
		blockCom:function(){
			this.fbankShow=true;
		},
		closeCom:function(){
			this.fbankShow=false;
		},
		proApply:function(flag){ // 丰田金融留资
			this.$router.push({path:'InsLeaveInfor2_2', query: {bankFlag: flag}});
		},
		linkInforFJ:function(){ // 五大行 租赁 留资
			this.$router.push({path:'/ActivityDetailTOYOTA'});
		},
		ruleClk(ref) { // 金融活动规则
			this.$refs[ref].ruleClk()
			console.log(this)
		},
		ruleClkClose(ref) {
			this.$refs[ref].ruleClkClose()
		}
	},
	mounted () {
		
	},
	activated () {
		console.log('getStateData:',this.getStateData)
	},
	deactivated () {
		// 关闭错有弹层
		let pgArr = ['rp','jr','yh','zhizu','huizu']
		pgArr.forEach((_str)=> {
			this.$refs[_str].ruleClkClose()
		})
	},
	data(){
		return{
			ruleTop:false, // 活动规则
			fbankShow:false, //五大银行
			ruleList:[
				{
					CarModle:'新雷凌',// 车型
					Finan:'新LEVIN-[20%,70%]-36-0%',// 首付区间
					Payment:'[20%,70%]',// 期限
					Term:'12/24/36',// 期限
					Ratio:'277.7',// 期限
					Other: '1-3年0息',
				},
			],
			
		}
	}
}
</script>
<style lang="less" scoped>
	.inBannerBox>.btn {
		position: absolute;
		left: 1rem;
    top: 2.4rem;
		>img {
			height: 0.6rem;
			width: auto;
		}

	}
	.readTxtBtm {
		padding: 0 0.2rem;
		color: #be3932;
		padding-bottom: 0.4rem;
		>p {
			margin-top: 0.1rem;
		}
	}
</style>
<style>
	.tableBoxBorder .close {
		position: absolute;
		left: 50%;
		bottom: 2rem;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: .68rem;
    height: .68rem;
	}

</style>
