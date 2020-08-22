<template>
  <div class="iptBox">
    <div class="label">{{label}}</div>
    <input :value="value" @blur="$emit('blur')" @input="modelVal($event)" :placeholder="placeholder" :maxlength="maxlength" class="cont" :readonly="readonly" :style="{color:readonly==='readonly' ? '#999' : '#333'}">
  </div>
</template>

<script>
export default {
  name:'formInput',
  props:['value','label','placeholder','maxlength','type','readonly','blur'],
  methods: {
    modelVal(ev) {
        // 限制只能输入文字(禁止数字和字符)
        if(this.type == 'text') {
          console.log(this.type)
          // ev.target.value = ev.target.value.replace(/[\d]/g,'')
        }
        // 限制只能输入数字
        if(Number(this.maxlength)>10 && Number(this.maxlength) != 18 && this.type != 'text'){
          ev.target.value = ev.target.value.replace(/[^\d]/g,'')
          console.log('must number')
        } else if (Number(this.maxlength) == 18) {
          // 校验身份证号
          ev.target.value = ev.target.value.replace(/[^\d|X|x]/g,'').toUpperCase()
          console.log('must userCard')
        } else if (Number(this.maxlength) == 17) {
          // 校验身份证号
          ev.target.value = ev.target.value.replace(/[^\d|A-Z|a-z]/g,'').toUpperCase()
          console.log('must userCard')
        }
        this.$emit('input', ev.target.value)
      },
  },
  activated () {
    console.log(this.readonly)
  }
}
</script>

<style lang="less">
  .iptBox {
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
    margin: 0 0.2rem;
    padding-right: 0.2rem;
    // background: url("./../../assets/img/src/form_right.png") center right no-repeat;
    // background-size: auto 22%;
    .label {
      float: left;
      height: 0.6rem;
      line-height: 0.6rem;
      width: 1rem;
      text-align: justify;
      font-size: 0.16rem;
    }
    .label:after {
      display: inline-block;
      width: 100%;
      content: '';
    }
    .cont {
      float: right;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.16rem;
      text-align: right;
    }
  }

</style>
