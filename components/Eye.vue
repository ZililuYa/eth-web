<template>
  <i class="fa" :class="eye" @click="eyeOpen"></i>
</template>
<script>

  export default {
    data () {
      return {
        eye: 'fa-eye'
      }
    },
    methods: {
      eyeOpen () {
        this.eye === 'fa-eye' ? this.eye = 'fa-eye-slash' : this.eye = 'fa-eye'
        this.$emit('input', this.eye)
      }
    }
  }
</script>
<style>
</style>
