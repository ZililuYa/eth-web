<template>
  <div class="container create-main">
  </div>
</template>

<script>
  import Cookie from 'js-cookie'

  export default {
    mounted () {
      Cookie.remove('token')
      Cookie.remove('user')
      location.href = '/'
    }
  }
</script>

<style>

</style>
