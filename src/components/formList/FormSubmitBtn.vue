<template>
  <div class="iptBox_submit">
    <button :disabled="disabled" class="submit" @click="submit" :style="{
        width:width,
        color:color,
        background:background,
        border:border,
      }">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name:'formSubmit',
  props:['width','color','background','border','disabled'],
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
  }
</script>

<style lang="less">
  .submit {
    height: 0.8rem;
    border-radius: 0.4rem;
    width: 5rem;
    background: #be3932;
    color: #fff;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
    letter-spacing: 0.1rem;
    font-size: 0.26rem;
  }
  .submit:active {
    opacity: 0.8;
  }
</style>
