<template>
<div>
<!-- 2.1-首页-金融机构选择-金融产品介绍(1) -->

	<!-- 头部 -->
	<HeaderPage></HeaderPage>
	
	<div class="giftContentBox">
		<div class="inBannerBox">
			<img src="./../assets/img/banner-seljieshao.jpg">
		</div>
	</div>
	<div class="titleH4">
		<i>FEATURES</i>
		<span>产品特点 ></span>
	</div>
	<div class="insIntrTxtBox">
		<p>我是产品特点内容我是内容</p>
	</div>
	<div class="insIntrLine"></div>

	<div class="titleH4">
		<i>SPECIFICATION</i>
		<span>购买说明 ></span>
	</div>
	<div class="insIntrTxtBox">
		<p>我是购买说明内容我是内容</p>
	</div>
	<div class="insIntrLine"></div>

	<div class="titleH4">
		<i>INSTRUCTION</i>
		<span>到店购车说明 ></span>
	</div>
	<div class="insIntrTxtBox">
		<p>我是到店购车说明内容我是内容</p>
	</div>
	<div class="insIntrLine"></div>

	<div class="titleH4">
		<i>SECURITY</i>
		<span>安全保障></span>
	</div>
	<div class="insIntrTxtBox">
		<img src="./../assets/img/insjieshao.jpg">
	</div>
	<!-- <div class="insIntrTxtBox">
		<div class="insBtn1">
			授信额度测评
		</div>
	</div> -->


</div>
</template>

<script>
import HeaderPage from './HeaderPage'
import _global from './../assets/js/global.js'
export default{
	name:'institutionsSel',
	mixins: [_global],
	components: {
	    HeaderPage,
	},
	data(){
		return{
			
			
		}
	},
	methods: {
		
	},
}
</script>