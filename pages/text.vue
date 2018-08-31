<template>
  <div class="container list-main">
    {{data}}
  </div>
</template>

<script>
  import NuxtLink from "../.nuxt/components/nuxt-link";
  import axios from 'axios'

  export default {
    components: {NuxtLink},
    data () {
      return {}
    },
    async asyncData () {
      let params = {
        url: '/api/repo?page=1&search=jquery',
        method: 'GET'
      }
      let res = await axios.ajax(params)
      return {data: res}
    },
    methods: {},
    mounted () {
      let params = {
        url: '/api/repo?page=1&search=jquery',
        method: 'GET'
      }
      let res = this.$axios.ajax(params)
      res.then(function (data) {
        console.log(data)
      })
    }

  }
</script>

<style>
</style>
