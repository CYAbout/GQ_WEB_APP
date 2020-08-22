<template>
<div class="rulePage">
	<!-- 活动规则弹窗-->
	<div class="coverBox" :class="{coverBox_trs:ruleTop}" v-show="ruleTop" style="z-index:100000">
		<div class="coverBack"></div>
		<div class="tableBox" :class="isfull?'full':''" style="border:none;background:transparent;height:100vh;max-height:100vh;">
			<div class="tableBoxBorder" style="border:none;background:transparent;max-height:100%;">
				<div @click="contClose" style="overflow:hidden;position:relative;">
					<div class="slotBox">
						<slot></slot>
					</div>
					<div class="rule-button" v-if="buttonText" @click="$emit('winClick')">
              {{buttonText}}
					</div>
					<img v-else class="close" :style="{bottom: closeType=='bottom' ? '0.5rem' : null,display:closeType=='none' ? 'none' : null}" src="./../assets/img/closrBtnRed.png" alt="">
				</div>
			</div>
		</div>
	</div>

</div>
</template>

<script>
export default{
	name:'rulePage',
	props:['isfull','buttonText','closeType','clickType'],
	data () {
		return {
			ruleTop: false,
		}
	},
	methods: {
		ruleClk() {
			this.ruleTop = true
			// document.body.style.position = 'fixed'
		},
		ruleClkClose() {
			this.ruleTop = false;
			// document.body.style.position = 'relative'
		},
		contClose() {
			if(this.clickType == 'none') {
				return false
			}
			this.ruleClkClose()
		}
	},
}
</script>
<style lang='less'>
.rulePage .full {
	width:100%;
}
.rulePage {
	.tableBoxBorder .close {
		position: absolute;
		left: 50%;
		bottom: 2rem;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: .68rem;
    height: .68rem;
	}
	.slotBox>img {
		width:100%;
		margin: 1rem 0 2rem;
	}
	.rule-button {
		position: absolute;
		left: 50%;
		bottom: 0.2rem;
		font-size: .28rem;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
		width: 4.16rem;
		height:.78rem;
		text-align: center;
		line-height: .78rem;
		color: #fff;
		background: #be3932;
		border-radius: .39rem;
	}
}
</style>
