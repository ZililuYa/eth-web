<template>
  <div class="Announcements">
    <h3 class="h3">
      <img class="va-top" src="/images/b1.png" alt=""> ETHICO 公告
      <!--<nuxt-link to="/list" class="more float-right">更多</nuxt-link>-->
    </h3>
    <div class="bd">
      <div class="l1-item" v-for="(i, k) in list" :key="k" v-if="k<=5">
        <div class="float-left l1-date"><span class="">{{i.created_at.split(' ')[0]}}</span></div>
        <div class="float-left l1-title"><a target="_blank" :href="`https://ethico.kf5.com/hc/kb/article/id/${i.id}`">{{i.title}}</a></div>
        <!--<div class="float-right l1-go"><span><img src="https://leekico.oss-ap-southeast-1.aliyuncs.com/images/icon-04.png"></span></div>-->
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        list: [],
      }
    },
    methods: {
      getData (num) {
        if (num) this.status = num
        this.loading = true
        let params = {
          url: '/article/notice/list',
          method: 'POST',
          data: {}
        }
        let callback = (data) => {
          this.list = data.data
//          if (this.status === 1)
//            this.options[this.status - 1].text = `正在进行中 (${this.list.length})`
//          if (this.status === 2)
//            this.options[this.status - 1].text = `已经结束 (${this.list.length})`
//          this.loading = false
        }
        let error = (data) => {
          this.$Alert.modal({
            prompt: data.msg
          });
        }
//        let callback = (data) => {
//          console.log(data)
//        }
        this.$axios.ajax(params, callback, error)
      },
      init () {
        this.getData()
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="less">
</style>
