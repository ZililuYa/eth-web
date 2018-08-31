<template>
  <div class="container create-main">
    <br>
    <br>
    <h2 class="text-center">Please send all enquiries regarding the listing of your project on ETHICO to:</h2>
    <br>
    <p class="text-center"><img src="https://leekico.oss-ap-southeast-1.aliyuncs.com/images/icon-08.png" alt=""></p>
    <br>
    <h2 class="text-center"><a :href="`mailto:${email}`">{{email}}</a></h2>
  </div>
</template>

<script>
  import {email} from '~/package.json'

  export default {
    data () {
      return {
        email
      }
    },
    methods: {},
    mounted () {
    }
  }
</script>

<style>

</style>
