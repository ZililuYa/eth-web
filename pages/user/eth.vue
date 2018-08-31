<template>
  <div>
    {{user}}
  </div>
</template>

<script>
  import UserHeader from '~/components/UserHeader.vue'

  export default {
    components: {
      UserHeader
    },
    props: {
      user: Object
    },
    data () {
      return {}
    }
  }
</script>

<style>
</style>
