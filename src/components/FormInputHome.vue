<template>
  <div class="aplly_box">
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
  }
}
</script>

<style lang="less">
  .aplly_box {
      border: 1px solid #c2726b;
      height: 0.6rem;
      line-height: 0.6rem;
      border-radius: 0.3rem;
      padding: 0 0.3rem;
      margin-bottom: 0.26rem;
      overflow: hidden;
      display: inline-block;
      width: 80%;
      >input {
        height: 100%;
        border: none;
        width: 100%;
        text-align: center;
        font-size: 0.26rem;
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        color: #c2726b;
        font-size: 0.26rem;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #c2726b;
        font-size: 0.26rem;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #c2726b;
        font-size: 0.26rem;
      }
      :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #c2726b;
        font-size: 0.26rem;
      }
    }

</style>
