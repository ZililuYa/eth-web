<template>
  <div class="container-fluid">
    <UserHeader></UserHeader>
    <nuxt-child :user="user"/>
  </div>
</template>

<script>
  import UserHeader from '~/components/UserHeader.vue'

  export default {
    components: {
      UserHeader
    },
    computed: {
      user () {
        return this.$store.state.user.user
      }
    },
    mounted () {
      if (!this.user.email) location.href = '/login'
    },
    data () {
      return {}
    }
  }
</script>

<style>
</style>
