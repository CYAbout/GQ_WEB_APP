<template>
  <div class="iptBox_slot">
    <div class="label">{{label}}</div>
    <div class="slotBox">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'formInput',
  props:['label'],
  methods: {
  }
}
</script>

<style lang="less">
  .iptBox_slot {
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
    margin: 0 0.2rem;
    padding-right: 0;
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
    .slotBox {
      width: 100%;
      line-height: 0.8rem;
      text-align: right;
    }
  }

</style>
