<template>
  <div class="container-fluid">
    <PanelHeader></PanelHeader>
    <nuxt-child :user="user"/>
  </div>
</template>

<script>
  import PanelHeader from '~/components/PanelHeader.vue'

  export default {
    components: {
      PanelHeader
    },
    computed: {
      user () {
        return this.$store.state.user.user
      }
    },
    mounted () {
      if (this.user.role !== 1) location.href = '/'
    },
    data () {
      return {}
    }
  }
</script>

<style>
</style>
