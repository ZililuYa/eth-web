<!--<template>-->
  <!--<div class="News">-->
    <!--<h3 class="h3">-->
      <!--<img class="va-top" src="/images/b1.png" alt=""> 最新消息-->
      <!--&lt;!&ndash;<nuxt-link to="/list" class="more float-right">更多</nuxt-link>&ndash;&gt;-->
    <!--</h3>-->
    <!--<swiper :options="swiperOption">-->
      <!--<swiper-slide v-for="i in [1,2,3]" :key="i">-->
        <!--<div class="tab">-->
          <!--<div class="cell cell-img" style="background-image: url('https://leekico.oss-ap-southeast-1.aliyuncs.com/5b03fc488a771.jpeg')">-->
          <!--</div>-->
          <!--<div class="cell cell-text">-->
            <!--Skrumble Network Crowdfunding Sells Out in 1 Hour With the Help of LEEKICO and Announces First Exchange Listing-->
            <!--<p>-->
              <!--<a href="">more...</a>-->
            <!--</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="date">-->
          <!--10 May 2018-->
        <!--</div>-->
      <!--</swiper-slide>-->
      <!--&lt;!&ndash;<div class="swiper-pagination" slot="pagination"></div>&ndash;&gt;-->
      <!--<div class="prev" slot="button-prev">-->
        <!--<div class="fa fa-chevron-left"></div>-->
      <!--</div>-->
      <!--<div class="next" slot="button-next">-->
        <!--<div class="fa fa-chevron-right"></div>-->
      <!--</div>-->
    <!--</swiper>-->
  <!--</div>-->
<!--</template>-->

<template>
  <div class="Announcements">
    <h3 class="h3">
      <img class="va-top" src="/images/b1.png" alt=""> 资讯
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

<!--<script>-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--swiperOption: {-->
          <!--slidesPerView: 1,-->
          <!--spaceBetween: 30,-->
          <!--navigation: {-->
            <!--nextEl: '.next',-->
            <!--prevEl: '.prev'-->
          <!--},-->
          <!--pagination: {-->
<!--//            el: '.swiper-pagination',-->
<!--//            clickable: true-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->


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
          url: '/article/news/list',
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
  .News {
    .swiper-container {
      padding-bottom: 24px;
    }
    .prev, .next {
      cursor: pointer;
      z-index: 999999;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 25px;
      border: 2px solid #9B9FA5;
      width: 48px;
      height: 48px;
      border-radius: 50% !important;
      color: #9B9FA5;
      text-align: center;
      font-size: 20px;
      transition-duration: .3s;
      .fa {
        margin-top: 13px;
      }
      &:hover {
        background-color: #181E2F;
        border-color: #181E2F;
        color: #fff;
      }
    }
    .next {
      left: 25+48+3px;
    }
    .swiper-slide {
      border-bottom: 1px solid #C8C9CD;
      padding-bottom: 67px;
      .date {
        position: absolute;
        right: 0;
        bottom: 10px;
        color: #9b9fa9;
        font-size: 13px;
      }
    }
    .tab {
      width: 100%;
      display: table;
      .cell {
        display: table-cell;
      }
      .cell-img {
        width: 210px;
        height: 210px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: auto 100%;
        border-radius: 20px !important;
      }
      .cell-text {
        padding-left: 20px;
        color: #192031;
        font-size: 20px;
      }
    }
    .h3 {
      margin-bottom: 30px;
    }
  }
</style>
