<template>
  <div class="disBox">
    <div class="label">{{label}}</div>
    <div class="cont">{{placeholder}}</div>
    <!-- <input :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" class="cont"> -->
  </div>
</template>

<script>
export default {
  name:'DisabledInput',
  props:['label','placeholder'],
  }
</script>

<style lang="less">
  .disBox {
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
    margin: 0 0.3rem;
    display: flex;
    .label {
      height: 0.94rem;
      line-height: 0.94rem;
      width: 1.2rem;
      text-align: justify;
      font-size: 0.28rem;
    }
    .label:after {
      display: inline-block;
      width: 100%;
      content: '';
    }
    .cont {
      flex: 1;
      height: 0.94rem;
      line-height: 0.94rem;
      font-size: 0.28rem;
      color:#999;
      text-align: right;
    }
  }

</style>
