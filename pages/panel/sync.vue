<template>
  <div class="container">
    <!--<h1>-->
    <!--区块同步-->
    <!--</h1>-->
    <!--<hr>-->
    <p><br></p>
    <h3>
      数值：{{data.block_number}}
    </h3>
    <p>
      <button class="btn btn-primary btn-lg" :disabled="data.block === '1'" @click="sync"><i class="fa fa-spinner fa-spin" v-if="data.block !== '0'"></i> {{data.block === '0' ? '同步' : '同步中'}}</button>
    </p>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      user: Object
    },

    methods: {
      init () {
        this.getInfo()
      },
      getInfo () {
        if (this.$route.path !== '/panel/sync') {
          console.log('离开同步页了，自动关闭')
          return false
        }
        let callback = (data) => {
          this.data = data
          console.log(this.time + '秒后重新获取信息')
          setTimeout(() => {
            this.getInfo()
          }, this.time * 1000)
        }
        let error = (data) => {
        }
        let params = {
          url: '/block/info',
          method: 'POST',
          data: {}
        }
        this.$axios.ajax(params, callback, error, error)
      },
      sync () {
        let params = {
          url: '/block/sync',
          method: 'POST',
          data: {}
        }
        this.$axios.ajax(params)
        this.data.block = '1'
      }
    },
    mounted () {
      this.init()
    },
    data () {
      return {
        time: 15,
        data: {}
      }
    }
  }
</script>

<style>
</style>
