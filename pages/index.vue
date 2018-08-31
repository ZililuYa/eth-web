<template>
  <div class="index index-main">
    <div class="">
      <img src="/images/banner.png" width="100%" alt="">
      <div class="input">

      </div>
    </div>
    <div class="show-data">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <h1 class="number">100,000+</h1>
            <h5 class="text">ETH交易</h5>
          </div>
          <div class="col-lg-4">
            <h1 class="number">1,000</h1>
            <h5 class="text">全球ICO项目</h5>
          </div>
          <div class="col-lg-4">
            <h1 class="number">1,000</h1>
            <h5 class="text">专业​投资者</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <Projects></Projects>
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <Announcements></Announcements>
          </div>
          <div class="col-lg-6">
            <News></News>
          </div>
        </div>
      </div>
      <Advantage></Advantage>
      <div class="row">
        <nuxt-link to="/reg" style="display: inline-block;width: 100%"><img style="width: 100%" src="/images/join.png" alt=""></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Projects from '~/components/index/Projects.vue'
  import Announcements from '~/components/index/Announcements.vue'
  import Advantage from '~/components/index/Advantage.vue'
  import News from '~/components/index/News.vue'

  export default {
    components: {
      Projects,
      Announcements,
      Advantage,
      News
    },
    data () {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>

<style lang="less">
  .index-main {
    .swiper-container .eth {
      position: absolute;
      width: 100%;
      text-align: center;
      top: 40%;
      color: #fff;
    }
    .swiper-container .eth h1 {
      font-size: 40px;
    }
    .swiper-container .img {
      width: 100%;
    }
    .show-data {
      min-height: 300px;
      background-color: #181E2F;
      .col-lg-4 {
        height: 115px;
        border-right: 1px solid #3a3a3a;
        margin-top: 73px;
        padding-top: 15px;
        &:last-child {
          border-right: 0;
        }
      }
      p, h1, h5 {
        text-align: center;
      }
      .number, .text {
        color: #fff;
      }
      .text {

      }
    }
  }
</style>
