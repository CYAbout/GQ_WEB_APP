<template>
  <div class="iptBox_check">
    <div @click='check' class="check">
      <img v-show="bool===0" src="./../../assets/img/check0.png" alt="">
      <img v-show="bool===1" src="./../../assets/img/check1.png" alt="">
    </div>
    <div class="txt" :style="{color:color}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'formCheckbox',
  props:['value','color'],
  data () {
    return {
      bool: 1
    }
  },
  watch: {
    value: {
      handler(newData,oldData){
        console.log('dataListWatch',newData,oldData);
        this.bool = newData
        this.$emit('input',newData)
			},
			deep: true, // 对象监听
			immediate: true, // 初始化监听
    }
  },
  methods: {
    check () {
      let _bool = this.bool
      this.bool = _bool === 0 ? 1 : 0
      this.$emit('input',this.bool)
    }
  }
}
</script>

<style lang="less">
  .iptBox_check {
    position: relative;
    .check {
      width: 0.36rem;
      height: 0.3rem;
      position: absolute;
      top: 0;
      left: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .txt {
      text-indent: 0.4rem;
      text-align: left;
      font-size: 0.26rem;
      line-height: 0.4rem;
      color: #c2726b;
      >span {
        color: #333;
      }
    }
  }
</style>
